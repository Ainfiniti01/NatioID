'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download, 
  Search,
  ArrowLeft,
  User,
  Hash,
  MoreVertical,
  Edit,
  CircleDot,
  CircleCheck,
  CircleX
} from 'lucide-react';

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [applications] = useState([
    {
      id: 'APP001',
      applicationId: 'APP-2024-001',
      applicationType: 'passport_renewal',
      status: 'pending',
      submittedBy: 'Adebayo Johnson',
      email: 'adebayo.johnson@email.com',
      phone: '+234 803 456 7890',
      submittedData: {
        fullName: 'Adebayo Johnson',
        nin: '12345678901',
        dateOfBirth: '1990-05-15',
        placeOfBirth: 'Lagos',
        address: '123 Victoria Island, Lagos',
        emergencyContact: '+234 802 123 4567',
        passportNumber: 'A1234567',
        expiryDate: '2024-12-31'
      },
      adminNotes: '',
      attachments: ['passport_photo.jpg', 'old_passport.pdf', 'nin_slip.pdf'],
      createdAt: '2024-09-15T10:30:00Z',
      updatedAt: '2024-09-15T10:30:00Z'
    },
    {
      id: 'APP002',
      applicationId: 'APP-2024-002',
      applicationType: 'drivers_license',
      status: 'approved',
      submittedBy: 'Fatima Mohammed',
      email: 'fatima.mohammed@email.com',
      phone: '+234 901 234 5678',
      submittedData: {
        fullName: 'Fatima Mohammed',
        nin: '98765432109',
        dateOfBirth: '1985-11-22',
        address: '456 Ikeja, Lagos',
        licenseClass: 'Class B',
        medicalCertificate: 'Valid',
        trainingCertificate: 'Completed'
      },
      adminNotes: 'All documents verified. License approved for issuance.',
      attachments: ['medical_cert.pdf', 'training_cert.pdf', 'photo.jpg'],
      createdAt: '2024-09-10T14:20:00Z',
      updatedAt: '2024-09-16T09:15:00Z'
    },
    {
      id: 'APP003',
      applicationId: 'APP-2024-003',
      applicationType: 'birth_certificate',
      status: 'rejected',
      submittedBy: 'Chioma Okafor',
      email: 'chioma.okafor@email.com',
      phone: '+234 802 345 6789',
      submittedData: {
        childName: 'Emmanuel Okafor',
        dateOfBirth: '2024-01-15',
        placeOfBirth: 'Lagos University Teaching Hospital',
        fatherName: 'Chukwuma Okafor',
        motherName: 'Chioma Okafor',
        hospitalRecord: 'LUTH/2024/001234'
      },
      adminNotes: 'Missing hospital birth records. Please provide official birth documentation from hospital.',
      attachments: ['parents_id.pdf'],
      createdAt: '2024-09-08T08:45:00Z',
      updatedAt: '2024-09-12T16:30:00Z'
    }
  ]);

  const [stats] = useState({
    total: 1247,
    pending: 456,
    approved: 623,
    rejected: 89,
    underReview: 79
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'under_review': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      'passport_renewal': 'Passport Renewal',
      'passport_new': 'New Passport',
      'drivers_license': 'Driver\'s License',
      'birth_certificate': 'Birth Certificate',
      'marriage_certificate': 'Marriage Certificate',
      'death_certificate': 'Death Certificate',
      'national_id_registration': 'National ID Registration',
      'voter_registration': 'Voter Registration'
    };
    return types[type] || type;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'passport_renewal':
      case 'passport_new': return 'bg-blue-100 text-blue-800';
      case 'drivers_license': return 'bg-purple-100 text-purple-800';
      case 'birth_certificate':
      case 'marriage_certificate':
      case 'death_certificate': return 'bg-green-100 text-green-800';
      case 'nin_registration': return 'bg-orange-100 text-orange-800';
      case 'voter_registration': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.submittedData.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.applicationType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusUpdate = (applicationId, newStatus) => {
    alert(`Status for application ${applicationId} would be updated to ${newStatus}`);
  };

  const TimelineTracker = ({ status, createdAt, updatedAt }) => {
    const statusOrder = ['pending', 'under_review', 'approved', 'rejected']; // Moved to top level of component
    const steps = [
      { name: 'Submitted', status: 'pending', date: createdAt },
      { name: 'Under Review', status: 'under_review', date: null }, // Date will be updated when status changes
      { name: 'Approved', status: 'approved', date: null },
      { name: 'Rejected', status: 'rejected', date: null },
    ];

    const getStepIcon = (stepStatus, currentStatus) => {
      const currentStatusIndex = statusOrder.indexOf(currentStatus);
      const stepStatusIndex = statusOrder.indexOf(stepStatus);

      if (stepStatusIndex < currentStatusIndex) {
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      } else if (stepStatusIndex === currentStatusIndex) {
        return <CircleDot className="h-5 w-5 text-blue-500" />;
      } else if (currentStatus === 'rejected' && stepStatus === 'rejected') {
        return <CircleX className="h-5 w-5 text-red-500" />;
      }
      return <Clock className="h-5 w-5 text-gray-400" />;
    };

    const getStepColor = (stepStatus, currentStatus) => {
      const currentStatusIndex = statusOrder.indexOf(currentStatus);
      const stepStatusIndex = statusOrder.indexOf(stepStatus);

      if (stepStatusIndex < currentStatusIndex) {
        return 'text-green-600';
      } else if (stepStatusIndex === currentStatusIndex) {
        return 'text-blue-600 font-semibold';
      } else if (currentStatus === 'rejected' && stepStatus === 'rejected') {
        return 'text-red-600 font-semibold';
      }
      return 'text-gray-500';
    };

    return (
      <div className="flex items-center justify-between text-sm">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full">
                {getStepIcon(step.status, status)}
              </div>
              <span className={`mt-1 text-center ${getStepColor(step.status, status)}`}>
                {step.name}
              </span>
              {step.date && (
                <span className="text-xs text-gray-400">
                  {new Date(step.date).toLocaleDateString()}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${statusOrder.indexOf(status) >= index + 1 ? 'bg-blue-500' : 'bg-gray-300'} mx-2`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
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
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Application Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => alert('Export applications')}
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
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
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.rejected}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Edit className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Under Review</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.underReview}</p>
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
                  placeholder="Search applications..."
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="under_review">Under Review</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="passport_renewal">Passport Renewal</option>
                <option value="passport_new">New Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="birth_certificate">Birth Certificate</option>
                <option value="marriage_certificate">Marriage Certificate</option>
                <option value="national_id_registration">National ID Registration</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Hash className="h-4 w-4 text-gray-400 mr-1" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.applicationId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {application.submittedBy}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {application.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(application.applicationType)}`}>
                        {getTypeLabel(application.applicationType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                        {application.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedApplication(application)}
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

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Application Details - {selectedApplication.applicationId}
                </h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {/* Timeline Tracker */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Application Progress</h4>
                  <TimelineTracker 
                    status={selectedApplication.status} 
                    createdAt={selectedApplication.createdAt} 
                    updatedAt={selectedApplication.updatedAt} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                      value={selectedApplication.status}
                      onChange={(e) => handleStatusUpdate(selectedApplication.id, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedApplication.applicationType)}`}>
                      {getTypeLabel(selectedApplication.applicationType)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Applicant</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedApplication.submittedBy}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedApplication.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Application ID</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{selectedApplication.applicationId}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Application Data</label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedApplication.submittedData).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <p className="text-sm text-gray-900 dark:text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attachments</label>
                  <div className="mt-2 space-y-2">
                    {selectedApplication.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm text-gray-900 dark:text-white">{attachment}</span>
                        <button className="text-[#004040] hover:text-[#003030] dark:text-[#ECBE07] dark:hover:text-[#D4AA06]">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Notes</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    placeholder="Add notes about this application..."
                    defaultValue={selectedApplication.adminNotes}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Submitted:</span> {new Date(selectedApplication.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> {new Date(selectedApplication.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Application would be approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => alert('Application would be rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => alert('Application would be updated')}
                  className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] dark:bg-[#ECBE07] dark:text-black dark:hover:bg-[#D4AA06]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
