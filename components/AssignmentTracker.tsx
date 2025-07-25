
import React, { useState, useEffect, useCallback } from 'react';
import { Assignment } from '../types';
import { ASSIGNMENT_LOCAL_STORAGE_KEY } from '../constants.ts';
import { Icons } from '../uiConstants.tsx';
import AssignmentItem from './AssignmentItem';

const AssignmentTracker: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  useEffect(() => {
    const storedAssignments = localStorage.getItem(ASSIGNMENT_LOCAL_STORAGE_KEY);
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, []);

  const saveAssignments = useCallback((updatedAssignments: Assignment[]) => {
    localStorage.setItem(ASSIGNMENT_LOCAL_STORAGE_KEY, JSON.stringify(updatedAssignments));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.course || !newAssignment.dueDate) {
      alert("Please fill in title, course, and due date.");
      return;
    }
    const assignmentToAdd: Assignment = {
      ...newAssignment,
      id: Date.now().toString(),
      completed: false,
    };
    const updatedAssignments = [...assignments, assignmentToAdd];
    setAssignments(updatedAssignments);
    saveAssignments(updatedAssignments);
    setNewAssignment({ title: '', course: '', dueDate: '', description: '' });
    setShowForm(false);
  };

  const toggleComplete = (id: string) => {
    const updatedAssignments = assignments.map(assign =>
      assign.id === id ? { ...assign, completed: !assign.completed } : assign
    );
    setAssignments(updatedAssignments);
    saveAssignments(updatedAssignments);
  };

  const deleteAssignment = (id: string) => {
    const updatedAssignments = assignments.filter(assign => assign.id !== id);
    setAssignments(updatedAssignments);
    saveAssignments(updatedAssignments);
  };
  
  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'pending') return !assignment.completed;
    if (filter === 'completed') return assignment.completed;
    return true;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const pendingAssignments = assignments.filter(a => !a.completed);
  const completedAssignments = assignments.filter(a => a.completed);


  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">My Assignments</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150"
        >
          {Icons.Plus}
          <span>{showForm ? 'Cancel' : 'Add Assignment'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddAssignment} className="bg-white p-6 rounded-lg shadow-lg space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-slate-700">New Assignment Details</h3>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-600">Title</label>
            <input type="text" name="title" id="title" value={newAssignment.title} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-slate-600">Course</label>
            <input type="text" name="course" id="course" value={newAssignment.course} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-600">Due Date</label>
            <input type="date" name="dueDate" id="dueDate" value={newAssignment.dueDate} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-600">Description (Optional)</label>
            <textarea name="description" id="description" value={newAssignment.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          </div>
          <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150">
            {Icons.Plus}
            <span>Add Assignment</span>
          </button>
        </form>
      )}

      <div className="my-6">
        <div className="flex space-x-2 border-b border-slate-300 mb-4">
          {(['pending', 'completed', 'all'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f} ({f === 'pending' ? pendingAssignments.length : f === 'completed' ? completedAssignments.length : assignments.length})
            </button>
          ))}
        </div>
        {filteredAssignments.length > 0 ? (
          <ul className="space-y-4">
            {filteredAssignments.map(assign => (
              <AssignmentItem
                key={assign.id}
                assignment={assign}
                onToggleComplete={toggleComplete}
                onDelete={deleteAssignment}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-slate-400 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.715-.026 1.068 0 1.13.094 1.976 1.057 1.976 2.192V7.5m0 0h3.75m-3.75 0h-3.75M11.25 15.158V12.75h1.5v2.408M11.25 15.158a.375.375 0 0 1-.375.375h-1.5a.375.375 0 0 1-.375-.375V15.158m0 0v-2.408h3.75v2.408m0 0a.375.375 0 0 0 .375.375h1.5a.375.375 0 0 0 .375-.375V15.158m0 0h-3.75M12 3.375c-3.142 0-5.995 1.96-7.065 4.687A3.375 3.375 0 0 0 1.5 11.25c0 1.518.998 2.825 2.378 3.208V16.5A2.25 2.25 0 0 0 6 18.75h12A2.25 2.25 0 0 0 20.25 16.5v-2.042c1.38-.383 2.378-1.69 2.378-3.208a3.375 3.375 0 0 0-3.435-3.187C17.995 5.337 15.142 3.375 12 3.375Z" />
            </svg>
            <p className="text-slate-500">
              No {filter !== 'all' ? filter : ''} assignments here. {filter === 'pending' ? 'Time to relax or add some new ones!' : 'Great job clearing your list!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentTracker;
