import React, { useState } from 'react';
import { 
  FaSearch, FaFilter, FaSort, FaUserPlus, FaEllipsisH, 
  FaTrash, FaEdit, FaEnvelope, FaPhone, FaVoicemail
} from 'react-icons/fa';
import ContactSourceIndicator, { ContactSource } from './ContactSourceIndicator';
import VoiceNoteRecorder from './VoiceNoteRecorder';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  lastContact?: string;
  notes?: string;
  sources: ContactSource[];
  tags?: string[];
  favorite?: boolean;
}

interface ContactManagerProps {
  onAddContact?: (contact: Contact) => void;
  onEditContact?: (contact: Contact) => void;
  onDeleteContact?: (contactId: string) => void;
}

export default function ContactManager({ 
  onAddContact, 
  onEditContact, 
  onDeleteContact 
}: ContactManagerProps) {
  // Mock contacts data
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Inc.',
      title: 'Marketing Director',
      lastContact: '2025-05-01',
      notes: 'Met at the tech conference in April',
      sources: ['linkedin', 'gmail', 'calendar'],
      tags: ['marketing', 'tech', 'conference'],
      favorite: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@bigcorp.com',
      phone: '+1 (555) 987-6543',
      company: 'Big Corp',
      title: 'CEO',
      lastContact: '2025-04-28',
      notes: 'Interested in our enterprise solution',
      sources: ['linkedin', 'outlook'],
      tags: ['executive', 'enterprise', 'decision-maker'],
      favorite: true
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'mchen@techstartup.io',
      phone: '+1 (555) 456-7890',
      company: 'Tech Startup',
      title: 'CTO',
      lastContact: '2025-05-10',
      notes: 'Technical discussion about API integration',
      sources: ['gmail', 'calendar', 'slack'],
      tags: ['technical', 'integration', 'developer'],
      favorite: false
    },
    {
      id: '4',
      name: 'Emma Wilson',
      email: 'emma@designstudio.co',
      phone: '+1 (555) 234-5678',
      company: 'Design Studio',
      title: 'Creative Director',
      lastContact: '2025-04-15',
      notes: 'Discussed collaboration on new website design',
      sources: ['whatsapp', 'gmail'],
      tags: ['design', 'creative', 'collaboration'],
      favorite: false
    },
    {
      id: '5',
      name: 'David Rodriguez',
      email: 'drodriguez@finance.org',
      company: 'Finance Partners',
      title: 'Investment Advisor',
      lastContact: '2025-05-05',
      notes: 'Potential investor for Series B',
      sources: ['linkedin', 'outlook', 'phone'],
      tags: ['finance', 'investor', 'funding'],
      favorite: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showVoiceNote, setShowVoiceNote] = useState(false);
  const [filterSource, setFilterSource] = useState<ContactSource | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastContact' | 'company'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter contacts based on search term and source filter
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = 
      filterSource === 'all' || 
      contact.sources.includes(filterSource as ContactSource);
    
    return matchesSearch && matchesSource;
  });

  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    let valueA, valueB;
    
    if (sortBy === 'name') {
      valueA = a.name;
      valueB = b.name;
    } else if (sortBy === 'lastContact') {
      valueA = a.lastContact || '';
      valueB = b.lastContact || '';
    } else {
      valueA = a.company || '';
      valueB = b.company || '';
    }
    
    if (sortDirection === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  // Handle sending voice note
  const handleSendVoiceNote = (data: any) => {
    console.log('Sending voice note to contact:', selectedContact?.name, data);
    // In a real app, this would send the voice note to the server
    
    // Close the voice note recorder after sending
    setTimeout(() => {
      setShowVoiceNote(false);
      setSelectedContact(null);
    }, 2000);
  };

  // Toggle sort direction or change sort field
  const handleSort = (field: 'name' | 'lastContact' | 'company') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Manager</h2>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value as ContactSource | 'all')}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Sources</option>
              <option value="linkedin">LinkedIn</option>
              <option value="gmail">Gmail</option>
              <option value="outlook">Outlook</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone</option>
              <option value="calendar">Calendar</option>
              <option value="slack">Slack</option>
              <option value="twitter">Twitter</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
          </div>
          
          <button 
            onClick={() => handleSort('name')}
            className={`px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center ${
              sortBy === 'name' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span>Name</span>
            {sortBy === 'name' && (
              <FaSort className="ml-1" />
            )}
          </button>
          
          <button 
            onClick={() => handleSort('company')}
            className={`px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center ${
              sortBy === 'company' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span>Company</span>
            {sortBy === 'company' && (
              <FaSort className="ml-1" />
            )}
          </button>
          
          <button 
            onClick={() => handleSort('lastContact')}
            className={`px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center ${
              sortBy === 'lastContact' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span>Last Contact</span>
            {sortBy === 'lastContact' && (
              <FaSort className="ml-1" />
            )}
          </button>
        </div>
      </div>
      
      {/* Contacts list */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company & Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sources
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Contact
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-medium">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">
                        {contact.tags?.map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {contact.email && (
                      <div className="flex items-center mb-1">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <span>{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center">
                        <FaPhone className="text-gray-400 mr-2" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contact.company}</div>
                  <div className="text-sm text-gray-500">{contact.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ContactSourceIndicator sources={contact.sources} size="sm" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.lastContact ? new Date(contact.lastContact).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowVoiceNote(true);
                      }}
                      className="text-gray-600 hover:text-gray-900"
                      title="Send voice note"
                    >
                      <FaVoicemail />
                    </button>
                    <button 
                      onClick={() => onEditContact && onEditContact(contact)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit contact"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => onDeleteContact && onDeleteContact(contact.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete contact"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty state */}
      {sortedContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No contacts found matching your search criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilterSource('all');
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Add contact button */}
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => onAddContact && onAddContact({
            id: `new-${Date.now()}`,
            name: '',
            sources: ['manual']
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaUserPlus className="mr-2" />
          <span>Add Contact</span>
        </button>
      </div>
      
      {/* Voice Note Modal */}
      {showVoiceNote && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative">
            <button 
              onClick={() => {
                setShowVoiceNote(false);
                setSelectedContact(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <div className="p-1">
              <VoiceNoteRecorder 
                contactName={selectedContact.name}
                contactEmail={selectedContact.email}
                contactPhone={selectedContact.phone}
                onSend={handleSendVoiceNote}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
