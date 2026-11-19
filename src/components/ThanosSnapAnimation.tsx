import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOfficialGauntlet } from './GoogleOfficialGauntlet';

interface Props {
  isActive: boolean;
}

export function ThanosSnapAnimation({ isActive }: Props) {
  const [phase, setPhase] = useState<'activating' | 'charging' | 'snapping'>('activating');

  useEffect(() => {
    if (!isActive) {
      setPhase('activating');
      return;
    }

    setPhase('activating');

    // Phase 2: Charging (after 1.2s)
    const t1 = setTimeout(() => {
      setPhase('charging');
    }, 1200);

    // Phase 3: Snapping (after 2.7s)
    const t2 = setTimeout(() => {
      setPhase('snapping');
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="thanos-snap-activation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed inset-0 z-[130] flex flex-col items-center justify-center overflow-hidden bg-black/90 backdrop-blur-md text-center select-none"
          aria-hidden="true"
        >
          {/* Phase 1 & 2: Golden-Purple Cosmic Aura */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: phase === 'snapping' ? 3.0 : phase === 'charging' ? 1.6 : 1.0,
              opacity: phase === 'snapping' ? 0 : 0.85,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute h-[640px] w-[640px] rounded-full bg-gradient-to-tr from-amber-500/30 via-purple-600/35 to-gold/30 blur-3xl"
          />

          {/* Phase 2 & 3: 6 Stone Cosmic Laser Beams Radiating Outward */}
          {(phase === 'charging' || phase === 'snapping') && (
            <motion.svg
              initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
              animate={{
                rotate: 45,
                scale: phase === 'snapping' ? 2.0 : 1.3,
                opacity: phase === 'snapping' ? 0.3 : 1,
              }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute h-[480px] w-[480px]"
              viewBox="0 0 100 100"
            >
              {/* Space Stone (Blue) */}
              <line x1="50" y1="50" x2="88" y2="18" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              {/* Mind Stone (Yellow) */}
              <line x1="50" y1="50" x2="50" y2="0" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
              {/* Reality Stone (Red) */}
              <line x1="50" y1="50" x2="95" y2="55" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
              {/* Power Stone (Purple) */}
              <line x1="50" y1="50" x2="10" y2="15" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
              {/* Time Stone (Green) */}
              <line x1="50" y1="50" x2="25" y2="85" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
              {/* Soul Stone (Orange) */}
              <line x1="50" y1="50" x2="75" y2="92" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" />
            </motion.svg>
          )}

          {/* Google 48-Frame Canvas Gauntlet Sprite */}
          <motion.div
            animate={{
              scale: phase === 'snapping' ? 1.45 : phase === 'charging' ? 1.35 : 1.2,
              y: phase === 'activating' ? [20, 0] : 0,
            }}
            transition={{ duration: 0.6 }}
            className="relative z-10 drop-shadow-[0_0_35px_rgba(245,158,11,0.9)]"
          >
            <GoogleOfficialGauntlet state="snapping" size={108} />
          </motion.div>

          {/* Cinematic Title & Status text */}
          <div className="relative z-10 mt-8 flex flex-col items-center">
            {phase === 'activating' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                  Infinity Stones Awaken
                </span>
                <p className="mt-1 font-heading text-lg font-medium text-ivory/90">
                  Channeling the Power of the Cosmos...
                </p>
              </motion.div>
            )}

            {phase === 'charging' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-purple-300">
                  Energy Critical
                </span>
                <p className="mt-2 font-display text-2xl font-bold tracking-wider text-amber-300 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]">
                  “I am inevitable.”
                </p>
                <p className="mt-1 font-mono text-[11px] text-ivory/70 tracking-widest uppercase">
                  Preparing Disintegration Wave
                </p>
              </motion.div>
            )}

            {phase === 'snapping' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.9, 1.15, 1], opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <span className="font-display text-5xl sm:text-7xl font-black tracking-widest text-amber-300 drop-shadow-[0_0_45px_rgba(245,158,11,1)]">
                  * S N A P *
                </span>
                <p className="mt-2 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-purple-200">
                  Decimating 100% of the Portfolio into Dust
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
