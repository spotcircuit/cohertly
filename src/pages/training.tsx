import { useState } from 'react';
import Layout from '../components/Layout';
import { 
  FaLightbulb, FaPlay, FaCheck, FaLock, FaStar, 
  FaArrowRight, FaMicrophone, FaVolumeUp, FaPause, 
  FaRedo, FaChartLine
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Mock training scenarios
const scenarios = [
  {
    id: 1,
    title: 'Door Knocking Introduction',
    description: 'Learn how to make a great first impression when meeting potential clients face-to-face.',
    image: '/images/doorknock.png',
    duration: '15 min',
    completed: true,
    score: 92,
  },
  {
    id: 2,
    title: 'Explaining Storm Damage',
    description: 'Master the art of explaining complex damage assessments in simple, understandable terms.',
    image: '/images/hailroof.png',
    duration: '20 min',
    completed: true,
    score: 88,
  },
  {
    id: 3,
    title: 'Handling Price Objections',
    description: 'Learn effective techniques for addressing common price objections and concerns.',
    image: '/images/handlingprice.png',
    duration: '25 min',
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: 'Insurance Claim Process',
    description: 'Guide clients through the insurance claim process with confidence and expertise.',
    image: '/images/insurancehandling.png',
    duration: '30 min',
    completed: false,
    locked: true,
  },
  {
    id: 5,
    title: 'Closing the Sale',
    description: 'Master proven techniques to effectively close sales and secure new business.',
    image: '/images/closingsale.png',
    duration: '20 min',
    completed: false,
    locked: true,
  },
];

// Mock conversation for the active scenario
const mockConversation = [
  {
    speaker: 'ai',
    text: 'In this scenario, you\'ll practice handling price objections. I\'ll play the role of a potential client who is concerned about your pricing. Let\'s begin.',
    type: 'intro',
  },
  {
    speaker: 'ai',
    text: 'I\'ve been looking at several options, and honestly, your price seems a bit high compared to others I\'ve received quotes from. Why should I pay more for your services?',
    type: 'question',
  },
  {
    speaker: 'user',
    text: 'I understand your concern about the price. What sets us apart is our comprehensive approach. Our quote includes premium materials with a 30-year warranty, certified installation by our expert team, and ongoing support. While others might offer a lower initial price, they often add charges later or use lower-quality materials. We believe in transparency and delivering exceptional value that saves you money in the long run. Would you like me to break down the specific benefits included in our quote?',
    type: 'response',
  },
  {
    speaker: 'ai',
    text: 'That\'s helpful, but I\'m still not convinced. My budget is really tight right now, and I need to keep costs down.',
    type: 'follow-up',
  },
];

// Feedback for the user's response
const mockFeedback = {
  strengths: [
    "Acknowledged the client's concern without being defensive",
    "Clearly explained the value proposition and differentiators",
    "Offered specific examples of what's included in the price",
    "Used the 'quality over time' argument effectively",
    "Ended with an open question to continue the conversation"
  ],
  improvements: [
    "Consider mentioning financing options for budget-conscious clients",
    "Could provide a specific example of long-term cost savings",
    "Try using more social proof (e.g., testimonials from satisfied customers)"
  ],
  overallScore: 88,
};

export default function Training() {
  const [activeScenario, setActiveScenario] = useState<number | null>(3);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handle starting a scenario
  const startScenario = (id: number) => {
    setActiveScenario(id);
    setShowFeedback(false);
  };
  
  // Handle completing a scenario
  const completeScenario = () => {
    setShowFeedback(true);
  };
  
  // Handle recording toggle
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate finishing recording after 3 seconds
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        completeScenario();
      }, 3000);
    }
  };
  
  // Handle playback toggle
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[225px] rounded-lg mb-4">
        <Image 
          src="/images/hero.png" 
          alt="AI Training Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3">
            <FaLightbulb /> AI Interactive Practice
          </h1>
        </div>
      </div>
      
      {/* Small padding */}
      <div className="h-2"></div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Scenarios List */}
        <div className="lg:col-span-1">
          <div className="glass-card p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Practice Scenarios
            </h3>
            
            <div className="space-y-3">
              {scenarios.map(scenario => (
                <div 
                  key={scenario.id}
                  className={`p-3 rounded-lg ${scenario.locked 
                    ? 'bg-gray-100 border border-gray-200' 
                    : scenario.completed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-white border border-indigo-200 hover:bg-indigo-50 cursor-pointer'
                  } transition-colors relative overflow-hidden`}
                  onClick={() => !scenario.locked && startScenario(scenario.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        {scenario.completed && <FaCheck className="text-green-500" size={12} />}
                        {scenario.locked && <FaLock className="text-gray-400" size={12} />}
                        {scenario.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">{scenario.description}</p>
                    </div>
                    
                    {scenario.completed ? (
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-green-600">{scenario.score}</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar 
                              key={i} 
                              size={10} 
                              className={i < Math.round((scenario.score || 0) / 20) ? 'text-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">{scenario.duration}</span>
                    )}
                  </div>
                  
                  {!scenario.locked && !scenario.completed && (
                    <button 
                      className="mt-2 w-full flex items-center justify-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs py-1 px-3 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        startScenario(scenario.id);
                      }}
                    >
                      <FaPlay size={10} /> Start Practice
                    </button>
                  )}
                  
                  {scenario.locked && (
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-30 flex items-center justify-center">
                      <div className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 flex items-center gap-1 shadow-sm">
                        <FaLock size={10} /> Complete previous scenarios
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-indigo-100">
              <Link href="/training-stats" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
                <FaChartLine size={12} /> View Your Progress
              </Link>
            </div>
          </div>
          
          {/* Training Tips */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Training Tips
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800">Practice Regularly</h4>
                <p className="mt-1 text-xs text-gray-600">Consistent practice is key to mastering sales techniques. Aim for at least 15 minutes daily.</p>
              </div>
              
              <div className="p-3 bg-white rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800">Review Your Feedback</h4>
                <p className="mt-1 text-xs text-gray-600">Pay attention to feedback and focus on improving one aspect at a time.</p>
              </div>
              
              <div className="p-3 bg-white rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800">Record Real Conversations</h4>
                <p className="mt-1 text-xs text-gray-600">With permission, record actual client interactions to review and improve.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Active Scenario */}
        <div className="lg:col-span-2">
          {activeScenario ? (
            <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
              {/* Scenario Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {scenarios.find(s => s.id === activeScenario)?.title}
                  </h2>
                  <p className="text-sm text-gray-600">{scenarios.find(s => s.id === activeScenario)?.description}</p>
                </div>
                <button 
                  onClick={() => setActiveScenario(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {/* Scenario Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={scenarios.find(s => s.id === activeScenario)?.image || '/images/handlingprice.png'}
                  alt={scenarios.find(s => s.id === activeScenario)?.title || 'Training scenario'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              {/* Conversation */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 h-64 overflow-y-auto">
                {mockConversation.map((message, index) => (
                  <div key={index} className={`mb-3 ${message.speaker === 'ai' ? '' : 'text-right'}`}>
                    <div className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                      message.speaker === 'ai' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {message.speaker === 'ai' ? 'AI Coach' : 'You'}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Controls */}
              {!showFeedback ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-3">
                    {isRecording 
                      ? 'Recording your response...' 
                      : 'How would you respond to this objection?'
                    }
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={togglePlayback}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition-colors"
                    >
                      {isPlaying ? <FaPause size={20} /> : <FaVolumeUp size={20} />}
                    </button>
                    
                    <button 
                      onClick={toggleRecording}
                      className={`${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      } p-4 rounded-full transition-colors`}
                    >
                      <FaMicrophone size={24} />
                    </button>
                    
                    <button 
                      onClick={() => completeScenario()}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition-colors"
                    >
                      <FaArrowRight size={20} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    Click the microphone to record your response or skip to see feedback
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Feedback</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {mockFeedback.overallScore}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Overall Score</div>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar 
                              key={i} 
                              size={16} 
                              className={i < Math.round(mockFeedback.overallScore / 20) ? 'text-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowFeedback(false)}
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm px-4 py-2 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <FaRedo size={14} /> Try Again
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-700 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {mockFeedback.strengths.map((strength, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                            <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 mb-2">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {mockFeedback.improvements.map((improvement, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                            <FaArrowRight className="text-blue-500 mt-0.5 flex-shrink-0" size={12} />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <button 
                      onClick={() => {
                        setActiveScenario(null);
                        // In a real app, we would mark this scenario as completed
                      }}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Exit Practice
                    </button>
                    
                    <button 
                      onClick={() => {
                        // In a real app, we would mark this scenario as completed and move to the next one
                        setActiveScenario(4);
                        setShowFeedback(false);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      Next Scenario <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg flex flex-col items-center justify-center h-full">
              <FaLightbulb className="text-yellow-400 text-4xl mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to AI Interactive Practice</h2>
              <p className="text-center text-gray-600 mb-6 max-w-md">
                Practice your sales and communication skills in realistic scenarios with our AI coach. 
                Select a scenario from the left to get started.
              </p>
              <button 
                onClick={() => startScenario(1)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlay /> Start First Scenario
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
