
import React from 'react';
import { LanguageCode } from '../contexts/LanguageContext';

interface FlagIconProps extends React.SVGProps<SVGSVGElement> {
  lang: LanguageCode;
}

const FlagIcon: React.FC<FlagIconProps> = ({ lang, ...props }) => {
  const flags: Record<LanguageCode, React.ReactNode> = {
    en: (
      <svg {...props} viewBox="0 0 5 3">
        <rect width="5" height="3" fill="#012169" />
        <path d="M0,0L5,3M0,3L5,0" stroke="#FFF" strokeWidth="0.6" />
        <path d="M0,0L5,3M0,3L5,0" stroke="#C8102E" strokeWidth="0.4" />
        <path d="M2.5,0V3M0,1.5H5" stroke="#FFF" strokeWidth="1" />
        <path d="M2.5,0V3M0,1.5H5" stroke="#C8102E" strokeWidth="0.6" />
      </svg>
    ),
    de: (
      <svg {...props} viewBox="0 0 5 3">
        <rect width="5" height="3" fill="#FFCE00" />
        <rect width="5" height="2" fill="#DD0000" />
        <rect width="5" height="1" fill="#000" />
      </svg>
    ),
    it: (
      <svg {...props} viewBox="0 0 3 2">
        <rect width="1" height="2" fill="#009246" />
        <rect x="1" width="1" height="2" fill="#FFF" />
        <rect x="2" width="1" height="2" fill="#CE2B37" />
      </svg>
    ),
    pl: (
      <svg {...props} viewBox="0 0 8 5">
        <rect width="8" height="5" fill="#DC143C" />
        <rect width="8" height="2.5" fill="#FFF" />
      </svg>
    ),
    ro: (
      <svg {...props} viewBox="0 0 3 2">
        <rect width="1" height="2" fill="#002B7F" />
        <rect x="1" width="1" height="2" fill="#FCD116" />
        <rect x="2" width="1" height="2" fill="#CE1126" />
      </svg>
    ),
    tr: (
      <svg {...props} viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#E30A17" />
        <circle cx="11" cy="10" r="5" fill="#FFF" />
        <circle cx="12.5" cy="10" r="4" fill="#E30A17" />
        <path d="M18.5,10l-3.5-2v4z" fill="#FFF" transform="rotate(20 16.5 10)" />
      </svg>
    ),
    ar: (
      <svg {...props} viewBox="0 0 12 8">
        <rect width="12" height="8" fill="#006C35" />
        <text x="6" y="5.5" fontSize="3.5" fill="white" textAnchor="middle" fontFamily="Inter, Arial, sans-serif">
          العربية
        </text>
      </svg>
    ),
  };

  return flags[lang] || null;
};

export default FlagIcon;
