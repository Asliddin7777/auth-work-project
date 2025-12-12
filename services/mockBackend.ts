import { User, Role, AuthResponse } from '../types';

// Constants simulating DB and Env
const MOCK_DELAY = 800; // Simulate network latency
const ACCESS_TOKEN_EXPIRY = 5 * 60 * 1000; // 5 minutes (simulated)

// Initial mock data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'user@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

// Helper to simulate DB storage
const getDbUsers = (): User[] => {
  const stored = localStorage.getItem('mock_db_users');
  return stored ? JSON.parse(stored) : initialUsers;
};

const saveDbUsers = (users: User[]) => {
  localStorage.setItem('mock_db_users', JSON.stringify(users));
};

// Simulate Password Hashing (Simulated)
const hashPassword = (password: string): string => `hashed_${password}`;

// Mock credentials storage (in a real app, this is the password hash in DB)
const getDbCreds = () => {
  const stored = localStorage.getItem('mock_db_creds');
  if (stored) return JSON.parse(stored);
  
  // Default creds
  return {
    'admin@example.com': hashPassword('admin123'),
    'user@example.com': hashPassword('user123'),
  };
};

const saveDbCreds = (creds: Record<string, string>) => {
  localStorage.setItem('mock_db_creds', JSON.stringify(creds));
};

// --- API Methods ---

export const api = {
  // POST /api/auth/login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const users = getDbUsers();
    const creds = getDbCreds();
    const user = users.find(u => u.email === email);
    
    if (!user || creds[email] !== hashPassword(password)) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const accessToken = `mock_access_token_${Date.now()}_${user.id}`;
    const refreshToken = `mock_refresh_token_${Date.now()}_${user.id}`;

    return { user, accessToken, refreshToken };
  },

  // POST /api/auth/register
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    const users = getDbUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user', // Default role
      createdAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    saveDbUsers(users);

    // Save creds
    const creds = getDbCreds();
    creds[email] = hashPassword(password);
    saveDbCreds(creds);

    const accessToken = `mock_access_token_${Date.now()}_${newUser.id}`;
    const refreshToken = `mock_refresh_token_${Date.now()}_${newUser.id}`;

    return { user: newUser, accessToken, refreshToken };
  },

  // GET /api/users (Protected, Admin only)
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    // In a real app, middleware checks the token here
    return getDbUsers();
  },

  // GET /api/test
  test: async (): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, message: "API works" };
  }
};