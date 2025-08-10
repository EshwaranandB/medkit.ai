import React, { useState } from "react";

const faqs = [
  { q: "Is Medkit a doctor?", a: "No, Medkit is an AI assistant and does not replace professional medical advice." },
  { q: "Is it free?", a: "Yes, Medkit is free to use for everyone." },
  { q: "Does it need insurance?", a: "No insurance is required to use Medkit." },
  { q: "How does Medkit work?", a: "Medkit uses AI to provide health information and guidance based on your questions." },
  { q: "Can Medkit diagnose my condition?", a: "Medkit cannot diagnose conditions. Always consult a healthcare professional for medical advice." },
];

export default function FAQs() {
  const [open, setOpen] = useState(null);
  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-black rounded-3xl shadow-xl max-w-3xl mx-auto my-16" style={{ 
      boxShadow: '0 8px 32px rgba(124,58,237,0.10)',
      backgroundColor: '#000000',
      background: '#000000'
    }}>
      <div className="text-center mb-8">
        <div className="text-violet-400 font-semibold text-sm mb-2">FAQs</div>
        <h2 className="text-3xl font-bold text-white mb-2">Common Questions</h2>
        <p className="text-gray-300">Answers to common questions about how Medkit works, its accuracy, and your data privacy.</p>
      </div>
      <div className="w-full">
        {faqs.map((item, idx) => (
          <div key={idx} className="mb-2">
            <button
              className="w-full flex justify-between items-center py-4 px-6 bg-gray-900 rounded-xl shadow hover:shadow-md transition-all text-left font-medium text-white focus:outline-none"
              style={{ border: '1px solid #2e1065' }}
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span>{item.q}</span>
              <span className={`ml-4 transition-transform ${open === idx ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {open === idx && (
              <div className="px-6 py-4 text-gray-200 bg-violet-950 rounded-b-xl border-t border-violet-900">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 