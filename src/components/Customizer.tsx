import React from 'react';
import { X, Sparkles, RefreshCw, Palette, User, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccentColor {
  name: string;
  id: string;
  primaryClass: string;
  bgClass: string;
  borderClass: string;
  badgeBg: string;
  accentHex: string;
  hoverBg: string;
}

interface CustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  accentColors: AccentColor[];
  selectedAccentId: string;
  onSelectAccent: (id: string) => void;
  profile: {
    name: string;
    title: string;
    location: string;
    bio: string;
    available: boolean;
    email: string;
  };
  onUpdateProfile: (updated: any) => void;
  onReset: () => void;
}

export default function Customizer({
  isOpen,
  onClose,
  accentColors,
  selectedAccentId,
  onSelectAccent,
  profile,
  onUpdateProfile,
  onReset
}: CustomizerProps) {
  const handleChange = (field: string, value: any) => {
    onUpdateProfile({
      ...profile,
      [field]: value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
          />

          {/* Drawer Body */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-full sm:max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col h-full"
              id="template-customizer-drawer"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-zinc-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-zinc-800" />
                  <h3 className="text-base font-serif font-bold text-zinc-900">
                    Template Sandbox Customizer
                  </h3>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Personalize this template in real-time. Change the primary copywriting parameters, color palette, or status to evaluate how the layout adapts to your requirements. All changes are stored locally in your browser session.
                </p>

                {/* 1. Accent Color Palette Selector */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" />
                    1. CHOOSE ACCENT PALETTE
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {accentColors.map((color) => {
                      const isSelected = selectedAccentId === color.id;
                      return (
                        <button
                          key={color.id}
                          onClick={() => onSelectAccent(color.id)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-zinc-50 border-zinc-900 shadow-xs'
                              : 'bg-white border-zinc-200 hover:bg-zinc-50'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-white"
                            style={{ backgroundColor: color.accentHex }}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </span>
                          <span className="text-xs font-semibold text-zinc-800 font-sans truncate">{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Personal Information Fields */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    2. PERSONAL METADATA
                  </span>

                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">PORTFOLIO NAME</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-hidden focus:border-zinc-950 font-sans"
                    />
                  </div>

                  {/* Title field */}
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">PROFESSIONAL TITLE</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-hidden focus:border-zinc-950 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Location field */}
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 mb-1">LOCATION</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-hidden focus:border-zinc-950 font-sans"
                      />
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 mb-1">COORDINATE EMAIL</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-hidden focus:border-zinc-950 font-sans"
                      />
                    </div>
                  </div>

                  {/* Available contract status */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-150 mt-2">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-800 block">Available for Contract Work</span>
                      <span className="text-[10px] text-zinc-400">Toggles the pulsating online badge status in navigation header.</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleChange('available', !profile.available)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        profile.available ? 'bg-emerald-600' : 'bg-zinc-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          profile.available ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 3. Biography Field */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    3. PHILOSOPHY / BIO SUMMARY
                  </span>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">BIO STATEMENT</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-hidden focus:border-zinc-950 font-sans leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-zinc-150 bg-zinc-50 flex gap-3">
                <button
                  onClick={onReset}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-250 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 transition-colors cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Restore Defaults
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer active:scale-95"
                >
                  Apply and Close
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
