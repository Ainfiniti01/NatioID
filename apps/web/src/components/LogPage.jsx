'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Info, 
  XOctagon, 
  Download, 
  Search,
  ArrowLeft,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  MoreVertical
} from 'lucide-react';

export default function LogPage({ logs: initialLogs, stats: initialStats, title, dataSource }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [citizenIdFilter, setCitizenIdFilter] = useState('');
  const [adminIdFilter, setAdminIdFilter] = useState('');
  const [applicationIdFilter, setApplicationIdFilter] = useState('');
  const [electionIdFilter, setElectionIdFilter] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const [logs] = useState(initialLogs);
  const [stats] = useState(initialStats);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return <XOctagon className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActionLabel = (action) => {
    const actions = {
      'user_login': 'User Login',
      'user_logout': 'User Logout',
      'complaint_submitted': 'Complaint Submitted',
      'complaint_updated': 'Complaint Updated',
      'application_submitted': 'Application Submitted',
      'application_approved': 'Application Approved',
      'application_rejected': 'Application Rejected',
      'profile_updated': 'Profile Updated',
      'failed_login_attempt': 'Failed Login',
      'system_error': 'System Error',
      'database_backup': 'Database Backup',
      'admin_action': 'Admin Action'
    };
    return actions[action] || action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesEntity = entityFilter === 'all' || log.entityType === entityFilter;
    const matchesCitizenId = dataSource === 'citizen' && (citizenIdFilter === '' || (log.userId && log.userId.toLowerCase().includes(citizenIdFilter.toLowerCase())));
    const matchesAdminId = dataSource === 'admin' && (adminIdFilter === '' || (log.userId && log.userId.toLowerCase().includes(adminIdFilter.toLowerCase())));
    const matchesApplicationId = applicationIdFilter === '' || (log.entityType === 'applications' && log.entityId && String(log.entityId).includes(applicationIdFilter));
    const matchesElectionId = electionIdFilter === '' || (log.entityType === 'elections' && log.entityId && String(log.entityId).includes(electionIdFilter));
    
    const isCorrectDataSource = dataSource === 'citizen' ? log.userId !== null : true;

    return matchesSearch && matchesLevel && matchesEntity && (matchesCitizenId || matchesAdminId) && matchesApplicationId && matchesElectionId && isCorrectDataSource;
  });

  const handleExportLogs = () => {
    alert('Logs would be exported to CSV/JSON format');
  };

  const handleRefreshLogs = () => {
    alert('Logs would be refreshed from the system');
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
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRefreshLogs}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Refresh logs"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              
              <button 
                onClick={handleExportLogs}
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
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Logs</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalLogs.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XOctagon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Errors</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.errorLogs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Warnings</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.warningLogs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Info className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Info</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.infoLogs.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.todayLogs}</p>
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
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>

              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Entities</option>
                <option value="users">Users</option>
                <option value="complaints">Complaints</option>
                <option value="applications">Applications</option>
                <option value="authentication">Authentication</option>
                <option value="system">System</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>

              {dataSource === 'citizen' && (
                <input
                  type="text"
                  placeholder="Filter by Citizen ID..."
                  value={citizenIdFilter}
                  onChange={(e) => setCitizenIdFilter(e.target.value)}
                  className="pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
              {dataSource === 'admin' && (
                <input
                  type="text"
                  placeholder="Filter by Admin ID..."
                  value={adminIdFilter}
                  onChange={(e) => setAdminIdFilter(e.target.value)}
                  className="pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
              <input
                type="text"
                placeholder="Filter by Application ID..."
                value={applicationIdFilter}
                onChange={(e) => setApplicationIdFilter(e.target.value)}
                className="pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Filter by Election ID..."
                value={electionIdFilter}
                onChange={(e) => setElectionIdFilter(e.target.value)}
                className="pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-[#004040] focus:ring-[#004040]"
                />
                <span>Auto-refresh</span>
              </label>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredLogs.length} of {logs.length} logs
              </div>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}>
                          {getLevelIcon(log.level)}
                          <span className="ml-1">{log.level.toUpperCase()}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {getActionLabel(log.action)}
                      </div>
                      {log.userId && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          User: {log.userId}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {log.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {log.entityType}
                        {log.entityId && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {log.entityId}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedLog(log)}
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

        {/* Log Detail Modal */}
        {selectedLog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Log Details - {selectedLog.id}
                </h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(selectedLog.level)}`}>
                      {getLevelIcon(selectedLog.level)}
                      <span className="ml-1">{selectedLog.level.toUpperCase()}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Action</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{getActionLabel(selectedLog.action)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedLog.message}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Entity Type</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedLog.entityType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Entity ID</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                      {selectedLog.entityId || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                      {selectedLog.userId || 'System'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">IP Address</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{selectedLog.ipAddress}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Details</label>
                  <div className="mt-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <pre className="text-xs text-gray-900 dark:text-white whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timestamp</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(selectedLog.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2));
                    alert('Log details copied to clipboard');
                  }}
                  className="px-4 py-2 bg-[#004040] text-white rounded-md hover:bg-[#003030] dark:bg-[#ECBE07] dark:text-black dark:hover:bg-[#D4AA06]"
                >
                  Copy Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
