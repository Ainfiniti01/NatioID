'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  EyeOff,
  Lock,
  User,
  Smartphone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function SuperAdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: credentials, 2: 2FA
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [ipRestrictionWarning, setIpRestrictionWarning] = useState(false);

  // ✅ DUMMY LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      if (formData.email === 'superadmin@example.com' && formData.password === 'super123') {
        setStep(2); // Proceed to 2FA step
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  // ✅ DUMMY 2FA HANDLER
  const handleTwoFactorAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate 2FA check
    setTimeout(() => {
      if (formData.twoFactorCode === '123456') {
        window.location.href = '/super-admin/dashboard'; // Redirect to dashboard
      } else {
        setError('Invalid 2FA code. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Super Admin Portal</h1>
          <p className="text-gray-400">NatioID System Administration</p>
        </div>

        {/* IP Restriction Warning */}
        {ipRestrictionWarning && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-red-300 font-medium">IP Access Restricted</h3>
                <p className="text-red-400 text-sm mt-1">
                  Your IP address is not authorized for Super Admin access. Contact system administrator.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          {step === 1 ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Secure Authentication</h2>
                <p className="text-gray-400 text-sm">Enter your super admin credentials</p>
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="superadmin@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your secure password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Continue to 2FA'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleTwoFactorAuth} className="space-y-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Two-Factor Authentication</h2>
                <p className="text-gray-400 text-sm">Enter the 6-digit code from your authenticator app</p>
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Authentication Code
                </label>
                <input
                  type="text"
                  value={formData.twoFactorCode}
                  onChange={(e) =>
                    handleInputChange('twoFactorCode', e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-2xl font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || formData.twoFactorCode.length !== 6}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Access Dashboard'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-300 text-sm font-medium">Secure Connection</p>
                <p className="text-gray-400 text-xs mt-1">
                  All communications are encrypted and monitored for security.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Unauthorized access attempts are logged and reported.
            <br />
            For assistance, contact: <span className="text-red-400">security@natioid.gov.ng</span>
          </p>
        </div>
      </div>
    </div>
  );
}
