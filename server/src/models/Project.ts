import mongoose, { Document, Schema } from 'mongoose';

export enum ProjectStatus {
  ACTIVE = 'Active',
  FUNDED = 'Funded',
  FAILED = 'Failed'
}

export enum ProjectCategory {
  TECH = 'Tech',
  ART = 'Art',
  CHARITY = 'Charity',
  MUSIC = 'Music',
  FOOD = 'Food',
  GAMES = 'Games',
  FILM = 'Film',
  PUBLISHING = 'Publishing',
  OTHER = 'Other'
}

export interface IProject extends Document {
  title: string;
  shortDesc: string;
  description: string;
  category: ProjectCategory;
  goalAmount: number;
  currentAmount: number;
  deadline: Date;
  creatorId: mongoose.Types.ObjectId;
  image: string;
  status: ProjectStatus;
  updates?: Array<{
    text: string;
    date: Date;
  }>;
  updateStatus(): Promise<IProject>;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    shortDesc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: Object.values(ProjectCategory),
      required: true
    },
    goalAmount: {
      type: Number,
      required: true,
      min: 1
    },
    currentAmount: {
      type: Number,
      default: 0
    },
    deadline: {
      type: Date,
      required: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    image: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ACTIVE
    },
    updates: [
      {
        text: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Virtual for calculating percentage funded
ProjectSchema.virtual('percentFunded').get(function() {
  if (this.goalAmount === 0) return 0;
  return Math.min(Math.round((this.currentAmount / this.goalAmount) * 100), 100);
});

// Virtual for calculating days left
ProjectSchema.virtual('daysLeft').get(function() {
  const now = new Date();
  const diff = this.deadline.getTime() - now.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
});

// Update status based on deadline and funding
ProjectSchema.methods.updateStatus = function() {
  const now = new Date();
  
  if (this.currentAmount >= this.goalAmount) {
    this.status = ProjectStatus.FUNDED;
  } else if (now > this.deadline) {
    this.status = ProjectStatus.FAILED;
  } else {
    this.status = ProjectStatus.ACTIVE;
  }
  
  return this.save();
};

export default mongoose.model<IProject>('Project', ProjectSchema); 