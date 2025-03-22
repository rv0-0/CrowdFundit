import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: 'Sarah has over 15 years of experience in tech and finance. Prior to CrowdfundIt, she was a VP at a major investment bank.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: 'Michael is a full-stack developer with a passion for building scalable applications. He previously worked at several successful startups.',
    },
    {
      name: 'Aisha Patel',
      role: 'COO',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: 'Aisha oversees our day-to-day operations. She brings 10 years of experience in product management and operations.',
    },
    {
      name: 'David Rodriguez',
      role: 'Head of Community',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: 'David manages our creator and backer communities. He\'s passionate about helping projects succeed and building strong relationships.',
    },
    {
      name: 'Emma Wilson',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: 'Emma leads our marketing efforts, bringing experience from both startups and major brands. She specializes in digital marketing and brand strategy.',
    },
    {
      name: 'James Kim',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: 'James oversees all aspects of design at CrowdfundIt, from user experience to brand identity. He has over 8 years of experience in product design.',
    },
  ];

  const stats = [
    { label: 'Founded', value: '2020' },
    { label: 'Projects Funded', value: '10,000+' },
    { label: 'Total Raised', value: '$125M+' },
    { label: 'Success Rate', value: '68%' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              About CrowdfundIt
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              Empowering creators and supporting innovation through the power of community funding.
            </p>
          </div>
        </div>

        {/* Mission section */}
        <div className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  We founded CrowdfundIt with a simple but powerful idea: to create a platform that connects innovative creators with the communities who believe in them. Our mission is to help bring creative projects to life while building a more equitable funding ecosystem.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  We believe that great ideas can come from anyone, anywhere. By removing traditional barriers to funding, we're democratizing the way projects get off the ground and helping creators maintain creative control.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Every day, we're inspired by the thousands of projects that launch on our platform and the communities that form around them. From tech innovations to artistic endeavors, educational initiatives to social enterprises, we're proud to be a launchpad for ideas that might otherwise never see the light of day.
                </p>
              </div>
              <div className="mt-12 lg:mt-0">
                <div className="pl-4 -mb-4 space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Empower Creators</h3>
                      <p className="mt-2 text-base text-gray-500">
                        We provide the tools, resources, and platform for creators to bring their ideas to life and connect with supportive communities.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Build Communities</h3>
                      <p className="mt-2 text-base text-gray-500">
                        We foster connections between creators and backers, creating vibrant communities around shared interests and passions.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Support Innovation</h3>
                      <p className="mt-2 text-base text-gray-500">
                        We champion new ideas and innovative projects that push boundaries and make positive impacts in their fields and communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-gray-50 pt-12 sm:pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Impact
              </h2>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                Since our founding, we've helped thousands of creators bring their projects to life.
              </p>
            </div>
          </div>
          <div className="mt-10 pb-12 bg-white sm:pb-16">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                    {stats.map((stat, index) => (
                      <div 
                        key={stat.label} 
                        className={`flex flex-col p-6 text-center ${
                          index === 0 
                            ? 'border-b border-gray-100 sm:border-0 sm:border-r' 
                            : index === stats.length - 1 
                            ? '' 
                            : 'border-b border-gray-100 sm:border-0 sm:border-r'
                        }`}
                      >
                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                          {stat.label}
                        </dt>
                        <dd className="order-1 text-5xl font-extrabold text-primary-600">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet Our Team</h2>
                <p className="text-xl text-gray-500">
                  Our diverse team is passionate about empowering creators and building a more equitable funding ecosystem.
                </p>
              </div>
              <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
                {teamMembers.map((member) => (
                  <li key={member.name}>
                    <div className="space-y-6">
                      <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover" src={member.image} alt={member.name} />
                      <div className="space-y-2">
                        <div className="text-lg leading-6 font-medium space-y-1">
                          <h3>{member.name}</h3>
                          <p className="text-primary-600">{member.role}</p>
                        </div>
                        <p className="text-gray-500">{member.bio}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
                >
                  Sign up
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

export default AboutPage; 