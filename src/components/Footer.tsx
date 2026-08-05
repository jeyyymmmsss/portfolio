import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white border-t border-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand Copyright */}
        <div className="flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200/50 shrink-0">
            <img 
              src="https://i.ibb.co/v6JcRs0w/Untitled-design-7.png" 
              alt="James Ramirez Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900 font-serif">
              {name} Portfolio
            </span>
            <span className="text-xs font-mono text-zinc-400">
              © 2026. All rights reserved. Designed & Engineered locally.
            </span>
          </div>
        </div>

        {/* Action Link back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-all cursor-pointer shadow-xs active:scale-95"
          id="footer-back-to-top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
