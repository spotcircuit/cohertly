import Layout from '../components/Layout';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaEdit, FaSave, FaTimes, FaCamera, FaCog } from 'react-icons/fa';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'Chicago, IL',
    bio: 'Financial advisor with 8+ years of experience specializing in retirement planning and wealth management. Passionate about helping clients achieve their financial goals through personalized strategies.',
    expertise: ['Retirement Planning', 'Tax Planning', 'Estate Planning', 'Investment Management'],
    company: 'Financial Partners LLC',
    position: 'Senior Financial Advisor',
    joinDate: 'January 2020'
  });

  const [editFormData, setEditFormData] = useState({...profileData});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSave = () => {
    setProfileData(editFormData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditFormData({...profileData});
    setIsEditing(false);
  };

  // Stats data
  const stats = [
    { label: 'Referrals Sent', value: 42 },
    { label: 'Referrals Received', value: 28 },
    { label: 'Conversion Rate', value: '68%' },
    { label: 'Avg. Response Time', value: '1.2 days' },
    { label: 'Revenue Generated', value: '$24,850' },
    { label: 'Client Retention', value: '92%' }
  ];

  // Mock referees data
  const referees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Financial Advisor',
      company: 'Wealth Partners LLC',
      referrals: 8,
      conversion: '75%',
      lastActive: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Tax Specialist',
      company: 'Chen Tax Group',
      referrals: 6,
      conversion: '83%',
      lastActive: '5 days ago'
    },
    {
      id: 3,
      name: 'Jessica Williams',
      position: 'Estate Attorney',
      company: 'Williams & Associates',
      referrals: 5,
      conversion: '60%',
      lastActive: '1 week ago'
    }
  ];

  // Performance metrics
  const performanceMetrics = [
    { label: 'Referral Quality Score', value: 8.7, change: +0.5, maxValue: 10 },
    { label: 'Network Growth Rate', value: 15, change: +3, maxValue: 100, suffix: '%' },
    { label: 'Partner Satisfaction', value: 4.8, change: +0.2, maxValue: 5 }
  ];

  return (
    <Layout>
      {/* Settings Button */}
      <div className="flex justify-end mb-4">
        <Link href="/settings" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          <FaCog /> Settings
        </Link>
      </div>

      {/* Hero Section with SVG Banner */}
      <div className="relative w-full overflow-hidden h-[225px] rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        {/* SVG Pattern Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1200 300">
            {/* Abstract Wave Pattern */}
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="rgba(255, 255, 255, 0.1)" />
            
            {/* Circles */}
            <circle cx="100" cy="50" r="15" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="200" cy="80" r="10" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="300" cy="40" r="20" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="500" cy="70" r="15" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="700" cy="30" r="10" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="900" cy="60" r="20" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="1100" cy="50" r="15" fill="rgba(255, 255, 255, 0.1)" />
            
            {/* Connection Lines */}
            <path d="M100,50 L200,80" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <path d="M200,80 L300,40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <path d="M300,40 L500,70" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <path d="M500,70 L700,30" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <path d="M700,30 L900,60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <path d="M900,60 L1100,50" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            
            {/* Decorative Elements */}
            <path d="M0,100 Q300,150 600,100 T1200,100" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            <path d="M0,150 Q300,200 600,150 T1200,150" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-white rounded-full opacity-40 animate-pulse delay-150"></div>
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse delay-300"></div>
          <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse delay-500"></div>
          <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-white rounded-full opacity-30 animate-pulse delay-700"></div>
        </div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex items-end">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image 
                src="/images/profile.jpg" 
                alt="Profile" 
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            {!isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-md hover:bg-blue-700 transition-colors">
                <FaCamera size={14} />
              </button>
            )}
          </div>
          
          <div className="ml-4 text-white">
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-white/80 flex items-center gap-1">
              <FaBriefcase className="text-xs" /> {profileData.position} at {profileData.company}
            </p>
          </div>
          
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="ml-auto bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
              <FaUser className="text-blue-500" /> Profile Information
            </h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleInputChange}
                      className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleInputChange}
                      className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={editFormData.company}
                      onChange={handleInputChange}
                      className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={editFormData.position}
                      onChange={handleInputChange}
                      className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={editFormData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-end gap-2 mt-4">
                  <button 
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 flex items-center gap-1"
                  >
                    <FaTimes size={14} /> Cancel
                  </button>
                  
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
                  >
                    <FaSave size={14} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaEnvelope className="text-blue-500" /> {profileData.email}
                    </div>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaPhone className="text-blue-500" /> {profileData.phone}
                    </div>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaMapMarkerAlt className="text-blue-500" /> {profileData.location}
                    </div>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1">Member Since</div>
                    <div className="flex items-center gap-2 text-gray-700">
                      {profileData.joinDate}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/50 p-4 rounded-lg border border-blue-100 mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Bio</div>
                  <p className="text-gray-600 text-sm">{profileData.bio}</p>
                </div>
                
                <div className="bg-white/50 p-4 rounded-lg border border-blue-100 mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Areas of Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.expertise.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats and Activity */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg mb-6">
            <h2 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Performance Stats
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/70 p-3 rounded-lg border border-indigo-100">
                  <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-indigo-700">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 text-indigo-700">Recent Activity</h3>
              <div className="space-y-3">
                <div className="bg-white/70 p-3 rounded-lg border border-indigo-100">
                  <div className="text-xs text-gray-500">Today</div>
                  <div className="text-sm text-gray-700">Sent a referral to <span className="font-medium">Sarah Williams</span></div>
                </div>
                <div className="bg-white/70 p-3 rounded-lg border border-indigo-100">
                  <div className="text-xs text-gray-500">Yesterday</div>
                  <div className="text-sm text-gray-700">Received a referral from <span className="font-medium">Michael Chen</span></div>
                </div>
                <div className="bg-white/70 p-3 rounded-lg border border-indigo-100">
                  <div className="text-xs text-gray-500">May 5, 2025</div>
                  <div className="text-sm text-gray-700">Completed profile information</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Performance Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">{metric.label}</h3>
                <div className={`flex items-center text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {Math.abs(metric.change)}{metric.suffix || ''}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {metric.value}{metric.suffix || ''}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Referees */}
      <div className="glass-card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Top Referees
          </h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {referees.map(referee => (
            <div key={referee.id} className="bg-white rounded-lg border border-indigo-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-indigo-100">
                <h3 className="text-lg font-medium text-gray-800">{referee.name}</h3>
                <p className="text-sm text-gray-600">{referee.position}</p>
                <p className="text-xs text-gray-500">{referee.company}</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Referrals</p>
                    <p className="text-sm font-medium text-gray-800">{referee.referrals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Conversion</p>
                    <p className="text-sm font-medium text-gray-800">{referee.conversion}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Last active: {referee.lastActive}</p>
                  <button className="text-xs text-indigo-600 hover:text-indigo-800">Contact</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Referral History */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Recent Referrals
        </h2>
        
        <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              <tr className="hover:bg-blue-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">John Smith</div>
                    <div className="text-xs text-gray-500">To: Sarah Johnson</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-700">Tax Planning</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Converted
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  May 5, 2025
                </td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                    <div className="text-xs text-gray-500">From: Sarah Williams</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-700">Tax Planning</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Converted
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  May 2, 2025
                </td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">Emily Davis</div>
                    <div className="text-xs text-gray-500">To: Michael Chen</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-700">Estate Planning</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  May 3, 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
            View All Referrals →
          </button>
        </div>
      </div>
    </Layout>
  );
}
