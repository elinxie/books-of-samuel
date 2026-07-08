#!/usr/bin/env node
/**
 * session-usage.mjs — token/usage readout + checkpoint verdict for agent sessions.
 *
 * Reads the Claude Code session transcript (JSONL) and reports:
 *   - current context size (last main-chain assistant turn) vs. the context window
 *   - cumulative session token totals (incl. subagent sidechains)
 *   - a rough cost estimate (published per-MTok rates; estimate only)
 *   - a checkpoint verdict: OK | SOON | NOW | CRITICAL
 *
 * Modes (first arg):
 *   --statusline          statusline command: reads statusline JSON on stdin, prints one line
 *   --hook-stop           Stop hook: exit 2 + stderr message when checkpoint overdue AND git dirty
 *   --hook-session-start  SessionStart hook: prints one orientation line (goes into context)
 *   --hook-pre-compact    PreCompact hook: prints a checkpoint reminder
 *   --json                machine-readable report
 *   (none)                human-readable report
 *   --transcript <path>   explicit transcript path (else stdin JSON, else newest for cwd)
 *
 * No dependencies. Degrades gracefully: if no transcript is found (e.g. running
 * under Codex or plain CI), it says so and points at docs/checkpoint-protocol.md
 * instead of guessing numbers.
 */

import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DEFAULT_WINDOW = 200_000; // tokens; Sonnet 5 / Fable 5 standard window
const THRESHOLDS = [
  // fraction of window, level, action
  [0.82, 'CRITICAL', 'STOP new work. Commit + push + checkpoint note immediately.'],
  [0.7, 'NOW', 'Checkpoint now: finish current edit, commit, push, update docs/next-run.md.'],
  [0.55, 'SOON', 'Finish current slice and checkpoint before starting another.'],
  [0, 'OK', 'Commit per completed slice regardless.'],
];

// $ per MTok {input, output}; cacheWrite=1.25x input, cacheRead=0.1x input.
// Estimates only — for spend awareness, not billing. Update when pricing changes.
const RATES = [
  [/fable|mythos/i, { input: 15, output: 75, label: 'fable (opus-tier assumed)' }],
  [/opus/i, { input: 15, output: 75, label: 'opus' }],
  [/haiku/i, { input: 1, output: 5, label: 'haiku' }],
  [/sonnet/i, { input: 3, output: 15, label: 'sonnet' }],
];

// ---------------------------------------------------------------------------
// Transcript discovery
// ---------------------------------------------------------------------------

function projectSlug(dir) {
  return dir.replace(/[^a-zA-Z0-9]/g, '-');
}

function newestTranscriptForCwd() {
  const dir = join(homedir(), '.claude', 'projects', projectSlug(process.cwd()));
  if (!existsSync(dir)) return null;
  let best = null;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.jsonl')) continue;
    const p = join(dir, f);
    const m = statSync(p).mtimeMs;
    if (!best || m > best.mtime) best = { path: p, mtime: m };
  }
  return best ? best.path : null;
}

