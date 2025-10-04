import React from 'react';

function DetailedFeedback({ feedback }) {
  // Use a simple regex to format the feedback with paragraphs
  const formattedFeedback = feedback.split('\n').map((paragraph, index) => (
    paragraph.trim() ? <p key={index}>{paragraph}</p> : null
  ));

  return (
    <div>
      <h2>Detailed Feedback</h2>
      <div className="feedback-box">
        {formattedFeedback}
      </div>
    </div>
  );
}
export default DetailedFeedback;