import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface CompletionOptions {
  maxTokens?: number;
  temperature?: number;
  [key: string]: any;
}

interface CompletionResult {
  success: boolean;
  completion?: string;
  usage?: any;
  model?: string;
  error?: string;
}

interface ModelsResult {
  success: boolean;
  models?: any[];
  error?: string;
}

class OpenRouterClient {
  private apiKey: string | undefined;
  private baseURL: string;
  private client: any;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseURL = 'https://openrouter.ai/api/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.HTTP_REFERER || 'https://your-app.com',
        'X-Title': process.env.X_TITLE || 'AI Auto-Complete Extension',
      },
    });
  }

  async createCompletion(
    messages: Message[],
    model: string = 'meta-llama/llama-3.3-8b-instruct:free',
    options: CompletionOptions = {}
  ): Promise<CompletionResult> {
    try {
      const payload = {
        model: model,
        messages: messages,
        max_tokens: options.maxTokens || 100,
        temperature: options.temperature || 0.7,
        ...options,
      };

      const response = await this.client.post('/chat/completions', payload);

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        return {
          success: true,
          completion: response.data.choices[0].message.content,
          usage: response.data.usage,
          model: response.data.model,
        };
      } else {
        throw new Error('Invalid response format from OpenRouter API');
      }
    } catch (error: any) {
      console.error(
        'OpenRouter API Error:',
        error.response ? error.response.data : error.message
      );
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  }

  async getModels(): Promise<ModelsResult> {
    try {
      const response = await this.client.get('/models');
      return {
        success: true,
        models: response.data.data,
      };
    } catch (error: any) {
      console.error('Error fetching models:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export default OpenRouterClient;