import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useClerkAuth, useUser, useClerk } from '@clerk/clerk-react';
import { setAuthToken } from '../utils/api';

// Types
export type UserRole = 'Creator' | 'Backer' | 'Admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole[];
  profilePic?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateUserRole: (role: UserRole) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  updateUserRole: async () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const clerk = useClerk();
  
  // Set the auth token for API requests when the session changes
  useEffect(() => {
    const updateToken = async () => {
      if (isSignedIn && clerk.session) {
        try {
          const token = await clerk.session.getToken();
          setAuthToken(token);
        } catch (err) {
          console.error('Failed to get session token:', err);
          setAuthToken(null);
        }
      } else {
        setAuthToken(null);
      }
    };
    
    updateToken();
  }, [isSignedIn, clerk.session]);
  
  // Fetch user data from backend when Clerk user is loaded
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded) return;
      
      if (isSignedIn && clerkUser) {
        setIsLoading(true);
        try {
          // In a real app, this would call your backend API to get user roles
          // For now, we'll simulate a role based on the user's metadata
          
          // This approach assumes you would store user roles in your own backend
          // and fetch them using the Clerk user ID
          
          // Simulated API call response
          const userData: User = {
            id: clerkUser.id,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            // Default role is Backer - this would come from your backend in a real app
            role: clerkUser.publicMetadata?.role 
              ? [clerkUser.publicMetadata.role as UserRole] 
              : ['Backer'],
            profilePic: clerkUser.imageUrl,
          };
          
          setUser(userData);
          setError(null);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user data');
        } finally {
          setIsLoading(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setUser(null);
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [isSignedIn, isLoaded, clerkUser]);
  
  // Function to update user role
  const updateUserRole = async (role: UserRole) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      // In a real app, this would call your backend API to update the user's role
      // For now, we'll just update the local state
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          role: prevUser.role.includes(role) ? prevUser.role : [...prevUser.role, role]
        };
      });
    } catch (err) {
      console.error('Error updating user role:', err);
      throw new Error('Failed to update user role');
    }
  };
  
  // Context value
  const value = {
    user,
    isLoading,
    error,
    updateUserRole,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 