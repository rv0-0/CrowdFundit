import express from 'express';
import { register, login, getCurrentUser, updateProfile } from '../controllers/authController';
import { authenticateUser, authenticateClerk } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = express.Router();

// Public routes
router.post('/register', upload.single('profilePic'), register);
router.post('/login', login);

// Protected routes (Legacy JWT auth)
router.get('/me', authenticateUser, getCurrentUser);
router.put('/profile', authenticateUser, upload.single('profilePic'), updateProfile);

// Protected routes (Clerk auth)
router.get('/clerk/me', authenticateClerk, getCurrentUser);
router.put('/clerk/profile', authenticateClerk, upload.single('profilePic'), updateProfile);

export default router; 