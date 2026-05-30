import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Select } from '../components/Select';
import './Onboarding.css';

export const OnboardingRole: React.FC = () => {
  const navigate = useNavigate();

  const handleSetupLater = () => {
    navigate('/onboarding/before-first-chat');
  };

  const handleRoleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      navigate('/onboarding/before-first-chat');
    }
  };

  return (
    <div className="page-container">
      <header className="onboarding-header">
        <Logo />
      </header>
      
      <main className="center-content onboarding-main">
        <div className="onboarding-card">
          <h1 className="onboarding-title">What kind of work do you do?</h1>
          <p className="onboarding-subtitle">Pick a role so Saritima can tailor your experience.</p>
          
          <div className="onboarding-form">
            <Select fullWidth onChange={handleRoleSelect} defaultValue="">
              <option value="" disabled>Select your role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="product_manager">Product Manager</option>
              <option value="other">Other</option>
            </Select>
          </div>
        </div>
      </main>

      <footer className="onboarding-footer">
        <button className="link-button" onClick={handleSetupLater}>Set up later</button>
      </footer>
    </div>
  );
};
