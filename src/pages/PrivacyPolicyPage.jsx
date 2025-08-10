import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-lg text-gray-200">
          <p>Welcome to <b>Medkit.AI</b>. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your information.</p>

          <h2>1. <b>What We Collect</b></h2>
          <ul>
            <li>Profile information (age, gender, location, profession, medical history)</li>
            <li>Chat logs and messages</li>
            <li>Uploaded prescription images (for OCR)</li>
            <li>Usage data (how you interact with our services)</li>
          </ul>

          <h2>2. <b>How We Use Your Data</b></h2>
          <ul>
            <li>To personalize your experience and provide relevant health information</li>
            <li>To improve our AI and service performance</li>
            <li>To communicate with you about updates or support</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. <b>Your Rights</b></h2>
          <ul>
            <li>You can request access to or deletion of your data at any time</li>
            <li>You can opt out of non-essential communications</li>
            <li>Your data is never sold to third parties</li>
          </ul>

          <h2>4. <b>Data Security</b></h2>
          <p>We use industry-standard security measures to protect your information. However, no system is 100% secure, so please use our services responsibly.</p>

          <h2>5. <b>Contact Us</b></h2>
          <p>If you have questions or concerns about your privacy, contact us at <a href="mailto:beshwarg6@gmail.com" className="text-violet-400 underline">beshwarg6@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  );
} 