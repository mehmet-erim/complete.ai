import OpenRouterClient from '../api/openrouter-client.js';

interface CursorPosition {
  line: number;
  column: number;
}

interface CompletionResult {
  success: boolean;
  completion?: string;
  usage?: any;
  error?: string;
}

interface ModelsResult {
  success: boolean;
  models?: any[];
  error?: string;
}

class CompletionEngine {
  private client: any;

  constructor() {
    this.client = new OpenRouterClient();
  }

  // Prompt templates for different languages
  getPromptTemplate(language: string): string {
    const templates: { [key: string]: string } = {
      javascript: `You are a code completion assistant. Complete the following JavaScript code snippet. Provide only the completion, no explanations.

Code:
{code}

Completion:`,
      python: `You are a code completion assistant. Complete the following Python code snippet. Provide only the completion, no explanations.

Code:
{code}

Completion:`,
      typescript: `You are a code completion assistant. Complete the following TypeScript code snippet. Provide only the completion, no explanations.

Code:
{code}

Completion:`,
      default: `You are a code completion assistant. Complete the following code snippet. Provide only the completion, no explanations.

Code:
{code}

Completion:`,
    };
    return templates[language] || templates.default;
  }

  // Extract context from code (simple implementation)
  extractContext(code: string, cursorPosition: CursorPosition): string {
    // For simplicity, take the last few lines before cursor
    const lines = code.split('\n');
    const startLine = Math.max(0, cursorPosition.line - 10);
    const contextLines = lines.slice(startLine, cursorPosition.line + 1);
    return contextLines.join('\n');
  }

  // Generate completion
  async generateCompletion(
    code: string,
    cursorPosition: CursorPosition,
    language: string = 'javascript',
    model?: string
  ): Promise<CompletionResult> {
    try {
      const context = this.extractContext(code, cursorPosition);
      const template = this.getPromptTemplate(language);
      const prompt = template.replace('{code}', context);

      const messages = [
        {
          role: 'user',
          content: prompt,
        },
      ];

      const result = await this.client.createCompletion(messages, model, {
        maxTokens: 50,
        temperature: 0.1, // Low temperature for more deterministic completions
      });

      if (result.success) {
        return {
          success: true,
          completion: this.cleanCompletion(result.completion),
          usage: result.usage,
        };
      } else {
        return {
          success: false,
          error: result.error,
        };
      }
    } catch (error: any) {
      console.error('Completion generation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Clean up the completion (remove extra whitespace, etc.)
  cleanCompletion(completion: string | undefined): string {
    if (!completion) return '';

    // Remove leading/trailing whitespace
    let cleaned = completion.trim();

    // Remove any markdown code blocks if present
    cleaned = cleaned.replace(/^```[\w]*\n?/gm, '').replace(/```\n?$/gm, '');

    // Ensure it doesn't start with unwanted characters
    cleaned = cleaned.replace(/^[\n\s]*/, '');

    return cleaned;
  }

  // Get available models
  async getAvailableModels(): Promise<ModelsResult> {
    return await this.client.getModels();
  }
}

export { CompletionEngine };