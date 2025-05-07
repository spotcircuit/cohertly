import React, { useEffect, useRef } from 'react';
import { useFeatureFlags } from '../../utils/featureFlags';

interface NetworkNode {
  id: string;
  name: string;
  profession: string;
  strength: number; // 1-10 scale of relationship strength
}

interface NetworkConnection {
  source: string;
  target: string;
  referrals: number;
  bidirectional: boolean;
}

interface NetworkGraphProps {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  onNodeClick?: (nodeId: string) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  nodes, 
  connections, 
  onNodeClick 
}) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const featureFlags = useFeatureFlags();
  
  // This would be replaced with actual D3.js or similar visualization
  useEffect(() => {
    if (!graphRef.current || !featureFlags.enableNetworkVisualization) return;
    
    // Placeholder for actual graph rendering logic
    console.log('Rendering network graph with', nodes.length, 'nodes and', 
      connections.length, 'connections');
    
    // In a real implementation, this would use D3.js or another visualization library
    // to create an interactive network graph
  }, [nodes, connections, featureFlags.enableNetworkVisualization]);

  if (!featureFlags.enableNetworkVisualization) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-blue-700">Network visualization will be available in a future update.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-4">Your Referral Network</h3>
      
      {/* Placeholder for actual graph */}
      <div 
        ref={graphRef} 
        className="h-[400px] bg-gray-50 rounded border flex items-center justify-center"
      >
        <p className="text-gray-500">
          {nodes.length === 0 
            ? "Add contacts to your network to see your visualization" 
            : "Network visualization loading..."}
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Network Stats</h4>
          <ul className="mt-2 text-sm">
            <li>Total Contacts: {nodes.length}</li>
            <li>Active Connections: {connections.length}</li>
            <li>Referrals Exchanged: {connections.reduce((sum, conn) => sum + conn.referrals, 0)}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Top Connections</h4>
          <ul className="mt-2 text-sm">
            {connections
              .sort((a, b) => b.referrals - a.referrals)
              .slice(0, 3)
              .map(conn => {
                const source = nodes.find(n => n.id === conn.source);
                const target = nodes.find(n => n.id === conn.target);
                return (
                  <li key={`${conn.source}-${conn.target}`}>
                    {source?.name} ↔ {target?.name}: {conn.referrals} referrals
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
