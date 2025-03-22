import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Start with an idea',
      description: 'Every successful project begins with a great idea. Think about what you\'re passionate about creating and how others might benefit from it.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Create your project',
      description: 'Build your project page with a compelling title, description, and images. Set your funding goal, timeline, and create attractive reward tiers for backers.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Launch and promote',
      description: 'Once your project is live, share it with your network. Use social media, email, and other channels to spread the word and attract backers to your campaign.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Get funded',
      description: 'If your project reaches its funding goal by the deadline, the pledged funds will be transferred to you minus our platform fees.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Bring your project to life',
      description: 'Use the funds to complete your project. Keep your backers updated on your progress along the way.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Deliver rewards',
      description: 'Send out promised rewards to your backers. This is your chance to delight your supporters and build a lasting community around your project.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: 'Is CrowdfundIt all-or-nothing funding?',
      answer: 'Yes, CrowdfundIt uses an all-or-nothing funding model. This means if your project doesn\'t reach its funding goal, no one is charged and you don\'t receive any funds. This reduces risk for both creators and backers.'
    },
    {
      question: 'What fees does CrowdfundIt charge?',
      answer: 'If your project is successfully funded, we collect a 5% fee from the total funds raised. There are also payment processing fees (typically 3-5%) depending on payment method and location.'
    },
    {
      question: 'Can anyone start a crowdfunding project?',
      answer: 'To create a project, you need to be at least 18 years old, have a valid government-issued ID, a bank account, and a debit or credit card. You also need to meet our eligibility requirements outlined in our terms of service.'
    },
    {
      question: 'How long can my crowdfunding campaign run?',
      answer: 'Projects can run for anywhere from 1 to 60 days. However, our data shows that 30 days is the optimal project length. Campaigns with shorter durations often create a helpful sense of urgency among potential backers.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              How CrowdfundIt Works
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              Your guide to bringing creative projects to life through community funding
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                The Crowdfunding Process
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Our platform makes it easy to fund your creative projects with the support of a community that believes in your ideas.
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {steps.slice(0, 3).map((step) => (
                  <div key={step.id} className="text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100">
                      {step.icon}
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">
                      <span className="text-primary-600 mr-2">{step.id}.</span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
                {steps.slice(3).map((step) => (
                  <div key={step.id} className="text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100">
                      {step.icon}
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">
                      <span className="text-primary-600 mr-2">{step.id}.</span>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div className="bg-gray-50 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Why Choose CrowdfundIt?
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  CrowdfundIt offers a unique platform for creators to connect with backers who are passionate about bringing new ideas to life.
                </p>

                <div className="mt-8 space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Global Reach</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Connect with backers from around the world who are interested in supporting innovative projects like yours.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Community Building</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Build a community around your project that can provide feedback, support, and word-of-mouth promotion.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Risk Reduction</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Test demand for your idea before fully committing resources. If there's no interest, you won't lose money on production.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 lg:mt-0">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-8">
                      {faqs.map((faq, index) => (
                        <div key={index}>
                          <h4 className="text-base font-medium text-gray-900">{faq.question}</h4>
                          <p className="mt-2 text-sm text-gray-500">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/faq"
                        className="text-base font-medium text-primary-600 hover:text-primary-500"
                      >
                        View all FAQs <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-primary-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to bring your idea to life?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-200">
              Join thousands of creators who have successfully funded their projects through CrowdfundIt.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/create-project"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
                >
                  Start a Project
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage; 