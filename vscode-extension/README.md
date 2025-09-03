# complete.ai VSCode Extension

An AI-powered code completion extension for Visual Studio Code using the OpenRouter API.

## Features

- 🤖 AI-powered code completion for multiple programming languages
- 🔧 Supports JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, HTML, CSS/Sass/SCSS/Less, Markdown, and JSON
- ⚡ Real-time suggestions as you type
- ⚙️ Configurable settings for model, tokens, and temperature
- 🌐 Powered by OpenRouter API with access to multiple AI models

## Installation

1. Clone this repository
2. Navigate to the `vscode-extension` directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Open VSCode and press `F5` to launch a new Extension Development Host window
6. Or, package the extension:
   ```bash
   npm install -g vsce
   vsce package
   ```
   Then install the generated `.vsix` file in VSCode.

## Configuration

1. Get your OpenRouter API key:
   - Visit [OpenRouter Keys](https://openrouter.ai/keys)
   - Create an account and generate an API key

2. Configure the extension:
   - Open VSCode Settings (Ctrl/Cmd + ,)
   - Search for "complete.ai"
   - Set your API Key in the "Complete Ai: Api Key" setting
   - Optionally configure other settings:
     - Default Model (default: meta-llama/llama-3.3-8b-instruct:free)
     - Max Tokens (default: 50)
     - Temperature (default: 0.1)

## Usage

1. After installing and configuring the extension, it will automatically activate
2. Start typing in any supported language file
3. AI completions will appear in the IntelliSense suggestions
4. Press Tab or Enter to accept a suggestion

## Supported Languages

- JavaScript (.js)
- TypeScript (.ts)
- Python (.py)
- Java (.java)
- C++ (.cpp)
- C# (.cs)
- Go (.go)
- Rust (.rs)
- PHP (.php)
- HTML (.html)
- CSS (.css)
- Sass (.scss, .sass)
- Less (.less)
- Markdown (.md)
- JSON (.json)

## Extension Settings

This extension contributes the following settings:

- `complete-ai.apiKey`: Your OpenRouter API key
- `complete-ai.defaultModel`: Default AI model for completions
- `complete-ai.maxTokens`: Maximum number of tokens for completions
- `complete-ai.temperature`: Temperature for completions (0.0 to 1.0)

## Development

1. Clone this repository
2. Navigate to the `vscode-extension` directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Open the project in VSCode
5. Press `F5` to launch a new Extension Development Host window

## Requirements

- Visual Studio Code 1.74.0 or higher
- OpenRouter API key

## Release Notes

### 0.0.1

- Initial release of complete.ai
- Basic code completion for multiple languages
- Configurable settings
- OpenRouter API integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC License