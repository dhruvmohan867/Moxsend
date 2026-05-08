import { useState } from 'react';
import { Copy, Check, RefreshCw, Loader2, ChevronDown, ChevronUp, Tag, User, Mail } from 'lucide-react';
import './EmailCard.css';

export default function EmailCard({ email, index, onImprove, isImproving }) {
  const [copied, setCopied] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className="email-card fade-in-up"
      id={`email-card-${email.id}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Header */}
      <div className="email-card-header">
        <div className="email-card-meta">
          <span className="variation-badge">
            <Tag size={12} />
            {email.variationLabel}
          </span>
          {email.tone && (
            <span className="tone-badge">{email.tone}</span>
          )}
        </div>
        <button
          className="collapse-btn"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse email' : 'Expand email'}
          id={`collapse-${email.id}`}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {expanded && (
        <div className="email-card-body">
          {/* Subject Line */}
          <div className="email-field">
            <div className="field-header">
              <div className="field-label">
                <Mail size={14} />
                <span>Subject Line</span>
              </div>
              <button
                className={`copy-btn ${copied === 'subject' ? 'copied' : ''}`}
                onClick={() => handleCopy(email.subject, 'subject')}
                id={`copy-subject-${email.id}`}
                title="Copy subject line"
              >
                {copied === 'subject' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'subject' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="field-content subject-content">
              {email.subject}
            </div>
          </div>

          {/* Personalized Line */}
          <div className="email-field personalized-field">
            <div className="field-header">
              <div className="field-label">
                <User size={14} />
                <span>Personalized Line</span>
              </div>
              <button
                className={`copy-btn ${copied === 'personal' ? 'copied' : ''}`}
                onClick={() => handleCopy(email.personalizedLine, 'personal')}
                id={`copy-personal-${email.id}`}
                title="Copy personalized line"
              >
                {copied === 'personal' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'personal' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="field-content personalized-content">
              "{email.personalizedLine}"
            </div>
          </div>

          {/* Email Body */}
          <div className="email-field">
            <div className="field-header">
              <div className="field-label">
                <Mail size={14} />
                <span>Email Body</span>
              </div>
              <button
                className={`copy-btn ${copied === 'body' ? 'copied' : ''}`}
                onClick={() => handleCopy(email.body, 'body')}
                id={`copy-body-${email.id}`}
                title="Copy email body"
              >
                {copied === 'body' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'body' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="field-content email-body-content">
              {email.body}
            </pre>
          </div>

          {/* Improve Button */}
          {onImprove && (
            <button
              className="improve-btn"
              onClick={() => onImprove(email)}
              disabled={isImproving}
              id={`improve-btn-${email.id}`}
            >
              {isImproving ? (
                <>
                  <Loader2 size={16} className="spin-icon" />
                  <span>Improving...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  <span>Improve this email</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
