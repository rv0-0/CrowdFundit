import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

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
  featured: boolean;
}

const BlogPage: React.FC = () => {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log('Fetching blog posts from API...');
        setIsLoading(true);
        const response = await api.get<BlogPost[]>('/api/blog');
        console.log('Blog posts fetched successfully:', response.data);
        setBlogPosts(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        // Create dummy data for development
        if (process.env.NODE_ENV === 'development') {
          console.log('Using dummy data in development mode');
          setBlogPosts([
            {
              _id: '1',
              title: 'Crowdfunding 101: How to Launch a Successful Campaign',
              excerpt: 'Learn the essential steps to planning, creating, and promoting a successful crowdfunding campaign.',
              content: '',
              author: 'Sarah Johnson',
              date: '2023-03-15T00:00:00.000Z',
              category: 'Tips & Guides',
              image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
              readTime: 8,
              featured: true
            },
            {
              _id: '2',
              title: 'The Psychology Behind Successful Crowdfunding Campaigns',
              excerpt: 'Understanding what motivates backers and how to create an emotional connection with your audience.',
              content: '',
              author: 'Michael Chen',
              date: '2023-02-27T00:00:00.000Z',
              category: 'Research',
              image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e7c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
              readTime: 12,
              featured: false
            },
            // Add more dummy posts as needed
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-grow">
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              CrowdfundIt Blog
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              Insights, tips, and stories from the world of crowdfunding
            </p>
            {error && (
              <div className="mt-4 text-yellow-300 text-sm">{error}</div>
            )}
            
            {/* Add create post button for admin users */}
            {user && user.role.includes('Admin') && (
              <Link 
                to="/blog/create" 
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Post
              </Link>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <>
              {/* Featured post */}
              <div className="mb-12">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-3">
                      {blogPosts[0].category}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-lg text-white/80 mb-4 max-w-3xl">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center">
                      <div className="text-sm text-white">
                        <span>{new Date(blogPosts[0].date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span className="mx-2">•</span>
                        <span>{blogPosts[0].readTime} min read</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${blogPosts[0]._id}`}
                    className="absolute inset-0 focus:outline-none"
                    aria-label={`Read ${blogPosts[0].title}`}
                  ></Link>
                </div>
              </div>

              {/* Blog post grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.slice(1).map((post) => (
                  <div key={post._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-shrink-0">
                      <img className="h-48 w-full object-cover" src={post.image} alt={post.title} />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-2">
                          {post.category}
                        </span>
                        <Link to={`/blog/${post._id}`} className="block mt-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                            {post.title}
                          </h3>
                          <p className="mt-3 text-base text-gray-500">
                            {post.excerpt}
                          </p>
                        </Link>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                            {post.author.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {post.author}
                          </p>
                          <div className="flex text-sm text-gray-500">
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </time>
                            <span className="mx-1">•</span>
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No blog posts found</h2>
              <p className="text-lg text-gray-600 mb-8">Check back later for new content or try refreshing the page.</p>
            </div>
          )}

          {/* Newsletter subscription */}
          <div className="mt-16 bg-primary-700 rounded-lg shadow-xl overflow-hidden">
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

export default BlogPage; 