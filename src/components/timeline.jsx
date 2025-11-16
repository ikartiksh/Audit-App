import React from 'react';

function Timeline({ timeline }) {
  const timelineEntries = Object.entries(timeline);
  const totalPhases = timelineEntries.length;

  return (
    <section className="timeline-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">📅</span>
          Project Timeline Analysis
        </h2>
        <p className="section-description">
          Review of the proposed project timeline and milestones
        </p>
      </div>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {timelineEntries.map(([period, task], index) => {
          const isEven = index % 2 === 0;
          const phaseNumber = index + 1;
          
          return (
            <div 
              key={period} 
              className={`timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}
            >
              <div className="timeline-marker">
                <div className="timeline-marker-dot"></div>
                <div className="timeline-phase-number">{phaseNumber}</div>
              </div>
              <div className="timeline-content">
                <div className="timeline-period">
                  <span className="timeline-period-icon">⏱️</span>
                  <strong>{period}</strong>
                </div>
                <div className="timeline-task">
                  <p>{task}</p>
                </div>
                <div className="timeline-progress-indicator">
                  <div 
                    className="timeline-progress-bar"
                    style={{ width: `${((phaseNumber) / totalPhases) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="timeline-summary">
        <div className="timeline-summary-item">
          <span className="timeline-summary-label">Total Phases:</span>
          <span className="timeline-summary-value">{totalPhases}</span>
        </div>
        <div className="timeline-summary-item">
          <span className="timeline-summary-label">Timeline Clarity:</span>
          <span className="timeline-summary-value">Analyzed</span>
        </div>
      </div>
    </section>
  );
}
export default Timeline;