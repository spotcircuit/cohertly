import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import DataEnrichment from '../../components/v2/DataEnrichment';
import Link from 'next/link';
import { 
  FaUserPlus, FaSearch, FaFilter, FaSortAmountDown, 
  FaUserTie, FaPhone, FaEnvelope, FaBuilding, FaMapMarkerAlt,
  FaNetworkWired, FaHandshake, FaArrowLeft, FaDatabase,
  FaFileExport, FaFileImport, FaEllipsisH, FaChartBar,
  FaLinkedin, FaAddressBook, FaGoogle, FaHubspot, FaSalesforce,
  FaMailchimp, FaCheck, FaTimes, FaUpload
} from 'react-icons/fa';

// Define source types with their icons
const sourceTypes = {
  linkedin: { name: 'LinkedIn', icon: <FaLinkedin className="text-blue-600" /> },
  google: { name: 'Google Contacts', icon: <FaGoogle className="text-red-500" /> },
  salesforce: { name: 'Salesforce', icon: <FaSalesforce className="text-blue-700" /> },
  hubspot: { name: 'HubSpot', icon: <FaHubspot className="text-orange-500" /> },
  mailchimp: { name: 'Mailchimp', icon: <FaMailchimp className="text-yellow-500" /> },
  manual: { name: 'Manual Entry', icon: <FaAddressBook className="text-gray-600" /> },
  enriched: { name: 'AI Enriched', icon: <FaDatabase className="text-purple-600" /> }
};

// Sample contact data
const sampleContacts = [
  {
    id: 1,
    name: 'Sarah Williams',
    profession: 'Estate Attorney',
    company: 'Williams & Associates',
    email: 'sarah.williams@example.com',
    phone: '(555) 123-4567',
    location: 'Chicago, IL',
    lastContact: '2 days ago',
    referralsSent: 8,
    referralsReceived: 5,
    enrichmentScore: 95,
    tags: ['VIP', 'Estate Planning'],
    sources: ['linkedin', 'salesforce']
  },
  {
    id: 2,
    name: 'Michael Chen',
    profession: 'CPA',
    company: 'Chen Tax Group',
    email: 'michael.chen@example.com',
    phone: '(555) 234-5678',
    location: 'San Francisco, CA',
    lastContact: '1 week ago',
    referralsSent: 6,
    referralsReceived: 7,
    enrichmentScore: 85,
    tags: ['Tax Planning'],
    sources: ['google', 'enriched']
  },
  {
    id: 3,
    name: 'Jessica Davis',
    profession: 'Insurance Agent',
    company: 'Secure Insurance LLC',
    email: 'jessica.davis@example.com',
    phone: '(555) 345-6789',
    location: 'New York, NY',
    lastContact: '3 weeks ago',
    referralsSent: 4,
    referralsReceived: 2,
    enrichmentScore: 75,
    tags: ['Insurance'],
    sources: ['hubspot']
  },
  {
    id: 4,
    name: 'Robert Johnson',
    profession: 'Mortgage Broker',
    company: 'Premier Mortgage',
    email: 'robert.johnson@example.com',
    phone: '(555) 456-7890',
    location: 'Dallas, TX',
    lastContact: '1 month ago',
    referralsSent: 3,
    referralsReceived: 5,
    enrichmentScore: 80,
    tags: ['Mortgage'],
    sources: ['manual', 'enriched']
  },
  {
    id: 5,
    name: 'Amanda Wilson',
    profession: 'Financial Advisor',
    company: 'Wilson Financial Partners',
    email: 'amanda.wilson@example.com',
    phone: '(555) 567-8901',
    location: 'Boston, MA',
    lastContact: '2 months ago',
    referralsSent: 7,
    referralsReceived: 4,
    enrichmentScore: 90,
    tags: ['Wealth Management', 'VIP'],
    sources: ['salesforce', 'mailchimp']
  }
];

// Define the interface for contact data
interface Contact {
  id: number;
  name: string;
  profession: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  lastContact: string;
  referralsSent: number;
  referralsReceived: number;
  enrichmentScore: number;
  tags: string[];
  sources: string[];
}

