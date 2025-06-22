
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssignmentTracker from './components/AssignmentTracker';
import StudyTips from './components/StudyTips';
import ConceptExplainer from './components/ConceptExplainer';
import { AppView } from './types';
import { GEMINI_API_KEY_ERROR_MESSAGE } from './constants.ts';


// Helper to check for API key once, can be expanded for other startup checks
const ApiKeyChecker: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  React.useEffect(() => {
    // Check if process.env or process.env.API_KEY is undefined
    if (typeof process === 'undefined' || typeof process.env === 'undefined' || !process.env.API_KEY) {
      console.error(GEMINI_API_KEY_ERROR_MESSAGE);
      setApiKeyMissing(true);
    }
  }, []);

  if (apiKeyMissing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>
          <h1 className="text-2xl font-bold text-red-700 mb-2">Configuration Error</h1>
          <p className="text-red-600">{GEMINI_API_KEY_ERROR_MESSAGE}</p>
          <p className="mt-4 text-sm text-slate-500">
            This application requires a Gemini API key to function correctly. Please ensure the <code>API_KEY</code> environment variable is set up in your deployment environment.
            For local development, you might need to set this in your <code>index.html</code> or via your bundler's .env file mechanism.
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};


const App: React.FC = () => {
  // CurrentView state is managed by the URL through HashRouter now
  // Kept a placeholder for onNavigate if needed for other non-route actions
  const [currentView, setCurrentView] = useState<AppView>(AppView.Assignments);

  // This callback is now less critical for primary navigation with HashRouter,
  // but can be used if Navbar needs to trigger other state changes.
  // For HashRouter, navigation is primarily done via <Link> or navigate().
  // Here, Navbar buttons will change the hash.
  const handleNavigate = useCallback((view: AppView) => {
    setCurrentView(view); // Update local state if needed for Navbar styling
    // Navigation will be handled by <Link> or by changing window.location.hash
    let path = '/';
    if (view === AppView.StudyTips) path = '/study-tips';
    else if (view === AppView.ConceptExplainer) path = '/concept-explainer';
    window.location.hash = path;
  }, []);


  return (
    <ApiKeyChecker>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-100">
          <Navbar currentView={currentView} onNavigate={handleNavigate} />
          <main className="flex-grow container mx-auto py-4 md:py-8 px-2 md:px-4">
            <Routes>
              <Route path="/" element={<AssignmentTracker />} />
              <Route path="/study-tips" element={<StudyTips />} />
              <Route path="/concept-explainer" element={<ConceptExplainer />} />
              <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
            </Routes>
          </main>
          <footer className="text-center py-4 bg-slate-200 text-slate-600 text-sm border-t border-slate-300">
            <p>&copy; {new Date().getFullYear()} College Companion AI. Your friendly study buddy!</p>
            <p>Powered by Gemini & React.</p>
          </footer>
        </div>
      </HashRouter>
    </ApiKeyChecker>
  );
};

export default App;
