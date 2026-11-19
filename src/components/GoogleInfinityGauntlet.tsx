interface GauntletProps {
  state: 'idle' | 'snapping' | 'snapped';
  onClick?: () => void;
  size?: number;
  className?: string;
}

export function GoogleInfinityGauntlet({
  state,
  onClick,
  size = 72,
  className = '',
}: GauntletProps) {
  const isSnapping = state === 'snapping';
  const isSnapped = state === 'snapped';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl p-1 ${className}`}
      aria-label={
        isSnapped
          ? 'Infinity Gauntlet: Time Stone active. Click to restore all elements!'
          : 'Infinity Gauntlet: Click to snap fingers and turn elements to dust!'
      }
      title={
        isSnapped
          ? 'Click to use Time Stone and reverse the snap!'
          : 'Click to snap fingers like Google Easter Egg!'
      }
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]"
      >
        {/* ── SNAPPING LASER BEAMS (Image 2: Multi-colored rays shooting out) ── */}
        {isSnapping && (
          <g className="animate-pulse">
            {/* Mind Stone Yellow Beam */}
            <line x1="50" y1="42" x2="50" y2="-15" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="42" x2="50" y2="-15" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

            {/* Power Stone Purple Beam */}
            <line x1="31" y1="27" x2="-10" y2="10" stroke="#C084FC" strokeWidth="3" strokeLinecap="round" />
            <line x1="31" y1="27" x2="-10" y2="10" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

            {/* Space Stone Blue Beam */}
            <line x1="44" y1="25" x2="30" y2="-20" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <line x1="44" y1="25" x2="30" y2="-20" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

            {/* Reality Stone Red Beam */}
            <line x1="58" y1="26" x2="80" y2="-15" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="26" x2="80" y2="-15" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

            {/* Soul Stone Orange Beam */}
            <line x1="68" y1="28" x2="110" y2="15" stroke="#FB923C" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="28" x2="110" y2="15" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

            {/* Time Stone Green Beam */}
            <line x1="21" y1="33" x2="-15" y2="45" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            <line x1="21" y1="33" x2="-15" y2="45" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

            {/* Central energy flash ring */}
            <circle cx="50" cy="40" r="30" stroke="#FEF08A" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
          </g>
        )}

        {/* ── TIME STONE ACTIVE AURA (When Snapped, Waiting for Reversal) ── */}
        {isSnapped && (
          <g>
            <circle cx="21" cy="33" r="16" fill="#22C55E" opacity="0.25" className="animate-ping" />
            <circle cx="21" cy="33" r="10" stroke="#4ADE80" strokeWidth="1.5" opacity="0.8" />
            <path
              d="M10 33 A11 11 0 1 1 32 33"
              stroke="#86EFAC"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="animate-spin origin-[21px_33px]"
              style={{ transformOrigin: '21px 33px' }}
            />
          </g>
        )}

        {/* ── GAUNTLET BASE & ARMOR (Gold / Bronze) ── */}
        {/* Forearm Bracer */}
        <path
          d="M28 92 L34 54 H66 L72 92 C60 96 40 96 28 92 Z"
          fill="url(#gauntletGoldBase)"
          stroke="#B45309"
          strokeWidth="1.5"
        />
        <line x1="42" y1="60" x2="42" y2="86" stroke="#92400E" strokeWidth="1.5" />
        <line x1="58" y1="60" x2="58" y2="86" stroke="#92400E" strokeWidth="1.5" />
        <line x1="50" y1="58" x2="50" y2="89" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 2" />

        {/* Hand Palm / Knuckle Plate */}
        <path
          d="M24 54 L22 34 C22 30 25 28 29 28 H71 C75 28 78 30 78 34 L76 54 H24 Z"
          fill="url(#gauntletGoldHighlight)"
          stroke="#B45309"
          strokeWidth="1.5"
        />

        {/* ── FINGERS SEGMENTS ── */}
        {isSnapping ? (
          /* Snapping pose: Thumb and Middle finger pressed together */
          <g>
            {/* Thumb curved inward */}
            <path d="M22 34 L32 30 C36 28 38 34 32 36 L24 38 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
            {/* Index curled */}
            <path d="M30 28 L34 20 C36 18 40 20 38 24 L34 28 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
            {/* Middle snapping */}
            <path d="M42 28 L40 18 C39 15 44 14 46 17 L47 28 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
            {/* Ring curled */}
            <path d="M54 28 L56 19 C57 16 61 17 61 20 L58 28 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
            {/* Pinky curled */}
            <path d="M66 28 L68 22 C69 19 73 20 72 23 L69 28 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          </g>
        ) : (
          /* Relaxed pose (Standard Google Easter Egg Gauntlet) */
          <g>
            {/* Thumb */}
            <path d="M22 34 L13 29 C11 28 12 24 15 25 L24 30 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            {/* Index */}
            <path d="M29 28 L27 15 C26 12 30 12 32 15 L34 28 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            {/* Middle */}
            <path d="M41 28 L42 11 C42 8 46 8 47 11 L48 28 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            {/* Ring */}
            <path d="M53 28 L55 14 C56 11 60 11 60 14 L59 28 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            {/* Pinky */}
            <path d="M65 28 L68 19 C69 16 73 17 72 20 L70 28 Z" fill="#D97706" stroke="#B45309" strokeWidth="1" />
          </g>
        )}

        {/* ── THE 6 INFINITY STONES ── */}
        {/* 1. Mind Stone (Center Yellow) */}
        <ellipse cx="50" cy="42" rx="6" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="49" cy="40" rx="3.5" ry="4.5" fill="#FEF08A" />

        {/* 2. Power Stone (Purple - Index Knuckle) */}
        <circle cx="31" cy="27" r="3.2" fill="#A855F7" stroke="#6B21A8" strokeWidth="0.8" />
        <circle cx="30" cy="26" r="1" fill="#F3E8FF" />

        {/* 3. Space Stone (Blue - Middle Knuckle) */}
        <circle cx="44.5" cy="25" r="3.2" fill="#38BDF8" stroke="#0369A1" strokeWidth="0.8" />
        <circle cx="43.5" cy="24" r="1" fill="#E0F2FE" />

        {/* 4. Reality Stone (Red - Ring Knuckle) */}
        <circle cx="57.5" cy="26" r="3.2" fill="#EF4444" stroke="#991B1B" strokeWidth="0.8" />
        <circle cx="56.5" cy="25" r="1" fill="#FEE2E2" />

        {/* 5. Soul Stone (Orange - Pinky Knuckle) */}
        <circle cx="68.5" cy="28" r="2.8" fill="#F97316" stroke="#9A3412" strokeWidth="0.8" />
        <circle cx="67.5" cy="27" r="0.8" fill="#FFEDD5" />

        {/* 6. Time Stone (Green - Thumb Joint) */}
        <circle
          cx="21"
          cy="33"
          r={isSnapped ? '4' : '3'}
          fill="#22C55E"
          stroke={isSnapped ? '#86EFAC' : '#15803D'}
          strokeWidth={isSnapped ? '1.5' : '0.8'}
        />
        <circle cx="20" cy="32" r="1.2" fill="#DCFCE7" />

        {/* Gradients */}
        <defs>
          <linearGradient id="gauntletGoldHighlight" x1="22" y1="28" x2="78" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.45" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="gauntletGoldBase" x1="28" y1="54" x2="72" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#D97706" />
            <stop offset="1" stopColor="#78350F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
