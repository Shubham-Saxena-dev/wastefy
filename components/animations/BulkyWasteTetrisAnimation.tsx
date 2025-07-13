import React from 'react';

const BulkyWasteAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-hidden">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Ground */}
      <path d="M0 95 h 100" />
      
      {/* Sofa */}
      <g style={{ animation: 'sofa-lift 4s ease-in-out forwards' }}>
        <path d="M15 95 v -20 h 40 v 20" />
        <path d="M15 75 c 0 -10 -10 -10 -10 -20" />
        <path d="M55 75 c 0 -10 10 -10 10 -20" />
      </g>
      
      {/* Truck */}
      <g style={{ animation: 'truck-drive-by 4s ease-in-out forwards' }}>
        <rect x="10" y="55" width="50" height="40" rx="3" fill="#FFFFFF" />
        <rect x="60" y="75" width="20" height="20" rx="3" fill="#FFFFFF" />
        <circle cx="25" cy="95" r="5" fill="#4b5563" />
        <circle cx="65" cy="95" r="5" fill="#4b5563" />
      </g>
    </g>
  </svg>
);

export default BulkyWasteAnimation;