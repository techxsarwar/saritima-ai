import React from 'react';
import { SignUp } from '@clerk/react';
import { AuthLayout } from '../../components/layout/AuthLayout';

export const SignUpPage: React.FC = () => {
  return (
    <AuthLayout>
      <SignUp 
        routing="path" 
        path="/sign-up" 
        signInUrl="/sign-in" 
        forceRedirectUrl="/auth-callback"
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
