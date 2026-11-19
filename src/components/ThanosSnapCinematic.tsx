import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useThanos } from '../context/ThanosContext';
import { GoogleOfficialGauntlet } from './GoogleOfficialGauntlet';
import { IronManNanoGauntlet } from './IronManNanoGauntlet';

export function ThanosSnapCinematic() {
  const {
    isThanosSnapping,
    isIronManSnapping,
    isAllDusted,
    snapIronManRestore,
  } = useThanos();

  const handleIronManClick = () => {
    if (isIronManSnapping || isThanosSnapping) return;
    snapIronManRestore();
  };

  return (
    <>
      {/* ── 1. Initial Thanos Snap Overlay (48-Frame Canvas Sprite) ── */}
      <AnimatePresence>
        {isThanosSnapping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none"
          >
            <div className="relative flex flex-col items-center text-center">
              <div className="scale-150">
                <GoogleOfficialGauntlet state="snapping" size={96} />
              </div>
              <span className="mt-6 font-display text-4xl sm:text-6xl font-black tracking-widest text-amber-300 drop-shadow-[0_0_35px_rgba(245,158,11,1)]">
                * S N A P *
              </span>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.28em] text-purple-200">
                “I am inevitable.” — Thanos
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. Iron Man Snap Shockwave (When Restoring) ── */}
      <AnimatePresence>
        {isIronManSnapping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-tr from-red-600/90 via-cyan-500/90 to-white pointer-events-none"
          >
            <div className="relative flex flex-col items-center text-center rounded-3xl bg-black/90 p-8 shadow-[0_0_80px_rgba(56,189,248,0.9)] border-2 border-cyan-400">
              <IronManNanoGauntlet isSnapping size={130} />
              <span className="mt-5 font-display text-4xl sm:text-6xl font-black tracking-widest text-cyan-300 drop-shadow-[0_0_35px_rgba(56,189,248,1)]">
                * S N A P *
              </span>
              <p className="mt-2 font-mono text-base font-bold uppercase tracking-[0.25em] text-red-400">
                “And I... am... Iron Man.”
              </p>
              <p className="mt-1 font-mono text-xs text-emerald-200">
                Reassembling all portfolio text and cards...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. Sleek Floating Iron Man Restoration Island (Clean, Modern & Non-Intrusive) ── */}
      <AnimatePresence>
        {isAllDusted && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3.5 rounded-full border-2 border-red-500/70 bg-[#140409]/95 px-5 py-3 text-ivory shadow-[0_10px_45px_rgba(220,38,38,0.55)] backdrop-blur-2xl"
          >
            {/* Iron Man Mark 85 Nano Gauntlet (Clickable) */}
            <div className="flex-shrink-0">
              <IronManNanoGauntlet
                onClick={handleIronManClick}
                size={54}
                className="hover:scale-115 transition-transform"
              />
            </div>

            {/* Middle Message */}
            <div className="hidden sm:block text-left pr-2">
              <p className="font-heading text-sm font-bold text-red-400 flex items-center gap-1.5">
                “And I... am... Iron Man.”
              </p>
              <p className="font-mono text-[10px] text-ivory/70 tracking-wide">
                Content turned to ash • Snap hand to restore
              </p>
            </div>

            {/* Snap Button */}
            <button
              type="button"
              onClick={snapIronManRestore}
              className="inline-flex items-center gap-2 rounded-full border border-red-400/80 bg-gradient-to-r from-red-600 to-rose-700 px-4 py-2 font-heading text-xs font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:from-red-500 hover:to-rose-600 transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Snap to Restore</span>
              <Sparkles className="h-3 w-3 text-amber-200" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
