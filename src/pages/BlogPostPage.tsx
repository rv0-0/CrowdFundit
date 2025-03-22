import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../utils/api';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<BlogPost>(`/api/blog/${id}`);
        setBlogPost(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !blogPost) {
    return (
      <Layout>
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Blog post not found'}
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the blog post you're looking for.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-grow">
        {/* Hero section with blog post image */}
        <div className="relative">
          <div className="h-96 w-full">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-3">
                {blogPost.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {blogPost.title}
              </h1>
              <div className="flex items-center text-white mb-2">
                <div className="mr-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold mr-2">
                    {blogPost.author.charAt(0)}
                  </div>
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center text-white/70 text-sm">
                  <time dateTime={blogPost.date}>
                    {new Date(blogPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{blogPost.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog post content */}
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Stay in the loop
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-primary-100">
                  Get notified when we publish new articles, share success stories, and announce new features.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white focus:border-white rounded-md"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="mt-3 w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-3 text-sm text-primary-200">
                  We care about your data. Read our{' '}
                  <Link to="/privacy" className="text-white underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BlogPostPage; 