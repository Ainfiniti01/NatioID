'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Download, 
  Filter, 
  Search, 
  Calendar,
  ArrowLeft,
  MapPin,
  User,
  Hash,
  MoreVertical
} from 'lucide-react';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock data for reports
  const [reports] = useState([
    {
      id: 'RPT001',
      reportId: 'RPT-2024-001',
      title: 'Lost National ID Card',
      type: 'lost_id',
      status: 'pending',
      description: 'I lost my national ID card while traveling from Lagos to Abuja. Last seen at the airport security checkpoint.',
      location: 'Murtala Muhammed Airport, Lagos',
      reportedBy: 'Adebayo Johnson',
      userId: 'USR001',
      email: 'adebayo.johnson@email.com',
      phone: '+234 803 456 7890',
      createdAt: '2024-09-15T10:30:00Z',
      updatedAt: '2024-09-15T10:30:00Z',
      attachments: ['id_photo.jpg', 'police_report.pdf'],
      priority: 'medium'
    },
    {
      id: 'RPT002',
      reportId: 'RPT-2024-002',
      title: 'Stolen Passport and Documents',
      type: 'stolen_documents',
      status: 'in_progress',
      description: 'My passport, driver\'s license, and birth certificate were stolen from my vehicle parked outside the shopping mall.',
      location: 'Ikeja City Mall, Lagos State',
      reportedBy: 'Fatima Mohammed',
      userId: 'USR002',
      email: 'fatima.mohammed@email.com',
      phone: '+234 901 234 5678',
      createdAt: '2024-09-14T14:20:00Z',
      updatedAt: '2024-09-16T09:15:00Z',
      attachments: ['police_report.pdf', 'vehicle_photo.jpg'],
      priority: 'high'
    },
    {
      id: 'RPT003',
      reportId: 'RPT-2024-003',
      title: 'Stolen Identity Card',
      type: 'stolen_id',
      status: 'resolved',
      description: 'My national identity card was pickpocketed while using public transport during rush hour.',
      location: 'Bus Rapid Transit Station, Victoria Island',
      reportedBy: 'Chioma Okafor',
      userId: 'USR003',
      email: 'chioma.okafor@email.com',
      phone: '+234 802 345 6789',
      createdAt: '2024-09-10T08:45:00Z',
      updatedAt: '2024-09-18T16:30:00Z',
      attachments: ['statement.pdf'],
      priority: 'medium',
      resolution: 'New ID card issued and delivered to user. Case closed.'
    }
  ]);

  const [stats] = useState({
    total: 156,
    pending: 45,
    inProgress: 67,
    resolved: 44,
    lostId: 89,
    stolenId: 45,
    stolenDocuments: 22
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'in_progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'lost_id': return 'Lost ID';
      case 'stolen_id': return 'Stolen ID';
      case 'stolen_documents': return 'Stolen Documents';
      default: return type;
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

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusUpdate = (reportId, newStatus) => {
    alert(`Status for report ${reportId} would be updated to ${newStatus}`);
  };

  const handleExportReports = () => {
    alert('Reports would be exported to CSV/PDF');
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
                onClick={handleExportReports}
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
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reports</p>
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
                  placeholder="Search reports..."
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
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="lost_id">Lost ID</option>
                <option value="stolen_id">Stolen ID</option>
                <option value="stolen_documents">Stolen Documents</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredReports.length} of {reports.length} reports
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Reporter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
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
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <Hash className="h-4 w-4 text-gray-400 mr-1" />
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.reportId}
                          </div>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {report.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.reportedBy}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {report.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {getTypeLabel(report.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <div className="max-w-xs truncate">
                          {report.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-[#004040] hover:text-[#003030] dark:text-[#ECBE07] dark:hover:text-[#D4AA06]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Report Details - {selectedReport.reportId}
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
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
                      value={selectedReport.status}
                      onChange={(e) => handleStatusUpdate(selectedReport.id, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{getTypeLabel(selectedReport.type)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedReport.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reporter</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedReport.reportedBy}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedReport.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedReport.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedReport.location}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attachments</label>
                  <div className="mt-1 space-y-1">
                    {selectedReport.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">{attachment}</span>
                        <button className="text-[#004040] hover:text-[#003030] dark:text-[#ECBE07] dark:hover:text-[#D4AA06]">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReport.resolution && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resolution</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedReport.resolution}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Created:</span> {new Date(selectedReport.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span> {new Date(selectedReport.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Report would be updated')}
                  className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] dark:bg-[#ECBE07] dark:text-black dark:hover:bg-[#D4AA06]"
                >
                  Update Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}