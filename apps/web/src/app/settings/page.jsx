'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Palette, 
  Globe, 
  Users, 
  Activity,
  Mail,
  Phone,
  Server,
  Lock,
  Save,
  RotateCcw,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Moon,
  Sun,
  ArrowLeft
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'NatioID Digital Identity System',
      systemVersion: '2.1.0',
      timezone: 'Africa/Lagos',
      language: 'English',
      maintenanceMode: false,
      debugMode: false
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordComplexity: 'high',
      twoFactorAuth: true,
      apiRateLimit: 1000,
      encryptionLevel: 'AES-256'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      securityAlerts: true,
      systemUpdates: true,
      userRegistrations: false
    },
    database: {
      backupFrequency: 'daily',
      retentionPeriod: 90,
      autoBackup: true,
      compressionEnabled: true,
      encryptBackups: true,
      lastBackup: '2025-09-11T02:00:00Z'
    },
    appearance: {
      theme: 'system',
      primaryColor: '#004040',
      secondaryColor: '#ECBE07',
      compactMode: false,
      showAnimations: true
    },
    integrations: {
      externalApis: true,
      webhookUrl: 'https://api.natioid.gov.ng/webhooks',
      apiKey: 'nak_live_xxxxxxxxxxxxxxxxx',
      syncEnabled: true,
      lastSync: '2025-09-11T10:30:00Z'
    }
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load theme preference
    const theme = localStorage.getItem('adminTheme') || 'light';
    setIsDarkMode(theme === 'dark');
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, theme }
    }));
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('adminTheme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, theme: newMode ? 'dark' : 'light' }
    }));
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      setSaveStatus('reset');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'natioid-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'reset':
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <Save className="h-4 w-4" />;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'success':
        return 'Settings Saved';
      case 'reset':
        return 'Settings Reset';
      default:
        return 'Save Settings';
    }
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
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">System Settings</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Export Settings */}
              <button 
                onClick={handleExportSettings}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>

              {/* Save Button */}
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex items-center space-x-2 px-4 py-2 bg-[#004040] dark:bg-[#ECBE07] text-white dark:text-black rounded-lg hover:bg-[#003030] dark:hover:bg-[#D4AA06] disabled:opacity-50"
              >
                {getSaveStatusIcon()}
                <span>{getSaveStatusText()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#004040] dark:bg-[#ECBE07] text-white dark:text-black'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">General Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        System Name
                      </label>
                      <input
                        type="text"
                        value={settings.general.systemName}
                        onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          System Version
                        </label>
                        <input
                          type="text"
                          value={settings.general.systemVersion}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Timezone
                        </label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New_York (EST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Maintenance Mode</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Disable public access</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.general.maintenanceMode}
                            onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Debug Mode</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable detailed logging</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.general.debugMode}
                            onChange={(e) => handleSettingChange('general', 'debugMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Max Login Attempts
                        </label>
                        <input
                          type="number"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password Complexity
                      </label>
                      <select
                        value={settings.security.passwordComplexity}
                        onChange={(e) => handleSettingChange('security', 'passwordComplexity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="low">Low (8 characters)</option>
                        <option value="medium">Medium (10 characters + mixed case)</option>
                        <option value="high">High (12 characters + symbols)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Require 2FA for admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Security settings changes will affect all admin users. Please ensure proper notification before making changes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {key === 'emailNotifications' && 'Send notifications via email'}
                            {key === 'smsNotifications' && 'Send notifications via SMS'}
                            {key === 'pushNotifications' && 'Send push notifications'}
                            {key === 'securityAlerts' && 'Send security-related alerts'}
                            {key === 'systemUpdates' && 'Send system update notifications'}
                            {key === 'userRegistrations' && 'Send new user registration alerts'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Database Settings */}
              {activeTab === 'database' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Database Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={settings.database.backupFrequency}
                          onChange={(e) => handleSettingChange('database', 'backupFrequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Retention Period (days)
                        </label>
                        <input
                          type="number"
                          value={settings.database.retentionPeriod}
                          onChange={(e) => handleSettingChange('database', 'retentionPeriod', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Auto Backup</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable automatic backups</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.database.autoBackup}
                            onChange={(e) => handleSettingChange('database', 'autoBackup', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Compression</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Compress backup files</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.database.compressionEnabled}
                            onChange={(e) => handleSettingChange('database', 'compressionEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Encrypt Backups</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Encrypt backup files</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.database.encryptBackups}
                            onChange={(e) => handleSettingChange('database', 'encryptBackups', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-200">Last Backup</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            {new Date(settings.database.lastBackup).toLocaleString()}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Backup Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Theme
                      </label>
                      <select
                        value={settings.appearance.theme}
                        onChange={(e) => {
                          handleSettingChange('appearance', 'theme', e.target.value);
                          if (e.target.value !== 'system') {
                            const isDark = e.target.value === 'dark';
                            setIsDarkMode(isDark);
                            localStorage.setItem('adminTheme', e.target.value);
                            document.documentElement.classList.toggle('dark', isDark);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Primary Color
                        </label>
                        <input
                          type="color"
                          value={settings.appearance.primaryColor}
                          onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Secondary Color
                        </label>
                        <input
                          type="color"
                          value={settings.appearance.secondaryColor}
                          onChange={(e) => handleSettingChange('appearance', 'secondaryColor', e.target.value)}
                          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Compact Mode</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing and padding</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.appearance.compactMode}
                            onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Show Animations</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable UI animations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.appearance.showAnimations}
                            onChange={(e) => handleSettingChange('appearance', 'showAnimations', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integration Settings */}
              {activeTab === 'integrations' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Integration Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        value={settings.integrations.webhookUrl}
                        onChange={(e) => handleSettingChange('integrations', 'webhookUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={settings.integrations.apiKey}
                          onChange={(e) => handleSettingChange('integrations', 'apiKey', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] dark:focus:ring-[#ECBE07] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button 
                          type="button"
                          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                        >
                          <Lock className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">External APIs</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable external API access</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.integrations.externalApis}
                            onChange={(e) => handleSettingChange('integrations', 'externalApis', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Sync Enabled</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable data synchronization</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.integrations.syncEnabled}
                            onChange={(e) => handleSettingChange('integrations', 'syncEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#004040]/20 dark:peer-focus:ring-[#ECBE07]/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004040] dark:peer-checked:bg-[#ECBE07]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-900 dark:text-green-200">Last Sync</p>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {new Date(settings.integrations.lastSync).toLocaleString()}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                          Sync Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reset Settings */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last saved: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}