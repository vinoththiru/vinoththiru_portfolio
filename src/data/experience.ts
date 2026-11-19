import type { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: 'platys-designers',
    position: 'Procurement & Business Systems Executive',
    company: 'Platys Designers',
    duration: 'Current',
    isCurrent: true,
    focusTag: 'Procurement Operations & Business Systems Development',
    description:
      'Working at the intersection of procurement operations, business process management, and custom software development to digitalize purchasing workflows.',
    contributions: [
      'Supporting day-to-day procurement and purchasing operations across vendor coordination and order tracking.',
      'Managing purchase documentation and operational workflows to maintain clarity across procurement cycles.',
      'Independently designed and developed a customized Purchase Management Mini ERP application using React.js, Python FastAPI, and PostgreSQL.',
      'Built structured business workflows for end-to-end purchase order management.',
      'Implemented dedicated modules for vendor management, quotation management, and inventory tracking.',
      'Developed dashboard analytics and purchase reporting functionality to organize operational records.',
      'Bridged practical business requirements with maintainable full-stack software solutions.',
    ],
    technologies: [
      'React.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Mini ERP',
      'Procurement Workflows',
    ],
  },
  {
    id: 'cubeai-solutions',
    position: 'AI/ML Developer',
    company: 'CubeAI Solutions Tech Pvt. Ltd.',
    duration: 'March 2025 – April 2026',
    isCurrent: false,
    focusTag: 'Enterprise AI Applications & Backend Engineering',
    description:
      'Worked on enterprise AI-powered applications, scalable Python backend systems, ERP/CRM modules, and automated business reporting platforms.',
    contributions: [
      'Developed enterprise software applications tailored to structured operational requirements.',
      'Built maintainable backend REST APIs using Python and FastAPI.',
      'Worked on ERP and CRM application modules including inventory, customer, project, and role-based access workflows.',
      'Developed automated business reporting solutions converting structured spreadsheet data into presentation outputs.',
      'Implemented data processing pipelines and business workflow automation using Pandas and SQL.',
      'Worked with SQL databases and applied machine learning and computer vision technologies including OpenCV.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'React.js',
      'SQL',
      'Pandas',
      'OpenCV',
      'ERP / CRM',
    ],
  },
];
