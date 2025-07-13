import React from 'react';

const ReuseBoxAnimation: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <g fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Box */}
      <g style={{ animation: 'box-wobble 4s ease-in-out forwards' }}>
        <path d="M15 95 v -40 h 70 v 40 h -70 z" fill="#a16207" />
        <path d="M15 55 l 35 -10 l 35 10" stroke="#FFFFFF" strokeOpacity="0.5" />
        <path d="M50 45 v 50" stroke="#FFFFFF" strokeOpacity="0.5" />
      </g>
      
      {/* Cat */}
      <g style={{ animation: 'cat-peek-jump 3.5s ease-in-out forwards' }} fill="#FFFFFF">
        {/* Head */}
        <circle cx="50" cy="35" r="10"/>
        {/* Ears */}
        <path d="M43 26 l -4 -4" />
        <path d="M57 26 l 4 -4" />
      </g>
    </g>
  </svg>
);

export default ReuseBoxAnimation;