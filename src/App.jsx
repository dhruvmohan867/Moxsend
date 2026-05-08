import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import ThreeBackground from './components/ThreeBackground/ThreeBackground';
import StatsBar from './components/StatsBar/StatsBar';
import FeatureShowcase from './components/FeatureShowcase/FeatureShowcase';
import InputSection from './components/InputSection/InputSection';
import EmailCard from './components/EmailCard/EmailCard';
import ComparisonView from './components/ComparisonView/ComparisonView';
import CSVUpload from './components/CSVUpload/CSVUpload';
import { generateEmails, improveEmail } from './utils/mockData';
import { Sparkles, Mail, ArrowDown } from 'lucide-react';
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

    // Scroll to output
    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 200);
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
      {/* Three.js 3D animated background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Ambient glow orbs */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'generate' ? (
            <motion.div
              key="generate"
              className="generate-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <motion.div
                className="hero"
                id="hero-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <motion.div
                  className="hero-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Sparkles size={14} />
                  <span>AI-Powered Email Generation</span>
                </motion.div>

                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Cold emails that
                  <span className="hero-gradient"> actually convert</span>
                </motion.h1>

                <motion.p
                  className="hero-desc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  Describe your product and audience. Get 3 personalized email variations
                  with subject lines, ready to send in seconds.
                </motion.p>

                <motion.div
                  className="hero-scroll-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <ArrowDown size={16} className="scroll-arrow" />
                </motion.div>
              </motion.div>

              {/* Stats Bar */}
              <StatsBar />

              {/* Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <InputSection onGenerate={handleGenerate} isLoading={isGenerating} />
              </motion.div>

              {/* Loading Skeleton */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    className="skeleton-wrapper"
                    id="loading-skeleton"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="skeleton-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12 }}
                      >
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
                      </motion.div>
                    ))}
                    <div className="skeleton-label">
                      <Sparkles size={14} className="skeleton-sparkle" />
                      <span>AI is crafting your emails...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generated Emails */}
              <AnimatePresence>
                {emails.length > 0 && !isGenerating && (
                  <motion.div
                    className="output-section"
                    id="output-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="output-header">
                      <div className="output-header-left">
                        <div className="output-icon-pulse">
                          <Mail size={20} />
                        </div>
                        <h2 className="output-title">Your Email Variations</h2>
                        <span className="output-count">{emails.length} generated</span>
                      </div>
                    </div>

                    <div className="email-list">
                      {emails.map((email, idx) => (
                        <motion.div
                          key={email.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.15, duration: 0.4 }}
                        >
                          <EmailCard
                            email={email}
                            index={idx}
                            onImprove={handleImprove}
                            isImproving={improvingId === email.id}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Before / After Comparison */}
              <AnimatePresence>
                {comparison && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ComparisonView
                      original={comparison.original}
                      improved={comparison.improved}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feature Showcase */}
              <FeatureShowcase />
            </motion.div>
          ) : (
            <motion.div
              key="csv"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <CSVUpload />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer" id="app-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">⚡</span>
            <span className="footer-name">Moxsend</span>
          </div>
          <p className="footer-text">
            Built with <span className="footer-heart">♥</span> · AI-powered cold email generation
          </p>
          <p className="footer-copy">© 2026 Moxsend. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
