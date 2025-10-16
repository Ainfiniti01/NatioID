'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [requestedInfoApplications, setRequestedInfoApplications] = useState({}); // { appId: true/false }
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  useEffect(() => {
    // Simulate loading applications
    setTimeout(() => {
      setApplications([
        {
          id: 1,
          citizenName: 'Adebayo Johnson',
          applicationType: 'new',
          submissionDate: '2024-01-15',
          status: 'pending',
          nin: '12345678901',
          location: 'Lagos, Country',
        },
        {
          id: 2,
          citizenName: 'Kemi Okafor',
          applicationType: 'renewal',
          submissionDate: '2024-02-08',
          status: 'approved',
          nin: '23456789012',
          location: 'Abuja, Country',
        },
        {
          id: 3,
          citizenName: 'Uche Okoro',
          applicationType: 'lost',
          submissionDate: '2024-01-20',
          status: 'rejected',
          nin: '34567890123',
          location: 'Port Harcourt, Country',
        },
        {
          id: 4,
          citizenName: 'Fatima Hassan',
          applicationType: 'update',
          submissionDate: '2024-01-10',
          status: 'pending',
          nin: '45678901234',
          location: 'Kano, Country',
        },
        {
          id: 5,
          citizenName: 'Ibrahim Musa',
          applicationType: 'new',
          submissionDate: '2024-02-01',
          status: 'approved',
          nin: '56789012345',
          location: 'Kaduna, Country',
        },
        {
          id: 6,
          citizenName: 'Chioma Eze',
          applicationType: 'renewal',
          submissionDate: '2024-02-05',
          status: 'pending',
          nin: '67890123456',
          location: 'Enugu, Country',
        },
        {
          id: 7,
          citizenName: 'Yusuf Abdullahi',
          applicationType: 'lost',
          submissionDate: '2024-01-25',
          status: 'approved',
          nin: '78901234567',
          location: 'Maiduguri, Country',
        },
        {
          id: 8,
          citizenName: 'Blessing Okonkwo',
          applicationType: 'update',
          submissionDate: '2024-01-30',
          status: 'pending',
          nin: '89012345678',
          location: 'Owerri, Country',
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'rejected': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.nin.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.applicationType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);
  const startIndex = (currentPage - 1) * applicationsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + applicationsPerPage);

  const handleApplicationAction = (appId, action) => {
    switch (action) {
      case 'approve':
        if (confirm('Are you sure you want to approve this application?')) {
          setApplications(applications.map(app => 
            app.id === appId ? { ...app, status: 'approved' } : app
          ));
        }
        break;
      case 'reject':
        if (confirm('Are you sure you want to reject this application?')) {
          setApplications(applications.map(app => 
            app.id === appId ? { ...app, status: 'rejected' } : app
          ));
        }
        break;
      case 'request_info':
        if (confirm('Are you sure you want to request more information for this application?')) {
          setRequestedInfoApplications(prev => ({ ...prev, [appId]: true }));
          alert(`Notification/Email sent to citizen for application ${appId} requesting more information.`);
        }
        break;
    }
  };

  const handleSelectApplication = (appId) => {
    setSelectedApplications(prevSelected => 
      prevSelected.includes(appId)
        ? prevSelected.filter(id => id !== appId)
        : [...prevSelected, appId]
    );
  };

  const handleSelectAllApplications = () => {
    if (selectedApplications.length === paginatedApplications.length && paginatedApplications.length > 0) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(paginatedApplications.map(app => app.id));
    }
  };

  const handleBulkApprove = () => {
    if (confirm(`Are you sure you want to approve ${selectedApplications.length} applications?`)) {
      setApplications(applications.map(app => 
        selectedApplications.includes(app.id) ? { ...app, status: 'approved' } : app
      ));
      setSelectedApplications([]);
    }
  };

  const handleBulkRequestInfo = () => {
    if (confirm(`Are you sure you want to request more info for ${selectedApplications.length} applications?`)) {
      alert('Request more information for selected applications functionality');
      setSelectedApplications([]);
    }
  };

  const exportApplications = () => {
    const appsToExport = selectedApplications.length > 0 
      ? applications.filter(app => selectedApplications.includes(app.id))
      : applications;
    alert(`Exporting ${appsToExport.length} applications.`);
    setSelectedApplications([]);
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
              <h1 className="text-xl font-semibold text-gray-900">Application Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedApplications.length > 0 && (
                <>
                  <button
                    onClick={handleBulkApprove}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Selected ({selectedApplications.length})
                  </button>
                  <button
                    onClick={handleBulkRequestInfo}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                  <Info className="h-4 w-4 mr-2" />
                    Request Info Selected ({selectedApplications.length})
                  </button>
                </>
              )}
              <button
                onClick={exportApplications}
                className="bg-[#004040] hover:bg-[#003030] text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export {selectedApplications.length > 0 ? `Selected (${selectedApplications.length})` : ''}
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
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(a => a.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(a => a.status === 'rejected').length}
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
                placeholder="Search by citizen name or National ID..."
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
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#004040] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="new">New</option>
                <option value="renewal">Renewal</option>
                <option value="lost">Lost</option>
                <option value="update">Update</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-[#004040] rounded"
                      checked={selectedApplications.length === paginatedApplications.length && paginatedApplications.length > 0}
                      onChange={handleSelectAllApplications}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Type
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
                {paginatedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-[#004040] rounded"
                        checked={selectedApplications.includes(app.id)}
                        onChange={() => handleSelectApplication(app.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-[#004040] flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.citizenName}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {app.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">{app.applicationType}</div>
                      <div className="text-xs text-gray-500">National ID: {app.nin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                        {app.submissionDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1 capitalize">{app.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApplicationAction(app.id, 'approve')}
                          className="text-green-600 hover:text-green-900"
                          title="Approve Application"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApplicationAction(app.id, 'reject')}
                          className="text-red-600 hover:text-red-900"
                          title="Reject Application"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApplicationAction(app.id, 'request_info')}
                          className={`hover:text-blue-900 ${requestedInfoApplications[app.id] ? 'text-blue-400 cursor-not-allowed' : 'text-blue-600'}`}
                          title={requestedInfoApplications[app.id] ? 'Info Requested' : 'Request More Info'}
                          disabled={requestedInfoApplications[app.id]}
                        >
                          <Info className="h-4 w-4" />
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
                    <span className="font-medium">{Math.min(startIndex + applicationsPerPage, filteredApplications.length)}</span> of{' '}
                    <span className="font-medium">{filteredApplications.length}</span> results
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
