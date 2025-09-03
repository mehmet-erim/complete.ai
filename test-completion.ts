import { CompletionEngine } from './src/completion/completion-engine.js';

interface CursorPosition {
  line: number;
  column: number;
}

async function testCompletion(): Promise<void> {
  const engine = new CompletionEngine();

  // Example JavaScript code snippet
  const code: string = `function calculateSum(a, b) {
  return a + b;
}

function main() {
  const result = calculateSum(5, 3);
  console.log("Sum is:", result);
  // Cursor is here - suggest next line
}`;

  // Simulate cursor position (line 7, column 0)
  const cursorPosition: CursorPosition = { line: 7, column: 0 };

  console.log('Testing AI completion...');
  console.log('Code context:');
  console.log(code);
  console.log('\nGenerating completion...');

  try {
    const result = await engine.generateCompletion(
      code,
      cursorPosition,
      'javascript'
    );

    if (result.success) {
      console.log('✅ Completion generated successfully!');
      console.log('Completion:', result.completion);
      console.log('Usage:', result.usage);
    } else {
      console.log('❌ Completion failed:', result.error);
    }
  } catch (error: any) {
    console.error('Test error:', error.message);
  }
}

// Test available models
async function testModels(): Promise<void> {
  const engine = new CompletionEngine();

  console.log('\nFetching available models...');
  const modelsResult = await engine.getAvailableModels();

  if (modelsResult.success) {
    console.log('✅ Available models:');
    modelsResult.models?.slice(0, 5).forEach((model: any) => {
      console.log(`- ${model.id}: ${model.name}`);
    });
    if (modelsResult.models && modelsResult.models.length > 5) {
      console.log(`... and ${modelsResult.models.length - 5} more`);
    }
  } else {
    console.log('❌ Failed to fetch models:', modelsResult.error);
  }
}

// Run tests
async function runTests(): Promise<void> {
  console.log('🚀 Starting AI Auto-Complete Tests\n');

  await testModels();
  await testCompletion();

  console.log('\n🏁 Tests completed!');
}

// Check if API key is set
if (
  !process.env.OPENROUTER_API_KEY ||
  process.env.OPENROUTER_API_KEY === 'your_api_key_here'
) {
  console.log(
    '⚠️  Please set your OPENROUTER_API_KEY in the .env file before running tests.'
  );
  console.log('   Get your API key from: https://openrouter.ai/keys');
} else {
  runTests();
}