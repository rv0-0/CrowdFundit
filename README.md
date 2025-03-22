# CrowdfundIt Client

A crowdfunding platform frontend built with React, TypeScript, and Tailwind CSS, with authentication provided by Clerk.

## Features

- User authentication with Clerk
- Role-based access control
- Responsive design with Tailwind CSS
- Project browsing and creation
- Blog section
- User profile management
- Support for different user roles (Creator, Backer)

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- A Clerk account and project (for authentication)

## Environment Setup

Create a `.env` file in the root of the client directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Replace `your_clerk_publishable_key` with your actual Clerk publishable key from your Clerk dashboard.

## Installation

1. Clone the repository
2. Navigate to the client directory
3. Install dependencies:

```bash
npm install
# or
yarn install
```

## Development

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/components/auth` - Authentication-related components
- `/src/components/layout` - Layout components (Navbar, Footer, etc.)
- `/src/contexts` - React context providers
- `/src/pages` - Main application pages
- `/src/utils` - Utility functions
- `/src/types` - TypeScript type definitions

## Authentication

This project uses [Clerk](https://clerk.dev) for authentication. Clerk provides:

- Login and signup functionality
- User profile management
- Session management
- Social login providers

## Customization

- Styles: Modify the Tailwind configuration in `tailwind.config.js`
- Theme: Update primary colors and other design tokens in the configuration
