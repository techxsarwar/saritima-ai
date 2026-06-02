import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { Logo } from '../../components/icons/Logo';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { EyeOff, Shield } from 'lucide-react';
import './Onboarding.css'; // Reusing common onboarding styles

export const BeforeFirstChat: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [improve, setImprove] = useState(true);

  const handleContinue = async () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            hasCompletedOnboarding: true
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
    navigate('/chat');
  };

  return (
    <div className="page-container">
      <header className="onboarding-header">
        <Logo />
      </header>
      
      <main className="center-content onboarding-main">
        <div className="onboarding-card">
          <h1 className="onboarding-title">Before your first chat</h1>
          <p className="onboarding-subtitle">A few things to know, plus one setting to review</p>
          
          <div className="onboarding-box info-list-box">
            <div className="info-row">
              <div className="info-icon purple-bg">
                <EyeOff size={18} color="#4A5568" />
              </div>
              <div className="info-text">
                <strong>Ad-free chats:</strong> We won't show you ads or let advertisers influence what Saritima-ai says.
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-icon green-bg">
                <Shield size={18} color="#276749" />
              </div>
              <div className="info-text">
                <strong>Built to help, not harm:</strong> Automated safeguards protect your chats from violent, abusive, or deceptive content.
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-icon">
                <Toggle checked={improve} onChange={(e) => setImprove(e.target.checked)} />
              </div>
              <div className="info-text">
                <strong>Help Saritima-ai improve:</strong> Allow the use of your chats and coding sessions to train and improve Saritima-ai. Change anytime in privacy settings. <a href="#" style={{textDecoration:'underline'}}>Learn more</a>
              </div>
            </div>
          </div>
          
          <Button fullWidth onClick={handleContinue} style={{ marginTop: '1.5rem' }}>
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
};
