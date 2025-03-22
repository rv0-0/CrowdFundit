import { Request, Response } from 'express';
import Project, { ProjectStatus, ProjectCategory } from '../models/Project';
import Reward from '../models/Reward';
import mongoose from 'mongoose';

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  console.log('[PROJECT_CREATE] Request received:', {
    body: req.body,
    files: req.file ? { filename: req.file.filename, path: req.file.path } : 'No file uploaded',
    user: req.user ? { id: req.user._id, role: req.user.role } : 'No user data'
  });
  
  try {
    const {
      title,
      shortDesc,
      description,
      category,
      goalAmount,
      deadline,
      rewards
    } = req.body;

    console.log('[PROJECT_CREATE] Extracted data:', { 
      title, shortDesc, description, category, goalAmount, deadline 
    });

    // Check if user exists and has creator role
    if (!req.user) {
      console.log('[PROJECT_CREATE] Error: No user found in request');
      res.status(401).json({ message: 'User authentication required' });
      return;
    }

    if (!req.user.role.includes('Creator')) {
      console.log('[PROJECT_CREATE] Error: User is not a creator', req.user.role);
      res.status(403).json({ message: 'Creator role required to create projects' });
      return;
    }

    // Validate project category
    if (!Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      console.log('[PROJECT_CREATE] Error: Invalid category', { 
        providedCategory: category,
        validCategories: Object.values(ProjectCategory)
      });
      res.status(400).json({ 
        message: 'Invalid category', 
        providedCategory: category,
        validCategories: Object.values(ProjectCategory)
      });
      return;
    }

    // Validate deadline (must be in the future)
    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      console.log('[PROJECT_CREATE] Error: Deadline must be in the future', {
        providedDeadline: deadline,
        deadlineDate: deadlineDate,
        currentDate: new Date()
      });
      res.status(400).json({ message: 'Deadline must be in the future' });
      return;
    }

    // Create project
    console.log('[PROJECT_CREATE] Creating project with data', {
      title,
      shortDesc,
      description,
      category,
      goalAmount: parseFloat(goalAmount),
      deadline: deadlineDate,
      creatorId: req.user._id,
      image: req.file ? req.file.path : 'default-project.jpg'
    });

    const project = await Project.create({
      title,
      shortDesc,
      description,
      category,
      goalAmount: parseFloat(goalAmount),
      deadline: deadlineDate,
      creatorId: req.user._id,
      image: req.file ? req.file.path : 'default-project.jpg', // Default if no image uploaded
      status: ProjectStatus.ACTIVE
    });

    console.log('[PROJECT_CREATE] Project created successfully', { projectId: project._id });

    // Create rewards if provided
    if (rewards && Array.isArray(rewards)) {
      console.log('[PROJECT_CREATE] Processing rewards', { rewardsCount: rewards.length });
      const rewardObjects = rewards.map((reward: any) => ({
        projectId: project._id,
        amount: parseFloat(reward.amount),
        title: reward.title,
        description: reward.description,
        estimatedDelivery: reward.estimatedDelivery ? new Date(reward.estimatedDelivery) : undefined,
        limitedQuantity: reward.limitedQuantity ? parseInt(reward.limitedQuantity) : undefined
      }));

      await Reward.insertMany(rewardObjects);
      console.log('[PROJECT_CREATE] Rewards created successfully');
    } else {
      console.log('[PROJECT_CREATE] No rewards to process');
    }

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error: any) {
    console.error('[PROJECT_CREATE] Error creating project:', error);
    console.error('[PROJECT_CREATE] Error stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Get all projects with filters
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      category, 
      status, 
      search, 
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query: any = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search in title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDesc: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Sorting
    const sortOptions: any = {};
    sortOptions[sortBy as string] = order === 'asc' ? 1 : -1;

    // Execute query
    const projects = await Project.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .populate('creatorId', 'name profilePic');

    // Get total count for pagination
    const total = await Project.countDocuments(query);

    res.status(200).json({
      projects,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid project ID' });
      return;
    }

    const project = await Project.findById(id)
      .populate('creatorId', 'name profilePic');

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Get rewards for this project
    const rewards = await Reward.find({ projectId: id });

    // Update project status based on current date and funding
    project.updateStatus();

    res.status(200).json({ project, rewards });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      shortDesc,
      description,
      category
    } = req.body;

    // Validate object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid project ID' });
      return;
    }

    // Find the project
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Check if user is the creator
    if (project.creatorId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to update this project' });
      return;
    }

    // Build update object
    const updateData: any = {};
    if (title) updateData.title = title;
    if (shortDesc) updateData.shortDesc = shortDesc;
    if (description) updateData.description = description;
    if (category && Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      updateData.category = category;
    }
    if (req.file) updateData.image = req.file.path;

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid project ID' });
      return;
    }

    // Find the project
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Check if user is the creator or admin
    const isAdmin = req.user.role.includes('Admin');
    if (project.creatorId.toString() !== req.user._id.toString() && !isAdmin) {
      res.status(403).json({ message: 'Not authorized to delete this project' });
      return;
    }

    // For active projects with donations, we might want to not allow deletion
    // or handle refunds, but for this implementation we'll just delete

    // Delete associated rewards
    await Reward.deleteMany({ projectId: id });

    // Delete the project
    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add project update
export const addProjectUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Validate object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid project ID' });
      return;
    }

    // Validate update text
    if (!text || text.trim() === '') {
      res.status(400).json({ message: 'Update text is required' });
      return;
    }

    // Find project
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Check if user is the creator
    if (project.creatorId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to update this project' });
      return;
    }

    // Add update
    project.updates = project.updates || [];
    project.updates.push({
      text,
      date: new Date()
    });

    await project.save();

    res.status(200).json({ message: 'Project update added successfully', project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 