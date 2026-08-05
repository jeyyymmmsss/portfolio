import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WaveDivider from './components/WaveDivider';
import Customizer from './components/Customizer';
import { Project } from './types';
import { INITIAL_PROFILE, PROJECTS, SERVICES } from './data';

const ACCENT_COLORS = [
  {
    name: "Obsidian Black",
    id: "obsidian",
    primaryClass: "text-zinc-900",
    bgClass: "bg-zinc-900",
    borderClass: "border-zinc-900",
    badgeBg: "bg-zinc-100 text-zinc-900",
    accentHex: "#18181b",
    hoverBg: "hover:bg-zinc-800"
  },
  {
    name: "Sage Green",
    id: "sage",
    primaryClass: "text-emerald-800",
    bgClass: "bg-emerald-800",
    borderClass: "border-emerald-800",
    badgeBg: "bg-emerald-50 text-emerald-800",
    accentHex: "#065f46",
    hoverBg: "hover:bg-emerald-700"
  },
  {
    name: "Terracotta Clay",
    id: "clay",
    primaryClass: "text-orange-800",
    bgClass: "bg-orange-800",
    borderClass: "border-orange-800",
    badgeBg: "bg-orange-50 text-orange-800",
    accentHex: "#9a3412",
    hoverBg: "hover:bg-orange-700"
  },
  {
    name: "Cobalt Blue",
    id: "cobalt",
    primaryClass: "text-blue-800",
    bgClass: "bg-blue-800",
    borderClass: "border-blue-800",
    badgeBg: "bg-blue-50 text-blue-800",
    accentHex: "#1e40af",
    hoverBg: "hover:bg-blue-700"
  },
  {
    name: "Deep Amethyst",
    id: "violet",
    primaryClass: "text-purple-800",
    bgClass: "bg-purple-800",
    borderClass: "border-purple-800",
    badgeBg: "bg-purple-50 text-purple-800",
    accentHex: "#6b21a8",
    hoverBg: "hover:bg-purple-700"
  }
];

export default function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [selectedAccentId, setSelectedAccentId] = useState('obsidian');
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio_dark_mode');
    return saved === 'true';
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Mode synchronizer
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('portfolio_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Experience Partnership Planner Applied State
  const [appliedPlanText, setAppliedPlanText] = useState('');
  const [appliedProjectType, setAppliedProjectType] = useState('');
  const [appliedBudget, setAppliedBudget] = useState('');

  // Local storage & Firestore synchronization
  useEffect(() => {
    const savedProfile = localStorage.getItem('portfolio_profile');
    const savedAccent = localStorage.getItem('portfolio_accent_id');
    const savedProjects = localStorage.getItem('portfolio_custom_projects');

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name === "Elena Rostova" || parsed.title === "Professional Specialist & Web Developer") {
          parsed.name = "James Ramirez";
          parsed.title = "Aesthetic Specialist & Indie Vibe Coder";
          parsed.bio = "Delivering high-fidelity results across Technical Documentation, Aesthetic Web Prototyping, Graphic Design, and Social Media Management. Committed to clean layouts, delightful micro-animations, and striking visual design.";
          parsed.email = "jamesbrianramirezzz@gmail.com";
          parsed.location = "San Francisco, CA";
          localStorage.setItem('portfolio_profile', JSON.stringify(parsed));
        }
        setProfile(parsed);
      } catch (e) {
        console.error('Error parsing profile from local storage', e);
      }
    }
    if (savedAccent) {
      setSelectedAccentId(savedAccent);
    }
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        setProjects([...PROJECTS, ...parsed]);
      } catch (e) {
        console.error('Error parsing projects from local storage', e);
      }
    }
  }, []);

  const handleUpdateProfile = (updatedProfile: typeof INITIAL_PROFILE) => {
    setProfile(updatedProfile);
    localStorage.setItem('portfolio_profile', JSON.stringify(updatedProfile));
  };

  const handleSelectAccent = (id: string) => {
    setSelectedAccentId(id);
    localStorage.setItem('portfolio_accent_id', id);
  };

  const handleAddProject = (newProject: Project) => {
    const customProjectsOnly = JSON.parse(localStorage.getItem('portfolio_custom_projects') || '[]');
    const updatedCustom = [newProject, ...customProjectsOnly];
    
    localStorage.setItem('portfolio_custom_projects', JSON.stringify(updatedCustom));
    setProjects([newProject, ...projects]);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all custom edits back to James Ramirez\'s template default? This clears any created custom projects and message logs.')) {
      localStorage.removeItem('portfolio_profile');
      localStorage.removeItem('portfolio_accent_id');
      localStorage.removeItem('portfolio_custom_projects');
      localStorage.removeItem('portfolio_inquiries');
      
      setProfile(INITIAL_PROFILE);
      setSelectedAccentId('obsidian');
      setProjects(PROJECTS);
      setShowCustomizer(false);
      setAppliedPlanText('');
      setAppliedProjectType('');
      setAppliedBudget('');

      // Reload to ensure all subcomponents flush their local cache
      window.location.reload();
    }
  };

  const handleApplyPlanToContact = (planText: string, projectType: string, budget: string) => {
    setAppliedPlanText(planText);
    setAppliedProjectType(projectType);
    setAppliedBudget(budget);
  };

  const handleClearAppliedPlan = () => {
    setAppliedPlanText('');
    setAppliedProjectType('');
    setAppliedBudget('');
  };

  const activeAccent = ACCENT_COLORS.find(c => c.id === selectedAccentId) || ACCENT_COLORS[0];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 selection:bg-zinc-900 selection:text-white">
      {/* Premium Horizontal Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-zinc-200/20 dark:bg-zinc-800/20">
        <div 
          className="h-full transition-all duration-75 ease-out rounded-r-full"
          style={{ 
            width: `${scrollProgress}%`,
            backgroundColor: activeAccent.accentHex || '#18181b',
            boxShadow: `0 1px 4px ${(activeAccent.accentHex || '#18181b')}40`
          }}
        />
      </div>

      {/* Top Header/Navigation */}
      <Navbar
        name={profile.name}
        available={profile.available}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        accent={activeAccent}
      />

      {/* Main Single Page Layout Content */}
      <main className="flex-1">
        {/* Editorial Hero Banner */}
        <Hero
          name={profile.name}
          title={profile.title}
          bio={profile.bio}
          location={profile.location}
          accent={activeAccent}
        />

        {/* Selected Works Portfolio Showcase */}
        <Projects
          projects={projects}
          onAddProject={handleAddProject}
          accent={activeAccent}
        />

        {/* Services Showcase & Interactive Cooperation Planner */}
        <Experience
          services={SERVICES}
          accent={activeAccent}
        />

        {/* Dynamic Contact Coordinates */}
        <Contact
          email={profile.email}
          location={profile.location}
          accent={activeAccent}
        />
      </main>

      {/* Organic Animated Wave Divider */}
      <WaveDivider />

      {/* Footer Branding Coordinates */}
      <Footer name={profile.name} />

      {/* Live Template Customizer Sidebar Drawer */}
      <Customizer
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        accentColors={ACCENT_COLORS}
        selectedAccentId={selectedAccentId}
        onSelectAccent={handleSelectAccent}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onReset={handleResetToDefaults}
      />
    </div>
  );
}
