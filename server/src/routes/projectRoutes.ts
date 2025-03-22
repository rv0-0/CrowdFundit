import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectUpdate
} from '../controllers/projectController';
import { authenticateUser, authenticateClerk, isCreator } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = express.Router();

// Public routes
router.get('/', getProjects); // Get all projects
router.get('/:id', getProjectById); // Get project by ID

// Protected routes with legacy JWT auth
router.post(
  '/',
  authenticateUser,
  isCreator,
  upload.single('image'),
  createProject
); // Create project

router.put(
  '/:id',
  authenticateUser,
  isCreator,
  upload.single('image'),
  updateProject
); // Update project

router.delete('/:id', authenticateUser, deleteProject); // Delete project

router.post('/:id/updates', authenticateUser, isCreator, addProjectUpdate); // Add project update

// Protected routes with Clerk auth
router.post(
  '/clerk',
  authenticateClerk,
  isCreator,
  upload.single('image'),
  createProject
); // Create project with Clerk auth

router.put(
  '/clerk/:id',
  authenticateClerk,
  isCreator,
  upload.single('image'),
  updateProject
); // Update project with Clerk auth

router.delete('/clerk/:id', authenticateClerk, deleteProject); // Delete project with Clerk auth

router.post('/clerk/:id/updates', authenticateClerk, isCreator, addProjectUpdate); // Add project update with Clerk auth

export default router; 