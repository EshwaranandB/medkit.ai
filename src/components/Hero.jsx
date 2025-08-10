import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-violet-950 to-black/90 rounded-3xl shadow-2xl overflow-hidden animate-fadein" style={{
      paddingTop: '120px',
    }}>
      {/* Unified Glassy Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none" style={{zIndex:1}}></div>
      {/* Subtle Animated Gradient Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet-700/30 rounded-full blur-3xl opacity-30 animate-float-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight" style={{
                textShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                lineHeight: '1.1'
              }}>
                Medical help when you need it, right away.
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg" style={{
                fontSize: '1.125rem',
                lineHeight: '1.7'
              }}>
                Understand any prescription, lab report, or health concern instantly with your personal AI health companion—available for FREE, 24x7, zero waiting time.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              <a href="https://x.com/EshwaranandB" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-8 h-8 flex items-center justify-center text-white hover:text-violet-400 transition-colors cursor-pointer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/eshwar.ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 flex items-center justify-center text-white hover:text-violet-400 transition-colors cursor-pointer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/eshwar-anand-badugu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center text-white hover:text-violet-400 transition-colors cursor-pointer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/14155238886?text=join%20three-fort"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105" style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                Talk to Medkit
              </a>
              
            </div>
          </div>

          {/* Right Side - Floating UI Elements */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Background Image Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20" style={{
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              transform: 'perspective(1000px) rotateY(-15deg)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-600/20"></div>
            </div>

            {/* Floating Chat Bubbles */}
            <div className="relative space-y-4">
              {/* Chat Bubble 1 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform -rotate-2" style={{
                maxWidth: '280px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Hi Medkit, I have a stomach ache, I'm not feeling great.
                </p>
              </div>

              {/* Chat Bubble 2 */}
              <div className="bg-violet-100/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform rotate-1 ml-8" style={{
                maxWidth: '300px',
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)'
              }}>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Hey there, I'm sorry for that. How long has it been hurting?
                </p>
              </div>

              {/* Chat Bubble 3 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform -rotate-1" style={{
                maxWidth: '260px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Since this morning, I'm also feeling a bit nauseous.
                </p>
              </div>
            </div>

            {/* Audio Player */}
            <div className="absolute top-20 right-0 bg-pink-500/90 backdrop-blur-sm rounded-xl p-3 shadow-xl transform rotate-3" style={{
              boxShadow: '0 15px 35px rgba(236, 72, 153, 0.3)'
            }}>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div className="text-white text-xs">
                  <div className="font-medium">Play Audio</div>
                  <div>90 seconds</div>
                </div>
              </div>
            </div>

            {/* Document Cards */}
            <div className="absolute bottom-20 left-0 space-y-3">
              {/* Small Document */}
              <div className="bg-teal-100/90 backdrop-blur-sm rounded-xl p-3 shadow-xl transform -rotate-2" style={{
                maxWidth: '200px',
                boxShadow: '0 15px 35px rgba(20, 184, 166, 0.2)'
              }}>
                <div className="text-gray-800 text-xs font-medium">Thyroid Report - 25</div>
              </div>

              {/* Large Document */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl transform rotate-1" style={{
                maxWidth: '240px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <div className="text-gray-800 text-sm font-medium mb-2">Doctor's Report</div>
                <div className="bg-gray-100 rounded p-2 mb-3">
                  <div className="text-xs text-gray-600">Patient: John Doe</div>
                  <div className="text-xs text-gray-600">Date: 2024-01-15</div>
                </div>
                <button className="w-full bg-teal-500 text-white text-xs py-2 rounded-lg hover:bg-teal-600 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 