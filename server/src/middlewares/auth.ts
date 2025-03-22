import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User';

interface TokenPayload {
  id: string;
}

interface ClerkJwtClaims {
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sub: string;
  // Add other claims as needed
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      auth?: {
        userId: string;
        sessionId?: string;
        claims?: ClerkJwtClaims;
      };
    }
  }
}

// Function to verify Clerk JWT tokens
const verifyClerkToken = async (token: string): Promise<any> => {
  try {
    // In a production app, you would verify with Clerk's public key
    // This is a simplified version that just decodes the JWT without signature verification
    // For production use, use the @clerk/clerk-sdk-node package and its verifyToken function
    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    return decoded;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

// Middleware to verify JWT token from Clerk
export const authenticateClerk = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Verify the token
      const claims = await verifyClerkToken(token);
      
      // Set auth details on request
      req.auth = {
        userId: claims.sub,
        claims: claims as unknown as ClerkJwtClaims
      };
      
      // Find or create user in our database
      let user = await User.findOne({ email: claims.sub }).select('-password');
      
      if (!user) {
        // Create a new user record based on Clerk user data
        // In a production app, you would use Clerk webhooks for this
        user = await User.create({
          email: claims.sub,
          name: claims.sub.split('@')[0], // Simple placeholder name
          role: [UserRole.BACKER], 
          password: Math.random().toString(36).slice(-10) // Random password since auth is handled by Clerk
        });
      }
      
      req.user = user;
      next();
    } catch (error) {
      // Token verification failed
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

// Legacy middleware to verify JWT token (keeping for backward compatibility)
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is a creator
export const isCreator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  if (!req.user.role.includes(UserRole.CREATOR)) {
    res.status(403).json({ message: 'Creator access required' });
    return;
  }

  next();
};

// Middleware to check if user is an admin
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  if (!req.user.role.includes(UserRole.ADMIN)) {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }

  next();
}; 