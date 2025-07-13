import React from 'react';

const GlassRecyclingAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Glass Container */}
      <rect x="25" y="40" width="50" height="55" rx="5" fill="#22c55e" />
      <circle cx="50" cy="30" r="10" stroke="#FFFFFF" fill="#16a34a"/>
      
      {/* Clink Effect */}
      <g style={{ animation: 'clink-effect 3.5s ease-out forwards', transformOrigin: '50px 70px' }}>
        <path d="M50 60 l -10 10" />
        <path d="M50 60 l 10 10" />
        <path d="M40 70 h 20" />
      </g>
      
      {/* Item (Bottle) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards', '--ty': '20px' } as React.CSSProperties}>
        <path d="M45 25 h 10 v 10 l -2 10 h -6 l -2 -10 z" fill="#FFFFFF" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default GlassRecyclingAnimation;