import mongoose, { Document, Schema } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  REFUNDED = 'Refunded'
}

export interface IDonation extends Document {
  userId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  amount: number;
  paymentIntentId?: string;
  paymentStatus: PaymentStatus;
  rewardId?: mongoose.Types.ObjectId;
  timestamp: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
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
    paymentIntentId: {
      type: String
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING
    },
    rewardId: {
      type: Schema.Types.ObjectId,
      ref: 'Reward'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IDonation>('Donation', DonationSchema); 