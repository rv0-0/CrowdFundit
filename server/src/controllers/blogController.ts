import { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';

// Get all blog posts
export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 });
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

// Get featured blog posts
export const getFeaturedBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const featuredPosts = await BlogPost.find({ featured: true }).sort({ date: -1 });
    res.status(200).json(featuredPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured blog posts', error });
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
};

// Create a new blog post
export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      image,
      readTime,
      featured
    } = req.body;

    const newBlogPost = new BlogPost({
      title,
      excerpt,
      content,
      author,
      category,
      image,
      readTime,
      featured: featured || false
    });

    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
};

// Update a blog post
export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlogPost) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }
    
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!deletedBlogPost) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }
    
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
}; 