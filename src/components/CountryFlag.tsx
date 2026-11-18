import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  countryName: string;
  size?: 'sm' | 'md';
}

/**
 * Vector SVG country flags so Origin & Destination port hubs render crisp,
 * colorful flags across all browsers and operating systems.
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName,
  size = 'md',
}) => {
  const dims = size === 'sm' ? 'w-5 h-3.5' : 'w-7 h-5';

  const renderFlagSvg = () => {
    switch (countryCode) {
      case 'SG':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="10" fill="#EF3340" />
            <rect y="10" width="28" height="10" fill="#FFFFFF" />
            <circle cx="7.5" cy="5" r="3.4" fill="#FFFFFF" />
            <circle cx="8.8" cy="5" r="2.8" fill="#EF3340" />
            <circle cx="9.6" cy="3.5" r="0.65" fill="#FFFFFF" />
            <circle cx="11.2" cy="4.7" r="0.65" fill="#FFFFFF" />
            <circle cx="10.6" cy="6.6" r="0.65" fill="#FFFFFF" />
            <circle cx="8.6" cy="6.6" r="0.65" fill="#FFFFFF" />
            <circle cx="8.0" cy="4.7" r="0.65" fill="#FFFFFF" />
          </svg>
        );
      case 'NL':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="6.7" fill="#AE1C28" />
            <rect y="6.7" width="28" height="6.6" fill="#FFFFFF" />
            <rect y="13.3" width="28" height="6.7" fill="#21468B" />
          </svg>
        );
      case 'CN':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#DE2910" />
            <polygon points="5.5,2.5 6.3,4.8 8.7,4.8 6.8,6.2 7.5,8.5 5.5,7.1 3.5,8.5 4.2,6.2 2.3,4.8 4.7,4.8" fill="#FFDE00" />
            <circle cx="10.5" cy="2.6" r="0.8" fill="#FFDE00" />
            <circle cx="12.0" cy="4.4" r="0.8" fill="#FFDE00" />
            <circle cx="12.0" cy="6.8" r="0.8" fill="#FFDE00" />
            <circle cx="10.5" cy="8.6" r="0.8" fill="#FFDE00" />
          </svg>
        );
      case 'US':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#FFFFFF" />
            <rect y="0" width="28" height="2.8" fill="#B22234" />
            <rect y="5.6" width="28" height="2.8" fill="#B22234" />
            <rect y="11.2" width="28" height="2.8" fill="#B22234" />
            <rect y="16.8" width="28" height="3.2" fill="#B22234" />
            <rect width="13" height="11.2" fill="#3C3B6E" />
            <circle cx="3.2" cy="3" r="0.7" fill="#FFFFFF" />
            <circle cx="6.5" cy="3" r="0.7" fill="#FFFFFF" />
            <circle cx="9.8" cy="3" r="0.7" fill="#FFFFFF" />
            <circle cx="4.8" cy="5.6" r="0.7" fill="#FFFFFF" />
            <circle cx="8.2" cy="5.6" r="0.7" fill="#FFFFFF" />
            <circle cx="3.2" cy="8.2" r="0.7" fill="#FFFFFF" />
            <circle cx="6.5" cy="8.2" r="0.7" fill="#FFFFFF" />
            <circle cx="9.8" cy="8.2" r="0.7" fill="#FFFFFF" />
          </svg>
        );
      case 'AE':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect x="7" width="21" height="6.7" fill="#00732F" />
            <rect x="7" y="6.7" width="21" height="6.6" fill="#FFFFFF" />
            <rect x="7" y="13.3" width="21" height="6.7" fill="#000000" />
            <rect width="7" height="20" fill="#FF0000" />
          </svg>
        );
      case 'DE':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="6.7" fill="#000000" />
            <rect y="6.7" width="28" height="6.6" fill="#DD0000" />
            <rect y="13.3" width="28" height="6.7" fill="#FFCE00" />
          </svg>
        );
      case 'JP':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#FFFFFF" />
            <circle cx="14" cy="10" r="5.5" fill="#BC002D" />
          </svg>
        );
      case 'KR':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#FFFFFF" />
            <path d="M14 5.5 A4.5 4.5 0 0 1 14 14.5 A2.25 2.25 0 0 1 14 10 A2.25 2.25 0 0 0 14 5.5Z" fill="#CD2E3A" />
            <path d="M14 14.5 A4.5 4.5 0 0 1 14 5.5 A2.25 2.25 0 0 1 14 10 A2.25 2.25 0 0 0 14 14.5Z" fill="#0047A0" />
            <line x1="5" y1="5.5" x2="7.5" y2="3.5" stroke="#000" strokeWidth="1.4" />
            <line x1="20.5" y1="3.5" x2="23" y2="5.5" stroke="#000" strokeWidth="1.4" />
            <line x1="5" y1="14.5" x2="7.5" y2="16.5" stroke="#000" strokeWidth="1.4" />
            <line x1="20.5" y1="16.5" x2="23" y2="14.5" stroke="#000" strokeWidth="1.4" />
          </svg>
        );
      case 'HK':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#DE2910" />
            <circle cx="14" cy="10" r="4.5" fill="#FFFFFF" fillOpacity="0.9" />
            <circle cx="14" cy="10" r="1.8" fill="#DE2910" />
          </svg>
        );
      case 'AU':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#012169" />
            <rect width="13" height="10" fill="#012169" />
            <line x1="0" y1="5" x2="13" y2="5" stroke="#FFFFFF" strokeWidth="2.4" />
            <line x1="6.5" y1="0" x2="6.5" y2="10" stroke="#FFFFFF" strokeWidth="2.4" />
            <line x1="0" y1="5" x2="13" y2="5" stroke="#C8102E" strokeWidth="1.2" />
            <line x1="6.5" y1="0" x2="6.5" y2="10" stroke="#C8102E" strokeWidth="1.2" />
            <circle cx="6.5" cy="14.5" r="1.5" fill="#FFFFFF" />
            <circle cx="21" cy="5" r="1" fill="#FFFFFF" />
            <circle cx="24" cy="9" r="1" fill="#FFFFFF" />
            <circle cx="19" cy="10" r="1" fill="#FFFFFF" />
            <circle cx="21" cy="15" r="1" fill="#FFFFFF" />
          </svg>
        );
      case 'BE':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="9.3" height="20" fill="#000000" />
            <rect x="9.3" width="9.4" height="20" fill="#FDDA24" />
            <rect x="18.7" width="9.3" height="20" fill="#EF3340" />
          </svg>
        );
      case 'GB':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#012169" />
            <line x1="0" y1="0" x2="28" y2="20" stroke="#FFFFFF" strokeWidth="3.5" />
            <line x1="28" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="3.5" />
            <line x1="0" y1="0" x2="28" y2="20" stroke="#C8102E" strokeWidth="1.5" />
            <line x1="28" y1="0" x2="0" y2="20" stroke="#C8102E" strokeWidth="1.5" />
            <line x1="14" y1="0" x2="14" y2="20" stroke="#FFFFFF" strokeWidth="5.2" />
            <line x1="0" y1="10" x2="28" y2="10" stroke="#FFFFFF" strokeWidth="5.2" />
            <line x1="14" y1="0" x2="14" y2="20" stroke="#C8102E" strokeWidth="3" />
            <line x1="0" y1="10" x2="28" y2="10" stroke="#C8102E" strokeWidth="3" />
          </svg>
        );
      case 'ES':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="5" fill="#AA151B" />
            <rect y="5" width="28" height="10" fill="#F1BF00" />
            <rect y="15" width="28" height="5" fill="#AA151B" />
            <rect x="6" y="7" width="3.5" height="6" rx="1" fill="#AA151B" />
          </svg>
        );
      case 'CA':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="7" height="20" fill="#FF0000" />
            <rect x="7" width="14" height="20" fill="#FFFFFF" />
            <rect x="21" width="7" height="20" fill="#FF0000" />
            <polygon points="14,5 15.8,8.5 18.5,8 16.5,11 17.5,13 14.7,12.5 14.7,15.5 13.3,15.5 13.3,12.5 10.5,13 11.5,11 9.5,8 12.2,8.5" fill="#FF0000" />
          </svg>
        );
      case 'SA':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#006C35" />
            <rect x="6" y="7" width="16" height="2.2" rx="1" fill="#FFFFFF" />
            <rect x="7" y="12.5" width="14" height="1.5" rx="0.75" fill="#FFFFFF" />
          </svg>
        );
      case 'IN':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="6.7" fill="#FF9933" />
            <rect y="6.7" width="28" height="6.6" fill="#FFFFFF" />
            <rect y="13.3" width="28" height="6.7" fill="#138808" />
            <circle cx="14" cy="10" r="2.3" fill="none" stroke="#000080" strokeWidth="0.9" />
            <circle cx="14" cy="10" r="0.6" fill="#000080" />
          </svg>
        );
      case 'PA':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="14" height="10" fill="#FFFFFF" />
            <rect x="14" width="14" height="10" fill="#DA121A" />
            <rect y="10" width="14" height="10" fill="#072357" />
            <rect x="14" y="10" width="14" height="10" fill="#FFFFFF" />
            <circle cx="7" cy="5" r="2" fill="#072357" />
            <circle cx="21" cy="15" r="2" fill="#DA121A" />
          </svg>
        );
      case 'BR':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#009C3B" />
            <polygon points="14,2.5 25,10 14,17.5 3,10" fill="#FFDF00" />
            <circle cx="14" cy="10" r="4" fill="#002776" />
          </svg>
        );
      case 'ZA':
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="7" fill="#E03C31" />
            <rect y="13" width="28" height="7" fill="#001489" />
            <rect y="7" width="28" height="6" fill="#FFFFFF" />
            <polygon points="0,0 13,10 0,20" fill="#007749" />
            <polygon points="0,3 8,10 0,17" fill="#FFB81C" />
            <polygon points="0,4.5 6.5,10 0,15.5" fill="#000000" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 28 20" className="w-full h-full">
            <rect width="28" height="20" fill="#1D4ED8" />
            <circle cx="14" cy="10" r="5" fill="#FFFFFF" />
          </svg>
        );
    }
  };

  return (
    <span
      title={countryName}
      aria-label={`${countryName} flag`}
      className={`inline-flex shrink-0 overflow-hidden rounded-[4px] border border-slate-300/80 shadow-xs ${dims}`}
    >
      {renderFlagSvg()}
    </span>
  );
};
