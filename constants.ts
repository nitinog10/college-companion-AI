
import { StudyTip } from './types';

export const PREDEFINED_STUDY_TIPS: StudyTip[] = [
  { id: '1', text: "Create a dedicated study space. Keep it organized and free from distractions." },
  { id: '2', text: "Use the Pomodoro Technique: study for 25 minutes, then take a 5-minute break." },
  { id: '3', text: "Test yourself regularly. Flashcards and practice quizzes are great tools." },
  { id: '4', text: "Teach what you've learned to someone else. It helps solidify your understanding." },
  { id: '5', text: "Don't cram! Spaced repetition is more effective for long-term memory." },
  { id: '6', text: "Stay hydrated and get enough sleep. Your brain needs it to function optimally." },
  { id: '7', text: "Break down large tasks into smaller, manageable chunks." },
  { id: '8', text: "Find a study group or partner. Explaining concepts to others can clarify your own understanding." },
  { id: '9', text: "Minimize distractions: turn off notifications on your phone and computer while studying." },
  { id: '10', text: "Take regular breaks to avoid burnout. A short walk or stretching can help." }
];

export const ASSIGNMENT_LOCAL_STORAGE_KEY = 'collegeCompanionAssignments';

export const GEMINI_API_KEY_ERROR_MESSAGE = "Gemini API key is not configured. Please ensure the API_KEY environment variable is set.";
export const GEMINI_GENERAL_ERROR_MESSAGE = "Oops! Something went wrong while talking to the AI. Please try again.";

export const AI_SYSTEM_PROMPT_EXPLAINER = "You are a friendly and knowledgeable college peer. Explain concepts in a casual, easy-to-understand way, like you're tutoring a friend. Use simple language, analogies, and break things down if complex. Keep the tone encouraging and supportive. Avoid using markdown formatting in your response, just provide plain text.";
export const AI_USER_PROMPT_STUDY_TIP = "Give me a unique and effective study tip. Keep it concise, actionable, and suitable for a college student. Avoid markdown.";

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';
