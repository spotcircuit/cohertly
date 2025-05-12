import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCog, FaBell, FaLock, FaUser, FaEnvelope, FaPalette, 
  FaShieldAlt, FaExchangeAlt, FaGlobe, FaDesktop, FaMobile,
  FaToggleOn, FaToggleOff, FaSave, FaTrash, FaCheck, FaTimes,
  FaEye, FaEyeSlash, FaInfoCircle, FaQuestionCircle, FaEdit
} from 'react-icons/fa';

const Settings = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('account');
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    jobTitle: 'Financial Advisor',
    company: 'Smith Financial Services',
    bio: 'Experienced financial advisor specializing in retirement planning and wealth management.'
  });
  
  interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    newReferrals: boolean;
    statusChanges: boolean;
    networkActivity: boolean;
    marketingEmails: boolean;
    digest: string;
    [key: string]: boolean | string;
  }

  interface PrivacySettings {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowDataSharing: boolean;
    allowAnalytics: boolean;
    [key: string]: boolean | string;
  }

  interface AppearanceSettings {
    theme: string;
    density: string;
    fontSize: string;
    animations: boolean;
    [key: string]: boolean | string;
  }

  interface ReferralSettings {
    autoFollowUp: boolean;
    followUpDays: number;
    defaultService: string;
    notifyPartners: boolean;
    autoArchive: number;
    [key: string]: boolean | string | number;
  }

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    newReferrals: true,
    statusChanges: true,
    networkActivity: false,
    marketingEmails: false,
    digest: 'daily'
  });
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'network',
    showEmail: true,
    showPhone: false,
    allowDataSharing: true,
    allowAnalytics: true
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: 'light',
    density: 'comfortable',
    fontSize: 'medium',
    animations: true
  });
  
  const [referralSettings, setReferralSettings] = useState<ReferralSettings>({
    autoFollowUp: true,
    followUpDays: 3,
    defaultService: 'financial-planning',
    notifyPartners: true,
    autoArchive: 30
  });
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle notification change
  const handleNotificationChange = (setting: string, value: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  // Handle privacy toggle
  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Handle appearance change
  const handleAppearanceChange = (setting: string, value: string | boolean) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  // Handle referral settings change
  const handleReferralSettingChange = (setting: string, value: string | number | boolean) => {
    setReferralSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
                <Link href="/profile" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-700">
                    {profileForm.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-700">
                    {profileForm.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-700">
                    {profileForm.phone}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-700">
                    {profileForm.jobTitle}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-700">
                    {profileForm.company}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-700 min-h-[72px]">
                    {profileForm.bio}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Password & Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <FaLock /> Update Password
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Enhance your account security by enabling two-factor authentication.</p>
                  <p className="text-sm text-gray-500 mt-1">You'll be asked for a verification code when signing in from a new device.</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <FaShieldAlt /> Enable 2FA
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Permanently delete your account and all associated data.</p>
                  <p className="text-sm text-gray-500 mt-1">This action cannot be undone. Please be certain.</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Channels</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FaEnvelope className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('emailNotifications')}
                    className={`p-1 rounded-full ${notificationSettings.emailNotifications ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {notificationSettings.emailNotifications ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <FaBell className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('pushNotifications')}
                    className={`p-1 rounded-full ${notificationSettings.pushNotifications ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {notificationSettings.pushNotifications ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Types</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">New Referrals</p>
                  <button 
                    onClick={() => handleNotificationToggle('newReferrals')}
                    className={`p-1 rounded-full ${notificationSettings.newReferrals ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {notificationSettings.newReferrals ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Status Changes</p>
                  <button 
                    onClick={() => handleNotificationToggle('statusChanges')}
                    className={`p-1 rounded-full ${notificationSettings.statusChanges ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {notificationSettings.statusChanges ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Network Activity</p>
                  <button 
                    onClick={() => handleNotificationToggle('networkActivity')}
                    className={`p-1 rounded-full ${notificationSettings.networkActivity ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {notificationSettings.networkActivity ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Marketing Emails</p>
                  <button 
                    onClick={() => handleNotificationToggle('marketingEmails')}
                    className={`p-1 rounded-full ${notificationSettings.marketingEmails ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {notificationSettings.marketingEmails ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Frequency</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={notificationSettings.digest === 'immediate'} 
                    onChange={() => handleNotificationChange('digest', 'immediate')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Immediate - Send notifications as they happen</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={notificationSettings.digest === 'daily'} 
                    onChange={() => handleNotificationChange('digest', 'daily')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Daily Digest - Send a summary once per day</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={notificationSettings.digest === 'weekly'} 
                    onChange={() => handleNotificationChange('digest', 'weekly')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Weekly Digest - Send a summary once per week</span>
                </label>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FaSave /> Save Preferences
              </button>
            </div>
          </div>
        );
        
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Visibility</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={privacySettings.profileVisibility === 'public'} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrivacySettings(prev => ({...prev, profileVisibility: 'public'}))}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Public - Visible to everyone</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={privacySettings.profileVisibility === 'network'} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrivacySettings(prev => ({...prev, profileVisibility: 'network'}))}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Network Only - Visible to your connections</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={privacySettings.profileVisibility === 'private'} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrivacySettings(prev => ({...prev, profileVisibility: 'private'}))}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Private - Visible only to you</span>
                </label>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Show Email Address</p>
                    <p className="text-xs text-gray-500">Allow others to see your email address</p>
                  </div>
                  <button 
                    onClick={() => handlePrivacyToggle('showEmail')}
                    className={`p-1 rounded-full ${privacySettings.showEmail ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {privacySettings.showEmail ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Show Phone Number</p>
                    <p className="text-xs text-gray-500">Allow others to see your phone number</p>
                  </div>
                  <button 
                    onClick={() => handlePrivacyToggle('showPhone')}
                    className={`p-1 rounded-full ${privacySettings.showPhone ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {privacySettings.showPhone ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Data & Analytics</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Allow Data Sharing</p>
                    <p className="text-xs text-gray-500">Share anonymized data with partners to improve services</p>
                  </div>
                  <button 
                    onClick={() => handlePrivacyToggle('allowDataSharing')}
                    className={`p-1 rounded-full ${privacySettings.allowDataSharing ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {privacySettings.allowDataSharing ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Allow Analytics</p>
                    <p className="text-xs text-gray-500">Allow us to collect usage data to improve your experience</p>
                  </div>
                  <button 
                    onClick={() => handlePrivacyToggle('allowAnalytics')}
                    className={`p-1 rounded-full ${privacySettings.allowAnalytics ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {privacySettings.allowAnalytics ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FaSave /> Save Privacy Settings
              </button>
            </div>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Theme</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('theme', 'light')}
                >
                  <div className="h-24 bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                    <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Light</span>
                    {appearanceSettings.theme === 'light' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('theme', 'dark')}
                >
                  <div className="h-24 bg-gray-800 border border-gray-700 rounded-md mb-2 flex items-center justify-center">
                    <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Dark</span>
                    {appearanceSettings.theme === 'dark' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('theme', 'system')}
                >
                  <div className="h-24 bg-gradient-to-r from-white to-gray-800 border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                    <div className="w-1/2 h-4 bg-gradient-to-r from-gray-200 to-gray-600 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">System</span>
                    {appearanceSettings.theme === 'system' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Display Density</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.density === 'comfortable' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('density', 'comfortable')}
                >
                  <div className="space-y-3 mb-2">
                    <div className="h-6 bg-gray-100 rounded"></div>
                    <div className="h-6 bg-gray-100 rounded"></div>
                    <div className="h-6 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Comfortable</span>
                    {appearanceSettings.density === 'comfortable' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.density === 'compact' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('density', 'compact')}
                >
                  <div className="space-y-1 mb-2">
                    <div className="h-5 bg-gray-100 rounded"></div>
                    <div className="h-5 bg-gray-100 rounded"></div>
                    <div className="h-5 bg-gray-100 rounded"></div>
                    <div className="h-5 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Compact</span>
                    {appearanceSettings.density === 'compact' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Font Size</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.fontSize === 'small' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('fontSize', 'small')}
                >
                  <div className="text-sm mb-2">Aa</div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Small</span>
                    {appearanceSettings.fontSize === 'small' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.fontSize === 'medium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('fontSize', 'medium')}
                >
                  <div className="text-base mb-2">Aa</div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Medium</span>
                    {appearanceSettings.fontSize === 'medium' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.fontSize === 'large' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('fontSize', 'large')}
                >
                  <div className="text-lg mb-2">Aa</div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Large</span>
                    {appearanceSettings.fontSize === 'large' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${appearanceSettings.fontSize === 'extra-large' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleAppearanceChange('fontSize', 'extra-large')}
                >
                  <div className="text-xl mb-2">Aa</div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Extra Large</span>
                    {appearanceSettings.fontSize === 'extra-large' && <FaCheck className="text-blue-500" />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Animations</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Enable Animations</p>
                  <p className="text-xs text-gray-500">Show animations and transitions throughout the interface</p>
                </div>
                <button 
                  onClick={() => handleAppearanceChange('animations', !appearanceSettings.animations)}
                  className={`p-1 rounded-full ${appearanceSettings.animations ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  {appearanceSettings.animations ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FaSave /> Save Appearance Settings
              </button>
            </div>
          </div>
        );
        
      case 'referrals':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Referral Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Automatic Follow-up</p>
                    <p className="text-xs text-gray-500">Send automatic follow-up reminders for referrals</p>
                  </div>
                  <button 
                    onClick={() => handleReferralSettingChange('autoFollowUp', !referralSettings.autoFollowUp)}
                    className={`p-1 rounded-full ${referralSettings.autoFollowUp ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {referralSettings.autoFollowUp ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                {referralSettings.autoFollowUp && (
                  <div className="pl-4 border-l-2 border-blue-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Days</label>
                    <select
                      value={referralSettings.followUpDays}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleReferralSettingChange('followUpDays', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">1 day</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Service Category</label>
                  <select
                    value={referralSettings.defaultService}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleReferralSettingChange('defaultService', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="financial-planning">Financial Planning</option>
                    <option value="tax-services">Tax Services</option>
                    <option value="estate-planning">Estate Planning</option>
                    <option value="retirement">Retirement Planning</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Notify Network Partners</p>
                    <p className="text-xs text-gray-500">Notify partners when you create a referral in their category</p>
                  </div>
                  <button 
                    onClick={() => handleReferralSettingChange('notifyPartners', !referralSettings.notifyPartners)}
                    className={`p-1 rounded-full ${referralSettings.notifyPartners ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {referralSettings.notifyPartners ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auto-archive Completed Referrals (days)</label>
                  <select
                    value={referralSettings.autoArchive}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleReferralSettingChange('autoArchive', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="0">Never</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FaSave /> Save Referral Settings
              </button>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-20">
              <ul>
                <li>
                  <button 
                    onClick={() => setActiveTab('account')} 
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 ${activeTab === 'account' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaUser className={activeTab === 'account' ? 'text-blue-600' : 'text-gray-500'} />
                    <span>Account Settings</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('notifications')} 
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaBell className={activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-500'} />
                    <span>Notification Preferences</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('privacy')} 
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaLock className={activeTab === 'privacy' ? 'text-blue-600' : 'text-gray-500'} />
                    <span>Privacy & Sharing</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('appearance')} 
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 ${activeTab === 'appearance' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaPalette className={activeTab === 'appearance' ? 'text-blue-600' : 'text-gray-500'} />
                    <span>Appearance</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('referrals')} 
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 ${activeTab === 'referrals' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaExchangeAlt className={activeTab === 'referrals' ? 'text-blue-600' : 'text-gray-500'} />
                    <span>Referral Settings</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
