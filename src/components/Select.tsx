import React, { type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({ className = '', fullWidth = false, children, ...props }) => {
  return (
    <div className={`select-wrapper ${fullWidth ? 'select-full' : ''} ${className}`}>
      <select className="custom-select" {...props}>
        {children}
      </select>
      <div className="select-icon">
        <ChevronDown size={20} color="#555" />
      </div>
    </div>
  );
};
