import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CreatorRequestForm from '../components/auth/CreatorRequestForm';
import { useAuth } from '../contexts/AuthContext';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';

const BecomeCreatorPage: React.FC = () => {
  const { user } = useAuth();
  const { isSignedIn, isLoaded } = useClerkAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from || '/create-project';

  console.log('BecomeCreatorPage - User:', user);
  console.log('BecomeCreatorPage - Location state:', location.state);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      console.log('BecomeCreatorPage - Not signed in, redirecting to login');
      navigate('/login', { state: { from: '/become-creator' } });
      return;
    }

    // If user already has creator role, redirect to create project
    if (isLoaded && isSignedIn && user?.role.includes('Creator')) {
      console.log('BecomeCreatorPage - User is already a creator, redirecting to create-project');
      navigate('/create-project');
    }
  }, [isSignedIn, isLoaded, navigate, user]);

  // If still loading or navigating away, show a loading indicator
  if (!isLoaded || !isSignedIn || (user?.role.includes('Creator'))) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">
            <div className="h-12 w-12 bg-primary-100 rounded-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle form success
  const handleSuccess = () => {
    console.log('BecomeCreatorPage - Form success, redirecting to:', returnTo);
    navigate(returnTo);
  };

  // Handle cancel
  const handleCancel = () => {
    console.log('BecomeCreatorPage - Cancelled, navigating to home');
    navigate('/');
  };

  return (
    <Layout>
      <main className="flex-grow bg-gray-50">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Become a Creator</h1>
            <p className="mt-2 text-lg text-gray-600">
              Join our community of creators and start bringing your ideas to life
            </p>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <CreatorRequestForm 
                onSuccess={handleSuccess} 
                onCancel={handleCancel} 
              />
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits of Being a Creator</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Create and launch crowdfunding campaigns</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Access to creator tools and resources</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Connect with a community of backers and supporters</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Receive funding to bring your ideas to life</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BecomeCreatorPage; 