import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PrivacyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              Last updated: January 1, 2023
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="prose prose-lg prose-primary mx-auto">
            <h2>Introduction</h2>
            <p>
              CrowdfundIt ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
            
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the platform, express interest in obtaining information about us or our products and services, participate in activities on the platform, or otherwise contact us.
            </p>
            <p>
              The personal information we collect may include:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Billing information</li>
              <li>Profile information (biography, profile picture, etc.)</li>
              <li>User-generated content (comments, project descriptions, etc.)</li>
            </ul>
            
            <h3>Information Automatically Collected</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate our platform. This information does not reveal your specific identity but may include:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser and device characteristics</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Device name</li>
              <li>Country</li>
              <li>Information about how and when you use our platform</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect or receive:
            </p>
            <ul>
              <li>To facilitate account creation and login process</li>
              <li>To enable user-to-user communications</li>
              <li>To provide, operate, and maintain our platform</li>
              <li>To improve, personalize, and expand our platform</li>
              <li>To understand and analyze how you use our platform</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To process transactions and send related information</li>
              <li>To respond to user inquiries and offer support</li>
              <li>To send administrative information to you</li>
              <li>To protect our platform and users from fraudulent or illegal activity</li>
            </ul>
            
            <h2>Sharing Your Information</h2>
            <p>
              We may share information in the following situations:
            </p>
            <ul>
              <li><strong>With Service Providers:</strong> We may share your information with service providers to help us provide our services.</li>
              <li><strong>With Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              <li><strong>When You Share Personal Information on the Platform:</strong> Information you share on public areas of the platform will be visible to all users.</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
              <li><strong>For Legal Reasons:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
            
            <h2>Your Privacy Choices</h2>
            <p>
              You can review, change, or terminate your account at any time:
            </p>
            <ul>
              <li><strong>Account Information:</strong> You can update your account information through your account settings page.</li>
              <li><strong>Cookies:</strong> You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent.</li>
              <li><strong>Opting Out of Marketing:</strong> You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in our emails.</li>
              <li><strong>Account Deletion:</strong> You may delete your account by contacting us directly.</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, you may email us at privacy@crowdfundit.com or contact us at:
            </p>
            <p>
              CrowdfundIt<br />
              123 Main Street<br />
              San Francisco, CA 94105<br />
              United States
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage; 