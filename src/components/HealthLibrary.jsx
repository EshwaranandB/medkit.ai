import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All Topics', icon: '📚' },
  { id: 'medications', name: 'Medications & Supplements', icon: '💊' },
  { id: 'tests', name: 'Tests & Procedures', icon: '🔬' },
  { id: 'diseases', name: 'Diseases & Conditions', icon: '🏥' },
  { id: 'symptoms', name: 'Symptoms', icon: '🩺' },
  { id: 'wellness', name: 'General Health', icon: '🌱' },
  { id: 'recipes', name: 'Health Recipes', icon: '🥗' },
];

const HealthLibrary = () => {
  const [totalTopics, setTotalTopics] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/medlineplus_full.json")
      .then(res => res.json())
      .then(data => {
        setTotalTopics(data.length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-glow-strong mb-6 animate-fadeInUp">
            Health Library
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fadeInUp">
            Access comprehensive medical information, research-backed articles, and expert insights on medications, diseases, symptoms, and health tests.
          </p>
          {!loading && (
            <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl px-6 py-3 inline-block">
              <span className="text-violet-300 text-lg font-semibold">
                📚 {totalTopics.toLocaleString()} Health Topics Available
              </span>
            </div>
          )}
        </div>

        {/* Category Navigation */}
        <div className="mb-12 animate-fadeInUp">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/library/${category.id}`}
                className="group p-6 rounded-2xl transition-all duration-300 flex flex-col items-center text-center bg-gray-900/50 hover:bg-violet-900/50 border-2 border-gray-800 hover:border-violet-500 text-white shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transform hover:scale-105"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <span className="font-bold text-lg mb-2">{category.name}</span>
                <span className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthLibrary; 