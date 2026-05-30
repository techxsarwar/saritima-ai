import React, { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import './Checkbox.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`custom-checkbox-wrapper ${className}`}>
      <div className="checkbox-input-container">
        <input type="checkbox" className="hidden-checkbox" {...props} />
        <div className="styled-checkbox">
          {props.checked && <Check size={14} color="white" strokeWidth={3} />}
        </div>
      </div>
      <div className="checkbox-label">{label}</div>
    </label>
  );
};
