import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { 
  FaHandshake, FaUserFriends, FaSearch, FaBars, FaTimes, 
  FaHome, FaCalendarAlt, FaLightbulb, FaChartBar, 
  FaChartLine, FaCog, FaSignOutAlt, FaBell, FaUser, FaEnvelope
} from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Handle click outside to close menu and advanced search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAdvancedSearch(false);
      }
    }
    
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', checkMobile);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);
  
  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 z-0"></div>
      
      <header className="sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/dashboard" className="text-lg font-bold text-white flex items-center gap-2 z-10">
            <img 
              src="/images/logo.png" 
              alt="Cohertly Logo" 
              width="40"
              height="40"
              className="mr-1 brightness-0 invert"
            />
            Cohertly
          </Link>
          
          {/* Search Bar with Advanced Options - Hide on mobile */}
          <div className="flex-1 mx-8 hidden md:block">
            <div className="relative max-w-md mx-auto" ref={searchRef}>
              <div className="flex">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-10 py-1.5 rounded-l-lg bg-white bg-opacity-20 border border-white border-opacity-20 text-white text-xs focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
                  />
                  <FaSearch className="absolute left-2.5 top-2 text-white text-opacity-80 text-xs" />
                  <button 
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="absolute right-2 top-1.5 text-white text-opacity-70 hover:text-opacity-100"
                  >
                    <FaCog className="text-xs" />
                  </button>
                </div>
                <select 
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="px-2 py-1.5 text-xs bg-white bg-opacity-20 border-l-0 border border-white border-opacity-20 text-white rounded-r-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
                >
                  <option value="all" className="bg-blue-600 text-white">All</option>
                  <option value="referrals" className="bg-blue-600 text-white">Referrals</option>
                  <option value="contacts" className="bg-blue-600 text-white">Contacts</option>
                  <option value="partners" className="bg-blue-600 text-white">Partners</option>
                </select>
              </div>
              
              {/* Advanced Search Dropdown */}
              {showAdvancedSearch && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 px-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Advanced Search</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Date Range</label>
                      <div className="flex gap-2">
                        <input 
                          type="date" 
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="From"
                        />
                        <input 
                          type="date" 
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="To"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Status</label>
                      <select className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="">Any Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Service Type</label>
                      <select className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="">Any Service</option>
                        <option value="financial-planning">Financial Planning</option>
                        <option value="tax-services">Tax Services</option>
                        <option value="estate-planning">Estate Planning</option>
                        <option value="retirement">Retirement Planning</option>
                        <option value="insurance">Insurance</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end pt-1">
                      <button 
                        onClick={() => setShowAdvancedSearch(false)}
                        className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-2 items-center">
            <Link 
              href="/referrals" 
              className={`flex items-center gap-1 ${router.pathname === '/referrals' ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-20'} hover:bg-opacity-30 text-white text-xs py-1 px-2 rounded transition-colors`}
            >
              <FaUserFriends className="text-xs" /> Referrals
            </Link>
            <Link 
              href="/matches" 
              className={`flex items-center gap-1 ${router.pathname === '/matches' ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-20'} hover:bg-opacity-30 text-white text-xs py-1 px-2 rounded transition-colors`}
            >
              <FaHandshake className="text-xs" /> Matches
            </Link>
            
            {/* Notifications Icon */}
            <button className="ml-2 text-white p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors relative">
              <FaBell className="text-sm" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            
            {/* Email Icon */}
            <button className="ml-2 text-white p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors relative">
              <FaEnvelope className="text-sm" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </button>
            
            {/* Profile Picture */}
            <Link href="/profile" className="ml-3 relative group">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white border-opacity-70 hover:border-opacity-100 transition-all">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Profile" 
                  width={32} 
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
              <div className="hidden group-hover:block absolute top-full right-0 mt-1 bg-white text-gray-800 text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
                View Profile
              </div>
            </Link>
            
            {/* Menu Toggle Button */}
            <button 
              onClick={toggleMenu} 
              className="ml-2 text-white p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button className="text-white p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors relative">
              <FaBell className="text-sm" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            
            <button 
              onClick={toggleMenu} 
              className="text-white p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Dropdown Navigation Menu */}
        <div 
          ref={menuRef}
          className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-16 right-0 left-0 z-50 transition-all duration-200 ease-in-out`}
        >
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-br from-blue-800 to-indigo-900 rounded-lg shadow-xl border border-blue-700 overflow-hidden">
              {/* Mobile Search - Only visible on mobile */}
              <div className="p-4 border-b border-blue-700 md:hidden">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full pl-8 pr-4 py-2 rounded-lg bg-blue-700 bg-opacity-50 border border-blue-600 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute left-3 top-3 text-blue-300" />
                </div>
              </div>
              
              <div className={`${isMobile ? 'block' : 'flex'} p-4`}>
                {/* Main Navigation Section */}
                <div className={`${isMobile ? 'mb-6' : 'w-1/3 pr-4'}`}>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Main</p>
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        href="/dashboard" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/dashboard' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaHome /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/referrals" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/referrals' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaUserFriends /> Referrals
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/matches" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/matches' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaHandshake /> Matches
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/calendar" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/calendar' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaCalendarAlt /> Calendar
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/ai-tools" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/ai-tools' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaLightbulb /> AI Tools
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {/* Analytics Section */}
                <div className={`${isMobile ? 'mb-6' : 'w-1/3 px-4 border-l border-blue-700'}`}>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Analytics</p>
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        href="/statistics" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/statistics' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaChartBar /> Statistics
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/reports" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/reports' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaChartLine /> Reports
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {/* Account Section */}
                <div className={`${isMobile ? '' : 'w-1/3 pl-4 border-l border-blue-700'}`}>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Account</p>
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        href="/settings" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/settings' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaCog /> Settings
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/profile" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${router.pathname === '/profile' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                      >
                        <FaUser /> Profile
                      </Link>
                    </li>
                    <li>
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-red-300 hover:bg-blue-800">
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}