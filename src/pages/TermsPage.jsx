import React from "react";

const sections = [
  { id: "about", title: "About Medkit-AI" },
  { id: "eligibility", title: "Eligibility" },
  { id: "privacy", title: "Data & Privacy" },
  { id: "acceptable", title: "Acceptable Use" },
  { id: "emergencies", title: "Not for Emergencies" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "modifications", title: "Modifications" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <nav className="hidden md:flex flex-col gap-4 min-w-[220px] pt-8">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="text-violet-300 hover:text-white font-semibold text-lg transition-colors px-2 py-1 rounded focus:outline-none focus:bg-violet-900/40">{s.title}</a>
          ))}
        </nav>
        {/* Main Content */}
        <div className="flex-1 bg-black/60 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Terms & Conditions</h1>
          <div className="prose prose-invert max-w-none text-lg text-gray-200">
            <section id="about">
              <h2>About Medkit-AI</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Medkit-AI provides AI-powered health information, prescription analysis, health library, prescription OCR and analysis, and more. <b>Medkit-AI does not provide medical advice or emergency care.</b> Always consult a licensed medical professional for health decisions.
              </p>
            </section>
            <section id="eligibility">
              <h2>Eligibility</h2>
              <p>You must be at least <b>18 years old</b> to use our Services. If you are under 18, please do not register or use Medkit-AI.</p>
            </section>
            <section id="privacy">
              <h2>Data & Privacy</h2>
              <p>We respect your privacy. Your data (messages, profiles, uploads) may be processed to personalize your experience and improve service performance, as outlined in our <a href="/privacy" className="text-violet-400 underline">Privacy Policy</a>.</p>
              <ul>
                <li>Profile data (age, gender, location, profession, medical history)</li>
                <li>Chat logs</li>
                <li>Uploaded prescription images (for OCR)</li>
              </ul>
            </section>
            <section id="acceptable">
              <h2>Acceptable Use</h2>
              <ul>
                <li>Do not generate or request harmful, abusive, or illegal content</li>
                <li>Do not submit sexually explicit, violent, or misleading information</li>
                <li>Do not upload false or impersonated data</li>
                <li>Do not scrape, reverse-engineer, or tamper with the platform</li>
              </ul>
            </section>
            <section id="emergencies">
              <h2>Not for Emergencies</h2>
              <p>Medkit-AI is not suitable for urgent or emergency care. If you are experiencing a medical emergency, please call <b>112</b> or your local emergency number.</p>
            </section>
            <section id="disclaimers">
              <h2>Disclaimers</h2>
              <ul>
                <li>Information from Medkit-AI may be incorrect or outdated. We are continuously improving, but <b>you must verify critical health information independently</b>.</li>
                <li>No doctor-patient relationship is established through our Services.</li>
              </ul>
            </section>
            <section id="liability">
              <h2>Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Medkit-AI is <b>not liable</b> for any indirect, incidental, or consequential damages. Our liability in all cases is zero.</p>
            </section>
            <section id="modifications">
              <h2>Modifications</h2>
              <p>We may modify or discontinue parts of the Services at any time without notice. Updated terms will be posted here, and your continued use constitutes acceptance.</p>
            </section>
            <section id="contact">
              <h2>Contact Us</h2>
              <p>If you have questions or concerns:<br/>
                <b>Email</b>: <a href="mailto:beshwarg6@gmail.com" className="text-violet-400 underline">beshwarg6@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
} 