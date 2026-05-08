import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import InputSection from './components/InputSection/InputSection';
import EmailCard from './components/EmailCard/EmailCard';
import ComparisonView from './components/ComparisonView/ComparisonView';
import CSVUpload from './components/CSVUpload/CSVUpload';
import { generateEmails, improveEmail } from './utils/mockData';
import { Sparkles, Mail } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [emails, setEmails] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvingId, setImprovingId] = useState(null);
  const [comparison, setComparison] = useState(null);

  const handleGenerate = async (description) => {
    setIsGenerating(true);
    setEmails([]);
    setComparison(null);

    // Simulate API latency
    await new Promise((r) => setTimeout(r, 2200));

    const results = generateEmails(description);
    setEmails(results);
    setIsGenerating(false);
  };

  const handleImprove = async (email) => {
    setImprovingId(email.id);

    // Simulate API latency
    await new Promise((r) => setTimeout(r, 1800));

    const improved = improveEmail(email);
    setComparison({ original: email, improved });
    setImprovingId(null);

    // Scroll to comparison
    setTimeout(() => {
      document.getElementById('comparison-view')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Background effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <main className="main-content">
        {activeTab === 'generate' ? (
          <div className="generate-page">
            {/* Hero */}
            <div className="hero fade-in" id="hero-section">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>AI-Powered Email Generation</span>
              </div>
              <h1 className="hero-title">
                Cold emails that
                <span className="hero-gradient"> actually convert</span>
              </h1>
              <p className="hero-desc">
                Describe your product and audience. Get 3 personalized email variations 
                with subject lines, ready to send in seconds.
              </p>
            </div>

            {/* Input */}
            <InputSection onGenerate={handleGenerate} isLoading={isGenerating} />

            {/* Loading Skeleton */}
            {isGenerating && (
              <div className="skeleton-wrapper fade-in" id="loading-skeleton">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="skeleton-header">
                      <div className="skeleton-bar skeleton-sm"></div>
                      <div className="skeleton-bar skeleton-xs"></div>
                    </div>
                    <div className="skeleton-body">
                      <div className="skeleton-bar skeleton-full"></div>
                      <div className="skeleton-bar skeleton-lg"></div>
                      <div className="skeleton-bar skeleton-md"></div>
                      <div className="skeleton-bar skeleton-full"></div>
                      <div className="skeleton-bar skeleton-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Generated Emails */}
            {emails.length > 0 && !isGenerating && (
              <div className="output-section" id="output-section">
                <div className="output-header fade-in">
                  <Mail size={20} />
                  <h2 className="output-title">Your Email Variations</h2>
                  <span className="output-count">{emails.length} generated</span>
                </div>

                <div className="email-list">
                  {emails.map((email, idx) => (
                    <EmailCard
                      key={email.id}
                      email={email}
                      index={idx}
                      onImprove={handleImprove}
                      isImproving={improvingId === email.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Before / After Comparison */}
            {comparison && (
              <ComparisonView
                original={comparison.original}
                improved={comparison.improved}
              />
            )}
          </div>
        ) : (
          <CSVUpload />
        )}
      </main>

      {/* Footer */}
      <footer className="footer" id="app-footer">
        <p>
          Built with <span className="footer-heart">♥</span> by Moxsend · 
          AI-powered cold email generation
        </p>
      </footer>
    </div>
  );
}
