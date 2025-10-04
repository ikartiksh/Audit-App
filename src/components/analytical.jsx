import React from 'react';

function StrengthsWeaknesses({ metrics }) {
  return (
    <div className="key-points">
      <div>
        <h3>Strengths</h3>
        {metrics.strengths.map((strength, index) => (
          <div key={index} className="key-point">
            <strong>➕</strong> {strength}
          </div>
        ))}
      </div>
      <div>
        <h3>Areas for Improvement</h3>
        {metrics.weaknesses.map((weakness, index) => (
          <div key={index} className="key-point" style={{ borderLeftColor: '#f44336', backgroundColor: '#2f1e1e' }}>
            <strong>➖</strong> {weakness}
          </div>
        ))}
      </div>
    </div>
  );
}
export default StrengthsWeaknesses;