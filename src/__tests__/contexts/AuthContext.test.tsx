import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../contexts/AuthContext';

// Mock Clerk's hooks
jest.mock('@clerk/clerk-react', () => ({
  useAuth: jest.fn(),
  useUser: jest.fn(),
  useClerk: jest.fn(),
}));

// Mock the API utility
jest.mock('../../utils/api', () => ({
  setAuthToken: jest.fn(),
}));

// Component that consumes the auth context for testing
const TestComponent = () => {
  const { user, isLoading, error, updateUserRole } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="error">{error || 'no-error'}</div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no-user'}</div>
      <button 
        onClick={() => updateUserRole('Creator')}
        data-testid="update-role-btn"
      >
        Become Creator
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock values
    require('@clerk/clerk-react').useAuth.mockReturnValue({
      isSignedIn: false,
      isLoaded: true
    });
    
    require('@clerk/clerk-react').useUser.mockReturnValue({
      user: null
    });
    
    require('@clerk/clerk-react').useClerk.mockReturnValue({
      session: null
    });
  });
  
  test('provides loading state when Clerk is not loaded', async () => {
    // Mock Clerk not loaded
    require('@clerk/clerk-react').useAuth.mockReturnValue({
      isSignedIn: false,
      isLoaded: false
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('loading').textContent).toBe('true');
  });
  
  test('provides null user when not signed in', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('user').textContent).toBe('no-user');
  });
  
  test('provides user data when signed in', async () => {
    // Mock signed in Clerk user
    require('@clerk/clerk-react').useAuth.mockReturnValue({
      isSignedIn: true,
      isLoaded: true
    });
    
    require('@clerk/clerk-react').useUser.mockReturnValue({
      user: {
        id: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        primaryEmailAddress: { emailAddress: 'john@example.com' },
        imageUrl: 'http://example.com/avatar.jpg',
        publicMetadata: {}
      }
    });
    
    require('@clerk/clerk-react').useClerk.mockReturnValue({
      session: {
        getToken: jest.fn().mockResolvedValue('mock-token')
      }
    });
    
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    
    // Wait for user data to be set
    await waitFor(() => {
      const userData = JSON.parse(screen.getByTestId('user').textContent as string);
      expect(userData).toHaveProperty('id', 'user_123');
      expect(userData).toHaveProperty('name', 'John Doe');
      expect(userData).toHaveProperty('email', 'john@example.com');
      expect(userData.role).toContain('Backer');
    });
    
    // Should set the auth token
    expect(require('../../utils/api').setAuthToken).toHaveBeenCalledWith('mock-token');
  });
  
  test('sets custom role from metadata if available', async () => {
    // Mock signed in Clerk user with Creator role in metadata
    require('@clerk/clerk-react').useAuth.mockReturnValue({
      isSignedIn: true,
      isLoaded: true
    });
    
    require('@clerk/clerk-react').useUser.mockReturnValue({
      user: {
        id: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        primaryEmailAddress: { emailAddress: 'john@example.com' },
        imageUrl: 'http://example.com/avatar.jpg',
        publicMetadata: { role: 'Creator' }
      }
    });
    
    require('@clerk/clerk-react').useClerk.mockReturnValue({
      session: {
        getToken: jest.fn().mockResolvedValue('mock-token')
      }
    });
    
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    
    // Wait for user data to be set
    await waitFor(() => {
      const userData = JSON.parse(screen.getByTestId('user').textContent as string);
      expect(userData.role).toContain('Creator');
    });
  });
  
  test('allows updating user role', async () => {
    // Mock signed in Clerk user
    require('@clerk/clerk-react').useAuth.mockReturnValue({
      isSignedIn: true,
      isLoaded: true
    });
    
    require('@clerk/clerk-react').useUser.mockReturnValue({
      user: {
        id: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        primaryEmailAddress: { emailAddress: 'john@example.com' },
        imageUrl: 'http://example.com/avatar.jpg',
        publicMetadata: {}
      }
    });
    
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    
    // Initial role should be Backer
    await waitFor(() => {
      const userData = JSON.parse(screen.getByTestId('user').textContent as string);
      expect(userData.role).toEqual(['Backer']);
    });
    
    // Click the button to update role
    act(() => {
      screen.getByTestId('update-role-btn').click();
    });
    
    // Role should now include Creator
    await waitFor(() => {
      const userData = JSON.parse(screen.getByTestId('user').textContent as string);
      expect(userData.role).toContain('Creator');
      expect(userData.role).toContain('Backer');
    });
  });
}); 