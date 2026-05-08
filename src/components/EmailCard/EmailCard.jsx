import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Copy, Check, RefreshCw, Loader2, ChevronDown, ChevronUp, Tag, User, Mail } from 'lucide-react';
import './EmailCard.css';

export default function EmailCard({ email, index, onImprove, isImproving }) {
  const [copied, setCopied] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const cardRef = useRef(null);

  // GSAP — subtle 3D tilt on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);

    // GSAP — flash the field green briefly
    const field = cardRef.current?.querySelector(`.field-${type}`);
    if (field) {
      gsap.fromTo(field,
        { boxShadow: '0 0 0px rgba(16, 185, 129, 0)' },
        { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)', duration: 0.3, yoyo: true, repeat: 1 }
      );
    }

    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div ref={cardRef} className="email-card" id={`email-card-${email.id}`}>
      {/* Card Header */}
      <div className="email-card-header">
        <div className="email-card-meta">
          <span className="variation-badge">
            <Tag size={12} />
            {email.variationLabel}
          </span>
          {email.tone && <span className="tone-badge">{email.tone}</span>}
        </div>
        <motion.button
          className="collapse-btn"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse email' : 'Expand email'}
          id={`collapse-${email.id}`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9, rotate: expanded ? 180 : -180 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.button>
      </div>

      {expanded && (
        <motion.div
          className="email-card-body"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Subject Line */}
          <div className="email-field">
            <div className="field-header">
              <div className="field-label"><Mail size={14} /><span>Subject Line</span></div>
              <motion.button
                className={`copy-btn ${copied === 'subject' ? 'copied' : ''}`}
                onClick={() => handleCopy(email.subject, 'subject')}
                id={`copy-subject-${email.id}`}
                title="Copy subject line"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                {copied === 'subject' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'subject' ? 'Copied' : 'Copy'}</span>
              </motion.button>
            </div>
            <div className="field-content subject-content field-subject">{email.subject}</div>
          </div>

          {/* Personalized Line */}
          <div className="email-field personalized-field">
            <div className="field-header">
              <div className="field-label"><User size={14} /><span>Personalized Line</span></div>
              <motion.button
                className={`copy-btn ${copied === 'personal' ? 'copied' : ''}`}
                onClick={() => handleCopy(email.personalizedLine, 'personal')}
                id={`copy-personal-${email.id}`}
                title="Copy personalized line"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                {copied === 'personal' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'personal' ? 'Copied' : 'Copy'}</span>
              </motion.button>
            </div>
            <div className="field-content personalized-content field-personal">"{email.personalizedLine}"</div>
          </div>

          {/* Email Body */}
          <div className="email-field">
            <div className="field-header">
              <div className="field-label"><Mail size={14} /><span>Email Body</span></div>
              <motion.button
                className={`copy-btn ${copied === 'body' ? 'copied' : ''}`}
                onClick={() => handleCopy(email.body, 'body')}
                id={`copy-body-${email.id}`}
                title="Copy email body"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                {copied === 'body' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'body' ? 'Copied' : 'Copy'}</span>
              </motion.button>
            </div>
            <pre className="field-content email-body-content field-body">{email.body}</pre>
          </div>

          {/* Improve Button — Framer Motion spring hover */}
          {onImprove && (
            <motion.button
              className="improve-btn"
              onClick={() => onImprove(email)}
              disabled={isImproving}
              id={`improve-btn-${email.id}`}
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {isImproving ? (
                <><Loader2 size={16} className="spin-icon" /><span>Improving...</span></>
              ) : (
                <><RefreshCw size={16} /><span>Improve this email</span></>
              )}
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
}
