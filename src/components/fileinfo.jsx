import React from 'react';

function FileInfo({ uploadedFile, progress }) {
  if (!uploadedFile) {
    return null;
  }
  
  const fileSizeKB = uploadedFile.size / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  const displaySize = fileSizeMB >= 1 
    ? `${fileSizeMB.toFixed(2)} MB` 
    : `${fileSizeKB.toFixed(1)} KB`;
  
  const getFileIcon = (fileName) => {
    if (fileName.toLowerCase().endsWith('.pdf')) return '📄';
    return '📎';
  };

  return (
    <div className="file-info-container">
      <div className="file-info-card">
        <div className="file-info-header">
          <div className="file-icon">{getFileIcon(uploadedFile.name)}</div>
          <div className="file-details">
            <h3 className="file-name">{uploadedFile.name}</h3>
            <div className="file-meta">
              <span className="file-size">{displaySize}</span>
              <span className="file-separator">•</span>
              <span className="file-type">PDF Document</span>
            </div>
          </div>
        </div>
        <div className="file-status">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">Processing document...</span>
          </div>
          {progress > 0 && (
            <div className="file-progress-bar">
              <div 
                className="file-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FileInfo;