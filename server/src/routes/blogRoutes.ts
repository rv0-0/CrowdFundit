import express, { Request, Response } from 'express';
import {
  getAllBlogPosts,
  getFeaturedBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController';

const router = express.Router();

// GET all blog posts
router.get('/', getAllBlogPosts);

// GET featured blog posts
router.get('/featured', getFeaturedBlogPosts);

// GET a single blog post by ID
router.get('/:id', getBlogPostById);

// POST create a new blog post
router.post('/', createBlogPost);

// PUT update a blog post
router.put('/:id', updateBlogPost);

// DELETE a blog post
router.delete('/:id', deleteBlogPost);

export default router; 