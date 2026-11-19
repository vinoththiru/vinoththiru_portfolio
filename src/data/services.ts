import type { ServiceItem } from '../types/portfolio';

export const servicesData: ServiceItem[] = [
  {
    id: 'python-automation',
    title: 'Python Automation',
    description:
      'Automate repetitive spreadsheet workflows, document generation, and structured data processing pipelines with maintainable Python scripts.',
    deliverables: [
      'Excel data cleaning & transformation',
      'PDF & document processing',
      'Automated report generation',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Excel'],
    icon: 'workflow',
    inquirySubject: 'Inquiry: Python Automation Project',
  },
  {
    id: 'backend-api-development',
    title: 'Backend API Development',
    description:
      'Design and develop clean, well-structured REST APIs with validation, authentication, relational database modeling, and third-party integrations.',
    deliverables: [
      'FastAPI REST API architecture',
      'Authentication & role-based access',
      'Database design & API integration',
    ],
    technologies: ['Python', 'FastAPI', 'REST APIs', 'SQL', 'PostgreSQL'],
    icon: 'server',
    inquirySubject: 'Inquiry: Backend API Development',
  },
  {
    id: 'business-automation-mini-erp',
    title: 'Business Automation & Mini ERP',
    description:
      'Build practical internal web applications tailored to procurement, purchase orders, vendor management, quotations, and inventory workflows.',
    deliverables: [
      'Purchase & vendor management modules',
      'Inventory & quotation workflows',
      'Custom full-stack internal tools',
    ],
    technologies: ['React.js', 'FastAPI', 'PostgreSQL', 'ERP'],
    icon: 'layers',
    inquirySubject: 'Inquiry: Business Automation / Mini ERP',
  },
  {
    id: 'ai-application-development',
    title: 'AI Application Development',
    description:
      'Develop applied AI and machine learning software—from automated intelligent reporting systems to computer vision detection APIs.',
    deliverables: [
      'AI-powered reporting workflows',
      'Machine learning & Scikit-learn pipelines',
      'OpenCV detection & API integration',
    ],
    technologies: ['Python', 'Scikit-learn', 'OpenCV', 'FastAPI'],
    icon: 'sparkles',
    inquirySubject: 'Inquiry: AI Application Development',
  },
  {
    id: 'dashboard-reporting',
    title: 'Dashboard & Reporting Solutions',
    description:
      'Turn operational records and databases into clear business dashboards, structured reporting tables, and actionable data visualizations.',
    deliverables: [
      'Operational React.js dashboards',
      'Power BI & structured data reports',
      'Automated recurring report summaries',
    ],
    technologies: ['React.js', 'Power BI', 'SQL', 'Pandas'],
    icon: 'bar-chart',
    inquirySubject: 'Inquiry: Dashboard & Reporting Solution',
  },
];
