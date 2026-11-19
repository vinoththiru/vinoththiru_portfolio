// ThanosContext.tsx
// Master FSM controller for Thanos 100% Disintegration & Iron Man Reverse Reconstruction
// Integrates with PixelDisintegrationEngine and SoundManager for authentic Google Easter Egg effect

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type RefObject,
} from 'react';
import { soundManager } from '../utils/SoundManager';
import { pixelDisintegrationEngine } from '../utils/PixelDisintegrationEngine';

export type EasterEggFsmState =
  | 'NORMAL'
  | 'THANOS_ACTIVATING'
  | 'DISINTEGRATING'
  | 'IRON_MAN_REVEAL'
  | 'IRON_MAN_ACTIVATING'
  | 'RESTORING';

export type SectionState = 'normal' | 'disintegrating' | 'dusted' | 'restoring';

export const PROGRESSIVE_SECTIONS = [
  'navbar',
  'hero',
  'about',
  'experience',
  'skills',
  'projects',
  'services',
  'contact',
  'footer',
] as const;

export type SectionId = (typeof PROGRESSIVE_SECTIONS)[number];

interface ThanosContextType {
  state: EasterEggFsmState;
  getSectionState: (id: string) => SectionState;
  registerSectionRef: (id: string, ref: RefObject<HTMLElement | null>) => void;
  unregisterSectionRef: (id: string) => void;
  startThanosDecimation: () => void;
  snapIronManRestore: () => void;
  toggleSequence: () => void;
  soundMuted: boolean;
  toggleSound: () => void;
  // Compatibility helpers
  isThanosSnapping: boolean;
  isIronManSnapping: boolean;
  isAllDusted: boolean;
  isSectionHidden: (id: string) => boolean;
  isDusted: (id: string) => boolean;
  registerItem: (id: string, ref: any) => void;
  unregisterItem: (id: string) => void;
  hasSnappedOnce: boolean;
  toggleSnap: () => void;
  snapState: 'idle' | 'snapping' | 'snapped' | 'reversing';
}

const ThanosContext = createContext<ThanosContextType | null>(null);

