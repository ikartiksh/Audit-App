import React, { useState } from 'react';
import './styles.css';

import Header from './components/header';
import TipsSection from './components/tips';
import FileInfo from './components/fileinfo';
import MetricsDisplay from './components/metricsdisplay';
import StrengthsWeaknesses from './components/analytical';
import Timeline from './components/timeline';
import DetailedFeedback from './components/feedback';
import Footer from './components/footer';

import { processProposal } from './services/process';

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.elements.fileInput.files[0];
    const problemStatement = event.target.elements.problemStatement.value;
    
    if (!file) {
      setError("Please upload a proposal PDF.");
      return;
    }

    setUploadedFile(file);
    setIsLoading(true);
    setError(null);
    setAnalysisResults(null);

    const results = await processProposal(file, problemStatement, false, setProgress);

    if (results.success) {
      setAnalysisResults(results);
    } else {
      setError("Failed to process the proposal. Check your API key and network, then try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="main stApp">
      <Header />
      <TipsSection />
      
      <form onSubmit={handleSubmit} className="feedback-box">
        <h2>Analyze a Proposal</h2>
        <textarea 
          name="problemStatement" 
          placeholder="Enter the GSoC Problem Statement here..."
          rows="4"
          required
        />
         
        <input type="file" name="fileInput" accept=".pdf" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? `Analyzing... ${progress}%` : "Analyze Proposal"}
        </button>
      </form>

      {isLoading && <progress value={progress} max="100" />}
      {isLoading && <FileInfo uploadedFile={uploadedFile} />}
      {error && <p style={{ color: '#f44336', textAlign: 'center' }}><strong>Error:</strong> {error}</p>}

      {analysisResults && (
        <div className="results-container" style={{marginTop: '2rem'}}>
          <MetricsDisplay metrics={analysisResults.metrics} />
          <StrengthsWeaknesses metrics={analysisResults.metrics} />
          <Timeline timeline={analysisResults.timeline} />
          <DetailedFeedback feedback={analysisResults.feedback} />
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App;