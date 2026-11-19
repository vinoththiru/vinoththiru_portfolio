import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useThanos } from '../context/ThanosContext';
import { DustParticleCanvas } from './DustParticleCanvas';
import { ThanosSnapAnimation } from './ThanosSnapAnimation';
import { IronManGauntlet } from './IronManGauntlet';
import { UniverseRestoration } from './UniverseRestoration';

export function ThanosEasterEgg() {
  const {
    state,
    snapIronManRestore,
    soundMuted,
    toggleSound,
  } = useThanos();

  const isThanosActive = state === 'THANOS_ACTIVATING';
  const isIronManActive = state === 'IRON_MAN_ACTIVATING';
  const isRestoring = state === 'RESTORING';
  const isVoid = state === 'IRON_MAN_REVEAL' || state === 'IRON_MAN_ACTIVATING';

  return (
    <>
      {/* ── 1. Reusable Object-Pooled Canvas 2D Engine (Single RAF loop) ── */}
      <DustParticleCanvas />

      {/* ── 2. Thanos Snap Activation & 6-Stone Laser Beam Overlay ── */}
      <ThanosSnapAnimation isActive={isThanosActive} />

      {/* ── 3. Iron Man Repulsor Gamma Shockwave (When Restoring) ── */}
      <UniverseRestoration isActive={isIronManActive || isRestoring} />

      {/* ── 4. Iron Man Nano Gauntlet Centerpiece (ONLY interactive element in the void) ── */}
      <AnimatePresence>
        {isVoid && (
          <motion.div
            key="iron-man-void-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[140] flex flex-col items-center justify-center p-6 bg-[#0E0308]/95 backdrop-blur-3xl text-center select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Universe Void: Restore with Iron Man's Nano Gauntlet"
          >
            {/* The single Iron Man Mark 85 Nano Gauntlet */}
            <IronManGauntlet
              onClick={snapIronManRestore}
              isActivating={isIronManActive}
            />

            {/* Mute/Unmute toggle in corner */}
            <button
              type="button"
              onClick={toggleSound}
              className="absolute bottom-6 right-6 inline-flex items-center gap-1.5 rounded-full border border-ivory/20 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-ivory/70 hover:border-gold hover:text-gold transition-colors"
              aria-label={soundMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {soundMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-rose-400" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
