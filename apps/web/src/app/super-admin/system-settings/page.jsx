'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Settings, 
  Palette,
  Image,
  Plus,
  Save,
  Trash2,
  Edit3,
  Upload,
  CheckCircle,
  AlertTriangle,
  Globe,
  Bell,
  Lock,
  Database,
  Mail,
  Smartphone
} from 'lucide-react';

export default function SystemSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [settings, setSettings] = useState({
    branding: {
      primaryColor: '#DC2626',
      secondaryColor: '#1F2937',
      logoUrl: '/logo.jpg',
      systemName: 'NatioID',
      tagline: 'Digital Identity for All Countrys'
    },
    registration: {
      requireEmailVerification: true,
      requirePhoneVerification: true,
      requireDocumentUpload: true,
      autoApproveApplications: false,
      mandatoryFields: ['fullName', 'dateOfBirth', 'nin', 'address'],
      optionalFields: ['middleName', 'occupation', 'emergencyContact']
    },
    categories: {
      newsCategories: ['Government', 'Health', 'Education', 'Infrastructure', 'Economy'],
      benefitCategories: ['Social Welfare', 'Healthcare', 'Education', 'Employment', 'Housing'],
      applicationTypes: ['National ID', 'Voter Card', 'Driver License', 'Passport', 'Health Insurance']
    },
    notifications: {
      enableEmailNotifications: true,
      enableSmsNotifications: true,
      enablePushNotifications: true,
      notificationFrequency: 'immediate',
      maintenanceAlerts: true
    },
    security: {
      sessionTimeout: 10,
      maxLoginAttempts: 5,
      passwordComplexity: 'high',
      twoFactorRequired: false,
      ipWhitelist: ['192.168.1.0/24']
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    // Dummy API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Dummy API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1500);
  };

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleArrayFieldChange = (category, field, index, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: prev[category][field].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const handleAddArrayItem = (category, field, newItem) => {
    if (newItem.trim()) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: [...prev[category][field], newItem.trim()]
        }
      }));
    }
  };

  const handleRemoveArrayItem = (category, field, index) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: prev[category][field].filter((_, i) => i !== index)
      }
    }));
  };

  const tabs = [
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'registration', name: 'Registration', icon: Database },
    { id: 'categories', name: 'Categories', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock }
  ];

  const renderBrandingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.branding.primaryColor}
              onChange={(e) => handleSettingChange('branding', 'primaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={settings.branding.primaryColor}
              onChange={(e) => handleSettingChange('branding', 'primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="#DC2626"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.branding.secondaryColor}
              onChange={(e) => handleSettingChange('branding', 'secondaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={settings.branding.secondaryColor}
              onChange={(e) => handleSettingChange('branding', 'secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="#1F2937"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
        <input
          type="text"
          value={settings.branding.systemName}
          onChange={(e) => handleSettingChange('branding', 'systemName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="NatioID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">System Tagline</label>
        <input
          type="text"
          value={settings.branding.tagline}
          onChange={(e) => handleSettingChange('branding', 'tagline', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Digital Identity for All Countrys"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">System Logo</label>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
            <Image className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Logo
            </button>
            <p className="text-sm text-gray-500 mt-1">Recommended: 200x200px, PNG format</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Preview</h4>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: settings.branding.primaryColor }}
            >
              N
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{settings.branding.systemName}</h3>
              <p className="text-sm text-gray-600">{settings.branding.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegistrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Verification Requirements</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.registration.requireEmailVerification}
              onChange={(e) => handleSettingChange('registration', 'requireEmailVerification', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require email verification</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.registration.requirePhoneVerification}
              onChange={(e) => handleSettingChange('registration', 'requirePhoneVerification', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require phone verification</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.registration.requireDocumentUpload}
              onChange={(e) => handleSettingChange('registration', 'requireDocumentUpload', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require document upload</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.registration.autoApproveApplications}
              onChange={(e) => handleSettingChange('registration', 'autoApproveApplications', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Auto-approve applications</span>
          </label>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Required Fields</h4>
          <div className="space-y-2">
            {['fullName', 'dateOfBirth', 'nin', 'address', 'phone', 'email'].map((field) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.registration.mandatoryFields.includes(field)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleSettingChange('registration', 'mandatoryFields', [...settings.registration.mandatoryFields, field]);
                    } else {
                      handleSettingChange('registration', 'mandatoryFields', settings.registration.mandatoryFields.filter(f => f !== field));
                    }
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoriesSettings = () => (
    <div className="space-y-8">
      {Object.entries(settings.categories).map(([categoryType, items]) => (
        <div key={categoryType}>
          <h4 className="font-medium text-gray-900 mb-4 capitalize">
            {categoryType.replace(/([A-Z])/g, ' $1')}
          </h4>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayFieldChange('categories', categoryType, index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={() => handleRemoveArrayItem('categories', categoryType, index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <button
              onClick={() => {
                const newItem = prompt(`Add new ${categoryType.slice(0, -10)}:`);
                if (newItem) handleAddArrayItem('categories', categoryType, newItem);
              }}
              className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {categoryType.slice(0, -10)}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Notification Channels</h4>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.enableEmailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'enableEmailNotifications', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <Mail className="h-4 w-4 ml-2 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Email notifications</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.enableSmsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'enableSmsNotifications', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <Smartphone className="h-4 w-4 ml-2 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">SMS notifications</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.enablePushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'enablePushNotifications', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <Bell className="h-4 w-4 ml-2 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Push notifications</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.maintenanceAlerts}
              onChange={(e) => handleSettingChange('notifications', 'maintenanceAlerts', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <AlertTriangle className="h-4 w-4 ml-2 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Maintenance alerts</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
          <select
            value={settings.notifications.notificationFrequency}
            onChange={(e) => handleSettingChange('notifications', 'notificationFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly digest</option>
            <option value="daily">Daily digest</option>
            <option value="weekly">Weekly digest</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            min="1"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            min="3"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Complexity</label>
          <select
            value={settings.security.passwordComplexity}
            onChange={(e) => handleSettingChange('security', 'passwordComplexity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="low">Low (8+ characters)</option>
            <option value="medium">Medium (8+ chars, numbers)</option>
            <option value="high">High (8+ chars, numbers, symbols)</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.twoFactorRequired}
              onChange={(e) => handleSettingChange('security', 'twoFactorRequired', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require 2FA for all admins</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'branding': return renderBrandingSettings();
      case 'registration': return renderRegistrationSettings();
      case 'categories': return renderCategoriesSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading system settings...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            </div>
            <p className="text-gray-600">Configure global system settings and preferences</p>
          </div>
          
          <button 
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">Settings saved successfully!</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h3 className="text-yellow-800 font-medium">Important Notice</h3>
              <p className="text-yellow-700 text-sm mt-1">
                Changes to system settings will affect all users and admin accounts. 
                Please review all settings carefully before saving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
