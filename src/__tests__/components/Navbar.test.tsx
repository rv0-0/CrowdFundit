import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { UserRole } from '../../contexts/AuthContext';

// Mock the Clerk auth
jest.mock('@clerk/clerk-react', () => ({
  useAuth: () => ({
    isSignedIn: false,
    isLoaded: true,
  }),
  SignInButton: () => <button>Sign In</button>,
  UserButton: () => <button>User Button</button>,
}));

// Mock the app's auth context
jest.mock('../../contexts/AuthContext', () => {
  const originalModule = jest.requireActual('../../contexts/AuthContext');
  return {
    ...originalModule,
    useAuth: () => ({
      user: null,
      isLoading: false,
      error: null,
      updateUserRole: jest.fn(),
    }),
  };
});

// Helper to render the component with various auth states
const renderNavbar = (
  clerkAuth = { isSignedIn: false, isLoaded: true },
  appAuth = { user: null, isLoading: false }
) => {
  // Override the mocks for this render
  jest.mock('@clerk/clerk-react', () => ({
    useAuth: () => clerkAuth,
    SignInButton: () => <button>Sign In</button>,
    UserButton: () => <button>User Button</button>,
  }));

  jest.mock('../../contexts/AuthContext', () => ({
    useAuth: () => appAuth,
  }));

  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Logo should be rendered
    expect(screen.getByText('CrowdfundIt')).toBeInTheDocument();
    
    // Basic navigation links should be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  test('shows login and sign up links when user is not signed in', () => {
    // Reset mocks to default state (not signed in)
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: false,
        isLoaded: true,
      }),
      SignInButton: () => <button>Sign In</button>,
      UserButton: () => <button>User Button</button>,
    }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    
    // "Create Project" should not be visible for unauthenticated users
    expect(screen.queryByText('Create Project')).not.toBeInTheDocument();
  });

  test('shows user button when user is signed in', () => {
    // Mock signed in state
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: true,
        isLoaded: true,
      }),
      SignInButton: () => <button>Sign In</button>,
      UserButton: () => <button>User Button</button>,
    }));

    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: ['Creator'] as UserRole[],
        },
        isLoading: false,
      }),
    }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // User button should be rendered
    expect(screen.getByText('User Button')).toBeInTheDocument();
    
    // Login/Signup links should not be visible
    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
  });

  test('does not show create project link for non-creator users', () => {
    // Mock signed in state for non-creator
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: true,
        isLoaded: true,
      }),
      SignInButton: () => <button>Sign In</button>,
      UserButton: () => <button>User Button</button>,
    }));

    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: ['Backer'] as UserRole[],
        },
        isLoading: false,
      }),
    }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Create Project link should not be visible for non-creator users
    expect(screen.queryByText('Create Project')).not.toBeInTheDocument();
  });
  
  test('shows create project link for creator users', () => {
    // Mock signed in state for creator
    jest.mock('@clerk/clerk-react', () => ({
      useAuth: () => ({
        isSignedIn: true,
        isLoaded: true,
      }),
      SignInButton: () => <button>Sign In</button>,
      UserButton: () => <button>User Button</button>,
    }));

    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: ['Creator'] as UserRole[],
        },
        isLoading: false,
      }),
    }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Create Project link should be visible for creator users
    expect(screen.getByText('Create Project')).toBeInTheDocument();
  });
}); 