import type { ProjectItem } from '../types/portfolio';

export const projectsData: ProjectItem[] = [
  {
    id: 'procurement-mini-erp',
    slug: 'procurement-mini-erp',
    title: 'Procurement & Purchase Management Mini ERP',
    category: 'Flagship Full-Stack Enterprise Application',
    organization: 'Platys Designers',
    role: 'Independent Full-Stack Application Developer',
    featured: true,
    heroLogo: 'captain-shield',
    heroCodename: 'Project Vibranium',
    heroTagline: 'Enterprise Procurement Shield',
    visualType: 'procurement-erp',
    shortDescription:
      'A customized full-stack Mini ERP application independently designed and developed to centralize purchase orders, vendor records, quotations, inventory tracking, purchase reporting, and analytics.',
    problem:
      'Manual purchase documentation, scattered spreadsheets, and disconnected quotation and vendor records create friction across procurement tracking, approval clarity, and inventory visibility.',
    contribution:
      'Independently architected and built the complete full-stack system—designing the PostgreSQL relational schema, Python FastAPI REST services, authentication layer, and React.js operational dashboard.',
    technologies: ['React.js', 'Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Authentication'],
    keyFeatures: [
      'Purchase Order Management',
      'Vendor Management',
      'Quotation Management',
      'Inventory Management',
      'Purchase Reports',
      'Dashboard and Analytics',
      'User Authentication',
    ],
    liveUrl: 'https://platys-frontend.onrender.com/admin/purchase-orders',
    liveUrlLabel: 'Live Application (Auth Required)',
    liveUrlNote:
      'Deployed for internal operational use; admin routes require authenticated credentials.',
    caseStudy: {
      overview:
        'The Procurement & Purchase Management Mini ERP is a customized full-stack enterprise business application independently designed and developed to digitalize and organize purchasing workflows at Platys Designers. Built with a React.js frontend, Python FastAPI backend APIs, and PostgreSQL storage, it brings core procurement records into a unified, authenticated workspace.',
      businessContext:
        'In day-to-day procurement operations, coordinating vendor details, comparing supplier quotations, raising purchase orders, tracking received inventory, and compiling purchase summaries often spans multiple files and manual checklists. Working directly inside procurement workflows highlighted the need for a dedicated, lightweight Mini ERP aligned to real operational steps rather than an overly rigid off-the-shelf tool.',
      problemStatement: [
        'Vendor contact details, supplier quotations, and purchase order records were difficult to keep aligned across separate documents.',
        'Tracking inventory updates alongside ongoing purchase orders required repetitive manual cross-checking.',
        'Generating structured purchase summaries and operational visibility required consolidating scattered records.',
        'Internal procurement workflows required role-aware authenticated access to keep administrative purchase operations organized.',
      ],
      objectives: [
        'Centralize purchase orders, vendor profiles, quotations, and inventory items into a single relational PostgreSQL database.',
        'Expose clean, structured Python FastAPI REST endpoints with user authentication and input validation.',
        'Deliver a responsive React.js interface tailored to practical procurement screens, dashboards, and purchase reports.',
        'Maintain clear separation between business workflows, API routes, and relational data models for long-term extensibility.',
      ],
      independentContribution: [
        'Translated hands-on procurement workflow requirements into structured database schemas and modular application screens.',
        'Designed and implemented the React.js frontend covering navigation, operational forms, record tables, dashboards, and reporting views.',
        'Built the Python FastAPI backend architecture handling REST API endpoints, validation logic, and user authentication.',
        'Modeled PostgreSQL tables and relationships connecting vendors, quotations, purchase orders, and inventory records.',
        'Managed end-to-end development, testing, and cloud deployment of the application stack.',
      ],
      modules: [
        {
          name: 'Purchase Order Management',
          summary:
            'Create, organize, and track purchase orders linked to supplier records and line items across procurement stages.',
        },
        {
          name: 'Vendor Management',
          summary:
            'Maintain a structured directory of approved suppliers, contact metadata, and associated purchase history.',
        },
        {
          name: 'Quotation Management',
          summary:
            'Record and review vendor quotations in a structured format before issuing formal purchase orders.',
        },
        {
          name: 'Inventory Management',
          summary:
            'Track item listings and stock status alongside purchasing activity for clearer material visibility.',
        },
        {
          name: 'Purchase Reports',
          summary:
            'Compile structured purchase summaries to review procurement activity by supplier, order status, or period.',
        },
        {
          name: 'Dashboard and Analytics',
          summary:
            'Provide an at-a-glance operational overview of purchase orders, vendor activity, and procurement records.',
        },
        {
          name: 'User Authentication',
          summary:
            'Protect administrative procurement routes and operational data behind authenticated user sessions.',
        },
      ],
      architectureLayers: [
        {
          layer: 'Presentation Layer',
          technology: 'React.js',
          responsibility:
            'Component-driven admin workspace for purchase orders, vendor directory, quotations, inventory tables, reports, and dashboard analytics.',
        },
        {
          layer: 'Application & API Layer',
          technology: 'Python FastAPI',
          responsibility:
            'RESTful API endpoints, schema validation, authentication checks, business workflow rules, and reporting aggregations.',
        },
        {
          layer: 'Data Persistence Layer',
          technology: 'PostgreSQL',
          responsibility:
            'Relational storage for users, vendors, quotations, purchase orders, inventory entries, and transactional integrity.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Translating real-world procurement documentation into clean, normalized relational tables without losing operational flexibility.',
          solution:
            'Modeled core entities (vendors, quotations, purchase orders, inventory items) with clear foreign-key links while keeping API payloads modular and straightforward to extend.',
        },
        {
          challenge:
            'Keeping the interface practical and fast for daily purchasing tasks rather than bloated with unused enterprise complexity.',
          solution:
            'Focused the React.js workspace around the seven essential procurement modules, pairing clean table views with clear status indicators and structured forms.',
        },
        {
          challenge:
            'Protecting internal procurement records while deploying the frontend and backend cleanly as a web application.',
          solution:
            'Implemented dedicated user authentication across backend API endpoints and gated administrative views such as /admin/purchase-orders behind verified login sessions.',
        },
      ],
      keyLearnings: [
        'Direct exposure to procurement operations dramatically improves software design—understanding how records move between quotations, purchase orders, and inventory prevents awkward UI workflows.',
        'FastAPI paired with PostgreSQL provides a dependable foundation for structured business applications where schema validation and relational consistency matter.',
        'Independently owning frontend, backend, database design, and deployment builds strong end-to-end engineering judgment.',
      ],
    },
  },
  {
    id: 'ai-report-automation-platform',
    slug: 'ai-report-automation-platform',
    title: 'AI Report Automation Platform',
    category: 'Enterprise Automation & Reporting',
    organization: 'CubeAI Solutions Tech Pvt. Ltd.',
    role: 'AI/ML Developer',
    heroLogo: 'arc-reactor',
    heroCodename: 'Jarvis Protocol',
    heroTagline: 'Automated Executive Intelligence',
    visualType: 'ai-report-automation',
    shortDescription:
      'An enterprise platform that converts structured Excel files into formatted PowerPoint reports using automated business calculations, REST APIs, and an administrative dashboard.',
    problem:
      'Manual preparation of recurring executive PowerPoint reports from complex Excel datasets is repetitive, slow, and vulnerable to calculation or formatting inconsistencies.',
    contribution:
      'Designed and built backend processing pipelines in Python, FastAPI, Pandas, and SQL, alongside React.js administrative dashboard views to orchestrate uploads and automated report generation.',
    technologies: ['Python', 'FastAPI', 'React.js', 'SQL', 'Pandas'],
    keyFeatures: [
      'Excel file processing',
      'Automated business calculations',
      'REST API development',
      'Administrative dashboard',
      'Automated PowerPoint report generation',
    ],
    caseStudy: {
      overview:
        'Developed an enterprise reporting platform that transforms raw Excel workbooks into structured PowerPoint presentations. By combining Pandas-based data processing, automated business calculations, SQL persistence, and a FastAPI + React.js administrative interface, the platform streamlined repetitive report generation workflows.',
      businessContext:
        'Enterprise teams frequently compile standardized slide decks from multi-sheet Excel exports. Automating ingestion, calculation rules, and slide population reduces manual effort and helps maintain consistent reporting structure.',
      problemStatement: [
        'Manual data cleaning and metric calculation from recurring Excel sheets consumed substantial analyst time.',
        'Copying computed tables and summaries into PowerPoint templates introduced formatting drift and human error.',
        'Teams needed a central administrative dashboard to upload source spreadsheets and trigger report generation reliably.',
      ],
      objectives: [
        'Ingest and validate structured Excel datasets programmatically using Python and Pandas.',
        'Execute repeatable business calculations consistently across reporting cycles.',
        'Expose FastAPI REST endpoints connecting the React.js administrative dashboard with backend generation workflows.',
        'Store metadata and reporting records cleanly in SQL.',
      ],
      independentContribution: [
        'Implemented Excel ingestion and business calculation pipelines using Python and Pandas.',
        'Built FastAPI REST APIs to manage file uploads, processing workflows, and report delivery.',
        'Contributed to the React.js administrative dashboard and SQL database integration.',
      ],
      architectureLayers: [
        {
          layer: 'Admin Interface',
          technology: 'React.js',
          responsibility:
            'Upload workflow, job status overview, and administrative controls for managing automated reports.',
        },
        {
          layer: 'API & Automation Engine',
          technology: 'Python, FastAPI & Pandas',
          responsibility:
            'Spreadsheet parsing, business logic calculations, and automated PowerPoint report assembly.',
        },
        {
          layer: 'Database Layer',
          technology: 'SQL',
          responsibility:
            'Structured persistence for report metadata, processed metrics, and administrative logs.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Handling variations in uploaded Excel structures before running downstream business calculations.',
          solution:
            'Added structured Pandas validation and normalization checks at the API ingestion boundary so malformed inputs fail cleanly with actionable feedback.',
        },
        {
          challenge:
            'Decoupling data transformation from presentation layout so reporting rules stay maintainable.',
          solution:
            'Separated Pandas calculation logic from PowerPoint slide assembly modules behind clean FastAPI service functions.',
        },
      ],
      keyLearnings: [
        'Strong input validation is the backbone of reliable document automation systems.',
        'Combining FastAPI with Pandas makes it practical to expose analytical Python pipelines through clean enterprise web dashboards.',
      ],
    },
  },
  {
    id: 'enterprise-scaffolding-erp',
    slug: 'enterprise-scaffolding-erp',
    title: 'Enterprise Scaffolding ERP',
    category: 'Enterprise ERP & CRM System',
    organization: 'CubeAI Solutions Tech Pvt. Ltd.',
    role: 'Backend & ERP Module Developer',
    heroLogo: 'batman',
    heroCodename: 'Batcave Core',
    heroTagline: 'Impenetrable Scaffolding RBAC',
    visualType: 'scaffolding-erp',
    shortDescription:
      'Enterprise ERP and CRM backend modules built with Python, FastAPI, and SQL covering inventory, customer records, project tracking, role-based access control, and workflow automation.',
    problem:
      'Scaffolding operations require coordinated visibility across equipment inventory, customer engagements, active project allocations, and multi-role permissions.',
    contribution:
      'Developed core ERP and CRM API modules using Python, FastAPI, and SQL—implementing role-based access control, workflow automation, and optimized database operations.',
    technologies: ['Python', 'FastAPI', 'SQL', 'RBAC', 'ERP / CRM'],
    keyFeatures: [
      'Inventory management',
      'Customer management',
      'Project management',
      'Role-based access control',
      'Workflow automation',
      'Optimized database operations',
    ],
    caseStudy: {
      overview:
        'Developed backend ERP and CRM modules tailored to enterprise scaffolding operations. The system unified inventory tracking, customer management, project allocation, role-based access control, and workflow automation on top of Python, FastAPI, and SQL.',
      businessContext:
        'Industrial scaffolding businesses coordinate high-volume inventory across multiple customer sites and project schedules. Reliable ERP and CRM modules ensure operational teams share accurate stock, project, and client information.',
      problemStatement: [
        'Coordinating inventory movement across multiple concurrent customer projects requires consistent relational data.',
        'Different operational staff need scoped permissions rather than unrestricted administrative access.',
        'Database queries across inventory, customers, and projects must remain structured and efficient as records grow.',
      ],
      objectives: [
        'Deliver modular FastAPI services for inventory, customer, and project management.',
        'Enforce role-based access control (RBAC) across protected enterprise endpoints.',
        'Automate key operational workflows and optimize underlying SQL database operations.',
      ],
      independentContribution: [
        'Built REST API modules for inventory management, customer management, and project workflows using Python and FastAPI.',
        'Implemented role-based access control checks across API endpoints.',
        'Worked on SQL query structure and database operations to keep ERP workflows reliable.',
      ],
      architectureLayers: [
        {
          layer: 'Client & Enterprise Portal',
          technology: 'Web Client / API Consumers',
          responsibility:
            'Role-scoped operational access for inventory managers, project coordinators, and administrators.',
        },
        {
          layer: 'ERP & CRM Service Layer',
          technology: 'Python & FastAPI',
          responsibility:
            'Modular routers for inventory, CRM, project tracking, RBAC enforcement, and workflow automation.',
        },
        {
          layer: 'Relational Storage',
          technology: 'SQL Database',
          responsibility:
            'Normalized tables for inventory assets, customer accounts, project records, and user roles.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Enforcing granular permissions across overlapping ERP and CRM operations without duplicating authorization logic.',
          solution:
            'Centralized role-based access control dependencies within FastAPI so routes declare required permissions cleanly and consistently.',
        },
        {
          challenge:
            'Maintaining clean relational joins across inventory items, customer records, and project assignments.',
          solution:
            'Structured SQL schemas and queries thoughtfully to support clear operational lookups and dependable transactional updates.',
        },
      ],
      keyLearnings: [
        'Modular router design and centralized RBAC dependencies keep enterprise FastAPI codebases readable as module count grows.',
        'Thoughtful SQL modeling is essential for ERP systems where inventory and project state stay tightly coupled.',
      ],
    },
  },
  {
    id: 'ai-iot-smart-parking',
    slug: 'ai-iot-smart-parking',
    title: 'AI & IoT Smart Parking Management System',
    category: 'Computer Vision & IoT Backend',
    organization: 'CubeAI Solutions Tech Pvt. Ltd.',
    role: 'AI/ML & Backend Developer',
    heroLogo: 'spider',
    heroCodename: 'Spider-Vision Grid',
    heroTagline: 'Real-Time Vision & Detection',
    visualType: 'smart-parking',
    shortDescription:
      'An AI-powered vehicle detection and parking monitoring solution integrating OpenCV, FastAPI, and IoT workflows for vehicle tracking and real-time parking status APIs.',
    problem:
      'Manual monitoring of parking slot occupancy lacks real-time visibility for facility operators and drivers, leading to congestion and underutilized space.',
    contribution:
      'Built the OpenCV-based vehicle detection pipeline and FastAPI real-time status APIs connecting vision detection outputs with IoT parking monitoring workflows.',
    technologies: ['Python', 'OpenCV', 'FastAPI', 'IoT', 'REST APIs'],
    keyFeatures: [
      'Vehicle detection',
      'Parking slot monitoring',
      'Vehicle tracking',
      'Real-time status APIs',
      'IoT integration',
    ],
    caseStudy: {
      overview:
        'Built an AI-powered smart parking management solution combining OpenCV computer vision for vehicle detection with FastAPI REST services and IoT integration to provide real-time parking slot monitoring and vehicle tracking.',
      businessContext:
        'Modern parking facilities benefit from automated occupancy detection that bridges camera feeds and connected IoT components with live status APIs.',
      problemStatement: [
        'Facility operators needed automated vehicle detection rather than manual slot checks.',
        'Occupancy updates had to be exposed cleanly via real-time APIs for downstream displays and IoT integrations.',
      ],
      objectives: [
        'Detect vehicles accurately within monitored parking zones using Python and OpenCV.',
        'Track vehicle movement and slot occupancy state reliably.',
        'Expose real-time parking status via FastAPI endpoints integrated with IoT workflows.',
      ],
      independentContribution: [
        'Implemented OpenCV-based vehicle detection and slot monitoring logic in Python.',
        'Designed FastAPI REST endpoints serving real-time parking occupancy and vehicle tracking updates.',
        'Integrated detection outputs with IoT monitoring components.',
      ],
      architectureLayers: [
        {
          layer: 'Vision & Sensing Layer',
          technology: 'OpenCV & IoT Devices',
          responsibility:
            'Camera frame ingestion, vehicle detection, tracking, and connected parking hardware signals.',
        },
        {
          layer: 'Real-Time API Layer',
          technology: 'Python & FastAPI',
          responsibility:
            'Low-latency REST endpoints publishing slot availability and vehicle status updates.',
        },
        {
          layer: 'Monitoring Output',
          technology: 'Status Consumers & Dashboards',
          responsibility:
            'Consumes live occupancy data for parking monitoring and operational visibility.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Keeping computer vision processing cleanly decoupled from API response latency.',
          solution:
            'Separated frame-processing detection routines from FastAPI status endpoints so real-time occupancy state can be queried smoothly.',
        },
      ],
      keyLearnings: [
        'Bridging computer vision pipelines with lightweight FastAPI services makes AI detection immediately useful to connected IoT applications.',
      ],
    },
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectsData.find((project) => project.slug === slug);
}
