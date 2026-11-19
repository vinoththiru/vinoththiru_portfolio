import { AnimatePresence, motion } from 'framer-motion';

interface UniverseRestorationProps {
  isActive: boolean;
}

export function UniverseRestoration({ isActive }: UniverseRestorationProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="universe-restoration-shockwave"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed inset-0 z-[130] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {/* Intense Repulsor Blue-White Screen Flash */}
          <motion.div
            initial={{ opacity: 0.9, scale: 0.2 }}
            animate={{ opacity: 0, scale: 3.0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-cyan-400 via-sky-300 to-white blur-3xl"
          />

          {/* Concentric Energy Shockwave Rings */}
          <motion.div
            initial={{ scale: 0.1, opacity: 1, borderWidth: '8px' }}
            animate={{ scale: 2.8, opacity: 0, borderWidth: '1px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute h-96 w-96 rounded-full border-cyan-300 shadow-[0_0_80px_#38BDF8]"
          />

          <motion.div
            initial={{ scale: 0.1, opacity: 0.9, borderWidth: '12px' }}
            animate={{ scale: 3.5, opacity: 0, borderWidth: '2px' }}
            transition={{ duration: 1.1, delay: 0.1, ease: 'easeOut' }}
            className="absolute h-96 w-96 rounded-full border-white shadow-[0_0_100px_#FFFFFF]"
          />

          {/* Cinematic Quote Flare */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.2, opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center rounded-2xl border-2 border-cyan-400/80 bg-black/90 px-8 py-5 shadow-[0_0_60px_rgba(56,189,248,0.8)] backdrop-blur-xl text-center"
          >
            <span className="font-display text-3xl sm:text-5xl font-black tracking-widest text-cyan-300 drop-shadow-[0_0_35px_#38BDF8]">
              * S N A P *
            </span>
            <span className="mt-2 font-mono text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-red-400">
              “And I... am... Iron Man.”
            </span>
            <span className="mt-1 font-mono text-xs text-emerald-300 tracking-wider">
              Reconstructing 100% of the universe...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
