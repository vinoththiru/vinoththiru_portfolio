interface Props {
  isSnapping?: boolean;
  onClick?: () => void;
  size?: number;
  className?: string;
}

export function IronManNanoGauntlet({
  isSnapping = false,
  onClick,
  size = 110,
  className = '',
}: Props) {
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
      className={`group relative inline-flex cursor-pointer select-none items-center justify-center rounded-3xl p-3 transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 ${className}`}
      aria-label="Iron Man Nano Gauntlet: Click to snap and restore all sections!"
      title="Click to snap Iron Man's Nano Gauntlet and restore everything!"
    >
      {/* Background Arc Reactor & Gamma Surge Glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-500 ${
          isSnapping
            ? 'bg-gradient-to-r from-red-600 via-amber-400 to-cyan-400 opacity-90 blur-3xl animate-ping'
            : 'bg-gradient-to-r from-red-600/40 via-amber-500/30 to-cyan-400/40 opacity-70 blur-2xl group-hover:opacity-100'
        }`}
        aria-hidden="true"
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible drop-shadow-[0_0_25px_rgba(220,38,38,0.7)]"
      >
        {/* Snapping Energy Lightning Surge (When Snapped) */}
        {isSnapping && (
          <g className="animate-pulse">
            <line x1="50" y1="42" x2="50" y2="-20" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <line x1="31" y1="27" x2="-15" y2="5" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            <line x1="44" y1="25" x2="35" y2="-25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="26" x2="85" y2="-20" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="28" x2="115" y2="10" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
            <line x1="21" y1="33" x2="-20" y2="40" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            {/* Gamma Surge Shockwave */}
            <circle cx="50" cy="45" r="38" stroke="#38BDF8" strokeWidth="2" opacity="0.8" strokeDasharray="6 4" />
          </g>
        )}

        {/* ── IRON MAN MARK 85 NANO GAUNTLET ARMOR (Hot-Rod Red & Gold) ── */}

        {/* Forearm Armor Base (Deep Crimson & Scarlet Red) */}
        <path
          d="M28 92L34 54H66L72 92C60 96 40 96 28 92Z"
          fill="url(#ironManCrimson)"
          stroke="#7F1D1D"
          strokeWidth="1.5"
        />

        {/* Forearm Gold Trim Plates */}
        <path d="M38 60L42 88H47L44 60Z" fill="url(#ironManGold)" stroke="#B45309" strokeWidth="0.8" />
        <path d="M62 60L58 88H53L56 60Z" fill="url(#ironManGold)" stroke="#B45309" strokeWidth="0.8" />

        {/* Arc Reactor Nano Circuit Line (Cyan Glowing Vein down center) */}
        <line x1="50" y1="58" x2="50" y2="88" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="58" x2="50" y2="88" stroke="#E0F2FE" strokeWidth="0.8" strokeLinecap="round" />

        {/* Palm & Knuckle Plate (Iron Man Red) */}
        <path
          d="M24 54L22 34C22 30 25 28 29 28H71C75 28 78 30 78 34L76 54H24Z"
          fill="url(#ironManRed)"
          stroke="#991B1B"
          strokeWidth="1.5"
        />

        {/* Knuckle Gold Band Accent */}
        <path d="M26 36H74V40H26Z" fill="url(#ironManGold)" opacity="0.9" />

        {/* ── FINGERS (Red Nanotech Segments with Silver Joints) ── */}
        {isSnapping ? (
          /* Snapping Gesture (Thumb & Middle finger pressed tight) */
          <g>
            <path d="M22 34L32 30C36 28 38 34 32 36L24 38Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
            <path d="M30 28L34 20C36 18 40 20 38 24L34 28Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
            <path d="M42 28L40 18C39 15 44 14 46 17L47 28Z" fill="#F87171" stroke="#7F1D1D" strokeWidth="1" />
            <path d="M54 28L56 19C57 16 61 17 61 20L58 28Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
            <path d="M66 28L68 22C69 19 73 20 72 23L69 28Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
          </g>
        ) : (
          /* Ready Pose */
          <g>
            {/* Thumb */}
            <path d="M22 34L13 29C11 28 12 24 15 25L24 30Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
            {/* Index */}
            <path d="M29 28L27 15C26 12 30 12 32 15L34 28Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
            {/* Middle */}
            <path d="M41 28L42 11C42 8 46 8 47 11L48 28Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
            {/* Ring */}
            <path d="M53 28L55 14C56 11 60 11 60 14L59 28Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
            {/* Pinky */}
            <path d="M65 28L68 19C69 16 73 17 72 20L70 28Z" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
          </g>
        )}

        {/* ── THE 6 GLOWING INFINITY STONES ON NANO GAUNTLET ── */}
        {/* 1. Mind Stone (Center Yellow on Palm/Back) */}
        <ellipse cx="50" cy="42" rx="6" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="49" cy="40" rx="3.5" ry="4.5" fill="#FEF08A" />
        <circle cx="48" cy="38" r="1.5" fill="#FFFFFF" />

        {/* 2. Power Stone (Purple - Index Knuckle) */}
        <circle cx="31" cy="27" r="3.2" fill="#A855F7" stroke="#6B21A8" strokeWidth="0.8" />
        <circle cx="30" cy="26" r="1" fill="#FFFFFF" />

        {/* 3. Space Stone (Blue - Middle Knuckle) */}
        <circle cx="44.5" cy="25" r="3.2" fill="#38BDF8" stroke="#0369A1" strokeWidth="0.8" />
        <circle cx="43.5" cy="24" r="1" fill="#FFFFFF" />

        {/* 4. Reality Stone (Red - Ring Knuckle) */}
        <circle cx="57.5" cy="26" r="3.2" fill="#EF4444" stroke="#991B1B" strokeWidth="0.8" />
        <circle cx="56.5" cy="25" r="1" fill="#FFFFFF" />

        {/* 5. Soul Stone (Orange - Pinky Knuckle) */}
        <circle cx="68.5" cy="28" r="2.8" fill="#F97316" stroke="#9A3412" strokeWidth="0.8" />
        <circle cx="67.5" cy="27" r="0.8" fill="#FFFFFF" />

        {/* 6. Time Stone (Green - Thumb Joint) */}
        <circle cx="21" cy="33" r="3.2" fill="#22C55E" stroke="#15803D" strokeWidth="0.8" />
        <circle cx="20" cy="32" r="1" fill="#FFFFFF" />

        {/* Gradients */}
        <defs>
          <linearGradient id="ironManRed" x1="22" y1="28" x2="78" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF4444" />
            <stop offset="0.5" stopColor="#DC2626" />
            <stop offset="1" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="ironManCrimson" x1="28" y1="54" x2="72" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DC2626" />
            <stop offset="0.5" stopColor="#B91C1C" />
            <stop offset="1" stopColor="#7F1D1D" />
          </linearGradient>
          <linearGradient id="ironManGold" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FDE68A" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
