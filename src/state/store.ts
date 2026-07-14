import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_SCENE_ID } from '../data/scenes';
import type { Terrain } from '../engine/terrain';
import { ZIKLAG_TERRAIN } from '../scenes/ziklag/terrain';

export type QualityMode = 'study' | 'balanced' | 'high';
export type NavMode = 'inspect' | 'walk';
export type PanelId = 'none' | 'settings' | 'teleport' | 'inspector' | 'certainty';
/**
 * Violence-rendering treatment (ADR-009): one choreography, two treatments.
 * `standard` shows restrained, documentary-distance transitions (no gore/
 * dismemberment in either mode); `reduced` abstracts the depiction further by
 * eliding animated transitions and cutting to the resulting pose. Standard is
 * the default (fable-review-queue register #6).
 */
export type ViolenceMode = 'standard' | 'reduced';

export interface TeleportTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

interface AppState {
  // Study toggles
  showSources: boolean;
  showScholarlyNotes: boolean;
  showLabels: boolean;
  /** Deliberately deferred; kept in state so the UI can show it as "coming later". */
  theologicalCommentary: boolean;

  quality: QualityMode;
  navMode: NavMode;
  hudHidden: boolean;
  activePanel: PanelId;
  violenceMode: ViolenceMode;
  /**
   * ADR-009: whether the viewer has already answered the first-visit
   * violence advisory. Once true, the advisory never reappears — the choice
   * remains changeable any time via Settings.
   */
  violenceAdvisorySeen: boolean;

  // Scene playback
  sceneId: string;
  /** Active scene's terrain sampler/geometry; set when a scene is entered (ADR-005). */
  terrain: Terrain;
  timeSec: number;
  playing: boolean;
  speed: number;
  selectedEntityId: string | null;
  pendingTeleport: TeleportTarget | null;

  toggleSources: () => void;
  toggleScholarlyNotes: () => void;
  toggleLabels: () => void;
  setQuality: (q: QualityMode) => void;
  setNavMode: (m: NavMode) => void;
  toggleHud: () => void;
  setActivePanel: (p: PanelId) => void;
  setViolenceMode: (m: ViolenceMode) => void;
  /** Answers the first-visit violence advisory: sets the mode and marks it seen. */
  acknowledgeViolenceAdvisory: (m: ViolenceMode) => void;

  setScene: (id: string) => void;
  setTerrain: (terrain: Terrain) => void;
  setTime: (t: number, max?: number) => void;
  advanceTime: (dt: number, max: number) => void;
  setPlaying: (p: boolean) => void;
  setSpeed: (s: number) => void;
  restart: () => void;
  selectEntity: (id: string | null) => void;
  requestTeleport: (t: TeleportTarget) => void;
  clearTeleport: () => void;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      showSources: true,
      showScholarlyNotes: true,
      showLabels: true,
      theologicalCommentary: false,

      quality: 'balanced',
      navMode: 'inspect',
      hudHidden: false,
      activePanel: 'none',
      violenceMode: 'standard',
      violenceAdvisorySeen: false,

      sceneId: DEFAULT_SCENE_ID,
      terrain: ZIKLAG_TERRAIN,
      timeSec: 0,
      playing: true,
      speed: 1,
      selectedEntityId: null,
      pendingTeleport: null,

      toggleSources: () => set((s) => ({ showSources: !s.showSources })),
      toggleScholarlyNotes: () => set((s) => ({ showScholarlyNotes: !s.showScholarlyNotes })),
      toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
      setQuality: (quality) => set({ quality }),
      setNavMode: (navMode) => set({ navMode }),
      toggleHud: () => set((s) => ({ hudHidden: !s.hudHidden })),
      setActivePanel: (activePanel) => set({ activePanel }),
      setViolenceMode: (violenceMode) => set({ violenceMode }),
      acknowledgeViolenceAdvisory: (violenceMode) =>
        set({ violenceMode, violenceAdvisorySeen: true }),

      setScene: (sceneId) =>
        set({ sceneId, timeSec: 0, playing: true, selectedEntityId: null, pendingTeleport: null }),
      setTerrain: (terrain) => set({ terrain }),
      setTime: (t, max = Number.POSITIVE_INFINITY) => set({ timeSec: clamp(t, 0, max) }),
      advanceTime: (dt, max) =>
        set((s) => {
          const next = clamp(s.timeSec + dt * s.speed, 0, max);
          return next >= max ? { timeSec: max, playing: false } : { timeSec: next };
        }),
      setPlaying: (playing) => set({ playing }),
      setSpeed: (speed) => set({ speed: clamp(speed, 0.25, 8) }),
      restart: () => set({ timeSec: 0, playing: true }),
      selectEntity: (selectedEntityId) =>
        set((s) => ({
          selectedEntityId,
          activePanel: selectedEntityId ? 'inspector' : s.activePanel,
        })),
      requestTeleport: (pendingTeleport) => set({ pendingTeleport }),
      clearTeleport: () => set({ pendingTeleport: null }),
    }),
    {
      name: 'books-of-samuel-prefs',
      partialize: (s) => ({
        showSources: s.showSources,
        showScholarlyNotes: s.showScholarlyNotes,
        showLabels: s.showLabels,
        quality: s.quality,
        violenceMode: s.violenceMode,
        violenceAdvisorySeen: s.violenceAdvisorySeen,
      }),
    },
  ),
);
