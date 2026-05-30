import React, { type InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ className = '', fullWidth = false, ...props }) => {
  return (
    <input 
      className={`custom-input ${fullWidth ? 'input-full' : ''} ${className}`} 
      {...props} 
    />
  );
};
