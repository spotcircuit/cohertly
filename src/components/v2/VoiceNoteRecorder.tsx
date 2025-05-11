import React, { useState, useRef, useEffect } from 'react';
import { 
  FaMicrophone, FaStop, FaPlay, FaPause, 
  FaTrash, FaPaperPlane, FaSpinner, FaCheck,
  FaEnvelope, FaSms, FaFileAudio
} from 'react-icons/fa';

interface VoiceNoteRecorderProps {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  onSend?: (data: {
    audioBlob: Blob;
    transcript: string;
    deliveryMethod: 'email' | 'text' | 'both';
    attachAudio: boolean;
  }) => void;
  className?: string;
}

export default function VoiceNoteRecorder({
  contactName,
  contactEmail,
  contactPhone,
  onSend,
  className = ''
}: VoiceNoteRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'text' | 'both'>('both');
  const [attachAudio, setAttachAudio] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        // Auto-transcribe
        transcribeAudio(audioBlob);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  // Play/pause audio
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reset everything
  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setTranscript('');
    setRecordingTime(0);
    setSendSuccess(false);
  };

  // Mock transcription (in a real app, this would call a speech-to-text API)
  const transcribeAudio = (audioBlob: Blob) => {
    setIsTranscribing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate mock transcript based on contact name
      const mockTranscripts = [
        `Hi ${contactName || 'there'}, I wanted to follow up on our conversation about the referral opportunity. Let me know if you need any additional information.`,
        `Hello ${contactName || 'there'}, I'm sending this voice note to discuss the potential partnership we talked about. Please let me know your thoughts.`,
        `Hey ${contactName || 'there'}, just wanted to check in about the client we discussed. They're ready to move forward and I think this would be a great fit for you.`
      ];
      
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      setIsTranscribing(false);
    }, 2000);
  };

  // Send voice note
  const sendVoiceNote = () => {
    if (!audioBlob) return;
    
    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      if (onSend) {
        onSend({
          audioBlob,
          transcript,
          deliveryMethod,
          attachAudio
        });
      }
      
      setIsSending(false);
      setSendSuccess(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setSendSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Handle audio playback ended
  useEffect(() => {
    const handlePlaybackEnded = () => {
      setIsPlaying(false);
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handlePlaybackEnded);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handlePlaybackEnded);
      }
    };
  }, [audioRef.current]);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      <h3 className="text-lg font-medium mb-3">
        {contactName ? `Send Voice Note to ${contactName}` : 'Record Voice Note'}
      </h3>
      
      {/* Recording UI */}
      <div className="flex flex-col items-center">
        {!audioBlob ? (
          <div className="mb-4 flex flex-col items-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
            </button>
            <div className="mt-2 text-sm font-medium">
              {isRecording ? `Recording ${formatTime(recordingTime)}` : 'Tap to Record'}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* Audio player */}
            <div className="mb-4 flex items-center justify-center">
              <audio ref={audioRef} src={audioUrl || undefined} className="hidden" />
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlayback}
                  className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="text-sm font-medium">
                  {formatTime(recordingTime)}
                </div>
                <button
                  onClick={resetRecording}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
            
            {/* Transcription */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Transcription</h4>
              {isTranscribing ? (
                <div className="bg-gray-50 p-3 rounded flex items-center justify-center">
                  <FaSpinner className="animate-spin text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">Transcribing...</span>
                </div>
              ) : (
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                  rows={4}
                  placeholder="Transcription will appear here..."
                />
              )}
            </div>
            
            {/* Delivery options */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Delivery Options</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setDeliveryMethod('email')}
                  className={`px-3 py-1 rounded-full text-xs flex items-center ${
                    deliveryMethod === 'email' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <FaEnvelope className="mr-1" />
                  <span>{contactEmail || 'Email'}</span>
                </button>
                <button
                  onClick={() => setDeliveryMethod('text')}
                  className={`px-3 py-1 rounded-full text-xs flex items-center ${
                    deliveryMethod === 'text' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                  disabled={!contactPhone}
                >
                  <FaSms className="mr-1" />
                  <span>{contactPhone || 'Text (unavailable)'}</span>
                </button>
                <button
                  onClick={() => setDeliveryMethod('both')}
                  className={`px-3 py-1 rounded-full text-xs flex items-center ${
                    deliveryMethod === 'both' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                  disabled={!contactPhone}
                >
                  <FaEnvelope className="mr-1" />
                  <FaSms className="mr-1" />
                  <span>Both</span>
                </button>
              </div>
              
              <div className="mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={attachAudio}
                    onChange={(e) => setAttachAudio(e.target.checked)}
                    className="rounded text-blue-500 mr-2"
                  />
                  <span className="flex items-center">
                    <FaFileAudio className="mr-1 text-gray-500" />
                    Attach audio file
                  </span>
                </label>
              </div>
            </div>
            
            {/* Send button */}
            <div className="flex justify-end">
              <button
                onClick={sendVoiceNote}
                disabled={isSending || isTranscribing}
                className={`px-4 py-2 rounded-md flex items-center ${
                  isSending || isTranscribing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isSending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Sending...</span>
                  </>
                ) : sendSuccess ? (
                  <>
                    <FaCheck className="mr-2" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
