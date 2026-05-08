import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Mail, Zap } from 'lucide-react';
import './StatsBar.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Mail,
    value: 12847,
    suffix: '+',
    label: 'Emails Generated',
    color: '#7c3aed',
  },
  {
    icon: TrendingUp,
    value: 320,
    suffix: '%',
    label: 'Higher Reply Rates',
    color: '#10b981',
  },
  {
    icon: Users,
    value: 940,
    suffix: '+',
    label: 'Active Teams',
    color: '#3b82f6',
  },
  {
    icon: Zap,
    value: 98,
    suffix: '%',
    label: 'Time Saved',
    color: '#f59e0b',
  },
];

function StatCard({ stat, index }) {
  const counterRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = counterRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    // GSAP ScrollTrigger — animate counter when card scrolls into view
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: stat.value,
      duration: 2,
      delay: index * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString() + stat.suffix;
      },
    });

    // GSAP — card entrance from below with scale
    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === card) t.kill();
      });
    };
  }, [stat, index]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      className="stat-item"
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <div
        className="stat-icon"
        style={{
          background: `${stat.color}15`,
          color: stat.color,
          boxShadow: `0 0 20px ${stat.color}20`,
        }}
      >
        <Icon size={18} />
      </div>
      <div className="stat-content">
        <span ref={counterRef} className="counter-value">
          0{stat.suffix}
        </span>
        <span className="stat-label">{stat.label}</span>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <div className="stats-bar" id="stats-bar">
      {stats.map((stat, idx) => (
        <StatCard key={stat.label} stat={stat} index={idx} />
      ))}
    </div>
  );
}
