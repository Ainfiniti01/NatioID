import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Briefcase, MessageSquare, Globe, Save, Trash2, Eye } from 'lucide-react';

export default function CandidateDetailsPage() {
  const { votingId, candidateId } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    profilePhoto: '',
    campaignTitle: '',
    campaignMessage: '',
    about: '',
    contactInfo: '',
    website: '',
  });

  useEffect(() => {
    // Simulate fetching candidate data
    setTimeout(() => {
      const fetchedCandidate = {
        id: candidateId,
        name: 'John Doe',
        party: 'Unity Party',
        profilePhoto: 'https://via.placeholder.com/150',
        campaignTitle: 'A Better Tomorrow for All',
        campaignMessage: 'My vision is to create a society where everyone has equal opportunities...',
        about: 'John Doe is a seasoned politician with over 20 years of experience...',
        contactInfo: 'john.doe@example.com',
        website: 'www.johndoe.com',
      };
      setCandidate(fetchedCandidate);
      setFormData(fetchedCandidate);
      setLoading(false);
    }, 1000);
  }, [votingId, candidateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate saving changes
    console.log('Saving candidate data:', formData);
    alert('Candidate details saved successfully!');
    // Optionally navigate back or show a success message
    navigate(`/admin/voting/${votingId}/candidates`);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${candidate.name}? This action cannot be undone.`)) {
      // Simulate deleting candidate
      alert('Candidate deleted successfully!');
      navigate(`/admin/voting/${votingId}/candidates`);
    }
  };

  const handlePreviewCampaign = () => {
    alert('Previewing campaign (would open citizen-side view)');
    // In a real app, this would navigate to the public campaign page or open a preview modal
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004040]"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">
        Candidate not found.
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
                onClick={() => navigate(-1)}
                className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ←
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                Candidate: {candidate.name}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={handlePreviewCampaign}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 text-sm rounded-lg flex items-center flex-shrink-0"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button
                onClick={handleSave}
                className="bg-[#004040] hover:bg-[#003030] text-white px-3 py-2 text-sm rounded-lg flex items-center flex-shrink-0"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm rounded-lg flex items-center flex-shrink-0"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
          {/* Candidate Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Candidate Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Candidate Name
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
                <label htmlFor="party" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Party
                </label>
                <input
                  type="text"
                  name="party"
                  id="party"
                  value={formData.party}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  name="profilePhoto"
                  id="profilePhoto"
                  value={formData.profilePhoto}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.profilePhoto && (
                  <img src={formData.profilePhoto} alt="Profile" className="mt-2 h-24 w-24 object-cover rounded-full" />
                )}
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Campaign Title
                </label>
                <input
                  type="text"
                  name="campaignTitle"
                  id="campaignTitle"
                  value={formData.campaignTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="campaignMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Campaign Message / Manifesto
                </label>
                <textarea
                  name="campaignMessage"
                  id="campaignMessage"
                  rows="5"
                  value={formData.campaignMessage}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  About Section (Bio, Education, Vision)
                </label>
                <textarea
                  name="about"
                  id="about"
                  rows="5"
                  value={formData.about}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Optional Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information (Optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Email/Phone
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Website URL
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
