import React, { useState } from 'react';

function ExportOptions({ analysisResults }) {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  if (!analysisResults) {
    return null;
  }

  const handleExport = async (format) => {
    setIsExporting(true);
    
    try {
      if (format === 'pdf') {
        await exportToPDF();
      } else if (format === 'json') {
        exportToJSON();
      } else if (format === 'markdown') {
        exportToMarkdown();
      } else if (format === 'txt') {
        exportToTXT();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    // This would require a PDF library like jsPDF
    // For now, we'll create a printable version
    const printWindow = window.open('', '_blank');
    const content = generateExportContent();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GSoC Proposal Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .section { margin: 20px 0; }
            .metric { margin: 10px 0; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(analysisResults, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'proposal-analysis.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToMarkdown = () => {
    const markdown = generateMarkdownContent();
    const dataBlob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'proposal-analysis.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToTXT = () => {
    const text = generateTextContent();
    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'proposal-analysis.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateExportContent = () => {
    const overallScore = Math.round((
      analysisResults.metrics.technical_depth +
      analysisResults.metrics.project_understanding +
      analysisResults.metrics.timeline_clarity +
      analysisResults.metrics.innovation_score +
      analysisResults.metrics.implementation_feasibility
    ) / 5);

    return `
      <h1>GSoC Proposal Analysis Report</h1>
      <div class="section">
        <h2>Overall Score: ${overallScore}/100</h2>
      </div>
      <div class="section">
        <h2>Metrics</h2>
        <div class="metric">Technical Depth: ${analysisResults.metrics.technical_depth}/100</div>
        <div class="metric">Project Understanding: ${analysisResults.metrics.project_understanding}/100</div>
        <div class="metric">Timeline Clarity: ${analysisResults.metrics.timeline_clarity}/100</div>
        <div class="metric">Implementation Feasibility: ${analysisResults.metrics.implementation_feasibility}/100</div>
        <div class="metric">Innovation Score: ${analysisResults.metrics.innovation_score}/100</div>
      </div>
      <div class="section">
        <h2>Strengths</h2>
        <ul>
          ${analysisResults.metrics.strengths.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div class="section">
        <h2>Areas for Improvement</h2>
        <ul>
          ${analysisResults.metrics.weaknesses.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>
      <div class="section">
        <h2>Timeline</h2>
        ${Object.entries(analysisResults.timeline).map(([period, task]) => 
          `<div><strong>${period}</strong>: ${task}</div>`
        ).join('')}
      </div>
      <div class="section">
        <h2>Detailed Feedback</h2>
        <div>${analysisResults.feedback.replace(/\n/g, '<br>')}</div>
      </div>
    `;
  };

  const generateMarkdownContent = () => {
    const overallScore = Math.round((
      analysisResults.metrics.technical_depth +
      analysisResults.metrics.project_understanding +
      analysisResults.metrics.timeline_clarity +
      analysisResults.metrics.innovation_score +
      analysisResults.metrics.implementation_feasibility
    ) / 5);

    return `# GSoC Proposal Analysis Report

## Overall Score: ${overallScore}/100

## Metrics

- Technical Depth: ${analysisResults.metrics.technical_depth}/100
- Project Understanding: ${analysisResults.metrics.project_understanding}/100
- Timeline Clarity: ${analysisResults.metrics.timeline_clarity}/100
- Implementation Feasibility: ${analysisResults.metrics.implementation_feasibility}/100
- Innovation Score: ${analysisResults.metrics.innovation_score}/100

## Strengths

${analysisResults.metrics.strengths.map(s => `- ${s}`).join('\n')}

## Areas for Improvement

${analysisResults.metrics.weaknesses.map(w => `- ${w}`).join('\n')}

## Timeline

${Object.entries(analysisResults.timeline).map(([period, task]) => 
  `### ${period}\n${task}`
).join('\n\n')}

## Detailed Feedback

${analysisResults.feedback}
`;
  };

  const generateTextContent = () => {
    const overallScore = Math.round((
      analysisResults.metrics.technical_depth +
      analysisResults.metrics.project_understanding +
      analysisResults.metrics.timeline_clarity +
      analysisResults.metrics.innovation_score +
      analysisResults.metrics.implementation_feasibility
    ) / 5);

    return `GSoC Proposal Analysis Report
=====================================

Overall Score: ${overallScore}/100

METRICS
-------
Technical Depth: ${analysisResults.metrics.technical_depth}/100
Project Understanding: ${analysisResults.metrics.project_understanding}/100
Timeline Clarity: ${analysisResults.metrics.timeline_clarity}/100
Implementation Feasibility: ${analysisResults.metrics.implementation_feasibility}/100
Innovation Score: ${analysisResults.metrics.innovation_score}/100

STRENGTHS
---------
${analysisResults.metrics.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

AREAS FOR IMPROVEMENT
---------------------
${analysisResults.metrics.weaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n')}

TIMELINE
--------
${Object.entries(analysisResults.timeline).map(([period, task]) => 
  `${period}: ${task}`
).join('\n\n')}

DETAILED FEEDBACK
-----------------
${analysisResults.feedback}
`;
  };

  const exportOptions = [
    { id: 'pdf', label: 'PDF', icon: '📄', description: 'Print-ready format' },
    { id: 'json', label: 'JSON', icon: '📦', description: 'Structured data' },
    { id: 'markdown', label: 'Markdown', icon: '📝', description: 'Documentation format' },
    { id: 'txt', label: 'Text', icon: '📋', description: 'Plain text format' }
  ];

  return (
    <section className="export-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">💾</span>
          Export Results
        </h2>
        <p className="section-description">
          Download your analysis results in various formats
        </p>
      </div>
      <div className="export-options-grid">
        {exportOptions.map((option) => (
          <button
            key={option.id}
            className={`export-option ${exportFormat === option.id ? 'export-option-selected' : ''}`}
            onClick={() => {
              setExportFormat(option.id);
              handleExport(option.id);
            }}
            disabled={isExporting}
          >
            <div className="export-option-icon">{option.icon}</div>
            <div className="export-option-content">
              <h3 className="export-option-label">{option.label}</h3>
              <p className="export-option-description">{option.description}</p>
            </div>
            {isExporting && exportFormat === option.id && (
              <div className="export-loading">
                <div className="spinner"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default ExportOptions;

