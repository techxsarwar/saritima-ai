import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LandingLogo } from '../../components/icons/LandingLogo';
import { LayoutTemplate, ShieldCheck, ChevronDown } from 'lucide-react';
import { Show, UserButton, useUser } from '@clerk/react';
import { LogoIcon } from '../../components/icons/LogoIcon';
import { Footer } from '../../components/layout/Footer';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleContinue = () => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true' || user?.unsafeMetadata?.hasCompletedOnboarding === true;
    if (hasCompletedOnboarding) {
      navigate('/chat');
    } else {
      navigate('/create-account');
    }
  };

  return (
    <div className="landing-page-v2">
      {/* Announcement Banner */}
      <div style={{ backgroundColor: '#2D3748', color: '#FFF', padding: '12px', textAlign: 'center', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
        🎉 Special Announcement: Saritima is absolutely free for everyone for the next 40 days!
      </div>
      <header className="landing-header">
        <LandingLogo />
        
        <nav className="header-nav">
          <div className="nav-item-wrapper">
            <button className="nav-item">Meet Saritima <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <Link to="/info/products/saritima">Saritima</Link>
              <Link to="/info/products/saritima-code">Saritima Code</Link>
              <Link to="/info/products/saritima-code-enterprise">Saritima Code for Enterprise</Link>
              <Link to="/info/products/saritima-cowork">Saritima Cowork</Link>
              <Link to="/info/products/download-app">Download app</Link>
              <div className="dropdown-divider"></div>
              <h4>Models</h4>
              <Link to="/info/models/opus">Opus</Link>
              <Link to="/info/models/sonnet">Sonnet</Link>
              <Link to="/info/models/standard">Standard</Link>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Platform <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <Link to="/info/platform/overview">Overview</Link>
              <Link to="/info/platform/developer-docs">Developer docs</Link>
              <Link to="/info/platform/pricing">Pricing</Link>
              <Link to="/info/platform/marketplace">Marketplace</Link>
              <Link to="/info/platform/amazon-bedrock">Amazon Bedrock</Link>
              <Link to="/info/platform/google-cloud-vertex-ai">Google Cloud’s Vertex AI</Link>
              <Link to="/info/platform/microsoft-foundry">Microsoft Foundry</Link>
              <Link to="/info/platform/regional-compliance">Regional compliance</Link>
              <Link to="/info/platform/console-login">Console login</Link>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Solutions <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <Link to="/info/solutions/ai-agents">AI agents</Link>
              <Link to="/info/solutions/code-modernization">Code modernization</Link>
              <Link to="/info/solutions/coding">Coding</Link>
              <Link to="/info/solutions/customer-support">Customer support</Link>
              <Link to="/info/solutions/education">Education</Link>
              <Link to="/info/solutions/financial-services">Financial services</Link>
              <Link to="/info/solutions/government">Government</Link>
              <Link to="/info/solutions/healthcare">Healthcare</Link>
              <Link to="/info/solutions/life-sciences">Life sciences</Link>
              <Link to="/info/solutions/nonprofits">Nonprofits</Link>
              <Link to="/info/solutions/security">Security</Link>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Pricing <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <Link to="/info/products/pro-plan">Pro plan</Link>
              <Link to="/info/products/max-plan">Max plan</Link>
              <Link to="/info/products/team-plan">Team plan</Link>
              <Link to="/info/products/enterprise-plan">Enterprise plan</Link>
              <div className="dropdown-divider"></div>
              <Link to="/info/products/pricing">Pricing overview</Link>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Resources <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <Link to="/info/resources/blog">Blog</Link>
              <Link to="/info/resources/saritima-partner-network">Saritima partner network</Link>
              <Link to="/info/resources/connectors">Connectors</Link>
              <Link to="/info/resources/courses">Courses</Link>
              <Link to="/info/resources/customer-stories">Customer stories</Link>
              <Link to="/info/resources/engineering-at-parellogram">Engineering at Parellogram</Link>
              <Link to="/info/resources/events">Events</Link>
              <Link to="/info/resources/plugins">Plugins</Link>
              <Link to="/info/resources/powered-by-saritima">Powered by Saritima</Link>
              <Link to="/info/resources/service-partners">Service partners</Link>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <button className="header-btn outline">Contact sales</button>
          <Show when="signed-out">
            <button className="header-btn filled" onClick={() => navigate('/sign-in')}>Try Saritima-ai</button>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>

      {/* 1. The Hero Section */}
      <section className="hero-section">
        <h1 className="hero-headline">The intelligence behind<br/>high-end workflows.</h1>
        <p className="hero-subheadline">Advanced AI assistance for technical documentation and professional project generation.</p>
        
        <Show when="signed-out">
          <button className="cta-button" onClick={() => navigate('/sign-up')}>Try Saritima-ai</button>
        </Show>
        <Show when="signed-in">
          <button className="cta-button" onClick={handleContinue}>Continue to Saritima-ai</button>
        </Show>

        {/* Premium Conversation Preview */}
        <div className="premium-preview-wrapper">
          <div className="premium-preview-container">
            <div className="mock-conversation">
              <div className="mock-user-msg">
                Refactor the authentication module to use JWT and implement role-based access control. Provide the implementation plan first.
              </div>
              <div className="mock-ai-msg">
                <div className="ai-header">
                  <div className="ai-avatar-mini">
                    <LogoIcon size={14} />
                  </div>
                  <span className="ai-name">Saritima-ai</span>
                </div>
                <div className="ai-body">
                  <p>I'll structure this refactor into three core phases to ensure zero downtime:</p>
                  <ol>
                    <li><strong>Schema Migration:</strong> Add the roles enum and permission table to the database.</li>
                    <li><strong>Middleware Implementation:</strong> Build the JWT verification and RBAC guards.</li>
                    <li><strong>Route Protection:</strong> Progressively apply guards to the existing API endpoints.</li>
                  </ol>
                  <p>Would you like to review the schema migration script first?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Capabilities Grid */}
      <section className="capabilities-section">
        <div className="grid-container">
          <div className="grid-item">
            <div className="icon-wrapper">
              <ShieldCheck size={24} color="#1A1A1A" strokeWidth={1.5} />
            </div>
            <h3>Intelligent Processing</h3>
            <p>Built for unparalleled accuracy in workflow management.</p>
          </div>
          <div className="grid-item">
            <div className="icon-wrapper">
              <LayoutTemplate size={24} color="#1A1A1A" strokeWidth={1.5} />
            </div>
            <h3>Seamless Workspace</h3>
            <p>A refined environment to chat and document simultaneously.</p>
          </div>
          <div className="grid-item">
            <div className="icon-wrapper">
              <ShieldCheck size={24} color="#1A1A1A" strokeWidth={1.5} />
            </div>
            <h3>Enterprise Security</h3>
            <p>Your proprietary data remains completely private.</p>
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-header">
          <h2>Explore plans</h2>
        </div>
        
        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Free</h3>
              <p>Try Saritima</p>
              <div className="price-display">
                <span className="price">$0</span>
              </div>
              <p className="price-sub">Free for everyone</p>
            </div>
            <div className="pricing-card-body">
              <ul>
                <li>Chat on web, iOS, Android, and on your desktop</li>
                <li>Generate code and visualize data</li>
                <li>Write, edit, and create content</li>
                <li>Analyze text and images</li>
                <li>Ability to search the web</li>
                <li>Create files and execute code</li>
                <li>Unlock more from Saritima with desktop extensions</li>
                <li>Connect Slack and Google Workspace services</li>
                <li>Integrate any context or tool through connectors with remote MCP</li>
                <li>Extended thinking for complex work</li>
              </ul>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="pricing-card highlighted">
            <div className="pricing-card-header">
              <h3>Pro</h3>
              <p>For everyday productivity</p>
              <div className="price-display">
                <span className="price">$17</span>
              </div>
              <p className="price-sub">Per month with annual subscription discount ($200 billed up front). $20 if billed monthly.</p>
              <p className="price-sub micro">No commitment · Cancel anytime</p>
            </div>
            <div className="pricing-card-body">
              <p className="tier-includes">Everything in Free, plus:</p>
              <ul>
                <li>More usage*</li>
                <li>Saritima Code</li>
                <li>Cowork</li>
                <li>Unlimited projects</li>
                <li>Access to Research</li>
                <li>Memory across conversations</li>
                <li>More Saritima models</li>
                <li>Saritima in Excel</li>
                <li>Saritima in Chrome</li>
              </ul>
            </div>
          </div>

          {/* Max Tier */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Max</h3>
              <p>5–20x more usage than Pro</p>
              <div className="price-display">
                <span className="price-label">From</span>
                <span className="price">$100</span>
              </div>
              <p className="price-sub">Per month billed monthly</p>
              <p className="price-sub micro">No commitment · Cancel anytime</p>
            </div>
            <div className="pricing-card-body">
              <p className="tier-includes">Everything in Pro, plus:</p>
              <ul>
                <li>Choose 5x or 20x more usage than Pro*</li>
                <li>Recommended for Saritima Code & Cowork</li>
                <li>Higher output limits for all tasks</li>
                <li>Early access to advanced Saritima features</li>
                <li>Priority access at high traffic times</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="pricing-disclaimer">
          *Usage limits apply. Prices shown don’t include applicable tax. Prices and plans are subject to change at Parellogram's discretion.
        </p>
      </section>

      {/* 4. FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What is Saritima and how does it work?</h3>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-item">
              <h3>What should I use Saritima for?</h3>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-item">
              <h3>How much does it cost to use?</h3>
              <span className="faq-icon">+</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
