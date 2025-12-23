import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const JWT_EXPIRES_IN = '24h';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  member_id?: number;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Auth functions
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      member_id: user.member_id
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      member_id: decoded.member_id,
      created_at: '',
      updated_at: ''
    };
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  try {
    const users = await query('SELECT * FROM users WHERE username = ? OR email = ?', [
      credentials.username,
      credentials.username
    ]) as any[];

    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    const isValidPassword = await verifyPassword(credentials.password, user.password_hash);

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      member_id: user.member_id,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const users = await query('SELECT * FROM users WHERE id = ?', [id]) as any[];

    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      member_id: user.member_id,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'editor' | 'viewer';
}): Promise<User | null> {
  try {
    const passwordHash = await hashPassword(userData.password);

    const result = await query(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [
        userData.username,
        userData.email,
        passwordHash,
        userData.role || 'viewer'
      ]
    ) as any;

    return await getUserById(result.insertId);
  } catch (error) {
    console.error('Create user error:', error);
    return null;
  }
}
