// Conversation service to manage two-way streaming conversations

import { getSpeechToTextService } from './speechToTextService';
import { getTextToSpeechService } from './textToSpeechService';
import { processWithGemini } from './geminiService';

interface ConversationOptions {
  language?: string;
  voiceOptions?: {
    voice?: SpeechSynthesisVoice | null;
    rate?: number;
    pitch?: number;
    volume?: number;
  };
  autoStart?: boolean;
  pushToTalk?: boolean;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Event callbacks
type OnTranscriptCallback = (transcript: string, isFinal: boolean) => void;
type OnResponseCallback = (response: string, isComplete: boolean) => void;
type OnStateChangeCallback = (state: ConversationState) => void;
type OnErrorCallback = (error: any) => void;

export enum ConversationState {
  IDLE = 'idle',
  LISTENING = 'listening',
  PROCESSING = 'processing',
  RESPONDING = 'responding',
  ERROR = 'error'
}

class ConversationService {
  private speechToText = getSpeechToTextService();
  private textToSpeech = getTextToSpeechService();
  
  private state: ConversationState = ConversationState.IDLE;
  private history: ConversationMessage[] = [];
  private currentTranscript: string = '';
  private pushToTalk: boolean = true;
  
  private onTranscriptCallback: OnTranscriptCallback | null = null;
  private onResponseCallback: OnResponseCallback | null = null;
  private onStateChangeCallback: OnStateChangeCallback | null = null;
  private onErrorCallback: OnErrorCallback | null = null;

  constructor(options?: ConversationOptions) {
    // Initialize with options
    if (options) {
      if (options.pushToTalk !== undefined) {
        this.pushToTalk = options.pushToTalk;
      }
      
      if (options.voiceOptions) {
        if (options.voiceOptions.voice) {
          this.textToSpeech.setDefaultVoice(options.voiceOptions.voice);
        }
        if (options.voiceOptions.rate) {
          this.textToSpeech.setDefaultRate(options.voiceOptions.rate);
        }
        if (options.voiceOptions.pitch) {
          this.textToSpeech.setDefaultPitch(options.voiceOptions.pitch);
        }
        if (options.voiceOptions.volume) {
          this.textToSpeech.setDefaultVolume(options.voiceOptions.volume);
        }
      }
    }
    
    // Set up speech-to-text event handlers
    this.speechToText.onResult((result) => {
      this.currentTranscript = result.transcript;
      
      if (this.onTranscriptCallback) {
        this.onTranscriptCallback(result.transcript, result.isFinal);
      }
      
      // If final and not in push-to-talk mode, process the transcript
      if (result.isFinal && !this.pushToTalk) {
        this.processTranscript();
      }
    });
    
    this.speechToText.onError((error) => {
      this.setState(ConversationState.ERROR);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    });
    
    // If auto-start is enabled, start listening
    if (options?.autoStart && !this.pushToTalk) {
      this.startListening();
    }
  }

  private setState(newState: ConversationState) {
    if (this.state !== newState) {
      this.state = newState;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(newState);
      }
    }
  }

  public startListening() {
    if (this.state === ConversationState.LISTENING) return;
    
    this.currentTranscript = '';
    this.setState(ConversationState.LISTENING);
    
    this.speechToText.start({
      interimResults: true,
      continuous: !this.pushToTalk
    });
  }

  public stopListening() {
    if (this.state !== ConversationState.LISTENING) return;
    
    this.speechToText.stop();
    
    // In push-to-talk mode, process the transcript when stopping
    if (this.pushToTalk && this.currentTranscript.trim()) {
      this.processTranscript();
    } else {
      this.setState(ConversationState.IDLE);
    }
  }

  private async processTranscript() {
    if (!this.currentTranscript.trim()) return;
    
    this.setState(ConversationState.PROCESSING);
    
    // Add user message to history
    this.history.push({
      role: 'user',
      content: this.currentTranscript
    });
    
    try {
      // Process with Gemini API
      console.log('Processing with Gemini API:', this.currentTranscript);
      let fullResponse = '';
      const response = await processWithGemini(this.currentTranscript, (partialResponse) => {
        fullResponse = partialResponse;
        console.log('Received partial response:', partialResponse.substring(0, 50) + '...');
        
        if (this.onResponseCallback) {
          this.onResponseCallback(partialResponse, false);
        }
      });
      
      console.log('Received full response from Gemini');
      
      // Add assistant message to history
      this.history.push({
        role: 'assistant',
        content: response.text
      });
      
      // Speak the response
      this.setState(ConversationState.RESPONDING);
      
      if (this.onResponseCallback) {
        this.onResponseCallback(response.text, true);
      }
      
      console.log('Speaking response with text-to-speech');
      await this.textToSpeech.speak(response.text);
      
      // Return to idle state
      this.setState(ConversationState.IDLE);
      
      // If not in push-to-talk mode, start listening again
      if (!this.pushToTalk) {
        this.startListening();
      }
    } catch (error) {
      console.error('Error processing transcript:', error);
      
      // Provide a fallback response in case of error
      const errorResponse = `I heard you say: "${this.currentTranscript}". However, I encountered an error processing your request. Please try again.`;
      
      // Add error response to history
      this.history.push({
        role: 'assistant',
        content: errorResponse
      });
      
      if (this.onResponseCallback) {
        this.onResponseCallback(errorResponse, true);
      }
      
      // Speak the error response
      this.setState(ConversationState.RESPONDING);
      await this.textToSpeech.speak(errorResponse);
      
      this.setState(ConversationState.IDLE);
      
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    }
  }

  public stopConversation() {
    this.speechToText.stop();
    this.textToSpeech.stop();
    this.setState(ConversationState.IDLE);
    this.currentTranscript = ''; // Clear the current transcript
    console.log('Conversation stopped and reset');
  }

  public clearHistory() {
    this.history = [];
  }

  public getHistory(): ConversationMessage[] {
    return [...this.history];
  }

  public getState(): ConversationState {
    return this.state;
  }

  public onTranscript(callback: OnTranscriptCallback) {
    this.onTranscriptCallback = callback;
  }

  public onResponse(callback: OnResponseCallback) {
    this.onResponseCallback = callback;
  }

  public onStateChange(callback: OnStateChangeCallback) {
    this.onStateChangeCallback = callback;
  }

  public onError(callback: OnErrorCallback) {
    this.onErrorCallback = callback;
  }

  public isSupported(): boolean {
    return this.speechToText.isSupported() && this.textToSpeech.isSupported();
  }
}

// Singleton instance
let instance: ConversationService | null = null;

export const getConversationService = (options?: ConversationOptions): ConversationService => {
  if (!instance) {
    instance = new ConversationService(options);
  }
  return instance;
};
