import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../utils/api';

interface Project {
  _id: string;
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  goalAmount: number;
  currentAmount: number;
  daysLeft: number;
  creatorId: {
    name: string;
    profilePic: string;
  };
  category: string;
  percentFunded: number;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0
  });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [orderDirection, setOrderDirection] = useState<string>('desc');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        
        if (searchTerm) queryParams.append('search', searchTerm);
        if (selectedCategory) queryParams.append('category', selectedCategory);
        queryParams.append('sortBy', sortBy);
        queryParams.append('order', orderDirection);
        queryParams.append('page', pagination.page.toString());
        queryParams.append('limit', pagination.limit.toString());
        
        const response = await api.get(`/api/projects?${queryParams.toString()}`);
        setProjects(response.data.projects);
        setPagination(response.data.pagination);
        
        // Extract unique categories from the API data if it's the first load
        if (categories.length === 0) {
          const uniqueCategories = Array.from(
            new Set(response.data.projects.map((project: Project) => project.category))
          ) as string[];
          setCategories(uniqueCategories);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchTerm, selectedCategory, sortBy, orderDirection, pagination.page, pagination.limit]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will trigger via the useEffect dependency
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({...pagination, page: newPage});
      window.scrollTo(0, 0);
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Discover Projects
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Find innovative projects from creators around the world.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
            <form onSubmit={handleSearch} className="flex-grow max-w-md">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary-600 text-white rounded-r-md"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4">
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={`${sortBy}-${orderDirection}`}
                  onChange={(e) => {
                    const [newSortBy, newOrder] = e.target.value.split('-');
                    setSortBy(newSortBy);
                    setOrderDirection(newOrder);
                  }}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="currentAmount-desc">Most Funded</option>
                  <option value="goalAmount-desc">Highest Goal</option>
                  <option value="daysLeft-asc">Ending Soon</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={project.image}
                      alt={project.title}
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary-600">
                        {project.category}
                      </p>
                      <Link to={`/projects/${project._id}`} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{project.title}</p>
                        <p className="mt-3 text-base text-gray-500">{project.shortDesc}</p>
                      </Link>
                      <div className="mt-4">
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                                {project.percentFunded}% Funded
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-primary-600">
                                ${project.currentAmount.toLocaleString()} of ${project.goalAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                            <div
                              style={{ width: `${project.percentFunded}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500">
                          <p>By {project.creatorId.name}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-primary-600">
                        {project.daysLeft} days left
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-10">
              <nav className="flex justify-center">
                <ul className="flex items-center">
                  <li>
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handlePageChange(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          pagination.page === i + 1 ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.page === pagination.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage; 