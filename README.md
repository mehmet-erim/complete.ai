# AI Auto-Complete

A Node.js project for AI-powered code completion using OpenRouter API. This serves as the foundation for a VSCode extension that provides intelligent code suggestions.

## Features

- 🤖 AI-powered code completion using OpenRouter API
- 🔧 Support for multiple programming languages (JavaScript, Python, TypeScript)
- ⚡ Fast and efficient API integration
- 🧪 Built-in testing framework
- 📚 Extensible architecture for VSCode extension integration

## Quick Start

### Prerequisites

- Node.js 16+
- OpenRouter API account and key

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your OpenRouter API key:
   - Visit [OpenRouter Keys](https://openrouter.ai/keys)
   - Create an account and generate an API key

4. Configure your API key:
   - Open the `.env` file
   - Replace `your_api_key_here` with your actual API key:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
   ```

### Running Tests

Test the AI completion functionality:

```bash
npm test
```

Or:

```bash
npm start
```

This will:
- Fetch available models from OpenRouter
- Test code completion with a sample JavaScript snippet
- Display results and usage statistics

## Project Structure

```
ai-auto-complete/
├── src/
│   ├── api/
│   │   └── openrouter-client.js    # OpenRouter API client
│   └── completion/
│       └── completion-engine.js    # Completion logic and prompt templates
├── tests/                          # Unit tests (to be implemented)
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── package.json                    # Project dependencies and scripts
├── test-completion.js              # Test script for API integration
└── ROADMAP.md                      # Detailed development roadmap
```

## API Usage

### Basic Completion

```javascript
const CompletionEngine = require('./src/completion/completion-engine');

const engine = new CompletionEngine();

const result = await engine.generateCompletion(
  codeSnippet,
  cursorPosition,
  'javascript',
  'anthropic/claude-3-haiku'
);

if (result.success) {
  console.log('Completion:', result.completion);
}
```

### Available Models

```javascript
const models = await engine.getAvailableModels();
console.log(models);
```

## Configuration

### Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)
- `DEFAULT_MODEL`: Default AI model for completions (optional)
- `HTTP_REFERER`: Referer header for API requests (optional)
- `X_TITLE`: Title header for API requests (optional)

### Supported Languages

Currently supported:
- JavaScript
- Python
- TypeScript
- Generic (fallback for other languages)

## Development Roadmap

See [ROADMAP.md](ROADMAP.md) for detailed development phases and milestones.

## Next Steps

1. **Set up your API key** and run the test script
2. **Review the roadmap** for VSCode extension development
3. **Customize prompt templates** for your specific use cases
4. **Add more language support** as needed
5. **Implement VSCode extension** integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see package.json for details

## Support

For issues or questions:
- Check the [OpenRouter Documentation](https://openrouter.ai/docs)
- Review the project roadmap for planned features
- Open an issue in the repository

---

**Note**: This project is in active development. The current implementation focuses on the API integration foundation before moving to VSCode extension development.