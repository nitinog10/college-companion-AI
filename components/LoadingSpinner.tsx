
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g., 'text-blue-500'
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'text-blue-600', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-solid border-t-transparent ${color}`}
      ></div>
      {text && <p className={`text-sm ${color}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
