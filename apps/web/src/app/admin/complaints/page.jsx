'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  Clock,
  Hourglass,
  User,
  Calendar,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export default function AdminComplaintsPage() {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [escalatedComplaints, setEscalatedComplaints] = useState({}); // { complaintId: true/false }
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 10;

  useEffect(() => {
    // Simulate loading complaints
    setTimeout(() => {
      setComplaints([
        {
          id: 1,
          citizenName: 'Adebayo Johnson',
          citizenEmail: 'adebayo.j@email.com',
          subject: 'Issue with ID card delivery',
          submissionDate: '2024-01-20',
          status: 'pending',
          description: 'My new ID card has not been delivered yet, it\'s been 3 weeks since approval.',
        },
        {
          id: 2,
          citizenName: 'Kemi Okafor',
          citizenEmail: 'kemi.okafor@email.com',
          subject: 'Problem with voting portal',
          submissionDate: '2024-02-10',
          status: 'in_review',
          description: 'I was unable to cast my vote during the last election, the portal kept showing an error.',
        },
        {
          id: 3,
          citizenName: 'Uche Okoro',
          citizenEmail: 'uche.okoro@email.com',
          subject: 'Incorrect information on digital ID',
          submissionDate: '2024-01-25',
          status: 'resolved',
          description: 'My date of birth is incorrect on my digital ID. I submitted an update application but it\'s not reflected.',
        },
        {
          id: 4,
          citizenName: 'Fatima Hassan',
          citizenEmail: 'fatima.hassan@email.com',
          subject: 'Harassment by official',
          submissionDate: '2024-02-01',
          status: 'pending',
          description: 'An official at the local registration office was rude and unhelpful.',
        },
        {
          id: 5,
          citizenName: 'Ibrahim Musa',
          citizenEmail: 'ibrahim.musa@email.com',
          subject: 'Lost ID card replacement delay',
          submissionDate: '2024-02-15',
          status: 'in_review',
          description: 'My lost ID card replacement application is taking too long. I need it urgently.',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'in_review': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Hourglass className="h-4 w-4" />;
      case 'in_review': return <Clock className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
  const startIndex = (currentPage - 1) * complaintsPerPage;
  const paginatedComplaints = filteredComplaints.slice(startIndex, startIndex + complaintsPerPage);

  const handleComplaintAction = (complaintId, action) => {
    switch (action) {
      case 'view':
        alert(`Viewing complaint ${complaintId}`);
        break;
      case 'mark_in_review':
        if (confirm('Mark this complaint as "In Review"?')) {
          setComplaints(complaints.map(c => 
            c.id === complaintId ? { ...c, status: 'in_review' } : c
          ));
        }
        break;
      case 'mark_resolved':
        if (confirm('Mark this complaint as "Resolved"?')) {
          setComplaints(complaints.map(c => 
            c.id === complaintId ? { ...c, status: 'resolved' } : c
          ));
        }
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
          setComplaints(complaints.filter(c => c.id !== complaintId));
        }
        break;
      case 'escalate':
        if (confirm(`Are you sure you want to escalate complaint ${complaintId} to another department?`)) {
          setEscalatedComplaints(prev => ({ ...prev, [complaintId]: true }));
          alert(`Complaint ${complaintId} has been escalated.`);
        }
        break;
      case 'auto_resolve_duplicate':
        if (confirm(`Are you sure you want to auto-resolve duplicate for complaint ${complaintId}?`)) {
          setComplaints(complaints.filter(c => c.id !== complaintId)); // Simulate removing the duplicate
          alert(`Complaint ${complaintId} has been auto-resolved as a duplicate.`);
        }
        break;
    }
  };

  const exportComplaints = () => {
    alert('Export functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004040]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ←
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Complaint Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={exportComplaints}
                className="bg-[#004040] hover:bg-[#003030] text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Hourglass className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {complaints.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {complaints.filter(c => c.status === 'in_review').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {complaints.filter(c => c.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by citizen name, subject, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#004040] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complainant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-[#004040] flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{complaint.citizenName}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {complaint.citizenEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{complaint.subject}</div>
                      <div className="text-xs text-gray-500 truncate w-64">{complaint.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                        {complaint.submissionDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1 capitalize">{complaint.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleComplaintAction(complaint.id, 'view')}
                          className="text-[#004040] hover:text-[#003030]"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {complaint.status === 'pending' && (
                          <button
                            onClick={() => handleComplaintAction(complaint.id, 'mark_in_review')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Mark In Review"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                        )}
                        {(complaint.status === 'pending' || complaint.status === 'in_review') && (
                          <button
                            onClick={() => handleComplaintAction(complaint.id, 'mark_resolved')}
                            className="text-green-600 hover:text-green-900"
                            title="Mark Resolved"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleComplaintAction(complaint.id, 'delete')}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Complaint"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleComplaintAction(complaint.id, 'escalate')}
                          className={`hover:text-purple-900 ${escalatedComplaints[complaint.id] ? 'text-purple-400 cursor-not-allowed' : 'text-purple-600'}`}
                          title={escalatedComplaints[complaint.id] ? 'Complaint Escalated' : 'Escalate Complaint'}
                          disabled={escalatedComplaints[complaint.id]}
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleComplaintAction(complaint.id, 'auto_resolve_duplicate')}
                          className="text-orange-600 hover:text-orange-900"
                          title="Auto-resolve Duplicate"
                        >
                          <Trash2 className="h-4 w-4" /> {/* Using Trash2 for auto-resolve, can be changed */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(startIndex + complaintsPerPage, filteredComplaints.length)}</span> of{' '}
                    <span className="font-medium">{filteredComplaints.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-[#004040] border-[#004040] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
