import type { ProfileData } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Vinoth Thiruppathi',
  initials: 'VT',
  introLabel: "HELLO, I'M",
  heroTitle: 'AI/ML Developer & Software Engineer',
  identityLine:
    'AI/ML Developer | Python Backend Engineer | ERP & Business Automation Developer',
  supportingStatement:
    'Building intelligent applications, scalable backend systems and business automation solutions that solve real-world problems.',
  location: 'Chennai, Tamil Nadu, India',
  email: 'vinoth.thiruppathi2003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vinoth-thiruppathi',
  github: 'https://github.com/vinoththiru',
  existingPortfolio: 'https://vinoththiru.github.io/vinoththiru_portfolio/',
  resumePath: `${import.meta.env.BASE_URL}resume/Vinoth_Thiruppathi_Resume.pdf`,
  profileImagePath: `${import.meta.env.BASE_URL}images/vinoth-profile.jpg`,
  aboutHeading: 'Turning Ideas Into Intelligent Software.',
  summary: [
    'I am an AI/ML Developer and Software Engineer with a B.Tech in Artificial Intelligence and Data Science and 1+ years of experience delivering enterprise software applications, Python backend APIs, workflow automation platforms, and ERP & CRM solutions.',
    'At CubeAI Solutions Tech Pvt. Ltd., I built production backend systems with Python, FastAPI, and SQL alongside React.js interfaces—spanning AI-powered automated business reporting, enterprise scaffolding ERP modules, and AI & IoT smart parking systems.',
    'Currently at Platys Designers, I work at the intersection of procurement operations and software engineering. Beyond supporting daily purchasing workflows, I independently designed and developed a full-stack Procurement & Purchase Management Mini ERP using React.js, Python FastAPI, and PostgreSQL—translating real operational bottlenecks directly into structured digital workflows.',
  ],
  aboutHighlights: [
    {
      label: 'Engineering Focus',
      value: 'Python, FastAPI & Full-Stack ERP',
      detail: 'Structured REST APIs, relational data modeling, and responsive React.js business interfaces.',
    },
    {
      label: 'Operational Bridge',
      value: 'Software + Business Workflows',
      detail: 'Hands-on experience inside procurement operations informs practical, adoptable automation tools.',
    },
    {
      label: 'Applied AI & Data',
      value: 'Intelligent Automation',
      detail: 'Excel-to-presentation reporting pipelines, computer vision detection, and structured analytics.',
    },
  ],
  education: {
    degree: 'B.Tech – Artificial Intelligence and Data Science',
    institution: 'Dhanalakshmi Srinivasan Engineering College',
    year: '2024',
    cgpa: '8.6 / 10',
  },
  certifications: [
    {
      title: 'Artificial Intelligence Internship',
      issuer: 'Pantech Solutions Pvt. Ltd.',
      duration: '30 Days',
    },
    {
      title: 'Machine Learning Bootcamp',
      issuer: 'Artificial Intelligence Foundation Trust, India',
      duration: '30 Days',
    },
  ],
};
