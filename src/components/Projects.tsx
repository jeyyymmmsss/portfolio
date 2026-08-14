import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { 
  ArrowUpRight, Plus, X, Globe, Tag, Calendar, ExternalLink, Sparkles, 
  FileText, Share2, Palette, CheckCircle2, Award, MessageSquare, Clock, 
  Check, Settings, ShieldCheck, TrendingUp, Cpu, Workflow, ChevronLeft, ChevronRight,
  Upload, Image as ImageIcon, Loader2, ChevronDown, Filter, Layers,
  Maximize2, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  accent: {
    primaryClass: string;
    bgClass: string;
    badgeBg: string;
    hoverBg: string;
    accentHex: string;
  };
}

interface CategoryCaseStudy {
  id: string;
  title: 'Graphic Design' | 'Social Media Management' | 'Web Design & Development' | 'Technical Documentation';
  oneLiner: string;
  overview: string;
  iconName: 'FileText' | 'Share2' | 'Palette' | 'Globe';
  glowColor: string; // CSS color string for shadow
  gradientClasses: string; // Tailwind classes for the logo bg
  workflow: { step: string; title: string; desc: string }[];
  deliverables: string[];
  tools: string[];
  achievements: string[];
  testimonial: { quote: string; author: string; role: string };
  previews: { title: string; type: string; img: string }[];
}

