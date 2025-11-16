import React, { useState } from 'react';

function TipsSection() {
  const [expandedTip, setExpandedTip] = useState(null);

  const tips = [
    {
      icon: '🎯',
      title: 'Problem Definition',
      description: 'Clearly define the problem and your proposed solution.',
      details: 'Start with a concise problem statement that demonstrates your understanding of the project\'s challenges. Explain why this problem matters and how your solution addresses it effectively.'
    },
    {
      icon: '📅',
      title: 'Detailed Timeline',
      description: 'Provide a detailed, week-by-week implementation plan and timeline.',
      details: 'Break down your project into phases with specific milestones. Include buffer time for unexpected challenges and clearly indicate deliverables for each phase.'
    },
    {
      icon: '💻',
      title: 'Technical Capabilities',
      description: 'Demonstrate your technical capabilities with relevant examples.',
      details: 'Showcase your previous work, contributions to open source projects, or relevant technical experience. Include links to your GitHub, portfolio, or any relevant projects.'
    },
    {
      icon: '💡',
      title: 'Motivation & Interest',
      description: 'Explain your motivation and long-term interest in the project.',
      details: 'Share your passion for the project and how it aligns with your career goals. Explain why you\'re committed to seeing this project through beyond the GSoC period.'
    },
    {
      icon: '📝',
      title: 'Clear Communication',
      description: 'Write clearly and concisely with proper structure and formatting.',
      details: 'Use headings, bullet points, and proper formatting to make your proposal easy to read. Proofread carefully and ensure all sections are well-organized.'
    },
    {
      icon: '🤝',
      title: 'Community Engagement',
      description: 'Show evidence of prior engagement with the project community.',
      details: 'Mention any contributions, discussions on mailing lists, or interactions with mentors. This demonstrates your commitment and understanding of the project culture.'
    }
  ];

  return (
    <section className="tips-section" id="tips">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">💡</span>
          Tips for Writing Great Proposals
        </h2>
        <p className="section-description">
          Follow these guidelines to create a compelling GSoC proposal that stands out
        </p>
      </div>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className={`tip-card ${expandedTip === index ? 'tip-card-expanded' : ''}`}
            onClick={() => setExpandedTip(expandedTip === index ? null : index)}
          >
            <div className="tip-card-header">
              <div className="tip-icon">{tip.icon}</div>
              <h3 className="tip-title">{tip.title}</h3>
              <button 
                className="tip-expand-btn"
                aria-label={expandedTip === index ? 'Collapse' : 'Expand'}
              >
                {expandedTip === index ? '−' : '+'}
              </button>
            </div>
            <p className="tip-description">{tip.description}</p>
            {expandedTip === index && (
              <div className="tip-details">
                <p>{tip.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default TipsSection;