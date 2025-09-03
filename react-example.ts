import { CompletionEngine } from './src/completion/completion-engine.js';

interface CursorPosition {
  line: number;
  column: number;
}

async function complexContextExample(): Promise<void> {
  const engine = new CompletionEngine();

  // Example showing complex context completion
  const code: string = `// React component for a user profile page
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user details
        const userResponse = await fetch(\`/api/users/\${userId}\`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setUser(userData);
        
        // Fetch user posts
        const postsResponse = await fetch(\`/api/users/\${userId}/posts\`);
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <div className="user-header">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={\`\${user.firstName} \${user.lastName}\`}
          className="user-avatar"
        />
        <div className="user-info">
          <h1>{user.firstName} {user.lastName}</h1>
          <p>{user.email}</p>
          <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="user-posts">
        <h2>User Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>This user hasn't posted anything yet.</p>
        ) : (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <div className="post-meta">
                  <span>Posted on: {new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>Likes: {post.likes}</span>
                  <span>Comments: {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add a button to edit user profile */}
      {/* Cursor position is here - let's get AI completion for edit button */}
`;

  // Position cursor at the end where we want completion
  const cursorPosition: CursorPosition = { line: 78, column: 0 };

  console.log('🚀 Complex Context AI Completion Example');
  console.log('======================================\n');
  
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

// Run the complex context example
complexContextExample();