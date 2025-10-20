import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  CheckCircle, 
  Play, 
  Pause, 
  RefreshCcw, 
  Download,
  PieChart
} from 'lucide-react';

export default function MonitorLiveResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'

  useEffect(() => {
    // Simulate fetching election data
    setTimeout(() => {
      setElection({
        id: id,
        name: `Presidential Election 2025 - Nigeria (ID: ${id})`,
        type: 'Presidential',
        status: 'active',
        totalVotes: 2500000,
        candidates: [
          { id: 1, name: 'John Doe', party: 'Unity Party', votes: 1230000, percentage: 49.2 },
          { id: 2, name: 'Jane Smith', party: 'Freedom Alliance', votes: 1000000, percentage: 40.0 },
          { id: 3, name: 'Peter Jones', party: 'Green Movement', votes: 270000, percentage: 10.8 },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleRefreshResults = () => {
    setLoading(true);
    // Simulate refreshing data
    setTimeout(() => {
      setElection(prevElection => ({
        ...prevElection,
        totalVotes: prevElection.totalVotes + Math.floor(Math.random() * 10000), // Simulate new votes
        candidates: prevElection.candidates.map(c => ({
          ...c,
          votes: c.votes + Math.floor(Math.random() * 5000), // Simulate new votes per candidate
        })).sort((a, b) => b.votes - a.votes) // Sort by votes
      }));
      setLoading(false);
    }, 500);
  };

  const handleEndElection = () => {
    if (confirm(`Are you sure you want to end the ${election.name}? This will finalize the results.`)) {
      setElection(prevElection => ({ ...prevElection, status: 'completed' }));
      alert('Election ended successfully!');
    }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-100';
      case 'completed': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <BarChart2 className="h-4 w-4" />;
    }
  };

  // Calculate percentages based on current total votes
  const totalCurrentVotes = election.candidates.reduce((sum, c) => sum + c.votes, 0);
  const candidatesWithPercentages = election.candidates.map(c => ({
    ...c,
    percentage: totalCurrentVotes > 0 ? ((c.votes / totalCurrentVotes) * 100).toFixed(2) : 0
  }));

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
                Live Results: {election.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(election.status)}`}>
                {getStatusIcon(election.status)}
                <span className="ml-1 capitalize">{election.status}</span>
              </span>
              <button
                onClick={handleRefreshResults}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh Results
              </button>
              {election.status === 'active' && (
                <button
                  onClick={handleEndElection}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  End Election
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Votes Cast</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCurrentVotes.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Number of Candidates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{election.candidates.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Candidate Results</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'bar' ? 'bg-[#004040] text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'pie' ? 'bg-[#004040] text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                Pie Chart
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Vote Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {candidatesWithPercentages.map((candidate) => (
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
                      <div className="text-sm text-gray-900 dark:text-white">{candidate.percentage}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vote Distribution</h2>
          {/* Placeholder for chart - In a real app, you'd use a charting library like Chart.js or Recharts */}
          <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-400">
            {chartType === 'bar' ? (
              <div className="w-full h-full flex items-end justify-around p-4">
                {candidatesWithPercentages.map((candidate, index) => (
                  <div key={candidate.id} className="flex flex-col items-center mx-2">
                    <div 
                      className="w-8 rounded-t-md" 
                      style={{ 
                        height: `${candidate.percentage * 2}px`, 
                        backgroundColor: `hsl(${index * 100}, 70%, 50%)` 
                      }}
                    ></div>
                    <span className="mt-2 text-xs text-gray-700 dark:text-gray-300">{candidate.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-center">
                Pie Chart Placeholder
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
