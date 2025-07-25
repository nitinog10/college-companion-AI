
import React from 'react';
import { Assignment } from '../types';
import { Icons } from '../uiConstants.tsx';

interface AssignmentItemProps {
  assignment: Assignment;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({ assignment, onToggleComplete, onDelete }) => {
  return (
    <li className={`p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 ${assignment.completed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
      <div className="flex-grow">
        <div className="flex items-center space-x-3">
            <input
            type="checkbox"
            checked={assignment.completed}
            onChange={() => onToggleComplete(assignment.id)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <h3 className={`text-lg font-semibold ${assignment.completed ? 'line-through text-gray-500' : 'text-slate-800'}`}>
            {assignment.title}
            </h3>
        </div>
        <p className={`text-sm ${assignment.completed ? 'text-gray-400' : 'text-slate-600'}`}>
          Course: {assignment.course}
        </p>
        <p className={`text-sm ${assignment.completed ? 'text-gray-400' : 'text-slate-600'}`}>
          Due: {assignment.dueDate}
        </p>
        {assignment.description && (
          <p className={`mt-1 text-xs italic ${assignment.completed ? 'text-gray-400' : 'text-slate-500'}`}>
            {assignment.description}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0 pt-2 sm:pt-0">
        <button
          onClick={() => onDelete(assignment.id)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-150"
          aria-label="Delete assignment"
        >
          {Icons.Trash}
        </button>
      </div>
    </li>
  );
};

export default AssignmentItem;
