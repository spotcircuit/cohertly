import React, { useState } from 'react';
import { FaUserPlus, FaExchangeAlt, FaStar, FaCheckCircle, FaExternalLinkAlt, FaVoicemail } from 'react-icons/fa';
import ContactSourceIndicator, { ContactSource } from './ContactSourceIndicator';
import VoiceNoteRecorder from './VoiceNoteRecorder';

// Define the interface for a referral partner
interface ReferralPartner {
  id: string;
  name: string;
  company: string;
  specialty: string;
  location: string;
  inNetwork: boolean;
  referralsSent?: number;
  referralsReceived?: number;
  trustScore?: number;
  closeRate?: number;
  reputationScore?: number;
  totalReferrals?: number;
  sources?: ContactSource[];
  email?: string;
  phone?: string;
}

interface ReferralSearchResultsProps {
  results: ReferralPartner[];
  clientName?: string;
  isLoading: boolean;
}

export default function ReferralSearchResults({ 
  results, 
  clientName, 
  isLoading 
}: ReferralSearchResultsProps) {
  const [selectedPartner, setSelectedPartner] = useState<ReferralPartner | null>(null);
  
  // Add mock sources to partners if they don't have any
  const partnersWithSources = results.map(partner => {
    if (!partner.sources) {
      // Assign random sources based on whether they're in network
      const possibleSources: ContactSource[] = [
        'linkedin', 'gmail', 'outlook', 'calendar', 'phone', 'whatsapp', 'slack', 'twitter'
      ];
      
      // For in-network partners, assign 2-3 sources
      // For external partners, assign 1-2 sources
      const numSources = partner.inNetwork ? Math.floor(Math.random() * 2) + 2 : Math.floor(Math.random() * 2) + 1;
      const sources: ContactSource[] = [];
      
      for (let i = 0; i < numSources; i++) {
        const randomSource = possibleSources[Math.floor(Math.random() * possibleSources.length)];
        if (!sources.includes(randomSource)) {
          sources.push(randomSource);
        }
      }
      
      // Always add LinkedIn for external partners
      if (!partner.inNetwork && !sources.includes('linkedin')) {
        sources.push('linkedin');
      }
      
      return {
        ...partner,
        sources,
        email: `${partner.name.toLowerCase().replace(' ', '.')}@${partner.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        phone: partner.inNetwork ? `+1${Math.floor(Math.random() * 9000000000) + 1000000000}` : undefined
      };
    }
    return partner;
  });
  
  // Handle sending voice note
  const handleSendVoiceNote = (data: any) => {
    console.log('Sending voice note:', data);
    // In a real app, this would send the voice note to the server
    
    // Close the voice note recorder after sending
    setTimeout(() => {
      setSelectedPartner(null);
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  // Separate results into network and outside network
  const networkResults = partnersWithSources.filter(partner => partner.inNetwork);
  const externalResults = partnersWithSources.filter(partner => !partner.inNetwork);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 mb-6 relative">
      <h2 className="text-xl font-semibold mb-4">
        {clientName 
          ? `Referral Partners for ${clientName}` 
          : 'Matching Referral Partners'}
      </h2>
      
      {networkResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700 flex items-center">
            <FaExchangeAlt className="mr-2 text-blue-500" />
            Within Your Network ({networkResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkResults.map(partner => (
              <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{partner.name}</h4>
                    <p className="text-gray-600">{partner.company}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                        {partner.specialty}
                      </span>
                      <span>{partner.location}</span>
                    </div>
                    {partner.sources && (
                      <div className="mt-2">
                        <ContactSourceIndicator sources={partner.sources} size="sm" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    {partner.trustScore && (
                      <div className="flex items-center text-amber-500 mb-1">
                        <FaStar className="mr-1" />
                        <span className="font-semibold">{partner.trustScore}/10</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-600">Sent: <span className="font-medium">${partner.referralsSent}k</span></p>
                      <p className="text-gray-600">Received: <span className="font-medium">${partner.referralsReceived}k</span></p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedPartner(partner)}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors flex items-center"
                      >
                        <FaVoicemail className="mr-1" />
                        <span>Voice</span>
                      </button>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {externalResults.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700 flex items-center">
            <FaUserPlus className="mr-2 text-green-500" />
            Recommended New Connections ({externalResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalResults.map(partner => (
              <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-green-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{partner.name}</h4>
                    <p className="text-gray-600">{partner.company}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2">
                        {partner.specialty}
                      </span>
                      <span>{partner.location}</span>
                    </div>
                    {partner.sources && (
                      <div className="mt-2">
                        <ContactSourceIndicator sources={partner.sources} size="sm" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    {partner.reputationScore && (
                      <div className="flex items-center text-amber-500 mb-1">
                        <FaStar className="mr-1" />
                        <span className="font-semibold">{partner.reputationScore}/10</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <div>
                      {partner.closeRate && (
                        <p className="text-gray-600 flex items-center">
                          <FaCheckCircle className="text-green-500 mr-1" />
                          <span>Close rate: <span className="font-medium">{partner.closeRate}%</span></span>
                        </p>
                      )}
                      {partner.totalReferrals && (
                        <p className="text-gray-600">
                          <span>Sent: <span className="font-medium">{partner.totalReferrals}+ referrals</span></span>
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedPartner(partner)}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors flex items-center"
                      >
                        <FaVoicemail className="mr-1" />
                        <span>Voice</span>
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center">
                        <FaUserPlus className="mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Voice Note Recorder Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative">
            <button 
              onClick={() => setSelectedPartner(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <div className="p-1">
              <VoiceNoteRecorder 
                contactName={selectedPartner?.name}
                contactEmail={selectedPartner?.email}
                contactPhone={selectedPartner?.phone}
                onSend={handleSendVoiceNote}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
