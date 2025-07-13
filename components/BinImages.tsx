import React from 'react';

export const WasteBinsImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(243, 244, 246)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'rgb(229, 231, 235)', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <rect width="100" height="50" fill="url(#grad1)" />
        <g transform="translate(10 10)">
            {/* Blue Bin */}
            <rect x="0" y="15" width="15" height="25" fill="#3B82F6" rx="1"/>
            <rect x="2" y="12" width="11" height="3" fill="#2563EB" rx="1"/>
            {/* Brown Bin */}
            <rect x="20" y="15" width="15" height="25" fill="#78350F" rx="1"/>
            <rect x="22" y="12" width="11" height="3" fill="#9A3412" rx="1"/>
            {/* Yellow Bin */}
            <rect x="40" y="15" width="15" height="25" fill="#FBBF24" rx="1"/>
            <rect x="42" y="12" width="11" height="3" fill="#F59E0B" rx="1"/>
            {/* Gray Bin */}
            <rect x="60" y="15" width="15" height="25" fill="#4B5563" rx="1"/>
            <rect x="62" y="12" width="11" height="3" fill="#374151" rx="1"/>
        </g>
    </svg>
);

export const SustainabilityImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice">
         <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(236, 253, 245)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'rgb(209, 250, 229)', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <rect width="100" height="50" fill="url(#grad2)" />
        <g fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(25 5) scale(1.2)">
            <path d="M17.7,11.3,15.3,4.7a2.8,2.8,0,0,0-5.2,0L7.7,11.3" />
            <path d="M22.3,11.3,24.7,4.7a2.8,2.8,0,0,0-5.2,0L17.3,11.3" />
            <path d="M32.5,23.5,25,31,17.5,23.5" />
            <path d="M25,3V15.8" />
            <path d="M37.7,21.3,35.3,14.7a2.8,2.8,0,0,0-5.2,0L27.7,21.3" />
            <circle cx="25" cy="22" r="10" strokeDasharray="5 2" transform="rotate(45 25 22)"/>
        </g>
    </svg>
);


export const LocationsImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="50" fill="#F0F9FF" />
        <path d="M0 50 L40 30 L60 40 L100 10 L100 50 Z" fill="#D1FAE5"/>
        <path d="M0 50 L40 30 L60 40 L100 10 L0 50" fill="none" stroke="#6EE7B7" strokeWidth="0.5"/>
        <g transform="translate(45 10)">
            <path d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 17.5 10 17.5s10-10 10-17.5C20 4.5 15.5 0 10 0z" fill="#EF4444"/>
            <circle cx="10" cy="10" r="3" fill="white"/>
        </g>
    </svg>
);