// Global constants and configuration for the portfolio
import {
  Code2,
  Smartphone,
  Globe,
  FileText,
  Zap,
  Settings,
  Lightbulb,
  CheckCircle,
  Palette,
  Database,
  Layers,
  Link2,
} from 'lucide-react';

export const PERSONAL = {
  name: 'Ndi Raoul',
  title: 'Full Stack Software Developer | Technical Writer',
  email: 'ndiraoul83@gmail.com',
  phone: '+237 683 435 813',
  location: 'Buea, Cameroon',
  description:
    'Full Stack Developer passionate about creating beautiful, functional digital experiences with cutting-edge web technologies.',
  experience: '4+',
  yearsExperience: 4,
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/NdiRaoul',
  linkedin: 'https://www.linkedin.com/in/ndi-raoul-bb7285230',
  twitter: 'https://x.com/Bobycruz10',
};

export const MISSION_VISION = {
  part1: 'Building digital solutions focused on ',
  part2: 'Committed to excellence, one line of code at a time.',
  animatedWords: ['Innovation', 'Excellence', 'Creativity', 'Impact', 'Growth'],
};

export const SKILLS = {
  languages: ['JavaScript', 'TypeScript', 'Dart', 'PHP', 'HTML5', 'CSS'],
  frontend: [
    'React',
    'Next.js',
    'React Native',
    'Flutter',
    'Tailwind CSS',
    'SASS',
    'Bootstrap',
    'Framer Motion',
    'Three.js',
    'Vite',
    'Redux',
  ],
  backend: [
    'Node.js',
    'Express.js',
    'Firebase',
    'PostgreSQL',
    'MongoDB',
    'Prisma',
    'Supabase',
    'SQL',
  ],
  tools: [
    'Git',
    'Postman',
    'JWT',
    'NPM',
    'Nodemon',
    'Chart.js',
    'AWS',
    'Netlify',
    'Vercel',
    'Render',
    'Apache',
    'WordPress',
    'Expo',
  ],
};

// React Icons Imports
import { 
  SiJavascript, SiTypescript, SiDart, SiPhp, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiFlutter, SiTailwindcss, SiSass, SiBootstrap, SiFramer, SiThreedotjs, SiVite, SiRedux,
  SiNodedotjs, SiExpress, SiFirebase, SiPostgresql, SiMongodb, SiPrisma, SiSupabase, SiMysql,
  SiGit, SiPostman, SiJsonwebtokens, SiNpm, SiNodemon, SiChartdotjs, SiAmazon, SiNetlify, SiVercel, SiRender, SiApache, SiWordpress, SiExpo
} from 'react-icons/si';

// Define the Icon Type properly for usage in components
import { IconType } from 'react-icons';

// Skill Icons Mapping
export const SKILL_ICONS: Record<string, IconType> = {
  // Languages
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Dart': SiDart,
  'PHP': SiPhp,
  'HTML5': SiHtml5,
  'CSS': SiCss3,

  // Frontend
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'React Native': SiReact, // React Native uses React icon
  'Flutter': SiFlutter,
  'Tailwind CSS': SiTailwindcss,
  'SASS': SiSass,
  'Bootstrap': SiBootstrap,
  'Framer Motion': SiFramer,
  'Three.js': SiThreedotjs,
  'Vite': SiVite,
  'Redux': SiRedux,

  // Backend
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'Firebase': SiFirebase,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'Prisma': SiPrisma,
  'Supabase': SiSupabase,
  'SQL': SiMysql, // Using MySQL icon for generic SQL

  // Tools
  'Git': SiGit,
  'Postman': SiPostman,
  'JWT': SiJsonwebtokens,
  'NPM': SiNpm,
  'Nodemon': SiNodemon,
  'Chart.js': SiChartdotjs,
  'AWS': SiAmazon,
  'Netlify': SiNetlify,
  'Vercel': SiVercel,
  'Render': SiRender,
  'Apache': SiApache,
  'WordPress': SiWordpress,
  'Expo': SiExpo,
};

