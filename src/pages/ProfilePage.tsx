import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account details and preferences
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <UserProfile 
                appearance={{
                  elements: {
                    rootBox: "mx-auto w-full max-w-3xl",
                    card: "shadow-none p-0",
                    navbar: "hidden",
                    pageScrollBox: "p-0",
                    formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage; 