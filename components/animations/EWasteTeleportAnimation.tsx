import React from 'react';

const EWasteRecyclingAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* E-waste Box */}
      <rect x="25" y="50" width="50" height="45" rx="3" fill="#8b5cf6" />
      <path d="M45 65 l 5 5 l 10 -10" strokeWidth="3" />
      <path d="M40 50 h 20" stroke="#a78bfa" />
      
      {/* Item (Phone) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards' }}>
        <rect x="42" y="30" width="16" height="25" rx="2" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="1" fill="#8b5cf6" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default EWasteRecyclingAnimation;