import mongoose, { Document, Schema } from 'mongoose';

export interface IReward extends Document {
  projectId: mongoose.Types.ObjectId;
  amount: number;
  title: string;
  description: string;
  estimatedDelivery?: Date;
  limitedQuantity?: number;
  quantityClaimed?: number;
}

const RewardSchema = new Schema<IReward>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    estimatedDelivery: {
      type: Date
    },
    limitedQuantity: {
      type: Number,
      min: 0
    },
    quantityClaimed: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

// Virtual for checking if reward is sold out
RewardSchema.virtual('isSoldOut').get(function() {
  if (!this.limitedQuantity) return false;
  return (this.quantityClaimed ?? 0) >= (this.limitedQuantity ?? 0);
});

export default mongoose.model<IReward>('Reward', RewardSchema); 