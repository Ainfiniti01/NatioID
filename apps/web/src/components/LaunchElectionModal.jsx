import React from 'react';
import { Play, X } from 'lucide-react';

export default function LaunchElectionModal({ isOpen, onClose, election, onConfirm }) {
  if (!isOpen || !election) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Confirm Launch Election</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-4">
            You’re about to launch the <span className="font-bold">{election.name}</span>.
            It will become visible to citizens immediately.
          </p>
          <p className="mb-2">
            <span className="font-medium">Dates:</span> {election.startDate} - {election.endDate}
          </p>
          <p className="mb-4">
            <span className="font-medium">Candidates:</span> {election.candidatesCount}
          </p>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] flex items-center"
          >
            <Play className="h-4 w-4 mr-2" />
            Launch Now
          </button>
        </div>
      </div>
    </div>
  );
}
