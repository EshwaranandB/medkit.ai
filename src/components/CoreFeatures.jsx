import React from "react";

const features = [
  {
    icon: (
      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    ),
    title: "AI Health Chatbot",
    description: "24/7 instant answers to your health questions, powered by advanced AI."
  },
  {
    icon: (
      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
    ),
    title: "Health Library",
    description: "Explore trusted, up-to-date information on diseases, symptoms, and medications."
  },
  {
    icon: (
      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    ),
    title: "Prescription Analysis",
    description: "Upload a prescription and let Medkit.AI extract and explain your medicines."
  },
  {
    icon: (
      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
    ),
    title: "Reminders & Insights",
    description: "Get reminders for medicines, water, and see your health trends."
  }
];

export default function CoreFeatures() {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-violet-950 to-black/90 backdrop-blur-xl rounded-3xl my-16 shadow-2xl animate-fadein">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-gradient" style={{textShadow:'0 2px 24px #7c3aed88'}}>
              What Medkit.AI Offers
            </h2>
            <p className="text-xl text-violet-200 max-w-3xl mx-auto">
              Your all-in-one platform for smart, accessible, and personalized health support.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div key={idx} className="glass bg-gradient-to-br from-[#18192b] to-violet-900/80 border border-violet-800/40 rounded-2xl p-8 shadow-xl flex flex-col items-start hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white mb-5 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-violet-200 mb-2 flex-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 