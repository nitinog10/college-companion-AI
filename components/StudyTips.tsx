
import React, { useState, useCallback } from 'react';
import { StudyTip } from '../types';
import { PREDEFINED_STUDY_TIPS, GEMINI_API_KEY_ERROR_MESSAGE } from '../constants.ts';
import { Icons } from '../uiConstants.tsx';
import { fetchStudyTip } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const StudyTips: React.FC = () => {
  const [tips, setTips] = useState<StudyTip[]>(PREDEFINED_STUDY_TIPS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNewTipFromAI = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tipText = await fetchStudyTip();
      const newTip: StudyTip = {
        id: `gemini-${Date.now()}`,
        text: tipText,
        category: "AI Generated"
      };
      setTips(prevTips => [newTip, ...prevTips]); // Add new tip to the beginning
    } catch (err: any) {
        if (err.message === GEMINI_API_KEY_ERROR_MESSAGE) {
            setError(GEMINI_API_KEY_ERROR_MESSAGE);
        } else {
            setError("Sorry, couldn't fetch a new tip. Maybe try again?");
        }
        console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Study Supercharger</h2>
        <button
          onClick={getNewTipFromAI}
          disabled={isLoading}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {Icons.Sparkles}
          <span>{isLoading ? 'Getting Tip...' : 'Get AI Study Tip!'}</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          <p className="font-semibold">Oh no! An error occurred:</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && tips.length === PREDEFINED_STUDY_TIPS.length && ( // Show spinner only if it's the initial AI fetch
          <div className="flex justify-center my-8">
            <LoadingSpinner text="Summoning wisdom..." color="text-purple-600"/>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div 
            key={tip.id} 
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                        ${tip.category === "AI Generated" 
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' 
                          : 'bg-white text-slate-700'
                        } 
                        ${isLoading && index === 0 && tip.category === "AI Generated" ? 'opacity-50' : ''}`} // Dim new AI tip while loading next
          >
            {tip.category === "AI Generated" && (
                <div className="flex items-center space-x-2 mb-2 text-sm text-purple-200">
                    {Icons.Sparkles}
                    <span>Fresh from the AI</span>
                </div>
            )}
            <p className="text-lg leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </div>
       {tips.length === 0 && !isLoading && !error && (
         <div className="text-center py-10 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-slate-400 mx-auto mb-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <p className="text-slate-500">No study tips available right now. Try fetching one!</p>
          </div>
       )}
    </div>
  );
};

export default StudyTips;
