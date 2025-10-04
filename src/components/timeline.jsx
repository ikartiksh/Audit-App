import React from 'react';

function Timeline({ timeline }) {
  return (
    <div>
      <h3>Project Timeline</h3>
      <div className="timeline">
        {Object.entries(timeline).map(([period, task]) => (
          <div key={period} className="timeline-item">
            <strong>{period}</strong>: {task}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Timeline;