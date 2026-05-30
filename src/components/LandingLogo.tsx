import React from 'react';
import { LogoIcon } from './LogoIcon';

export const LandingLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', userSelect: 'none' }}>
      <LogoIcon size={32} />
    </div>
  );
};