// Define the interface for import sources
interface ImportSource {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  contactCount?: number;
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [selectedImportSources, setSelectedImportSources] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample import sources
  const importSources: ImportSource[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-blue-600" />,
      description: 'Import your LinkedIn connections',
      contactCount: 245
    },
    {
      id: 'google',
      name: 'Google Contacts',
      icon: <FaGoogle className="text-red-500" />,
      description: 'Import contacts from your Google account',
      contactCount: 187
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: <FaSalesforce className="text-blue-700" />,
      description: 'Import contacts from Salesforce CRM',
      contactCount: 132
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      icon: <FaHubspot className="text-orange-500" />,
      description: 'Import contacts from HubSpot CRM',
      contactCount: 98
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      icon: <FaMailchimp className="text-yellow-500" />,
      description: 'Import subscribers from Mailchimp',
      contactCount: 76
    },
    {
      id: 'csv',
      name: 'CSV File',
      icon: <FaFileImport className="text-gray-600" />,
      description: 'Import contacts from a CSV file'
    }
  ];
  
  const handleEnrichmentComplete = (enrichedData: any) => {
    console.log('Enrichment complete:', enrichedData);
    // Add the enriched contact to the list with the 'enriched' source
    const newContact: Contact = {
      id: contacts.length + 1,
      name: enrichedData.name || 'New Contact',
      profession: enrichedData.profession || '',
      company: enrichedData.company || '',
      email: enrichedData.email || '',
      phone: enrichedData.phone || '',
      location: enrichedData.location || '',
      lastContact: 'Just now',
      referralsSent: 0,
      referralsReceived: 0,
      enrichmentScore: 100,
      tags: [],
      sources: ['enriched']
    };
    
    setContacts([newContact, ...contacts]);
    setShowAddContact(false);
  };
  
  // Toggle import source selection
  const toggleImportSource = (sourceId: string) => {
    if (selectedImportSources.includes(sourceId)) {
      setSelectedImportSources(selectedImportSources.filter(id => id !== sourceId));
    } else {
      setSelectedImportSources([...selectedImportSources, sourceId]);
    }
  };
  
  // Handle file selection for CSV import
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('File selected:', files[0].name);
      // In a real implementation, this would parse the CSV file
      // For now, we'll just simulate adding the CSV as a source
      if (!selectedImportSources.includes('csv')) {
        setSelectedImportSources([...selectedImportSources, 'csv']);
      }
    }
  };
  
  // Handle import from selected sources
  const handleImport = () => {
    if (selectedImportSources.length === 0) return;
    
    // Simulate importing contacts from selected sources
    const newContacts: Contact[] = [];
    
    // For each selected source, generate some sample contacts
    selectedImportSources.forEach(sourceId => {
      const source = importSources.find(s => s.id === sourceId);
      if (!source) return;
      
      // Generate 1-3 sample contacts for this source
      const numContacts = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numContacts; i++) {
        const newId = contacts.length + newContacts.length + i + 1;
        newContacts.push({
          id: newId,
          name: `Imported Contact ${newId}`,
          profession: ['Financial Advisor', 'CPA', 'Attorney', 'Insurance Agent'][Math.floor(Math.random() * 4)],
          company: `${source.name} Import ${i+1}`,
          email: `contact${newId}@example.com`,
          phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          location: ['Chicago, IL', 'New York, NY', 'San Francisco, CA', 'Austin, TX'][Math.floor(Math.random() * 4)],
          lastContact: 'Just imported',
          referralsSent: 0,
          referralsReceived: 0,
          enrichmentScore: Math.floor(Math.random() * 30) + 70,
          tags: [],
          sources: [sourceId]
        });
      }
    });
    
    setContacts([...newContacts, ...contacts]);
    setShowImportModal(false);
    setSelectedImportSources([]);
  };
  
  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.profession.toLowerCase().includes(query) ||
      contact.company.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.location.toLowerCase().includes(query) ||
      contact.tags.some(tag => tag.toLowerCase().includes(query)) ||
      contact.sources.some(source => {
        const sourceName = sourceTypes[source as keyof typeof sourceTypes]?.name;
        return sourceName?.toLowerCase().includes(query);
      })
    );
  });
  
  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <Link 
            href="/v2/dashboard" 
            className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Contact Management</h1>
        </div>
        
        {!showAddContact ? (
          <>
            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-grow max-w-2xl">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1">
                  <FaFilter />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1">
                  <FaSortAmountDown />
                  <span className="hidden sm:inline">Sort</span>
                </button>
                <button 
                  onClick={() => setShowAddContact(true)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <FaUserPlus />
                  <span>Add Contact</span>
                </button>
              </div>
            </div>
            
            {/* Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Total Contacts</div>
                <div className="text-2xl font-bold text-gray-800">{contacts.length}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Active Partners</div>
                <div className="text-2xl font-bold text-gray-800">12</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Referrals Exchanged</div>
                <div className="text-2xl font-bold text-gray-800">64</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Avg. Enrichment</div>
                <div className="text-2xl font-bold text-gray-800">85%</div>
              </div>
            </div>
            
            {/* Contact List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referrals
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrichment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Contact
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map(contact => (
                      <tr 
                        key={contact.id} 
                        className={`hover:bg-gray-50 ${selectedContact === contact.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedContact(contact.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.profession}</div>
                              <div className="text-xs text-gray-500">{contact.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex flex-col gap-1">
                            <div className="flex items-center">
                              <FaEnvelope className="text-gray-400 mr-2" />
                              {contact.email}
                            </div>
                            <div className="flex items-center">
                              <FaPhone className="text-gray-400 mr-2" />
                              {contact.phone}
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-gray-400 mr-2" />
                              {contact.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm">
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-2">
                              {contact.referralsSent} sent
                            </div>
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md">
                              {contact.referralsReceived} received
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  contact.enrichmentScore > 85 ? 'bg-green-600' : 
                                  contact.enrichmentScore > 70 ? 'bg-blue-600' : 'bg-amber-500'
                                }`}
                                style={{ width: `${contact.enrichmentScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{contact.enrichmentScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.lastContact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-700">
                            <FaEllipsisH />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {/* Professional tags */}
                            {contact.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                            
                            {/* Source tags */}
                            {contact.sources.map((source, sourceIndex) => {
                              const sourceInfo = sourceTypes[source as keyof typeof sourceTypes];
                              return sourceInfo ? (
                                <span 
                                  key={`source-${sourceIndex}`}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                  title={`Imported from ${sourceInfo.name}`}
                                >
                                  <span className="mr-1">{sourceInfo.icon}</span>
                                  <span>{sourceInfo.name}</span>
                                </span>
                              ) : null;
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredContacts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No contacts found matching your search.</p>
                </div>
              )}
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {filteredContacts.length} of {contacts.length} contacts
                </div>
                
                <div className="flex gap-2">
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <FaFileExport />
                    <span>Export</span>
                  </button>
                  <button 
                    onClick={() => setShowImportModal(true)}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-4"
                  >
                    <FaFileImport />
                    <span>Import</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contact Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FaHandshake />
                <span>Send Referral</span>
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FaNetworkWired />
                <span>View in Network</span>
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FaChartBar />
                <span>Referral History</span>
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FaDatabase />
                <span>Enrich Selected</span>
              </button>
            </div>
          </>
        ) : showImportModal ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Import Contacts</h2>
                  <button 
                    onClick={() => setShowImportModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Select the sources you want to import contacts from. You can select multiple sources.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {importSources.map(source => (
                    <div 
                      key={source.id}
                      onClick={() => source.id === 'csv' ? fileInputRef.current?.click() : toggleImportSource(source.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedImportSources.includes(source.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {source.icon}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-800">{source.name}</h3>
                          <p className="text-sm text-gray-500">{source.description}</p>
                          {source.contactCount && (
                            <p className="text-xs text-gray-400 mt-1">{source.contactCount} contacts available</p>
                          )}
                        </div>
                        {source.id !== 'csv' && (
                          <div className="flex-shrink-0 ml-2">
                            {selectedImportSources.includes(source.id) ? (
                              <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                <FaCheck className="text-white text-xs" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Hidden file input for CSV import */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".csv"
                  className="hidden"
                />
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={selectedImportSources.length === 0}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedImportSources.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    <FaUpload />
                    <span>Import {selectedImportSources.length > 0 ? `(${selectedImportSources.length})` : ''}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Add New Contact</h2>
              <button 
                onClick={() => setShowAddContact(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
            
            <DataEnrichment 
              onEnrichmentComplete={handleEnrichmentComplete}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
