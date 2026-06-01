export interface FooterContentPage {
  title: string;
  category: string;
  body: string;
}

const generateMockContent = (title: string, category: string) => {
  let specificContent = '';

  switch (category) {
    case 'Products':
      if (title.includes('plan') || title === 'Pricing') {
        specificContent = `## Flexible Pricing for Every Need\n\nThe ${title} is designed to scale with your ambitions. Whether you're an independent developer, a fast-growing startup, or a Fortune 500 enterprise, Saritima provides transparent and predictable billing.\n\n### Included in ${title}:\n- **Priority Access:** Skip the queue during peak hours.\n- **Extended Context:** Analyze larger codebases and documents in a single prompt.\n- **Enterprise Security:** SOC2 Type II compliance and zero data retention for model training (on applicable tiers).\n- **Dedicated Support:** Get help when you need it from our expert engineering team.\n\n*Contact our sales team for custom volume discounts and deployment options.*`;
      } else {
        specificContent = `## Next-Generation AI for Professionals\n\n**${title}** represents the cutting edge of applied artificial intelligence. We built this product specifically for technical professionals who demand high fidelity, deep reasoning, and an intuitive interface.\n\n### Core Capabilities\n- **Deep Contextual Understanding:** Understands massive codebases, long-form legal documents, and complex architectural diagrams.\n- **Seamless Workflow Integration:** Operates directly where you work, minimizing context switching and maximizing flow state.\n- **Zero-Trust Security:** We believe your data is yours. ${title} is architected from the ground up to ensure your proprietary information never leaks into our public models.\n\n### Why Choose ${title}?\nUnlike generic chat interfaces, ${title} is fine-tuned for high-leverage professional tasks. It doesn't just answer questions; it helps you build, refactor, and architect solutions at scale.`;
      }
      break;
    case 'Features':
      specificContent = `## Seamless Integration: ${title}\n\nOur **${title}** feature is designed to bring the power of Saritima's intelligence directly into your existing toolchain. You shouldn't have to change how you work to benefit from advanced AI.\n\n### Technical Highlights\n- **Native Performance:** Built with native APIs for a lag-free, responsive experience.\n- **Context-Aware Assistance:** Automatically understands the document, spreadsheet, or codebase you are currently viewing.\n- **End-to-End Encryption:** All data transmitted via ${title} is encrypted in transit and at rest.\n\n### Getting Started\nTo enable ${title}, navigate to your Workspace Settings and select "Integrations". Follow the OAuth flow to grant secure, scoped access. You can revoke this access at any time with a single click.`;
      break;
    case 'Models':
      specificContent = `## Meet the Model: ${title}\n\n**${title}** is one of our foundational large language models, trained from scratch by Parellogram PBC to exhibit state-of-the-art reasoning, coding, and mathematical capabilities.\n\n### Model Specifications\n- **Architecture:** Sparse Mixture-of-Experts (MoE) optimized for low-latency inference.\n- **Context Window:** Up to 200,000 tokens (equivalent to roughly 500 pages of text).\n- **Training Data cutoff:** December 2025.\n\n### Performance Benchmarks\n${title} consistently ranks in the top percentile across industry-standard evaluations, including HumanEval (Coding), MMLU (General Knowledge), and GSM8K (Mathematics).\n\n### Safety and Alignment\nWe employ Constitutional AI techniques to ensure ${title} remains helpful, harmless, and honest. It refuses malicious requests while providing transparent, highly accurate responses to complex queries.`;
      break;
    case 'Solutions':
      specificContent = `## Enterprise Solutions for ${title}\n\nTransformation in the **${title}** sector requires more than just raw intelligence; it requires domain expertise, strict regulatory compliance, and seamless enterprise integration.\n\n### How We Help\n- **Automated Workflows:** Reduce manual toil by automating repetitive analysis, drafting, and code generation tasks.\n- **Enhanced Decision Making:** Synthesize vast amounts of internal data to surface actionable insights instantly.\n- **Regulatory Compliance:** Our platform meets the strict data residency and privacy requirements specific to ${title}.\n\n### Real-World Impact\nOrganizations leveraging Saritima in ${title} report a 40% reduction in time-to-market and a significant increase in employee satisfaction by eliminating rote work. Read our case studies to learn how industry leaders are deploying our models at scale.`;
      break;
    case 'Saritima Platform':
      specificContent = `## The Saritima Platform: ${title}\n\nThe Saritima Platform provides developers and enterprises with the robust infrastructure needed to build reliable AI applications. **${title}** is a core component of this ecosystem.\n\n### Developer Experience (DX)\nWe prioritize a frictionless developer experience. Our APIs are RESTful, comprehensively documented, and supported by official SDKs in Python, Node.js, and Go.\n\n### Enterprise-Grade Reliability\n- **99.99% Uptime SLA:** Backed by redundant global infrastructure.\n- **Low Latency:** Optimized inference engines ensure lightning-fast responses.\n- **Scalable Throughput:** Effortlessly handle spikes in traffic with auto-scaling deployment options.\n\n### Integration Partners\nDeploy Saritima models directly within your VPC through our strategic partnerships with AWS Bedrock, Google Cloud Vertex AI, and Microsoft Foundry.`;
      break;
    case 'Resources':
    case 'Community':
      specificContent = `## Community & Resources: ${title}\n\nAt Parellogram, we believe in open knowledge sharing. The **${title}** section is curated to help you get the most out of the Saritima ecosystem.\n\n### What You'll Find Here\n- **In-Depth Guides:** Step-by-step tutorials on prompt engineering, API integration, and advanced workflows.\n- **Community Forums:** Connect with other developers, share best practices, and get peer support.\n- **Open Source:** Explore our open-source connectors, plugins, and reference implementations on GitHub.\n\n### Get Involved\nWhether you're a student, a startup founder, or an enterprise architect, there's a place for you in our community. Join our Discord server, attend our virtual town halls, and apply for our startup credits program to accelerate your build.`;
      break;
    case 'Company':
      specificContent = `## About Parellogram: ${title}\n\nParellogram PBC is a Public Benefit Corporation dedicated to ensuring that artificial general intelligence (AGI) benefits all of humanity. **${title}** is a reflection of our core mission and values.\n\n### Our Philosophy\nWe believe that AI should be aligned with human values, transparent in its reasoning, and built with safety as a fundamental primitive, not an afterthought.\n\n### Research and Policy\nWe publish peer-reviewed research on AI safety, constitutional AI, and mechanistic interpretability. We actively engage with policymakers globally to advocate for responsible scaling policies and comprehensive regulatory frameworks.\n\n### Join Us\nWe are always looking for exceptional researchers, engineers, and designers who share our vision. Check out our Careers page for open roles in our San Francisco and London offices.`;
      break;
    default:
      specificContent = `Welcome to the detailed documentation for **${title}**. We are currently expanding this section to provide you with the most accurate and up-to-date information regarding our ${category} offerings. Check back soon for comprehensive guides and specifications.`;
  }

  return `# ${title}\n\n${specificContent}\n\n---\n\n*If you need further assistance or have specific questions about ${title}, please contact our enterprise support team.*`;
};

