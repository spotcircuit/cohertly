// Google Cloud Text-to-Speech API service

// This is a browser-compatible implementation using the Web Speech API
// In a production environment, you would use the Google Cloud Text-to-Speech API

interface VoiceOptions {
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface TextToSpeechResult {
  success: boolean;
  error?: string;
}

// Event callbacks
type OnStartCallback = () => void;
type OnEndCallback = () => void;
type OnErrorCallback = (error: any) => void;

class TextToSpeechService {
  private synthesis: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSpeaking: boolean = false;
  private defaultVoice: SpeechSynthesisVoice | null = null;
  private defaultRate: number = 1.0;
  private defaultPitch: number = 1.0;
  private defaultVolume: number = 1.0;
  
  private onStartCallback: OnStartCallback | null = null;
  private onEndCallback: OnEndCallback | null = null;
  private onErrorCallback: OnErrorCallback | null = null;

  constructor() {
    // Initialize the Web Speech API's SpeechSynthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
      
      // Set up voices changed event
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = this.loadVoices.bind(this);
      }
    }
  }

  private loadVoices() {
    if (!this.synthesis) return;
    
    this.voices = this.synthesis.getVoices();
    console.log(`Loaded ${this.voices.length} voices`);
    
    // Set default voice to an English voice if available
    if (this.voices.length > 0) {
      const englishVoice = this.voices.find(voice => 
        voice.lang.includes('en-') && (voice.name.includes('Google') || voice.name.includes('Premium'))
      );
      this.defaultVoice = englishVoice || this.voices[0];
      console.log(`Default voice set to: ${this.defaultVoice.name}`);
    }
  }

  public speak(text: string, options?: VoiceOptions): Promise<TextToSpeechResult> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        const error = 'Speech synthesis not supported';
        console.error(error);
        if (this.onErrorCallback) this.onErrorCallback(error);
        reject({ success: false, error });
        return;
      }
      
      // Cancel any ongoing speech
      this.synthesis.cancel();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options
      utterance.voice = options?.voice || this.defaultVoice;
      utterance.rate = options?.rate || this.defaultRate;
      utterance.pitch = options?.pitch || this.defaultPitch;
      utterance.volume = options?.volume || this.defaultVolume;
      
      // Set up event handlers
      utterance.onstart = () => {
        console.log('Speech started');
        this.isSpeaking = true;
        if (this.onStartCallback) this.onStartCallback();
      };
      
      utterance.onend = () => {
        console.log('Speech ended');
        this.isSpeaking = false;
        if (this.onEndCallback) this.onEndCallback();
        resolve({ success: true });
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        this.isSpeaking = false;
        if (this.onErrorCallback) this.onErrorCallback(event);
        reject({ success: false, error: event.error });
      };
      
      // Force browser to unlock audio with a silent utterance
      const unlockAudio = new SpeechSynthesisUtterance(' ');
      unlockAudio.volume = 0;
      unlockAudio.rate = 10;
      this.synthesis.speak(unlockAudio);
      
      // Speak after a small delay to ensure the synthesis engine is ready
      setTimeout(() => {
        try {
          this.synthesis?.speak(utterance);
          console.log('Speaking text:', text.substring(0, 50) + (text.length > 50 ? '...' : ''));
        } catch (error) {
          console.error('Error speaking:', error);
          this.isSpeaking = false;
          if (this.onErrorCallback) this.onErrorCallback(error);
          reject({ success: false, error });
        }
      }, 100);
    });
  }

  public speakChunked(textChunks: string[], options?: VoiceOptions): void {
    if (!textChunks.length) return;
    
    let currentIndex = 0;
    
    const speakNextChunk = () => {
      if (currentIndex >= textChunks.length) return;
      
      const chunk = textChunks[currentIndex];
      currentIndex++;
      
      this.speak(chunk, options)
        .then(() => {
          speakNextChunk();
        })
        .catch(error => {
          console.error('Error speaking chunk:', error);
          // Try to continue with the next chunk
          speakNextChunk();
        });
    };
    
    speakNextChunk();
  }

  public stop(): void {
    if (!this.synthesis) return;
    
    this.synthesis.cancel();
    this.isSpeaking = false;
    console.log('Speech stopped');
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public setDefaultVoice(voice: SpeechSynthesisVoice): void {
    this.defaultVoice = voice;
  }

  public setDefaultRate(rate: number): void {
    this.defaultRate = rate;
  }

  public setDefaultPitch(pitch: number): void {
    this.defaultPitch = pitch;
  }

  public setDefaultVolume(volume: number): void {
    this.defaultVolume = volume;
  }

  public onStart(callback: OnStartCallback): void {
    this.onStartCallback = callback;
  }

  public onEnd(callback: OnEndCallback): void {
    this.onEndCallback = callback;
  }

  public onError(callback: OnErrorCallback): void {
    this.onErrorCallback = callback;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

// Singleton instance
let instance: TextToSpeechService | null = null;

export const getTextToSpeechService = (): TextToSpeechService => {
  if (!instance) {
    instance = new TextToSpeechService();
  }
  return instance;
};
