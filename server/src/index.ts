import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/database';
import fs from 'fs';

// Route imports
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import donationRoutes from './routes/donationRoutes';
import blogRoutes from './routes/blogRoutes';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body));
  }
  next();
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log('Uploads directory:', path.join(__dirname, '../uploads'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// API Routes
console.log('Registering routes...');
app.use('/api/auth', authRoutes);
console.log('Registered: /api/auth');
app.use('/api/projects', projectRoutes);
console.log('Registered: /api/projects');
app.use('/api/donations', donationRoutes);
console.log('Registered: /api/donations');
app.use('/api/blog', blogRoutes);
console.log('Registered: /api/blog');

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to CrowdfundIt API' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler caught:', err);
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 