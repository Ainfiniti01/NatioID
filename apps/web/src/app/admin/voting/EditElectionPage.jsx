import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, XCircle, Calendar, List, Info } from 'lucide-react';

export default function EditElectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    status: '',
    description: '',
  });

  useEffect(() => {
    // Simulate fetching election data
    setTimeout(() => {
      const fetchedElection = {
        id: id,
        name: `Presidential Election 2025 - Nigeria (ID: ${id})`,
        type: 'Presidential',
        startDate: '2025-03-10',
        endDate: '2025-03-12',
        status: 'scheduled',
        candidatesCount: 5,
        description: 'This is the general election for the President of Nigeria.',
      };
      setElection(fetchedElection);
      setFormData({
        name: fetchedElection.name,
        type: fetchedElection.type,
        startDate: fetchedElection.startDate,
        endDate: fetchedElection.endDate,
        status: fetchedElection.status,
        description: fetchedElection.description,
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate saving changes
    console.log('Saving election data:', formData);
    alert('Election details saved successfully!');
    navigate(-1); // Go back to the previous page
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page without saving
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004040]"></div>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">
        Election not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              <button 
                onClick={handleCancel}
                className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ←
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                Edit: {election.name}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={handleSave}
                className="bg-[#004040] hover:bg-[#003030] text-white px-3 py-2 text-sm rounded-lg flex items-center flex-shrink-0"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 text-sm rounded-lg flex items-center flex-shrink-0"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
          {/* Election Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Election Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Election Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Election Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Presidential">Presidential</option>
                  <option value="Governorship">Governorship</option>
                  <option value="Local">Local Council</option>
                  <option value="Senatorial">Senatorial</option>
                  <option value="Youth Council">Youth Council</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="completed">Ended</option>
                </select>
              </div>
              <div>
                <label htmlFor="candidatesCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Candidate Count
                </label>
                <input
                  type="number"
                  name="candidatesCount"
                  id="candidatesCount"
                  value={election.candidatesCount} // Readonly
                  readOnly
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description or Notes (Optional)
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
