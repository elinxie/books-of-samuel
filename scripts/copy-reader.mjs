#!/usr/bin/env node
/**
 * Copies the companion reader's built index.html into the Vite build output,
 * so it deploys alongside the visualizer at /reader/. The reader is a separate
 * self-contained subproject (see reader/README.md) with its own Python
 * toolchain; this is the one seam connecting it to the main build.
 */
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const src = join(process.cwd(), 'reader', 'index.html');
const destDir = join(process.cwd(), 'dist', 'reader');
const dest = join(destDir, 'index.html');

if (!existsSync(src)) {
  console.warn(
    '[copy-reader] reader/index.html not found — skipping (visualizer build is unaffected).',
  );
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log('[copy-reader] Copied reader/index.html -> dist/reader/index.html');