// Official brand colors (hex). Monochrome brands that are pure black/dark
// (Next.js, Vercel, Express, Three.js, JWT, Prisma, Expo) use their on-dark
// white variant so they stay visible on the dark default theme.
export const SKILL_COLORS: Record<string, string> = {
  // Languages
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Dart': '#0175C2',
  'PHP': '#777BB4',
  'HTML5': '#E34F26',
  'CSS': '#1572B6',

  // Frontend
  'React': '#61DAFB',
  'Next.js': '#FFFFFF',
  'React Native': '#61DAFB',
  'Flutter': '#02569B',
  'Tailwind CSS': '#06B6D4',
  'SASS': '#CC6699',
  'Bootstrap': '#7952B3',
  'Framer Motion': '#0055FF',
  'Three.js': '#FFFFFF',
  'Vite': '#646CFF',
  'Redux': '#764ABC',

  // Backend
  'Node.js': '#5FA04E',
  'Express.js': '#FFFFFF',
  'Firebase': '#FFCA28',
  'PostgreSQL': '#4169E1',
  'MongoDB': '#47A248',
  'Prisma': '#FFFFFF',
  'Supabase': '#3FCF8E',
  'SQL': '#4479A1',

  // Tools
  'Git': '#F05032',
  'Postman': '#FF6C37',
  'JWT': '#FFFFFF',
  'NPM': '#CB3837',
  'Nodemon': '#76D04B',
  'Chart.js': '#FF6384',
  'AWS': '#FF9900',
  'Netlify': '#00C7B7',
  'Vercel': '#FFFFFF',
  'Render': '#46E3B7',
  'Apache': '#D22128',
  'WordPress': '#21759B',
  'Expo': '#FFFFFF',
};

// Official downloaded logo files (in /public/logos). Sourced from Devicon
// (full-color official logos) with Simple Icons fallbacks for monochrome /
// uncovered brands. See public/logos/*.svg.
export const SKILL_LOGOS: Record<string, string> = {
  // Languages
  'JavaScript': '/logos/javascript.svg',
  'TypeScript': '/logos/typescript.svg',
  'Dart': '/logos/dart.svg',
  'PHP': '/logos/php.svg',
  'HTML5': '/logos/html5.svg',
  'CSS': '/logos/css.svg',

  // Frontend
  'React': '/logos/react.svg',
  'Next.js': '/logos/nextjs.svg',
  'React Native': '/logos/reactnative.svg',
  'Flutter': '/logos/flutter.svg',
  'Tailwind CSS': '/logos/tailwindcss.svg',
  'SASS': '/logos/sass.svg',
  'Bootstrap': '/logos/bootstrap.svg',
  'Framer Motion': '/logos/framermotion.svg',
  'Three.js': '/logos/threejs.svg',
  'Vite': '/logos/vite.svg',
  'Redux': '/logos/redux.svg',

  // Backend
  'Node.js': '/logos/nodejs.svg',
  'Express.js': '/logos/expressjs.svg',
  'Firebase': '/logos/firebase.svg',
  'PostgreSQL': '/logos/postgresql.svg',
  'MongoDB': '/logos/mongodb.svg',
  'Prisma': '/logos/prisma.svg',
  'Supabase': '/logos/supabase.svg',
  'SQL': '/logos/sql.svg',

  // Tools
  'Git': '/logos/git.svg',
  'Postman': '/logos/postman.svg',
  'JWT': '/logos/jwt.svg',
  'NPM': '/logos/npm.svg',
  'Nodemon': '/logos/nodemon.svg',
  'Chart.js': '/logos/chartjs.svg',
  'AWS': '/logos/aws.svg',
  'Netlify': '/logos/netlify.svg',
  'Vercel': '/logos/vercel.svg',
  'Render': '/logos/render.svg',
  'Apache': '/logos/apache.svg',
  'WordPress': '/logos/wordpress.svg',
  'Expo': '/logos/expo.svg',
};

export const SERVICES = [
  {
    title: 'Web Development',
    description:
      'Building modern, responsive websites with React, Next.js, and cutting-edge web technologies',
    icon: Code2,
  },
  {
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps with React Native and Flutter for iOS and Android',
    icon: Smartphone,
  },
  {
    title: 'Backend & API',
    description: 'Robust server solutions with Node.js, Express, Firebase, and PostgreSQL',
    icon: Globe,
  },
  {
    title: 'Technical Writing',
    description:
      'Clear documentation, guides, and technical content for developers and teams',
    icon: FileText,
  },
  {
    title: 'Flutter Development',
    description:
      'Native mobile applications with beautiful UI, smooth animations, and high performance',
    icon: Zap,
  },
  {
    title: 'React Native Development',
    description:
      'JavaScript-based mobile solutions for iOS and Android with native capabilities',
    icon: Settings,
  },
  {
    title: 'Consulting & Strategy',
    description:
      'Expert guidance on technology selection, architecture, and development best practices',
    icon: Lightbulb,
  },
  {
    title: 'Code Review & Optimization',
    description:
      'Performance audits, code quality reviews, and optimization recommendations',
    icon: CheckCircle,
  },
  {
    title: 'UI/UX Development',
    description:
      'Beautiful, responsive interfaces with Tailwind CSS, animations, and 3D effects',
    icon: Palette,
  },
  {
    title: 'Database Design',
    description:
      'Efficient database architecture with PostgreSQL, MongoDB, Firebase, and Prisma',
    icon: Database,
  },
  {
    title: 'DevOps & Deployment',
    description:
      'Infrastructure setup, CI/CD pipelines, and deployment on Vercel, Netlify, and AWS',
    icon: Layers,
  },
  {
    title: 'API Integration',
    description:
      'Third-party API integration, RESTful APIs, real-time data synchronization',
    icon: Link2,
  },
];

