import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { footerContent } from '../../data/footerContent';
import { LandingLogo } from '../../components/icons/LandingLogo';
import { Footer } from '../../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import './ContentPage.css';

export const ContentPage: React.FC = () => {
  const { category, pageId } = useParams();
  const navigate = useNavigate();
  
  const contentKey = `${category}/${pageId}`;
  const pageData = footerContent[contentKey];

  if (!pageData) {
    return (
      <div className="content-page-container">
        <header className="content-page-header">
          <LandingLogo />
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </header>
        <main className="content-page-main">
          <div className="content-wrapper">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="content-page-container">
      <header className="content-page-header">
        <LandingLogo />
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </header>
      <main className="content-page-main">
        <div className="content-wrapper">
          <span className="content-category">{pageData.category}</span>
          <h1 className="content-title">{pageData.title}</h1>
          <div className="content-body markdown-body">
            <ReactMarkdown>{pageData.body}</ReactMarkdown>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
