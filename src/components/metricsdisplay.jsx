import React, { useEffect, useState } from 'react';

function MetricCard({ title, value, icon, color }) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setAnimatedValue(value);
                clearInterval(timer);
            } else {
                setAnimatedValue(Math.round(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    const percentage = animatedValue;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="metric-card">
            <div className="metric-card-header">
                <div className="metric-icon" style={{ backgroundColor: `${color}20`, color: color }}>
                    {icon}
                </div>
                <div className="metric-info">
                    <h3 className="metric-title">{title}</h3>
                    <span className="metric-label">{getScoreLabel(value)}</span>
                </div>
            </div>
            <div className="metric-visualization">
                <div className="metric-circle-container">
                    <svg className="metric-circle" viewBox="0 0 100 100">
                        <circle
                            className="metric-circle-bg"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            strokeWidth="8"
                        />
                        <circle
                            className="metric-circle-progress"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            strokeWidth="8"
                            stroke={color}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <div className="metric-value-display">
                        <span className="metric-value">{animatedValue}</span>
                        <span className="metric-max">/100</span>
                    </div>
                </div>
                <div className="metric-progress-bar">
                    <div 
                        className="metric-progress-fill"
                        style={{ 
                            width: `${percentage}%`,
                            backgroundColor: color
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

function MetricsDisplay({ metrics }) {
    const [overallScore, setOverallScore] = useState(0);

    useEffect(() => {
        const calculatedScore = Math.round((
            metrics.technical_depth +
            metrics.project_understanding +
            metrics.timeline_clarity +
            metrics.innovation_score +
            metrics.implementation_feasibility
        ) / 5);

        const duration = 2000;
        const steps = 60;
        const increment = calculatedScore / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= calculatedScore) {
                setOverallScore(calculatedScore);
                clearInterval(timer);
            } else {
                setOverallScore(Math.round(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [metrics]);

    const scoreClass = overallScore >= 70 ? "high-score" : overallScore >= 50 ? "medium-score" : "low-score";
    const scoreColor = overallScore >= 70 ? "#4caf50" : overallScore >= 50 ? "#ffeb3b" : "#f44336";
    const scoreLabel = overallScore >= 70 ? "Excellent" : overallScore >= 50 ? "Good" : "Needs Work";

    const metricConfigs = [
        { key: 'technical_depth', title: 'Technical Depth', icon: '🔬', color: '#2196F3' },
        { key: 'project_understanding', title: 'Project Understanding', icon: '🧠', color: '#9C27B0' },
        { key: 'timeline_clarity', title: 'Timeline Clarity', icon: '📅', color: '#FF9800' },
        { key: 'implementation_feasibility', title: 'Feasibility', icon: '✅', color: '#4CAF50' },
        { key: 'innovation_score', title: 'Innovation', icon: '💡', color: '#E91E63' }
    ];

    return (
        <section className="metrics-section">
            <div className="section-header">
                <h2 className="section-title">
                    <span className="section-icon">📊</span>
                    Analysis Results
                </h2>
            </div>
            <div className={`overall-score-display ${scoreClass}`}>
                <div className="overall-score-content">
                    <div className="overall-score-label">Overall Score</div>
                    <div className="overall-score-value">
                        <span className="score-number">{overallScore}</span>
                        <span className="score-max">/100</span>
                    </div>
                    <div className="overall-score-label-text" style={{ color: scoreColor }}>
                        {scoreLabel}
                    </div>
                    <div className="overall-score-bar">
                        <div 
                            className="overall-score-fill"
                            style={{ 
                                width: `${overallScore}%`,
                                backgroundColor: scoreColor
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="metrics-container">
                {metricConfigs.map((config) => (
                    <MetricCard
                        key={config.key}
                        title={config.title}
                        value={metrics[config.key]}
                        icon={config.icon}
                        color={config.color}
                    />
                ))}
            </div>
        </section>
    );
}
export default MetricsDisplay;