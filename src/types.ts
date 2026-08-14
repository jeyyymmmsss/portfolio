export interface Project {
  id: string;
  title: string;
  category: 'Technical Documentation' | 'Social Media Management' | 'Graphic Design' | 'Web Design & Development';
  year: string;
  client: string;
  description: string;
  image: string;
  video?: string;
  images?: string[];
  longDescription?: string;
  tags: string[];
  link?: string;
  orientation?: 'landscape' | 'portrait';
  subGroup?: 'promotionals' | 'posters' | 'thumbnails';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
}