const PLACEHOLDER_CASES: Record<string, Omit<Project, 'category'>[]> = {
  'Technical Documentation': [
    {
      id: "td-1",
      title: "Technical Documentation Manual & SOP Suite (Sample 1)",
      client: "MedTech Innovations",
      year: "2026",
      description: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
      tags: ["Technical Doc", "SOP Suite", "Manual & SOP"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947264/1_vm88jx.png",
      images: [
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947264/1_vm88jx.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947265/2_s9vsng.png"
      ],
      orientation: "landscape"
    },
    {
      id: "td-2",
      title: "Quality Management & Operational Compliance (Sample 2)",
      client: "MedTech Innovations",
      year: "2026",
      description: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
      tags: ["Technical Doc", "Compliance", "Process Mapping"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947892/3_s8lscb.png",
      images: [
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947892/3_s8lscb.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947893/4_ajc4jq.png"
      ],
      orientation: "landscape"
    },
    {
      id: "td-3",
      title: "User Manuals & Standard Operating Procedures (Sample 3)",
      client: "MedTech Innovations",
      year: "2026",
      description: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
      tags: ["Technical Doc", "User Manuals", "SOPs"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785948213/5_linerz.png",
      images: [
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785948213/5_linerz.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785948213/6_sz3fo1.png"
      ],
      orientation: "landscape"
    },
    {
      id: "td-4",
      title: "Technical Writing & Process Documentation (Sample 4)",
      client: "MedTech Innovations",
      year: "2026",
      description: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
      tags: ["Technical Doc", "Process Mapping", "Operational Docs"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785949885/7_bzxniq.png",
      images: [
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785949885/7_bzxniq.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785950201/scrccc_btftcf.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785949885/9_bwt4bj.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785949885/10_vw4bjm.png"
      ],
      orientation: "landscape"
    }
  ],
  'Social Media Management': [
    {
      id: "sm-1",
      title: "Social Media Campaign & Content Curation",
      client: "Aether Cosmetics",
      year: "2026",
      description: "End-to-end multi-slide campaign curation showcasing high-impact social assets, aesthetic visual storytelling, and post scheduling.",
      tags: ["Social Media", "Campaign Strategy", "7-Slide Curation"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942207/1_oyotgl.png"
    },
    {
      id: "sm-2",
      title: "Social Media Brand Asset & Post Feature",
      client: "Aether Cosmetics",
      year: "2026",
      description: "Aesthetic single-frame social media brand asset highlighting product storytelling and visual engagement.",
      tags: ["Social Media", "Brand Asset", "Single Frame"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942206/8_awznjz.png"
    }
  ],
  'Graphic Design - Prints': [
    {
      id: "gdp-1",
      title: "₱1,000,000.00 Day #3 Squid Game Thumbnail",
      client: "YouTube Content Creators",
      year: "2026",
      description: "High-impact, cinematic YouTube thumbnail graphic with glowing ₱1,000,000.00 currency text, Squid Game characters, and DAY #3 styling.",
      tags: ["YouTube Thumbnail", "Graphic Design", "Squid Game", "Viral Asset"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785304048/1_000_000_1_bixzo8.png",
      link: "#"
    },
    {
      id: "gdp-2",
      title: "Exhibition Poster & Gallery Program",
      client: "Zurich Contemporary Art",
      year: "2025",
      description: "High-contrast Swiss style poster and layout brochure utilizing strict structural grids and sans-serif type.",
      tags: ["Art Poster", "Swiss Design", "Exhibition Program"],
      image: "https://images.unsplash.com/photo-1509343256512-d77a53778e6a?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdp-3",
      title: "Luxury Skincare Product Carton Labels",
      client: "Aether Cosmetics",
      year: "2025",
      description: "Minimalist, tactile gold-foiled paper carton layouts and product labeling layouts.",
      tags: ["Product Packaging", "Tactile Print", "Luxury Carton"],
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdp-4",
      title: "B2B Tech Summit Guide Booklet",
      client: "InnoTech Conferences",
      year: "2024",
      description: "A comprehensive multi-page pocket guidebook detailing speaker line-ups, schedules, and venue map structures.",
      tags: ["Summit Guidebook", "Pocket Book", "Information Hierarchy"],
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"
    }
  ],
  'Graphic Design - Graphics': [
    {
      id: "gdg-1",
      title: "Holiday Mega Sale Ad Campaign Assets",
      client: "Vogue Boutique",
      year: "2026",
      description: "A cohesive batch of highly stylized social media banners, layout assets, and seasonal promotional cards.",
      tags: ["Ad Banners", "Seasonal Promos", "Visual Ad Assets"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-2",
      title: "Core Branding Logomarks & System",
      client: "Novus Creative Agency",
      year: "2026",
      description: "Clean vector system containing scalable brand logo variations, vector brand assets, and style guides.",
      tags: ["Vector Branding", "Logomarks", "Brand Guidelines"],
      image: "https://images.unsplash.com/photo-1541462608141-2ff030de4a40?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-3",
      title: "B2B SaaS Performance Comparison Sheet",
      client: "Apex Flow Analytics",
      year: "2025",
      description: "Visual infographics displaying SaaS speed benchmarks, product tier pricing models, and client testimonials.",
      tags: ["SaaS Comparison", "Infographics", "B2B Marketing"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-4",
      title: "Tech Webinar Carousel Slide Kit",
      client: "CloudSphere Global",
      year: "2025",
      description: "High-contrast dynamic sliders detailing webinar topics, speaker introductions, and registration deadlines.",
      tags: ["Webinar Promos", "Carousel Slides", "LinkedIn Graphics"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-5",
      title: "E-Commerce Discount Campaign Assets",
      client: "Luxe Furnishings",
      year: "2025",
      description: "High-contrast ad layouts optimized for Instagram and Facebook Stories, promoting flash design promotions.",
      tags: ["Stories Assets", "Ad Layouts", "E-Commerce Promos"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-6",
      title: "Company Newsletter Visual Header",
      client: "Global FinTech Ltd",
      year: "2025",
      description: "Abstract custom geometric illustrations used for internal tech updates and newsletters.",
      tags: ["Corporate Newsletter", "Abstract Art", "Header Illustration"],
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-7",
      title: "Hiring Announcement Campaign Creative",
      client: "InnoTech Labs",
      year: "2024",
      description: "Bold typographic announcement assets promoting open career positions on LinkedIn.",
      tags: ["Hiring Campaign", "Typographic Art", "Career Branding"],
      image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-8",
      title: "Keynote presentation Slide System",
      client: "BioLabs Switzerland",
      year: "2024",
      description: "Sleek presentation deck template with dynamic data layouts, bullet frames, and timeline graphics.",
      tags: ["Presentation Deck", "Keynote System", "Data Layouts"],
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-9",
      title: "Customer Milestone Celebration Graphic",
      client: "Vogue Boutique",
      year: "2024",
      description: "Vibrant and celebratory typography grids celebrating milestone orders and brand reach.",
      tags: ["Celebration Banner", "Typography Grid", "Social Asset"],
      image: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-10",
      title: "Vlogger Podcast Quote Grid Asset",
      client: "Digital Creators Network",
      year: "2024",
      description: "Minimalist quote boxes designed to highlight episode summaries across Instagram grids.",
      tags: ["Podcast Promos", "Quote Card", "Instagram Grid"],
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-11",
      title: "Customer Testimonial Story Template",
      client: "Novus Creative Agency",
      year: "2023",
      description: "Elegant, clean text-based story assets allowing simple drag-and-drop client quote publishing.",
      tags: ["Story Template", "Testimonial Card", "Ad Design"],
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdg-12",
      title: "Press Release Feature Mesh Graphic",
      client: "EcoEnergy Systems",
      year: "2023",
      description: "Minimalist, colorful abstract gradient artwork utilized as promotional image for online releases.",
      tags: ["Mesh Art", "Press Release Assets", "Abstract Background"],
      image: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?q=80&w=600&auto=format&fit=crop"
    }
  ],
  'Graphic Design - Thumbnails': [
    {
      id: "gdt-1",
      title: "Modern Tech Review Video Thumbnail",
      client: "Tech Review Channels",
      year: "2026",
      description: "High-contrast YouTube video thumbnail highlighting device features with vibrant graphic typography.",
      tags: ["YouTube Cover", "High-Contrast Title", "Tech Review"],
      image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdt-2",
      title: "Finance & Venture Capital Masterclass Cover",
      client: "Summit Capital Network",
      year: "2025",
      description: "Sleek, corporate style video thumbnail layout with strong grid framing and clear text hierarchy.",
      tags: ["Finance Masterclass", "Venture Capital Video", "Sleek Framing"],
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdt-3",
      title: "React Web Development Live Stream Cover",
      client: "Code-along Tutorial Channels",
      year: "2025",
      description: "Monospace font styles paired with vibrant terminal graphics for extreme tech developer visual click-rate.",
      tags: ["React Tutorial", "Live Stream Thumbnail", "Developer Cover"],
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gdt-4",
      title: "Venture Pitch Strategy Podcast Cover",
      client: "Digital Creators Network",
      year: "2024",
      description: "Split-screen style media graphic with high contrast color-blocking and clean branding badges.",
      tags: ["Podcast Cover", "Media Thumbnail", "Creative Blocking"],
      image: "https://images.unsplash.com/photo-1546074177-ffedd1d85d4c?q=80&w=600&auto=format&fit=crop"
    }
  ],
  'Web Design & Development': [
    {
      id: "wd-1",
      title: "Interactive Web Design & Front-End Showcase",
      client: "Personal Lab",
      year: "2026",
      description: "Interactive web design and front-end development showcase featuring dynamic media, responsive interfaces, and custom visual experiences.",
      tags: ["Web Design", "Development", "React"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop",
      video: "https://res.cloudinary.com/zaunf8hr/video/upload/v1785950938/webtry_1_ipesa1.mp4",
      orientation: "landscape"
    },
    {
      id: "wd-2",
      title: "Interactive Web Experience & Interface Design",
      client: "Personal Lab",
      year: "2026",
      description: "Custom web interface and digital layout featuring high-impact visual composition and responsive design.",
      tags: ["Web Design", "UI/UX", "Creative Dev"],
      image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942206/8_awznjz.png",
      orientation: "landscape"
    }
  ]
};

const UNIFIED_CREATIVE_PROCESS_IMAGES: string[] = [
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785952582/3_ju2ksm.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785952584/5_qynuf3.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785952557/4_dlsnww.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785952533/2_cblwvt.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785952509/1_toqfrs.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785952498/6_pjb7k7.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953590/12_ipq98r.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953590/10_p5epsn.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953590/8_vobi0x.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953590/7_gulpeg.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953590/14_gxqme7.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953590/13_qsgizo.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953589/11_unrco2.png",
  "https://res.cloudinary.com/zaunf8hr/image/upload/v1785953589/9_w4gefp.png"
];

const RIBBON_IMAGES: Record<string, string[]> = {
  'Technical Documentation': UNIFIED_CREATIVE_PROCESS_IMAGES,
  'Social Media Management': UNIFIED_CREATIVE_PROCESS_IMAGES,
  'Graphic Design': UNIFIED_CREATIVE_PROCESS_IMAGES,
  'Web Design & Development': UNIFIED_CREATIVE_PROCESS_IMAGES
};

export const GRAPHIC_DESIGN_16_PROJECTS: (Project & { orientation?: 'portrait' | 'landscape'; subGroup?: 'promotionals' | 'posters' | 'thumbnails' })[] = [
  // 1. PROMOTIONALS (Items 1 - 7)
  {
    id: "gd-promo-1",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717525/3_yddely.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },
  {
    id: "gd-promo-2",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717525/4_o5zztj.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },
  {
    id: "gd-promo-3",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717526/2_vfek41.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },
  {
    id: "gd-promo-4",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717526/1_pydmxb.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },
  {
    id: "gd-promo-5",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785857047/1_dv0org.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },
  {
    id: "gd-promo-6",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785313721/5_ruvvzp.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },
  {
    id: "gd-promo-7",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Promotionals"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785857176/YA_PNG_gu57sz.png",
    orientation: "landscape",
    subGroup: "promotionals"
  },

  // 2. POSTERS / ARTWORKS (Items 8 - 18)
  {
    id: "gd-poster-1",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786726762/neymar_1_bjbb6e.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-edwards",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786726590/edwards_bfhnho.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-2",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717783/westbrook_y1w7iz.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-3",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717783/flowg_zeynlo.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-4",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785856758/eala_umwmpc.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-5",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785856758/shohei_ybabm4.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-6",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785856758/sga_n49clo.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-7",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785856758/steph_ksat2u.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-8",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785856757/ohtani_vdrgsg.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-9",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785856759/Curry_kz2w5c.png",
    orientation: "portrait",
    subGroup: "posters"
  },
  {
    id: "gd-poster-10",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Posters / Artworks"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786717782/FC_FINAL_pmsp3t.png",
    orientation: "portrait",
    subGroup: "posters"
  },

  // 3. THUMBNAILS (Items 17 - 24)
  {
    id: "gd-thumb-1",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785313721/1_riyik4.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-2",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785313721/3_u5ldmu.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-3",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785857079/4_hecocq.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-4",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785857097/2_vdcunf.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-5",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786718172/4_idhti1.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-6",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786718173/3_nhsf1b.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-7",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786718174/2_1_ifydiy.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  },
  {
    id: "gd-thumb-8",
    title: "",
    category: "Graphic Design",
    client: "",
    year: "2026",
    description: "",
    tags: ["Thumbnails"],
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1786718178/1_1_qvjzbm.png",
    orientation: "landscape",
    subGroup: "thumbnails"
  }
];

export const TECH_DOC_4_PROJECTS: (Project & { orientation?: 'portrait' | 'landscape' })[] = [];

const WORKFLOW_DATA: Record<string, { num: string; title: string; desc: string }[]> = {
  'Graphic Design': [
    {
      num: '01',
      title: 'Creative Brief',
      desc: 'Understand the project objectives and design requirements.'
    },
    {
      num: '02',
      title: 'Concept Development',
      desc: 'Gather inspiration, create moodboards, and explore visual directions.'
    },
    {
      num: '03',
      title: 'Design & Refine',
      desc: 'Create multiple iterations and polish the final artwork.'
    },
    {
      num: '04',
      title: 'Export & Deliver',
      desc: 'Prepare high-quality files optimized for digital or print use.'
    }
  ],
  'Social Media Management': [
    {
      num: '01',
      title: 'Research',
      desc: 'Study the brand, audience, competitors, and current online presence.'
    },
    {
      num: '02',
      title: 'Content Strategy',
      desc: 'Plan content pillars, campaign ideas, and posting schedule.'
    },
    {
      num: '03',
      title: 'Create & Publish',
      desc: 'Design creatives, edit videos, and publish content across platforms.'
    },
    {
      num: '04',
      title: 'Analyze & Improve',
      desc: 'Monitor performance, optimize strategies, and refine future content.'
    }
  ],
  'Web Design & Development': [
    {
      num: '01',
      title: 'Discovery',
      desc: 'Understand the client\'s goals, target audience, and website requirements.'
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Create wireframes, layouts, and user experience.'
    },
    {
      num: '03',
      title: 'Develop',
      desc: 'Build a responsive, optimized, and modern website.'
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Test thoroughly, deploy the website, and provide revisions if needed.'
    }
  ],
  'Technical Documentation': [
    {
      num: '01',
      title: 'Analyze Requirements',
      desc: 'Review existing documents, workflows, and compliance requirements.'
    },
    {
      num: '02',
      title: 'Plan Documentation',
      desc: 'Define the document structure, templates, and documentation flow.'
    },
    {
      num: '03',
      title: 'Develop Documentation',
      desc: 'Create SOPs, Work Instructions, User Manuals, and supporting documents.'
    },
    {
      num: '04',
      title: 'Review & Deliver',
      desc: 'Revise, verify accuracy, and prepare the final documentation package.'
    }
  ]
};

export default function Projects({ projects, onAddProject, accent }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Graphic Design');
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

  // Graphic Design Custom Spotlight View States
  const [gdFilter, setGdFilter] = useState<'all' | 'promotionals' | 'posters' | 'thumbnails'>('all');
  const [gdSpotlightIndex, setGdSpotlightIndex] = useState<number>(0);

  // Gallery Modal specific state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const getGalleryImages = (proj: Project) => {
    if (proj.images && proj.images.length > 0) {
      return proj.images;
    }
    if (proj.id === 'sm-2' || proj.image.includes('8_awznjz')) {
      return [proj.image];
    }
    if (proj.category === 'Social Media Management' || proj.id.startsWith('sm-')) {
      return [
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942207/1_oyotgl.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942207/2_gtboie.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942207/3_ozddjr.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942206/4_tscqi0.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942615/5_ibi8yk.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942208/6_w7xa3h.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942206/7_srr9y2.png"
      ];
    }
    if (proj.category === 'Technical Documentation' || proj.id.startsWith('td-') || proj.id === 'qms-doc') {
      return [
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947264/1_vm88jx.png",
        "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947265/2_s9vsng.png"
      ];
    }
    const placeholders = [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
    ];
    const uniquePlaceholders = placeholders.filter(p => p !== proj.image);
    return [proj.image, ...uniquePlaceholders];
  };

  // Reset active image index when a new project is selected
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeCaseStudyProject]);

  // Handle ESC and Arrow Keys for the gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCaseStudyProject) return;

      const isSocialMedia = activeCaseStudyProject.category === 'Social Media Management' || activeCaseStudyProject.id.startsWith('sm-');
      const isGraphicDesign = activeCaseStudyProject.category === 'Graphic Design' || activeCaseStudyProject.id.startsWith('gd-');
      const isTechDoc = activeCaseStudyProject.category === 'Technical Documentation' || activeCaseStudyProject.id.startsWith('td-') || activeCaseStudyProject.id === 'qms-doc';

      if (e.key === 'Escape') {
        setActiveCaseStudyProject(null);
        return;
      }

      if (isSocialMedia || isTechDoc) {
        const galleryLength = getGalleryImages(activeCaseStudyProject).length;

        if (e.key === 'ArrowRight' || e.key === 'Right') {
          setActiveImageIndex((prev) => (prev + 1) % galleryLength);
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
          setActiveImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
        }
      }

      if (isGraphicDesign) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
          const currentIndex = GRAPHIC_DESIGN_16_PROJECTS.findIndex(p => p.id === activeCaseStudyProject.id);
          if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % GRAPHIC_DESIGN_16_PROJECTS.length;
            setActiveCaseStudyProject(GRAPHIC_DESIGN_16_PROJECTS[nextIndex]);
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
          const currentIndex = GRAPHIC_DESIGN_16_PROJECTS.findIndex(p => p.id === activeCaseStudyProject.id);
          if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + GRAPHIC_DESIGN_16_PROJECTS.length) % GRAPHIC_DESIGN_16_PROJECTS.length;
            setActiveCaseStudyProject(GRAPHIC_DESIGN_16_PROJECTS[prevIndex]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCaseStudyProject]);

  // Touch gesture handlers for mobile swipe
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (galleryLength: number) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (activeCaseStudyProject) {
      const isGraphicDesign = activeCaseStudyProject.category === 'Graphic Design' || activeCaseStudyProject.id.startsWith('gd-');
      const isTechDoc = activeCaseStudyProject.category === 'Technical Documentation' || activeCaseStudyProject.id.startsWith('td-');

      if (isGraphicDesign) {
        if (isLeftSwipe) {
          const currentIndex = GRAPHIC_DESIGN_16_PROJECTS.findIndex(p => p.id === activeCaseStudyProject.id);
          if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % GRAPHIC_DESIGN_16_PROJECTS.length;
            setActiveCaseStudyProject(GRAPHIC_DESIGN_16_PROJECTS[nextIndex]);
          }
        } else if (isRightSwipe) {
          const currentIndex = GRAPHIC_DESIGN_16_PROJECTS.findIndex(p => p.id === activeCaseStudyProject.id);
          if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + GRAPHIC_DESIGN_16_PROJECTS.length) % GRAPHIC_DESIGN_16_PROJECTS.length;
            setActiveCaseStudyProject(GRAPHIC_DESIGN_16_PROJECTS[prevIndex]);
          }
        }
        return;
      }

      if (isTechDoc) {
        if (isLeftSwipe) {
          setActiveImageIndex((prev) => (prev + 1) % galleryLength);
        } else if (isRightSwipe) {
          setActiveImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
        }
        return;
      }
    }

    if (isLeftSwipe) {
      setActiveImageIndex((prev) => (prev + 1) % galleryLength);
    } else if (isRightSwipe) {
      setActiveImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
    }
  };

  // Form states for custom reference creation
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newCategory, setNewCategory] = useState<'Graphic Design' | 'Social Media Management' | 'Web Design & Development' | 'Technical Documentation'>('Graphic Design');
  const [newDesc, setNewDesc] = useState('');
  const [newLongDesc, setNewLongDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newImage, setNewImage] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImage(reader.result);
        }
        setIsUploadingImage(false);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error reading image file:', err);
      setIsUploadingImage(false);
    }
  };

  const categories = ['Graphic Design', 'Social Media Management', 'Web Design & Development', 'Technical Documentation'];

  // Timeless metadata configuration for categories
  const sectionsData = [
    {
      id: "graphic-design",
      title: "Graphic Design" as const,
      label: "01 / GRAPHIC DESIGN",
      oneLiner: "Sports posters, event graphics, thumbnails, promotional materials, and branding assets.",
      intro: "Graphic design focused on impact, clarity, and visual storytelling. My work includes sports posters, event graphics, thumbnails, promotional materials, and branding assets created with strong typography, composition, and a consistent visual identity.",
      getProjects: () => GRAPHIC_DESIGN_16_PROJECTS
    },
    {
      id: "social-mgmt",
      title: "Social Media Management" as const,
      label: "02 / SOCIAL MEDIA MANAGEMENT",
      oneLiner: "Organic brand growth, content curation, and publishing automation.",
      intro: "I develop cohesive, content-driven social strategies that establish brand authority and engage communities organically. From editorial calendars to targeted campaigns, I focus on consistent growth across primary digital channels.",
      getProjects: () => [
        ...(PLACEHOLDER_CASES['Social Media Management'] || []),
        ...projects.filter(p => p.id.startsWith('custom-') && p.category === 'Social Media Management')
      ]
    },
    {
      id: "web-design-dev",
      title: "Web Design & Development" as const,
      label: "03 / WEB DESIGN & DEVELOPMENT",
      oneLiner: "Clean, responsive landing pages and aesthetic React code prototypes.",
      intro: "I focus on aesthetic details, pairing clean CSS structure with fluid micro-animations. I create lightweight, component-driven web interfaces, dark-mode panels, and delightful interactive widgets.",
      getProjects: () => [
        ...(PLACEHOLDER_CASES['Web Design & Development'] || []),
        ...projects.filter(p => p.id.startsWith('custom-') && p.category === 'Web Design & Development')
      ]
    },
    {
      id: "tech-doc",
      title: "Technical Documentation" as const,
      label: "04 / TECHNICAL DOCUMENTATION",
      oneLiner: "Industry-standard SOPs, compliance manuals, and process mapping.",
      intro: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
      getProjects: () => [
        ...(PLACEHOLDER_CASES['Technical Documentation'] || []),
        ...projects.filter(p => p.id.startsWith('custom-') && p.category === 'Technical Documentation')
      ]
    }
  ];

  const filteredSections = sectionsData.filter(section => section.title === selectedCategory);

  const presetImages = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop'
  ];

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const randomImage = presetImages[Math.floor(Math.random() * presetImages.length)];
    const chosenImage = newImage.trim() || randomImage;

    const tagsArray = newTags
      ? newTags.split(',').map(t => t.trim()).filter(Boolean)
      : ['React', 'Custom Design'];

    const newProj: Project = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      client: newClient || 'Personal Initiative',
      category: newCategory,
      year: new Date().getFullYear().toString(),
      description: newDesc,
      longDescription: newLongDesc || newDesc,
      image: chosenImage,
      tags: tagsArray,
      link: '#'
    };

    onAddProject(newProj);
    
    // Reset forms
    setNewTitle('');
    setNewClient('');
    setNewCategory('Graphic Design');
    setNewDesc('');
    setNewLongDesc('');
    setNewTags('');
    setNewImage('');
    setShowAddModal(false);
  };

  const getToolIcon = (toolName: string) => {
    const name = toolName.toLowerCase();
    if (name.includes('react') || name.includes('vite') || name.includes('typescript') || name.includes('motion')) {
      return <Cpu className="w-3 h-3 text-zinc-400 shrink-0" />;
    }
    if (name.includes('figma') || name.includes('illustrator') || name.includes('photoshop') || name.includes('indesign') || name.includes('keynote') || name.includes('canva')) {
      return <Palette className="w-3 h-3 text-zinc-400 shrink-0" />;
    }
    if (name.includes('confluence') || name.includes('markdown') || name.includes('gitbook')) {
      return <FileText className="w-3 h-3 text-zinc-400 shrink-0" />;
    }
    if (name.includes('visio') || name.includes('notion') || name.includes('buffer') || name.includes('hootsuite') || name.includes('loomly')) {
      return <Workflow className="w-3 h-3 text-zinc-400 shrink-0" />;
    }
    return <Settings className="w-3 h-3 text-zinc-400 shrink-0" />;
  };

  const getCategorySkills = (cat: string) => {
    switch (cat) {
      case "Technical Documentation":
        return ["ISO 13485 QMS", "Process Mapping", "Standard Operating Procedures", "API Documentation", "Developer Handbooks", "Technical Writing"];
      case "Social Media Management":
        return ["Campaign Strategy", "Content Curation", "LinkedIn Growth", "Audience Analytics", "Brand Persona Alignment", "Publishing Automation"];
      case "Graphic Design":
        return ["Investor Presentation Decks", "Corporate Brochure Layouts", "Art Poster Systems", "Packaging & Carton Labels", "Scalable Vector Branding", "Information Hierarchy"];
      case "Web Design & Development":
        return ["React Component Building", "Tailwind CSS Styling", "Aesthetic Fluid Prototyping", "Framer Motion Animations", "Client-Side State Engines", "Responsive Screen Architecture"];
      default:
        return ["Creative Layout", "Design Precision", "Professional Execution"];
    }
  };

  // Generate dynamic, context-aware writing for the editorial Case Study Modal
  const getCaseStudyDetails = (proj: Project) => {
    const category = proj.category;

    const defaults = {
      overview: proj.longDescription || proj.description || "A pristine architectural portfolio study showing high-end layout grids and deliberate content curation.",
      problem: "The client was struggling with a fragmented content approach, weak information hierarchy, and an unstructured visual aesthetic, which resulted in low community engagement and operational workflow overhead.",
      process: "We implemented a strict, human-centered review cycle. First, we conducted stakeholder interviews to define critical objectives. Second, we designed rigid grid structures and custom typography rules. Third, we integrated responsive modern components and subjected them to intensive visual validation testing.",
      solution: "We engineered a clean, grid-aligned digital layout system featuring high contrast typography, precise rounded corners, and a curated neutral color palette. This structure places visual prominence on the actual content, reducing noise and highlighting professional authority.",
      results: "The visual transformation resulted in an immediate 150% rise in organic reach and 100% positive feedback regarding information clarity and readability during focus group testing.",
      gallery: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
      ]
    };

    if (category === "Technical Documentation") {
      return {
        overview: proj.longDescription || proj.description,
        problem: "Critical operational protocols were highly fragmented across multiple text documents and local directories. The absence of standard visual frameworks led to confusion during team training and increased risks of audit failures.",
        process: "We conducted collaborative mapping workshops with team engineers, organized procedural hierarchies, and established strict Markdown formatting protocols with distinct diagnostic visual triggers.",
        solution: "Designed and implemented an industry-grade, compliant SOP structure featuring structured step-by-step job aids, unified terminology logs, and searchable index tables.",
        results: "Delivered 100% first-pass approval rating during compliance audits, reduced team training onboarding ramp-up times by 40%, and minimized operational friction.",
        gallery: []
      };
    } else if (category === "Social Media Management") {
      return {
        overview: proj.longDescription || proj.description,
        problem: "The brand suffered from an inconsistent publishing schedule, uncoordinated styling assets, and disconnected copy briefs that diluted market authority.",
        process: "We defined clear content pillars, created automated LinkedIn carousel templates, and established centralized scheduling databases with comprehensive analytics feedback.",
        solution: "Constructed high-value, educative multi-platform carousel sequences, managed daily brand voice moderation, and optimized publishing cadences for peak audience engagement.",
        results: "Grew organic brand impressions by 150%, achieved a steady 4.8% CTR on conversion pipelines, and cultivated an authentic, interactive follower base.",
        gallery: [
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
        ]
      };
    } else if (category === "Graphic Design") {
      return {
        overview: proj.longDescription || proj.description,
        problem: "The client's annual portfolio and pitch collateral lacked a unified graphic signature, suffering from crowded grid margins, chaotic font sizes, and excessive noise.",
        process: "We stripped away decorative details to focus on pure typography ratios, elegant asymmetrical grids, white space balancing, and pristine vector branding assets.",
        solution: "Crafted sleek investor pitch decks, corporate layouts, and print brochure catalogs following a timeless Swiss-inspired minimalist design scheme.",
        results: "Helped secure key capital funding rounds, established a lasting visual brand book, and elevated professional brand perception to a premium tier.",
        gallery: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541462608141-2ff030de4a40?q=80&w=800&auto=format&fit=crop"
        ]
      };
    } else if (category === "Web Design & Development") {
      return {
        overview: proj.longDescription || proj.description,
        problem: "Legacy web templates were slow, cluttered with heavy framework assets, and visually outdated, causing high user bounce rates.",
        process: "We drafted strict wireframes, coded lightweight, semantic React layout states, and focused on perfecting spring motion curves for high-rate interaction loops.",
        solution: "Created highly responsive web prototypes using React, Tailwind CSS utility spacing, and custom-tuned Framer Motion transitions for eye-pleasing user touchpoints.",
        results: "Delivered an ultra-clean, pixel-perfect digital showcase running at a solid 60fps, raising average visitor engagement time significantly.",
        gallery: [
          "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
        ]
      };
    }

    return defaults;
  };

  return (
    <section id="projects-section" className="pt-12 pb-14 bg-white border-y border-zinc-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Title & Horizontal Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 pb-6 md:pb-8 border-b border-zinc-200/50 gap-5">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">CURATED WORKS</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-zinc-950 tracking-tight font-bold">
              Selected <span className="font-sans font-extrabold italic text-zinc-800">Portfolio</span>
            </h2>
          </div>
          
          {/* Category Filters: Mobile Button & Popover Dropdown vs Desktop Pills */}
          <div className="w-full md:w-auto relative">
            {/* Mobile Category Selection Trigger Button */}
            <div className="md:hidden w-full space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-zinc-950 text-white rounded-xl shadow-xs text-xs font-medium transition-all active:scale-[0.99] cursor-pointer"
                aria-label="Filter categories"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-zinc-400 text-[10px] font-mono uppercase tracking-wider shrink-0">Category:</span>
                  <span className="truncate font-semibold text-white">{selectedCategory}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <ChevronDown className={`w-4 h-4 text-zinc-300 transition-transform duration-200 ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Mobile Category Dropdown Modal / Popover */}
              <AnimatePresence>
                {isMobileCategoryOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsMobileCategoryOpen(false)}
                      className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white border border-zinc-200 rounded-2xl shadow-xl p-2 z-50 md:hidden overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-zinc-100 flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">Switch Category</span>
                        <button
                          onClick={() => setIsMobileCategoryOpen(false)}
                          className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        {categories.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsMobileCategoryOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-zinc-950 text-white font-semibold'
                                  : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-zinc-300'}`} />
                                <span>{cat}</span>
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Quick-tap horizontal pill bar for instant access on mobile */}
              <div className="overflow-x-auto no-scrollbar -mx-6 px-6 py-0.5">
                <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Horizontal Pills (Medium & Large screens) */}
            <div className="hidden md:block overflow-x-auto no-scrollbar py-1">
              <div className="inline-flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/50 p-1 rounded-full whitespace-nowrap shrink-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Category Flow Row Layout */}
        <div className="space-y-32 font-sans">
          {filteredSections.map((section) => {
            const allProjects = section.getProjects();

            return (
              <div 
                key={section.id} 
                className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start relative border-t border-zinc-200/50 pt-16 mt-16 first:border-0 first:pt-0 first:mt-0"
              >
                {/* LEFT COLUMN: Sticky Category & Simple Overview (Width: 30%) */}
                <div className="w-full md:w-[30%] md:sticky md:top-24 space-y-4 pb-8 z-10">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block font-semibold">
                    {section.label}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 tracking-tight leading-tight">
                    {section.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans mt-2">
                    {section.intro}
                  </p>
                  <div className="h-px w-10 bg-zinc-200 my-4" />

                  {/* WORKFLOW PROCESS TIMELINE */}
                  {WORKFLOW_DATA[section.title] && (
                    <motion.div 
                      key={`workflow-${section.title}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="pt-6 border-t border-zinc-200/60 mt-6 space-y-3"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                          WORKFLOW PROCESS
                        </span>
                        <div className="h-px flex-1 bg-zinc-200/60" />
                      </div>

                      <div className="relative pl-1 space-y-4">
                        {WORKFLOW_DATA[section.title].map((step, idx, arr) => (
                          <div key={step.num} className="relative flex items-center gap-3.5 group">
                            {/* Thin connecting vertical line */}
                            {idx < arr.length - 1 && (
                              <div className="absolute left-[11px] top-6 bottom-[-16px] w-[1px] bg-zinc-200/80 group-hover:bg-zinc-400 transition-colors" />
                            )}

                            {/* Small numbered circle */}
                            <div className="w-6 h-6 rounded-full bg-zinc-950 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border border-zinc-800 shadow-2xs z-10 mt-0.5">
                              {step.num}
                            </div>

                            {/* Step Title */}
                            <div className="flex-1 pt-0.5">
                              <h4 className="text-xs font-semibold text-zinc-900 font-sans tracking-tight">
                                {step.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* RIGHT COLUMN: Straight-up Gallery Section (Width: 70%) */}
                <div className="w-full md:w-[70%]">
                  {section.title === 'Graphic Design' ? (() => {
                    const filteredGdProjects = allProjects.filter((p) => {
                      if (gdFilter === 'all') return true;
                      if (gdFilter === 'promotionals') {
                        return p.subGroup === 'promotionals' || p.tags?.includes('Promotionals');
                      }
                      if (gdFilter === 'posters') {
                        return p.subGroup === 'posters' || p.tags?.includes('Posters / Artworks');
                      }
                      if (gdFilter === 'thumbnails') {
                        return p.subGroup === 'thumbnails' || p.tags?.includes('Thumbnails');
                      }
                      return true;
                    });

                    const currentSpotlightProject = filteredGdProjects[gdSpotlightIndex % (filteredGdProjects.length || 1)] || filteredGdProjects[0];

                    const countAll = allProjects.length;
                    const countPromo = allProjects.filter(p => p.subGroup === 'promotionals' || p.tags?.includes('Promotionals')).length;
                    const countPosters = allProjects.filter(p => p.subGroup === 'posters' || p.tags?.includes('Posters / Artworks')).length;
                    const countThumbs = allProjects.filter(p => p.subGroup === 'thumbnails' || p.tags?.includes('Thumbnails')).length;

                    return (
                      <div className="space-y-6">
                        {/* Graphic Design Gallery Header & Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200/60">
                          {/* Sub-category Quick Filters */}
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                            {[
                              { id: 'all', label: 'All Work', count: countAll },
                              { id: 'promotionals', label: 'Promotionals', count: countPromo },
                              { id: 'posters', label: 'Posters / Artworks', count: countPosters },
                              { id: 'thumbnails', label: 'Thumbnails', count: countThumbs },
                            ].map((tab) => {
                              const isActive = gdFilter === tab.id;
                              return (
                                <button
                                  key={tab.id}
                                  onClick={() => {
                                    setGdFilter(tab.id as any);
                                    setGdSpotlightIndex(0);
                                  }}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                                    isActive
                                      ? 'bg-zinc-950 text-white font-semibold shadow-xs'
                                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                                  }`}
                                >
                                  <span>{tab.label}</span>
                                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-200/80 text-zinc-500'
                                  }`}>
                                    {tab.count}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="text-[11px] font-mono text-zinc-500 hidden sm:block">
                            {filteredGdProjects.length} {filteredGdProjects.length === 1 ? 'item' : 'items'}
                          </div>
                        </div>

                        {/* Content Presentation - Spotlight Showcase */}
                        {allProjects.length > 0 ? (
                          filteredGdProjects.length > 0 ? (
                            <div className="space-y-4">
                              {currentSpotlightProject && (
                                <div className="space-y-3">
                                  {/* Main Spotlight Card */}
                                  <div 
                                    onClick={() => setActiveCaseStudyProject(currentSpotlightProject)}
                                    className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl cursor-zoom-in group flex items-center justify-center"
                                  >
                                    <img
                                      src={currentSpotlightProject.image}
                                      alt={currentSpotlightProject.title}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                                    />

                                    {/* Previous / Next Arrow Controls */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setGdSpotlightIndex((prev) => (prev - 1 + filteredGdProjects.length) % filteredGdProjects.length);
                                      }}
                                      className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md cursor-pointer transition-all shadow-md active:scale-95 z-10"
                                      aria-label="Previous artwork"
                                    >
                                      <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setGdSpotlightIndex((prev) => (prev + 1) % filteredGdProjects.length);
                                      }}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md cursor-pointer transition-all shadow-md active:scale-95 z-10"
                                      aria-label="Next artwork"
                                    >
                                      <ChevronRight className="w-5 h-5" />
                                    </button>

                                    {/* Counter Badge */}
                                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono z-10">
                                      {(gdSpotlightIndex % filteredGdProjects.length) + 1} / {filteredGdProjects.length}
                                    </div>

                                    {/* Minimalist Fullscreen Expand Hint on Hover */}
                                    <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono shadow-md">
                                        <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
                                      </span>
                                    </div>
                                  </div>

                                  {/* Thumbnail Filmstrip Scrubber */}
                                  <div className="overflow-x-auto no-scrollbar py-2">
                                    <div className="flex items-center gap-2.5">
                                      {filteredGdProjects.map((p, idx) => {
                                        const isSelected = (gdSpotlightIndex % filteredGdProjects.length) === idx;
                                        return (
                                          <button
                                            key={p.id}
                                            onClick={() => setGdSpotlightIndex(idx)}
                                            className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                              isSelected 
                                                ? 'border-zinc-950 shadow-md scale-105 ring-2 ring-zinc-950/20' 
                                                : 'border-zinc-200 opacity-60 hover:opacity-100'
                                            }`}
                                          >
                                            <img
                                              src={p.image}
                                              alt={p.title}
                                              referrerPolicy="no-referrer"
                                              className="w-full h-full object-cover"
                                            />
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="py-12 px-6 rounded-2xl border border-dashed border-zinc-200 text-center flex flex-col items-center justify-center gap-2">
                              <p className="text-xs font-semibold text-zinc-600">No projects match this filter</p>
                              <button
                                onClick={() => setGdFilter('all')}
                                className="text-[11px] font-mono text-zinc-900 underline underline-offset-2 cursor-pointer"
                              >
                                View all graphic design work
                              </button>
                            </div>
                          )
                        ) : (
                          /* Clean, Modern Empty State Showcase */
                          <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-zinc-300/80 bg-gradient-to-b from-zinc-50/50 to-white text-center flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-2xs">
                              <Sparkle className="w-6 h-6 text-zinc-600" />
                            </div>
                            <div className="space-y-1.5 max-w-md">
                              <h4 className="text-sm sm:text-base font-bold text-zinc-900">
                                Spotlight Showcase Deck Ready
                              </h4>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                Curated gallery deck with auto-fitting for Posters (3:4) and Thumbnails (16:9).
                              </p>
                            </div>
                            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-100/80 px-3 py-1.5 rounded-full border border-zinc-200/60">
                              <span>Ready for your new images</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })() : (
                    allProjects.length > 0 ? (
                      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                        {(section.title === 'Social Media Management' || section.title === 'Web Design & Development' ? allProjects.slice(0, 2) : (section.title === 'Technical Documentation' ? allProjects.slice(0, 4) : allProjects.slice(0, 12))).map((proj) => (
                          <motion.div
                            key={proj.id}
                            onClick={() => setActiveCaseStudyProject(proj)}
                            className="group cursor-zoom-in overflow-hidden rounded-xl"
                            whileHover={{ scale: 1.04 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <div className={`relative overflow-hidden rounded-xl bg-zinc-50 border border-zinc-200/40 shadow-2xs group-hover:shadow-md transition-all duration-300 ${
                              section.title === 'Technical Documentation' || section.title === 'Web Design & Development' || proj.orientation === 'landscape' ? 'aspect-[16/10]' : 'aspect-[4/3]'
                            }`}>
                              {proj.video ? (
                                <video
                                  src={proj.video}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                                />
                              ) : (
                                <img
                                  src={proj.image}
                                  alt={proj.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-16 px-6 rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/50 text-center flex flex-col items-center justify-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-1">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-semibold text-zinc-700">No images currently uploaded</p>
                        <p className="text-[11px] text-zinc-400 max-w-xs">Ready for your new project images.</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FULLSCREEN MINIMALIST IMAGE LIGHTBOX VIEW */}
        <AnimatePresence>
          {activeCaseStudyProject && (() => {
            const isSocialMedia = activeCaseStudyProject.category === 'Social Media Management' || activeCaseStudyProject.id.startsWith('sm-');
            const isGraphicDesign = activeCaseStudyProject.category === 'Graphic Design' || activeCaseStudyProject.id.startsWith('gd-');
            const isTechDoc = activeCaseStudyProject.category === 'Technical Documentation' || activeCaseStudyProject.id.startsWith('td-') || activeCaseStudyProject.id === 'qms-doc';
            const galleryImages = (isSocialMedia || isTechDoc) ? getGalleryImages(activeCaseStudyProject) : [];
            
            return (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
                {/* Dark backdrop click-to-close */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveCaseStudyProject(null)}
                  className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md cursor-zoom-out"
                />

                {/* Close button */}
                <button
                  onClick={() => setActiveCaseStudyProject(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all border border-white/20 shadow-lg hover:scale-105 active:scale-90 cursor-pointer flex items-center justify-center"
                  title="Close viewer"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image container with fluid entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 max-w-5xl max-h-[88vh] w-full flex flex-col items-center justify-center select-none pointer-events-auto"
                >
                  {(isSocialMedia || isTechDoc) ? (
                    <div className="relative w-full flex flex-col items-center justify-center max-w-4xl px-2 sm:px-12">
                      {/* Image Counter (Page Number) */}
                      <div className="mb-2 sm:mb-4 text-center px-2">
                        <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                          {activeImageIndex + 1} of {galleryImages.length}
                        </span>
                      </div>

                      {/* Active Image with arrows */}
                      <div 
                        className="relative flex items-center justify-center w-full aspect-[4/3] sm:aspect-[16/10] max-h-[55vh] sm:max-h-[60vh] bg-black/40 rounded-2xl border border-white/10 overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={() => handleTouchEnd(galleryImages.length)}
                      >
                        {/* Left Arrow */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                          }}
                          className="absolute left-2 sm:left-4 z-20 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
                          title="Previous Image"
                          aria-label="Previous Image"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Image Viewer */}
                        <div className="w-full h-full flex items-center justify-center p-2 sm:p-3">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={activeImageIndex}
                              src={galleryImages[activeImageIndex]}
                              alt={`Image ${activeImageIndex + 1}`}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              referrerPolicy="no-referrer"
                              className="rounded-xl max-h-full max-w-full object-contain pointer-events-auto"
                            />
                          </AnimatePresence>
                        </div>

                        {/* Right Arrow */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
                          }}
                          className="absolute right-2 sm:right-4 z-20 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
                          title="Next Image"
                          aria-label="Next Image"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>

                      {/* Dot Indicators */}
                      <div className="flex items-center gap-2 mt-4 sm:mt-6">
                        {galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                              activeImageIndex === idx 
                                ? 'bg-white w-6 shadow-sm' 
                                : 'bg-white/30 hover:bg-white/60 w-2'
                            }`}
                            title={`Go to image ${idx + 1}`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : isGraphicDesign ? (() => {
                    const isPortrait = activeCaseStudyProject.orientation === 'portrait';
                    const currentIndex = GRAPHIC_DESIGN_16_PROJECTS.findIndex(p => p.id === activeCaseStudyProject.id);
                    const totalCount = GRAPHIC_DESIGN_16_PROJECTS.length;

                    if (totalCount === 0) {
                      return (
                        <div className="relative w-full flex flex-col items-center justify-center transition-all duration-300 px-1 sm:px-8 max-w-4xl">
                          <div className="mb-2 sm:mb-4 text-center px-2">
                            <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                              1 of 1
                            </span>
                          </div>
                          <img
                            src={activeCaseStudyProject.image}
                            alt={activeCaseStudyProject.title}
                            referrerPolicy="no-referrer"
                            className="rounded-xl max-h-[60vh] sm:max-h-[75vh] w-auto max-w-full object-contain border border-white/10 shadow-2xl"
                          />
                        </div>
                      );
                    }

                    return (
                      <div className={`relative w-full flex flex-col items-center justify-center transition-all duration-300 px-1 sm:px-8 ${
                        isPortrait ? 'max-w-2xl sm:max-w-3xl' : 'max-w-4xl sm:max-w-5xl md:max-w-6xl'
                      }`}>
                        {/* Image Counter (Page Number) above the image */}
                        <div className="mb-2 sm:mb-4 text-center px-2">
                          <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                            {currentIndex + 1} of {totalCount}
                          </span>
                        </div>

                        {/* Image container adapting to orientation */}
                        <div 
                          className={`relative flex items-center justify-center w-full bg-zinc-950/80 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl transition-all duration-300 ${
                            isPortrait 
                              ? 'h-[55vh] sm:h-[68vh] md:h-[72vh] p-2 sm:p-6 md:p-8' 
                              : 'h-[44vh] sm:h-[58vh] md:h-[64vh] p-2 sm:p-6 md:p-8'
                          }`}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={() => handleTouchEnd(totalCount)}
                        >
                          {/* Left Arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentIndex !== -1) {
                                const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
                                setActiveCaseStudyProject(GRAPHIC_DESIGN_16_PROJECTS[prevIndex]);
                              }
                            }}
                            className="absolute left-2 sm:left-4 z-20 min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                            title="Previous Image"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>

                          {/* Image Viewer with object-fit: contain */}
                          <div className="w-full h-full flex items-center justify-center">
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={activeCaseStudyProject.id}
                                src={activeCaseStudyProject.image}
                                alt={activeCaseStudyProject.title}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                referrerPolicy="no-referrer"
                                className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-auto rounded-lg shadow-2xl"
                              />
                            </AnimatePresence>
                          </div>

                          {/* Right Arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentIndex !== -1) {
                                const nextIndex = (currentIndex + 1) % totalCount;
                                setActiveCaseStudyProject(GRAPHIC_DESIGN_16_PROJECTS[nextIndex]);
                              }
                            }}
                            className="absolute right-2 sm:right-4 z-20 min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                            title="Next Image"
                            aria-label="Next Image"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                      </div>
                    );
                  })() : isTechDoc ? (() => {
                    const currentIndex = TECH_DOC_4_PROJECTS.findIndex(p => p.id === activeCaseStudyProject.id);
                    const totalCount = TECH_DOC_4_PROJECTS.length;

                    return (
                      <div className="relative w-full flex flex-col items-center justify-center transition-all duration-300 px-1 sm:px-8 max-w-4xl sm:max-w-5xl md:max-w-6xl">
                        {/* Image Counter (Page Number) above the image */}
                        <div className="mb-2 sm:mb-4 text-center px-2">
                          <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                            {currentIndex !== -1 ? currentIndex + 1 : 1} of {totalCount || 1}
                          </span>
                        </div>

                        {/* Image container */}
                        <div 
                          className="relative flex items-center justify-center w-full bg-zinc-950/80 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl transition-all duration-300 h-[48vh] sm:h-[62vh] md:h-[70vh] p-2 sm:p-6 md:p-8"
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={() => handleTouchEnd(totalCount)}
                        >
                          {/* Left Arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentIndex !== -1) {
                                const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
                                setActiveCaseStudyProject(TECH_DOC_4_PROJECTS[prevIndex]);
                              }
                            }}
                            className="absolute left-2 sm:left-4 z-20 min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                            title="Previous Image"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>

                          {/* Image Viewer */}
                          <div className="w-full h-full flex items-center justify-center">
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={activeCaseStudyProject.id}
                                src={activeCaseStudyProject.image}
                                alt={activeCaseStudyProject.title}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                referrerPolicy="no-referrer"
                                className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-auto rounded-lg shadow-2xl"
                              />
                            </AnimatePresence>
                          </div>

                          {/* Right Arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentIndex !== -1) {
                                const nextIndex = (currentIndex + 1) % totalCount;
                                setActiveCaseStudyProject(TECH_DOC_4_PROJECTS[nextIndex]);
                              }
                            }}
                            className="absolute right-2 sm:right-4 z-20 min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                            title="Next Image"
                            aria-label="Next Image"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                      </div>
                    );
                  })() : (
                    <>
                      <div className="mb-2 sm:mb-4 text-center px-2">
                        <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                          1 of 1
                        </span>
                      </div>
                      {activeCaseStudyProject.video ? (
                        <video
                          src={activeCaseStudyProject.video}
                          controls
                          autoPlay
                          loop
                          playsInline
                          className="rounded-xl max-h-[60vh] sm:max-h-[75vh] w-auto max-w-full object-contain border border-white/10 shadow-2xl"
                        />
                      ) : (
                        <img
                          src={activeCaseStudyProject.image}
                          alt={activeCaseStudyProject.title}
                          referrerPolicy="no-referrer"
                          className="rounded-xl max-h-[60vh] sm:max-h-[75vh] w-auto max-w-full object-contain border border-white/10 shadow-2xl"
                        />
                      )}
                      
                      {/* Explore Website Button (Only for Web Design & Development category) */}
                      {(activeCaseStudyProject.category === 'Web Design & Development' || activeCaseStudyProject.id.startsWith('wd-')) && (
                        <div className="mt-5 w-full flex justify-center">
                          <a
                            href={activeCaseStudyProject.link || 'https://example.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 pointer-events-auto cursor-pointer"
                            id="explore-website-btn"
                          >
                            <span>Explore Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>

        {/* CREATE NEW CASE BUILDER MODAL */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="fixed inset-0 bg-zinc-950/60"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl z-10 flex flex-col p-6 sm:p-8"
              >
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-zinc-900" />
                  <h3 className="text-xl font-serif text-zinc-950 font-bold tracking-tight">
                    Publish Reference Case
                  </h3>
                </div>

                <form onSubmit={handleCreateProjectSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 mb-1 font-semibold uppercase">PROJECT NAME *</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Zen Meditation Portal"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 mb-1 font-semibold uppercase">CLIENT NAME</label>
                      <input
                        type="text"
                        value={newClient}
                        onChange={(e) => setNewClient(e.target.value)}
                        placeholder="e.g. Boutique Agency"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 mb-1 font-semibold uppercase">SERVICE CATEGORY</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50 font-mono text-[11px]"
                      >
                        <option value="Technical Documentation">Technical Documentation</option>
                        <option value="Social Media Management">Social Media Management</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Design & Development">Web Design & Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 mb-1 font-semibold uppercase">TAGS (COMMA SEPARATED)</label>
                      <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        placeholder="React, CSS Grid, Figma"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-zinc-400 mb-1.5 font-semibold uppercase">
                      PROJECT IMAGE (FIREBASE STORAGE UPLOAD OR URL)
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-xl border border-dashed border-zinc-300 hover:border-zinc-950 bg-zinc-50/50 hover:bg-zinc-100/50 transition-colors">
                          {isUploadingImage ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-600" />
                              <span className="text-zinc-600 font-medium">Uploading to Storage...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5 text-zinc-600" />
                              <span className="text-zinc-700 font-medium">Choose Local File to Upload</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingImage}
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <input
                        type="url"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="Or enter image URL (https://...)"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50"
                      />

                      {newImage && (
                        <div className="relative w-full h-28 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 group">
                          <img src={newImage} alt="Uploaded Preview" className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 bg-zinc-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-xs">
                            Preview
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-zinc-400 mb-1 font-semibold uppercase">SHORT SUMMARY *</label>
                    <textarea
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Brief 1-2 sentence description..."
                      rows={2}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-zinc-400 mb-1 font-semibold uppercase">COMPREHENSIVE CASE STUDY TEXT (OPTIONAL)</label>
                    <textarea
                      value={newLongDesc}
                      onChange={(e) => setNewLongDesc(e.target.value)}
                      placeholder="Explain the background, challenges solved, and solutions delivered..."
                      rows={3}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-950 bg-zinc-50/50"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-xl text-zinc-500 hover:bg-zinc-50 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Publish Project Reference
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* Premium Horizontal Image Ribbon Section */}
      <div className="mt-10 pt-8 border-t border-zinc-100/80 w-full overflow-hidden">
        {/* "creative process" title header above the ribbon */}
        <div className="flex items-center justify-center gap-3 mb-4 max-w-xl mx-auto px-4">
          <div className="h-px flex-1 bg-zinc-200/60" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
            creative process
          </span>
          <div className="h-px flex-1 bg-zinc-200/60" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full overflow-hidden"
          >
            {/* Style block for the infinite left-to-right linear scrolling marquee */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee-left-to-right {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              .animate-marquee-ltr {
                animation: marquee-left-to-right 38s linear infinite;
              }
              .animate-marquee-ltr:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Premium left and right ambient fade gradients to mask the edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div className="flex w-max gap-4 animate-marquee-ltr py-4 px-4 justify-center mx-auto">
              {(RIBBON_IMAGES[selectedCategory] ? [
                ...RIBBON_IMAGES[selectedCategory], 
                ...RIBBON_IMAGES[selectedCategory], 
                ...RIBBON_IMAGES[selectedCategory], 
                ...RIBBON_IMAGES[selectedCategory]
              ] : []).map((src, idx) => (
                <div
                  key={`${selectedCategory}-${idx}`}
                  onClick={() => {
                    setActiveCaseStudyProject({
                      id: `ribbon-${selectedCategory}-${idx}`,
                      title: `${selectedCategory} - Creative Process ${(idx % (RIBBON_IMAGES[selectedCategory]?.length || 1)) + 1}`,
                      category: selectedCategory,
                      client: "Creative Process",
                      year: "2026",
                      description: "Behind-the-scenes creative process and workflow reference frame.",
                      tags: ["Creative Process"],
                      image: src,
                      orientation: "landscape"
                    });
                    setActiveImageIndex(0);
                  }}
                  className="w-[90px] h-[60px] rounded-[18px] overflow-hidden border border-zinc-200/60 shadow-xs hover:scale-105 hover:-translate-y-[3px] hover:shadow-md transition-all duration-[250ms] ease-out shrink-0 bg-zinc-50 cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt={`Creative process item ${idx}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
