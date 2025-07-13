import React from 'react';

const DepositReturnAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Machine */}
      <rect x="20" y="30" width="60" height="65" rx="5" fill="#475569" />
      <rect x="25" y="50" width="30" height="15" rx="2" fill="#1e293b"/>
      <circle cx="70" cy="80" r="10" fill="#1e293b" />
      
      {/* Coin */}
      <g style={{ animation: 'coin-pop 4s ease-out forwards' }}>
        <circle cx="70" cy="80" r="5" fill="#f59e0b" />
      </g>
      
      {/* Bottle */}
      <g style={{ animation: 'bottle-insert 4s ease-in-out forwards', '--tx': '-30px' } as React.CSSProperties}>
        <path d="M70 50 h 10 v 15 h -10 z" fill="#FFFFFF"/>
        <path d="M80 57.5 h 5" />
      </g>
      
      {/* Hand */}
      <g style={{ animation: 'hand-enter-drop 4s ease-in-out forwards' }} fill="#FFFFFF">
        <path d="M85 50 c -5 0 -5 -10 0 -10 h 10 a 5 5 0 0 1 5 5 v 5 z" transform="scale(-1, 1) translate(-100, 0)" />
      </g>
    </g>
  </svg>
);

export default DepositReturnAnimation;