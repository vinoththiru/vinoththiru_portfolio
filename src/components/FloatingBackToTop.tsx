import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { audioEffects } from '../utils/audioEffects';

export function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
      setIsVisible(latest > 0.12);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    audioEffects.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => audioEffects.playHover()}
            aria-label="Scroll back to top"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-burgundy-deep text-gold shadow-editorial transition-all hover:scale-105 hover:border-gold hover:bg-burgundy active:scale-95"
          >
            {/* SVG Circular Progress Ring */}
            <svg
              className="absolute inset-0 -rotate-90"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ivory/15"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#C9A66B"
                strokeWidth="2"
                strokeDasharray={125.66}
                strokeDashoffset={125.66 - (percent / 100) * 125.66}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>

            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
