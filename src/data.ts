import { Project, Service, ExperienceItem } from './types';

export const INITIAL_PROFILE = {
  name: "James Ramirez",
  title: "Aesthetic Specialist & Indie Vibe Coder",
  location: "Manila, Philippines",
  bio: "Delivering high-fidelity results across Graphic Design, Social Media Management, Web Design & Development, and Technical Documentation. Committed to clean layouts, delightful micro-animations, and striking visual design.",
  available: true,
  email: "jamesbrianramirezzz@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    readcv: "https://read.cv"
  }
};

export const SERVICES: Service[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Graphic design focused on impact, clarity, and visual storytelling. My work includes sports posters, event graphics, thumbnails, promotional materials, and branding assets created with strong typography, composition, and a consistent visual identity.",
    iconName: "Palette",
    deliverables: ["Sports Posters & Event Graphics", "Promotional Materials & Branding Assets", "Digital Marketing & Thumbnails", "Visual Identity & Typography"]
  },
  {
    id: "social-mgmt",
    title: "Social Media Management",
    description: "Content planning, account management, content strategy, scheduling, audience engagement, analytics, and brand growth across social media platforms.",
    iconName: "Share2",
    deliverables: ["Content Planning & Strategy", "Multi-Platform Administration", "Scheduling & Automation Systems", "Audience Metrics & Analytics"]
  },
  {
    id: "web-design-dev",
    title: "Web Design & Development",
    description: "Aesthetic, highly interactive, and vibe-driven landing pages, personal websites, and responsive React prototypes designed to stand out.",
    iconName: "Globe",
    deliverables: ["Aesthetic Single-Page Prototypes", "Vibe-Driven Personal Portfolios", "Interactive Visual Landing Pages", "Fluid Transitions & UI Playgrounding"]
  },
  {
    id: "tech-doc",
    title: "Technical Documentation",
    description: "Professional documentation including Standard Operating Procedures (SOPs), Work Instructions, User Manuals, Process Documentation, Job Aids, and Quality Management System (QMS) documents.",
    iconName: "FileText",
    deliverables: ["SOP & QMS Creation", "User Manuals & Work Instructions", "Process Optimization & Job Aids", "Regulatory & Audit Compliance"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "marketing-kit",
    title: "₱1,000,000.00 Day #3 Squid Game Thumbnail",
    category: "Graphic Design",
    year: "2026",
    client: "YouTube Content Creators",
    description: "High-impact, cinematic YouTube thumbnail featuring Squid Game player #067, glowing ₱1,000,000.00 currency text, and dramatic color grading.",
    longDescription: "Designed a viral, high-CTR YouTube video thumbnail graphic leveraging popular culture themes, bold glowing typography, dynamic character cutouts, and custom visual effects.",
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785313721/1_riyik4.png",
    tags: ["YouTube Thumbnail", "Squid Game", "Graphic Design", "Viral Marketing"],
    link: "#"
  },
  {
    id: "social-growth",
    title: "Multi-Channel Brand Growth Campaign",
    category: "Social Media Management",
    year: "2025",
    client: "Aether Cosmetics",
    description: "Structured a cohesive 12-month social media content plan, account management pipeline, and data-driven scheduling that grew organic brand reach by 150%.",
    longDescription: "Managed complete multi-platform social media accounts, executing a structured content plan, editorial calendar, and automated publishing pipeline. Analyzed audience engagement and metrics to refine high-performance content strategy, successfully driving audience growth and direct customer retention.",
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785942207/1_oyotgl.png",
    tags: ["Content Strategy", "Scheduling Automation", "Audience Engagement", "Analytics"],
    link: "#"
  },
  {
    id: "vibe-visualizer",
    title: "Interactive Ambient Sound & Visualizer Station",
    category: "Web Design & Development",
    year: "2026",
    client: "Personal Lab Project",
    description: "An immersive web-based audio experiment with real-time responsive visualization, custom themes, and beautiful modern CSS shaders.",
    longDescription: "Just starting my web coding journey and wanted to build something with absolute vibes! This is a single-screen audio-reactive canvas that loops ambient soundscapes. Built with React and customized with premium Tailwind utility classes and interactive spring physics animations for extreme satisfying feedback.",
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785313721/6_b0snle.png",
    tags: ["Vibe Coding", "Tailwind CSS", "Motion", "UI Experiments"],
    link: "#"
  },
  {
    id: "qms-doc",
    title: "QMS & Compliance Documentation Suite",
    category: "Technical Documentation",
    year: "2026",
    client: "MedTech Innovations",
    description: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
    longDescription: "A curated selection of technical documentation created across quality management, compliance, and operational documentation projects. The samples shown here represent only a small portion of the documentation I developed and maintained, with sensitive information redacted to protect confidential company information.",
    image: "https://res.cloudinary.com/zaunf8hr/image/upload/v1785947264/1_vm88jx.png",
    tags: ["SOPs", "User Manuals", "Process Mapping", "Compliance"],
    link: "#"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Interactive Engineer",
    company: "Studio Editorial Zurich",
    period: "2024 - Present",
    description: "Leading the development of high-fidelity client portfolios and modern headless CMS web apps. Established the studio's internal React motion-token system."
  },
  {
    id: "exp-2",
    role: "UI & Web Developer",
    company: "Aether Agency Berlin",
    period: "2022 - 2024",
    description: "Designed and engineered bespoke landing pages for technology start-ups. Integrated custom WebGL interactions and optimized load performance to sub-second speeds."
  },
  {
    id: "exp-3",
    role: "Freelance Graphic Designer & Developer",
    company: "Self-Employed",
    period: "2020 - 2022",
    description: "Created elegant brand systems, typography packages, and responsive Webflow/React landing pages for boutique galleries, architectural firms, and publishers."
  }
];
