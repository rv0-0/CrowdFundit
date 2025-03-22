import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Project, { ProjectStatus } from '../models/Project';

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

// Seed function
const seedProjects = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Projects cleared');

    // Find creator user
    const creator = await User.findOne({ email: 'creator@example.com' });
    if (!creator) {
      console.error('Creator user not found. Run seedUsers.ts first.');
      process.exit(1);
    }

    // Calculate dates
    const now = new Date();
    const oneMonthFromNow = new Date(now);
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    const twoMonthsFromNow = new Date(now);
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
    
    const pastDate = new Date(now);
    pastDate.setMonth(pastDate.getMonth() - 1);

    // Sample projects data
    const projects = [
      {
        title: 'Innovative Smart Watch',
        shortDesc: 'A next-generation smartwatch with health monitoring and extended battery life.',
        description: `Our innovative smartwatch is designed to revolutionize how you monitor your health and fitness. 
        With advanced sensors for heart rate, blood oxygen, sleep tracking, and stress levels, this device provides comprehensive health insights.
        
        Key features include:
        - 7-day battery life
        - Water-resistant up to 50m
        - Real-time health monitoring
        - AI-powered fitness recommendations
        - Compatible with iOS and Android
        
        We've spent two years developing this technology to ensure it's both accurate and affordable.`,
        category: 'Tech',
        goalAmount: 50000,
        currentAmount: 12500,
        deadline: oneMonthFromNow,
        creatorId: creator._id,
        image: '/uploads/smartwatch.jpg',
        status: ProjectStatus.ACTIVE,
        updates: [
          {
            text: 'We\'ve finished our final prototype and are ready to begin production.',
            date: new Date(now.setDate(now.getDate() - 7))
          }
        ]
      },
      {
        title: 'Sustainable Bamboo Kitchenware',
        shortDesc: 'Eco-friendly kitchen utensils and cutting boards made from sustainable bamboo.',
        description: `Our kitchen collection is crafted from 100% sustainable bamboo, offering a durable and eco-friendly alternative to plastic kitchenware.
        
        Each piece is:
        - Naturally antibacterial
        - Resistant to water damage
        - Free from harmful chemicals
        - Biodegradable at end of life
        - Handcrafted by skilled artisans
        
        By supporting this project, you're helping reduce plastic waste while getting beautiful, functional kitchenware that will last for years.`,
        category: 'Other',
        goalAmount: 10000,
        currentAmount: 8750,
        deadline: twoMonthsFromNow,
        creatorId: creator._id,
        image: '/uploads/bamboo.jpg',
        status: ProjectStatus.ACTIVE,
        updates: []
      },
      {
        title: 'Urban Photography Book',
        shortDesc: 'A visual journey through the hidden corners of major cities around the world.',
        description: `This hardcover photography book captures the unseen beauty of urban landscapes across six continents.
        
        Over three years, I've traveled to 30 cities to document the hidden architecture, street art, and everyday life that tourists rarely see.
        
        The book features:
        - 200+ original photographs
        - 180 pages of premium quality paper
        - Insightful commentary and city histories
        - Maps highlighting each location
        - Foreword by renowned photographer Alex Chen
        
        Each book is printed using sustainable practices and environmentally friendly inks.`,
        category: 'Art',
        goalAmount: 15000,
        currentAmount: 2300,
        deadline: oneMonthFromNow,
        creatorId: creator._id,
        image: '/uploads/photography.jpg',
        status: ProjectStatus.ACTIVE,
        updates: []
      },
      {
        title: 'Community Garden Initiative',
        shortDesc: 'Transforming unused urban spaces into productive community gardens.',
        description: `Our community garden project aims to create green spaces in urban food deserts, providing fresh produce and educational opportunities.
        
        With your support, we will:
        - Convert 3 vacant lots into productive gardens
        - Install irrigation systems and raised beds
        - Provide gardening tools and seeds
        - Offer free workshops on sustainable growing
        - Create a seed library for the community
        
        All produce will be shared among community members and local food banks. This is more than a garden—it's a way to build community resilience and food security.`,
        category: 'Charity',
        goalAmount: 8000,
        currentAmount: 5600,
        deadline: twoMonthsFromNow,
        creatorId: creator._id,
        image: '/uploads/garden.jpg',
        status: ProjectStatus.ACTIVE,
        updates: [
          {
            text: 'We\'ve obtained permission to use the vacant lot on Main Street. Cleanup begins next week!',
            date: new Date(now.setDate(now.getDate() - 14))
          }
        ]
      },
      {
        title: 'Indie Game Development',
        shortDesc: 'A story-driven adventure game exploring themes of memory and identity.',
        description: `"Echoes of Elsewhere" is a narrative-focused adventure game where players explore a mysterious world shaped by forgotten memories.
        
        Game features:
        - Rich, atmospheric world with hand-drawn art
        - Original soundtrack that evolves with the story
        - Branching narrative based on player choices
        - Puzzle-solving that reveals the protagonist's past
        - Approximately 8-10 hours of gameplay
        
        Our small team of three developers has been working on this passion project for 18 months, and with your support, we can complete the final development and testing.`,
        category: 'Games',
        goalAmount: 25000,
        currentAmount: 18750,
        deadline: oneMonthFromNow,
        creatorId: creator._id,
        image: '/uploads/game.jpg',
        status: ProjectStatus.ACTIVE,
        updates: []
      }
    ];

    // Create new projects
    const createdProjects = await Project.insertMany(projects);
    console.log(`${createdProjects.length} projects created`);

    console.log('Sample projects:');
    createdProjects.forEach(project => {
      console.log(`- ${project.title} ($${project.currentAmount}/$${project.goalAmount})`);
    });

    console.log('Project seeding completed!');
    process.exit(0);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedProjects(); 