
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const SHRINK_SCROLL_Y = 80;
const SHRINK_DELAY = 2000;

const Header = () => {
  const [mode, setMode] = useState("full");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shrinkTimeout = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY === 0) {
        setMode("full");
        clearTimeout(shrinkTimeout.current);
        lastScrollY.current = currentY;
        return;
      }
      if (currentY < lastScrollY.current) {
        setMode("full");
        clearTimeout(shrinkTimeout.current);
      } else if (
        currentY > SHRINK_SCROLL_Y &&
        !isHovered &&
        mode !== "small"
      ) {
        clearTimeout(shrinkTimeout.current);
        shrinkTimeout.current = setTimeout(() => {
          setMode("small");
        }, SHRINK_DELAY);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovered, mode]);

  useEffect(() => {
    if (isHovered) {
      setMode("full");
      clearTimeout(shrinkTimeout.current);
    } else if (window.scrollY > SHRINK_SCROLL_Y) {
      clearTimeout(shrinkTimeout.current);
      shrinkTimeout.current = setTimeout(() => {
        setMode("small");
      }, SHRINK_DELAY);
    }
  }, [isHovered]);

  useEffect(() => {
    setMode("full");
    clearTimeout(shrinkTimeout.current);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
      `}</style>

      <header
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-3000 ease-out ${
          mode === "full" ? "w-[95vw] max-w-6xl" : "w-56 max-w-[14rem] justify-center"
        }`}
        style={{ padding: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mx-auto px-0">
          <div className={`bg-white rounded-full shadow-xl border border-gray-100 transition-all duration-3000 ease-out ${mode === "full" ? "px-8 py-2 min-h-[60px]" : "px-0 py-2 min-h-[56px]"}`}>
            <nav className={`${mode === "full" ? "flex items-center justify-between w-full" : "flex items-center justify-center w-full"}`}>
              {/* Logo */}
              <Link to="/" className="flex items-center focus:outline-none" style={{ textDecoration: 'none' }}>
                <img src="/logo.jpg" alt="Medkit AI Logo" className="h-12 w-auto object-contain" style={{ maxHeight: '48px' }} />
              </Link>

              {mode === "full" && (
                <>
                  {/* Mobile menu button */}
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>

                  {/* Desktop Nav (core items only) */}
                  <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center animate-fade-in">
                    <Link to="/" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">Home</Link>
                    <Link to="/stories" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">Stories</Link>
                    <Link to="/tools" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">Tools</Link>
                    <Link to="/features" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">Features</Link>
                    <Link to="/library" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">Health Library</Link>
                    <Link to="/about" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">About</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-black transition-colors font-medium whitespace-nowrap">Contact</Link>
                  </nav>

                  {/* Right side: CTA only (profile handled by floating avatar) */}
                  <div className="hidden md:flex items-center animate-fade-in">
                    <a
                      href="https://wa.me/14155238886?text=join%20three-fort"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white shadow-md transition-all duration-200"
                      style={{
                        background: 'linear-gradient(90deg, #18181b 0%, #7c3aed 100%)',
                        boxShadow: '0 4px 16px rgba(124,58,237,0.10)',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="#25D366" />
                        <path d="M16 7C11.03 7 7 11.03 7 16C7 17.85 7.64 19.55 8.73 20.91L7 25L11.18 23.32C12.47 24.09 14.16 24.5 16 24.5C20.97 24.5 25 20.47 25 16.5C25 11.53 20.97 7.5 16 7.5V7ZM16 22.5C14.44 22.5 12.97 22.09 11.77 21.36L11.5 21.21L9.5 22L10.29 20.01L10.14 19.74C9.41 18.54 9 17.07 9 15.5C9 11.91 12.14 8.5 16 8.5C19.86 8.5 23 11.91 23 15.5C23 19.09 19.86 22.5 16 22.5Z" fill="white" />
                      </svg>
                      <span className="whitespace-nowrap">Talk to Medkit</span>
                    </a>
                  </div>
                </>
              )}

              {/* Mobile Nav */}
              {isMobileMenuOpen && mode === "full" && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl border border-gray-100 mt-2 p-4 animate-fade-in">
                  <nav className="flex flex-col space-y-3">
                    <Link to="/" className="text-gray-700 hover:text-black transition-colors font-medium py-2">Home</Link>
                    <Link to="/stories" className="text-gray-700 hover:text-black transition-colors font-medium py-2">Stories</Link>
                    <Link to="/tools" className="text-gray-700 hover:text-black transition-colors font-medium py-2">Tools</Link>
                    <Link to="/features" className="text-gray-700 hover:text-black transition-colors font-medium py-2">Features</Link>
                    <Link to="/about" className="text-gray-700 hover:text-black transition-colors font-medium py-2">About</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-black transition-colors font-medium py-2">Contact</Link>
                    <Link to="/library" className="text-gray-700 hover:text-black transition-colors font-medium py-2">Health Library</Link>
                  </nav>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 