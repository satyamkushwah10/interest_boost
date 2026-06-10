// Auth utilities for local storage-based authentication

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  fullName: string;
  email: string;
  initials: string;
}

const USERS_KEY = "boost_trader_users";
const SESSION_KEY = "boost_trader_session";

// Get all users from localStorage
export function getAllUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save user to localStorage
export function registerUser(fullName: string, email: string, password: string): User {
  const users = getAllUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    throw new Error("Email already registered");
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    fullName,
    email,
    password, // In production, this should be hashed
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
}

// Authenticate user
export function loginUser(email: string, password: string): AuthSession {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const initials = user.fullName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const session: AuthSession = {
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    initials,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

// Get current session
export function getSession(): AuthSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Logout user
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getSession() !== null;
}
