interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Captain America Shield - EXACT ORIGINAL COLORS
 * Vibrant Red (#E62429), Crisp White (#FFFFFF), Royal Blue (#004F9F), White Star
 */
export function CaptainShieldIcon({ className = 'h-4 w-4', size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      {/* Outer Red Ring */}
      <circle cx="12" cy="12" r="11" fill="#E62429" />
      {/* Second White Ring */}
      <circle cx="12" cy="12" r="8.8" fill="#FFFFFF" />
      {/* Third Red Ring */}
      <circle cx="12" cy="12" r="6.6" fill="#E62429" />
      {/* Center Blue Field */}
      <circle cx="12" cy="12" r="4.4" fill="#004F9F" />
      {/* White Star */}
      <polygon
        points="12,8.6 13,10.8 15.4,11 13.6,12.5 14.1,14.8 12,13.6 9.9,14.8 10.4,12.5 8.6,11 11,10.8"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Iron Man Arc Reactor - EXACT ORIGINAL COLORS
 * Metallic Titanium (#1E293B), Electric Cyan Glow (#00F0FF), White-hot Core (#FFFFFF)
 */
export function ArcReactorIcon({ className = 'h-4 w-4', size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_6px_rgba(0,240,255,0.7)] ${className}`}
      aria-hidden="true"
    >
      {/* Dark Titanium Housing */}
      <circle cx="12" cy="12" r="11" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      {/* Outer Cyan Ring */}
      <circle cx="12" cy="12" r="9.2" stroke="#00F0FF" strokeWidth="1.2" strokeOpacity="0.9" />
      {/* Copper Induction Coils (10 radial tick nodes) */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
        <rect
          key={deg}
          x="11.4"
          y="2.8"
          width="1.2"
          height="2.5"
          rx="0.5"
          fill="#F59E0B"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      {/* Middle Cyan Ring */}
      <circle cx="12" cy="12" r="6.2" fill="#082F49" stroke="#38BDF8" strokeWidth="1.2" />
      {/* Glowing Triangular Reactor Nodes */}
      <polygon points="12,6.8 13.6,9.8 10.4,9.8" fill="#00F0FF" />
      <polygon points="16.5,14.5 15,11.8 13.5,14.5" fill="#00F0FF" />
      <polygon points="7.5,14.5 10.5,14.5 9,11.8" fill="#00F0FF" />
      {/* Inner White-Hot Fusion Core */}
      <circle cx="12" cy="12" r="2.8" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * Batman Bat-Signal Emblem - EXACT ORIGINAL COLORS
 * Classic Yellow Oval (#FFD100), Jet Black Border (#000000), Iconic Black Bat
 */
export function BatmanBatIcon({ className = 'h-4 w-4', size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      {/* Yellow Oval with Black Outline */}
      <ellipse cx="12" cy="12" rx="11" ry="8" fill="#FFD100" stroke="#09090B" strokeWidth="1.5" />
      {/* Inner Thin Black Oval Rim */}
      <ellipse cx="12" cy="12" rx="9.8" ry="7" fill="none" stroke="#09090B" strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Iconic Solid Black Bat Silhouette */}
      <path
        d="M12 7.8c-.5-1.3-1-1.9-1.5-1.9-.3 0-.4.5-.6 1.3-.6 0-1.5.4-2.3 1.1C6.5 7 4.8 6.7 3.5 7.1c.3 1.5 1 2.9 1.9 4.1-1 .6-1.7 1.5-1.9 2.6 1.4.3 2.9-.2 4.1-1 .6 1 1.6 1.8 2.8 2.2-.3-1-.2-1.9.4-2.5 0 0 .8.7 1.2.7s1.2-.7 1.2-.7c.6.6.8 1.5.4 2.5 1.2-.4 2.2-1.2 2.8-2.2 1.2.8 2.6 1.3 4.1 1-.2-1.1-.9-2-1.9-2.6.9-1.2 1.6-2.6 1.9-4.1-1.3-.4-3-.1-4.1 1.1-.8-.7-1.7-1.1-2.3-1.1-.2-.8-.3-1.3-.6-1.3-.5 0-1 .6-1.5 1.9z"
        fill="#09090B"
      />
    </svg>
  );
}

/**
 * Spider-Man Logo - EXACT ORIGINAL COLORS
 * Marvel Scarlet Red Field (#E62429), Web Lattice (#000000), White Spider-Eyes
 */
export function SpiderIcon({ className = 'h-4 w-4', size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      {/* Scarlet Red Mask Badge */}
      <circle cx="12" cy="12" r="11" fill="#E62429" stroke="#991B1B" strokeWidth="1" />
      {/* Subtle Web Grid Lines */}
      <line x1="12" y1="1" x2="12" y2="23" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="1" y1="12" x2="23" y2="12" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.4" />
      <circle cx="12" cy="12" r="5" stroke="#000000" strokeWidth="0.7" strokeOpacity="0.3" fill="none" />
      {/* Left Spider Eye (White with bold black outline) */}
      <path
        d="M6 10C7.5 12.5 9 14.5 10.5 15C10 13 8.5 10.5 7.5 9C6.8 9.3 6.2 9.6 6 10Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right Spider Eye (White with bold black outline) */}
      <path
        d="M18 10C16.5 12.5 15 14.5 13.5 15C14 13 15.5 10.5 16.5 9C17.2 9.3 17.8 9.6 18 10Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wakanda / Black Panther Logo - EXACT ORIGINAL COLORS
 * Obsidian Jet Black (#09090B), Vibranium Silver Claws (#E2E8F0), Purple Energy (#9333EA)
 */
export function WakandaClawIcon({ className = 'h-4 w-4', size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_5px_rgba(147,51,234,0.5)] ${className}`}
      aria-hidden="true"
    >
      {/* Obsidian Black Circle with Vibranium Purple Glow Rim */}
      <circle cx="12" cy="12" r="11" fill="#09090B" stroke="#9333EA" strokeWidth="1.2" />
      {/* Silver Vibranium Panther Mask & Teeth */}
      <path d="M12 4.5L10 8H14L12 4.5Z" fill="#F8FAFC" />
      <path d="M7 6.5L8.8 9.8L6.2 10.5L4.5 8L7 6.5Z" fill="#CBD5E1" />
      <path d="M17 6.5L15.2 9.8L17.8 10.5L19.5 8L17 6.5Z" fill="#CBD5E1" />
      {/* White Panther Slit Eyes */}
      <polygon points="8.5,12 10.5,13 9,14" fill="#A855F7" />
      <polygon points="15.5,12 13.5,13 15,14" fill="#A855F7" />
      {/* Vibranium Necklace Claws */}
      <path d="M7.8 11.5L12 18L16.2 11.5L14.5 11L12 15L9.5 11L7.8 11.5Z" fill="#F8FAFC" />
      <path d="M12 18.5L10.5 21H13.5L12 18.5Z" fill="#A855F7" />
    </svg>
  );
}

/**
 * Superman 'S' Shield Logo - EXACT ORIGINAL COLORS
 * Golden Yellow (#FFD100), Iconic Red 'S' and Diamond Border (#E62429)
 */
export function SupermanShieldIcon({ className = 'h-4 w-4', size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      {/* Yellow Pentagonal Shield Background */}
      <polygon
        points="3,4.5 21,4.5 22,8.5 12,21.5 2,8.5"
        fill="#FFD100"
        stroke="#E62429"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Iconic Red 'S' Geometry */}
      <path
        d="M6 7.5H18L17 9.5H10.5L11 11H16.5C18 12 18 14 16 15.5L12 19L8 15.5H11.5L13.5 14H8C7 13 7 11 8.5 9.5L6 7.5Z"
        fill="#E62429"
      />
    </svg>
  );
}
