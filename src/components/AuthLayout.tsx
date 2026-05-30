import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from './LogoIcon';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-layout-container">
      {/* Left side with Motion Graphics */}
      <div className="auth-graphic-side">
        <div className="fluid-gradient"></div>
        <div className="fluid-gradient-overlay"></div>
        
        <div className="auth-graphic-content">
          <button 
            className="auth-graphic-logo" 
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <LogoIcon size={28} />
            Saritima
          </button>
          
          <div className="auth-graphic-text-container">
            <div className="auth-graphic-headline">
              Meet Saritima.
              <br />
              Your advanced AI assistant.
            </div>
            <div className="auth-graphic-subheadline">
              Built by <span className="highlight-name">Sarwar Altaf Dar</span> with the aim of revolutionizing how we interact with technology through seamless, intelligent workflows.
            </div>
          </div>
        </div>
      </div>

      {/* Right side with Auth Form */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          {children}
        </div>
      </div>
    </div>
  );
};
