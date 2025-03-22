import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { UserRole } from '../models/User';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crowdfundit');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: [UserRole.ADMIN, UserRole.BACKER]
  },
  {
    name: 'Creator User',
    email: 'creator@example.com',
    password: 'password123',
    role: [UserRole.CREATOR, UserRole.BACKER]
  },
  {
    name: 'Backer User',
    email: 'backer@example.com',
    password: 'password123',
    role: [UserRole.BACKER]
  }
];

// Seed function
const seedUsers = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('Users cleared');

    // Create new users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    console.log('Sample users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}): roles [${user.role.join(', ')}]`);
    });

    console.log('User seeding completed!');
    process.exit(0);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedUsers(); 