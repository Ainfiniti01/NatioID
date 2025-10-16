'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText,
  Download,
  Calendar,
  Filter,
  Settings,
  BarChart3,
  PieChart,
  Users,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  RefreshCw,
  Plus,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function AuditReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [reportStats, setReportStats] = useState({});

  useEffect(() => {
    fetchReports();
    fetchReportStats();
  }, []);

  const fetchReports = async () => {
    // Dummy API call
    setTimeout(() => {
      setReports([
        {
          id: 'RPT-2025-001',
          title: 'Monthly Compliance Report - January 2025',
          type: 'compliance',
          period: 'monthly',
          dateRange: '2025-01-01 to 2025-01-31',
          generatedAt: '2025-01-19 09:00:00',
          generatedBy: 'Super Admin',
          fileSize: '2.4 MB',
          format: 'PDF',
          status: 'completed',
          categories: ['admin_activity', 'user_registrations', 'security_events'],
          downloadUrl: '/reports/RPT-2025-001.pdf'
        },
        {
          id: 'RPT-2024-Q4',
          title: 'Quarterly System Audit - Q4 2024',
          type: 'system_audit',
          period: 'quarterly',
          dateRange: '2024-10-01 to 2024-12-31',
          generatedAt: '2025-01-02 14:30:00',
          generatedBy: 'Super Admin',
          fileSize: '8.7 MB',
          format: 'PDF',
          status: 'completed',
          categories: ['system_performance', 'admin_activity', 'security_events', 'data_integrity'],
          downloadUrl: '/reports/RPT-2024-Q4.pdf'
        },
        {
          id: 'RPT-2024-ANNUAL',
          title: 'Annual Security Report - 2024',
          type: 'security',
          period: 'annual',
          dateRange: '2024-01-01 to 2024-12-31',
          generatedAt: '2025-01-01 00:00:00',
          generatedBy: 'System Auto-Generate',
          fileSize: '15.2 MB',
          format: 'PDF',
          status: 'completed',
          categories: ['security_events', 'fraud_detection', 'access_logs'],
          downloadUrl: '/reports/RPT-2024-ANNUAL.pdf'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchReportStats = async () => {
    // Dummy stats
    setReportStats({
      totalUsers: 125000,
      newUsersThisMonth: 4580,
      totalApplications: 89750,
      approvedApplications: 84320,
      pendingApplications: 3980,
      rejectedApplications: 1450,
      totalComplaints: 2340,
      resolvedComplaints: 2180,
      totalAdmins: 47,
      activeAdmins: 42,
      securityIncidents: 8,
      systemUptime: 99.9,
      loginAttempts: 45670,
      failedLogins: 1234
    });
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Dummy generation process
    setTimeout(() => {
      const newReport = {
        id: `RPT-${Date.now()}`,
        title: `${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Report - ${new Date().toLocaleDateString()}`,
        type: 'compliance',
        period: selectedPeriod,
        dateRange: getDateRange(selectedPeriod),
        generatedAt: new Date().toLocaleString(),
        generatedBy: 'Super Admin',
        fileSize: '3.2 MB',
        format: 'PDF',
        status: 'completed',
        categories: selectedCategories,
        downloadUrl: '#'
      };
      
      setReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
      alert('Report generated successfully!');
    }, 3000);
  };

  const handleDownloadReport = (reportId) => {
    // Dummy download
    alert(`Downloading report ${reportId}...`);
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(prev => prev.filter(report => report.id !== reportId));
    }
  };

  const getDateRange = (period) => {
    const now = new Date();
    switch (period) {
      case 'monthly':
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01 to ${now.toISOString().split('T')[0]}`;
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `Q${quarter} ${now.getFullYear()}`;
      case 'annual':
        return `${now.getFullYear()}-01-01 to ${now.getFullYear()}-12-31`;
      default:
        return 'Custom Range';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'generating': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const reportCategories = [
    { id: 'all', name: 'All Categories', description: 'Complete system overview' },
    { id: 'admin_activity', name: 'Admin Activity', description: 'Administrative actions and logs' },
    { id: 'user_registrations', name: 'User Registrations', description: 'New user signups and verifications' },
    { id: 'security_events', name: 'Security Events', description: 'Security incidents and authentication' },
    { id: 'system_performance', name: 'System Performance', description: 'Uptime, performance metrics' },
    { id: 'data_integrity', name: 'Data Integrity', description: 'Data validation and consistency' },
    { id: 'fraud_detection', name: 'Fraud Detection', description: 'Suspicious activities and alerts' },
    { id: 'access_logs', name: 'Access Logs', description: 'User and admin access patterns' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading audit reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <button
                onClick={() => window.location.href = '/super-admin/dashboard'}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Shield className="h-6 w-6 text-red-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Audit Reports</h1>
            </div>
            <p className="text-gray-600">Generate and manage compliance and audit reports</p>
          </div>
          
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>

        {/* Report Configuration */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="monthly">Monthly Report</option>
                <option value="quarterly">Quarterly Report</option>
                <option value="annual">Annual Report</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <input
                type="text"
                value={getDateRange(selectedPeriod)}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Report Categories</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {reportCategories.map((category) => (
                <label key={category.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories(prev => [...prev.filter(c => c !== 'all'), category.id]);
                      } else {
                        setSelectedCategories(prev => prev.filter(c => c !== category.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.totalUsers?.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{reportStats.newUsersThisMonth} this month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.totalApplications?.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">{reportStats.approvedApplications?.toLocaleString()} approved</span>
                </div>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Events</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.securityIncidents}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-2 from last month</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.systemUptime}%</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Excellent</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Generated Reports */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-500">{report.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {report.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{report.period}</div>
                      <div className="text-sm text-gray-500">{report.dateRange}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.generatedAt}</div>
                      <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.fileSize} ({report.format})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownloadReport(report.id)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert(`Viewing report details for ${report.id}`)}
                          className="text-gray-600 hover:text-gray-800 p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports generated</h3>
              <p className="text-gray-500">Generate your first audit report to get started.</p>
            </div>
          )}
        </div>

        {/* Report Templates */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Report Templates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setSelectedPeriod('monthly');
                setSelectedCategories(['admin_activity', 'security_events']);
                handleGenerateReport();
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">Monthly Security Report</span>
              </div>
              <p className="text-sm text-gray-600">Admin activities and security events for the current month</p>
            </button>

            <button
              onClick={() => {
                setSelectedPeriod('quarterly');
                setSelectedCategories(['all']);
                handleGenerateReport();
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
            >
              <div className="flex items-center mb-2">
                <PieChart className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Quarterly Compliance</span>
              </div>
              <p className="text-sm text-gray-600">Complete system overview for regulatory compliance</p>
            </button>

            <button
              onClick={() => {
                setSelectedPeriod('annual');
                setSelectedCategories(['security_events', 'fraud_detection']);
                handleGenerateReport();
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
            >
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium text-gray-900">Annual Security Audit</span>
              </div>
              <p className="text-sm text-gray-600">Comprehensive security analysis and fraud detection summary</p>
            </button>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h3 className="text-blue-800 font-medium">Compliance Standards</h3>
              <p className="text-blue-700 text-sm mt-1">
                All reports are generated in compliance with Country Data Protection Regulation (NDPR) 
                and international audit standards. Reports contain anonymized data where required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}