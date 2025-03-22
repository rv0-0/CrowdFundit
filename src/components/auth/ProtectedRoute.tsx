import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useAuth as useAppAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../contexts/AuthContext';

type ProtectedRouteProps = {
  requiredRole?: UserRole;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useAppAuth(); // Still using the app auth context for role info

  // Show loading or redirect to login if not authenticated
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-primary-100 rounded-full"></div>
        </div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check for required role
  if (requiredRole && (!user || !user.role.includes(requiredRole))) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 