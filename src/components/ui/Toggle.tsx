import React, { type InputHTMLAttributes } from 'react';
import './Toggle.css';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Toggle: React.FC<ToggleProps> = ({ className = '', ...props }) => {
  return (
    <label className={`toggle-wrapper ${className}`}>
      <input type="checkbox" className="hidden-toggle" {...props} />
      <div className="styled-toggle">
        <div className="toggle-knob"></div>
      </div>
    </label>
  );
};
