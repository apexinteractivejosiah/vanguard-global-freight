import React from 'react';

interface VanguardLogoProps {
  size?: 'header' | 'footer';
  variant?: 'glass-dark' | 'light';
  showWordmark?: boolean;
}

export const VanguardLogo: React.FC<VanguardLogoProps> = ({
  size = 'header',
  variant = 'glass-dark',
  showWordmark = true,
}) => {
  const isHeader = size === 'header';

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
      <span
        className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#38BDF8] via-[#1D4ED8] to-[#0B1B3B] border border-sky-200/60 shadow-[0_6px_18px_rgba(2,132,199,0.38)] shrink-0 ${
          isHeader ? 'w-9 h-9' : 'w-7 h-7'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className={isHeader ? 'w-6 h-6' : 'w-4.5 h-4.5'}
        >
          <defs>
            <linearGradient
              id={`vgf-blue-white-${size}`}
              x1="4"
              y1="4"
              x2="32"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <circle
            cx="18"
            cy="18"
            r="13.5"
            stroke={`url(#vgf-blue-white-${size})`}
            strokeWidth="1.6"
            strokeOpacity="0.95"
          />
          <ellipse
            cx="18"
            cy="18"
            rx="13.5"
            ry="5.5"
            transform="rotate(-22 18 18)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />
          <path
            d="M11 11.5L18 25.5L25 11.5H21.2L18 18.6L14.8 11.5H11Z"
            fill={`url(#vgf-blue-white-${size})`}
          />
        </svg>
      </span>
      {showWordmark && (
        <span
          className={`font-editorial italic font-semibold tracking-tight bg-clip-text text-transparent ${
            variant === 'glass-dark'
              ? 'bg-gradient-to-r from-white via-[#E0F2FE] to-[#7DD3FC]'
              : 'bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7]'
          } ${isHeader ? 'text-2xl sm:text-3xl' : 'text-lg'}`}
        >
          Vanguard Global Freight
        </span>
      )}
    </span>
  );
};
