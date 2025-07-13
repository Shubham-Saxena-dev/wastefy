import React from 'react';

const PackagingRecyclingAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Yellow Sack */}
      <path d="M30 95 C 30 60, 70 60, 70 95" fill="#facc15" stroke="none" />
      <path d="M35 50 C 40 45, 60 45, 65 50" fill="#f59e0b" />

      {/* Item 1 (Yogurt Pot) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards', '--ty': '15px' } as React.CSSProperties}>
        <path d="M35 30 h 15 l -2 15 h -11 z" fill="#FFFFFF" />
      </g>
      
      {/* Item 2 (Milk Carton) */}
      <g style={{ animation: 'item-fall 3.2s ease-out forwards', '--ty': '18px', '--tx': '20px' } as React.CSSProperties}>
        <path d="M55 25 h 15 v 20 h -15 z" fill="#FFFFFF" />
        <path d="M55 25 l 7.5 -5 l 7.5 5" fill="#FFFFFF" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3.5s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default PackagingRecyclingAnimation;