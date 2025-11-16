import React, { useState } from 'react';

function About() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Leverages advanced AI models to provide comprehensive proposal analysis'
    },
    {
      icon: '📊',
      title: 'Detailed Metrics',
      description: 'Get scores across multiple dimensions including technical depth and feasibility'
    },
    {
      icon: '💡',
      title: 'Actionable Feedback',
      description: 'Receive specific, constructive feedback to improve your proposal'
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      description: 'Quick analysis of your proposal with real-time progress tracking'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'how-it-works', label: 'How It Works', icon: '⚙️' },
    { id: 'metrics', label: 'Metrics Explained', icon: '📊' }
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">ℹ️</span>
          About This Tool
        </h2>
        <p className="section-description">
          Learn how the GSoC Proposal Reviewer can help you create a winning proposal
        </p>
      </div>

      <div className="about-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`about-tab ${activeTab === tab.id ? 'about-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="about-content">
        {activeTab === 'overview' && (
          <div className="about-tab-content">
            <div className="about-intro">
              <h3>Welcome to GSoC Proposal Reviewer</h3>
              <p>
                This tool helps you create compelling Google Summer of Code proposals by providing 
                AI-powered analysis and feedback. Whether you're a first-time applicant or looking 
                to refine your proposal, our comprehensive analysis will guide you toward success.
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="about-tab-content">
            <div className="how-it-works">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Upload Your Proposal</h3>
                  <p>Upload your GSoC proposal PDF and provide the problem statement you're addressing.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>AI Analysis</h3>
                  <p>Our AI model analyzes your proposal across multiple dimensions including technical depth, 
                  project understanding, timeline clarity, innovation, and feasibility.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Get Results</h3>
                  <p>Receive detailed metrics, strengths, areas for improvement, timeline analysis, 
                  and comprehensive feedback to help you refine your proposal.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="about-tab-content">
            <div className="metrics-explained">
              <div className="metric-explanation">
                <div className="metric-explanation-header">
                  <span className="metric-explanation-icon">🔬</span>
                  <h3>Technical Depth</h3>
                </div>
                <p>Evaluates how well you demonstrate technical knowledge, understanding of the technology stack, 
                and ability to implement the proposed solution.</p>
              </div>
              <div className="metric-explanation">
                <div className="metric-explanation-header">
                  <span className="metric-explanation-icon">🧠</span>
                  <h3>Project Understanding</h3>
                </div>
                <p>Assesses your comprehension of the project requirements, problem statement, and alignment 
                with the organization's goals.</p>
              </div>
              <div className="metric-explanation">
                <div className="metric-explanation-header">
                  <span className="metric-explanation-icon">📅</span>
                  <h3>Timeline Clarity</h3>
                </div>
                <p>Reviews the clarity, realism, and detail of your proposed timeline and milestones.</p>
              </div>
              <div className="metric-explanation">
                <div className="metric-explanation-header">
                  <span className="metric-explanation-icon">✅</span>
                  <h3>Implementation Feasibility</h3>
                </div>
                <p>Evaluates whether your proposed solution is realistic and achievable within the given timeframe.</p>
              </div>
              <div className="metric-explanation">
                <div className="metric-explanation-header">
                  <span className="metric-explanation-icon">💡</span>
                  <h3>Innovation Score</h3>
                </div>
                <p>Measures the creativity, originality, and innovative aspects of your proposal.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default About;

