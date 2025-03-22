import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import api from '../utils/api';
import Layout from '../components/layout/Layout';

interface ProjectFormData {
  title: string;
  shortDesc: string;
  description: string;
  category: string;
  goalAmount: string;
  deadline: string;
  image: File | null;
}

// Map client category names to server category enum values
const categoryMapping: Record<string, string> = {
  'Technology': 'Tech',
  'Art': 'Art',
  'Design': 'Other',
  'Film & Video': 'Film',
  'Music': 'Music',
  'Publishing': 'Publishing',
  'Games': 'Games',
  'Food': 'Food',
  'Fashion': 'Other',
  'Charity': 'Charity',
  'Other': 'Other'
};

const CreateProjectPage: React.FC = () => {
  const { user, token } = useAuth();
  const { isSignedIn, isLoaded } = useClerkAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    shortDesc: '',
    description: '',
    category: '',
    goalAmount: '',
    deadline: '',
    image: null,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      console.log('Not signed in, redirecting to login');
      navigate('/login', { state: { from: '/create-project' } });
      return;
    }
    
    // Redirect to become-creator page if user doesn't have creator role
    if (isLoaded && isSignedIn && user) {
      console.log('User loaded, checking roles:', user.role);
      if (!user.role.includes('Creator')) {
        console.log('User is not a creator, redirecting to become-creator');
        navigate('/become-creator', { state: { from: '/create-project' } });
        return;
      } else {
        console.log('User is a creator, showing project form');
      }
    }

    // Set deadline to 30 days from now by default
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    setFormData(prev => ({
      ...prev,
      deadline: thirtyDaysFromNow.toISOString().split('T')[0]
    }));
  }, [isSignedIn, isLoaded, navigate, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Double-check if user has creator role
    if (!user || !user.role.includes('Creator')) {
      navigate('/become-creator', { state: { from: '/create-project' } });
      return;
    }
    
    // Validate form
    if (!formData.title || !formData.shortDesc || !formData.description || !formData.category || !formData.goalAmount || !formData.deadline) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      console.log('Creating project with form data:', formData);
      setIsSubmitting(true);
      setError(null);
      
      // Create form data for file upload
      const projectFormData = new FormData();
      projectFormData.append('title', formData.title);
      projectFormData.append('shortDesc', formData.shortDesc);
      projectFormData.append('description', formData.description);
      
      // Map client category to server category enum
      const serverCategory = categoryMapping[formData.category] || 'Other';
      projectFormData.append('category', serverCategory);
      
      projectFormData.append('goalAmount', formData.goalAmount);
      projectFormData.append('deadline', new Date(formData.deadline).toISOString());
      
      if (formData.image) {
        projectFormData.append('image', formData.image);
      }
      
      console.log('Sending request to create project...');
      
      // Make sure we're using the right API endpoint based on authentication method
      const apiPath = token ? '/projects' : '/projects/clerk';
      
      const response = await api.post(apiPath, projectFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project created successfully:', response.data);
      
      navigate(`/projects/${response.data.project._id}`);
    } catch (err: any) {
      console.error('Error creating project:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create project';
      console.error('Error details:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Technology',
    'Art',
    'Design',
    'Film & Video',
    'Music',
    'Publishing',
    'Games',
    'Food',
    'Fashion',
    'Charity',
    'Other'
  ];

  return (
    <Layout>
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Create a Project</h1>
            <p className="mt-2 text-lg text-gray-600">
              Share your creative project and start collecting funds!
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="form-label">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="shortDesc" className="form-label">
                Short Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="shortDesc"
                name="shortDesc"
                maxLength={200}
                className="form-input"
                value={formData.shortDesc}
                onChange={handleChange}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                A brief summary of your project (max 200 characters)
              </p>
            </div>

            <div>
              <label htmlFor="description" className="form-label">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                className="form-input"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Describe your project, its goals, and how you plan to use the funds.
              </p>
            </div>

            <div>
              <label htmlFor="category" className="form-label">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="goalAmount" className="form-label">
                Funding Goal ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="goalAmount"
                name="goalAmount"
                min="1"
                step="1"
                className="form-input"
                value={formData.goalAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="deadline" className="form-label">
                Campaign End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="form-input"
                value={formData.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Your campaign will end at midnight on this date
              </p>
            </div>

            <div>
              <label htmlFor="image" className="form-label">
                Project Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="form-input"
                onChange={handleImageChange}
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload a project image (recommended size: 1200x675px)
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default CreateProjectPage; 