import React from "react";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center justify-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="w-full max-w-xl mx-auto bg-black/60 rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-violet-200 mb-8 text-center">We'd love to hear from you! Reach out to us anytime.</p>
        <div className="flex flex-col gap-4 w-full items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Email:</span>
            <a href="mailto:beshwarg6@gmail.com" className="text-violet-400 underline">beshwarg6@gmail.com</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Address:</span>
            <span className="text-violet-200">Marwadi University, Rajkot, Gujarat</span>
          </div>
        </div>
        <div className="flex gap-8 mt-6">
          <a href="https://x.com/EshwaranandB" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-12 h-12 flex items-center justify-center text-white hover:text-violet-400 transition-colors bg-black/40 rounded-full shadow-lg">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21L14.19 10.91L22.07 21H16.16L11.38 14.78L5.99998 21H2.61998L9.80998 12.73L2.28998 3H8.33998L12.68 8.71L17.53 3ZM16.13 19.13H17.7L7.92998 4.86999H6.26998L16.13 19.13Z"/></svg>
          </a>
          <a href="https://www.instagram.com/eshwar.ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 flex items-center justify-center text-white hover:text-violet-400 transition-colors bg-black/40 rounded-full shadow-lg">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/eshwar-anand-badugu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center text-white hover:text-violet-400 transition-colors bg-black/40 rounded-full shadow-lg">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75s1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47c-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54c3.01 0 3.57 1.98 3.57 4.56v4.75z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
} 