import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole, IUser } from '../models/User';

// Generate JWT Token
const generateToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
  return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
};

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Set default role if not provided
    let userRoles: UserRole[] = [UserRole.BACKER];
    if (role) {
      // Convert string to array if needed
      const roleArray = Array.isArray(role) ? role : [role];
      userRoles = roleArray.filter(r => Object.values(UserRole).includes(r as UserRole)) as UserRole[];
      
      // Ensure at least BACKER role is set
      if (!userRoles.includes(UserRole.BACKER)) {
        userRoles.push(UserRole.BACKER);
      }
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: userRoles,
      profilePic: req.file?.path // If profile picture uploaded
    });

    // Return user data with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id.toString())
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Return user data with token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id.toString())
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user profile
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    // If email is changed, check if it's already in use
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        res.status(400).json({ message: 'Email already in use' });
        return;
      }
    }

    // Update fields
    const updateData: { name?: string; email?: string; profilePic?: string } = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (req.file) updateData.profilePic = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 