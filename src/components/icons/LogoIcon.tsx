import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 28, className = '' }) => {
  return (
    <div 
      className={`logo-icon-s ${className}`}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAF7F2', /* Claude-like warm organic off-white */
        color: '#1A1A1A',
        borderRadius: '25%', /* Smooth squircle */
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: size * 0.6,
        fontWeight: 600,
        fontStyle: 'italic',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
        border: '1px solid #E6E1DC',
        flexShrink: 0
      }}
    >
      S
    </div>
  );
};
