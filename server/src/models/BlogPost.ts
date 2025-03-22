import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  image: string;
  readTime: number;
  featured: boolean;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  image: { type: String, required: true },
  readTime: { type: Number, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema); 