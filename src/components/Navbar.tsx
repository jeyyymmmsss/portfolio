import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  name: string;
  available: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  accent: {
    primaryClass: string;
    bgClass: string;
    hoverBg: string;
  };
}

export default function Navbar({ name, available, isDarkMode, onToggleDarkMode, accent }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="portfolio-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100/80 shadow-xs py-3 sm:py-4'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between relative">
        {/* Logo/Name */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, 'hero-section')}
          className="group flex items-center gap-2 sm:gap-2.5 font-serif font-semibold text-base sm:text-lg tracking-tight text-zinc-900 active:scale-98 transition-transform"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-100 transition-transform group-hover:rotate-12 group-hover:scale-105 border border-zinc-200/50 shrink-0">
            <img 
              src="https://i.ibb.co/v6JcRs0w/Untitled-design-7.png" 
              alt="James Ramirez Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
            <span className="text-sm sm:text-base font-medium">{name}</span>
            <span className="inline-flex items-center relative overflow-hidden rounded-[2px] border border-zinc-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.1)] animate-flag-wave select-none pointer-events-none w-[20px] sm:w-[22px] h-[13px] sm:h-[14px] shrink-0">
              <svg width="22" height="14" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="24" height="8" fill="#0038A8" />
                <rect y="8" width="24" height="8" fill="#CE1126" />
                <polygon points="0,0 12,8 0,16" fill="#FFFFFF" />
                <circle cx="4.2" cy="8" r="1.5" fill="#FCD116" />
                <circle cx="2" cy="3" r="0.5" fill="#FCD116" />
                <circle cx="2" cy="13" r="0.5" fill="#FCD116" />
                <circle cx="9" cy="8" r="0.5" fill="#FCD116" />
              </svg>
            </span>
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-zinc-500 md:absolute md:left-1/2 md:-translate-x-1/2">
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, 'projects-section')}
            className="hover:text-zinc-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all"
            id="nav-link-projects"
          >
            Work
          </a>
          <a
            href="#services"
            onClick={(e) => handleLinkClick(e, 'services-section')}
            className="hover:text-zinc-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all"
            id="nav-link-services"
          >
            Services
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact-section')}
            className="hover:text-zinc-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all"
            id="nav-link-contact"
          >
            Contact
          </a>
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Availability Badge */}
          {available && (
            <span
              id="nav-status-badge"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Work
            </span>
          )}

          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            id="nav-customize-btn"
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[40px] sm:min-h-[36px] rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-700 hover:text-zinc-900 transition-all text-xs font-medium cursor-pointer"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-500 animate-pulse" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Let's Talk Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact-section')}
            id="nav-cta-btn"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-xs cursor-pointer ${accent.bgClass} ${accent.hoverBg}`}
          >
            Let's Talk
            <ArrowRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="nav-mobile-menu-btn"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-zinc-100 active:bg-zinc-200 text-zinc-700 md:hidden cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-zinc-100 shadow-xl overflow-hidden"
            id="nav-mobile-drawer"
          >
            <div className="px-5 py-5 flex flex-col gap-2 font-sans font-medium text-zinc-700">
              <a
                href="#projects"
                onClick={(e) => handleLinkClick(e, 'projects-section')}
                className="hover:text-zinc-950 active:bg-zinc-100 px-3.5 py-3 rounded-xl transition-colors text-base font-semibold flex items-center justify-between"
                id="mobile-link-projects"
              >
                <span>Work</span>
                <span className="text-xs font-mono text-zinc-400">01</span>
              </a>
              <a
                href="#services"
                onClick={(e) => handleLinkClick(e, 'services-section')}
                className="hover:text-zinc-950 active:bg-zinc-100 px-3.5 py-3 rounded-xl transition-colors text-base font-semibold flex items-center justify-between"
                id="mobile-link-services"
              >
                <span>Services</span>
                <span className="text-xs font-mono text-zinc-400">02</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact-section')}
                className="hover:text-zinc-950 active:bg-zinc-100 px-3.5 py-3 rounded-xl transition-colors text-base font-semibold flex items-center justify-between"
                id="mobile-link-contact"
              >
                <span>Contact</span>
                <span className="text-xs font-mono text-zinc-400">03</span>
              </a>

              {/* Mobile Availability Info */}
              {available && (
                <div className="flex items-center gap-2 mt-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100/80 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Available for remote contract assignments</span>
                </div>
              )}

              {/* Mobile CTA */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact-section')}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer shadow-xs active:scale-[0.99] mt-2 ${accent.bgClass} ${accent.hoverBg}`}
                id="mobile-link-cta"
              >
                Let's Collaborate
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
