import * as vscode from 'vscode';
import { AICompletionProvider } from './completionProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('complete.ai extension is now active!');

  // Register the completion provider for multiple languages
  const provider = new AICompletionProvider();
  
  const disposable = vscode.languages.registerCompletionItemProvider(
    [
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'python' },
      { scheme: 'file', language: 'java' },
      { scheme: 'file', language: 'cpp' },
      { scheme: 'file', language: 'csharp' },
      { scheme: 'file', language: 'go' },
      { scheme: 'file', language: 'rust' },
      { scheme: 'file', language: 'php' },
      { scheme: 'file', language: 'html' },
      { scheme: 'file', language: 'css' },
      { scheme: 'file', language: 'scss' },
      { scheme: 'file', language: 'sass' },
      { scheme: 'file', language: 'less' },
      { scheme: 'file', language: 'markdown' },
      { scheme: 'file', language: 'json' }
    ],
    provider,
    ' ', // Trigger on space
    '.', // Trigger on dot
    '(', // Trigger on opening parenthesis
    '{', // Trigger on opening brace
    '[', // Trigger on opening bracket
    '<', // Trigger on opening angle bracket
    '\n'  // Trigger on new line
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('complete.ai extension is now deactivated!');
}