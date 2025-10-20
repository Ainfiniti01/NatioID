'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, Calendar, Users, Save, XCircle, Play } from 'lucide-react';

export default function LaunchNewElectionPage() {
  const navigate = useNavigate();

  const [electionName, setElectionName] = useState('');
  const [electionType, setElectionType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [expectedCandidates, setExpectedCandidates] = useState('');
  const [status, setStatus] = useState('Scheduled'); // Default status

  const handleLaunchNow = () => {
    if (!electionName || !electionType || !startDate || !endDate) {
      alert('Please fill in all required fields: Election Name, Election Type, Start Date, End Date.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert('Start Date must be earlier than End Date.');
      return;
    }
    // Simulate API call to launch election
    console.log('Launching Election:', {
      electionName,
      electionType,
      startDate,
      endDate,
      description,
      expectedCandidates,
      status: 'Active', // Becomes active upon launch
    });
    alert('Election successfully launched!');
    navigate('/admin/voting'); // Redirect to voting dashboard
  };

  const handleSaveAsDraft = () => {
    // Simulate API call to save as draft
    console.log('Saving Election as Draft:', {
      electionName,
      electionType,
      startDate,
      endDate,
      description,
      expectedCandidates,
      status: 'Draft',
    });
    alert('Election saved as draft!');
    navigate('/admin/voting'); // Redirect to voting dashboard
  };

  const handleCancel = () => {
    navigate('/admin/voting'); // Return to election dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ←
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Launch New Election</h1>
              <span className="ml-3 text-gray-500 dark:text-gray-400">/ Dashboard / Elections / Launch New</span>
            </div>
            <Flag className="h-6 w-6 text-[#004040]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Election Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Election Name */}
            <div>
              <label htmlFor="electionName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Election Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="electionName"
                value={electionName}
                onChange={(e) => setElectionName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Presidential Election 2026"
                required
              />
            </div>

            {/* Election Type */}
            <div>
              <label htmlFor="electionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Election Type <span className="text-red-500">*</span>
              </label>
              <select
                id="electionType"
                value={electionType}
                onChange={(e) => setElectionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Type</option>
                <option value="Presidential">Presidential</option>
                <option value="Governorship">Governorship</option>
                <option value="Local">Local</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            {/* Description / Notes */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description / Notes (Optional)
              </label>
              <textarea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add any additional remarks about the election"
              ></textarea>
            </div>
          </div>

          {/* Candidate Setup */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Candidate Setup (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="expectedCandidates" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expected Number of Candidates
              </label>
              <input
                type="number"
                id="expectedCandidates"
                value={expectedCandidates}
                onChange={(e) => setExpectedCandidates(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., 5"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-blue-700 bg-blue-100 dark:text-blue-200 dark:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                {status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSaveAsDraft}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </button>
            <button
              onClick={handleLaunchNow}
              className="flex items-center px-4 py-2 bg-[#004040] hover:bg-[#003030] text-white rounded-lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Launch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
