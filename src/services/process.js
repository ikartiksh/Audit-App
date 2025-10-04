import { analyzeProposalMetrics, extractProjectTimeline, getAiReview } from './cerebrasLlama_service';

/**
 * Orchestrates the analysis of a proposal by calling multiple AI services sequentially.
 *
 * @param {File} uploadedFile - The PDF file object from the input.
 * @param {string} problemStatement - The problem statement text.
 * @param {boolean} reviewerMode - Flag for the type of review to generate.
 * @param {function} setProgress - A React state setter function to update the UI's progress bar.
 * @returns {Promise<object>} - A promise that resolves to an object with the analysis results.
 */
export async function processProposal(uploadedFile, problemStatement, reviewerMode, setProgress) {
  const results = {};

  try {
    // Start the process
    setProgress(10); // Initial progress

    results.metrics = await analyzeProposalMetrics(uploadedFile, problemStatement);
    setProgress(40); // Progress after first task

    results.timeline = await extractProjectTimeline(uploadedFile);
    setProgress(70); // Progress after second task

    results.feedback = await getAiReview(uploadedFile, problemStatement, reviewerMode);
    setProgress(100); // Analysis complete

    results.success = true;
    return results;

  } catch (error) {
    console.error("Error processing proposal:", error);
    results.success = false;
    return results;

  } finally {
    // Hide the progress bar after a short delay for better UX
    setTimeout(() => {
      setProgress(0);
    }, 1500);
  }
}