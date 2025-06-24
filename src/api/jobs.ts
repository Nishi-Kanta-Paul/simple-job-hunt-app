
import { Job } from '../context/AppContext';

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'We are looking for a passionate Senior Frontend Developer to join our dynamic team. You will be responsible for developing high-quality web applications using modern JavaScript frameworks.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'State management (Redux/Context)', 'REST API integration'],
    posted: '2 days ago',
    logo: '🚀',
    category: 'Engineering',
    featured: true,
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90k - $120k',
    description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and engineers to bring ideas to life.',
    requirements: ['3+ years design experience', 'Figma expertise', 'User research skills', 'Prototyping abilities'],
    posted: '1 day ago',
    logo: '🎨',
    category: 'Design',
    featured: false,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Remote',
    salary: '$100k - $130k',
    description: 'We need a skilled DevOps Engineer to help us scale our infrastructure and improve our deployment processes. Experience with AWS and containerization is essential.',
    requirements: ['AWS certification', 'Docker & Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
    posted: '3 days ago',
    logo: '☁️',
    category: 'Engineering',
    featured: true,
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$70k - $90k',
    description: 'Lead our marketing efforts and drive user acquisition. You will develop and execute marketing strategies across multiple channels.',
    requirements: ['Digital marketing experience', 'Analytics tools proficiency', 'Content creation skills', 'Growth hacking mindset'],
    posted: '1 week ago',
    logo: '📈',
    category: 'Marketing',
    featured: false,
  },
  {
    id: '5',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Contract',
    salary: '$80 - $120/hour',
    description: 'Join our startup as a contract full-stack developer. You will work on various projects and help build our MVP from the ground up.',
    requirements: ['Node.js & React', 'Database design', 'API development', 'Startup experience'],
    posted: '5 days ago',
    logo: '💻',
    category: 'Engineering',
    featured: false,
  },
  {
    id: '6',
    title: 'UX Researcher',
    company: 'ResearchLab',
    location: 'Seattle, WA',
    type: 'Part-time',
    salary: '$60k - $80k',
    description: 'Conduct user research to inform product decisions. You will plan and execute research studies, analyze data, and present insights to stakeholders.',
    requirements: ['Research methodology', 'Data analysis skills', 'Survey design', 'Presentation skills'],
    posted: '4 days ago',
    logo: '🔍',
    category: 'Design',
    featured: false,
  },
];

export const fetchJobs = async (): Promise<Job[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockJobs;
};

export const fetchJobById = async (id: string): Promise<Job | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockJobs.find(job => job.id === id) || null;
};
