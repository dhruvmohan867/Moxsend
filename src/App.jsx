import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [emails, setEmails] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvingId, setImprovingId] = useState(null);
  const [comparison, setComparison] = useState(null);

  // GSAP refs
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const inputSectionRef = useRef(null);
  const outputSectionRef = useRef(null);

  // ─── GSAP: Hero parallax + entrance ───
  useEffect(() => {
    const hero = heroRef.current;
    const title = heroTitleRef.current;
    const desc = heroDescRef.current;
    if (!hero || !title || !desc) return;

    const ctx = gsap.context(() => {
      // Hero title — split words and animate each
      const titleText = title.textContent;
      // We'll just animate the whole title with a dramatic entrance
      gsap.fromTo(
        title,
        { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // Hero description — slide up after title
      gsap.fromTo(
        desc,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.7,
        }
      );

      // GSAP ScrollTrigger — Hero parallax on scroll
      gsap.to(hero, {
        y: -80,
        opacity: 0.3,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, [activeTab]);

  // ─── GSAP: Output section reveal on scroll ───
  useEffect(() => {
    if (emails.length === 0) return;

    const section = outputSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Output header — slide in from left
      const header = section.querySelector('.output-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Email cards — staggered scale-in
      const cards = section.querySelectorAll('.email-card-wrapper');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [emails]);

  const handleGenerate = async (description) => {
    setIsGenerating(true);
    setEmails([]);
    setComparison(null);

    await new Promise((r) => setTimeout(r, 2200));

    const results = generateEmails(description);
    setEmails(results);
    setIsGenerating(false);

    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 200);
  };

  const handleImprove = async (email) => {
    setImprovingId(email.id);

    await new Promise((r) => setTimeout(r, 1800));

    const improved = improveEmail(email);
    setComparison({ original: email, improved });
    setImprovingId(null);

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

      {/* Ambient floating glow orbs */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'generate' ? (
            <motion.div
              key="generate"
              className="generate-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* ═══ Hero Section — GSAP entrance + scroll parallax ═══ */}
              <div className="hero" id="hero-section" ref={heroRef} style={{ perspective: '800px' }}>
                <motion.div
                  className="hero-badge"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Sparkles size={14} />
                  <span>AI-Powered Email Generation</span>
                </motion.div>

                <h1 className="hero-title" ref={heroTitleRef}>
                  Cold emails that
                  <span className="hero-gradient"> actually convert</span>
                </h1>

                <p className="hero-desc" ref={heroDescRef}>
                  Describe your product and audience. Get 3 personalized email variations
                  with subject lines, ready to send in seconds.
                </p>

                <motion.div
                  className="hero-scroll-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <ArrowDown size={16} className="scroll-arrow" />
                </motion.div>
              </div>

              {/* ═══ Stats Bar — GSAP scroll counters ═══ */}
              <StatsBar />

              {/* ═══ Input Section — Framer Motion entrance ═══ */}
              <motion.div
                ref={inputSectionRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <InputSection onGenerate={handleGenerate} isLoading={isGenerating} />
              </motion.div>

              {/* ═══ Loading Skeleton — Framer Motion AnimatePresence ═══ */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    className="skeleton-wrapper"
                    id="loading-skeleton"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="skeleton-card"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
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
                    <motion.div
                      className="skeleton-label"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Sparkles size={14} className="skeleton-sparkle" />
                      <span>AI is crafting your emails...</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ═══ Generated Emails — GSAP stagger scroll reveal ═══ */}
              <AnimatePresence>
                {emails.length > 0 && !isGenerating && (
                  <div className="output-section" id="output-section" ref={outputSectionRef}>
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
                        <div key={email.id} className="email-card-wrapper">
                          <EmailCard
                            email={email}
                            index={idx}
                            onImprove={handleImprove}
                            isImproving={improvingId === email.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>

              {/* ═══ Before/After — Framer Motion enter ═══ */}
              <AnimatePresence>
                {comparison && (
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                  >
                    <ComparisonView
                      original={comparison.original}
                      improved={comparison.improved}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ═══ Feature Showcase — GSAP ScrollTrigger stagger ═══ */}
              <FeatureShowcase />
            </motion.div>
          ) : (
            <motion.div
              key="csv"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
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
