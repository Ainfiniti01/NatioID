'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { 
  Shield, 
  Users, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  UserX,
  UserCheck,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Clipboard,
  ArrowLeft ,
  RefreshCw
} from 'lucide-react';

export default function AdminAccountsPage() {
  const { isDarkMode } = useTheme();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmNewAdminPassword, setConfirmNewAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showNewAdminPassword, setShowNewAdminPassword] = useState(false); // State for new admin password visibility
  const [showConfirmNewAdminPassword, setShowConfirmNewAdminPassword] = useState(false); // State for confirm new admin password visibility
  const [showTemporaryPasswordPopup, setShowTemporaryPasswordPopup] = useState(false); // State for temporary password popup
  const [newlyCreatedAdminPassword, setNewlyCreatedAdminPassword] = useState(''); // State to hold the newly created admin's password

  // New states for Add/Edit Admin form
  const [adminFormName, setAdminFormName] = useState('');
  const [adminFormEmail, setAdminFormEmail] = useState('');
  const [adminFormPhone, setAdminFormPhone] = useState('');
  const [adminFormRole, setAdminFormRole] = useState('Viewer');
  const [adminFormDepartment, setAdminFormDepartment] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    // Dummy API call
    setTimeout(() => {
      setAdmins([
        {
          id: 1,
          name: 'John Admin',
          email: 'john.admin@natioid.gov.ng',
          role: 'Admin',
          department: 'ID Management',
          status: 'Active',
          lastLogin: '2025-01-19 09:30 AM',
          created: '2024-12-01',
          totalActions: 1247,
          phone: '+234 801 234 5678',
          joinedDate: '2024-12-01'
        },
        {
          id: 2,
          name: 'Sarah Manager',
          email: 'sarah.manager@natioid.gov.ng',
          role: 'Manager',
          department: 'Complaints',
          status: 'Active',
          lastLogin: '2025-01-19 08:15 AM',
          created: '2024-11-15',
          totalActions: 892,
          phone: '+234 802 345 6789',
          joinedDate: '2024-11-15'
        },
        {
          id: 3,
          name: 'Mike Reviewer',
          email: 'mike.reviewer@natioid.gov.ng',
          role: 'Reviewer',
          department: 'Applications',
          status: 'Active',
          lastLogin: '2025-01-19 07:45 AM',
          created: '2024-11-20',
          totalActions: 654,
          phone: '+234 803 456 7890',
          joinedDate: '2024-11-20'
        },
        {
          id: 4,
          name: 'Lisa Admin',
          email: 'lisa.admin@natioid.gov.ng',
          role: 'Admin',
          department: 'News & Benefits',
          status: 'Suspended',
          lastLogin: '2025-01-17 02:30 PM',
          created: '2024-10-10',
          totalActions: 423,
          phone: '+234 804 567 8901',
          joinedDate: '2024-10-10'
        },
        {
          id: 5,
          name: 'David Viewer',
          email: 'david.viewer@natioid.gov.ng',
          role: 'Viewer',
          department: 'Reports',
          status: 'Inactive',
          lastLogin: '2025-01-15 11:20 AM',
          created: '2024-09-01',
          totalActions: 156,
          phone: '+234 805 678 9012',
          joinedDate: '2024-09-01'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddAdmin = () => {
    setSelectedAdmin(null); // Ensure no admin is selected for "Add New Admin"
    setNewAdminPassword('');
    setConfirmNewAdminPassword('');
    setPasswordError('');
    // Reset form fields for new admin
    setAdminFormName('');
    setAdminFormEmail('');
    setAdminFormPhone('');
    setAdminFormRole('Viewer');
    setAdminFormDepartment('');
    setShowAddModal(true);
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setNewAdminPassword('');
    setConfirmNewAdminPassword('');
    setPasswordError('');
    // Populate form fields for editing
    setAdminFormName(admin.name);
    setAdminFormEmail(admin.email);
    setAdminFormPhone(admin.phone);
    setAdminFormRole(admin.role);
    setAdminFormDepartment(admin.department);
    setShowAddModal(true);
  };

  const handleSuspendAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to suspend this admin? They will lose access immediately.')) {
      setAdmins(prev => prev.map(admin => 
        admin.id === adminId 
          ? { ...admin, status: 'Suspended' }
          : admin
      ));
    }
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    }
  };

  const handleReactivateAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to reactivate this admin?')) {
      setAdmins(prev => prev.map(admin => 
        admin.id === adminId 
          ? { ...admin, status: 'Active' }
          : admin
      ));
    }
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || admin.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || admin.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Suspended': return 'text-red-600 bg-red-100';
      case 'Inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Manager': return 'text-purple-600 bg-purple-100';
      case 'Admin': return 'text-blue-600 bg-blue-100';
      case 'Reviewer': return 'text-orange-600 bg-orange-100';
      case 'Viewer': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 dark:border-[#ECBE07] mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading admin accounts...</p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Accounts Management</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Manage admin accounts, roles, and permissions</p>
          </div>
          
          <button 
            onClick={handleAddAdmin}
            className="bg-red-600 dark:bg-[#ECBE07] text-white dark:text-black px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-[#D4AA06] flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Admin
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Viewer">Viewer</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {filteredAdmins.length} of {admins.length} admins
            </div>
          </div>
        </div>

        {/* Admins Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                            <User className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(admin.role)}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {admin.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(admin.status)}`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {admin.lastLogin}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {admin.totalActions} actions
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === admin.id ? null : admin.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>

                        {showActionMenu === admin.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  window.location.href = `/super-admin/admin-detail/${admin.id}`;
                                  setShowActionMenu(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </button>
                              <button
                                onClick={() => {
                                  handleEditAdmin(admin);
                                  setShowActionMenu(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Admin
                              </button>
                              {admin.status === 'Active' ? (
                                <button
                                  onClick={() => {
                                    handleSuspendAdmin(admin.id);
                                    setShowActionMenu(null);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 w-full text-left"
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Suspend Admin
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    handleReactivateAdmin(admin.id);
                                    setShowActionMenu(null);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-600 w-full text-left"
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Reactivate Admin
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  handleDeleteAdmin(admin.id);
                                  setShowActionMenu(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 w-full text-left"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Admin
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAdmins.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No admins found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or add a new admin.</p>
            </div>
          )}
        </div>

        {/* Add/Edit Admin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {selectedAdmin ? 'Edit Admin' : 'Add New Admin'}
              </h2>

              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                if (!selectedAdmin) { // Only for new admin creation
                  if (newAdminPassword !== confirmNewAdminPassword) {
                    setPasswordError('Passwords do not match.');
                    return;
                  }
                  if (!newAdminPassword) {
                    setPasswordError('Password cannot be empty.');
                    return;
                  }
                }
                setPasswordError('');

                if (!selectedAdmin) { // New admin creation
                  if (newAdminPassword !== confirmNewAdminPassword) {
                    setPasswordError('Passwords do not match.');
                    return;
                  }
                  if (!newAdminPassword) {
                    setPasswordError('Password cannot be empty.');
                    return;
                  }

                  const generatedPassword = newAdminPassword || Math.random().toString(36).slice(-10);
                  const newAdmin = {
                    id: admins.length + 1, // Dummy ID
                    name: adminFormName,
                    email: adminFormEmail,
                    role: adminFormRole,
                    department: adminFormDepartment,
                    status: 'Active',
                    lastLogin: 'Never',
                    created: new Date().toISOString().split('T')[0],
                    totalActions: 0,
                    phone: adminFormPhone,
                    joinedDate: new Date().toISOString().split('T')[0],
                    password: generatedPassword, // Store password for dummy email preview
                    requiresReset: true, // Force reset on first login
                  };
                  setNewlyCreatedAdminPassword(generatedPassword);
                  setShowTemporaryPasswordPopup(true);
                  setAdmins(prev => [...prev, newAdmin]);
                  console.log(`Activity Log: Super Admin created new admin ${newAdmin.name} (ID: ${newAdmin.id})`);

                } else { // Edit existing admin
                  const updatedAdmin = {
                    ...selectedAdmin,
                    name: adminFormName,
                    email: adminFormEmail,
                    phone: adminFormPhone,
                    role: adminFormRole,
                    department: adminFormDepartment,
                  };

                  // Handle password change if new passwords are provided
                  if (newAdminPassword && newAdminPassword === confirmNewAdminPassword) {
                    updatedAdmin.password = newAdminPassword; // Update password
                    updatedAdmin.lastPasswordChange = new Date().toISOString().split('T')[0];
                    updatedAdmin.requiresReset = true; // Force reset after manual change
                    console.log(`Activity Log: Super Admin changed password for admin ${updatedAdmin.name} (ID: ${updatedAdmin.id})`);
                  } else if (newAdminPassword && newAdminPassword !== confirmNewAdminPassword) {
                    setPasswordError('New passwords do not match.');
                    return;
                  }

                  setAdmins(prev => prev.map(admin => admin.id === selectedAdmin.id ? updatedAdmin : admin));
                  alert('Admin updated successfully!');
                  console.log(`Activity Log: Super Admin updated admin ${updatedAdmin.name} (ID: ${updatedAdmin.id})`);
                }
                
                setShowAddModal(false);
                setSelectedAdmin(null);
                setNewAdminPassword('');
                setConfirmNewAdminPassword('');
                // Reset form fields
                setAdminFormName('');
                setAdminFormEmail('');
                setAdminFormPhone('');
                setAdminFormRole('Viewer');
                setAdminFormDepartment('');
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={adminFormName}
                    onChange={(e) => setAdminFormName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={adminFormEmail}
                    onChange={(e) => setAdminFormEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="admin@natioid.gov.ng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={adminFormPhone}
                    onChange={(e) => setAdminFormPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select
                    value={adminFormRole}
                    onChange={(e) => setAdminFormRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="Reviewer">Reviewer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                  <select
                    value={adminFormDepartment}
                    onChange={(e) => setAdminFormDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Department</option>
                    <option value="ID Management">ID Management</option>
                    <option value="Applications">Applications</option>
                    <option value="Complaints">Complaints</option>
                    <option value="News & Benefits">News & Benefits</option>
                    <option value="Reports">Reports</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                </div>

                {!selectedAdmin && ( // Only show password fields for new admin creation
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                      <div className="relative">
                        <input
                          type={showNewAdminPassword ? 'text' : 'password'}
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter password"
                          required
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowNewAdminPassword(!showNewAdminPassword)}
                        >
                          {showNewAdminPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmNewAdminPassword ? 'text' : 'password'}
                          value={confirmNewAdminPassword}
                          onChange={(e) => setConfirmNewAdminPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Confirm password"
                          required
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowConfirmNewAdminPassword(!showConfirmNewAdminPassword)}
                        >
                          {showConfirmNewAdminPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        </span>
                      </div>
                      {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const generatedPassword = Math.random().toString(36).slice(-10);
                        setNewAdminPassword(generatedPassword);
                        setConfirmNewAdminPassword(generatedPassword);
                        alert('Password auto-generated. Please copy it securely.');
                      }}
                      className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Auto-generate Password
                    </button>
                  </>
                )}

                {selectedAdmin && ( // Only show change password section for editing existing admin
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Change Admin Password</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewAdminPassword ? 'text' : 'password'}
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter new password"
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowNewAdminPassword(!showNewAdminPassword)}
                        >
                          {showNewAdminPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmNewAdminPassword ? 'text' : 'password'}
                          value={confirmNewAdminPassword}
                          onChange={(e) => setConfirmNewAdminPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Confirm new password"
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowConfirmNewAdminPassword(!showConfirmNewAdminPassword)}
                        >
                          {showConfirmNewAdminPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        </span>
                      </div>
                      {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedAdmin(null);
                      setNewAdminPassword('');
                      setConfirmNewAdminPassword('');
                      setPasswordError('');
                    }}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 dark:bg-[#ECBE07] text-white dark:text-black py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-[#D4AA06] transition-colors"
                  >
                    {selectedAdmin ? 'Update Admin' : 'Create Admin'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Temporary Password Popup */}
        {showTemporaryPasswordPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Admin Account Created!</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Admin account created successfully. Here is the temporary password:
              </p>
              <div className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 mb-4">
                <input
                  type="text"
                  value={newlyCreatedAdminPassword}
                  readOnly
                  className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(newlyCreatedAdminPassword);
                    alert('Temporary password copied to clipboard!');
                  }}
                  className="absolute right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  title="Copy password"
                >
                  <Clipboard className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Instruction: "Share this securely. It will not be shown again."
              </p>

              {/* Dummy Email Preview */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 mt-4">
                <h3 className="text-md font-semibold text-gray-800 dark:text-white flex items-center mb-2">
                  <Mail className="h-4 w-4 mr-2" /> Email Preview (Dummy)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Subject: Welcome to NatioID Admin Portal - Your New Account
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Dear New Admin,
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your account for the NatioID Admin Portal has been created.
                  Your temporary password is: <span className="font-bold">{newlyCreatedAdminPassword}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Please log in using this temporary password. You will be prompted to change it upon your first login.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  For security reasons, please do not share this password.
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowTemporaryPasswordPopup(false)}
                  className="bg-red-600 dark:bg-[#ECBE07] text-white dark:text-black px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-[#D4AA06] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{admins.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {admins.filter(a => a.status === 'Active').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Suspended</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {admins.filter(a => a.status === 'Suspended').length}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Actions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {admins.reduce((sum, admin) => sum + admin.totalActions, 0).toLocaleString()}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
