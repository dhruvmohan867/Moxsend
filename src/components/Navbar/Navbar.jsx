import { Zap, Mail, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" id="navbar-brand">
          <div className="navbar-logo">
            <Zap size={20} />
          </div>
          <span className="navbar-title">Moxsend</span>
          <span className="navbar-badge">AI</span>
        </div>

        <div className="navbar-tabs" id="navbar-tabs">
          <button
            className={`navbar-tab ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => onTabChange('generate')}
            id="tab-generate"
          >
            <Sparkles size={16} />
            <span>Generate</span>
          </button>
          <button
            className={`navbar-tab ${activeTab === 'csv' ? 'active' : ''}`}
            onClick={() => onTabChange('csv')}
            id="tab-csv"
          >
            <Mail size={16} />
            <span>Bulk CSV</span>
          </button>
        </div>

        <div className="navbar-end">
          <div className="navbar-status">
            <span className="status-dot"></span>
            <span className="status-text">Ready</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
