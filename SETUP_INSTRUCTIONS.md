# CrowdFundIt - Complete Setup Guide

This guide will walk you through setting up the CrowdFundIt platform, including both backend and frontend components.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (we'll use your provided connection string)
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/crowdfundit.git
cd crowdfundit
```

## Step 2: Set Up the Backend

### Install Dependencies

```bash
cd server
npm install
```

### Configure Environment Variables

1. Create or edit the `.env` file in the server directory:

```
PORT=5000
MONGODB_URI=mongodb+srv://rksingh0399:e3YjDdvZ3eEpqICX@crowdfundit.d8ero.mongodb.net/?retryWrites=true&w=majority&appName=CrowdFundit
JWT_SECRET=your_jwt_secret_key_here
```

2. Create an `uploads` directory for project images:

```bash
mkdir uploads
```

### Seed the Database

To populate the database with initial data, run:

```bash
npm run seed
```

This will create:
- 3 users (admin, creator, and backer)
- 5 sample projects

### Start the Backend Server

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`.

## Step 3: Set Up the Frontend

### Install Dependencies

```bash
cd ../client
npm install
```

### Configure Environment Variables

Create a `.env` file in the client directory:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Start the Frontend Server

```bash
npm start
```

The frontend application will run on `http://localhost:3000`.

## Step 4: Test the Application

Once both backend and frontend servers are running, you can test the application:

1. Open your browser and navigate to `http://localhost:3000`
2. Use the following credentials to log in:
   - Creator account: creator@example.com / password123
   - Backer account: backer@example.com / password123
   - Admin account: admin@example.com / password123

## API Endpoints Reference

### Authentication

- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (requires Creator role)
- `PUT /api/projects/:id` - Update project (requires Creator role)
- `DELETE /api/projects/:id` - Delete project (requires Creator role)
- `POST /api/projects/:id/updates` - Add project update (requires Creator role)

### Donations

- `POST /api/donations/donate` - Make a donation to a project
- `GET /api/donations/my-donations` - Get user's donations
- `GET /api/donations/project/:projectId` - Get project's donations

## Database Structure

### User Model

```typescript
{
  name: string;
  email: string;
  password: string; // Hashed
  role: Array<"Backer" | "Creator" | "Admin">;
  profilePic?: string;
}
```

### Project Model

```typescript
{
  title: string;
  shortDesc: string;
  description: string;
  category: "Tech" | "Art" | "Charity" | "Music" | "Food" | "Games" | "Film" | "Publishing" | "Other";
  goalAmount: number;
  currentAmount: number;
  deadline: Date;
  creatorId: ObjectId; // References User
  image: string;
  status: "Active" | "Funded" | "Failed";
  updates: Array<{
    text: string;
    date: Date;
  }>;
}
```

### Donation Model

```typescript
{
  userId: ObjectId; // References User
  projectId: ObjectId; // References Project  
  amount: number;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  rewardId?: ObjectId; // References Reward (optional)
  timestamp: Date;
}
```

## Troubleshooting

### Backend Issues

1. If MongoDB connection fails:
   - Check that your MongoDB Atlas instance is running
   - Verify the connection string in `.env` is correct
   - Make sure your IP address is whitelisted in MongoDB Atlas

2. If seeding fails:
   - Check MongoDB connection
   - Run `npm run seed` again to retry

### Frontend Issues

1. If API requests fail:
   - Verify the backend is running
   - Check that `REACT_APP_API_URL` is set correctly
   - Look for CORS errors in the browser console

2. If login fails:
   - Ensure the database was seeded properly
   - Verify the credentials match those in the seed file 