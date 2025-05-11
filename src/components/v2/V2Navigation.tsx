import React from 'react';
import Link from 'next/link';
import { useFeatureFlags } from '../../utils/featureFlags';
import { 
  FaFlask, FaNetworkWired, FaUserFriends, FaChartLine, FaCog,
  FaHome, FaHandshake, FaUserPlus, FaDatabase
} from 'react-icons/fa';

const V2Navigation: React.FC = () => {
  const featureFlags = useFeatureFlags();
  
  // Only show in development or if v2 features are enabled
  if (process.env.NODE_ENV !== 'development' && !featureFlags.useV2Components) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white rounded-lg shadow-lg z-50 p-1">
      <div className="flex items-center">
        <div className="px-3 py-2 bg-blue-900 rounded-l-lg flex items-center">
          <FaFlask className="mr-2" />
          <span className="font-medium">V2 Features</span>
        </div>
        
        <div className="flex flex-wrap">
          <Link href="/v2/dashboard" className="px-3 py-2 hover:bg-blue-700 flex items-center">
            <FaHome className="mr-1" />
            <span>Dashboard</span>
          </Link>
          
          <Link href="/v2/network" className="px-3 py-2 hover:bg-blue-700 flex items-center">
            <FaNetworkWired className="mr-1" />
            <span>Network</span>
          </Link>
          
          <Link href="/v2/matches" className="px-3 py-2 hover:bg-blue-700 flex items-center">
            <FaHandshake className="mr-1" />
            <span>Matches</span>
          </Link>
          
          <Link href="/v2/contacts" className="px-3 py-2 hover:bg-blue-700 flex items-center">
            <FaUserPlus className="mr-1" />
            <span>Contacts</span>
          </Link>
          
          <Link href="/dashboard" className="px-3 py-2 hover:bg-blue-700 flex items-center">
            <FaChartLine className="mr-1" />
            <span>V1 Dashboard</span>
          </Link>
          
          <Link href="/settings" className="px-3 py-2 hover:bg-blue-700 rounded-r-lg flex items-center">
            <FaCog className="mr-1" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default V2Navigation;
