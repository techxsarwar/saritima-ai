import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CreateAccount } from './pages/CreateAccount';
import { OnboardingName } from './pages/OnboardingName';
import { OnboardingRole } from './pages/OnboardingRole';
import { BeforeFirstChat } from './pages/BeforeFirstChat';
import { ChatInterface } from './pages/ChatInterface';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

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
      </Routes>
    </Router>
  );
}

export default App;
