import React from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  // showText and textColor are no longer used but kept for compatibility.
  showText?: boolean;
  textColor?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ size = 40, className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap');`}
          </style>
        </defs>
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" rx="22" fill="#dcfce7"/>

        {/* Bin */}
        <path d="M22 35.5 h56 v-8 a4 4 0 0 0 -4 -4 H26 a4 4 0 0 0 -4 4 v8 z" fill="#15803d"/>
        <rect x="42" y="20.5" width="16" height="4" rx="2" fill="#166534" />
        <path d="M26 35.5 L31 78 a4 4 0 0 1 4 4 h28 a4 4 0 0 1 4 -4 L74 35.5 H26 z" fill="#16a34a"/>
        <path d="M37 38 v38 M49 38 v38 M61 38 v38" stroke="#15803d" strokeWidth="1.5"/>

        {/* Recycling Symbol */}
        <g transform="translate(49, 56.5) scale(0.8)" fill="#dcfce7">
            <path d="M0 -12 L -8 -6 L -5 -6 L -5 0 L 5 0 L 5 -6 L 8 -6 Z" />
            <path d="M10.39 6 L 3.39 -4 L 6.39 -4 L 0 -12 L -6.39 -4 L -3.39 -4 L -10.39 6 L -3.39 6 L 0 0 Z" transform="rotate(120)" />
            <path d="M10.39 6 L 3.39 -4 L 6.39 -4 L 0 -12 L -6.39 -4 L -3.39 -4 L -10.39 6 L -3.39 6 L 0 0 Z" transform="rotate(240)" />
        </g>
        
        {/* Banana Peel */}
        <g stroke="#fef08a" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M70 65 C 65 50, 80 50, 80 65" />
            <path d="M72 65 C 68 52, 83 52, 82 65" />
        </g>

        {/* Paper */}
        <g transform="translate(74, 42) rotate(15)">
            <rect width="18" height="22" fill="#fff" rx="2"/>
            <path d="M4 6 h10 M4 11 h10 M4 16 h7" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        
        {/* Text */}
        <text x="50" y="93" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="800" fill="#14532d" textAnchor="middle">Wastefy</text>
      </svg>
    </div>
  );
};

export default AppLogo;
