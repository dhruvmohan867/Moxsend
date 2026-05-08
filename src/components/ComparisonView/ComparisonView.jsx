import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import './ComparisonView.css';

gsap.registerPlugin(ScrollTrigger);

export default function ComparisonView({ original, improved }) {
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const arrow = arrowRef.current;
    if (!section || !arrow) return;

    const ctx = gsap.context(() => {
      // GSAP — Before card slides in from left
      const beforeCard = section.querySelector('.before-card');
      if (beforeCard) {
        gsap.fromTo(beforeCard,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }

      // GSAP — After card slides in from right
      const afterCard = section.querySelector('.after-card');
      if (afterCard) {
        gsap.fromTo(afterCard,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }

      // GSAP — Arrow pulses in
      gsap.fromTo(arrow,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.4, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [original, improved]);

  if (!original || !improved) return null;

  return (
    <div className="comparison-view" id="comparison-view" ref={sectionRef}>
      <div className="comparison-header">
        <motion.div
          className="comparison-icon"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TrendingUp size={20} />
        </motion.div>
        <div>
          <h3 className="comparison-title">Before & After Comparison</h3>
          <p className="comparison-subtitle">See how the AI improved your email for better engagement</p>
        </div>
      </div>

      <div className="comparison-grid">
        {/* Before */}
        <div className="comparison-card before-card">
          <div className="comparison-card-label">
            <span className="label-dot before-dot"></span>
            <span>Before</span>
          </div>
          <div className="comparison-field">
            <span className="comparison-field-label">Subject</span>
            <p className="comparison-field-value">{original.subject}</p>
          </div>
          <div className="comparison-field">
            <span className="comparison-field-label">Personalized Line</span>
            <p className="comparison-field-value italic">"{original.personalizedLine}"</p>
          </div>
          <div className="comparison-field">
            <span className="comparison-field-label">Body</span>
            <pre className="comparison-field-value body-text">{original.body}</pre>
          </div>
        </div>

        {/* Arrow */}
        <div className="comparison-arrow" ref={arrowRef}>
          <motion.div
            className="arrow-circle"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight size={20} />
          </motion.div>
          <Sparkles size={14} className="arrow-sparkle" />
        </div>

        {/* After */}
        <div className="comparison-card after-card">
          <div className="comparison-card-label">
            <span className="label-dot after-dot"></span>
            <span>After</span>
            <span className="improved-tag"><Sparkles size={10} />AI Improved</span>
          </div>
          <div className="comparison-field">
            <span className="comparison-field-label">Subject</span>
            <p className="comparison-field-value highlight">{improved.subject}</p>
          </div>
          <div className="comparison-field">
            <span className="comparison-field-label">Personalized Line</span>
            <p className="comparison-field-value italic highlight">"{improved.personalizedLine}"</p>
          </div>
          <div className="comparison-field">
            <span className="comparison-field-label">Body</span>
            <pre className="comparison-field-value body-text">{improved.body}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
