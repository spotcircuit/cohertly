import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaVolumeUp, FaCommentDots, FaSpinner } from 'react-icons/fa';
import { getConversationService, ConversationState } from '../../utils/conversationService';
import { getTextToSpeechService } from '../../utils/textToSpeechService';

interface StreamingVoiceSearchProps {
  selectedVoice?: SpeechSynthesisVoice | null;
  voiceRate?: number;
  voicePitch?: number;
  onSearchResults?: (results: any) => void;
}

export default function StreamingVoiceSearch({
  selectedVoice,
  voiceRate = 0.9,
  voicePitch = 1.05,
  onSearchResults
}: StreamingVoiceSearchProps) {
  const [conversationState, setConversationState] = useState<ConversationState>(ConversationState.IDLE);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<Array<{role: string, content: string}>>([]);
  const [isSupported, setIsSupported] = useState(true);
  
  const conversationService = useRef(getConversationService({
    voiceOptions: {
      voice: selectedVoice,
      rate: voiceRate,
      pitch: voicePitch
    },
    pushToTalk: true
  }));

  // Initialize conversation service
  useEffect(() => {
    const service = conversationService.current;
    
    // Check if speech recognition and synthesis are supported
    setIsSupported(service.isSupported());
    
    // Set up event handlers
    service.onTranscript((text, isFinal) => {
      setTranscript(text);
      console.log(`Transcript ${isFinal ? 'final' : 'interim'}: ${text}`);
    });
    
    service.onResponse((text, isComplete) => {
      setResponse(text);
      console.log(`Response ${isComplete ? 'complete' : 'partial'}: ${text.substring(0, 50)}...`);
      
      // If we have search results callback and this is a complete response,
      // try to extract structured data
      if (onSearchResults && isComplete) {
        try {
          // Simple extraction of potential structured data
          // In a real implementation, this would be more sophisticated
          if (text.includes('network partners') || text.includes('partners')) {
            const mockResults = {
              networkPartners: [
                {
                  id: 'partner1',
                  name: 'John Smith',
                  company: 'Smith Financial',
                  specialty: 'Financial Planning',
                  location: 'New York',
                  inNetwork: true,
                  referralsSent: 12,
                  referralsReceived: 8,
                  trustScore: 9
                }
              ],
              externalPartners: []
            };
            
            onSearchResults(mockResults);
          }
        } catch (error) {
          console.error('Error extracting search results:', error);
        }
      }
    });
    
    service.onStateChange((state) => {
      setConversationState(state);
      console.log('Conversation state changed:', state);
    });
    
    service.onError((error) => {
      console.error('Conversation error:', error);
    });
    
    return () => {
      // Clean up
      service.stopConversation();
    };
  }, [onSearchResults]);

  // Update voice options when they change
  useEffect(() => {
    // Get a fresh instance of the text-to-speech service directly
    const ttsService = getTextToSpeechService();
    if (selectedVoice) {
      ttsService.setDefaultVoice(selectedVoice);
    }
    if (voiceRate) {
      ttsService.setDefaultRate(voiceRate);
    }
    if (voicePitch) {
      ttsService.setDefaultPitch(voicePitch);
    }
  }, [selectedVoice, voiceRate, voicePitch]);

  // Update history when conversation state changes
  useEffect(() => {
    if (conversationState === ConversationState.IDLE) {
      setHistory(conversationService.current.getHistory());
    }
  }, [conversationState]);

  const toggleListening = () => {
    const service = conversationService.current;
    
    if (conversationState === ConversationState.LISTENING) {
      service.stopListening();
    } else if (conversationState === ConversationState.IDLE) {
      setTranscript('');
      service.startListening();
    }
  };

  const stopConversation = () => {
    conversationService.current.stopConversation();
  };

  const clearHistory = () => {
    conversationService.current.clearHistory();
    setHistory([]);
    setResponse('');
    setTranscript('');
    console.log('Conversation history cleared');
  };
  
  // Reset the conversation state after responding
  useEffect(() => {
    if (conversationState === ConversationState.IDLE && response) {
      // After a response is complete and we're back to idle, reset the transcript
      // but keep the response visible
      setTranscript('');
    }
  }, [conversationState, response]);

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
        <p>Your browser doesn't support speech recognition or synthesis. Please try using Chrome, Edge, or Safari.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={toggleListening}
            disabled={conversationState === ConversationState.PROCESSING || conversationState === ConversationState.RESPONDING}
            className={`flex items-center justify-center w-14 h-14 rounded-full transition-colors ${
              conversationState === ConversationState.LISTENING 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } ${(conversationState === ConversationState.PROCESSING || conversationState === ConversationState.RESPONDING) ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={conversationState === ConversationState.LISTENING ? 'Stop listening' : 'Start voice search'}
          >
            {conversationState === ConversationState.LISTENING ? <FaStop size={24} /> : <FaMicrophone size={24} />}
          </button>
          
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">
              {conversationState === ConversationState.IDLE && 'Click the microphone to start speaking'}
              {conversationState === ConversationState.LISTENING && 'Listening...'}
              {conversationState === ConversationState.PROCESSING && 'Processing...'}
              {conversationState === ConversationState.RESPONDING && 'Responding...'}
              {conversationState === ConversationState.ERROR && 'Error occurred'}
            </div>
            
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Voice search results will appear here..."
                value={conversationState === ConversationState.LISTENING ? transcript : response}
                readOnly
              />
              
              {(conversationState === ConversationState.PROCESSING || conversationState === ConversationState.RESPONDING) && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaSpinner className="animate-spin text-blue-500" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {(conversationState === ConversationState.RESPONDING) && (
              <button
                onClick={stopConversation}
                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                title="Stop response"
              >
                <FaStop />
              </button>
            )}
            
            <button
              onClick={clearHistory}
              className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              title="Clear conversation history"
            >
              <FaCommentDots />
            </button>
            
            {/* Direct test button for debugging */}
            <button
              onClick={() => {
                // Stop any ongoing conversation
                conversationService.current.stopConversation();
                
                // Generate a varied test response based on the transcript
                const userInput = transcript || 'Hello';
                const responses = [
                  `I heard you say: "${userInput}". Here are some referral partners that might match your query. I found 3 financial advisors in your network that specialize in retirement planning.`,
                  `Based on your query "${userInput}", I've identified several potential referral partners. Would you like me to filter them by location or specialty?`,
                  `Thank you for your query: "${userInput}". I found 2 attorneys and 1 tax professional who might be a good match. They all have excellent ratings from previous clients.`
                ];
                
                // Pick a random response
                const testText = responses[Math.floor(Math.random() * responses.length)];
                setResponse(testText);
                
                // Add to history
                const updatedHistory = [
                  ...history,
                  { role: 'user', content: userInput },
                  { role: 'assistant', content: testText }
                ];
                setHistory(updatedHistory);
                
                // Set state to responding
                setConversationState(ConversationState.RESPONDING);
                
                // Speak the response
                const tts = getTextToSpeechService();
                tts.speak(testText, {
                  voice: selectedVoice,
                  rate: voiceRate,
                  pitch: voicePitch
                }).then(() => {
                  // Reset to idle when speech is complete
                  setConversationState(ConversationState.IDLE);
                  setTranscript(''); // Clear the transcript for the next query
                }).catch(error => {
                  console.error('Error speaking test response:', error);
                  setConversationState(ConversationState.ERROR);
                });
              }}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              title="Force Test Response"
            >
              <FaVolumeUp />
            </button>
          </div>
        </div>
      </div>
      
      {/* Conversation History */}
      {history.length > 0 && (
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Conversation History</h3>
          </div>
          <div className="p-4 max-h-60 overflow-y-auto">
            {history.map((message, index) => (
              <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block px-4 py-2 rounded-lg max-w-3/4 ${
                  message.role === 'user' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-xs text-gray-500 mb-1">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
