import React from "react";
import { Link } from "react-router-dom";

export default function FeaturesPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="max-w-4xl w-full mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
        <p className="text-lg text-violet-200 mb-8">Discover what makes Medkit.AI your all-in-one health companion.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl w-full mx-auto">
        {/* WhatsApp Chatbot */}
        <div className="bg-white/5 rounded-2xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-violet-300">WhatsApp Chatbot</h2>
          <p className="text-gray-200 mb-4">Chat with Medkit.AI 24/7 on WhatsApp for instant health insights, answers, and support—anytime, anywhere.</p>
          <a href="https://wa.me/14155238886?text=join%20three-fort" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-violet-700 to-violet-900 shadow-md hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="16" fill="#25D366"/>
              <path d="M16 7C11.03 7 7 11.03 7 16C7 17.85 7.64 19.55 8.73 20.91L7 25L11.18 23.32C12.47 24.09 14.16 24.5 16 24.5C20.97 24.5 25 20.47 25 16.5C25 11.53 20.97 7.5 16 7.5V7ZM16 22.5C14.44 22.5 12.97 22.09 11.77 21.36L11.5 21.21L9.5 22L10.29 20.01L10.14 19.74C9.41 18.54 9 17.07 9 15.5C9 11.91 12.14 8.5 16 8.5C19.86 8.5 23 11.91 23 15.5C23 19.09 19.86 22.5 16 22.5Z" fill="white"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
        {/* Prescription Reader */}
        <div className="bg-white/5 rounded-2xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-violet-300">Prescription Reader</h2>
          <p className="text-gray-200 mb-4">Upload your doctor’s prescription and let Medkit.AI instantly read, interpret, and clarify your medication details.</p>
          <Link to="/prescription-reader" className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-violet-700 to-violet-900 shadow-md hover:scale-105 transition-transform">
            Go to Prescription Reader
          </Link>
        </div>
        {/* AI Health Assistant */}
        <div className="bg-gradient-to-br from-violet-900/80 to-purple-900/80 rounded-2xl p-8 shadow-xl border border-violet-700/40">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-violet-600/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">AI Health Assistant</h3>
              <p className="text-violet-200">Your personal AI health companion available 24/7</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">Get instant answers to health questions, understand medical terms, and receive personalized health guidance powered by advanced AI.</p>
          <Link to="/ai-assistant" className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-violet-700 to-violet-900 shadow-md hover:scale-105 transition-transform">
            Try AI Assistant
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 