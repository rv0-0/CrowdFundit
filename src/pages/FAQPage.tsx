import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'How does CrowdfundIt work?',
      answer: 'CrowdfundIt allows creators to share their projects and collect funding from backers who believe in their ideas. Creators set a funding goal and deadline, and backers pledge money to support the project. If the project reaches its funding goal, the creator receives the funds to bring their project to life.'
    },
    {
      question: 'What types of projects can be funded on CrowdfundIt?',
      answer: 'We support a wide range of creative projects, including technology, art, design, film, music, publishing, games, food, and fashion. Projects should have a clear goal, a plan for completion, and something to share with backers.'
    },
    {
      question: 'How do I start a project?',
      answer: 'To start a project, you\'ll need to create a Creator account and then click "Start a Project." You\'ll be guided through the process of setting up your project page, defining your funding goal, deadline, and rewards for backers.'
    },
    {
      question: 'What happens if a project doesn\'t reach its funding goal?',
      answer: 'If a project doesn\'t reach its funding goal by the deadline, no backers are charged and no funds are collected. This is our all-or-nothing funding model, which reduces risk for both creators and backers.'
    },
    {
      question: 'What are the fees for using CrowdfundIt?',
      answer: 'If a project is successfully funded, we collect a 5% fee from the collected funds. There are also payment processing fees that typically range from 3-5% depending on the payment method and location.'
    },
    {
      question: 'How do backers get rewards?',
      answer: 'After a project is successfully funded, creators use the funds to complete their project and fulfill the promised rewards. Creators are responsible for communicating with backers and delivering rewards as described in their project.'
    },
    {
      question: 'Is backing a project the same as pre-ordering?',
      answer: 'No, backing a project is different from buying a product in a store. You\'re supporting a creator in bringing something new to life, which comes with risks and challenges. Creators are expected to be transparent about their progress and challenges along the way.'
    },
    {
      question: 'What if I have more questions?',
      answer: 'If you have any other questions, please feel free to contact our support team through the Contact Us page. We\'re here to help!'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              Find answers to common questions about using CrowdfundIt.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="pt-6">
                  <dt className="text-lg">
                    <h3 className="text-xl font-medium text-gray-900">
                      {faq.question}
                    </h3>
                  </dt>
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500">
                      {faq.answer}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage; 