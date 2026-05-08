import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Mail, Zap } from 'lucide-react';
import './StatsBar.css';

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="counter-value">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

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
    value: 3.2,
    suffix: 'x',
    label: 'Higher Reply Rates',
    color: '#10b981',
    isDecimal: true,
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

export default function StatsBar() {
  return (
    <motion.div
      className="stats-bar"
      id="stats-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
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
              <AnimatedCounter
                end={stat.isDecimal ? 32 : stat.value}
                suffix={stat.suffix}
                prefix={stat.isDecimal ? '' : ''}
                duration={2000}
              />
              {stat.isDecimal && (
                <span className="counter-value" style={{ display: 'none' }}></span>
              )}
              <span className="stat-label">{stat.label}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
