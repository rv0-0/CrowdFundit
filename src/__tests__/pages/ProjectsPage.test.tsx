import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectsPage from '../../pages/ProjectsPage';
import AuthContext, { UserRole } from '../../contexts/AuthContext';
import api from '../../utils/api';

// Mock the API calls
jest.mock('../../utils/api', () => ({
  get: jest.fn()
}));

// Mock auth context
const mockAuthContext = {
  user: null,
  isLoading: false,
  error: null,
  updateUserRole: jest.fn()
};

describe('ProjectsPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading state initially', () => {
    (api.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <ProjectsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
  });

  test('displays projects when loaded', async () => {
    // Mock API response with test projects
    const mockProjects = [
      {
        _id: '1',
        title: 'Test Project 1',
        description: 'Test description 1',
        category: 'Technology',
        fundingGoal: 10000,
        currentFunding: 5000,
        endDate: new Date(Date.now() + 864000000).toISOString(), // 10 days from now
        creator: {
          _id: 'user1',
          name: 'Test Creator'
        }
      },
      {
        _id: '2',
        title: 'Test Project 2',
        description: 'Test description 2',
        category: 'Art',
        fundingGoal: 5000,
        currentFunding: 1000,
        endDate: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
        creator: {
          _id: 'user2',
          name: 'Another Creator'
        }
      }
    ];
    
    (api.get as jest.Mock).mockResolvedValue({ data: mockProjects });
    
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <ProjectsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    // Wait for projects to load
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });
    
    // Check that both projects are displayed
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.getByText('Test Project 2')).toBeInTheDocument();
    
    // Check for category display
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Art')).toBeInTheDocument();
    
    // Check for funding progress
    expect(screen.getByText('$5,000')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    
    // Verify creator names
    expect(screen.getByText('Test Creator')).toBeInTheDocument();
    expect(screen.getByText('Another Creator')).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    // Mock API error
    (api.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch projects'));
    
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <ProjectsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error loading projects/i)).toBeInTheDocument();
    });
  });

  test('displays "No projects found" when API returns empty array', async () => {
    // Mock API returning empty array
    (api.get as jest.Mock).mockResolvedValue({ data: [] });
    
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <ProjectsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    // Wait for no projects message
    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
  });
}); 