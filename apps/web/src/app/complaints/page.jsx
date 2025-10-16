'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Download, 
  Search,
  ArrowLeft,
  MapPin,
  User,
  Hash,
  MoreVertical,
  Star
} from 'lucide-react';

export default function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [complaints] = useState([
    {
      id: 'CMP001',
      complaintId: 'CMP-2024-001',
      title: 'Poor Road Conditions',
      description: 'The road from Ikeja to Victoria Island has multiple potholes causing traffic and vehicle damage.',
      category: 'infrastructure',
      status: 'pending',
      priority: 'high',
      location: 'Ikeja - Victoria Island Road, Lagos',
      submittedBy: 'Adebayo Johnson',
      email: 'adebayo.johnson@email.com',
      phone: '+234 803 456 7890',
      createdAt: '2024-09-15T10:30:00Z',
      updatedAt: '2024-09-15T10:30:00Z',
      attachments: ['road_photo1.jpg', 'road_photo2.jpg'],
      isPublic: true,
      votes: 245
    },
    {
      id: 'CMP002',
      complaintId: 'CMP-2024-002',
      title: 'Hospital Staff Misconduct',
      description: 'Unprofessional behavior and delayed treatment at the general hospital emergency unit.',
      category: 'healthcare',
      status: 'in_progress',
      priority: 'high',
      location: 'Lagos University Teaching Hospital',
      submittedBy: 'Fatima Mohammed',
      email: 'fatima.mohammed@email.com',
      phone: '+234 901 234 5678',
      createdAt: '2024-09-14T14:20:00Z',
      updatedAt: '2024-09-16T09:15:00Z',
      attachments: ['incident_report.pdf'],
      response: 'Investigation initiated. Hospital administration has been notified.',
      isPublic: false,
      votes: 0
    },
    {
      id: 'CMP003',
      complaintId: 'CMP-2024-003',
      title: 'Water Supply Issues',
      description: 'No water supply for over 2 weeks in the entire estate despite payment of bills.',
      category: 'utilities',
      status: 'resolved',
      priority: 'medium',
      location: 'Lekki Phase 1, Lagos',
      submittedBy: 'Chioma Okafor',
      email: 'chioma.okafor@email.com',
      phone: '+234 802 345 6789',
      createdAt: '2024-09-10T08:45:00Z',
      updatedAt: '2024-09-18T16:30:00Z',
      attachments: ['water_bill.pdf'],
      response: 'Water supply has been restored. Pipe repairs completed.',
      resolution: 'Water supply restored after pipe replacement. Compensation provided for inconvenience.',
      isPublic: true,
      votes: 156
    }
  ]);

  const [stats] = useState({
    total: 287,
    pending: 89,
    inProgress: 134,
    resolved: 64,
    infrastructure: 98,
    healthcare: 67,
    education: 45,
    utilities: 77
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'in_progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'infrastructure': return 'bg-red-100 text-red-800';
      case 'healthcare': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'utilities': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-orange-100 text-orange-800';
      case 'environment': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusUpdate = (complaintId, newStatus) => {
    alert(`Status for complaint ${complaintId} would be updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Report Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => alert('Export complaints')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Complaints</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="utilities">Utilities</option>
                <option value="security">Security</option>
                <option value="environment">Environment</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </div>
          </div>
        </div>

        {/* Public Report Feed */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Public Report Feed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.filter(c => c.isPublic).map(publicComplaint => (
              <div key={publicComplaint.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{publicComplaint.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(publicComplaint.category)}`}>
                    {publicComplaint.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{publicComplaint.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{publicComplaint.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(publicComplaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{publicComplaint.votes} votes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Report ID & Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Submitter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <Hash className="h-4 w-4 text-gray-400 mr-1" />
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {complaint.complaintId}
                          </div>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                          {complaint.isPublic && (
                            <div className="ml-2 flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-gray-500">{complaint.votes}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {complaint.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {complaint.submittedBy}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {complaint.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(complaint.category)}`}>
                        {complaint.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <div className="max-w-xs truncate">
                          {complaint.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedComplaint(complaint)}
                          className="text-[#004040] hover:text-[#003030] dark:text-[#ECBE07] dark:hover:text-[#D4AA06]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaint Detail Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Complaint Details - {selectedComplaint.complaintId}
                </h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                      value={selectedComplaint.status}
                      onChange={(e) => handleStatusUpdate(selectedComplaint.id, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedComplaint.category)}`}>
                      {selectedComplaint.category}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">{selectedComplaint.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedComplaint.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Submitter</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedComplaint.submittedBy}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedComplaint.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedComplaint.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedComplaint.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Public</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedComplaint.isPublic ? 'Yes' : 'No'}
                    </p>
                  </div>
                  {selectedComplaint.isPublic && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Votes</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedComplaint.votes}</p>
                    </div>
                  )}
                </div>

                {selectedComplaint.response && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Response</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedComplaint.response}</p>
                  </div>
                )}

                {selectedComplaint.resolution && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resolution</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedComplaint.resolution}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Response</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your response to this complaint..."
                    defaultValue={selectedComplaint.response || ''}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Created:</span> {new Date(selectedComplaint.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span> {new Date(selectedComplaint.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Complaint would be updated')}
                  className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] dark:bg-[#ECBE07] dark:text-black dark:hover:bg-[#D4AA06]"
                >
                  Update Complaint
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
