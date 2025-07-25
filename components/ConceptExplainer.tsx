
import React, { useState, useCallback } from 'react';
import { explainConcept } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { GEMINI_API_KEY_ERROR_MESSAGE } from '../constants.ts';
import { Icons } from '../uiConstants.tsx';

const ConceptExplainer: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplainConcept = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!concept.trim()) {
      setError("Please enter a concept to explain.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setExplanation(''); 

    try {
      const result = await explainConcept(concept);
      setExplanation(result);
    } catch (err: any) {
        if (err.message === GEMINI_API_KEY_ERROR_MESSAGE) {
            setError(GEMINI_API_KEY_ERROR_MESSAGE);
        } else {
            setError("Whoops! Couldn't explain that. The AI might be stumped, or there's a connection hiccup. Try again?");
        }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [concept]);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Concept Clarifier AI</h2>
        <p className="text-slate-600">Stuck on a tricky topic? Let your AI peer tutor break it down for you!</p>
      </div>

      <form onSubmit={handleExplainConcept} className="bg-white p-6 rounded-xl shadow-xl space-y-4">
        <div>
          <label htmlFor="concept" className="block text-sm font-medium text-slate-700 mb-1">
            What concept do you want to understand better?
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="concept"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g., Photosynthesis, Quantum Entanglement, The Federal Reserve"
              className="flex-grow mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !concept.trim()}
              className="mt-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : Icons.Send}
              <span className="hidden sm:inline">{isLoading ? 'Explaining...' : 'Explain'}</span>
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && !explanation && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <LoadingSpinner text="AI is thinking hard..." color="text-blue-600" />
          <p className="mt-2 text-slate-500 text-sm">Brewing up a simple explanation for "{concept}"...</p>
        </div>
      )}

      {explanation && !isLoading && (
        <div className="bg-white p-6 rounded-xl shadow-lg prose prose-slate max-w-none prose-p:my-3 prose-headings:my-4 prose-headings:text-blue-700">
          <h3 className="text-2xl font-semibold text-blue-700 border-b pb-2 mb-4">Here's the lowdown on "{concept}":</h3>
          {explanation.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed text-left">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConceptExplainer;
