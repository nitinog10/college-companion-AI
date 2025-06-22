
export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  description: string;
  completed: boolean;
}

export interface StudyTip {
  id: string;
  text: string;
  category?: string; // Optional: e.g., "Time Management", "Note Taking"
}

export enum AppView {
  Assignments = 'Assignments',
  StudyTips = 'Study Tips',
  ConceptExplainer = 'Concept Explainer',
}

export interface NavItem {
  name: AppView;
  icon: React.ReactNode;
}

// For Gemini Search Grounding (if used, not primary for this app but good to have)
export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // Other types of chunks can be added here
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // other grounding metadata fields
}
