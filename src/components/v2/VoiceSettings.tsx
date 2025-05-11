import React, { useState, useEffect } from 'react';
import { FaCog, FaVolumeUp, FaCheck } from 'react-icons/fa';

interface VoiceSettingsProps {
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
  onRateChange?: (rate: number) => void;
  onPitchChange?: (pitch: number) => void;
  selectedVoice?: SpeechSynthesisVoice | null;
}

export default function VoiceSettings({ 
  onVoiceChange, 
  onRateChange, 
  onPitchChange,
  selectedVoice 
}: VoiceSettingsProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.05);
  const [previewText, setPreviewText] = useState("This is how the voice will sound.");
  const [isPlaying, setIsPlaying] = useState(false);

  // Load available voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Play a preview of the selected voice
  const playVoicePreview = (voice: SpeechSynthesisVoice) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(true);
      
      const utterance = new SpeechSynthesisUtterance(previewText);
      
      // Set up event handlers first before calling speak()
      utterance.onend = () => {
        console.log('Voice preview ended');
        setIsPlaying(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Voice preview error:', event);
        setIsPlaying(false);
      };
      
      // Set voice and parameters
      utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1.0;
      
      // Add a small delay before speaking to ensure the synthesis engine is ready
      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
          console.log('Playing voice preview with voice:', voice.name);
        } catch (error) {
          console.error('Error playing voice preview:', error);
          setIsPlaying(false);
        }
      }, 100);
    }
  };

  // Handle voice selection
  const handleVoiceSelect = (voice: SpeechSynthesisVoice) => {
    onVoiceChange(voice);
    playVoicePreview(voice);
  };

  // Handle rate change
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    if (onRateChange) onRateChange(newRate);
  };

  // Handle pitch change
  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseFloat(e.target.value);
    setPitch(newPitch);
    if (onPitchChange) onPitchChange(newPitch);
  };

  // Group voices by language
  const groupedVoices = voices.reduce((groups: Record<string, SpeechSynthesisVoice[]>, voice) => {
    const lang = voice.lang;
    if (!groups[lang]) {
      groups[lang] = [];
    }
    groups[lang].push(voice);
    return groups;
  }, {});

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-expanded={isOpen}
      >
        <FaCog className="text-gray-600" />
        <span>Voice Settings</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-800 mb-3">Voice Settings</h3>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Voice</label>
              <div className="max-h-40 overflow-y-auto pr-2">
                {Object.entries(groupedVoices).map(([lang, langVoices]) => (
                  <div key={lang} className="mb-2">
                    <div className="text-xs text-gray-500 mb-1">{lang}</div>
                    {langVoices.map(voice => (
                      <button
                        key={`${voice.name}-${voice.lang}`}
                        onClick={() => handleVoiceSelect(voice)}
                        className={`w-full text-left px-2 py-1 rounded text-sm mb-1 flex items-center justify-between ${
                          selectedVoice?.name === voice.name ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{voice.name}</span>
                        {selectedVoice?.name === voice.name && <FaCheck className="text-blue-500" />}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Speed: {rate.toFixed(1)}x</label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={rate}
                onChange={handleRateChange}
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Pitch: {pitch.toFixed(1)}</label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Preview text"
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={() => selectedVoice && playVoicePreview(selectedVoice)}
                disabled={!selectedVoice || isPlaying}
                className={`px-3 py-1 rounded-r-lg flex items-center ${
                  !selectedVoice || isPlaying
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaVolumeUp />
              </button>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
