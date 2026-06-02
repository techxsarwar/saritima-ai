import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { Logo } from '../../components/icons/Logo';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';

export const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || 'noreplyxyvo@gmail.com';
  const [terms, setTerms] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [promo, setPromo] = useState(true);

  const handleCreate = () => {
    navigate('/onboarding/name');
  };

  return (
    <div className="page-container">
      <header className="onboarding-header">
        <Logo />
      </header>
      
      <main className="center-content onboarding-main">
        <div className="onboarding-card">
          <h1 className="onboarding-title">Let's create your account</h1>
          <p className="onboarding-subtitle">A few things for you to review</p>
          
          <div className="onboarding-box">
            <Checkbox 
              checked={terms} 
              onChange={(e) => setTerms(e.target.checked)}
              label={
                <>I agree to Parellogram's <a href="#" style={{textDecoration:'underline'}}>Consumer Terms</a> and <a href="#" style={{textDecoration:'underline'}}>Acceptable Use Policy</a> and confirm that I am at least 18 years of age.</>
              }
            />
            <Checkbox 
              checked={privacy} 
              onChange={(e) => setPrivacy(e.target.checked)}
              label={
                <>I consent to collection and use of my personal information in accordance with the <a href="#" style={{textDecoration:'underline'}}>Privacy Policy</a>.</>
              }
            />
            <Checkbox 
              checked={promo} 
              onChange={(e) => setPromo(e.target.checked)}
              label="Subscribe to occasional promotional emails and notifications. You can opt out any time."
            />
            
            <Button 
              fullWidth 
              onClick={handleCreate} 
              disabled={!terms || !privacy}
              style={{ marginTop: '1rem' }}
            >
              Create account
            </Button>
          </div>
        </div>
      </main>

      <footer className="onboarding-footer">
        <p>Email verified as {email}</p>
        <a href="#">Use a different email</a>
      </footer>
    </div>
  );
};
