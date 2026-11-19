import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';

interface IronManGauntletProps {
  onClick: () => void;
  isActivating?: boolean;
}

export function IronManGauntlet({ onClick, isActivating = false }: IronManGauntletProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 30 }}
      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
      className="flex flex-col items-center justify-center select-none text-center"
      role="region"
      aria-label="Iron Man Nano Gauntlet Restoration Portal"
    >
      {/* Floating Nano Gauntlet Container */}
      <motion.div
        animate={
          isActivating
            ? { scale: [1, 1.15, 1.25], rotate: [0, -2, 2, 0] }
            : { y: [-8, 8, -8] }
        }
        transition={
          isActivating
            ? { duration: 0.8, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
        }
        className="relative group cursor-pointer focus:outline-none"
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Click to activate Iron Man's Nano Gauntlet and restore the universe"
        title="Click to activate Iron Man Nano Gauntlet"
      >
        {/* Pulsing Arc Reactor Ambient Aura */}
        <div
          className={`pointer-events-none absolute -inset-8 rounded-full blur-3xl transition-all duration-500 ${
            isActivating
              ? 'bg-gradient-to-r from-cyan-400 via-sky-300 to-white opacity-100 scale-125 animate-pulse'
              : isHovered
                ? 'bg-gradient-to-r from-cyan-500/60 via-red-600/40 to-amber-400/40 opacity-90 scale-110'
                : 'bg-gradient-to-r from-cyan-500/30 via-red-600/25 to-amber-500/25 opacity-70 scale-100'
          }`}
          aria-hidden="true"
        />

        {/* Repulsor Energy Shockwave Ring on Hover / Activation */}
        <motion.div
          animate={
            isActivating || isHovered
              ? { scale: [1, 1.4, 1.6], opacity: [0.8, 0.4, 0] }
              : { scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }
          }
          transition={{ repeat: Infinity, duration: isActivating ? 0.6 : 2.0, ease: 'easeOut' }}
          className="pointer-events-none absolute -inset-4 rounded-full border-2 border-cyan-400/80 shadow-[0_0_20px_#38BDF8]"
          aria-hidden="true"
        />

        {/* Realistic High-Fidelity Mark 85 Nano Gauntlet SVG */}
        <svg
          width={150}
          height={180}
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 overflow-visible drop-shadow-[0_0_35px_rgba(220,38,38,0.7)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Hot-Rod Red Gradient */}
            <linearGradient id="imCrimson" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="45%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* Stark Gold Accent Gradient */}
            <linearGradient id="imGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            {/* Repulsor Core Radial Glow */}
            <radialGradient id="repulsorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#E0F2FE" />
              <stop offset="65%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Nano Carbon Under-Mesh */}
            <linearGradient id="imCarbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27272A" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
          </defs>

          {/* Forearm Bracer Armor (Red & Gold) */}
          <path
            d="M26 112L32 68H68L74 112C62 116 38 116 26 112Z"
            fill="url(#imCrimson)"
            stroke="#7F1D1D"
            strokeWidth="1.5"
          />

          {/* Gold Mechanical Inlays */}
          <path d="M36 74L40 108H45L42 74Z" fill="url(#imGold)" stroke="#92400E" strokeWidth="0.8" />
          <path d="M64 74L60 108H55L58 74Z" fill="url(#imGold)" stroke="#92400E" strokeWidth="0.8" />

          {/* Central Nano Vein Conduit (Arc Reactor power line) */}
          <line x1="50" y1="72" x2="50" y2="108" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="72" x2="50" y2="108" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

          {/* Palm Plate */}
          <path
            d="M25 68C22 55 24 44 26 38C30 36 70 36 74 38C76 44 78 55 75 68H25Z"
            fill="url(#imCrimson)"
            stroke="#991B1B"
            strokeWidth="1.5"
          />

          {/* Thumb (Right Side in palm view) */}
          <path
            d="M74 46C83 48 88 56 86 64C84 68 76 68 74 65V46Z"
            fill="url(#imCrimson)"
            stroke="#991B1B"
            strokeWidth="1.2"
          />
          <path d="M78 50L83 55L81 60L76 57Z" fill="url(#imGold)" />

          {/* 4 Fingers (Index, Middle, Ring, Pinky) with Knuckle Armor */}
          {/* Pinky */}
          <path d="M26 38L24 16C24 12 30 12 31 16L33 38Z" fill="url(#imCrimson)" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M25 24H30" stroke="#FDE047" strokeWidth="1.5" />

          {/* Ring */}
          <path d="M34 37L36 9C36 5 44 5 44 9L45 37Z" fill="url(#imCrimson)" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M37 20H43" stroke="#FDE047" strokeWidth="1.5" />

          {/* Middle */}
          <path d="M47 37L49 6C49 2 57 2 57 6L58 37Z" fill="url(#imCrimson)" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M50 18H56" stroke="#FDE047" strokeWidth="1.5" />

          {/* Index */}
          <path d="M60 38L62 12C62 8 69 8 70 12L69 38Z" fill="url(#imCrimson)" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M63 22H68" stroke="#FDE047" strokeWidth="1.5" />

          {/* ── SIX INFINITY STONES IN KNUCKLE HOUSINGS ── */}
          {/* Power Stone (Purple) - Pinky knuckle */}
          <circle cx="28" cy="38" r="3.5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="0.8" className="animate-pulse" />
          {/* Space Stone (Blue) - Ring knuckle */}
          <circle cx="41" cy="37" r="3.8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" className="animate-pulse" />
          {/* Reality Stone (Red) - Middle knuckle */}
          <circle cx="53" cy="37" r="4.0" fill="#EF4444" stroke="#FFFFFF" strokeWidth="0.8" className="animate-pulse" />
          {/* Soul Stone (Orange) - Index knuckle */}
          <circle cx="65" cy="38" r="3.6" fill="#FB923C" stroke="#FFFFFF" strokeWidth="0.8" className="animate-pulse" />
          {/* Time Stone (Green) - Thumb knuckle */}
          <circle cx="78" cy="46" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="0.8" className="animate-pulse" />

          {/* ── CENTRAL PALM ARC REACTOR REPULSOR (Mind Stone / Power Core) ── */}
          <circle cx="50" cy="53" r="14" fill="#09090B" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="50" cy="53" r="11" fill="url(#repulsorGlow)" className="animate-pulse" />
          <circle cx="50" cy="53" r="6" fill="#FFFFFF" className="drop-shadow-[0_0_10px_#38BDF8]" />
          <polygon
            points="50,44 57,56 43,56"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Repulsor Ray Burst if Activating */}
          {isActivating && (
            <g className="animate-ping">
              <circle cx="50" cy="53" r="28" stroke="#E0F2FE" strokeWidth="3" opacity="0.9" />
              <line x1="50" y1="53" x2="50" y2="0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="53" x2="95" y2="15" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="53" x2="5" y2="15" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Subtle Cinematic Interaction Hint */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/40 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] backdrop-blur-md">
          <Zap className="h-3 w-3 text-cyan-400 animate-pulse" />
          RESTORE THE UNIVERSE
          <Sparkles className="h-3 w-3 text-amber-300" />
        </span>

        <p className="font-heading text-xs text-ivory/60 tracking-wider">
          Click the Nano Gauntlet to snap and reassemble the entire portfolio
        </p>
      </motion.div>
    </motion.div>
  );
}
