import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaVolumeUp, FaSearch } from 'react-icons/fa';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  isProcessing: boolean;
  responseText: string;
  isResponding: boolean;
  selectedVoice?: SpeechSynthesisVoice | null;
  voiceRate?: number;
  voicePitch?: number;
}

export default function VoiceSearch({ 
  onSearch, 
  isProcessing, 
  responseText, 
  isResponding,
  selectedVoice,
  voiceRate = 0.9,
  voicePitch = 1.05
}: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null); // Using any for SpeechRecognition to avoid type errors
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Synthesis setup
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
        console.log('Speech synthesis initialized');
        
        // Force a test utterance to unlock audio on some browsers
        try {
          const unlockAudio = new SpeechSynthesisUtterance(' ');
          unlockAudio.volume = 0;
          unlockAudio.rate = 10;
          window.speechSynthesis.speak(unlockAudio);
          console.log('Audio unlock attempt made');
        } catch (e) {
          console.log('Audio unlock attempt error:', e);
        }
      }
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition setup
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!recognitionRef.current) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          
          recognitionRef.current.onresult = (event: any) => {
            const currentTranscript = Array.from(event.results)
              .map((result: any) => result[0].transcript)
              .join('');
            setTranscript(currentTranscript);
            console.log('Transcript updated:', currentTranscript);
          };
          
          recognitionRef.current.onend = () => {
            console.log('Speech recognition ended, isListening:', isListening);
            if (isListening) {
              console.log('Restarting speech recognition');
              setTimeout(() => {
                try {
                  recognitionRef.current?.start();
                } catch (error) {
                  console.error('Error restarting speech recognition:', error);
                }
              }, 100);
            }
          };
          
          recognitionRef.current.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
          };
          
          console.log('Speech recognition initialized');
        }
      } else {
        console.error('SpeechRecognition not supported in this browser');
      }
    }
    
    return () => {
      if (recognitionRef.current && !isListening) {
        try {
          recognitionRef.current.stop();
          console.log('Speech recognition stopped on cleanup');
        } catch (error) {
          console.error('Error stopping speech recognition on cleanup:', error);
        }
      }
    };
  }, [isListening]);

  // Speak the response when isResponding changes to true
  useEffect(() => {
    if (isResponding && responseText && synthRef.current && !isSpeaking) {
      console.log('Speaking response:', responseText);
      // Add a small delay to ensure speech synthesis is ready
      setTimeout(() => {
        console.log('Attempting to speak response now');
        speakResponse(responseText);
      }, 500);
    }
  }, [isResponding, responseText]);
  
  // Debug log when props change
  useEffect(() => {
    console.log('VoiceSearch props updated:', { 
      isResponding, 
      responseTextLength: responseText?.length || 0,
      selectedVoice: selectedVoice?.name,
      voiceRate,
      voicePitch,
      isSpeaking
    });
  }, [isResponding, responseText, selectedVoice, voiceRate, voicePitch, isSpeaking]);
  
  // Direct test function for speech synthesis
  const testSpeech = () => {
    const testText = "This is a test of the speech synthesis system. Can you hear me now?";
    console.log('Testing speech with text:', testText);
    
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(testText);
    
    // Set up event handlers
    utterance.onstart = () => {
      console.log('Test speech started');
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log('Test speech ended');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (e) => {
      console.error('Test speech error:', e);
      setIsSpeaking(false);
    };
    
    // Use selected voice if available
    if (selectedVoice) {
      console.log('Using selected voice for test:', selectedVoice.name);
      utterance.voice = selectedVoice;
    } else {
      console.log('No selected voice, using default');
    }
    
    // Use voice parameters from settings
    utterance.rate = voiceRate;
    utterance.pitch = voicePitch;
    utterance.volume = 1.0;
    
    // Force browser to unlock audio
    const unlockAudio = new SpeechSynthesisUtterance(' ');
    unlockAudio.volume = 0;
    unlockAudio.rate = 10;
    window.speechSynthesis.speak(unlockAudio);
    
    // Wait a short time before speaking the actual text
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
        console.log('Test speech initiated with rate:', voiceRate, 'pitch:', voicePitch);
      } catch (error) {
        console.error('Error in test speech:', error);
        setIsSpeaking(false);
      }
    }, 100);
  };
  
  // Debug logging
  useEffect(() => {
    if (isResponding) {
      console.log('Response state changed - isResponding:', isResponding, 'responseText length:', responseText?.length);
    }
  }, [isResponding, responseText]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setTranscript('');
    setIsListening(true);
    
    // Make sure we have a recognition instance
    if (!recognitionRef.current && typeof window !== 'undefined') {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setTranscript(currentTranscript);
          console.log('Transcript updated:', currentTranscript);
        };
        
        recognitionRef.current.onend = () => {
          console.log('Speech recognition ended, isListening:', isListening);
          if (isListening) {
            console.log('Restarting speech recognition');
            recognitionRef.current?.start();
          }
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            console.log('No speech detected, continuing to listen');
          }
        };
      }
    }
    
    try {
      console.log('Starting speech recognition');
      recognitionRef.current?.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    console.log('Stopping speech recognition');
    setIsListening(false);
    
    try {
      recognitionRef.current?.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
    
    if (transcript.trim()) {
      console.log('Submitting transcript:', transcript.trim());
      
      // Force a small delay before submitting to ensure the UI updates
      setTimeout(() => {
        onSearch(transcript.trim());
        
        // Log that we've submitted the search
        console.log('Search submitted with transcript:', transcript.trim());
        
        // Force a direct test response if needed
        if (process.env.NODE_ENV === 'development') {
          console.log('Development mode: forcing a direct test response');
          setTimeout(() => {
            const testResponse = `I heard you say: "${transcript.trim()}". Here's what I found based on your query.`;
            speakResponse(testResponse);
          }, 1000);
        }
      }, 100);
    } else {
      console.log('No transcript to submit');
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    // Prepare a more conversational response
    // For long responses, extract the first few sentences for better UX
    let speechText = text;
    if (text.length > 200) {
      // Get first 2-3 sentences for speech, but keep full text in UI
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      if (sentences.length > 2) {
        speechText = sentences.slice(0, 3).join(' ') + ' I can provide more details if you would like.';
      }
    }
    
    console.log('Speaking text:', speechText);
    setIsSpeaking(true);
    
    // Create a simple test utterance to unlock audio on some browsers
    try {
      const unlockAudio = new SpeechSynthesisUtterance(' ');
      unlockAudio.volume = 0; // Silent
      unlockAudio.rate = 10; // Super fast
      synthRef.current.speak(unlockAudio);
    } catch (e) {
      console.log('Audio unlock attempt:', e);
    }
    
    const utterance = new SpeechSynthesisUtterance(speechText);
    
    // Set up event handlers first before calling speak()
    utterance.onstart = () => {
      console.log('Speech started');
    };
    
    utterance.onend = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    // Use selected voice if available
    if (selectedVoice) {
      console.log('Using selected voice:', selectedVoice.name);
      utterance.voice = selectedVoice;
    }
    
    // Use voice parameters from settings
    utterance.rate = voiceRate; // Use rate from settings
    utterance.pitch = voicePitch; // Use pitch from settings
    utterance.volume = 1.0; // Maximum volume
    
    // Try to load voices if they're not already loaded
    const voices = synthRef.current.getVoices();
    
    if (voices.length === 0) {
      // If voices aren't loaded yet, wait for them
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = synthRef.current?.getVoices() || [];
        console.log('Voices loaded:', updatedVoices.length);
        selectBestVoice(utterance, updatedVoices);
        if (synthRef.current) {
          try {
            // Force a pause before speaking to ensure the synthesis engine is ready
            setTimeout(() => {
              synthRef.current?.speak(utterance);
              console.log('Speaking after voices loaded');
            }, 300);
          } catch (error) {
            console.error('Error speaking:', error);
            setIsSpeaking(false);
          }
        }
      };
    } else {
      // Voices are already loaded
      console.log('Using available voices:', voices.length);
      selectBestVoice(utterance, voices);
      try {
        // Force a longer pause before speaking to ensure the synthesis engine is ready
        setTimeout(() => {
          if (synthRef.current) {
            synthRef.current.cancel(); // Cancel any previous speech again just to be sure
            synthRef.current.speak(utterance);
            console.log('Speaking with available voices');
          }
        }, 300);
      } catch (error) {
        console.error('Error speaking:', error);
        setIsSpeaking(false);
      }
    }
  };
  
  // Helper function to select the best available voice
  const selectBestVoice = (utterance: SpeechSynthesisUtterance, voices: SpeechSynthesisVoice[]) => {
    // Priority order for voice selection
    const preferredVoices = voices.filter(voice => 
      voice.name.includes('Google') || // Google voices tend to sound more natural
      voice.name.includes('Premium') || // Premium voices if available
      voice.name.includes('Neural') || // Neural voices if available
      voice.name.includes('Enhanced') // Enhanced voices if available
    );
    
    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
      return;
    }
    
    // Find a female voice as fallback, which often sounds more natural for assistants
    const femaleVoice = voices.find(voice => 
      voice.name.includes('female') || 
      voice.name.includes('Female') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
      return;
    }
    
    // Last resort - find any voice that's not the default
    const nonDefaultVoice = voices.find(voice => !voice.default);
    if (nonDefaultVoice) {
      utterance.voice = nonDefaultVoice;
    }
  };

  const handleManualSearch = () => {
    if (transcript.trim()) {
      onSearch(transcript.trim());
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Voice-Enabled Referral Search</h2>
          <div className="flex space-x-2">
            {/* Voice search button */}
            <button
              onClick={toggleListening}
              className={`flex items-center justify-center w-12 h-12 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} hover:opacity-90 transition-colors`}
              disabled={isProcessing}
              aria-label={isListening ? 'Stop listening' : 'Start voice search'}
            >
              {isListening ? <FaStop /> : <FaMicrophone />}
            </button>
            
            {/* Test speech button - using window.speechSynthesis directly */}
            <button
              onClick={() => {
                const testText = "This is a test of the speech synthesis system. Can you hear me now?";
                console.log('Testing speech directly with window.speechSynthesis');
                
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  
                  // Force browser to unlock audio
                  const unlockAudio = new SpeechSynthesisUtterance(' ');
                  unlockAudio.volume = 0;
                  unlockAudio.rate = 10;
                  window.speechSynthesis.speak(unlockAudio);
                  
                  setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(testText);
                    
                    // Set up event handlers
                    utterance.onstart = () => console.log('Direct test speech started');
                    utterance.onend = () => console.log('Direct test speech ended');
                    utterance.onerror = (e) => console.error('Direct test speech error:', e);
                    
                    // Use selected voice if available
                    if (selectedVoice) {
                      console.log('Using selected voice for direct test:', selectedVoice.name);
                      utterance.voice = selectedVoice;
                    }
                    
                    // Use voice parameters from settings
                    utterance.rate = voiceRate;
                    utterance.pitch = voicePitch;
                    utterance.volume = 1.0;
                    
                    // Speak
                    window.speechSynthesis.speak(utterance);
                    console.log('Direct test speech initiated');
                  }, 100);
                }
              }}
              className="flex items-center justify-center px-3 h-12 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <FaVolumeUp className="mr-2" /> Test Voice
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Ask for a referral partner or say 'Find me a...' (e.g., 'Find me a tax attorney in California')"
            className="w-full p-3 border border-gray-300 rounded-lg pr-12"
            disabled={isListening}
          />
          <button 
            onClick={handleManualSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
            disabled={isProcessing || !transcript.trim()}
          >
            <FaSearch />
          </button>
        </div>
        
        {isListening && (
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-8 bg-blue-500 rounded-full animate-pulse"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    height: `${Math.random() * 24 + 8}px` 
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {isProcessing && (
          <div className="text-center text-gray-500">
            Processing your request...
          </div>
        )}
      </div>
    </div>
  );
}

// Add type definitions for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
