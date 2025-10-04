import Cerebras from '@cerebras/cerebras_cloud_sdk';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.min.mjs';

const client = new Cerebras({
  apiKey: import.meta.env.VITE_CEREBRAS_API_KEY,
});

const MODEL_NAME = 'llama-4-scout-17b-16e-instruct';

async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let allText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    allText += pageText + '\n';
  }
  return allText;
}

async function callCerebrasAPI(system_prompt, user_prompt) {
    const completion = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [
            { role: 'system', content: system_prompt },
            { role: 'user', content: user_prompt }
        ],
        temperature: 0.2,
        max_tokens: 2048,
    });
    return completion.choices[0].message.content;
}

export async function analyzeProposalMetrics(pdfFile, problemStatement) {
  const defaultMetrics = {
    technical_depth: 20, project_understanding: 20, timeline_clarity: 20, innovation_score: 20,
    implementation_feasibility: 20, strengths: ["AI could not determine strengths."], weaknesses: ["AI could not determine weaknesses."]
  };

  try {
    const proposalText = await extractTextFromPdf(pdfFile);
    const system_prompt = `You are a fair GSoC proposal analyzer. Your task is to evaluate a proposal's text. Return ONLY a valid JSON object with no other text or markdown.`;
    const user_prompt = `Problem Statement: "${problemStatement}". Proposal Text: "${proposalText}".\n\nExtract the following metrics as a valid JSON object: "technical_depth" (1-100), "project_understanding" (1-100), "timeline_clarity" (1-100), "innovation_score" (1-100), "implementation_feasibility" (1-100), "strengths" (list of 3 strings), and "weaknesses" (list of 3 strings). If the proposal doesn't match the problem statement, "project_understanding" MUST be below 20.`;

    const responseText = await callCerebrasAPI(system_prompt, user_prompt);
    const jsonStr = responseText.match(/```json\n([\s\S]*?)\n```/)?.[1] || responseText;
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error analyzing proposal metrics:", error);
    return defaultMetrics;
  }
}

export async function getAiReview(pdfFile, problemStatement, reviewerMode = false) {
  try {
    const proposalText = await extractTextFromPdf(pdfFile);
    const system_prompt = `You are a balanced GSoC proposal evaluator. Provide constructive, honest, and solution-oriented feedback.`;
    const user_prompt = `Problem Statement: "${problemStatement}". Proposal Text: "${proposalText}".\n\nProvide a detailed, constructive review of this proposal. Evaluate how well it addresses the problem statement, its technical feasibility, and the clarity of its timeline. Provide actionable suggestions for improvement and an estimated score out of 100.`;
    
    return await callCerebrasAPI(system_prompt, user_prompt);
  } catch (error) {
    console.error("Error generating AI review:", error);
    return "Failed to generate review. Please check the console for errors.";
  }
}

export async function extractProjectTimeline(pdfFile) {
  const noTimelineResult = { "No Timeline": "The proposal does not contain a clear timeline." };
  try {
    const proposalText = await extractTextFromPdf(pdfFile);
    const system_prompt = `You are a GSoC timeline analyzer. Your goal is to find an explicitly mentioned project schedule. Return ONLY a valid JSON object.`;
    const user_prompt = `Proposal Text: "${proposalText}".\n\nFrom the proposal, extract the project timeline. Format it as a JSON object with keys as milestone dates/weeks and values as task descriptions. If no explicit timeline exists, return this exact JSON: {"No Timeline": "The proposal does not contain a clear timeline or schedule."}`;
    
    const responseText = await callCerebrasAPI(system_prompt, user_prompt);
    const jsonStr = responseText.match(/```json\n([\s\S]*?)\n```/)?.[1] || responseText;
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error extracting timeline:", error);
    return noTimelineResult;
  }
}