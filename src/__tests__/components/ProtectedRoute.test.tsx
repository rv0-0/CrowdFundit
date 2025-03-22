import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { UserRole } from '../../contexts/AuthContext';

// Mock Clerk auth
jest.mock('@clerk/clerk-react', () => ({
  useAuth: () => ({
    isSignedIn: false,
    isLoaded: true,
  }),
}));

// Mock the app auth context
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
}));

// Test component for route content
const TestComponent = () => <div>Protected Content</div>;

const renderWithRouter = (
  ui: React.ReactNode,
  { 
    route = '/',
    clerkAuth = { isSignedIn: false, isLoaded: true },
    appAuth = { user: null }
  } = {}
) => {
  // Override mocks for this render
  jest.mock('@clerk/clerk-react', () => ({
    useAuth: () => clerkAuth,
  }));

  jest.mock('../../contexts/AuthContext', () => ({
    useAuth: () => appAuth,
  }));

  window.history.pushState({}, 'Test page', route);
  
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading when Clerk auth is not loaded', () => {
    // Override Clerk auth mock
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: false,
        isLoaded: false,
      }),
    }));

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Should show loading state
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('redirects to login when user is not signed in', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Should redirect to login page
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders content when user is signed in', () => {
    // Override mocks for this test
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: true,
        isLoaded: true,
      }),
    }));

    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: ['Backer'] as UserRole[],
        },
      }),
    }));

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Should render protected content
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to dashboard when user does not have required role', () => {
    // Override mocks for this test
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: true,
        isLoaded: true,
      }),
    }));

    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: ['Backer'] as UserRole[],
        },
      }),
    }));

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<ProtectedRoute requiredRole="Creator" />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Should redirect to dashboard
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
  });

  test('renders content when user has required role', () => {
    // Override mocks for this test
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: true,
        isLoaded: true,
      }),
    }));

    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: ['Creator'] as UserRole[],
        },
      }),
    }));

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<ProtectedRoute requiredRole="Creator" />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Should render protected content
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
}); 