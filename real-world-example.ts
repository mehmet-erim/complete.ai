import { CompletionEngine } from './src/completion/completion-engine.js';

interface CursorPosition {
  line: number;
  column: number;
}

async function realWorldExample(): Promise<void> {
  const engine = new CompletionEngine();

  // Real-world JavaScript code example with more complexity
  const code: string = `// User authentication service
class UserService {
  constructor(database) {
    this.db = database;
  }

  // Validate user credentials
  async validateUser(email, password) {
    try {
      const user = await this.db.findUserByEmail(email);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const isValid = await this.comparePasswords(password, user.hashedPassword);
      if (!isValid) {
        return { success: false, error: 'Invalid password' };
      }

      return { success: true, user: this.sanitizeUser(user) };
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  // Compare password with hash
  async comparePasswords(plainText, hash) {
    // Implementation would use bcrypt or similar
    return plainText === hash; // Simplified for example
  }

  // Remove sensitive information from user object
  sanitizeUser(user) {
    const { hashedPassword, ...safeUser } = user;
    return safeUser;
  }

  // Create a new user account
  async createUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.db.findUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      // Hash the password
      const hashedPassword = await this.hashPassword(userData.password);
      
      // Create user object
      const user = {
        id: this.generateId(),
        email: userData.email,
        hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Save to database
      const savedUser = await this.db.saveUser(user);
      
      return { 
        success: true, 
        user: this.sanitizeUser(savedUser) 
      };
    } catch (error) {
      console.error('User creation error:', error);
      return { success: false, error: 'Failed to create user' };
    }
  }

  // Hash password implementation
  async hashPassword(password) {
    // Implementation would use bcrypt or similar
    return 'hashed_' + password; // Simplified for example
  }

  // Generate unique ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const user = await this.db.findUserById(id);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      return { success: true, user: this.sanitizeUser(user) };
    } catch (error) {
      console.error('Get user error:', error);
      return { success: false, error: 'Failed to retrieve user' };
    }
  }

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      // Remove sensitive fields from updates
      const { email, hashedPassword, ...safeUpdates } = updates;
      
      // Add timestamp
      safeUpdates.updatedAt = new Date();
      
      // Update in database
      const updatedUser = await this.db.updateUser(userId, safeUpdates);
      
      return { 
        success: true, 
        user: this.sanitizeUser(updatedUser) 
      };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Failed to update user' };
    }
  }

  // Delete user account
  async deleteUser(userId) {
    try {
      await this.db.deleteUser(userId);
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Delete user error:', error);
      return { success: false, error: 'Failed to delete user' };
    }
  }
}

// Database mock implementation
class DatabaseMock {
  users = [];

  async findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  async saveUser(user) {
    this.users.push(user);
    return user;
  }

  async updateUser(userId, updates) {
    const index = this.users.findIndex(user => user.id === userId);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  async deleteUser(userId) {
    const index = this.users.findIndex(user => user.id === userId);
    if (index === -1) throw new Error('User not found');
    
    this.users.splice(index, 1);
  }
}

// Usage example
async function main() {
  const db = new DatabaseMock();
  const userService = new UserService(db);

  // Register a new user
  const registrationResult = await userService.createUser({
    email: 'john.doe@example.com',
    password: 'securePassword123'
  });

  if (registrationResult.success) {
    console.log('User registered successfully:', registrationResult.user);

    // Update user profile
    const updateResult = await userService.updateUserProfile(
      registrationResult.user.id,
      { firstName: 'John', lastName: 'Doe' }
    );

    if (updateResult.success) {
      console.log('User profile updated:', updateResult.user);
      
      // Now we want to authenticate the user
      const authResult = await userService.validateUser(
        'john.doe@example.com',
        'securePassword123'
      );
      
      if (authResult.success) {
        console.log('User authenticated successfully');
        // After authentication, we might want to get user details
        // Cursor position is here - let's get AI completion
      } else {
        console.error('Authentication failed:', authResult.error);
      }
    }
  } else {
    console.error('Registration failed:', registrationResult.error);
  }
}`;

  // Simulate cursor position at the end of the file (line 168, column 0)
  // This is right after logging "User authenticated successfully"
  const cursorPosition: CursorPosition = { line: 168, column: 0 };

  console.log('🚀 Real-World AI Completion Example');
  console.log('=====================================\n');
  
  console.log('Code context:');
  console.log('------------');
  // Show a snippet of the code around the cursor position
  const lines = code.split('\n');
  const start = Math.max(0, cursorPosition.line - 5);
  const end = Math.min(lines.length, cursorPosition.line + 3);
  
  for (let i = start; i < end; i++) {
    const prefix = i === cursorPosition.line ? '>>> ' : '    ';
    console.log(`${prefix}${i + 1}: ${lines[i]}`);
  }
  
  console.log('\nGenerating completion...');
  console.log('------------------------');

  try {
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

// Run the real-world example
realWorldExample();