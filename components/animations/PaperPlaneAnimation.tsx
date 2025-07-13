import React from 'react';

const OrganicWasteAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Bio Bin */}
      <rect x="30" y="50" width="40" height="45" rx="3" fill="#78350f" />
      <g style={{ animation: 'lid-lift 3s ease-in-out forwards', transformOrigin: '30px 50px' }}>
        <rect x="30" y="45" width="40" height="5" rx="2" fill="#9a3412" />
      </g>
      
      {/* Sprout */}
      <g style={{ animation: 'sprout-grow 4s ease-out forwards', transformOrigin: '50px 50px' }}>
         <path d="M50 50 c 0 -10 10 -10 10 -20" stroke="#84cc16" />
         <path d="M50 50 c 0 -10 -10 -10 -10 -20" stroke="#84cc16" />
      </g>
      
      {/* Item (Apple Core) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards' }}>
        <path d="M50 25 a 5 5 0 0 1 -10 0" fill="#FFFFFF" />
        <path d="M50 35 a 5 5 0 0 0 -10 0" fill="#FFFFFF" />
        <path d="M48 20 v -5" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default OrganicWasteAnimation;