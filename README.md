# CrowdfundIt - A Crowdfunding Web Platform

CrowdfundIt is a modern web platform that allows users to create and fund crowdfunding projects. The platform enables creators to start projects, define funding goals and rewards, while backers can browse and support projects they find interesting.

## Project Overview

This platform provides the following core features:

- User registration and authentication (backers and creators)
- Project creation with details, images, funding goals, and deadlines
- Browsing and searching for projects
- Secure donation processing
- Project updates and status tracking
- User dashboards for creators and backers
- Admin moderation panel

## Tech Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Stripe for payment processing

### Deployment
- Frontend: Vercel
- Backend: Render/Heroku/Railway
- Database: MongoDB Atlas

## Project Structure

The project is organized as a monorepo with two main directories:

```
crowdfundit/
├── client/          # Frontend React application
└── server/          # Backend Node.js API
```

Each directory has its own dependencies, scripts, and README files with more details.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Stripe account for payment processing

### Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crowdfundit.git
cd crowdfundit
```

2. Set up the backend:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crowdfundit
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

4. Set up the frontend:
```bash
cd ../client
npm install
```

5. Create a `.env` file in the client directory:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

### Running the Application

#### Backend
```bash
cd server
npm run dev
```

#### Frontend
```bash
cd client
npm start
```

The frontend application will be accessible at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Main Features

### User Authentication
- Sign up with email/password
- Login with existing credentials
- Role selection (Creator/Backer)
- User profile management

### Project Management
- Create projects with details, images, categories
- Define funding goals and deadlines
- Add reward tiers for backers
- Post project updates
- Dashboard for tracking project status

### Funding Process
- Browse active projects
- Filter and search functionality
- Secure payment through Stripe
- Donation tracking and receipt

### Admin Features
- Content moderation
- User management
- System metrics

## License

This project is licensed under the ISC License.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Stripe](https://stripe.com/) 