import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Terms of Service
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              Last updated: January 1, 2023
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="prose prose-lg prose-primary mx-auto">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you and CrowdfundIt, concerning your access to and use of our website and services. You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service.
            </p>
            <p>
              IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>
            
            <h2>Account Registration</h2>
            <p>
              In order to use certain features of the Site, you must register for an account. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>
            
            <h2>User Representations</h2>
            <p>
              By using the Site, you represent and warrant that:
            </p>
            <ol>
              <li>You have the legal capacity to enter into these Terms of Service;</li>
              <li>You are not under the age of 13;</li>
              <li>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site;</li>
              <li>You will not access the Site through automated or non-human means;</li>
              <li>You will not use the Site for any illegal or unauthorized purpose;</li>
              <li>Your use of the Site will not violate any applicable law or regulation.</li>
            </ol>
            
            <h2>Creator Terms</h2>
            <p>
              If you create a funding campaign on the Site, you agree to the following:
            </p>
            <ol>
              <li>You will provide accurate and truthful information about yourself and your project;</li>
              <li>You have the legal right and ability to complete your project and fulfill any promised rewards;</li>
              <li>You will use the funds raised solely for the purpose of completing the project as described;</li>
              <li>You will comply with all applicable laws and regulations in your jurisdiction, including tax laws;</li>
              <li>You will respond promptly to backers' questions and concerns;</li>
              <li>You understand that we do not guarantee that your funding goal will be met;</li>
              <li>You are solely responsible for fulfilling the promises made in your project. If you are unable to satisfy the terms of this agreement, you may be subject to legal action by backers.</li>
            </ol>
            
            <h2>Backer Terms</h2>
            <p>
              If you pledge to a funding campaign on the Site, you agree to the following:
            </p>
            <ol>
              <li>You understand that you are supporting a project in development and not making a direct purchase;</li>
              <li>You understand that there may be changes or delays in the project, and the final product may differ from what was initially presented;</li>
              <li>You acknowledge that there is a risk that a project you back might not be completed;</li>
              <li>You will provide accurate payment information and authorize us to charge your payment method for the amount of your pledge;</li>
              <li>You understand that crowdfunding campaigns may offer rewards, but the delivery timeline is an estimate and not a guarantee.</li>
            </ol>
            
            <h2>Fees and Payments</h2>
            <p>
              We charge fees for hosting campaigns on our platform. These fees are clearly displayed during the project creation process. For projects that reach their funding goal, we collect a platform fee of 5% of the total funds raised, as well as payment processing fees that typically range from 3-5%.
            </p>
            <p>
              All payments are processed securely through our payment processors. Once a project has been successfully funded, funds (minus our fees) will be disbursed to the creator in accordance with our payment schedule.
            </p>
            
            <h2>Prohibited Activities</h2>
            <p>
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p>
              Prohibited activities include, but are not limited to:
            </p>
            <ul>
              <li>Creating a false identity or impersonating any person or entity;</li>
              <li>Violating the intellectual property rights of others;</li>
              <li>Engaging in unauthorized framing or linking to the Site;</li>
              <li>Interfering with, disrupting, or creating an undue burden on the Site;</li>
              <li>Harassing, annoying, intimidating, or threatening any of our employees or agents;</li>
              <li>Attempting to bypass any measures of the Site designed to prevent or restrict access to the Site;</li>
              <li>Using the Site to advertise or offer to sell goods and services.</li>
            </ul>
            
            <h2>Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            <p>
              By posting content on the Site, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such content on and through the Site. You retain any and all of your rights to any content you submit, post, or display on or through the Site.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            
            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your use of the Site; (2) breach of these Terms of Service; (3) any breach of your representations and warranties set forth in these Terms of Service; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Site with whom you connected via the Site.
            </p>
            
            <h2>Term and Termination</h2>
            <p>
              These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE, TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              CrowdfundIt<br />
              123 Main Street<br />
              San Francisco, CA 94105<br />
              United States<br />
              Email: terms@crowdfundit.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage; 