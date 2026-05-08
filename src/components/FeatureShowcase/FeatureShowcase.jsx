import { motion } from 'framer-motion';
import { Sparkles, Target, Repeat, UploadCloud, Shield, Clock } from 'lucide-react';
import './FeatureShowcase.css';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeatureShowcase() {
  return (
    <section className="feature-showcase" id="feature-showcase">
      <motion.div
        className="feature-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="feature-badge">✦ Why Moxsend</span>
        <h2 className="feature-title">Everything you need to close deals</h2>
        <p className="feature-subtitle">
          From generation to personalization to bulk outreach — it all happens here.
        </p>
      </motion.div>

      <motion.div
        className="feature-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              className="feature-card"
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.25 },
              }}
            >
              <div className="feature-card-glow" style={{ background: `${feature.color}08` }}></div>
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
      </motion.div>
    </section>
  );
}
