import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/main/LandingPage';
import { CreateAccount } from './pages/auth/CreateAccount';
import { OnboardingName } from './pages/onboarding/OnboardingName';
import { OnboardingRole } from './pages/onboarding/OnboardingRole';
import { BeforeFirstChat } from './pages/onboarding/BeforeFirstChat';
import { ChatInterface } from './pages/main/ChatInterface';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { AuthCallback } from './pages/auth/AuthCallback';
import { ContentPage } from './pages/main/ContentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/onboarding/name" element={<OnboardingName />} />
        <Route path="/onboarding/role" element={<OnboardingRole />} />
        <Route path="/onboarding/before-first-chat" element={<BeforeFirstChat />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/info/:category/:pageId" element={<ContentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
