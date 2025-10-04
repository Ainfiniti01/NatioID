'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Activity, 
  UserCheck, 
  UserX, 
  Settings, 
  FileText, 
  Eye,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Dummy API call
    setTimeout(() => {
      setStats({
        totalAdmins: 47,
        activeAdmins: 42,
        suspendedAdmins: 3,
        inactiveAdmins: 2,
        totalUsers: 125000,
        newUsersToday: 234,
        pendingApplications: 1247,
        systemUptime: '99.9%'
      });

      setRecentActivity([
        {
          id: 1,
          admin: 'John Admin',
          action: 'Approved ID Application',
          target: 'APP-12345',
          timestamp: '2 minutes ago',
          type: 'approval',
          ip: '192.168.1.105'
        },
        {
          id: 2,
          admin: 'Sarah Manager',
          action: 'Suspended User Account',
          target: 'user-67890',
          timestamp: '15 minutes ago',
          type: 'suspension',
          ip: '192.168.1.108'
        },
        {
          id: 3,
          admin: 'Mike Reviewer',
          action: 'Updated News Article',
          target: 'news-456',
          timestamp: '1 hour ago',
          type: 'update',
          ip: '192.168.1.112'
        },
        {
          id: 4,
          admin: 'Admin Support',
          action: 'Resolved Complaint',
          target: 'COMP-789',
          timestamp: '2 hours ago',
          type: 'resolution',
          ip: '192.168.1.115'
        },
        {
          id: 5,
          admin: 'Lisa Admin',
          action: 'Failed Login Attempt',
          target: 'admin-login',
          timestamp: '3 hours ago',
          type: 'security',
          ip: '203.45.67.89'
        }
      ]);

      setAlerts([
        {
          id: 1,
          type: 'security',
          title: 'Unusual Login Pattern',
          message: 'Multiple failed login attempts detected from IP 203.45.67.89',
          severity: 'high',
          timestamp: '5 minutes ago'
        },
        {
          id: 2,
          type: 'system',
          title: 'High Application Volume',
          message: 'ID applications increased by 45% today',
          severity: 'medium',
          timestamp: '1 hour ago'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'approval': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'suspension': return <UserX className="h-4 w-4 text-red-500" />;
      case 'update': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'resolution': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'security': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            </div>
            <p className="text-gray-600">NatioID System Administration & Oversight</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => window.location.href = '/super-admin/admin-accounts'}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Admin
            </button>
            <button 
              onClick={() => window.location.href = '/super-admin/system-settings'}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </button>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`border-l-4 p-4 rounded-lg ${getSeverityColor(alert.severity)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Admins</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalAdmins}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3 this month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Admins</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeAdmins}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">Last 24 hours</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Suspended Admins</p>
                <p className="text-3xl font-bold text-gray-900">{stats.suspendedAdmins}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">-1 this week</span>
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <UserX className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900">{stats.systemUptime}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Excellent</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Activity className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Admin Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Admin Activity</h2>
                <button 
                  onClick={() => window.location.href = '/super-admin/activity-logs'}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  View All Logs
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getActionIcon(activity.type)}
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.admin} <span className="font-normal text-gray-600">{activity.action}</span>
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{activity.target}</span>
                          <span>•</span>
                          <span>{activity.ip}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/super-admin/admin-accounts'}
                  className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-blue-700 font-medium">Manage Admin Accounts</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/super-admin/activity-logs'}
                  className="w-full flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <FileText className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-700 font-medium">View Activity Logs</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/super-admin/system-settings'}
                  className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-700 font-medium">System Settings</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/super-admin/audit-reports'}
                  className="w-full flex items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <FileText className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-orange-700 font-medium">Generate Audit Report</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Citizens</span>
                  <span className="font-semibold text-gray-900">{stats.totalUsers?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Today</span>
                  <span className="font-semibold text-green-600">+{stats.newUsersToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Applications</span>
                  <span className="font-semibold text-orange-600">{stats.pendingApplications?.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">All Systems Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Super Admin Access • Last Login: {new Date().toLocaleString()} • Session Timeout: 3 minutes</p>
        </div>
      </div>
    </div>
  );
}