'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { 
  Shield, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  Clock, 
  Edit3, 
  Key,
  RefreshCw,
  UserCheck,
  UserX,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Clipboard
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router'; // Using react-router for routing


export default function AdminDetailPage() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const adminId = params.id; // Get admin ID from URL
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState(''); // This will now hold the generated temp password
  const [confirmPassword, setConfirmPassword] = useState(''); // Not used for reset, but keeping for consistency if needed elsewhere
  const [passwordError, setPasswordError] = useState(''); // Still useful for other password-related errors
  const [showNewPassword, setShowNewPassword] = useState(false); // Still useful for displaying generated password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Not used for reset
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [editAdminData, setEditAdminData] = useState(null);
  const [generatedTempPassword, setGeneratedTempPassword] = useState(''); // New state for generated password
  const [forcePasswordReset, setForcePasswordReset] = useState(true); // New state for force reset toggle

  useEffect(() => {
    // Simulate fetching admin details based on adminId
    setTimeout(() => {
      // Dummy admin data (replace with actual fetch logic)
      const dummyAdmins = [
        {
          id: '1',
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
          id: '2',
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
        // Add more dummy admins as needed
      ];
      const foundAdmin = dummyAdmins.find(a => a.id === adminId);
      setAdmin(foundAdmin);
      setIsLoading(false);
    }, 500);
  }, [adminId]);

  const handleResetPassword = () => {
    const tempPassword = Math.random().toString(36).slice(-10); // Generate a new temporary password
    setGeneratedTempPassword(tempPassword);
    setNewPassword(tempPassword); // Store in newPassword for display purposes
    setConfirmPassword(tempPassword); // For consistency, though not used for validation here
    setPasswordError('');
    setForcePasswordReset(true); // Default to force reset
    setShowResetPasswordModal(true);
  };

  const handlePasswordResetConfirm = () => {
    // Simulate password reset API call
    alert(`Password for ${admin.name} reset successfully to: ${generatedTempPassword}. Force reset on next login: ${forcePasswordReset ? 'Yes' : 'No'}`);
    // In a real app, update admin's password and force_reset_on_next_login status via API
    setAdmin(prev => ({
      ...prev,
      lastPasswordChange: new Date().toISOString().split('T')[0], // Dummy date
      requiresReset: forcePasswordReset,
    }));
    console.log(`Activity Log: Super Admin reset password for Admin ${admin.name} (ID: ${admin.id})`);
    setShowResetPasswordModal(false);
    setGeneratedTempPassword('');
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedTempPassword);
    alert('Temporary password copied to clipboard!');
  };

  const handleEditAdmin = (adminToEdit) => {
    setEditAdminData(adminToEdit);
    setShowEditAdminModal(true);
    setShowActionMenu(null); // Close action menu if open
  };

  const handleSaveEditedAdmin = (e) => {
    e.preventDefault();
    // Simulate saving edited admin details
    alert(`Admin ${editAdminData.name} updated successfully!`);
    setShowEditAdminModal(false);
    setEditAdminData(null);
    // In a real app, you would update the admin state or refetch admins
    setAdmin(editAdminData); // Update local admin state for demo
  };

  const handleAutoGeneratePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-10); // Simple dummy password
    setNewPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
    alert('Password auto-generated. Please copy it securely.');
  };

  const handleSuspendAdmin = () => {
    if (window.confirm(`Are you sure you want to suspend ${admin.name}? They will lose access immediately.`)) {
      alert(`${admin.name} suspended.`);
      // In a real app, update admin status via API
      setAdmin(prev => ({ ...prev, status: 'Suspended' }));
    }
  };

  const handleReactivateAdmin = () => {
    if (window.confirm(`Are you sure you want to reactivate ${admin.name}?`)) {
      alert(`${admin.name} reactivated.`);
      // In a real app, update admin status via API
      setAdmin(prev => ({ ...prev, status: 'Active' }));
    }
  };

  const handleDeleteAdmin = () => {
    if (window.confirm(`Are you sure you want to delete ${admin.name}? This action cannot be undone.`)) {
      alert(`${admin.name} deleted.`);
      // In a real app, delete admin via API and navigate back
      navigate('/super-admin/admin-accounts');
    }
  };

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
          <p className="text-gray-600 dark:text-gray-300">Loading admin details...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <UserX className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Admin Not Found</h3>
          <p className="text-gray-500 dark:text-gray-400">The requested admin account could not be found.</p>
          <button
            onClick={() => navigate('/super-admin/admin-accounts')}
            className="mt-6 bg-red-600 dark:bg-[#ECBE07] text-white dark:text-black px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-[#D4AA06] transition-colors"
          >
            Go to Admin Accounts
          </button>
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Details: {admin.name}</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Detailed view and management for {admin.name}</p>
          </div>
          
          <div className="flex space-x-3">
            
            <button 
               onClick={() => {
                handleEditAdmin(admin);
                setShowActionMenu(null);
              }}
              className="bg-blue-600 dark:bg-[#ECBE07] text-white dark:text-black px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-[#D4AA06] flex items-center transition-colors"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Admin
            </button>
            <button 
              onClick={handleResetPassword}
              className="bg-orange-600 dark:bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 flex items-center transition-colors"
            >
              <Key className="h-4 w-4 mr-2" />
              Reset Password
            </button>
            {admin.status === 'Active' ? (
              <button
                onClick={handleSuspendAdmin}
                className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 flex items-center transition-colors"
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspend Admin
              </button>
            ) : (
              <button
                onClick={handleReactivateAdmin}
                className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 flex items-center transition-colors"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Reactivate Admin
              </button>
            )}
            <button
              onClick={handleDeleteAdmin}
              className="bg-gray-600 dark:bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Admin
            </button>
          </div>
        </div>

        {/* Admin Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Admin Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Full Name:</span> {admin.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Email:</span> {admin.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Phone:</span> {admin.phone}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Briefcase className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Department:</span> {admin.department}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Shield className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Role:</span> 
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(admin.role)}`}>
                  {admin.role}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <CheckCircle className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Status:</span> 
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(admin.status)}`}>
                  {admin.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Joined:</span> {admin.joinedDate}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Last Login:</span> {admin.lastLogin}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Joined:</span> {admin.joinedDate}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Last Login:</span> {admin.lastLogin}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
                <Key className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Password Status:</span>
                <span className="ml-2">
                  {admin.lastPasswordChange ? `Last changed: ${admin.lastPasswordChange}` : 'Never changed'}
                  {admin.requiresReset && <span className="ml-2 text-orange-600 dark:text-orange-400">(Requires reset on next login)</span>}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Admin Activity Summary (Placeholder) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Activity Summary</h2>
          <p className="text-gray-600 dark:text-gray-300">Total actions performed: <span className="font-bold">{admin.totalActions}</span></p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Detailed activity logs can be viewed in the{" "}
            <button 
              onClick={() => navigate('/super-admin/activity-logs')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Activity Logs
            </button>{" "}section.
          </p>
        </div>

        {/* Reset Password Modal */}
        {showResetPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reset Password for {admin.name}</h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  A new temporary password has been generated. Please share it securely with the admin.
                </p>
                <div className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={generatedTempPassword}
                    readOnly
                    className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-mono pr-10"
                  />
                  <span
                    className="absolute right-10 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="absolute right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    title="Copy password"
                  >
                    <Clipboard className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="forceReset"
                    checked={forcePasswordReset}
                    onChange={(e) => setForcePasswordReset(e.target.checked)}
                    className="h-4 w-4 text-red-600 dark:text-[#ECBE07] focus:ring-red-500 dark:focus:ring-[#ECBE07] border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="forceReset" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Force password reset on next login
                  </label>
                </div>

                {/* Dummy Email Preview */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 mt-4">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2" /> Email Preview (Dummy)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subject: Your Password Has Been Reset
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Dear {admin.name},
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your password for the NatioID Admin Portal has been reset by a Super Admin.
                    Your temporary password is: <span className="font-bold">{generatedTempPassword}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Please log in using this temporary password. {forcePasswordReset && "You will be prompted to change it upon your first login."}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    For security reasons, please do not share this password.
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowResetPasswordModal(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePasswordResetConfirm}
                    className="flex-1 bg-red-600 dark:bg-[#ECBE07] text-white dark:text-black py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-[#D4AA06] transition-colors"
                  >
                    Confirm Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Admin Modal */}
        {showEditAdminModal && editAdminData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Edit Admin: {editAdminData.name}</h2>
              <form className="space-y-4" onSubmit={handleSaveEditedAdmin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editAdminData.name}
                    onChange={(e) => setEditAdminData({ ...editAdminData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editAdminData.email}
                    onChange={(e) => setEditAdminData({ ...editAdminData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="admin@natioid.gov.ng"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editAdminData.phone}
                    onChange={(e) => setEditAdminData({ ...editAdminData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-[#ECBE07] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select
                    value={editAdminData.role}
                    onChange={(e) => setEditAdminData({ ...editAdminData, role: e.target.value })}
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
                    value={editAdminData.department}
                    onChange={(e) => setEditAdminData({ ...editAdminData, department: e.target.value })}
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
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditAdminModal(false);
                      setEditAdminData(null);
                    }}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 dark:bg-[#ECBE07] text-white dark:text-black py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-[#D4AA06] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
