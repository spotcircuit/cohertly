import React, { useState } from 'react';
import Layout from '../../components/Layout';
import NetworkGraph from '../../components/v2/NetworkGraph';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaSearch, FaFilter, FaDownload, FaUserPlus } from 'react-icons/fa';

// Sample data - in a real app, this would come from an API
const sampleNodes = [
  { id: '1', name: 'Alex Johnson', profession: 'Financial Advisor', strength: 9 },
  { id: '2', name: 'Sarah Williams', profession: 'Estate Attorney', strength: 8 },
  { id: '3', name: 'Michael Chen', profession: 'CPA', strength: 7 },
  { id: '4', name: 'Jessica Davis', profession: 'Insurance Agent', strength: 6 },
  { id: '5', name: 'Robert Wilson', profession: 'Mortgage Broker', strength: 8 },
];

const sampleConnections = [
  { source: '1', target: '2', referrals: 12, bidirectional: true },
  { source: '1', target: '3', referrals: 8, bidirectional: true },
  { source: '2', target: '4', referrals: 5, bidirectional: false },
  { source: '3', target: '5', referrals: 3, bidirectional: true },
  { source: '4', target: '5', referrals: 2, bidirectional: false },
];

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };
  
  const selectedNodeData = selectedNode 
    ? sampleNodes.find(node => node.id === selectedNode) 
    : null;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">My Referral Network</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FaUserPlus /> Add Contact
            </button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search your network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                <FaFilter /> Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                <FaDownload /> Export
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Network visualization */}
          <div className="lg:col-span-2">
            <NetworkGraph 
              nodes={sampleNodes} 
              connections={sampleConnections}
              onNodeClick={handleNodeClick}
            />
          </div>
          
          {/* Selected contact or stats */}
          <div>
            {selectedNodeData ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedNodeData.name}</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Profession</p>
                    <p className="font-medium">{selectedNodeData.profession}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Relationship Strength</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${selectedNodeData.strength * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Referrals Exchanged</p>
                    <p className="font-medium">
                      {sampleConnections
                        .filter(conn => conn.source === selectedNodeData.id || conn.target === selectedNodeData.id)
                        .reduce((sum, conn) => sum + conn.referrals, 0)}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Connected With</h3>
                    <ul className="space-y-2">
                      {sampleConnections
                        .filter(conn => conn.source === selectedNodeData.id || conn.target === selectedNodeData.id)
                        .map(conn => {
                          const connectedNodeId = conn.source === selectedNodeData.id ? conn.target : conn.source;
                          const connectedNode = sampleNodes.find(node => node.id === connectedNodeId);
                          
                          return (
                            <li key={connectedNodeId} className="flex items-center justify-between">
                              <span>{connectedNode?.name}</span>
                              <span className="text-sm text-gray-500">{conn.referrals} referrals</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm">
                      Send Referral
                    </button>
                    <button className="flex-1 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Network Summary</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Network Composition</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Financial Advisors</span>
                          <span>1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Attorneys</span>
                          <span>1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>CPAs</span>
                          <span>1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Insurance Agents</span>
                          <span>1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Mortgage Brokers</span>
                          <span>1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Network Gaps</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Based on your profession, you might benefit from adding these professionals to your network:
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <FaPlus className="text-blue-600" />
                        <span>Business Attorney</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaPlus className="text-blue-600" />
                        <span>Real Estate Agent</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaPlus className="text-blue-600" />
                        <span>Business Consultant</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
