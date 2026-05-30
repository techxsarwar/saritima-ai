import React from 'react';
import { SignIn } from '@clerk/react';
import { AuthLayout } from '../components/AuthLayout';

export const SignInPage: React.FC = () => {
  return (
    <AuthLayout>
      <SignIn 
        routing="path" 
        path="/sign-in" 
        signUpUrl="/sign-up" 
        forceRedirectUrl="/create-account"
        appearance={{
          elements: {
            rootBox: { width: '100%' },
            card: { width: '100%', boxShadow: 'none', border: '1px solid #E5E5E5' }
          }
        }}
      />
    </AuthLayout>
  );
};
