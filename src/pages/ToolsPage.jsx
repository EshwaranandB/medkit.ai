import React from "react";
import { Link } from "react-router-dom";

export default function ToolsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="max-w-4xl w-full mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Tools</h1>
        <p className="text-lg text-violet-200 mb-8">Explore Medkit.AI's powerful health tools.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 max-w-4xl w-full mx-auto">
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