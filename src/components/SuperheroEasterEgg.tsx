import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import {
  ArcReactorIcon,
  BatmanBatIcon,
  CaptainShieldIcon,
  SpiderIcon,
  WakandaClawIcon,
} from './SuperheroIcons';

const HERO_QUOTES = [
  {
    hero: 'Tony Stark (Iron Man)',
    badge: 'Marvel',
    logoType: 'arc-reactor',
    quote:
      '“I am Iron Man... and I automate chaotic Excel files into clean, executive-ready presentations.”',
    techTake: 'FastAPI + Pandas Report Automation',
  },
  {
    hero: 'Bruce Wayne (Batman)',
    badge: 'DC',
    logoType: 'batman',
    quote:
      '“It’s not who I am underneath, but what I deploy into production that defines me.”',
    techTake: 'Robust Role-Based Scaffolding ERP',
  },
  {
    hero: 'Steve Rogers (Captain America)',
    badge: 'Marvel',
    logoType: 'captain-shield',
    quote:
      '“I can do this all day... 100% clean test passes and zero unhandled exceptions.”',
    techTake: 'Production Stability & Reliability',
  },
  {
    hero: 'Peter Parker (Spider-Man)',
    badge: 'Marvel',
    logoType: 'spider',
    quote:
      '“With great backend API power comes great relational database responsibility.”',
    techTake: 'PostgreSQL Relational Schema Design',
  },
  {
    hero: 'T’Challa (Black Panther)',
    badge: 'Marvel',
    logoType: 'wakanda',
    quote:
      '“Wakanda Forever... and bulletproof purchase order tracking inside our Mini ERP.”',
    techTake: 'Procurement Workflow Digitalization',
  },
  {
    hero: 'Alfred Pennyworth',
    badge: 'DC',
    logoType: 'batman',
    quote:
      '“Why do we fall, sir? So we can learn to read the stack trace and optimize the query.”',
    techTake: 'Debugging & Performance Profiling',
  },
];

function renderQuoteLogo(type: string) {
  switch (type) {
    case 'arc-reactor':
      return <ArcReactorIcon className="h-5 w-5" size={20} />;
    case 'batman':
      return <BatmanBatIcon className="h-4 w-6" size={22} />;
    case 'captain-shield':
      return <CaptainShieldIcon className="h-5 w-5" size={20} />;
    case 'spider':
      return <SpiderIcon className="h-5 w-5" size={20} />;
    case 'wakanda':
      return <WakandaClawIcon className="h-5 w-5" size={20} />;
    default:
      return null;
  }
}

export function SuperheroEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % HERO_QUOTES.length);
  };

  const currentQuote = HERO_QUOTES[quoteIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl border border-gold/50 bg-burgundy-deep/95 p-5 text-ivory shadow-editorial backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ivory/15 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-ivory/20 bg-charcoal/80 shadow-inner">
                  {renderQuoteLogo(currentQuote.logoType)}
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                    Multiverse Protocol
                  </p>
                  <p className="font-heading text-xs font-semibold text-ivory">
                    Superhero Dev Easter Egg
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-ivory/60 transition-colors hover:bg-white/10 hover:text-ivory"
                aria-label="Close quote bubble"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quote Body */}
            <div className="mt-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xs font-semibold text-gold-light">
                    {currentQuote.hero}
                  </span>
                </div>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gold">
                  {currentQuote.badge}
                </span>
              </div>

              <blockquote className="mt-2 text-xs italic leading-relaxed text-ivory/90">
                {currentQuote.quote}
              </blockquote>

              <div className="mt-3 rounded-lg border border-ivory/10 bg-charcoal/60 px-3 py-1.5 font-mono text-[10px] text-ivory/75">
                <span className="text-gold">Engineering Focus:</span> {currentQuote.techTake}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between border-t border-ivory/10 pt-3">
              <button
                type="button"
                onClick={nextQuote}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/15 px-3 py-1.5 font-mono text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-burgundy-deep"
              >
                <Sparkles className="h-3 w-3" />
                Next Hero Quote
              </button>
              <span className="font-mono text-[10px] text-ivory/50">
                {quoteIndex + 1} / {HERO_QUOTES.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Trigger */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center gap-2 rounded-full border border-gold/50 bg-burgundy-deep px-3.5 py-2 text-xs font-semibold text-gold shadow-editorial backdrop-blur-md transition-colors hover:border-gold hover:bg-burgundy"
        aria-label="Toggle Superhero Dev Easter Egg"
      >
        <ArcReactorIcon className="h-3.5 w-3.5 text-gold group-hover:rotate-45 transition-transform duration-300" />
        <span className="font-mono text-[11px] tracking-wide">
          Jarvis Mode {isOpen ? '• Active' : ''}
        </span>
      </motion.button>
    </div>
  );
}
