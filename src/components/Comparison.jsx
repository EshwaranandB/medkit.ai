import React from 'react';

const OldWay = [
  "Confusing medical reports & prescriptions",
  "Expensive doctor visits for simple clarifications",
  "No guidance on daily health, nutrition, or medication",
  "Waiting hours or days for a response to simple health questions",
  "No personalized recommendations to help prevent health issues"
];

const MedkitWay = [
  { text: "Instantly understand prescriptions & reports—just upload a photo", icon: "📸" },
  { text: "Free, AI-powered health guidance available 24/7", icon: "❤️" },
  { text: "Personalized nutrition plans & medication reminders", icon: "🍉" },
  { text: "Immediate responses for your health queries", icon: "⏱️" },
  { text: "AI-driven insights help you prevent potential health issues", icon: "✨" }
];

const Comparison = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-violet-950 to-black/90 text-white backdrop-blur-xl rounded-3xl my-16 shadow-2xl animate-fadein">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-violet-400 font-semibold">Before and After</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">Why Settle for Less?</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Upgrade to a medical companion that's always in your pocket.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
          {/* Old Way */}
          <div className="flex-1 w-full max-w-md bg-black/40 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-300 mb-6">The Old Way</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg text-gray-300"><span className="w-7 h-7 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center font-bold">×</span>Confusing medical reports & prescriptions</li>
              <li className="flex items-center gap-3 text-lg text-gray-300"><span className="w-7 h-7 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center font-bold">×</span>Expensive doctor visits for simple clarifications</li>
              <li className="flex items-center gap-3 text-lg text-gray-300"><span className="w-7 h-7 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center font-bold">×</span>No guidance on daily health, nutrition, or medication</li>
              <li className="flex items-center gap-3 text-lg text-gray-300"><span className="w-7 h-7 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center font-bold">×</span>Waiting hours or days for a response to simple health questions</li>
              <li className="flex items-center gap-3 text-lg text-gray-300"><span className="w-7 h-7 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center font-bold">×</span>No personalized recommendations to help prevent health issues</li>
            </ul>
          </div>
          {/* Medkit.AI Way */}
          <div className="flex-1 w-full max-w-md bg-white/10 rounded-2xl p-8 shadow-2xl border border-violet-500/40" style={{backdropFilter:'blur(8px)'}}>
            <h3 className="text-2xl font-bold text-white mb-2">The Medkit.AI Way</h3>
            <p className="text-violet-200 mb-6">Your Health, Your Control</p>
            <ul className="space-y-5">
              <li className="flex items-center gap-3 text-lg"><span className="text-2xl">📸</span> Instantly understand prescriptions & reports—just upload a photo</li>
              <li className="flex items-center gap-3 text-lg"><span className="text-2xl">❤️</span> Free, AI-powered health guidance available 24/7</li>
              <li className="flex items-center gap-3 text-lg"><span className="text-2xl">🍉</span> Personalized nutrition plans & medication reminders</li>
              <li className="flex items-center gap-3 text-lg"><span className="text-2xl">⏱️</span> Immediate responses for your health queries</li>
              <li className="flex items-center gap-3 text-lg"><span className="text-2xl">✨</span> AI-driven insights help you prevent potential health issues</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
