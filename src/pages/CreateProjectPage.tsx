import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import api from '../utils/api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  fundingGoal: string;
  duration: string;
  image: File | null;
}

const CreateProjectPage: React.FC = () => {
  const { user } = useAuth();
  const { isSignedIn, isLoaded } = useClerkAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    fundingGoal: '',
    duration: '30',
    image: null,
  });

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login', { state: { from: '/create-project' } });
    }
    
    // Check if user has creator role
    if (user && !user.role.includes('Creator')) {
      setError('You need a Creator account to create projects');
    }
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
    
    if (!user || !user.role.includes('Creator')) {
      setError('You need a Creator account to create projects');
      return;
    }
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.fundingGoal) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create form data for file upload
      const projectFormData = new FormData();
      projectFormData.append('title', formData.title);
      projectFormData.append('description', formData.description);
      projectFormData.append('category', formData.category);
      projectFormData.append('fundingGoal', formData.fundingGoal);
      projectFormData.append('duration', formData.duration);
      
      if (formData.image) {
        projectFormData.append('image', formData.image);
      }
      
      const response = await api.post('/projects', projectFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate(`/projects/${response.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create project');
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
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
              <label htmlFor="description" className="form-label">
                Description <span className="text-red-500">*</span>
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
              <label htmlFor="fundingGoal" className="form-label">
                Funding Goal ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="fundingGoal"
                name="fundingGoal"
                min="1"
                step="1"
                className="form-input"
                value={formData.fundingGoal}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="form-label">
                Campaign Duration (days)
              </label>
              <select
                id="duration"
                name="duration"
                className="form-input"
                value={formData.duration}
                onChange={handleChange}
              >
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="45">45 days</option>
                <option value="60">60 days</option>
              </select>
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
      <Footer />
    </div>
  );
};

export default CreateProjectPage; 