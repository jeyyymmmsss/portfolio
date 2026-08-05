import React, { useState, useEffect } from 'react';
import { Mail, Copy, CheckCircle2, MapPin, Clock, FileText } from 'lucide-react';

interface ContactProps {
  email: string;
  location: string;
  accent: {
    primaryClass: string;
    bgClass: string;
    badgeBg: string;
    hoverBg: string;
    accentHex: string;
  };
}

export default function Contact({
  email,
  location,
  accent
}: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    // Clock updater
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Manila', 
  timeZoneName: 'short'
};
setLocalTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact-section" className="py-24 bg-zinc-50 border-t border-zinc-100 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-6 sm:px-8 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-3">Initiate Conversation</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 tracking-tight">
            Let's build something <span className="font-sans font-extrabold italic">Exceptional</span>
          </h2>
        </div>

        {/* Centered Contact details card */}
        <div className="bg-white rounded-2xl border border-zinc-150 p-5 sm:p-10 shadow-xs max-w-xl mx-auto text-left">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-2 sm:mb-3">Direct Coordinates</span>
            
            <h3 className="text-lg sm:text-xl font-serif text-zinc-900 font-semibold mb-5 sm:mb-6">
              Prefer direct electronic mail?
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {/* Email row */}
              <div className="flex items-center justify-between gap-2 p-3.5 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-150">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-zinc-200 shrink-0">
                    <Mail className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-zinc-400 block">PRIMARY EMAIL</span>
                    <a 
                      href={`mailto:${email}`}
                      className="text-xs sm:text-sm font-sans font-medium text-zinc-800 hover:underline hover:text-zinc-900 break-all sm:break-normal block"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg bg-white sm:bg-transparent border border-zinc-200/60 sm:border-transparent hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                  title="Copy email coordinates"
                >
                  {copiedEmail ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>

              {/* Location row */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-150">
                <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">LOCAL TIMEZONE</span>
                  <span className="text-sm font-sans font-medium text-zinc-800 flex items-center gap-1">
                    {location}
                  </span>
                </div>
              </div>

              {/* Clock row */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-150 font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                  <Clock className="w-4 h-4 text-zinc-600" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">CURRENT TIME</span>
                  <span className="text-xs font-semibold text-zinc-800">{localTime || 'Loading...'}</span>
                </div>
              </div>
            </div>

            {/* View Resume CTA Section */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">Curriculum Vitae</span>
                <span className="text-xs sm:text-sm font-sans font-medium text-zinc-600">
                  Detailed professional background
                </span>
              </div>
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-5 py-2.5 rounded-full ${accent.bgClass} ${accent.hoverBg} text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer`}
                id="view-resume-btn"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
