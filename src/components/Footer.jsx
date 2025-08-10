import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-black via-violet-950 to-black text-white py-12 px-4 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="mb-8 md:mb-0">
          <div className="flex items-center mb-2">
            <img 
              src="/logo_transparent.png" 
              alt="Medkit AI Logo" 
              className="h-8 w-auto object-contain"
              style={{ maxHeight: '32px' }}
            />
          </div>
          <div className="text-gray-300 mb-4">Medical help when you need it, right away</div>
          <div className="flex gap-4 mb-4">
            <a href="https://x.com/EshwaranandB" className="hover:text-violet-400" aria-label="X" target="_blank" rel="noopener noreferrer">
              {/* X Logo */}
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21L14.19 10.91L22.07 21H16.16L11.38 14.78L5.99998 21H2.61998L9.80998 12.73L2.28998 3H8.33998L12.68 8.71L17.53 3ZM16.13 19.13H17.7L7.92998 4.86999H6.26998L16.13 19.13Z"/></svg>
            </a>
            <a href="https://www.instagram.com/eshwar.ai/" className="hover:text-violet-400" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              {/* Instagram Logo */}
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/eshwar-anand-badugu/" className="hover:text-violet-400" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              {/* LinkedIn Logo */}
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75s1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47c-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54c3.01 0 3.57 1.98 3.57 4.56v4.75z"/></svg>
            </a>
          </div>
          <div className="flex gap-2">
            {/* Removed App Store and Google Play icons */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 w-full md:w-auto justify-between">
          <div>
            <div className="font-semibold mb-2">Quick Links</div>
            <div className="flex flex-wrap gap-2">
              <Link to="/" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">Home</Link>
              <Link to="/stories" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">Stories</Link>
              <Link to="/tools" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">Tools</Link>
              <Link to="/features" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">Features</Link>
              <Link to="/about" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">About</Link>
              <Link to="/contact" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">Contact</Link>
              <Link to="/library" className="bg-white/10 rounded-full px-4 py-2 hover:bg-violet-900 transition">Health Library</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Contact</div>
            <div className="text-gray-300 text-sm mb-1">beshwarg6@gmail.com</div>
            <div className="text-gray-300 text-sm">Marwadi University, Rajkot, Gujarat</div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 border-t border-violet-900 pt-6 text-gray-400 text-xs">
        <div>© {new Date().getFullYear()} Medkit AI. All Rights Reserved.</div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/terms" className="hover:text-violet-400">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-violet-400">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
} 