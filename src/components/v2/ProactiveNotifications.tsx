import React, { useState, useRef } from 'react';
import { FaBell, FaVolumeUp, FaCheck, FaTimes, FaClock, FaUser } from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'reminder' | 'update' | 'alert';
  title: string;
  message: string;
  time: string;
  actionRequired?: boolean;
  contactName?: string;
  contactId?: string;
}

interface ProactiveNotificationsProps {
  notifications: Notification[];
  onAction: (notificationId: string, action: 'accept' | 'decline' | 'remind' | 'view') => void;
  selectedVoice?: SpeechSynthesisVoice | null;
  voiceRate?: number;
  voicePitch?: number;
}

export default function ProactiveNotifications({ 
  notifications, 
  onAction,
  selectedVoice,
  voiceRate = 0.9,
  voicePitch = 1.05
}: ProactiveNotificationsProps) {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech synthesis
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Force load voices
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        console.log('Loaded voices:', voices.length);
      };
      
      // Try to load voices immediately
      loadVoices();
      
      // Also set up event listener for when voices are available
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      console.error('Speech synthesis not supported in this browser');
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      // Clean up event listener
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const playNotification = (notification: Notification) => {
    setActiveNotification(notification);
    console.log('Playing notification:', notification.title);
    
    if (!synthRef.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    setIsPlaying(true);
    
    // Safari and some mobile browsers require a user gesture to enable audio
    // This empty utterance helps unlock audio capabilities
    try {
      const unlockAudio = new SpeechSynthesisUtterance(' ');
      unlockAudio.volume = 0; // Silent
      unlockAudio.rate = 10; // Super fast
      synthRef.current.speak(unlockAudio);
    } catch (e) {
      console.log('Audio unlock attempt:', e);
    }
    
    // Create utterance with notification message
    const utterance = new SpeechSynthesisUtterance(notification.message);
    
    // Set up event handlers first before calling speak()
    utterance.onstart = () => {
      console.log('Notification speech started');
    };
    
    utterance.onend = () => {
      console.log('Notification speech ended');
      setIsPlaying(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Notification speech error:', event);
      setIsPlaying(false);
    };
    
    // Use voice parameters from settings
    utterance.rate = voiceRate; // Use rate from settings
    utterance.pitch = voicePitch; // Use pitch from settings
    utterance.volume = 1.0; // Maximum volume
    
    // Try to load voices if they're not already loaded
    const voices = synthRef.current.getVoices();
    
    // Function to select and speak with the best voice
    const speakWithBestVoice = (availableVoices: SpeechSynthesisVoice[]) => {
      console.log('Available voices:', availableVoices.length);
      
      // Use the selected voice from settings if available
      if (selectedVoice) {
        console.log('Using user-selected voice:', selectedVoice.name);
        utterance.voice = selectedVoice;
      } else {
        // Try to use a more natural-sounding voice if available
        const preferredVoices = availableVoices.filter(voice => 
          voice.name.includes('Google') || // Google voices tend to sound more natural
          voice.name.includes('Premium') || // Premium voices if available
          voice.name.includes('Neural') || // Neural voices if available
          voice.name.includes('Enhanced') // Enhanced voices if available
        );
        
        if (preferredVoices.length > 0) {
          utterance.voice = preferredVoices[0];
          console.log('Using preferred voice:', preferredVoices[0].name);
        } else {
          // Find a female voice as fallback, which often sounds more natural for assistants
          const femaleVoice = availableVoices.find(voice => 
            voice.name.includes('female') || 
            voice.name.includes('Female') ||
            voice.name.includes('Samantha') ||
            voice.name.includes('Victoria')
          );
          
          if (femaleVoice) {
            utterance.voice = femaleVoice;
            console.log('Using female voice:', femaleVoice.name);
          } else {
            // Last resort - find any voice that's not the default
            const nonDefaultVoice = availableVoices.find(voice => !voice.default);
            if (nonDefaultVoice) {
              utterance.voice = nonDefaultVoice;
              console.log('Using non-default voice:', nonDefaultVoice.name);
            }
          }
        }
      }
      
      // Speak the notification with a small delay to ensure speech synthesis is ready
      try {
        setTimeout(() => {
          synthRef.current?.speak(utterance);
          console.log('Speaking notification with selected voice');
        }, 100);
      } catch (error) {
        console.error('Error speaking notification:', error);
        setIsPlaying(false);
      }
    };
    
    if (voices.length === 0) {
      // If voices aren't loaded yet, wait for them
      console.log('No voices loaded, waiting for voices to load...');
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = synthRef.current?.getVoices() || [];
        console.log('Voices loaded:', updatedVoices.length);
        // Add a small delay to ensure the voices are properly loaded
        setTimeout(() => {
          speakWithBestVoice(updatedVoices);
        }, 200);
      };
    } else {
      // Voices are already loaded
      console.log('Using available voices:', voices.length);
      // Add a small delay to ensure the speech synthesis is ready
      setTimeout(() => {
        speakWithBestVoice(voices);
      }, 100);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaBell className="mr-2 text-amber-500" />
          Notifications
          {notifications.length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`border rounded-lg p-4 ${
              activeNotification?.id === notification.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            } transition-colors`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                
                {notification.contactName && (
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <FaUser className="mr-1" />
                    <span>{notification.contactName}</span>
                  </div>
                )}
                
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <FaClock className="mr-1" />
                  <span>{notification.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => playNotification(notification)}
                  className={`p-2 rounded-full ${
                    isPlaying && activeNotification?.id === notification.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={isPlaying && activeNotification?.id === notification.id}
                >
                  <FaVolumeUp />
                </button>
              </div>
            </div>
            
            {notification.actionRequired && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button 
                  onClick={() => {
                    stopSpeaking();
                    onAction(notification.id, 'accept');
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center"
                >
                  <FaCheck className="mr-1" />
                  Yes
                </button>
                <button 
                  onClick={() => {
                    stopSpeaking();
                    onAction(notification.id, 'decline');
                  }}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors flex items-center"
                >
                  <FaTimes className="mr-1" />
                  No
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
