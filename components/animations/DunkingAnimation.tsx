import React from 'react';

const PaperRecyclingAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Paper Bin */}
      <rect x="30" y="50" width="40" height="45" rx="3" fill="#3b82f6" />
      <g style={{ animation: 'lid-lift 3s ease-in-out forwards', transformOrigin: '30px 50px' }}>
        <rect x="30" y="45" width="40" height="5" rx="2" fill="#2563eb" />
      </g>
      
      {/* Item (Paper Stack) */}
      <g style={{ animation: 'item-fall 3s ease-out forwards' }}>
        <path d="M40 30 h 20 v 5 h -20 z" fill="#FFFFFF" />
        <path d="M42 25 h 18 v 5 h -18 z" fill="#FFFFFF" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 3s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M40 25 c -5 0 -5 -10 0 -10 h 20 a 5 5 0 0 1 5 5 v 5 z" />
      </g>
    </g>
  </svg>
);

export default PaperRecyclingAnimation;