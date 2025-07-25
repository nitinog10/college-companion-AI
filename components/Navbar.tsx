
import React from 'react';
import { AppView, NavItem } from '../types';
import { NAVIGATION_ITEMS } from '../uiConstants.tsx';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            <span className="text-2xl font-bold tracking-tight">College Companion AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.name)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out
                            ${currentView === item.name 
                              ? 'bg-blue-800 text-white shadow-md' 
                              : 'hover:bg-blue-600 hover:text-blue-100'
                            }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
          <div className="md:hidden">
            {/* Basic Mobile Menu - For a real app, use a dropdown */}
            <select 
              onChange={(e) => onNavigate(e.target.value as AppView)} 
              value={currentView}
              className="bg-blue-600 text-white p-2 rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {NAVIGATION_ITEMS.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
