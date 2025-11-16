import React, { useState } from 'react';

function DetailedFeedback({ feedback }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const formatFeedback = (text) => {
    const lines = text.split('\n');
    const formatted = [];
    let currentSection = null;
    let currentContent = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Check if line is a heading (starts with #, or is all caps, or ends with :)
      const isHeading = trimmed.startsWith('#') || 
                       (trimmed.length < 50 && trimmed.endsWith(':')) ||
                       (trimmed === trimmed.toUpperCase() && trimmed.length < 50);

      if (isHeading && currentSection) {
        // Save previous section
        formatted.push({
          type: 'section',
          title: currentSection,
          content: currentContent.join('\n')
        });
        currentSection = trimmed.replace(/^#+\s*/, '').replace(':', '');
        currentContent = [];
      } else if (isHeading) {
        currentSection = trimmed.replace(/^#+\s*/, '').replace(':', '');
        currentContent = [];
      } else {
        currentContent.push(trimmed);
      }
    });

    // Add last section
    if (currentSection) {
      formatted.push({
        type: 'section',
        title: currentSection,
        content: currentContent.join('\n')
      });
    }

    // If no sections found, return as simple paragraphs
    if (formatted.length === 0) {
      return lines.filter(l => l.trim()).map((line, index) => (
        <p key={index} className="feedback-paragraph">{line.trim()}</p>
      ));
    }

    return formatted.map((section, index) => (
      <div key={index} className="feedback-section">
        <h3 className="feedback-section-title">{section.title}</h3>
        <div className="feedback-section-content">
          {section.content.split('\n').filter(l => l.trim()).map((para, pIndex) => (
            <p key={pIndex} className="feedback-paragraph">{para.trim()}</p>
          ))}
        </div>
      </div>
    ));
  };

  const wordCount = feedback.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = feedback.length;

  return (
    <section className="feedback-section-container">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">📝</span>
          Detailed Feedback
        </h2>
        <button 
          className="feedback-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse feedback' : 'Expand feedback'}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
          <span className="toggle-icon">{isExpanded ? '▲' : '▼'}</span>
        </button>
      </div>
      <div className="feedback-stats">
        <div className="feedback-stat">
          <span className="stat-label">Words:</span>
          <span className="stat-value">{wordCount.toLocaleString()}</span>
        </div>
        <div className="feedback-stat">
          <span className="stat-label">Characters:</span>
          <span className="stat-value">{charCount.toLocaleString()}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="feedback-box feedback-detailed">
          <div className="feedback-content">
            {formatFeedback(feedback)}
          </div>
        </div>
      )}
    </section>
  );
}
export default DetailedFeedback;