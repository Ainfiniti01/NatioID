'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Using react-router-dom for routing
import { Key, Lock, CheckCircle } from 'lucide-react';

export default function AdminChangePasswordPage() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('temporary_password_dummy'); // Prefilled dummy
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    if (!newPassword) {
      setPasswordError('New password cannot be empty.');
      return;
    }
    setPasswordError('');
    // Simulate password change API call
    alert('Password changed successfully! Redirecting to dashboard.');
    console.log(`Activity Log: Admin changed their password.`);
    navigate('/dashboard'); // Redirect to dashboard after successful change
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Lock className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Your Password</h1>
        <p className="text-gray-600 mb-6">
          It looks like you're logging in with a temporary password. Please set a new password to continue.
        </p>

        <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 cursor-not-allowed"
              disabled // Old password is prefilled and not editable for this scenario
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter new password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm new password"
              required
            />
            {passwordError && <p className="text-red-500 text-xs mt-1 text-left">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center mt-6"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
