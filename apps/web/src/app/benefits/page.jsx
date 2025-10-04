'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  Users, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  Download, 
  Search,
  ArrowLeft,
  Calendar,
  DollarSign,
  Target,
  MoreVertical
} from 'lucide-react';

export default function BenefitsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [benefits] = useState([
    {
      id: 'BEN001',
      title: 'Youth Employment Support',
      description: 'Financial assistance and training programs for unemployed youth aged 18-35',
      category: 'employment',
      status: 'active',
      eligibility: 'Age 18-35, Unemployed for 6+ months, Country citizen',
      amount: '$50,000',
      duration: '6 months',
      beneficiaries: 2847,
      budget: '$142,350,000',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      applicationDeadline: '2024-11-30',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'BEN002',
      title: 'Senior Citizens Healthcare',
      description: 'Free healthcare services and medical insurance for citizens above 65',
      category: 'healthcare',
      status: 'active',
      eligibility: 'Age 65+, Country citizen, Low income household',
      amount: '$100,000',
      duration: '12 months',
      beneficiaries: 15678,
      budget: '$1,567,800,000',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      applicationDeadline: '2024-10-31',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'BEN003',
      title: 'Small Business Loan Program',
      description: 'Low-interest loans for small and medium enterprises',
      category: 'business',
      status: 'pending',
      eligibility: 'Registered business, Annual revenue < $10M, 2+ years operation',
      amount: '$500,000',
      duration: '24 months',
      beneficiaries: 453,
      budget: '$226,500,000',
      startDate: '2024-10-01',
      endDate: '2025-09-30',
      applicationDeadline: '2024-12-15',
      createdAt: '2024-08-15T00:00:00Z'
    },
    {
      id: 'BEN004',
      title: 'Student Education Grant',
      description: 'Educational grants for university students from low-income families',
      category: 'education',
      status: 'active',
      eligibility: 'University student, Family income < $200,000/month, GPA ≥ 3.0',
      amount: '$75,000',
      duration: '4 years',
      beneficiaries: 8932,
      budget: '$669,900,000',
      startDate: '2024-09-01',
      endDate: '2028-08-31',
      applicationDeadline: '2024-12-01',
      createdAt: '2024-07-01T00:00:00Z'
    }
  ]);

  const [stats] = useState({
    totalBenefits: 23,
    activeBenefits: 18,
    pendingBenefits: 3,
    totalBeneficiaries: 45672,
    totalBudget: '$8.2B'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'employment': return 'bg-blue-100 text-blue-800';
      case 'healthcare': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'business': return 'bg-orange-100 text-orange-800';
      case 'housing': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = benefit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || benefit.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || benefit.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

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
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Benefits Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#004040] dark:bg-[#ECBE07] text-white dark:text-black rounded-lg hover:bg-[#003030] dark:hover:bg-[#D4AA06]"
              >
                <Plus className="h-4 w-4" />
                <span>Create Benefit</span>
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
              <Gift className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Benefits</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalBenefits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.activeBenefits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Beneficiaries</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalBeneficiaries.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Budget</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalBudget}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pendingBenefits}</p>
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
                  placeholder="Search benefits..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="employment">Employment</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="housing">Housing</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredBenefits.length} of {benefits.length} benefits
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBenefits.map((benefit) => (
            <div key={benefit.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {benefit.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(benefit.status)}`}>
                      {benefit.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(benefit.category)}`}>
                      {benefit.category}
                    </span>
                    <span className="text-lg font-bold text-[#004040] dark:text-[#ECBE07]">
                      {benefit.amount}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Beneficiaries:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {benefit.beneficiaries.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {benefit.duration}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {benefit.budget}
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Application Deadline:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {new Date(benefit.applicationDeadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedBenefit(benefit)}
                      className="text-[#004040] hover:text-[#003030] dark:text-[#ECBE07] dark:hover:text-[#D4AA06] text-sm font-medium"
                    >
                      View Details
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefit Detail Modal */}
        {selectedBenefit && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedBenefit.title}
                </h3>
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBenefit.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedBenefit.category)}`}>
                      {selectedBenefit.category}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedBenefit.status)}`}>
                      {selectedBenefit.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Eligibility Criteria</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBenefit.eligibility}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                    <p className="mt-1 text-lg font-bold text-[#004040] dark:text-[#ECBE07]">{selectedBenefit.amount}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBenefit.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Beneficiaries</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBenefit.beneficiaries.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Budget</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedBenefit.budget}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedBenefit.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedBenefit.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Application Deadline</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(selectedBenefit.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Benefit would be edited')}
                  className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] dark:bg-[#ECBE07] dark:text-black dark:hover:bg-[#D4AA06]"
                >
                  Edit Benefit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Benefit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Benefit Program
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    placeholder="Enter benefit program title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    placeholder="Describe the benefit program"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white">
                      <option value="">Select category</option>
                      <option value="employment">Employment</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="business">Business</option>
                      <option value="housing">Housing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                      placeholder="$50,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Eligibility Criteria</label>
                  <textarea
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    placeholder="Define eligibility requirements"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </form>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Benefit program would be created');
                    setShowCreateModal(false);
                  }}
                  className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] dark:bg-[#ECBE07] dark:text-black dark:hover:bg-[#D4AA06]"
                >
                  Create Benefit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
