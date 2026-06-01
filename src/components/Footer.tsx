import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Show, useUser } from '@clerk/react';
import { LandingLogo } from './LandingLogo';
import './Footer.css';

export const Footer: React.FC = () => {
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
              <Link to="/info/products/saritima">Saritima</Link>
              <Link to="/info/products/saritima-code">Saritima Code</Link>
              <Link to="/info/products/saritima-code-enterprise">Saritima Code for Enterprise</Link>
              <Link to="/info/products/saritima-cowork">Saritima Cowork</Link>
              <Link to="/info/products/pro-plan">Pro plan</Link>
              <Link to="/info/products/max-plan">Max plan</Link>
              <Link to="/info/products/team-plan">Team plan</Link>
              <Link to="/info/products/enterprise-plan">Enterprise plan</Link>
              <Link to="/info/products/download-app">Download app</Link>
              <Link to="/info/products/pricing">Pricing</Link>
              <Show when="signed-out">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/sign-in'); }}>Log in</a>
              </Show>
              <Show when="signed-in">
                <a href="#" onClick={(e) => { e.preventDefault(); handleContinue(); }}>Go to App</a>
              </Show>
            </div>

            <div className="link-group">
              <h4>Features</h4>
              <Link to="/info/features/saritima-security">Saritima Security</Link>
              <Link to="/info/features/saritima-chrome">Saritima for Chrome</Link>
              <Link to="/info/features/saritima-slack">Saritima for Slack</Link>
              <Link to="/info/features/saritima-excel">Saritima for Excel</Link>
              <Link to="/info/features/saritima-powerpoint">Saritima for Powerpoint</Link>
              <Link to="/info/features/saritima-word">Saritima for Word</Link>
              <Link to="/info/features/skills">Skills</Link>
            </div>

            <div className="link-group">
              <h4>Models</h4>
              <Link to="/info/models/opus">Opus</Link>
              <Link to="/info/models/sonnet">Sonnet</Link>
              <Link to="/info/models/standard">Standard</Link>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <div className="link-group">
              <h4>Solutions</h4>
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

            <div className="link-group">
              <h4>Saritima Platform</h4>
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

          {/* Column 3 */}
          <div className="footer-col">
            <div className="link-group">
              <h4>Resources</h4>
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

            <div className="link-group">
              <h4>Community</h4>
              <Link to="/info/community/campus-program">Campus Program</Link>
              <Link to="/info/community/startups-program">Startups program</Link>
              <Link to="/info/community/tutorials">Tutorials</Link>
              <Link to="/info/community/use-cases">Use cases</Link>
            </div>

            <div className="link-group">
              <h4>Company</h4>
              <Link to="/info/company/parellogram">Parellogram</Link>
              <Link to="/info/company/careers">Careers</Link>
              <Link to="/info/company/economic-futures">Economic Futures</Link>
              <Link to="/info/company/research">Research</Link>
              <Link to="/info/company/parellogram-news">Parellogram news</Link>
              <Link to="/info/company/responsible-scaling-policy">Responsible Scaling Policy</Link>
              <Link to="/info/company/security-and-compliance">Security and compliance</Link>
              <Link to="/info/company/transparency">Transparency</Link>
            </div>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <div className="link-group">
              <h4>Help and security</h4>
              <Link to="/info/legal/availability">Availability</Link>
              <Link to="/info/legal/status">Status</Link>
              <Link to="/info/legal/support-center">Support center</Link>
            </div>

            <div className="link-group">
              <h4 style={{ opacity: 0, userSelect: 'none' }}>Legal</h4>
              <Link to="/info/legal/terms-and-policies">Terms and policies</Link>
              <Link to="/info/legal/privacy-choices">Privacy choices</Link>
              <Link to="/info/legal/privacy-policy">Privacy policy</Link>
              <Link to="/info/legal/responsible-disclosure-policy">Responsible disclosure policy</Link>
              <Link to="/info/legal/terms-of-service-commercial">Terms of service: Commercial</Link>
              <Link to="/info/legal/terms-of-service-consumer">Terms of service: Consumer</Link>
              <Link to="/info/legal/usage-policy">Usage policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
