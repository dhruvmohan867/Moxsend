import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import './InputSection.css';

export default function InputSection({ onGenerate, isLoading }) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const btnRef = useRef(null);
  const sectionRef = useRef(null);

  // GSAP — Magnetic hover on Generate button
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    };

    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', handleLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please describe your product and target audience first.');
      return;
    }
    if (description.trim().length < 20) {
      setError('Please provide a more detailed description (at least 20 characters).');
      return;
    }
    setError('');

    // GSAP — pulse effect on button click
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
    }

    onGenerate(description.trim());
  };

  const charCount = description.length;
  const isValid = charCount >= 20;

  return (
    <motion.section
      className="input-section"
      id="input-section"
      ref={sectionRef}
      whileHover={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="input-header">
        <motion.div
          className="input-icon-wrapper"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={24} />
        </motion.div>
        <div>
          <h2 className="input-title">Generate Cold Emails</h2>
          <p className="input-subtitle">
            Describe your product and target audience — our AI will craft personalized,
            high-converting emails in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="input-form" id="generate-form">
        <div className="textarea-wrapper">
          <label htmlFor="product-description" className="textarea-label">
            Describe your product & audience
          </label>
          <textarea
            id="product-description"
            className={`textarea ${error ? 'textarea-error' : ''}`}
            placeholder="e.g., We're a SaaS platform that helps sales teams automate cold outreach. Our target audience is B2B companies with 50–500 employees looking to scale their pipeline..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError('');
            }}
            rows={5}
            maxLength={1000}
            disabled={isLoading}
          />
          <div className="textarea-footer">
            <motion.span
              className={`char-count ${isValid ? 'valid' : ''}`}
              key={isValid ? 'valid' : 'invalid'}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              {charCount}/1000
            </motion.span>
            {charCount > 0 && charCount < 20 && (
              <span className="char-hint">
                {20 - charCount} more characters needed
              </span>
            )}
          </div>
        </div>

        {/* Error — Framer Motion AnimatePresence for enter/exit */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="input-error"
              id="input-error"
              role="alert"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button — GSAP magnetic hover */}
        <motion.button
          ref={btnRef}
          type="submit"
          className="generate-btn"
          id="generate-btn"
          disabled={isLoading || !description.trim()}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="spin-icon" />
              <span>Generating Emails...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Generate Email</span>
            </>
          )}
        </motion.button>

        <div className="input-hints">
          <span className="hint-item">✦ 3 unique variations</span>
          <span className="hint-divider">·</span>
          <span className="hint-item">✦ Personalized lines</span>
          <span className="hint-divider">·</span>
          <span className="hint-item">✦ Subject lines included</span>
        </div>
      </form>
    </motion.section>
  );
}
