import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost';
import connectDB from '../config/database';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Sample blog post data
const blogPosts = [
  {
    title: 'Crowdfunding 101: How to Launch a Successful Campaign',
    excerpt: 'Learn the essential steps to planning, creating, and promoting a successful crowdfunding campaign.',
    content: `
      <p>Launching a successful crowdfunding campaign requires careful planning and execution. Here are the essential steps to follow:</p>
      
      <h3>1. Define Your Project Clearly</h3>
      <p>Before you start, make sure you have a clear understanding of what you're trying to fund. Define your goals, timeline, and budget requirements.</p>
      
      <h3>2. Choose the Right Platform</h3>
      <p>Different crowdfunding platforms cater to different types of projects. Research which platform aligns best with your project type and goals.</p>
      
      <h3>3. Create Compelling Content</h3>
      <p>Your campaign page should include high-quality images, videos, and clear, concise text that explains your project and why people should support it.</p>
      
      <h3>4. Set Realistic Funding Goals</h3>
      <p>Be realistic about how much money you need and can raise. Setting an attainable goal increases your chances of success.</p>
      
      <h3>5. Plan Your Rewards Carefully</h3>
      <p>Offer attractive rewards at various price points to appeal to different types of backers.</p>
      
      <h3>6. Build a Marketing Strategy</h3>
      <p>Develop a comprehensive marketing plan to promote your campaign before, during, and after launch.</p>
      
      <h3>7. Engage Your Community</h3>
      <p>Regularly update your backers on progress and respond promptly to questions and feedback.</p>
      
      <h3>8. Prepare for Success</h3>
      <p>Have a plan in place for what happens if you exceed your funding goal or face unexpected challenges.</p>
    `,
    author: 'Sarah Johnson',
    date: new Date('2023-03-15'),
    category: 'Tips & Guides',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    readTime: 8,
    featured: true
  },
  {
    title: 'The Psychology Behind Successful Crowdfunding Campaigns',
    excerpt: 'Understanding what motivates backers and how to create an emotional connection with your audience.',
    content: `
      <p>Successful crowdfunding is as much about psychology as it is about the product or project itself. Understanding what motivates people to support campaigns can significantly increase your chances of success.</p>
      
      <h3>The Power of Social Proof</h3>
      <p>People are more likely to contribute to campaigns that already have support. Securing early backers creates momentum and signals to others that your project is worthy of investment.</p>
      
      <h3>Creating Emotional Connections</h3>
      <p>Campaigns that tell compelling stories and connect emotionally with potential backers tend to outperform those that focus solely on product features or specifications.</p>
      
      <h3>The Influence of Scarcity and Exclusivity</h3>
      <p>Limited edition rewards or early bird specials create a sense of urgency and exclusivity that can drive people to back your project quickly.</p>
      
      <h3>Trust and Transparency</h3>
      <p>Being transparent about your process, challenges, and how funds will be used builds trust with potential backers.</p>
      
      <h3>The Impact of Visual Content</h3>
      <p>High-quality visuals, especially videos, significantly increase engagement and conversion rates on crowdfunding platforms.</p>
      
      <h3>The Role of Community</h3>
      <p>Building a community around your project before, during, and after your campaign creates a support network that can amplify your reach and provide valuable feedback.</p>
    `,
    author: 'Michael Chen',
    date: new Date('2023-02-27'),
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e7c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
    readTime: 12,
    featured: false
  },
  {
    title: 'Spotlight: 5 Innovative Projects Changing Their Industries',
    excerpt: 'From sustainable tech to revolutionary healthcare solutions, these projects are making waves.',
    content: `
      <p>Crowdfunding has become a launchpad for some of the most innovative projects across various industries. Here are five standout campaigns that are disrupting their respective fields:</p>
      
      <h3>1. EcoCharge: Sustainable Energy Storage</h3>
      <p>This revolutionary home battery system uses recycled materials and advanced energy management software to reduce household carbon footprints by up to 70%. The campaign raised over $2 million, far exceeding its initial $500,000 goal.</p>
      
      <h3>2. MediScan: Portable Diagnostic Tool</h3>
      <p>This handheld device can perform basic health diagnostics and connect wirelessly to healthcare providers for remote consultations. Particularly valuable in underserved regions, MediScan raised $1.5 million from over 8,000 backers.</p>
      
      <h3>3. AquaPure: Water Filtration Technology</h3>
      <p>Using nanotechnology, AquaPure removes 99.9% of contaminants from water sources without electricity or replacement filters. The campaign raised $3 million to bring clean water solutions to regions facing water scarcity.</p>
      
      <h3>4. UrbanFarm: Vertical Farming Solution</h3>
      <p>This modular vertical farming system enables urban dwellers to grow fresh produce year-round with minimal space requirements and 95% less water than traditional farming. The campaign secured $1.2 million in funding.</p>
      
      <h3>5. LearnPlay: Educational Gaming Platform</h3>
      <p>Combining cutting-edge AI with game design, LearnPlay creates personalized learning experiences that adapt to children's individual learning styles. The platform raised $2.5 million and is now being implemented in schools across the country.</p>
    `,
    author: 'Emma Wilson',
    date: new Date('2023-02-10'),
    category: 'Success Stories',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    readTime: 6,
    featured: false
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Delete existing blog posts
    await BlogPost.deleteMany({});
    console.log('Deleted existing blog posts');
    
    // Insert new blog posts
    await BlogPost.insertMany(blogPosts);
    console.log('Successfully seeded blog posts');
    
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from database');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 