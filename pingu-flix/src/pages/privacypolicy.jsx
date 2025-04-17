import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="bg-[#190B3D] text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us when using PenguFlix, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (name, email, password)</li>
            <li>Profile preferences and viewing history</li>
            <li>Payment information when subscribing</li>
            <li>Communications with our support team</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and improve our streaming services</li>
            <li>Personalize your viewing experience</li>
            <li>Process your payments and subscriptions</li>
            <li>Send important account notifications</li>
            <li>Respond to your inquiries and support requests</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Contact Information</h2>
          <p className="mb-4">
            For any questions about this Privacy Policy, please contact us at:
            <br />
            Email: contact@penguflix.com
            <br />
            Phone: +40 746 959 390
            <br />
            Address: Pengu Street, United States, CA 88832
          </p>

          <p className="mt-8 text-sm text-gray-400">
            Last updated: January 2024
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;