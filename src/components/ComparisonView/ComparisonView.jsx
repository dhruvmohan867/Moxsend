import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import './ComparisonView.css';

export default function ComparisonView({ original, improved }) {
  if (!original || !improved) return null;

  return (
    <div className="comparison-view fade-in-up" id="comparison-view">
      <div className="comparison-header">
        <div className="comparison-icon">
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 className="comparison-title">Before & After Comparison</h3>
          <p className="comparison-subtitle">
            See how the AI improved your email for better engagement
          </p>
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
        <div className="comparison-arrow">
          <div className="arrow-circle">
            <ArrowRight size={20} />
          </div>
          <Sparkles size={14} className="arrow-sparkle" />
        </div>

        {/* After */}
        <div className="comparison-card after-card">
          <div className="comparison-card-label">
            <span className="label-dot after-dot"></span>
            <span>After</span>
            <span className="improved-tag">
              <Sparkles size={10} />
              AI Improved
            </span>
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
