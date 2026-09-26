import React from 'react';

interface CivioraLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const CivioraLogo: React.FC<CivioraLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isLight = variant === 'light' || variant === 'white';
  const textColor = isLight ? 'text-white' : 'text-slate-900';
  const subtitleColor = isLight ? 'text-emerald-300' : 'text-emerald-700';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Emblem: Modern Civic Leaf & Collaborative Community Ring */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-200 hover:scale-105"
        >
          {/* Outer Civic Circle background */}
          <circle cx="24" cy="24" r="22" className="fill-emerald-600/10 stroke-emerald-600/20" strokeWidth="1.5" />
          
          {/* Dynamic Civic Ring with Gradient */}
          <defs>
            <linearGradient id="civicGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="0.5" stopColor="#059669" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="16" y1="12" x2="36" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Organic Leaf & Civic Arch Node */}
          <path
            d="M24 6C14.059 6 6 14.059 6 24C6 31.42 10.492 37.785 16.924 40.54C16.326 39.02 16 37.348 16 35.6C16 26.984 22.984 20 31.6 20C33.348 20 35.02 20.326 36.54 20.924C33.785 14.492 27.42 10 20 10C18.63 10 17.295 10.15 16.012 10.435C18.423 7.697 21.996 6 26 6C25.33 6 24.664 6 24 6Z"
            fill="url(#civicGrad)"
            opacity="0.25"
          />

          {/* Clean stylized Civic Emblem: Intersecting Community Innovation Leaf */}
          <path
            d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 15.163 32.837 8 24 8ZM24 12C28.418 12 32.167 14.385 34.225 17.935C31.545 16.697 28.528 16 25.333 16C17.97 16 12 21.97 12 29.333C12 32.528 12.697 35.545 13.935 38.225C10.385 36.167 8 32.418 8 28C8 19.163 15.163 12 24 12Z"
            fill="url(#civicGrad)"
          />

          {/* Vibrant Core Innovation Leaf Petal */}
          <path
            d="M22 14C22 14 34 16 36 28C36 34 31 38 25 38C19 38 16 33 16 28C16 22 22 14 22 14Z"
            fill="url(#leafGrad)"
          />

          {/* Center Community Pillar / Leaf Stem */}
          <path
            d="M23 20C23 20 28 26 27 33"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="22" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Typography: CIVIORA + Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${textSizes[size]} font-['Cabinet_Grotesk'] ${textColor}`}>
            CIVIORA
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
        </div>
        {showSubtitle && (
          <span className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${subtitleColor}`}>
            Societal Innovation Portal
          </span>
        )}
      </div>
    </div>
  );
};
