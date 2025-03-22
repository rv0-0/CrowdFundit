import axios from 'axios';
import api, { setAuthToken } from '../../utils/api';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn()
      },
      response: {
        use: jest.fn()
      }
    },
    defaults: {}
  }))
}));

describe('API Utility', () => {
  const originalLocation = window.location;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window.location using defineProperty
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { 
        pathname: '/dashboard',
        href: 'http://localhost/' 
      },
      writable: true
    });
  });
  
  afterEach(() => {
    // Restore original location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
      writable: true
    });
  });

  test('adds auth token to request headers when available', () => {
    // Set the token using the exported function
    setAuthToken('test-token');
    
    // Get the request interceptor function
    const interceptor = (axios.create as jest.Mock).mock.results[0].value.interceptors.request.use.mock.calls[0][0];
    
    // Test the interceptor with a mock config
    const mockConfig = { headers: {} };
    const result = interceptor(mockConfig);
    
    // Expect token to be added to headers
    expect(result.headers.Authorization).toBe('Bearer test-token');
  });

  test('does not add auth token to request headers when not available', () => {
    // Clear the token
    setAuthToken(null);
    
    // Get the request interceptor function
    const interceptor = (axios.create as jest.Mock).mock.results[0].value.interceptors.request.use.mock.calls[0][0];
    
    // Test the interceptor with a mock config
    const mockConfig = { headers: {} };
    const result = interceptor(mockConfig);
    
    // Expect no token in headers
    expect(result.headers.Authorization).toBeUndefined();
  });

  test('handles 401 error and redirects to login', () => {
    // Get the response error interceptor function
    const interceptor = (axios.create as jest.Mock).mock.results[0].value.interceptors.response.use.mock.calls[0][1];
    
    // Mock error response with 401 status
    const error = {
      response: {
        status: 401
      }
    };
    
    // Call the interceptor with the error
    try {
      interceptor(error);
    } catch (e) {
      // Expected to throw
    }
    
    // Should redirect to login
    expect(window.location.href).toBe('/login');
  });

  test('does not redirect if already on login page', () => {
    // Set pathname to login
    window.location.pathname = '/login';
    
    // Get the response error interceptor function
    const interceptor = (axios.create as jest.Mock).mock.results[0].value.interceptors.response.use.mock.calls[0][1];
    
    // Mock error response with 401 status
    const error = {
      response: {
        status: 401
      }
    };
    
    // Call the interceptor with the error
    try {
      interceptor(error);
    } catch (e) {
      // Expected to throw
    }
    
    // Location should not change
    expect(window.location.href).not.toBe('/login');
  });

  test('passes through other errors', () => {
    // Get the response error interceptor function
    const interceptor = (axios.create as jest.Mock).mock.results[0].value.interceptors.response.use.mock.calls[0][1];
    
    // Mock error response with 500 status
    const error = {
      response: {
        status: 500
      }
    };
    
    // Call the interceptor with the error
    try {
      interceptor(error);
    } catch (e) {
      // Expected to throw
    }
    
    // Should not redirect
    expect(window.location.href).toBe('http://localhost/');
  });
}); 