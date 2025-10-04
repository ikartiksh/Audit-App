import { analyzeProposalMetrics, extractProjectTimeline, getAiReview } from './cerebrasLlama_service';

export async function processProposal(uploadedFile, problemStatement, reviewerMode, setProgress) {
  const results = {};

  try {
    setProgress(10); 

    results.metrics = await analyzeProposalMetrics(uploadedFile, problemStatement);
    setProgress(40); 

    results.timeline = await extractProjectTimeline(uploadedFile);
    setProgress(70); 

    results.feedback = await getAiReview(uploadedFile, problemStatement, reviewerMode);
    setProgress(100); 

    results.success = true;
    return results;

  } catch (error) {
    console.error("Error processing proposal:", error);
    results.success = false;
    return results;

  } finally {
    setTimeout(() => {
      setProgress(0);
    }, 1500);
  }
}