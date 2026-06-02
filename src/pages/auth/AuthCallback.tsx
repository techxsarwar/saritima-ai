import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { LogoIcon } from '../../components/icons/LogoIcon';

export const AuthCallback: React.FC = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const hasCompleted = user.unsafeMetadata?.hasCompletedOnboarding === true;
      if (hasCompleted) {
        navigate('/chat', { replace: true });
      } else {
        navigate('/create-account', { replace: true });
      }
    } else if (isLoaded && !user) {
      navigate('/', { replace: true });
    }
  }, [isLoaded, user, navigate]);

  return (
    <div className="page-container center-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#F7F7F8' }}>
      <LogoIcon size={40} className="thinking-roll" />
      <p style={{ marginTop: '1rem', color: '#666', fontFamily: 'sans-serif' }}>Setting up your workspace...</p>
    </div>
  );
};
