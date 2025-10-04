import React from 'react';

function FileInfo({ uploadedFile }) {
  if (!uploadedFile) {
    return null;
  }
  const fileSizeKB = uploadedFile.size / 1024;
  return (
    <div style={{ marginTop: '1rem', color: '#aaa' }}>
      <p>✅ Analyzing: <strong>{uploadedFile.name}</strong> ({fileSizeKB.toFixed(1)} KB)</p>
    </div>
  );
}
export default FileInfo;