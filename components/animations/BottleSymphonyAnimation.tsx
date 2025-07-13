import React from 'react';

const ClothingDonationAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Clothing Bin */}
      <rect x="25" y="40" width="50" height="55" rx="3" fill="#FFFFFF" />
      <rect x="35" y="40" width="30" height="10" fill="#4b5563"/>
      <g style={{ animation: 'lid-lift 3s ease-in-out forwards', transformOrigin: '35px 50px' }}>
          <path d="M35 50 h 30 v -5 a 5 5 0 0 0 -5 -5 h -20 a 5 5 0 0 0 -5 5 z" fill="#64748b" />
      </g>
      
      {/* Item (T-Shirt) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards', '--ty': '15px' } as React.CSSProperties}>
        <path
          d="M32 35 L 25 42 V 55 H 75 V 42 L 68 35 H 58 V 40 H 42 V 35 Z"
          fill="#f43f5e"
          stroke="none"
        />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default ClothingDonationAnimation;