import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenLine, Sparkles, MailCheck, RefreshCw } from 'lucide-react';
import './StatsBar.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: PenLine,
    step: '01',
    title: 'Describe',
    desc: 'Your product & audience',
    color: '#7c3aed',
  },
  {
    icon: Sparkles,
    step: '02',
    title: 'Generate',
    desc: '3 AI email variations',
    color: '#3b82f6',
  },
  {
    icon: MailCheck,
    step: '03',
    title: 'Preview',
    desc: 'Subject, body & personalization',
    color: '#10b981',
  },
  {
    icon: RefreshCw,
    step: '04',
    title: 'Iterate',
    desc: 'Improve with one click',
    color: '#f59e0b',
  },
];

export default function StatsBar() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger — stagger cards in
      const cards = el.querySelectorAll('.step-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // GSAP — animate connector lines
      const connectors = el.querySelectorAll('.step-connector');
      gsap.fromTo(
        connectors,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.3,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="steps-bar" id="steps-bar" ref={containerRef}>
      <div className="steps-label">How it works</div>
      <div className="steps-flow">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.step} className="step-group">
              <motion.div
                className="step-card"
                whileHover={{ y: -6, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div
                  className="step-icon"
                  style={{
                    background: `${step.color}12`,
                    color: step.color,
                    boxShadow: `0 0 20px ${step.color}15`,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div className="step-content">
                  <div className="step-number" style={{ color: step.color }}>
                    {step.step}
                  </div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </motion.div>

              {/* Connector line between steps */}
              {idx < steps.length - 1 && (
                <div className="step-connector">
                  <div
                    className="connector-line"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}40, ${steps[idx + 1].color}40)`,
                    }}
                  ></div>
                  <div className="connector-dot" style={{ background: step.color }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
