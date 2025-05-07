import Layout from '../components/Layout';
import MatchList from '../components/MatchList';
import { FaHandshake, FaChartLine, FaLightbulb } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Matches() {
  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[225px] rounded-lg mb-4">
        <Image 
          src="/images/hero.png" 
          alt="Matches Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3">
            <FaHandshake /> AI Partner Matches
          </h1>
        </div>
      </div>
      
      {/* Small padding */}
      <div className="h-2"></div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Match Tips */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
              <FaLightbulb className="text-indigo-500" /> Match Insights
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-3 border border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-800 mb-1">Match Quality</h4>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700">85%</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Your matches are in the top 15% of the network</p>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-800 mb-1">Industry Distribution</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">Financial Planning</span>
                    <span className="text-gray-900 font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">Legal</span>
                    <span className="text-gray-900 font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">Accounting</span>
                    <span className="text-gray-900 font-medium">20%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">Insurance</span>
                    <span className="text-gray-900 font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">Other</span>
                    <span className="text-gray-900 font-medium">5%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-800 mb-1">Connection Tips</h4>
                <ul className="text-xs text-gray-600 space-y-1 mt-1">
                  <li className="flex items-start gap-1">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>Personalize your connection request</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>Mention specific synergies between your services</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>Follow up within 48 hours of connecting</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-indigo-100">
              <Link href="/match-stats" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
                <FaChartLine size={12} /> View Your Match Statistics
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Column - Match List */}
        <div className="lg:col-span-2">
          <MatchList />
        </div>
      </div>
    </Layout>
  );
}