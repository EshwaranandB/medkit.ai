import React from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { id: 'all', name: 'All Topics', icon: '📚', desc: 'Browse all health topics, articles, and resources.' },
  { id: 'medications', name: 'Medications & Supplements', icon: '💊', desc: 'Learn about frequently prescribed medications and popular dietary supplements.' },
  { id: 'tests', name: 'Tests & Procedures', icon: '🔬', desc: 'Find detailed information about medical tests and procedures, including what to expect and how to prepare.' },
  { id: 'diseases', name: 'Diseases & Conditions', icon: '🏥', desc: 'Learn about frequently diagnosed medical conditions and their treatments.' },
  { id: 'symptoms', name: 'Symptoms', icon: '🩺', desc: 'Identify and understand various symptoms, their potential causes, and when to seek medical care.' },
  { id: 'wellness', name: 'General Health', icon: '🌱', desc: 'Explore wellness, prevention, and healthy living tips.' },
  { id: 'recipes', name: 'Health Recipes', icon: '🥗', desc: 'Discover nutritious recipes and healthy eating ideas.' },
];

export default function HealthLibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 pb-12 pt-36 md:pt-32" style={{
      backgroundColor: '#000000',
      background: '#000000'
    }}>
      <div className="w-full max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Your Trusted Health Library</h1>
        <p className="text-lg text-gray-300 mb-10">Access reliable, up-to-date medical information to make informed decisions about your health</p>
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/library/${cat.id}`}
              className={`flex flex-col items-start p-8 rounded-2xl shadow-lg border-2 transition-all duration-200 cursor-pointer h-full bg-gray-900 border-gray-800 hover:border-violet-700 hover:bg-violet-900 text-white focus:outline-none`}
              style={{ textDecoration: 'none' }}
            >
              <span className="text-4xl mb-3">{cat.icon}</span>
              <span className="text-lg font-semibold mb-1 text-white">{cat.name}</span>
              <span className="text-gray-400 text-sm mb-2">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}