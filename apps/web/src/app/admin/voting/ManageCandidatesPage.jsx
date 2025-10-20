import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPlus, Edit, Trash2, Eye, Search, Users } from 'lucide-react';
import DeleteElectionModal from '../../../components/DeleteElectionModal'; // Reusing for candidate deletion

export default function ManageCandidatesPage() {
  const { id } = useParams(); // Election ID
  const navigate = useNavigate();
  const [electionName, setElectionName] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidateForDelete, setSelectedCandidateForDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching election and candidates data
    setTimeout(() => {
      setElectionName(`Presidential Election 2025 - Nigeria (ID: ${id})`);
      setCandidates([
        { id: 1, name: 'John Doe', party: 'Unity Party', votes: 1230000, campaign: 'A better tomorrow for all.' },
        { id: 2, name: 'Jane Smith', party: 'Freedom Alliance', votes: 1000000, campaign: 'Empowering the people.' },
        { id: 3, name: 'Peter Jones', party: 'Green Movement', votes: 270000, campaign: 'Sustainable future.' },
      ]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.party.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCandidate = () => {
    navigate(`/admin/voting/${id}/candidates/new`); // Assuming a 'new' route for adding candidates
  };

  const handleEditCandidate = (candidateId) => {
    navigate(`/admin/voting/${id}/candidates/${candidateId}/edit`);
  };

  const handleDeleteCandidate = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    setSelectedCandidateForDelete(candidate);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteCandidate = () => {
    setCandidates(candidates.filter(c => c.id !== selectedCandidateForDelete.id));
    setIsDeleteModalOpen(false);
    setSelectedCandidateForDelete(null);
    alert(`Candidate "${selectedCandidateForDelete.name}" deleted successfully!`);
  };

  const handleViewCampaign = (candidateId) => {
    alert(`Viewing campaign for candidate ID: ${candidateId}`);
    // In a real app, this would open a modal or navigate to a campaign view page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004040]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ←
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Manage Candidates: {electionName}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddCandidate}
                className="bg-[#004040] hover:bg-[#003030] text-white px-4 py-2 rounded-lg flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Candidate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{candidates.length}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates by name or party..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Candidate Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Votes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{candidate.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{candidate.party}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{candidate.votes.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewCampaign(candidate.id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                        title="View Campaign"
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditCandidate(candidate.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Candidate"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCandidate(candidate.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Candidate"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteElectionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        itemType="Candidate"
        itemName={selectedCandidateForDelete?.name}
        onConfirm={handleConfirmDeleteCandidate}
      />
    </div>
  );
}
