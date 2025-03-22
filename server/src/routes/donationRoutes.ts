import express from 'express';
import { createDonation, getUserDonations, getProjectDonations } from '../controllers/donationController';
import { authenticateUser, authenticateClerk } from '../middlewares/auth';

const router = express.Router();

// Protected routes with legacy JWT auth
router.post('/donate', authenticateUser, createDonation);
router.get('/my-donations', authenticateUser, getUserDonations);
router.get('/project/:projectId', authenticateUser, getProjectDonations);

// Protected routes with Clerk auth
router.post('/clerk/donate', authenticateClerk, createDonation);
router.get('/clerk/my-donations', authenticateClerk, getUserDonations);
router.get('/clerk/project/:projectId', authenticateClerk, getProjectDonations);

export default router; 