import { CompletionEngine } from './src/completion/completion-engine.js';

interface CursorPosition {
  line: number;
  column: number;
}

async function contextualExample(): Promise<void> {
  const engine = new CompletionEngine();

  // A more focused example showing context-aware completion
  const code: string = `// Express.js route handler for user management
const express = require('express');
const router = express.Router();

// User database mock
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
];

// GET /users - Get all users
router.get('/users', (req, res) => {
  res.json({ success: true, data: users });
});

// GET /users/:id - Get a specific user
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  
  res.json({ success: true, data: user });
});

// POST /users - Create a new user
router.post('/users', (req, res) => {
  const { name, email, role } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and email are required' 
    });
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ 
      success: false, 
      error: 'User with this email already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user'
  };
  
  users.push(newUser);
  
  // After creating the user, we want to send a welcome email
  // This is where we would call our email service
  // Cursor position is here - let's get AI completion for sending email
`;

  // Position cursor at the end of the file where we want completion
  const cursorPosition: CursorPosition = { line: 54, column: 0 };

  console.log('🚀 Contextual AI Completion Example');
  console.log('===================================\n');
  
  console.log('Code context:');
  console.log('------------');
  // Show a snippet of the code around the cursor position
  const lines = code.split('\n');
  const start = Math.max(0, cursorPosition.line - 8);
  const end = Math.min(lines.length, cursorPosition.line + 1);
  
  for (let i = start; i < end; i++) {
    const prefix = i === cursorPosition.line ? '>>> ' : '    ';
    console.log(`${prefix}${i + 1}: ${lines[i]}`);
  }
  
  console.log('\nGenerating completion...');
  console.log('------------------------');

  try {
    // Use a model that might provide better completions
    const result = await engine.generateCompletion(
      code,
      cursorPosition,
      'javascript'
    );

    if (result.success) {
      console.log('✅ Completion generated successfully!');
      console.log('\nSuggested completion:');
      console.log('--------------------');
      console.log(result.completion);
      console.log('\nUsage statistics:');
      console.log('-----------------');
      console.log(result.usage);
    } else {
      console.log('❌ Completion failed:', result.error);
    }
  } catch (error: any) {
    console.error('Test error:', error.message);
  }
}

// Run the contextual example
contextualExample();