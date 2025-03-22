import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const SupportPage: React.FC = () => {
  const supportCategories = [
    {
      id: 1,
      title: 'Account Issues',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: 'Help with account access, profile updates, or security concerns',
    },
    {
      id: 2,
      title: 'Project Creation',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: 'Assistance with project setup, guidelines, or submission process',
    },
    {
      id: 3,
      title: 'Payments & Funding',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Questions about payment methods, refunds, or funding issues',
    },
    {
      id: 4,
      title: 'Technical Support',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: 'Help with website issues, bugs, or platform functionality',
    }
  ];

  const faqs = [
    {
      question: 'How quickly will I receive a response to my support request?',
      answer: 'We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please mark your request as "Urgent" when submitting.'
    },
    {
      question: 'What information should I include in my support request?',
      answer: 'For faster resolution, please include your account email, a detailed description of your issue, any error messages you\'ve received, and screenshots if applicable.'
    },
    {
      question: 'Can I get help with my project before launching?',
      answer: 'Yes! We offer pre-launch consultations to help you set up your project for success. Contact our creator support team to schedule a review of your draft.'
    },
    {
      question: 'What if I need help outside of business hours?',
      answer: 'Our knowledge base is available 24/7 with guides and tutorials. For urgent matters, we have limited after-hours support for critical issues such as payment processing or account security concerns.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Support Center
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              We\'re here to help you with any questions or issues you may have
            </p>
          </div>
        </div>

        {/* Support Categories */}
        <div className="bg-white py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-center mb-12">
              How can we help you today?
            </h2>
            
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {supportCategories.map((category) => (
                <div 
                  key={category.id} 
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
                    {category.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{category.title}</h3>
                  <p className="mt-3 text-base text-gray-500">{category.description}</p>
                  <a 
                    href="#contact-form" 
                    className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-500"
                  >
                    Get help <span className="ml-1">&rarr;</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="bg-gray-50 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-center mb-8">
              Contact Support
            </h2>
            
            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                    placeholder="Jane Smith"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Support Category
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  >
                    <option value="">Select a category</option>
                    {supportCategories.map((category) => (
                      <option key={category.id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                    placeholder="Brief description of your issue"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                    placeholder="Detailed description of your issue or question"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="urgent"
                    name="urgent"
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="urgent" className="font-medium text-gray-700">
                    This is an urgent matter
                  </label>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="mt-6 max-w-3xl mx-auto divide-y-2 divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-3 text-base text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link
                to="/faq"
                className="inline-flex items-center text-base font-medium text-primary-600 hover:text-primary-500"
              >
                View all FAQs <span aria-hidden="true" className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-center mb-8">
              Other Ways to Contact Us
            </h2>
            
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Email Support</h3>
                <p className="mt-3 text-sm text-gray-500">
                  For general inquiries, send us an email and we'll get back to you within 24-48 hours.
                </p>
                <a href="mailto:support@crowdfundit.example.com" className="mt-4 inline-block text-primary-600 hover:text-primary-500">
                  support@crowdfundit.example.com
                </a>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Phone Support</h3>
                <p className="mt-3 text-sm text-gray-500">
                  For urgent matters, our phone support is available Monday-Friday, 9am-5pm ET.
                </p>
                <a href="tel:+11234567890" className="mt-4 inline-block text-primary-600 hover:text-primary-500">
                  +1 (123) 456-7890
                </a>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Live Chat</h3>
                <p className="mt-3 text-sm text-gray-500">
                  Get instant help from our support team through our live chat available during business hours.
                </p>
                <button 
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage; 