import React from 'react';

function MetricCard({ title, value }) {
    return (
        <div className="metric-card">
            <div className="metric-title">{title}</div>
            <div className="metric-value">{value}/100</div>
        </div>
    );
}

function MetricsDisplay({ metrics }) {
    const overallScore = Math.round((
      metrics.technical_depth +
      metrics.project_understanding +
      metrics.timeline_clarity +
      metrics.innovation_score +
      metrics.implementation_feasibility
    ) / 5);

    const scoreClass = overallScore >= 70 ? "high-score" : overallScore >= 50 ? "medium-score" : "low-score";

    return (
        <>
            <div className={`score-display ${scoreClass}`}>
                Overall Score: {overallScore}/100
            </div>
            <div className="metrics-container">
                <MetricCard title="Technical Depth" value={metrics.technical_depth} />
                <MetricCard title="Project Understanding" value={metrics.project_understanding} />
                <MetricCard title="Timeline Clarity" value={metrics.timeline_clarity} />
                <MetricCard title="Implementation Feasibility" value={metrics.implementation_feasibility} />
                <MetricCard title="Innovation Score" value={metrics.innovation_score} />
            </div>
        </>
    );
}
export default MetricsDisplay;