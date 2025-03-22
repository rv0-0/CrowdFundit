import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

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
    _id: string;
    name: string;
    profilePic: string;
  };
  category: string;
  percentFunded: number;
  updates: Update[];
  createdAt: string;
}

interface Reward {
  _id: string;
  title: string;
  description: string;
  amount: number;
  estimatedDelivery: string;
  limitedQuantity: number | null;
  quantityClaimed: number;
  projectId: string;
  isSoldOut: boolean;
}

interface Update {
  text: string;
  date: string;
}

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        if (!id) {
          setError('Project ID is required');
          setLoading(false);
          return;
        }
        
        const response = await api.get(`/api/projects/${id}`);
        setProject(response.data.project);
        setRewards(response.data.rewards || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Failed to load project details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle reward selection
  const handleRewardSelect = (rewardId: string, amount: number) => {
    setSelectedReward(rewardId);
    setDonationAmount(amount);
    setCustomAmount('');
  };

  // Handle custom donation
  const handleCustomDonation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setDonationAmount(Number(value) || 0);
    setSelectedReward(null);
  };

  // Handle donation submission
  const handleDonate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login', { state: { from: `/projects/${id}` } });
      return;
    }
    
    if (donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    try {
      // In a real implementation, we would make an API call to process the donation
      const response = await api.post('/api/donations', {
        projectId: id,
        amount: donationAmount,
        rewardId: selectedReward
      });
      
      alert(`Thank you for your donation of $${donationAmount}!`);
      
      // Reload project data to show updated funding amount
      const updatedProject = await api.get(`/api/projects/${id}`);
      setProject(updatedProject.data.project);
      
    } catch (err) {
      console.error('Error processing donation:', err);
      alert('Failed to process donation. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="text-center text-red-500 py-20">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error || 'Project not found'}</p>
          <Link to="/projects" className="mt-4 inline-block text-primary-600 hover:text-primary-800">
            Return to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Left column - Project Image */}
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-center object-cover"
              />
            </div>

            {/* Right column - Project Info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {project.category}
                </span>
                <Link to="/projects" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Back to Projects
                </Link>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{project.title}</h1>
              <p className="mt-2 text-lg text-gray-500">{project.shortDesc}</p>
              
              {/* Funding Progress */}
              <div className="mt-6">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-2xl font-bold text-gray-900">${project.currentAmount.toLocaleString()}</h2>
                  <p className="text-sm text-gray-500">of ${project.goalAmount.toLocaleString()} goal</p>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                    <div
                      style={{ width: `${project.percentFunded}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
                    ></div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{project.daysLeft}</p>
                    <p className="text-sm text-gray-500">days left</p>
                  </div>
                </div>
              </div>

              {/* Creator Info */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900">By {project.creatorId.name}</h3>
              </div>

              {/* Back Project Button */}
              <div className="mt-6">
                <a
                  href="#back-this-project"
                  className="w-full bg-primary-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back this project
                </a>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Left Column - Project Description */}
            <div className="lg:col-span-8">
              <div className="prose prose-indigo max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this project</h2>
                {project.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Project Updates */}
              {project.updates && project.updates.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates</h2>
                  {project.updates.map((update, index) => (
                    <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                          <p>{formatDate(update.date)}</p>
                        </div>
                        <div className="mt-3 text-gray-700">
                          <p>{update.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right column - Rewards and Donation */}
            <div className="mt-12 lg:mt-0 lg:col-span-4" id="back-this-project">
              <h2 className="text-lg font-medium text-gray-900">Back this project</h2>
              <form onSubmit={handleDonate} className="mt-6">
                {/* Custom Donation */}
                <div className="mb-6">
                  <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700">
                    Custom Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="customAmount"
                      id="customAmount"
                      className={`block w-full pl-7 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                        selectedReward ? 'bg-gray-100' : ''
                      }`}
                      placeholder="0.00"
                      aria-describedby="price-currency"
                      value={customAmount}
                      onChange={handleCustomDonation}
                      disabled={!!selectedReward}
                      min="1"
                      step="1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm" id="price-currency">
                        USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                {rewards.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Select a reward</h3>
                    <div className="space-y-4">
                      {rewards.map((reward) => (
                        <div
                          key={reward._id}
                          className={`border rounded-lg p-4 transition ${
                            selectedReward === reward._id
                              ? 'border-primary-500 ring-2 ring-primary-500'
                              : 'border-gray-300 hover:border-primary-300'
                          } ${reward.isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => !reward.isSoldOut && handleRewardSelect(reward._id, reward.amount)}
                        >
                          <div className="flex justify-between">
                            <h4 className="text-lg font-bold">{reward.title}</h4>
                            <p className="text-lg font-bold">${reward.amount}</p>
                          </div>
                          <p className="mt-2 text-gray-600">{reward.description}</p>
                          <div className="mt-3 flex justify-between text-sm">
                            <p>Estimated delivery: {reward.estimatedDelivery}</p>
                            {reward.limitedQuantity !== null && (
                              <p className={reward.isSoldOut ? 'text-red-500' : 'text-gray-500'}>
                                {reward.isSoldOut
                                  ? 'Sold Out'
                                  : `${reward.limitedQuantity - reward.quantityClaimed} left`}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Donation Total & Submit Button */}
                <div className="mt-8">
                  {donationAmount > 0 && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <p className="text-gray-700">Total amount:</p>
                        <p className="font-bold">${donationAmount}</p>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={donationAmount <= 0}
                    className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      donationAmount <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Continue
                  </button>
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    By continuing, you agree to our terms and conditions.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailPage; 