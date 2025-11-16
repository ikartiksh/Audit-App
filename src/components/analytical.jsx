import React from 'react';

function StrengthsWeaknesses({ metrics }) {
  return (
    <section className="analytical-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🔍</span>
          Detailed Analysis
        </h2>
      </div>
      <div className="key-points">
        <div className="key-points-column strengths-column">
          <div className="key-points-header">
            <div className="key-points-icon strengths-icon">✨</div>
            <h3 className="key-points-title">Strengths</h3>
            <span className="key-points-count">{metrics.strengths.length}</span>
          </div>
          <div className="key-points-list">
            {metrics.strengths.map((strength, index) => (
              <div key={index} className="key-point key-point-strength">
                <div className="key-point-indicator strength-indicator">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L12.2451 7.5547L20 7.5547L13.8775 12.0906L16.1226 19.6453L10 15.1094L3.87745 19.6453L6.12255 12.0906L0 7.5547L7.75486 7.5547L10 0Z" fill="#4CAF50"/>
                  </svg>
                </div>
                <div className="key-point-content">
                  <p>{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="key-points-column weaknesses-column">
          <div className="key-points-header">
            <div className="key-points-icon weaknesses-icon">🎯</div>
            <h3 className="key-points-title">Areas for Improvement</h3>
            <span className="key-points-count">{metrics.weaknesses.length}</span>
          </div>
          <div className="key-points-list">
            {metrics.weaknesses.map((weakness, index) => (
              <div key={index} className="key-point key-point-weakness">
                <div className="key-point-indicator weakness-indicator">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" fill="#F44336"/>
                    <path d="M10 6V10M10 14H10.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="key-point-content">
                  <p>{weakness}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default StrengthsWeaknesses;