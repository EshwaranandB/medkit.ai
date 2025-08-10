import React from "react";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="max-w-4xl w-full mx-auto mb-16">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Empowering Health, <span className="text-violet-400">Empowering You</span>
          </h1>
          <p className="text-lg text-violet-200 mb-6 max-w-2xl mx-auto">
            Medkit.AI is on a mission to make healthcare accessible, understandable, and proactive for everyone. We blend advanced AI with a human touch to help you take charge of your health journey—anytime, anywhere.
          </p>
        </div>
        {/* Our Story */}
        <div className="bg-white/5 rounded-2xl shadow-lg p-8 mb-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-violet-300">Our Story</h2>
            <p className="text-gray-200 mb-2">Medkit.AI was born from a simple idea: everyone deserves instant, reliable health support. our mission is to make medical advice accessible to everyone—even those unfamiliar with AI and LLMs.</p>
            <p className="text-gray-200">We believe that technology should empower, not overwhelm. That's why Medkit.AI is designed to be intuitive, friendly, and accessible through familiar platforms like WhatsApp and SMS—whether you're seeking answers, tracking your wellness, or supporting loved ones.</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-violet-700 to-violet-400 flex items-center justify-center shadow-xl">
              <span className="text-6xl">💡</span>
            </div>
          </div>
        </div>
        {/* Mission & Vision */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6">
            To empower every individual to make informed health decisions, break down barriers to care, and create a world where health knowledge is universal and accessible.
          </p>
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            A future where AI and people work together for better health—where questions are answered instantly, support is always at hand, and everyone feels confident about their well-being.
          </p>
        </div>
        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 shadow flex flex-col items-center">
              <span className="text-2xl mb-2">🤖</span>
              <h3 className="font-bold text-lg mb-1">Innovation</h3>
              <p className="text-gray-200 text-center">We embrace new ideas and technologies to make health support smarter and more accessible.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 shadow flex flex-col items-center">
              <span className="text-2xl mb-2">🫶</span>
              <h3 className="font-bold text-lg mb-1">Compassion</h3>
              <p className="text-gray-200 text-center">We care deeply about our users and strive to support them with empathy and respect.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 shadow flex flex-col items-center">
              <span className="text-2xl mb-2">🔍</span>
              <h3 className="font-bold text-lg mb-1">Transparency</h3>
              <p className="text-gray-200 text-center">We are open, honest, and clear in everything we do. Your trust is our top priority.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 