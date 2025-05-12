import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { FaSpinner, FaUserPlus, FaBriefcase, FaEnvelope, FaPhone, FaComments, FaUserFriends, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

interface ReferralData {
  client_name: string;
  client_email: string;
  client_phone: string;
  service_needed: string;
  notes: string;
  partner_id: string;
  urgency: string;
  location: string;
}

interface Partner {
  id: string;
  name: string;
  email: string;
  company: string;
  expertise: string[];
  rating: number;
  location: string;
}

// Mock partners data
const mockPartners = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    company: 'Johnson Financial Services',
    expertise: ['Tax Planning', 'Estate Planning'],
    rating: 4.8,
    location: 'New York, NY'
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    company: 'Chen Retirement Solutions',
    expertise: ['Retirement Planning', 'Investment Management'],
    rating: 4.9,
    location: 'San Francisco, CA'
  },
  {
    id: 'p3',
    name: 'Jessica Williams',
    email: 'jessica@example.com',
    company: 'Williams Insurance Group',
    expertise: ['Insurance', 'Business Consulting'],
    rating: 4.7,
    location: 'Chicago, IL'
  },
  {
    id: 'p4',
    name: 'David Miller',
    email: 'david@example.com',
    company: 'Miller Investment Advisors',
    expertise: ['Investment Management', 'Tax Planning'],
    rating: 4.6,
    location: 'Austin, TX'
  },
  {
    id: 'p5',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    company: 'Rodriguez Estate Planning',
    expertise: ['Estate Planning', 'Retirement Planning'],
    rating: 4.9,
    location: 'Miami, FL'
  }
];

