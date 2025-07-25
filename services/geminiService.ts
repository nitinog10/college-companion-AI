
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_PROMPT_EXPLAINER, AI_USER_PROMPT_STUDY_TIP, GEMINI_MODEL_TEXT, GEMINI_API_KEY_ERROR_MESSAGE, GEMINI_GENERAL_ERROR_MESSAGE } from '../constants.ts';

let ai: GoogleGenAI | null = null;

const initializeAi = (): GoogleGenAI | null => {
  if (ai) return ai;
  // Ensure process and process.env exist, primarily for browser environments where it might not be shimmed.
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    console.error("`process` or `process.env` is not defined. API key cannot be accessed.");
    return null;
  }
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error(GEMINI_API_KEY_ERROR_MESSAGE);
    return null; 
  }
  ai = new GoogleGenAI({ apiKey });
  return ai;
};


export const explainConcept = async (concept: string): Promise<string> => {
  const genAI = initializeAi();
  if (!genAI) {
    return Promise.reject(new Error(GEMINI_API_KEY_ERROR_MESSAGE));
  }

  try {
    const userPrompt = `Explain the concept of: ${concept}`;
    const response: GenerateContentResponse = await genAI.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: userPrompt,
      config: {
        systemInstruction: AI_SYSTEM_PROMPT_EXPLAINER,
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error explaining concept:", error);
    return Promise.reject(new Error(GEMINI_GENERAL_ERROR_MESSAGE));
  }
};

export const fetchStudyTip = async (): Promise<string> => {
  const genAI = initializeAi();
   if (!genAI) {
    return Promise.reject(new Error(GEMINI_API_KEY_ERROR_MESSAGE));
  }

  try {
    const response: GenerateContentResponse = await genAI.models.generateContent({
        model: GEMINI_MODEL_TEXT,
        contents: AI_USER_PROMPT_STUDY_TIP,
        config: {
            temperature: 0.8, 
            topP: 0.95,
            topK: 64,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching study tip:", error);
    return Promise.reject(new Error(GEMINI_GENERAL_ERROR_MESSAGE));
  }
};
