import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDetailPage from '../../pages/ProjectDetailPage';
import AuthContext, { useAuth, UserRole } from '../../contexts/AuthContext';
import api from '../../utils/api';

// Define User interface based on AuthContext's User type
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole[];
  profilePic?: string;
}

// Mock the API calls
jest.mock('../../utils/api', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

// Mock auth context for authenticated user
const authenticatedContext = {
  user: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    role: ['Backer'] as UserRole[],
    profilePic: 'https://example.com/profile.jpg'
  },
  isLoading: false,
  error: null,
  updateUserRole: jest.fn()
};

// Mock auth context for unauthenticated user
const unauthenticatedContext = {
  user: null,
  isLoading: false,
  error: null,
  updateUserRole: jest.fn()
};

// Helper to render component with router
const renderWithRouter = (authContext: any = unauthenticatedContext) => {
  return render(
    <MemoryRouter initialEntries={['/projects/123']}>
      <AuthContext.Provider value={authContext}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('ProjectDetailPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading state initially', () => {
    (api.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderWithRouter();
    
    expect(screen.getByText(/loading project/i)).toBeInTheDocument();
  });

  test('displays project details when loaded', async () => {
    // Mock API response with test project
    const mockProject = {
      _id: '123',
      title: 'Test Project',
      description: 'This is a test project description',
      category: 'Technology',
      fundingGoal: 10000,
      currentFunding: 5000,
      endDate: new Date(Date.now() + 864000000).toISOString(), // 10 days from now
      creator: {
        _id: 'creator123',
        name: 'Project Creator'
      },
      updates: [
        {
          _id: 'update1',
          title: 'First Update',
          content: 'This is the first project update',
          date: new Date().toISOString()
        }
      ]
    };
    
    (api.get as jest.Mock).mockResolvedValue({ data: mockProject });
    
    renderWithRouter();
    
    // Wait for project to load
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
    
    // Check project details are displayed
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Project Creator')).toBeInTheDocument();
    
    // Check funding information
    expect(screen.getByText('$10,000')).toBeInTheDocument(); // funding goal
    expect(screen.getByText('$5,000')).toBeInTheDocument(); // current funding
    expect(screen.getByText('50%')).toBeInTheDocument(); // funding percentage
    
    // Check updates
    expect(screen.getByText('First Update')).toBeInTheDocument();
    expect(screen.getByText('This is the first project update')).toBeInTheDocument();
  });

  test('allows authenticated users to make donations', async () => {
    // Mock API responses
    const mockProject = {
      _id: '123',
      title: 'Test Project',
      description: 'Project description',
      category: 'Technology',
      fundingGoal: 10000,
      currentFunding: 5000,
      endDate: new Date(Date.now() + 864000000).toISOString(),
      creator: {
        _id: 'creator123',
        name: 'Project Creator'
      },
      updates: []
    };
    
    (api.get as jest.Mock).mockResolvedValue({ data: mockProject });
    (api.post as jest.Mock).mockResolvedValue({ 
      data: { 
        message: 'Donation successful',
        project: {
          ...mockProject,
          currentFunding: 5100 // Updated funding amount
        }
      } 
    });
    
    // Render with authenticated user
    renderWithRouter(authenticatedContext);
    
    // Wait for project to load
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
    
    // Find and fill donation input
    const donationInput = screen.getByLabelText(/donation amount/i);
    await userEvent.clear(donationInput);
    await userEvent.type(donationInput, '100');
    
    // Submit donation
    const submitButton = screen.getByRole('button', { name: /back this project/i });
    await userEvent.click(submitButton);
    
    // Check API was called with correct data
    expect(api.post).toHaveBeenCalledWith('/projects/123/donations', { amount: 100 });
    
    // Wait for donation to process
    await waitFor(() => {
      expect(screen.getByText('Donation successful')).toBeInTheDocument();
    });
    
    // Check updated funding is displayed
    await waitFor(() => {
      expect(screen.getByText('$5,100')).toBeInTheDocument();
    });
  });

  test('shows login prompt for unauthenticated users trying to donate', async () => {
    // Mock API response
    const mockProject = {
      _id: '123',
      title: 'Test Project',
      description: 'Project description',
      fundingGoal: 10000,
      currentFunding: 5000,
      endDate: new Date(Date.now() + 864000000).toISOString(),
      creator: { _id: 'creator123', name: 'Project Creator' },
      updates: []
    };
    
    (api.get as jest.Mock).mockResolvedValue({ data: mockProject });
    
    // Render with unauthenticated user
    renderWithRouter(unauthenticatedContext);
    
    // Wait for project to load
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
    
    // Check for login prompt
    expect(screen.getByText(/login to support this project/i)).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    // Mock API error
    (api.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch project'));
    
    renderWithRouter();
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error loading project/i)).toBeInTheDocument();
    });
  });
}); 