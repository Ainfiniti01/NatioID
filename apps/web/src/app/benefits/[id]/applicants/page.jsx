'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Download, User, CheckCircle, XCircle, Clock } from 'lucide-react';
export default function BenefitApplicantsPage() {
  const pathSegments = window.location.pathname.split('/');
  const benefitId = pathSegments[pathSegments.indexOf('benefits') + 1]; // Get benefit ID from URL

  // Placeholder for benefit title - in a real app, you'd fetch this based on benefitId
  const [benefitTitle, setBenefitTitle] = useState('Youth Employment Support');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    console.log('BenefitApplicantsPage mounted.');
    console.log('Benefit ID:', benefitId);
    console.log('Benefit Title (placeholder):', benefitTitle);
    // In a real application, you would fetch benefit details here using benefitId
    // For example: fetchBenefitDetails(benefitId).then(data => setBenefitTitle(data.title));
  }, [benefitId, benefitTitle]);

  // Dummy data for applicants
  const initialApplicants = [
    { id: 'APP001', name: 'Aisha Bello', nationalId: '124-456-789', age: 24, status: 'pending', appliedOn: 'Oct 12, 2025' },
    { id: 'APP002', name: 'John Okoro', nationalId: '224-876-123', age: 32, status: 'approved', appliedOn: 'Oct 10, 2025' },
    { id: 'APP003', name: 'Chika Amadi', nationalId: '198-342-456', age: 29, status: 'rejected', appliedOn: 'Oct 09, 2025' },
    { id: 'APP004', name: 'David Eke', nationalId: '345-678-901', age: 45, status: 'pending', appliedOn: 'Oct 15, 2025' },
    { id: 'APP005', name: 'Grace Obi', nationalId: '456-789-012', age: 28, status: 'approved', appliedOn: 'Oct 11, 2025' },
  ];

  const [applicants, setApplicants] = useState(initialApplicants);

  // Placeholder for benefit summary info
  const benefitSummary = {
    totalApplications: applicants.length,
    status: 'Open', // This should come from the benefit data
    applicationDeadline: '2024-11-30', // This should come from the benefit data
  };

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          applicant.nationalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(app =>
        app.id === applicantId ? { ...app, status: newStatus } : app
      )
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
                onClick={() => window.history.back()} // Go back to previous page
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Applicants for: {benefitTitle} (ID: {benefitId})
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{benefitSummary.totalApplications}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{benefitSummary.status}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center">
            <Calendar className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Application Deadline</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {new Date(benefitSummary.applicationDeadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
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
              </select>
            </div>

            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                <Download className="h-4 w-4" />
                <span>Export List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  National ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applied On
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {applicant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {applicant.nationalId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {applicant.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(applicant.status)}`}>
                      {applicant.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(applicant.appliedOn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <button
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={() => alert(`View profile for ${applicant.name}`)} // Placeholder for View Profile
                      >
                        View
                      </button>
                      {/* Status Change Dropdown */}
                      <select
                        value={applicant.status}
                        onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                        className="ml-4 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button
                        className="ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={() => alert(`Add note for ${applicant.name}`)} // Placeholder for Add Note
                      >
                        Add Note
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
  );
}
