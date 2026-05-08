import { motion } from 'framer-motion';
import { Zap, Mail, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <motion.nav
      className="navbar"
      id="main-navbar"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-inner">
        <motion.div
          className="navbar-brand"
          id="navbar-brand"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <motion.div
            className="navbar-logo"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Zap size={20} />
          </motion.div>
          <span className="navbar-title">Moxsend</span>
          <span className="navbar-badge">AI</span>
        </motion.div>

        <div className="navbar-tabs" id="navbar-tabs">
          <motion.button
            className={`navbar-tab ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => onTabChange('generate')}
            id="tab-generate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Sparkles size={16} />
            <span>Generate</span>
          </motion.button>
          <motion.button
            className={`navbar-tab ${activeTab === 'csv' ? 'active' : ''}`}
            onClick={() => onTabChange('csv')}
            id="tab-csv"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Mail size={16} />
            <span>Bulk CSV</span>
          </motion.button>
        </div>

        <div className="navbar-end">
          <div className="navbar-status">
            <span className="status-dot"></span>
            <span className="status-text">Ready</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
