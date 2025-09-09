// src/controllers/authController.ts
import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import crypto from "crypto";

// User interface for WhoDoggy authentication
interface User {
  email: string;
  passwordHash: string;
  role: 'admin' | 'veterinarian' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

// Session token interface
interface SessionToken {
  token: string;
  email: string;
  role: string;
  createdAt: Date;
  expiresAt: Date;
}

// In-memory stores for development - replace with database in production
const users: Record<string, User> = {};
const sessionTokens: Record<string, SessionToken> = {};

// Environment variables with explicit types
const SECRET_KEY: string = process.env.SECRET_KEY || "whodoggy-microchip-secret-key";
const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS || "12");
const TOKEN_EXPIRY_HOURS: number = parseInt(process.env.TOKEN_EXPIRY_HOURS || "24");

/**
 * Generate a secure session token
 */
function generateSessionToken(email: string, role: string): SessionToken {
  const token = crypto.randomBytes(32).toString('hex');
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000));

  const sessionToken: SessionToken = {
    token,
    email,
    role,
    createdAt,
    expiresAt
  };

  sessionTokens[token] = sessionToken;
  return sessionToken;
}

/**
 * Validate and retrieve session token
 */
function validateSessionToken(token: string): SessionToken | null {
  const session = sessionTokens[token];

  if (!session) {
    return null;
  }

  if (new Date() > session.expiresAt) {
    delete sessionTokens[token];
    return null;
  }

  return session;
}

/**
 * Register a new user for WhoDoggy system
 * Supports different user roles for the microchip registry system
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { email, password, role = 'user' } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        code: "MISSING_CREDENTIALS"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long",
        code: "WEAK_PASSWORD"
      });
    }

    if (!['admin', 'veterinarian', 'user'].includes(role)) {
      return res.status(400).json({
        error: "Invalid role. Must be admin, veterinarian, or user",
        code: "INVALID_ROLE"
      });
    }

    // Check if user already exists
    if (email in users) {
      return res.status(409).json({
        error: "User already exists with this email",
        code: "USER_EXISTS"
      });
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser: User = {
      email,
      passwordHash,
      role: role as 'admin' | 'veterinarian' | 'user',
      createdAt: new Date()
    };

    users[email] = newUser;

    console.log(`New WhoDoggy user registered: ${email} (${role})`);

    return res.status(201).json({
      message: "User registered successfully for WhoDoggy system",
      user: {
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    next(error);
  }
}

/**
 * Authenticate user and return session token
 * Used for accessing WhoDoggy microchip registry services
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        code: "MISSING_CREDENTIALS"
      });
    }

    // Find user with explicit type checking
    const user: User | undefined = users[email];
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
        code: "INVALID_CREDENTIALS"
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
        code: "INVALID_CREDENTIALS"
      });
    }

    // Update last login with safe access
    const currentTime = new Date();
    const userToUpdate = users[email];
    if (userToUpdate) {
      userToUpdate.lastLogin = currentTime;
    }

    // Generate session token
    const sessionToken = generateSessionToken(user.email, user.role);

    console.log(`WhoDoggy user logged in: ${email} (${user.role})`);

    // Get final user state with safe access
    const finalUserState = users[email];
    if (!finalUserState) {
      return res.status(500).json({
        error: "User data consistency error",
        code: "DATA_ERROR"
      });
    }

    return res.json({
      message: "Login successful",
      token: sessionToken.token,
      user: {
        email: finalUserState.email,
        role: finalUserState.role,
        lastLogin: finalUserState.lastLogin || null
      },
      expiresAt: sessionToken.expiresAt
    });

  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
}

/**
 * Middleware to verify session token and extract user information
 * Used to protect WhoDoggy API endpoints
 */
export function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: "Access token is required",
        code: "MISSING_TOKEN"
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Validate session token
    const session = validateSessionToken(token);
    if (!session) {
      return res.status(401).json({
        error: "Invalid or expired access token",
        code: "INVALID_TOKEN"
      });
    }

    // Verify user still exists
    const user = users[session.email];
    if (!user) {
      return res.status(401).json({
        error: "User no longer exists",
        code: "USER_NOT_FOUND"
      });
    }

    // Add user info to request for use in protected routes
    (req as any).user = {
      email: session.email,
      role: session.role,
      loginTime: session.createdAt.toISOString()
    };

    next();

  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({
      error: "Token verification failed",
      code: "TOKEN_ERROR"
    });
  }
}

/**
 * Middleware to check if user has required role
 * Used for role-based access control in WhoDoggy system
 */
export function requireRole(requiredRole: 'admin' | 'veterinarian' | 'user') {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const user = (req as any).user;

    if (!user || !user.email) {
      return res.status(401).json({
        error: "Authentication required",
        code: "AUTH_REQUIRED"
      });
    }

    // Define role hierarchy: admin > veterinarian > user
    const roleHierarchy: Record<string, number> = { admin: 3, veterinarian: 2, user: 1 };
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole];

    // Check if required role exists in hierarchy
    if (requiredLevel === undefined) {
      return res.status(500).json({
        error: "Invalid role configuration",
        code: "INVALID_ROLE_CONFIG"
      });
    }

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        error: `Access denied. ${requiredRole} role required`,
        code: "INSUFFICIENT_PERMISSIONS",
        userRole: user.role,
        requiredRole
      });
    }

    next();
  };
}

/**
 * Get current user information
 */
export function getCurrentUser(req: Request, res: Response): Response {
  const user = (req as any).user;

  if (!user || !user.email) {
    return res.status(401).json({
      error: "User not authenticated",
      code: "AUTH_REQUIRED"
    });
  }

  const userData = users[user.email];

  if (!userData) {
    return res.status(404).json({
      error: "User data not found",
      code: "USER_DATA_MISSING"
    });
  }

  return res.json({
    email: userData.email,
    role: userData.role,
    createdAt: userData.createdAt,
    lastLogin: userData.lastLogin || null
  });
}

/**
 * Logout user by invalidating session token
 */
export function logout(req: Request, res: Response): Response {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    delete sessionTokens[token];
  }

  return res.json({
    message: "Logout successful",
    code: "LOGOUT_SUCCESS"
  });
}

/**
 * Development helper: Get all users (admin only)
 */
export function getAllUsers(req: Request, res: Response): Response {
  const userList = Object.values(users).map(user => ({
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin || null
  }));

  return res.json({
    users: userList,
    totalUsers: userList.length
  });
}

/**
 * Development helper: Get active session count
 */
export function getSessionStats(req: Request, res: Response): Response {
  const activeSessions = Object.values(sessionTokens).filter(
    session => new Date() < session.expiresAt
  );

  return res.json({
    totalSessions: Object.keys(sessionTokens).length,
    activeSessions: activeSessions.length,
    expiredSessions: Object.keys(sessionTokens).length - activeSessions.length
  });
}