export const PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory',
    technologies: ['Next.js', 'Firebase', 'Stripe', 'Tailwind CSS'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com',
    },
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    technologies: ['React', 'TypeScript', 'Firebase', 'Framer Motion'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com',
    },
    featured: true,
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: '3D animated portfolio with Three.js',
    technologies: ['Next.js', 'Three.js', 'GSAP', 'Tailwind CSS'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com',
    },
  },
  {
    id: '4',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization and analytics',
    technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com',
    },
  },
  {
    id: '5',
    title: 'Social Media App',
    description: 'Social networking platform with real-time features',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Socket.io'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com',
    },
  },
  {
    id: '6',
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot with NLP capabilities',
    technologies: ['React', 'Node.js', 'OpenAI', 'Tailwind CSS'],
    links: {
      demo: 'https://example.com',
      github: 'https://github.com',
    },
  },
];

export const EXPERIENCE = [
  {
    position: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc',
    period: '2024 - Present',
    startYear: 2024,
    endYear: 2026,
    location: 'Remote',
    isRemote: true,
    yearsWorked: 2,
    description: 'Leading development of scalable web applications',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    responsibilities: [
      'Architect and develop full-stack solutions',
      'Lead code reviews and maintain quality standards',
      'Mentor junior developers and conduct interviews',
    ],
    achievements: [
      'Improved performance by 40%',
      'Led migration to Next.js (60% faster)',
      'Mentored 5+ junior developers',
    ],
  },
  {
    position: 'Full Stack Developer',
    company: 'Digital Solutions Ltd',
    period: '2023 - 2024',
    startYear: 2023,
    endYear: 2024,
    location: 'On-site',
    isRemote: false,
    yearsWorked: 1,
    description: 'Developed and maintained multiple client projects',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    responsibilities: [
      'Build responsive web applications',
      'Implement backend APIs with Node.js',
      'Collaborate with designers',
    ],
    achievements: [
      'Delivered 8+ projects on time',
      '98% client satisfaction',
      'Reduced bugs by 35%',
    ],
  },
  {
    position: 'Frontend Developer',
    company: 'Creative Agency Pro',
    period: '2022 - 2023',
    startYear: 2022,
    endYear: 2023,
    location: 'Hybrid',
    isRemote: true,
    yearsWorked: 1,
    description: 'Created interactive web experiences',
    technologies: ['React', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
    responsibilities: [
      'Develop interactive UI with React',
      'Implement complex animations',
      'Optimize web performance',
    ],
    achievements: [
      'Award-winning designs',
      'SEO ranking 50th to 5th',
      'Load time reduced by 50%',
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    position: 'Product Manager',
    company: 'Tech Innovations',
    quote:
      'Working with this developer was an absolute pleasure. Exceptional results delivered on time.',
    image: '/images/avatar.jpeg',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    position: 'CEO',
    company: 'StartUp Hub',
    quote:
      'Outstanding professionalism and technical expertise. Transformed our vision into a product users love.',
    image: '/images/avatar.jpeg',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    position: 'Design Lead',
    company: 'Creative Agency',
    quote:
      'Excellent communication and attention to detail. Brought our designs to life beautifully.',
    image: '/images/avatar.jpeg',
    rating: 4,
  },
  {
    name: 'David Martinez',
    position: 'CTO',
    company: 'Enterprise Solutions',
    quote:
      'A true professional with deep understanding of frontend and backend. Highly recommended.',
    image: '/images/avatar.jpeg',
    rating: 5,
  },
];

// CV Download Path
export const CV_PATH = '/cv/resume.pdf';
export const CV_FILENAME = 'Ndi_Raoul_CV.pdf';
