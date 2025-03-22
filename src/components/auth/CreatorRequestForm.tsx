import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface CreatorRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreatorRequestForm: React.FC<CreatorRequestFormProps> = ({ onSuccess, onCancel }) => {
  const { user, updateUserRole } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    reason: '',
    agreedToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting creator request form');
    
    if (!formData.reason) {
      console.log('Missing reason');
      setError('Please provide a reason for becoming a creator');
      return;
    }
    
    if (!formData.agreedToTerms) {
      console.log('Terms not agreed to');
      setError('You must agree to the terms and conditions');
      return;
    }
    
    try {
      console.log('Form validation passed, processing submission');
      setIsSubmitting(true);
      setError(null);
      
      // Update user role to include Creator
      console.log('Calling updateUserRole with role "Creator"');
      await updateUserRole('Creator');
      
      console.log('Successfully became a creator');
      
      // Call the success callback or navigate to create project page
      if (onSuccess) {
        console.log('Calling onSuccess callback');
        onSuccess();
      } else {
        console.log('No onSuccess callback, navigating to create project');
        navigate('/create-project');
      }
    } catch (err: any) {
      console.error('Error becoming a creator:', err);
      setError(err.message || 'Failed to become a creator. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Become a Creator</h2>
      <p className="mb-4 text-gray-600">
        To create and manage projects on CrowdfundIt, you need a Creator account.
        Tell us a bit about what you'd like to create.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Why do you want to become a creator? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.reason}
            onChange={handleChange}
            required
            placeholder="Tell us about your project ideas..."
          />
        </div>
        
        <div className="flex items-start">
          <input
            id="agreedToTerms"
            name="agreedToTerms"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="/terms" className="text-primary-600 hover:text-primary-800">Creator Terms</a> and understand that
            I am responsible for fulfilling any promises made to my backers.
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Become a Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatorRequestForm; 