export default function ReferralForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceNeeded: '',
    location: '',
    urgency: 'Normal',
    partnerId: '',
    notes: ''
  });
  
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [showPartnerSelector, setShowPartnerSelector] = useState(false);
  const queryClient = useQueryClient();
  
  // Fetch partners (in a real app, this would be an API call)
  const partnersQuery = useQuery({
    queryKey: ['partners'],
    queryFn: () => Promise.resolve(mockPartners),
    staleTime: Infinity, // Since this is mock data
  });
  
  // Filter partners based on service needed
  useEffect(() => {
    if (formData.serviceNeeded && partnersQuery.data) {
      const filtered = partnersQuery.data.filter(partner => 
        partner.expertise.includes(formData.serviceNeeded)
      );
      setFilteredPartners(filtered);
    } else {
      setFilteredPartners(partnersQuery.data || []);
    }
  }, [formData.serviceNeeded, partnersQuery.data]);

  const mutation = useMutation({
    mutationFn: (newReferral: ReferralData) => {
      // In a real app, this would send to an actual API endpoint
      console.log('Sending referral:', newReferral);
      
      // Simulate API call
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      resetForm();
      setShowPartnerSelector(false);
    },
  });

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceNeeded: '',
      location: '',
      urgency: 'Normal',
      partnerId: '',
      notes: ''
    });
    setShowPartnerSelector(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const proceedToPartnerSelection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.serviceNeeded) return;
    setShowPartnerSelector(true);
  };
  
  const handleSubmit = () => {
    if (!formData.partnerId) return;
    
    mutation.mutate({ 
      client_name: formData.clientName, 
      client_email: formData.clientEmail,
      client_phone: formData.clientPhone,
      service_needed: formData.serviceNeeded,
      location: formData.location,
      urgency: formData.urgency,
      notes: formData.notes,
      partner_id: formData.partnerId
    });
  };
  
  const selectPartner = (partnerId: string) => {
    setFormData(prev => ({
      ...prev,
      partnerId
    }));
  };

  return (
    <div className="glass-card mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
      {!showPartnerSelector ? (
        <form onSubmit={proceedToPartnerSelection}>
      <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
        <FaUserPlus className="text-blue-500" /> New Referral
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="clientName">
            Client Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
              <FaUserPlus />
            </div>
            <input
              id="clientName"
              name="clientName"
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Smith"
              value={formData.clientName}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="clientEmail">
            Client Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
              <FaEnvelope />
            </div>
            <input
              id="clientEmail"
              name="clientEmail"
              type="email"
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
              value={formData.clientEmail}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="clientPhone">
            Client Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
              <FaPhone />
            </div>
            <input
              id="clientPhone"
              name="clientPhone"
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(555) 123-4567"
              value={formData.clientPhone}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="location">
            Client Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
              <FaMapMarkerAlt />
            </div>
            <input
              id="location"
              name="location"
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City, State"
              value={formData.location}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="serviceNeeded">
            Service Needed *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
              <FaBriefcase />
            </div>
            <select
              id="serviceNeeded"
              name="serviceNeeded"
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.serviceNeeded}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="Tax Planning">Tax Planning</option>
              <option value="Estate Planning">Estate Planning</option>
              <option value="Retirement Planning">Retirement Planning</option>
              <option value="Insurance">Insurance</option>
              <option value="Investment Management">Investment Management</option>
              <option value="Business Consulting">Business Consulting</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="urgency">
            Urgency
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
              <FaSpinner />
            </div>
            <select
              id="urgency"
              name="urgency"
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value="Low">Low - Within 2 weeks</option>
              <option value="Normal">Normal - Within 1 week</option>
              <option value="High">High - Within 48 hours</option>
              <option value="Urgent">Urgent - ASAP</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="notes">
          Additional Notes
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 text-blue-500">
            <FaComments />
          </div>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any specific details about this referral..."
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <button 
          type="button" 
          onClick={resetForm}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
        >
          Clear Form
        </button>
        
        <button
          className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 min-w-[150px]"
          type="submit"
        >
          Next: Find Partners
        </button>
      </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
              <FaUserFriends className="text-blue-500" /> Select Partner for Referral
            </h3>
            <button 
              onClick={() => setShowPartnerSelector(false)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Form
            </button>
          </div>
          
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg">
            <p className="text-sm">Referring <strong>{formData.clientName}</strong> for <strong>{formData.serviceNeeded}</strong> services</p>
            {formData.location && <p className="text-sm">Location: {formData.location}</p>}
            <p className="text-sm">Urgency: {formData.urgency}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Partners</h4>
            {partnersQuery.isLoading ? (
              <div className="flex justify-center p-4">
                <FaSpinner className="animate-spin text-blue-500" size={24} />
              </div>
            ) : filteredPartners.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No partners found for this service. Please try a different service.
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {filteredPartners.map(partner => (
                  <div 
                    key={partner.id}
                    className={`p-4 rounded-lg border ${formData.partnerId === partner.id 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-white border-gray-200 hover:border-blue-200'} 
                      cursor-pointer transition-colors`}
                    onClick={() => selectPartner(partner.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">{partner.name}</h5>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FaBuilding size={12} /> {partner.company}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FaMapMarkerAlt size={12} /> {partner.location}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {partner.expertise.map((skill, i) => (
                            <span 
                              key={i}
                              className={`text-xs px-2 py-1 rounded-full ${skill === formData.serviceNeeded 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(partner.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">{partner.rating.toFixed(1)}</span>
                        </div>
                        {formData.partnerId === partner.id && (
                          <span className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Selected</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <button 
              type="button" 
              onClick={() => setShowPartnerSelector(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
            >
              Back
            </button>
            
            <button
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 min-w-[120px]"
              onClick={handleSubmit}
              disabled={!formData.partnerId || mutation.isPending}
            >
              {mutation.isPending && <FaSpinner className="animate-spin" />}
              {mutation.isPending ? 'Sending...' : 'Send Referral'}
            </button>
          </div>
        </div>
      )}
      
      {mutation.isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          Referral successfully sent! The partner will be notified and will contact the client directly.
        </div>
      )}
      
      {mutation.isError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          Error sending referral. Please try again.
        </div>
      )}
    </div>
  );
}