export function ThanosProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EasterEggFsmState>('NORMAL');
  const [sectionStates, setSectionStates] = useState<Record<string, SectionState>>({});
  const [soundMuted, setSoundMuted] = useState(soundManager.isMuted());
  const [hasSnappedOnce, setHasSnappedOnce] = useState(false);

  const sectionRefs = useRef<Map<string, RefObject<HTMLElement | null>>>(new Map());
  const timersRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const registerSectionRef = useCallback((id: string, ref: RefObject<HTMLElement | null>) => {
    sectionRefs.current.set(id, ref);
  }, []);

  const unregisterSectionRef = useCallback((id: string) => {
    sectionRefs.current.delete(id);
  }, []);

  const getSectionState = useCallback(
    (id: string): SectionState => {
      return sectionStates[id] || 'normal';
    },
    [sectionStates]
  );

  const toggleSound = () => {
    const next = soundManager.toggleMute();
    setSoundMuted(next);
  };

  // ══════════════════════════════════════════════════════════════════════
  // ── 1. SEQUENTIAL THANOS DUST DISINTEGRATION (Top to Bottom) ──
  // ══════════════════════════════════════════════════════════════════════
  const startThanosDecimation = useCallback(() => {
    if (state !== 'NORMAL') return;
    clearAllTimers();

    setHasSnappedOnce(true);
    setSectionStates({});

    // 1. Gauntlet Activation (0.0s - 1.2s)
    setState('THANOS_ACTIVATING');
    soundManager.playStoneActivation();

    // Trigger asynchronous background pixel capture for all sections
    PROGRESSIVE_SECTIONS.forEach((secId) => {
      const ref = sectionRefs.current.get(secId);
      if (ref?.current) {
        pixelDisintegrationEngine.captureSection(secId, ref.current);
      }
    });

    // 2. Infinity Stone Charging (1.2s - 2.7s)
    const chargeTimer = window.setTimeout(() => {
      soundManager.playEnergyCharging();
    }, 1200);
    timersRef.current.push(chargeTimer);

    // 3. Finger Snap Moment (2.7s - 3.2s)
    const snapTimer = window.setTimeout(() => {
      soundManager.playFingerSnap();
    }, 2700);
    timersRef.current.push(snapTimer);

    // 4. Begin Section-by-Section Traveling Pixel Disintegration (at 3.2s)
    const startDisintegrationTimer = window.setTimeout(() => {
      setState('DISINTEGRATING');

      const stepDuration = 1120; // 1.5s duration with 380ms overlap between sections

      PROGRESSIVE_SECTIONS.forEach((sectionId, index) => {
        const stepTimer = window.setTimeout(() => {
          setSectionStates((prev) => ({ ...prev, [sectionId]: 'disintegrating' }));

          // Trigger realistic pixel sampling disintegration in engine
          pixelDisintegrationEngine.startDisintegrating(sectionId);

          // Audio: subtle disintegration ambience & resonant dust tone
          soundManager.playDustDisintegration(index + 1);

          // Gently smooth scroll camera to section if offscreen
          if (sectionId !== 'navbar' && sectionId !== 'footer') {
            const ref = sectionRefs.current.get(sectionId);
            if (ref?.current) {
              const rect = ref.current.getBoundingClientRect();
              const targetY = rect.top + window.scrollY - 80;
              if (Math.abs(window.scrollY - targetY) > 300) {
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            }
          }

          // Mark dusted after wave finishes
          const markDustedTimer = window.setTimeout(() => {
            setSectionStates((prev) => ({ ...prev, [sectionId]: 'dusted' }));
          }, 1500);
          timersRef.current.push(markDustedTimer);
        }, index * stepDuration);

        timersRef.current.push(stepTimer);
      });

      // 5. Final Dust Dispersion (1.8s) + Iron Man Reveal (1.2s pause)
      const totalDisintegrationTime = PROGRESSIVE_SECTIONS.length * stepDuration + 1600;

      const revealTimer = window.setTimeout(() => {
        const allDustedMap: Record<string, SectionState> = {};
        PROGRESSIVE_SECTIONS.forEach((sec) => {
          allDustedMap[sec] = 'dusted';
        });
        setSectionStates(allDustedMap);

        // Transition to Void & reveal Iron Man Nano Gauntlet
        setState('IRON_MAN_REVEAL');
        soundManager.playArcReactorActivation();
      }, totalDisintegrationTime + 1200);

      timersRef.current.push(revealTimer);
    }, 3200);

    timersRef.current.push(startDisintegrationTimer);
  }, [state]);

  // ══════════════════════════════════════════════════════════════════════
  // ── 2. SEQUENTIAL IRON MAN RESTORATION (Bottom to Top) ──
  // ══════════════════════════════════════════════════════════════════════
  const snapIronManRestore = useCallback(() => {
    if (state !== 'IRON_MAN_REVEAL') return;
    clearAllTimers();

    // 1. Repulsor charging
    setState('IRON_MAN_ACTIVATING');
    soundManager.playRepulsorCharging();

    const activateTimer = window.setTimeout(() => {
      soundManager.playEnergyPulse();
      soundManager.playUniverseRestoration();

      // 2. Progressive bottom-to-top reverse reassembly
      setState('RESTORING');

      const reversedSections = [...PROGRESSIVE_SECTIONS].reverse();
      const stepDuration = 1000; // 1.35s duration with 350ms overlap

      reversedSections.forEach((sectionId, index) => {
        const stepTimer = window.setTimeout(() => {
          setSectionStates((prev) => ({ ...prev, [sectionId]: 'restoring' }));

          // Fly particles back in reverse
          pixelDisintegrationEngine.startRestoring(sectionId);

          // Mark normal after reverse reassembly
          const resetTimer = window.setTimeout(() => {
            setSectionStates((prev) => ({ ...prev, [sectionId]: 'normal' }));
          }, 1350);
          timersRef.current.push(resetTimer);
        }, index * stepDuration);

        timersRef.current.push(stepTimer);
      });

      // Smoothly glide camera back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 3. Return to NORMAL state after complete reconstruction
      const totalRestoreTime = reversedSections.length * stepDuration + 1400;
      const normalTimer = window.setTimeout(() => {
        setState('NORMAL');
        setSectionStates({});
        pixelDisintegrationEngine.resetAll();
      }, totalRestoreTime);
      timersRef.current.push(normalTimer);
    }, 600);

    timersRef.current.push(activateTimer);
  }, [state]);

  const toggleSequence = useCallback(() => {
    if (state === 'NORMAL') {
      startThanosDecimation();
    } else if (state === 'IRON_MAN_REVEAL') {
      snapIronManRestore();
    }
  }, [state, startThanosDecimation, snapIronManRestore]);

  const isAllDusted = state === 'IRON_MAN_REVEAL' || state === 'IRON_MAN_ACTIVATING';

  return (
    <ThanosContext.Provider
      value={{
        state,
        getSectionState,
        registerSectionRef,
        unregisterSectionRef,
        startThanosDecimation,
        snapIronManRestore,
        toggleSequence,
        soundMuted,
        toggleSound,
        // Compatibility
        isThanosSnapping: state === 'THANOS_ACTIVATING',
        isIronManSnapping: state === 'IRON_MAN_ACTIVATING',
        isAllDusted,
        isSectionHidden: (id) => getSectionState(id) === 'dusted',
        isDusted: (id) => getSectionState(id) === 'dusted',
        registerItem: () => {},
        unregisterItem: () => {},
        hasSnappedOnce,
        toggleSnap: toggleSequence,
        snapState: isAllDusted
          ? 'snapped'
          : state === 'RESTORING'
            ? 'reversing'
            : state === 'NORMAL'
              ? 'idle'
              : 'snapping',
      }}
    >
      {children}
    </ThanosContext.Provider>
  );
}

export function useThanos() {
  const context = useContext(ThanosContext);
  if (!context) {
    throw new Error('useThanos must be used within a ThanosProvider');
  }
  return context;
}
