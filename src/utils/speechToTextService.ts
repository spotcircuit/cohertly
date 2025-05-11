// Google Cloud Speech-to-Text API service

// This is a browser-compatible implementation of the Google Cloud Speech-to-Text API
// In a production environment, you would use a server-side implementation to handle the API key securely

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

interface SpeechRecognitionOptions {
  language?: string;
  interimResults?: boolean;
  continuous?: boolean;
}

// Event callbacks
type OnResultCallback = (result: SpeechRecognitionResult) => void;
type OnErrorCallback = (error: any) => void;
type OnEndCallback = () => void;

class SpeechToTextService {
  private recognition: any;
  private isListening: boolean = false;
  private onResultCallback: OnResultCallback | null = null;
  private onErrorCallback: OnErrorCallback | null = null;
  private onEndCallback: OnEndCallback | null = null;

  constructor() {
    // Initialize the Web Speech API's SpeechRecognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.setupRecognition();
      } else {
        console.error('Speech recognition not supported in this browser');
      }
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      if (!this.onResultCallback) return;

      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const isFinal = result.isFinal;

      this.onResultCallback({
        transcript,
        isFinal
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (this.onErrorCallback) {
        this.onErrorCallback(event.error);
      }
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended');
      if (this.isListening) {
        // If we're still supposed to be listening, restart
        try {
          this.recognition.start();
          console.log('Restarted speech recognition');
        } catch (error) {
          console.error('Error restarting speech recognition:', error);
        }
      } else if (this.onEndCallback) {
        this.onEndCallback();
      }
    };
  }

  public start(options?: SpeechRecognitionOptions) {
    if (!this.recognition) {
      console.error('Speech recognition not initialized');
      return;
    }

    if (options) {
      if (options.language) this.recognition.lang = options.language;
      if (options.continuous !== undefined) this.recognition.continuous = options.continuous;
      if (options.interimResults !== undefined) this.recognition.interimResults = options.interimResults;
    }

    try {
      this.recognition.start();
      this.isListening = true;
      console.log('Speech recognition started');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }

  public stop() {
    if (!this.recognition) return;

    this.isListening = false;
    try {
      this.recognition.stop();
      console.log('Speech recognition stopped');
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }

  public onResult(callback: OnResultCallback) {
    this.onResultCallback = callback;
  }

  public onError(callback: OnErrorCallback) {
    this.onErrorCallback = callback;
  }

  public onEnd(callback: OnEndCallback) {
    this.onEndCallback = callback;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 
      (!!window.SpeechRecognition || !!window.webkitSpeechRecognition);
  }
}

// Singleton instance
let instance: SpeechToTextService | null = null;

export const getSpeechToTextService = (): SpeechToTextService => {
  if (!instance) {
    instance = new SpeechToTextService();
  }
  return instance;
};
