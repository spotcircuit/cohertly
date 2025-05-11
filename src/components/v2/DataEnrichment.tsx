import React, { useState } from 'react';
import { 
  FaDatabase, FaLinkedin, FaGlobe, FaBuilding, 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck,
  FaSpinner, FaExclamationTriangle, FaLock, FaUserTie
} from 'react-icons/fa';

interface EnrichmentSource {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
  isEnabled: boolean;
}

interface EnrichmentField {
  id: string;
  name: string;
  value: string | null;
  source: string | null;
  confidence: number;
  isVerified: boolean;
}

interface DataEnrichmentProps {
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onEnrichmentComplete?: (enrichedData: any) => void;
}

const DataEnrichment: React.FC<DataEnrichmentProps> = ({ 
  initialData = {}, 
  onEnrichmentComplete 
}) => {
  const [inputData, setInputData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
  });
  
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentComplete, setEnrichmentComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [enrichedFields, setEnrichedFields] = useState<EnrichmentField[]>([]);
  
  // Sample enrichment sources
  const enrichmentSources: EnrichmentSource[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-blue-600" />,
      description: 'Professional profile and work history',
      isPremium: false,
      isEnabled: true
    },
    {
      id: 'company',
      name: 'Company Website',
      icon: <FaGlobe className="text-green-600" />,
      description: 'Information from professional website',
      isPremium: false,
      isEnabled: true
    },
    {
      id: 'apollo',
      name: 'Apollo',
      icon: <FaDatabase className="text-purple-600" />,
      description: 'Comprehensive business contact database',
      isPremium: true,
      isEnabled: false
    },
    {
      id: 'clay',
      name: 'Clay',
      icon: <FaUserTie className="text-amber-600" />,
      description: 'Advanced relationship intelligence',
      isPremium: true,
      isEnabled: false
    }
  ];
  
  // Mock function to simulate enrichment process
  const enrichContact = () => {
    setIsEnriching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock enriched data based on input
      const mockEnrichedData: EnrichmentField[] = [
        {
          id: 'full_name',
          name: 'Full Name',
          value: inputData.name || 'John Smith',
          source: 'input',
          confidence: 100,
          isVerified: true
        },
        {
          id: 'email',
          name: 'Email',
          value: inputData.email || 'john.smith@example.com',
          source: 'input',
          confidence: 100,
          isVerified: true
        },
        {
          id: 'phone',
          name: 'Phone',
          value: inputData.phone || '(555) 123-4567',
          source: 'input',
          confidence: 100,
          isVerified: true
        },
        {
          id: 'job_title',
          name: 'Job Title',
          value: 'Financial Advisor',
          source: 'linkedin',
          confidence: 95,
          isVerified: false
        },
        {
          id: 'company',
          name: 'Company',
          value: 'Smith Financial Services',
          source: 'linkedin',
          confidence: 95,
          isVerified: false
        },
        {
          id: 'company_website',
          name: 'Company Website',
          value: 'www.smithfinancial.com',
          source: 'company',
          confidence: 90,
          isVerified: false
        },
        {
          id: 'location',
          name: 'Location',
          value: 'Chicago, IL',
          source: 'linkedin',
          confidence: 85,
          isVerified: false
        },
        {
          id: 'industry',
          name: 'Industry',
          value: 'Financial Services',
          source: 'linkedin',
          confidence: 90,
          isVerified: false
        },
        {
          id: 'experience',
          name: 'Experience',
          value: '8+ years',
          source: 'linkedin',
          confidence: 80,
          isVerified: false
        },
        {
          id: 'specialties',
          name: 'Specialties',
          value: 'Retirement Planning, Wealth Management',
          source: 'company',
          confidence: 75,
          isVerified: false
        }
      ];
      
      setEnrichedFields(mockEnrichedData);
      setIsEnriching(false);
      setEnrichmentComplete(true);
      setActiveStep(2);
      
      if (onEnrichmentComplete) {
        const formattedData = mockEnrichedData.reduce((acc, field) => {
          acc[field.id] = field.value;
          return acc;
        }, {} as Record<string, any>);
        
        onEnrichmentComplete(formattedData);
      }
    }, 2500);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleEnrichmentSource = (sourceId: string) => {
    // In a real implementation, this would enable/disable data sources
    console.log(`Toggling source: ${sourceId}`);
  };
  
  const verifyField = (fieldId: string) => {
    setEnrichedFields(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, isVerified: true } 
          : field
      )
    );
  };
  
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleInputChange}
            placeholder="John Smith"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Enter at least one field to start enrichment</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleInputChange}
            placeholder="john.smith@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={inputData.phone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Enrichment Sources</h3>
        <div className="space-y-2">
          {enrichmentSources.map(source => (
            <div 
              key={source.id}
              className={`flex items-center justify-between p-2 rounded-lg border ${
                source.isEnabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {source.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-800">{source.name}</h4>
                    {source.isPremium && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{source.description}</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={source.isEnabled}
                  onChange={() => toggleEnrichmentSource(source.id)}
                  disabled={source.isPremium}
                />
                <div className={`
                  w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full
                  ${source.isPremium ? 'opacity-50' : ''}
                `}></div>
              </label>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <button
            onClick={enrichContact}
            disabled={isEnriching || (!inputData.name && !inputData.email && !inputData.phone)}
            className={`
              w-full py-2 rounded-md flex items-center justify-center
              ${isEnriching || (!inputData.name && !inputData.email && !inputData.phone)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {isEnriching ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Enriching...
              </>
            ) : (
              <>
                <FaDatabase className="mr-2" />
                Enrich Contact
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Enriched Profile</h3>
        <button 
          onClick={() => {
            setActiveStep(1);
            setEnrichmentComplete(false);
          }}
          className="text-blue-600 text-sm hover:underline flex items-center"
        >
          Edit Input
        </button>
      </div>
      
      <div className="space-y-3">
        {enrichedFields.map(field => (
          <div 
            key={field.id}
            className={`p-3 rounded-lg border ${
              field.isVerified 
                ? 'border-green-200 bg-green-50' 
                : field.confidence > 85 
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-amber-200 bg-amber-50'
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-800">{field.name}</h4>
                {field.source && field.source !== 'input' && (
                  <div className="ml-2 flex items-center text-xs text-gray-500">
                    <span className="mr-1">via</span>
                    {field.source === 'linkedin' && <FaLinkedin className="text-blue-600" />}
                    {field.source === 'company' && <FaGlobe className="text-green-600" />}
                    {field.source === 'apollo' && <FaDatabase className="text-purple-600" />}
                    {field.source === 'clay' && <FaUserTie className="text-amber-600" />}
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                {field.isVerified ? (
                  <span className="text-xs text-green-600 flex items-center">
                    <FaCheck className="mr-1" />
                    Verified
                  </span>
                ) : (
                  <button 
                    onClick={() => verifyField(field.id)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-1 flex justify-between items-center">
              <p className="text-sm text-gray-800">{field.value}</p>
              
              <div className="flex items-center">
                {field.source !== 'input' && (
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          field.confidence > 85 ? 'bg-green-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${field.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{field.confidence}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-start p-3 bg-blue-50 rounded-lg">
          <FaLock className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-800">Privacy Protection</h4>
            <p className="text-xs text-gray-600 mt-1">
              All enriched data is stored securely in your account and is never shared without your permission.
              You control which data sources are used and can delete enrichment data at any time.
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => {
              // In a real implementation, this would save the contact
              console.log('Saving contact with enriched data');
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <FaCheck className="mr-2" />
            Save Contact
          </button>
          
          <button
            onClick={() => {
              // In a real implementation, this would trigger additional enrichment
              console.log('Requesting more data');
            }}
            className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 flex items-center justify-center"
          >
            <FaDatabase className="mr-2" />
            Enrich More
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Contact Enrichment</h2>
        
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${activeStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-0.5 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        </div>
      </div>
      
      {activeStep === 1 && renderStep1()}
      {activeStep === 2 && renderStep2()}
    </div>
  );
};

export default DataEnrichment;
