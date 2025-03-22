import { Request, Response } from 'express';
import Donation, { PaymentStatus } from '../models/Donation';
import Project, { ProjectStatus } from '../models/Project';
import Reward from '../models/Reward';
import mongoose from 'mongoose';

// Create a donation (direct without Stripe)
export const createDonation = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, projectId, rewardId } = req.body;

    // Validate inputs
    if (!amount || amount <= 0) {
      res.status(400).json({ message: 'Invalid donation amount' });
      return;
    }

    // Check if project exists and is active
    const project = await Project.findById(projectId).session(session);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      await session.abortTransaction();
      session.endSession();
      return;
    }

    if (project.status !== ProjectStatus.ACTIVE) {
      res.status(400).json({ message: 'Project is no longer accepting donations' });
      await session.abortTransaction();
      session.endSession();
      return;
    }

    // If reward specified, validate it exists and is available
    if (rewardId) {
      const reward = await Reward.findById(rewardId).session(session);
      if (!reward) {
        res.status(404).json({ message: 'Reward not found' });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      // Check if reward belongs to the project
      if (reward.projectId.toString() !== projectId) {
        res.status(400).json({ message: 'Reward does not belong to this project' });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      // Check if reward amount is covered by donation
      if (reward.amount > amount) {
        res.status(400).json({ 
          message: `Donation must be at least ${reward.amount} to receive this reward` 
        });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      // Check if limited quantity reward is available
      if (reward.limitedQuantity && (reward.quantityClaimed ?? 0) >= (reward.limitedQuantity ?? 0)) {
        res.status(400).json({ message: 'This reward is no longer available' });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      // Update reward claimed quantity
      await Reward.findByIdAndUpdate(
        rewardId,
        { $inc: { quantityClaimed: 1 } },
        { session }
      );
    }

    // Create donation record
    const donation = await Donation.create([{
      userId: req.user._id,
      projectId,
      amount,
      paymentStatus: PaymentStatus.COMPLETED,
      rewardId: rewardId || null
    }], { session });

    // Update project funding amount
    project.currentAmount += amount;
      
    // Check if project reached its goal
    if (project.currentAmount >= project.goalAmount) {
      project.status = ProjectStatus.FUNDED;
    }
    
    await project.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return success message with updated project
    res.status(201).json({
      message: 'Donation successful',
      donation: donation[0],
      project: {
        id: project._id,
        title: project.title,
        currentAmount: project.currentAmount,
        goalAmount: project.goalAmount,
        status: project.status
      }
    });
  } catch (error: any) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

// Get user's donations
export const getUserDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('projectId', 'title image');
    
    res.status(200).json(donations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get project donations
export const getProjectDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    
    const donations = await Donation.find({ 
      projectId,
      paymentStatus: PaymentStatus.COMPLETED 
    })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    
    // Count total donations and sum
    const stats = await Donation.aggregate([
      { 
        $match: { 
          projectId: new mongoose.Types.ObjectId(projectId),
          paymentStatus: PaymentStatus.COMPLETED 
        } 
      },
      { 
        $group: { 
          _id: null, 
          totalAmount: { $sum: '$amount' }, 
          count: { $sum: 1 } 
        } 
      }
    ]);
    
    const totalAmount = stats.length > 0 ? stats[0].totalAmount : 0;
    const count = stats.length > 0 ? stats[0].count : 0;
    
    res.status(200).json({
      donations,
      stats: { totalAmount, count }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 