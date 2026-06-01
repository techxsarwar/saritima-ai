import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import './Onboarding.css';

export const OnboardingName: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || 'noreplyxyvo@gmail.com';
  const [name, setName] = React.useState('');

  const handleContinue = async () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      if (user) {
        try {
          await user.update({
            firstName: name.trim().split(' ')[0],
            lastName: name.trim().split(' ').slice(1).join(' ') || undefined,
            unsafeMetadata: {
              ...user.unsafeMetadata,
              userName: name.trim()
            }
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
    navigate('/onboarding/role');
  };

  return (
    <div className="page-container">
      <header className="onboarding-header">
        <Logo />
      </header>
      
      <main className="center-content onboarding-main">
        <div className="onboarding-card">
          <h1 className="onboarding-title">What's your name?</h1>
          <p className="onboarding-subtitle">So Saritima knows what to call you.</p>
          
          <div className="onboarding-form">
            <Input 
              placeholder="Enter your name" 
              fullWidth 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleContinue();
              }}
            />
            <Button fullWidth onClick={handleContinue} style={{ marginTop: '1rem' }}>
              Continue
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
