import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock Clerk's authentication
jest.mock('@clerk/clerk-react', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    isSignedIn: false,
    isLoaded: true,
  }),
  useUser: () => ({
    user: null,
  }),
  useClerk: () => ({
    session: null,
  }),
}));

// Mock the AuthContext
jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    isLoading: false,
    error: null,
    updateUserRole: jest.fn(),
  }),
}));

describe('App Component', () => {
  test('renders homepage when path is /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for elements that should be on homepage
    expect(screen.getByText(/Bring Your Ideas to Life/i)).toBeInTheDocument();
  });

  test('renders projects page when path is /projects', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for elements that should be on projects page
    expect(screen.getByText(/Discover Projects/i)).toBeInTheDocument();
  });

  test('renders login page when path is /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for elements that should be on login page
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  });

  test('renders signup page when path is /signup', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for elements that should be on signup page
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
  });
});
