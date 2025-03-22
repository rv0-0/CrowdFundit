import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import api from '../utils/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  createdBy: {
    _id: string;
    name: string;
  };
  endDate: string;
  image: string;
  backers: number;
  status: 'active' | 'funded' | 'expired';
}

interface Backing {
  _id: string;
  project: Project;
  amount: number;
  createdAt: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { isSignedIn, isLoaded } = useClerkAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'backed' | 'created' | 'profile'>('backed');
  const [backedProjects, setBackedProjects] = useState<Backing[]>([]);
  const [createdProjects, setCreatedProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (isLoaded && !isSignedIn) {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  }, [isSignedIn, isLoaded, navigate]);

  useEffect(() => {
    // Fetch user's backed and created projects once authenticated
    if (isSignedIn && user) {
      const fetchUserData = async () => {
        setError(null);

        try {
          // Fetch backed projects
          const backingsResponse = await api.get('/users/me/backings');
          setBackedProjects(backingsResponse.data);

          // Fetch created projects if user is a creator
          if (user.role.includes('Creator')) {
            const createdResponse = await api.get('/users/me/projects');
            setCreatedProjects(createdResponse.data);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load your data. Please try again later.');
        }
      };

      fetchUserData();
    }
  }, [isSignedIn, user]);

  // Calculate total amount backed
  const totalBacked = backedProjects.reduce((sum, backing) => sum + backing.amount, 0);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate funding percentage
  const calculateFundingPercentage = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    return Math.min(percentage, 100).toFixed(0);
  };

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {/* Dashboard header */}
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-white sm:text-4xl sm:tracking-tight">
                  Dashboard
                </h1>
                <p className="mt-2 text-lg text-primary-200">
                  Welcome back, {user?.name}
                </p>
              </div>
              {user?.role?.includes('Creator') && (
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button
                    onClick={() => navigate('/create-project')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Create New Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Backed</dt>
                      <dd className="text-2xl font-semibold text-gray-900">${totalBacked.toFixed(2)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Projects Backed</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{backedProjects.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {user?.role?.includes('Creator') && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Created Projects</dt>
                        <dd className="text-2xl font-semibold text-gray-900">{createdProjects.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab navigation */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('backed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'backed'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projects You've Backed
              </button>
              {user?.role?.includes('Creator') && (
                <button
                  onClick={() => setActiveTab('created')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'created'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Your Created Projects
                </button>
              )}
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div>
            {/* Backed projects tab */}
            {activeTab === 'backed' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Projects You've Backed</h2>
                {backedProjects.length === 0 ? (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md py-12 px-4 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">You haven't backed any projects yet.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate('/projects')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Explore Projects
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {backedProjects.map((backing) => (
                        <li key={backing._id}>
                          <div className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                              <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0 h-20 w-20">
                                  <img
                                    className="h-20 w-20 rounded-md object-cover"
                                    src={backing.project.image || 'https://via.placeholder.com/150'}
                                    alt={backing.project.title}
                                  />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-primary-600 truncate">{backing.project.title}</p>
                                    <p className="mt-1 flex items-center text-xs text-gray-500">
                                      by {backing.project.createdBy.name}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{backing.project.description}</p>
                                  </div>
                                  <div className="hidden md:block">
                                    <div>
                                      <p className="text-sm text-gray-900">
                                        Backed on <time dateTime={backing.createdAt}>{formatDate(backing.createdAt)}</time>
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">Amount: ${backing.amount.toFixed(2)}</p>
                                    </div>
                                    <div className="mt-2">
                                      <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                          <div
                                            className="bg-primary-600 h-2.5 rounded-full"
                                            style={{ width: `${calculateFundingPercentage(backing.project.currentFunding, backing.project.fundingGoal)}%` }}
                                          ></div>
                                        </div>
                                        <span className="ml-2 text-xs font-medium text-gray-500">
                                          {calculateFundingPercentage(backing.project.currentFunding, backing.project.fundingGoal)}%
                                        </span>
                                      </div>
                                      <p className="mt-1 text-xs text-gray-500">
                                        ${backing.project.currentFunding.toFixed(2)} raised of ${backing.project.fundingGoal.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <button
                                  onClick={() => navigate(`/projects/${backing.project._id}`)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Created projects tab */}
            {activeTab === 'created' && user?.role?.includes('Creator') && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Created Projects</h2>
                {createdProjects.length === 0 ? (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md py-12 px-4 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">You haven't created any projects yet.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate('/create-project')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Create Your First Project
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {createdProjects.map((project) => (
                        <li key={project._id}>
                          <div className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                              <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0 h-20 w-20">
                                  <img
                                    className="h-20 w-20 rounded-md object-cover"
                                    src={project.image || 'https://via.placeholder.com/150'}
                                    alt={project.title}
                                  />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-primary-600 truncate">{project.title}</p>
                                    <p className="mt-1 flex items-center text-xs text-gray-500">
                                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        project.status === 'active' 
                                          ? 'bg-green-100 text-green-800' 
                                          : project.status === 'funded' 
                                          ? 'bg-blue-100 text-blue-800' 
                                          : 'bg-gray-100 text-gray-800'
                                      }`}>
                                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                      </span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                                  </div>
                                  <div className="hidden md:block">
                                    <div>
                                      <p className="text-sm text-gray-900">
                                        Ending on <time dateTime={project.endDate}>{formatDate(project.endDate)}</time>
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">Backers: {project.backers}</p>
                                    </div>
                                    <div className="mt-2">
                                      <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                          <div
                                            className="bg-primary-600 h-2.5 rounded-full"
                                            style={{ width: `${calculateFundingPercentage(project.currentFunding, project.fundingGoal)}%` }}
                                          ></div>
                                        </div>
                                        <span className="ml-2 text-xs font-medium text-gray-500">
                                          {calculateFundingPercentage(project.currentFunding, project.fundingGoal)}%
                                        </span>
                                      </div>
                                      <p className="mt-1 text-xs text-gray-500">
                                        ${project.currentFunding.toFixed(2)} raised of ${project.fundingGoal.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => navigate(`/projects/${project._id}/manage`)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Manage
                                </button>
                                <button
                                  onClick={() => navigate(`/projects/${project._id}`)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Profile tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex items-center">
                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold">
                      {user?.name.charAt(0)}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{user?.name}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Member since</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">March 2023</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Projects backed</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{backedProjects.length}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Total contributions</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${totalBacked.toFixed(2)}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                    <button
                      onClick={() => navigate('/profile/edit')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage; 