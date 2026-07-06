import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from './store';

const initial = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initial, true);
});

describe('study toggles', () => {
  it('toggles sources, scholarly notes, and labels independently', () => {
    const s = useAppStore.getState();
    expect(s.showSources).toBe(true);
    s.toggleSources();
    expect(useAppStore.getState().showSources).toBe(false);
    expect(useAppStore.getState().showScholarlyNotes).toBe(true);
    s.toggleScholarlyNotes();
    s.toggleLabels();
    expect(useAppStore.getState().showScholarlyNotes).toBe(false);
    expect(useAppStore.getState().showLabels).toBe(false);
  });

  it('keeps theological commentary off by default (deferred feature)', () => {
    expect(useAppStore.getState().theologicalCommentary).toBe(false);
  });
});

describe('quality and navigation', () => {
  it('switches quality modes', () => {
    useAppStore.getState().setQuality('study');
    expect(useAppStore.getState().quality).toBe('study');
    useAppStore.getState().setQuality('high');
    expect(useAppStore.getState().quality).toBe('high');
  });

  it('switches navigation mode', () => {
    useAppStore.getState().setNavMode('walk');
    expect(useAppStore.getState().navMode).toBe('walk');
  });
});

describe('scene playback', () => {
  it('advances time by speed and pauses at the end', () => {
    const s = useAppStore.getState();
    s.setSpeed(2);
    s.advanceTime(1, 150);
    expect(useAppStore.getState().timeSec).toBe(2);
    s.setTime(149.5, 150);
    s.advanceTime(1, 150);
    expect(useAppStore.getState().timeSec).toBe(150);
    expect(useAppStore.getState().playing).toBe(false);
  });

  it('clamps scrubbing to the scene duration', () => {
    useAppStore.getState().setTime(9999, 150);
    expect(useAppStore.getState().timeSec).toBe(150);
    useAppStore.getState().setTime(-5, 150);
    expect(useAppStore.getState().timeSec).toBe(0);
  });

  it('restart returns to zero and plays', () => {
    const s = useAppStore.getState();
    s.setTime(80, 150);
    s.setPlaying(false);
    s.restart();
    expect(useAppStore.getState().timeSec).toBe(0);
    expect(useAppStore.getState().playing).toBe(true);
  });

  it('selecting an entity opens the inspector panel', () => {
    useAppStore.getState().selectEntity('ent-ziklag-town');
    expect(useAppStore.getState().selectedEntityId).toBe('ent-ziklag-town');
    expect(useAppStore.getState().activePanel).toBe('inspector');
  });

  it('setScene resets playback state', () => {
    const s = useAppStore.getState();
    s.setTime(50, 150);
    s.selectEntity('ent-ziklag-town');
    s.setScene('ziklag-aftermath');
    const after = useAppStore.getState();
    expect(after.timeSec).toBe(0);
    expect(after.playing).toBe(true);
    expect(after.selectedEntityId).toBeNull();
  });
});
