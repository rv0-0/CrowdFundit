# CrowdfundIt Backend Server

This is the backend server for the CrowdfundIt crowdfunding platform. It provides RESTful APIs for user authentication, project management, donation processing, and more.

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & Clerk
- **Payment Processing**: Stripe
- **File Upload**: Multer

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed locally or a cloud instance)
- Stripe account for payment processing
- Clerk account for authentication (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crowdfundit.git
cd crowdfundit/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crowdfundit
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

### Running the Server

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Authentication (JWT)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Authentication (Clerk)
- `GET /api/auth/clerk/me` - Get current user profile (Clerk authenticated)
- `PUT /api/auth/clerk/profile` - Update user profile (Clerk authenticated)

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project (JWT auth)
- `PUT /api/projects/:id` - Update a project (JWT auth)
- `DELETE /api/projects/:id` - Delete a project (JWT auth)
- `POST /api/projects/:id/updates` - Add an update to a project (JWT auth)

### Projects (Clerk Authentication)
- `POST /api/projects/clerk` - Create a new project (Clerk auth)
- `PUT /api/projects/clerk/:id` - Update a project (Clerk auth)
- `DELETE /api/projects/clerk/:id` - Delete a project (Clerk auth)
- `POST /api/projects/clerk/:id/updates` - Add update to a project (Clerk auth)

### Donations
- `POST /api/donations/create-payment-intent` - Create a Stripe payment intent (JWT auth)
- `GET /api/donations/my-donations` - Get user's donations (JWT auth)
- `POST /api/donations/webhook` - Stripe webhook endpoint

### Donations (Clerk Authentication)
- `POST /api/donations/clerk/create-payment-intent` - Create a payment intent (Clerk auth)
- `GET /api/donations/clerk/my-donations` - Get user's donations (Clerk auth)

## Authentication

The application supports two authentication methods:

### JWT Authentication (Legacy)

The traditional JWT-based authentication is still supported for backward compatibility. It uses the `/api/auth/login` endpoint to obtain a JWT token, which is then used to authenticate subsequent requests.

### Clerk Authentication (Recommended)

[Clerk](https://clerk.dev/) provides a more secure and feature-rich authentication system. To use Clerk authentication:

1. Obtain a JWT token from the Clerk frontend SDK
2. Include this token in the `Authorization: Bearer <token>` header for requests
3. Use the `/api/auth/clerk/*` endpoints and other Clerk-specific endpoints

The server uses a simplified JWT verification for Clerk tokens in development. For production, it's recommended to use the full `@clerk/clerk-sdk-node` package for proper token verification.

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── index.ts        # Entry point
├── uploads/            # Uploaded files
├── .env                # Environment variables
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## License

This project is licensed under the ISC License. 