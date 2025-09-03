import * as vscode from 'vscode';
import axios from 'axios';

interface OpenRouterResponse {
  choices?: {
    message: {
      content: string;
    };
  }[];
}

export class AICompletionProvider implements vscode.CompletionItemProvider {
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
    _context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[]> {
    
    // Get configuration
    const config = vscode.workspace.getConfiguration('complete-ai');
    const apiKey = config.get<string>('apiKey');
    const defaultModel = config.get<string>('defaultModel') || 'meta-llama/llama-3.3-8b-instruct:free';
    const maxTokens = config.get<number>('maxTokens') || 50;
    const temperature = config.get<number>('temperature') || 0.1;
    
    // Check if API key is set
    if (!apiKey) {
      // Show a warning message if API key is not set
      vscode.window.showWarningMessage(
        'complete.ai: Please set your OpenRouter API key in the extension settings.'
      );
      return [];
    }
    
    try {
      // Extract context (last 50 lines or up to 2000 characters)
      const contextRange = new vscode.Range(
        Math.max(0, position.line - 50),
        0,
        position.line,
        position.character
      );
      
      const contextText = document.getText(contextRange);
      
      // Determine the language
      const language = document.languageId;
      
      // Create prompt based on language
      const prompt = this.createPrompt(contextText, language);
      
      // Call OpenRouter API
      const completion = await this.getAICompletion(
        prompt,
        apiKey,
        defaultModel,
        maxTokens,
        temperature
      );
      
      if (completion) {
        const completionItem = new vscode.CompletionItem(
          completion,
          vscode.CompletionItemKind.Text
        );
        completionItem.detail = 'complete.ai';
        completionItem.documentation = new vscode.MarkdownString(
          `AI-generated completion using ${defaultModel}`
        );
        return [completionItem];
      }
    } catch (error) {
      console.error('AI Completion Error:', error);
      vscode.window.showErrorMessage(
        'complete.ai: Failed to generate completion. Check console for details.'
      );
    }
    
    return [];
  }
  
  private createPrompt(context: string, language: string): string {
    const languageName = this.getLanguageName(language);
    
    return `You are a code completion assistant. Complete the following ${languageName} code snippet. 
Provide only the completion, no explanations.

Code:
${context}

Completion:`;
  }
  
  private getLanguageName(languageId: string): string {
    const languageMap: { [key: string]: string } = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'python': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'csharp': 'C#',
      'go': 'Go',
      'rust': 'Rust',
      'php': 'PHP',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'less': 'Less',
      'markdown': 'Markdown',
      'json': 'JSON'
    };
    
    return languageMap[languageId] || 'code';
  }
  
  private async getAICompletion(
    prompt: string,
    apiKey: string,
    model: string,
    maxTokens: number,
    temperature: number
  ): Promise<string | null> {
    try {
      const response = await axios.post<OpenRouterResponse>(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: temperature
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://your-vscode-extension.com',
            'X-Title': 'complete.ai VSCode Extension'
          }
        }
      );
      
      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        return response.data.choices[0].message.content.trim();
      }
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
    
    return null;
  }
}