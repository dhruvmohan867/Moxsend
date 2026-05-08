import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, Repeat, UploadCloud, Shield, Clock } from 'lucide-react';
import './FeatureShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Writing',
    desc: 'Generate human-quality emails that feel personal, not robotic.',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  },
  {
    icon: Target,
    title: 'Hyper-Personalized',
    desc: 'Each email references real context from the prospect.',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
  },
  {
    icon: Repeat,
    title: 'Iterate & Improve',
    desc: 'Refine any email with one click. Compare before & after.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
  },
  {
    icon: UploadCloud,
    title: 'Bulk CSV Upload',
    desc: 'Upload your contact list and generate emails at scale.',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'Your data is never stored. We process and forget.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  },
  {
    icon: Clock,
    title: 'Seconds, Not Hours',
    desc: '3 polished variations in under 5 seconds.',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
  },
];

export default function FeatureShowcase() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    const line = lineRef.current;
    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {
      // GSAP — Heading text reveal with slide up
      gsap.fromTo(
        heading.querySelectorAll('.feature-animate'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // GSAP — Divider line scales in from left
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // GSAP ScrollTrigger — Stagger feature cards in from below with rotation
      const cards = grid.querySelectorAll('.feature-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, rotateX: 8, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="feature-showcase" id="feature-showcase" ref={sectionRef}>
      {/* Heading — GSAP scroll reveal */}
      <div className="feature-header" ref={headingRef}>
        <span className="feature-badge feature-animate">✦ Why Moxsend</span>
        <h2 className="feature-title feature-animate">
          Everything you need to close deals
        </h2>
        <p className="feature-subtitle feature-animate">
          From generation to personalization to bulk outreach — it all happens here.
        </p>
      </div>

      {/* Divider line — GSAP scale reveal */}
      <div className="feature-divider" ref={lineRef}></div>

      {/* Feature grid — GSAP stagger + Framer Motion hover */}
      <div className="feature-grid" ref={gridRef}>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              className="feature-card"
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="feature-card-glow"
                style={{ background: `${feature.color}10` }}
              ></div>
              <div
                className="feature-card-icon"
                style={{ background: feature.gradient }}
              >
                <Icon size={22} color="white" />
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.desc}</p>
              <div
                className="feature-card-line"
                style={{ background: feature.gradient }}
              ></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
