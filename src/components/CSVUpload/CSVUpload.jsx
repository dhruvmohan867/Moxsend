import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload, FileText, Users, Loader2, Send, AlertCircle, X,
  Download, CheckCircle, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';
import { parseCSV, generateEmailsForCSV, sampleCSV } from '../../utils/mockData';
import './CSVUpload.css';

export default function CSVUpload() {
  const [contacts, setContacts] = useState([]);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [generatedEmails, setGeneratedEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file.');
      return;
    }

    setError('');
    setFileName(file.name);
    setGeneratedEmails([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseCSV(e.target.result);
        if (parsed.length === 0) {
          setError('No valid contacts found in CSV. Make sure it has a header row.');
          return;
        }
        setContacts(parsed);
      } catch {
        setError('Failed to parse CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe your product before generating.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 2000));

    const emails = generateEmailsForCSV(contacts, description);
    setGeneratedEmails(emails);
    setIsLoading(false);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemoveFile = () => {
    setContacts([]);
    setFileName('');
    setGeneratedEmails([]);
    setError('');
  };

  const handleDownloadSample = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moxsend_sample_contacts.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="csv-upload fade-in" id="csv-upload-section">
      {/* Header */}
      <div className="csv-header">
        <div className="csv-icon-wrapper">
          <Users size={24} />
        </div>
        <div>
          <h2 className="csv-title">Bulk Email Generation</h2>
          <p className="csv-subtitle">
            Upload a CSV of contacts and generate personalized emails for each one.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      {contacts.length === 0 ? (
        <div className="csv-upload-area">
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
            id="csv-dropzone"
          >
            <input {...getInputProps()} id="csv-file-input" />
            <div className="dropzone-icon">
              <Upload size={32} />
            </div>
            <p className="dropzone-text">
              {isDragActive
                ? 'Drop your CSV file here...'
                : 'Drag & drop a CSV file, or click to browse'}
            </p>
            <span className="dropzone-hint">Supports .csv files with contact data</span>
          </div>

          <button
            className="download-sample-btn"
            onClick={handleDownloadSample}
            id="download-sample-btn"
          >
            <Download size={14} />
            <span>Download sample CSV</span>
          </button>
        </div>
      ) : (
        <>
          {/* File Info */}
          <div className="csv-file-info">
            <div className="file-info-left">
              <FileText size={18} />
              <div>
                <span className="file-name">{fileName}</span>
                <span className="file-meta">{contacts.length} contacts found</span>
              </div>
            </div>
            <button
              className="remove-file-btn"
              onClick={handleRemoveFile}
              id="remove-file-btn"
              title="Remove file"
            >
              <X size={16} />
            </button>
          </div>

          {/* Contact Preview Table */}
          <div className="csv-preview">
            <h3 className="preview-title">
              <Users size={16} />
              Contact Preview
            </h3>
            <div className="table-wrapper">
              <table className="contacts-table" id="contacts-table">
                <thead>
                  <tr>
                    {Object.keys(contacts[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.slice(0, 5).map((contact, idx) => (
                    <tr key={idx}>
                      {Object.values(contact).map((val, vIdx) => (
                        <td key={vIdx}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {contacts.length > 5 && (
              <p className="table-truncated">
                + {contacts.length - 5} more contacts
              </p>
            )}
          </div>

          {/* Product Description */}
          <div className="csv-description-wrapper">
            <label htmlFor="csv-product-desc" className="csv-desc-label">
              Describe your product (for context)
            </label>
            <textarea
              id="csv-product-desc"
              className="csv-textarea"
              placeholder="e.g., We're a SaaS tool for automating sales outreach..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError('');
              }}
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="csv-error fade-in" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Generate Button */}
          <button
            className="csv-generate-btn"
            onClick={handleGenerate}
            disabled={isLoading || !description.trim()}
            id="csv-generate-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="spin-icon" />
                <span>Generating for {contacts.length} contacts...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Generate Emails for {contacts.length} Contacts</span>
              </>
            )}
          </button>
        </>
      )}

      {/* Generated Emails List */}
      {generatedEmails.length > 0 && (
        <div className="csv-results fade-in-up" id="csv-results">
          <div className="csv-results-header">
            <CheckCircle size={20} className="results-check" />
            <h3 className="results-title">
              {generatedEmails.length} Emails Generated
            </h3>
          </div>

          <div className="csv-email-list">
            {generatedEmails.map((email, idx) => {
              const contactName =
                email.contact.name ||
                email.contact.firstname ||
                email.contact['first name'] ||
                'Contact';
              const contactCompany = email.contact.company || '';
              const isExpanded = expandedEmail === idx;

              return (
                <div
                  key={email.id}
                  className={`csv-email-item ${isExpanded ? 'expanded' : ''}`}
                  id={`csv-email-${idx}`}
                >
                  <button
                    className="csv-email-toggle"
                    onClick={() => setExpandedEmail(isExpanded ? null : idx)}
                  >
                    <div className="csv-email-summary">
                      <span className="csv-email-index">{idx + 1}</span>
                      <div className="csv-email-info">
                        <span className="csv-email-name">{contactName}</span>
                        {contactCompany && (
                          <span className="csv-email-company">{contactCompany}</span>
                        )}
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {isExpanded && (
                    <div className="csv-email-detail fade-in">
                      <div className="csv-detail-field">
                        <div className="csv-detail-header">
                          <span className="csv-detail-label">Subject</span>
                          <button
                            className={`copy-btn ${copiedId === `s-${idx}` ? 'copied' : ''}`}
                            onClick={() => handleCopy(email.subject, `s-${idx}`)}
                          >
                            {copiedId === `s-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                        <p className="csv-detail-value font-semibold">{email.subject}</p>
                      </div>
                      <div className="csv-detail-field">
                        <span className="csv-detail-label">Personalized Line</span>
                        <p className="csv-detail-value italic text-accent">
                          "{email.personalizedLine}"
                        </p>
                      </div>
                      <div className="csv-detail-field">
                        <div className="csv-detail-header">
                          <span className="csv-detail-label">Body</span>
                          <button
                            className={`copy-btn ${copiedId === `b-${idx}` ? 'copied' : ''}`}
                            onClick={() => handleCopy(email.body, `b-${idx}`)}
                          >
                            {copiedId === `b-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                        <pre className="csv-detail-value body-pre">{email.body}</pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