export const footerContent: Record<string, FooterContentPage> = {
  // Products
  'products/saritima': { title: 'Saritima', category: 'Products', body: generateMockContent('Saritima', 'Products') },
  'products/saritima-code': { title: 'Saritima Code', category: 'Products', body: generateMockContent('Saritima Code', 'Products') },
  'products/saritima-code-enterprise': { title: 'Saritima Code for Enterprise', category: 'Products', body: generateMockContent('Saritima Code for Enterprise', 'Products') },
  'products/saritima-cowork': { title: 'Saritima Cowork', category: 'Products', body: generateMockContent('Saritima Cowork', 'Products') },
  'products/pro-plan': { title: 'Pro plan', category: 'Products', body: generateMockContent('Pro plan', 'Products') },
  'products/max-plan': { title: 'Max plan', category: 'Products', body: generateMockContent('Max plan', 'Products') },
  'products/team-plan': { title: 'Team plan', category: 'Products', body: generateMockContent('Team plan', 'Products') },
  'products/enterprise-plan': { title: 'Enterprise plan', category: 'Products', body: generateMockContent('Enterprise plan', 'Products') },
  'products/download-app': { title: 'Download app', category: 'Products', body: generateMockContent('Download app', 'Products') },
  'products/pricing': { title: 'Pricing', category: 'Products', body: generateMockContent('Pricing', 'Products') },
  'products/go-to-app': { title: 'Go to App', category: 'Products', body: generateMockContent('Go to App', 'Products') },

  // Features
  'features/saritima-security': { title: 'Saritima Security', category: 'Features', body: generateMockContent('Saritima Security', 'Features') },
  'features/saritima-chrome': { title: 'Saritima for Chrome', category: 'Features', body: generateMockContent('Saritima for Chrome', 'Features') },
  'features/saritima-slack': { title: 'Saritima for Slack', category: 'Features', body: generateMockContent('Saritima for Slack', 'Features') },
  'features/saritima-excel': { title: 'Saritima for Excel', category: 'Features', body: generateMockContent('Saritima for Excel', 'Features') },
  'features/saritima-powerpoint': { title: 'Saritima for Powerpoint', category: 'Features', body: generateMockContent('Saritima for Powerpoint', 'Features') },
  'features/saritima-word': { title: 'Saritima for Word', category: 'Features', body: generateMockContent('Saritima for Word', 'Features') },
  'features/skills': { title: 'Skills', category: 'Features', body: generateMockContent('Skills', 'Features') },

  // Models
  'models/opus': { title: 'Opus', category: 'Models', body: generateMockContent('Opus', 'Models') },
  'models/sonnet': { title: 'Sonnet', category: 'Models', body: generateMockContent('Sonnet', 'Models') },
  'models/standard': { title: 'Standard', category: 'Models', body: generateMockContent('Standard', 'Models') },

  // Solutions
  'solutions/ai-agents': { title: 'AI agents', category: 'Solutions', body: generateMockContent('AI agents', 'Solutions') },
  'solutions/code-modernization': { title: 'Code modernization', category: 'Solutions', body: generateMockContent('Code modernization', 'Solutions') },
  'solutions/coding': { title: 'Coding', category: 'Solutions', body: generateMockContent('Coding', 'Solutions') },
  'solutions/customer-support': { title: 'Customer support', category: 'Solutions', body: generateMockContent('Customer support', 'Solutions') },
  'solutions/education': { title: 'Education', category: 'Solutions', body: generateMockContent('Education', 'Solutions') },
  'solutions/financial-services': { title: 'Financial services', category: 'Solutions', body: generateMockContent('Financial services', 'Solutions') },
  'solutions/government': { title: 'Government', category: 'Solutions', body: generateMockContent('Government', 'Solutions') },
  'solutions/healthcare': { title: 'Healthcare', category: 'Solutions', body: generateMockContent('Healthcare', 'Solutions') },
  'solutions/life-sciences': { title: 'Life sciences', category: 'Solutions', body: generateMockContent('Life sciences', 'Solutions') },
  'solutions/nonprofits': { title: 'Nonprofits', category: 'Solutions', body: generateMockContent('Nonprofits', 'Solutions') },
  'solutions/security': { title: 'Security', category: 'Solutions', body: generateMockContent('Security', 'Solutions') },

  // Platform
  'platform/overview': { title: 'Overview', category: 'Saritima Platform', body: generateMockContent('Overview', 'Saritima Platform') },
  'platform/developer-docs': { title: 'Developer docs', category: 'Saritima Platform', body: generateMockContent('Developer docs', 'Saritima Platform') },
  'platform/pricing': { title: 'Pricing', category: 'Saritima Platform', body: generateMockContent('Pricing', 'Saritima Platform') },
  'platform/marketplace': { title: 'Marketplace', category: 'Saritima Platform', body: generateMockContent('Marketplace', 'Saritima Platform') },
  'platform/amazon-bedrock': { title: 'Amazon Bedrock', category: 'Saritima Platform', body: generateMockContent('Amazon Bedrock', 'Saritima Platform') },
  'platform/google-cloud-vertex-ai': { title: 'Google Cloud’s Vertex AI', category: 'Saritima Platform', body: generateMockContent('Google Cloud’s Vertex AI', 'Saritima Platform') },
  'platform/microsoft-foundry': { title: 'Microsoft Foundry', category: 'Saritima Platform', body: generateMockContent('Microsoft Foundry', 'Saritima Platform') },
  'platform/regional-compliance': { title: 'Regional compliance', category: 'Saritima Platform', body: generateMockContent('Regional compliance', 'Saritima Platform') },
  'platform/console-login': { title: 'Console login', category: 'Saritima Platform', body: generateMockContent('Console login', 'Saritima Platform') },

  // Resources
  'resources/blog': { title: 'Blog', category: 'Resources', body: generateMockContent('Blog', 'Resources') },
  'resources/saritima-partner-network': { title: 'Saritima partner network', category: 'Resources', body: generateMockContent('Saritima partner network', 'Resources') },
  'resources/connectors': { title: 'Connectors', category: 'Resources', body: generateMockContent('Connectors', 'Resources') },
  'resources/courses': { title: 'Courses', category: 'Resources', body: generateMockContent('Courses', 'Resources') },
  'resources/customer-stories': { title: 'Customer stories', category: 'Resources', body: generateMockContent('Customer stories', 'Resources') },
  'resources/engineering-at-parellogram': { title: 'Engineering at Parellogram', category: 'Resources', body: generateMockContent('Engineering at Parellogram', 'Resources') },
  'resources/events': { title: 'Events', category: 'Resources', body: generateMockContent('Events', 'Resources') },
  'resources/plugins': { title: 'Plugins', category: 'Resources', body: generateMockContent('Plugins', 'Resources') },
  'resources/powered-by-saritima': { title: 'Powered by Saritima', category: 'Resources', body: generateMockContent('Powered by Saritima', 'Resources') },
  'resources/service-partners': { title: 'Service partners', category: 'Resources', body: generateMockContent('Service partners', 'Resources') },

  // Community
  'community/campus-program': { title: 'Campus Program', category: 'Community', body: generateMockContent('Campus Program', 'Community') },
  'community/startups-program': { title: 'Startups program', category: 'Community', body: generateMockContent('Startups program', 'Community') },
  'community/tutorials': { title: 'Tutorials', category: 'Community', body: generateMockContent('Tutorials', 'Community') },
  'community/use-cases': { title: 'Use cases', category: 'Community', body: generateMockContent('Use cases', 'Community') },

  // Company
  'company/parellogram': { title: 'Parellogram', category: 'Company', body: generateMockContent('Parellogram', 'Company') },
  'company/careers': { title: 'Careers', category: 'Company', body: generateMockContent('Careers', 'Company') },
  'company/economic-futures': { title: 'Economic Futures', category: 'Company', body: generateMockContent('Economic Futures', 'Company') },
  'company/research': { title: 'Research', category: 'Company', body: generateMockContent('Research', 'Company') },
  'company/parellogram-news': { title: 'Parellogram news', category: 'Company', body: generateMockContent('Parellogram news', 'Company') },
  'company/responsible-scaling-policy': { title: 'Responsible Scaling Policy', category: 'Company', body: generateMockContent('Responsible Scaling Policy', 'Company') },
  'company/security-and-compliance': { title: 'Security and compliance', category: 'Company', body: generateMockContent('Security and compliance', 'Company') },
  'company/transparency': { title: 'Transparency', category: 'Company', body: generateMockContent('Transparency', 'Company') },

  // Help & Legal
  'legal/availability': { title: 'Availability', category: 'Help and security', body: generateMockContent('Availability', 'Help and security') },
  'legal/status': { title: 'Status', category: 'Help and security', body: generateMockContent('Status', 'Help and security') },
  'legal/support-center': { title: 'Support center', category: 'Help and security', body: generateMockContent('Support center', 'Help and security') },
  'legal/terms-and-policies': { title: 'Terms and policies', category: 'Legal', body: `# Terms and Conditions\n\n**Last Updated:** June 1, 2026\n\nWelcome to the Saritima platform, operated by Parellogram PBC ("Parellogram", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website, software, APIs, and AI models (collectively, the "Services").\n\nBy accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.\n\n## 1. Access to the Services\n\n### 1.1 Eligibility\nYou must be at least 18 years old to use our Services. By agreeing to these Terms, you represent and warrant that you meet this age requirement.\n\n### 1.2 Account Registration\nTo access certain features, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.\n\n## 2. Use of the Services\n\n### 2.1 Acceptable Use\nYou agree not to use the Services to:\n- Violate any applicable local, state, national, or international law or regulation.\n- Generate, distribute, or promote illegal, harmful, or abusive content.\n- Interfere with or disrupt the integrity or performance of the Services.\n- Attempt to gain unauthorized access to the Services or related systems.\n- Reverse engineer, decompile, or disassemble any aspect of the Services or AI models.\n\n### 2.2 Content Ownership\nYou retain all ownership rights to the input data, code, and prompts you provide to the Services ("User Content"), as well as the output generated by the AI models based on your input ("Output"). Parellogram claims no ownership over your User Content or Output.\n\n## 3. Fees and Payment\n\nCertain Services are provided for a fee (e.g., Pro Plan, Max Plan, Enterprise Plan). You agree to pay all applicable fees in connection with your use of the Services. All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time with prior notice to you.\n\n## 4. Intellectual Property Rights\n\nThe Services, including but not limited to the AI models (Opus, Sonnet, Standard), software, design, text, and graphics, are owned by Parellogram PBC and are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Services in accordance with these Terms.\n\n## 5. Disclaimers and Limitations of Liability\n\n### 5.1 Disclaimer of Warranties\nTHE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. PARELLOGRAM DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.\n\n### 5.2 Limitation of Liability\nIN NO EVENT SHALL PARELLOGRAM BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.\n\n## 6. Termination\n\nWe may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Services will immediately cease.\n\n## 7. General Provisions\n\nThese Terms constitute the entire agreement between you and Parellogram regarding the Services. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect. These Terms are governed by the laws of the jurisdiction in which Parellogram PBC is registered, without regard to its conflict of law principles.\n\n---\n\n*If you have any questions about these Terms, please contact us at legal@parellogram.com.*` },
  'legal/privacy-choices': { title: 'Privacy choices', category: 'Legal', body: generateMockContent('Privacy choices', 'Legal') },
  'legal/privacy-policy': { title: 'Privacy policy', category: 'Legal', body: `# Privacy Policy\n\n**Effective Date:** June 1, 2026\n\nAt Parellogram PBC ("we", "us", "our"), we take your privacy seriously. This Privacy Policy outlines the types of information we collect, how we use it, and the choices you have regarding your data when you use the Saritima platform, including Saritima Code, Saritima Cowork, and our AI agents.\n\n## 1. Information We Collect\n\n### A. Personal Information You Provide\n- **Account Information:** Name, email address, password, and billing information when you register for an account.\n- **User Content:** The text, code, files, prompts, and other data you submit to our AI models (like Opus and Sonnet) during your use of the platform.\n- **Communications:** Any messages or inquiries you send to our support team.\n\n### B. Automatically Collected Information\n- **Usage Data:** Information about how you interact with our services, including log data, IP addresses, browser types, and access times.\n- **Device Information:** Details about the device you are using, including hardware models, operating systems, and unique device identifiers.\n- **Cookies and Tracking Technologies:** We use cookies to maintain your session and remember your preferences.\n\n## 2. How We Use Your Information\n\nWe use the collected data to:\n- Provide, maintain, and improve the Saritima platform.\n- Process transactions and send related information, including confirmations and receipts.\n- Personalize your experience by remembering your preferences.\n- Monitor and analyze trends, usage, and activities in connection with our services.\n- Detect, investigate, and prevent fraudulent transactions and other illegal activities.\n\n### Important Note on AI Training\nBy default, **we do not use your private enterprise data or source code to train our foundational models** unless you explicitly opt-in. We prioritize enterprise-grade security and confidentiality.\n\n## 3. Sharing of Information\n\nWe do not sell your personal information. We may share information only in the following circumstances:\n- **With Service Providers:** Third-party vendors who perform services on our behalf (e.g., payment processing, cloud hosting).\n- **For Legal Reasons:** If we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process.\n- **Business Transfers:** In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.\n\n## 4. Data Security\n\nWe implement rigorous technical and organizational security measures designed to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.\n\n## 5. Your Privacy Rights\n\nDepending on your location, you may have the right to:\n- Access, correct, or delete your personal information.\n- Object to or restrict the processing of your data.\n- Opt out of certain data collection practices.\n\nTo exercise these rights, please contact our privacy team at privacy@parellogram.com.\n\n## 6. Changes to This Policy\n\nWe may update this Privacy Policy from time to time. If we make material changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).\n\n---\n\n*This document is provided for informational purposes and constitutes the Privacy Policy for the Saritima platform.*` },
  'legal/responsible-disclosure-policy': { title: 'Responsible disclosure policy', category: 'Legal', body: generateMockContent('Responsible disclosure policy', 'Legal') },
  'legal/terms-of-service-commercial': { title: 'Terms of service: Commercial', category: 'Legal', body: generateMockContent('Terms of service: Commercial', 'Legal') },
  'legal/terms-of-service-consumer': { title: 'Terms of service: Consumer', category: 'Legal', body: generateMockContent('Terms of service: Consumer', 'Legal') },
  'legal/usage-policy': { title: 'Usage policy', category: 'Legal', body: generateMockContent('Usage policy', 'Legal') },
};
