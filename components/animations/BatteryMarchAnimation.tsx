import React from 'react';

const HazardousWasteAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Collection Point */}
      <path d="M30 95 L 70 95 L 75 50 L 25 50 Z" fill="#b91c1c" />
      <path d="M40 60 l 5 10 l 5 -10 l 5 10 l 5 -10" strokeWidth="2" />

      {/* Item (Paint Can) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards', '--ty': '20px' } as React.CSSProperties}>
        <rect x="42" y="30" width="16" height="20" rx="2" fill="#FFFFFF" />
        <rect x="40" y="28" width="20" height="4" rx="1" fill="#FFFFFF" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default HazardousWasteAnimation;