function readStdinJson() {
  try {
    const raw = readFileSync(0, 'utf8');
    if (!raw.trim()) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Transcript parsing
// ---------------------------------------------------------------------------

function parseTranscript(path) {
  const lines = readFileSync(path, 'utf8').split('\n');
  // Dedupe streamed chunks of the same assistant message by message.id (keep last).
  const byId = new Map();
  let anon = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    if (obj.type !== 'assistant' || !obj.message?.usage) continue;
    const id = obj.message.id ?? `anon-${anon++}`;
    byId.set(id, obj);
  }
  const msgs = [...byId.values()];
  const totals = { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 };
  let lastMain = null;
  let model = null;
  for (const m of msgs) {
    const u = m.message.usage;
    totals.input += u.input_tokens ?? 0;
    totals.cacheWrite += u.cache_creation_input_tokens ?? 0;
    totals.cacheRead += u.cache_read_input_tokens ?? 0;
    totals.output += u.output_tokens ?? 0;
    if (!m.isSidechain) lastMain = m;
    if (m.message.model) model = m.message.model;
  }
  let context = 0;
  if (lastMain) {
    const u = lastMain.message.usage;
    context =
      (u.input_tokens ?? 0) +
      (u.cache_creation_input_tokens ?? 0) +
      (u.cache_read_input_tokens ?? 0) +
      (u.output_tokens ?? 0);
  }
  return { totals, context, model, turns: msgs.length };
}

function estimateCost(totals, modelId) {
  const hit = RATES.find(([re]) => re.test(modelId ?? ''));
  const r = hit ? hit[1] : RATES.find(([re]) => re.test('sonnet'))[1];
  const usd =
    (totals.input * r.input +
      totals.cacheWrite * r.input * 1.25 +
      totals.cacheRead * r.input * 0.1 +
      totals.output * r.output) /
    1_000_000;
  return { usd, rateLabel: hit ? hit[1].label : 'sonnet (default)' };
}

function verdict(context, windowSize) {
  const frac = context / windowSize;
  for (const [min, level, action] of THRESHOLDS) {
    if (frac >= min) return { level, action, frac };
  }
  return { level: 'OK', action: THRESHOLDS.at(-1)[2], frac };
}

function gitDirtyCount() {
  try {
    const out = execSync('git status --porcelain', {
      timeout: 5000,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out ? out.split('\n').length : 0;
  } catch {
    return -1; // unknown / not a repo
  }
}

function gitBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      timeout: 5000,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return '?';
  }
}

const k = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const mode = args.find((a) => a.startsWith('--') && a !== '--transcript') ?? '';
const tIdx = args.indexOf('--transcript');
const explicitTranscript = tIdx >= 0 ? resolve(args[tIdx + 1]) : null;

// Hook/statusline modes receive JSON on stdin that includes transcript_path.
const stdinModes = ['--statusline', '--hook-stop', '--hook-session-start', '--hook-pre-compact'];
const stdinJson = stdinModes.includes(mode) ? readStdinJson() : null;

const transcript =
  explicitTranscript ??
  (stdinJson?.transcript_path && existsSync(stdinJson.transcript_path)
    ? stdinJson.transcript_path
    : newestTranscriptForCwd());

const windowSize = Number(process.env.CLAUDE_CONTEXT_WINDOW) || DEFAULT_WINDOW;

if (!transcript) {
  const msg =
    'session-usage: no transcript found (not Claude Code?). ' +
    'Follow the manual protocol in docs/checkpoint-protocol.md: commit + push after every completed slice.';
  if (mode === '--hook-stop') process.exit(0);
  if (mode === '--json') console.log(JSON.stringify({ ok: false, reason: 'no-transcript' }));
  else console.log(msg);
  process.exit(0);
}

let report;
try {
  const { totals, context, model, turns } = parseTranscript(transcript);
  const { usd, rateLabel } = estimateCost(totals, model);
  const v = verdict(context, windowSize);
  report = { transcript, model, turns, totals, context, windowSize, usd, rateLabel, ...v };
} catch (e) {
  if (mode === '--hook-stop') process.exit(0);
  console.log(`session-usage: failed to parse transcript (${e.message})`);
  process.exit(0);
}

const pct = Math.round(report.frac * 100);
const line =
  `ctx ${k(report.context)}/${k(report.windowSize)} (${pct}%) | ` +
  `session in ${k(report.totals.input + report.totals.cacheRead + report.totals.cacheWrite)} / out ${k(report.totals.output)} | ` +
  `~$${report.usd.toFixed(2)} (${report.rateLabel}, estimate) | ${report.level}`;

switch (mode) {
  case '--statusline': {
    console.log(
      `${line} | ${gitBranch()}${gitDirtyCount() > 0 ? ` +${gitDirtyCount()} dirty` : ''}`,
    );
    break;
  }
  case '--hook-stop': {
    // Never loop: if a previous Stop hook already fired this stoppage, let it stop.
    if (stdinJson?.stop_hook_active) process.exit(0);
    const dirty = gitDirtyCount();
    if ((report.level === 'NOW' || report.level === 'CRITICAL') && dirty > 0) {
      process.stderr.write(
        `Context at ${pct}% of window with ${dirty} uncommitted file(s). ` +
          `Checkpoint before stopping: commit the current slice, push, and update ` +
          `docs/next-run.md (protocol: docs/checkpoint-protocol.md, command: /checkpoint).`,
      );
      process.exit(2);
    }
    process.exit(0);
  }
  case '--hook-session-start': {
    console.log(
      `[checkpoint-protocol] ${line}. Commit+push per completed slice; ` +
        `at NOW/CRITICAL checkpoint immediately. See docs/checkpoint-protocol.md.`,
    );
    break;
  }
  case '--hook-pre-compact': {
    console.log(
      `[checkpoint-protocol] Compaction imminent (${pct}% of window). ` +
        `If work is uncommitted, commit + push + write docs/session-checkpoints/ note first.`,
    );
    break;
  }
  case '--json': {
    console.log(JSON.stringify({ ok: true, ...report, pct }, null, 2));
    break;
  }
  default: {
    console.log(line);
    console.log(`action: ${report.action}`);
    console.log(`transcript: ${report.transcript}`);
  }
}
