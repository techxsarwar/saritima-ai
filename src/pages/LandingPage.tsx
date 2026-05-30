import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingLogo } from '../components/LandingLogo';
import { LayoutTemplate, ShieldCheck, ChevronDown } from 'lucide-react';
import { Show, UserButton } from '@clerk/react';
import { LogoIcon } from '../components/LogoIcon';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
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
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima Code</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima Code for Enterprise</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima Cowork</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Download app</a>
              <div className="dropdown-divider"></div>
              <h4>Models</h4>
              <a href="#">Opus</a>
              <a href="#">Sonnet</a>
              <a href="#">Standard</a>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Platform <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <a href="#">Overview</a>
              <a href="#">Developer docs</a>
              <a href="#">Pricing</a>
              <a href="#">Marketplace</a>
              <a href="#">Amazon Bedrock</a>
              <a href="#">Google Cloud’s Vertex AI</a>
              <a href="#">Microsoft Foundry</a>
              <a href="#">Regional compliance</a>
              <a href="#">Console login</a>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Solutions <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <a href="#">AI agents</a>
              <a href="#">Code modernization</a>
              <a href="#">Coding</a>
              <a href="#">Customer support</a>
              <a href="#">Education</a>
              <a href="#">Financial services</a>
              <a href="#">Government</a>
              <a href="#">Healthcare</a>
              <a href="#">Life sciences</a>
              <a href="#">Nonprofits</a>
              <a href="#">Security</a>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Pricing <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Pro plan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Max plan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Team plan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Enterprise plan</a>
              <div className="dropdown-divider"></div>
              <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Pricing overview</a>
            </div>
          </div>
          <div className="nav-item-wrapper">
            <button className="nav-item">Resources <ChevronDown size={14} strokeWidth={2.5} /></button>
            <div className="dropdown-menu">
              <a href="#">Blog</a>
              <a href="#">Saritima partner network</a>
              <a href="#">Connectors</a>
              <a href="#">Courses</a>
              <a href="#">Customer stories</a>
              <a href="#">Engineering at Parellogram</a>
              <a href="#">Events</a>
              <a href="#">Plugins</a>
              <a href="#">Powered by Saritima</a>
              <a href="#">Service partners</a>
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

      {/* 5. The Footer */}
      <footer className="fat-footer dark-mode">
        <div className="footer-layout">
          {/* Left Side: Brand */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <LandingLogo />
            </div>
            <div className="footer-brand-bottom">
              <p className="by-brand">BY PARELLOGRAM</p>
              <p className="copyright-text">© 2026 PARELLOGRAM PBC</p>
              <div className="social-links">
                <span>X</span>
                <span>in</span>
                <span>YT</span>
                <span>IG</span>
              </div>
            </div>
          </div>

          {/* Right Side: Links Grid */}
          <div className="footer-links-grid">
            {/* Column 1 */}
            <div className="footer-col">
              <div className="link-group">
                <h4>Products</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima Code</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima Code for Enterprise</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Saritima Cowork</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Pro plan</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Max plan</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Team plan</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Enterprise plan</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Download app</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Pricing</a>
                <Show when="signed-out">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/sign-in'); }}>Log in</a>
                </Show>
                <Show when="signed-in">
                  <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Go to App</a>
                </Show>
              </div>

              <div className="link-group">
                <h4>Features</h4>
                <a href="#">Saritima Security</a>
                <a href="#">Saritima for Chrome</a>
                <a href="#">Saritima for Slack</a>
                <a href="#">Saritima for Excel</a>
                <a href="#">Saritima for Powerpoint</a>
                <a href="#">Saritima for Word</a>
                <a href="#">Skills</a>
              </div>

              <div className="link-group">
                <h4>Models</h4>
                <a href="#">Opus</a>
                <a href="#">Sonnet</a>
                <a href="#">Standard</a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="footer-col">
              <div className="link-group">
                <h4>Solutions</h4>
                <a href="#">AI agents</a>
                <a href="#">Code modernization</a>
                <a href="#">Coding</a>
                <a href="#">Customer support</a>
                <a href="#">Education</a>
                <a href="#">Financial services</a>
                <a href="#">Government</a>
                <a href="#">Healthcare</a>
                <a href="#">Life sciences</a>
                <a href="#">Nonprofits</a>
                <a href="#">Security</a>
              </div>

              <div className="link-group">
                <h4>Saritima Platform</h4>
                <a href="#">Overview</a>
                <a href="#">Developer docs</a>
                <a href="#">Pricing</a>
                <a href="#">Marketplace</a>
                <a href="#">Amazon Bedrock</a>
                <a href="#">Google Cloud’s Vertex AI</a>
                <a href="#">Microsoft Foundry</a>
                <a href="#">Regional compliance</a>
                <a href="#">Console login</a>
              </div>
            </div>

            {/* Column 3 */}
            <div className="footer-col">
              <div className="link-group">
                <h4>Resources</h4>
                <a href="#">Blog</a>
                <a href="#">Saritima partner network</a>
                <a href="#">Connectors</a>
                <a href="#">Courses</a>
                <a href="#">Customer stories</a>
                <a href="#">Engineering at Parellogram</a>
                <a href="#">Events</a>
                <a href="#">Plugins</a>
                <a href="#">Powered by Saritima</a>
                <a href="#">Service partners</a>
              </div>

              <div className="link-group">
                <h4>Community</h4>
                <a href="#">Campus Program</a>
                <a href="#">Startups program</a>
                <a href="#">Tutorials</a>
                <a href="#">Use cases</a>
              </div>

              <div className="link-group">
                <h4>Company</h4>
                <a href="#">Parellogram</a>
                <a href="#">Careers</a>
                <a href="#">Economic Futures</a>
                <a href="#">Research</a>
                <a href="#">Parellogram news</a>
                <a href="#">Responsible Scaling Policy</a>
                <a href="#">Security and compliance</a>
                <a href="#">Transparency</a>
              </div>
            </div>

            {/* Column 4 */}
            <div className="footer-col">
              <div className="link-group">
                <h4>Help and security</h4>
                <a href="#">Availability</a>
                <a href="#">Status</a>
                <a href="#">Support center</a>
              </div>

              <div className="link-group">
                <h4 style={{ opacity: 0, userSelect: 'none' }}>Legal</h4>
                <a href="#">Terms and policies</a>
                <a href="#">Privacy choices</a>
                <a href="#">Privacy policy</a>
                <a href="#">Responsible disclosure policy</a>
                <a href="#">Terms of service: Commercial</a>
                <a href="#">Terms of service: Consumer</a>
                <a href="#">Usage policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
