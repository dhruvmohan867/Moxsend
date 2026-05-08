import { useState } from 'react';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import './InputSection.css';

export default function InputSection({ onGenerate, isLoading }) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please describe your product and target audience first.');
      return;
    }
    if (description.trim().length < 20) {
      setError('Please provide a more detailed description (at least 20 characters).');
      return;
    }
    setError('');
    onGenerate(description.trim());
  };

  const charCount = description.length;
  const isValid = charCount >= 20;

  return (
    <section className="input-section fade-in" id="input-section">
      <div className="input-header">
        <div className="input-icon-wrapper">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="input-title">Generate Cold Emails</h1>
          <p className="input-subtitle">
            Describe your product and target audience — our AI will craft personalized, 
            high-converting emails in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="input-form" id="generate-form">
        <div className="textarea-wrapper">
          <label htmlFor="product-description" className="textarea-label">
            Describe your product & audience
          </label>
          <textarea
            id="product-description"
            className={`textarea ${error ? 'textarea-error' : ''}`}
            placeholder="e.g., We're a SaaS platform that helps sales teams automate cold outreach. Our target audience is B2B companies with 50–500 employees looking to scale their pipeline..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError('');
            }}
            rows={5}
            maxLength={1000}
            disabled={isLoading}
          />
          <div className="textarea-footer">
            <span className={`char-count ${isValid ? 'valid' : ''}`}>
              {charCount}/1000
            </span>
            {charCount > 0 && charCount < 20 && (
              <span className="char-hint">
                {20 - charCount} more characters needed
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="input-error fade-in" id="input-error" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="generate-btn"
          id="generate-btn"
          disabled={isLoading || !description.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="spin-icon" />
              <span>Generating Emails...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Generate Email</span>
            </>
          )}
        </button>

        <div className="input-hints">
          <span className="hint-item">✦ 3 unique variations</span>
          <span className="hint-divider">·</span>
          <span className="hint-item">✦ Personalized lines</span>
          <span className="hint-divider">·</span>
          <span className="hint-item">✦ Subject lines included</span>
        </div>
      </form>
    </section>
  );
}
