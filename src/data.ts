import { EducationItem, ExperienceItem, ProjectItem, PublicationItem, HonorItem, SkillType } from './types';

export const personalInfo = {
  name: 'Tahsin Ahmed',
  title: 'Software Quality Assurance Engineer',
  tagline: 'Bridging technical software engineering & strategic management with a focus on robust software quality and rigorous verification.',
  about: 'I am a passionate and detail-oriented Software Quality Assurance Engineer with multiple years of expertise in manual, automated, API, and load testing. Combining an extensive technical foundation (MSc in Computer Science) with active business specialization (MBA at University of Dhaka), I specialize in building, verifying, and delivering reliable software. My focus is on creating automated workflows, verifying API integrity, detecting performance bottlenecks early, and ensuring flawless user experiences.',
  email: 'tahsinahmed309203@gmail.com',
  corporateEmail: 'tahsin@bluetech.solutions',
  phone: '01732636946',
  bloodGroup: 'A (+ve)',
  interests: ['Photography', 'Traveling', 'Driving'],
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/tahsinln30', // user mentions uploading to GitHub
  linkedin: 'https://bd.linkedin.com/in/mdtahsinahmed',
};

export const educationList: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'MBA in Organization Strategy & Leadership',
    institution: 'University of Dhaka',
    duration: 'Jul 2024 – Current',
    grade: 'CGPA: 3.33',
    field: 'Strategy, Leadership & Business Quality Operations'
  },
  {
    id: 'edu-2',
    degree: 'MSc in Computer Science (Software)',
    institution: 'American International University-Bangladesh (AIUB)',
    duration: 'Jan 2017 – Dec 2018',
    grade: 'CGPA: 3.77',
    field: 'Advanced Software Engineering, Software Metrics & Architecture'
  },
  {
    id: 'edu-3',
    degree: 'BSc in Computer Science & Software Engineering',
    institution: 'American International University-Bangladesh (AIUB)',
    duration: 'Jan 2013 – Dec 2016',
    grade: 'CGPA: 3.27',
    field: 'Software Testing, Database Management, Data Structures & Algorithms'
  },
  {
    id: 'edu-4',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Birshreshtha Munshi Abdur Rouf Public College',
    duration: '2012',
    grade: 'GPA: 4.90 / 5.00',
    field: 'Science Stream'
  },
  {
    id: 'edu-5',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Birshreshtha Munshi Abdur Rouf Public College',
    duration: '2010',
    grade: 'GPA: 5.00 / 5.00 (Golden / Top Tier Academic Board Award)',
    field: 'Science Stream'
  }
];

export const experienceList: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Quality Assurance Engineer',
    company: 'BlueTech Solutions (Vendor of Robi Axiata Limited)',
    duration: 'Jan 2026 – Current',
    details: [
      'Developed and Implemented Software Test Plans and Strategies.',
      'Executed Manual Testing on Web Applications and Mobile Applications.',
      'Identified, Documented, and Tracked Software Defects.',
      'Writing the Test Cases and Bug Reports.',
      'Functionality Testing and Requirement Analysis of the Product.',
      'Collaborate with UI/UX, Developer, Business Team, and Project Manager to Work as a Team.',
      'Integration, Regression, Ad-hoc, and Exploratory Testing as a Part of Software.',
      'Worked closely with Robi Axiata Ltd. to Test and Ensure the Quality of Digital Products such as BDTickets, Performing Functional and Regression Testing Across Platforms.',
      'Actively Participated in Agile Sprint Meetings, Clearly Communicating Testing Status, Defects, and Quality Risks with Cross-Functional Teams.',
      'Participate Automation Testing: Cypress, Playwright, K6 - Load Testing, and Insomnia - API Testing.'
    ],
    isCurrent: true
  },
  {
    id: 'exp-2',
    role: 'Software Quality Assurance Engineer',
    company: 'Gain Solution Ltd.',
    duration: 'Feb 2024 – Jan 2026',
    details: [
      'Developed and Implemented Software Test Plans and Strategies.',
      'Executed Manual Testing on Web Applications and  Mobile Applications.',
      'Identified, Documented, and Tracked Software Defects.',
      'Writing the Test Cases and Bug Reports.',
      'Functionality Testing and Requirement Analysis of the Product.',
      'Collaborate with UI/UX, Developer, Business Team, and Project Manager to Work as a Team.',
      'Integration, Regression, Ad-hoc, and Exploratory Testing as a Part of Software.',
      'QA and Test Complex Application Financial Scenarios, Payment Features, Data Import, Permission Protocols, Payroll, AI Features, and Report Generate Issues.',
      'Automation Testing: Cypress, Playwright (Test Script Writing).'
    ]
  },
  {
    id: 'exp-3',
    role: 'Project Consultant',
    company: 'Fresh Pack Industries',
    duration: 'Jun 2025 – Dec 2025',
    details: [
      'Analyzed existing workflows and recommended technical solutions to improve organizational efficiency and collaboration.',
      'Introduced and implemented Slack to streamline internal communication and reduce dependency on informal messaging channels.',
      'Implemented Trello for task tracking and project management, enabling better visibility of work progress and accountability.',
      'Introduced TimeCamp to monitor time utilization, improve productivity, and support data-driven decision-making.',
      'Guided team members on best practices for using collaboration and productivity tools effectively.',
      'Participated in client meetings to support product purchasing decisions and provide consultation on website updates and improvements.',
      'Acted as a bridge between business requirements and technical solutions to enhance the overall work environment.',
      'Provided strategic recommendations to modernize operational processes through digital tools.'
    ]
  },
  {
    id: 'exp-4',
    role: 'Sr. Associate',
    company: 'Quantanite',
    duration: 'Jul 2019 – Feb 2024',
    details: [
      'Assisting with the Business Case.',
      'Planning and Monitoring.',
      'Eliciting Requirements.',
      'Translating and Simplifying Requirements.',
      'Requirements Management and Communication.',
      'Requirements Analysis.',
      'Written and Verbal Communication, Including Technical Writing Skills.',
      'Understanding of Systems Engineering Concepts.',
      'The Ability to Conduct Cost/Benefit Analysis.',
      'Business Case Development.',
      'Modeling Techniques and Methods.',
      'Leadership.',
      'Implement Advanced Strategies for Gathering, Reviewing, and Analyzing Data Requirements.',
      'Prioritize Requirements and Create Conceptual Prototypes and Mock-Ups.',
      'Master Strategic Business Process Modeling, Tractability, and Quality Management Techniques.',
      'Apply Best Practices for Effective Communication and Problem-Solving.',
      'Successfully Compete for the Most Sought-After Business Analyst Jobs.',
      'Data Processing.',
      'Delivering High-Quality Data Science Models as Part of a Team Working on a Variety of Forecasting, Optimization, Logistical, and Routing Challenges as a Part of an Established Team of Data Scientists with Experience in These Areas.',
      'Work Closely with Team Members Across All Business Units to Build and Evaluate Suitable Algorithms to Allow Us to Scale Our Business.',
      'Interfacing with Other Tech Teams Working to Production Deadlines.',
      'Taking On Board Feedback from Other Data Scientists, Gathering Reviews of Code and Models, and Ensuring They Can be Effectively Deployed by the Tech Team.',
      'Use Data to Visualize and Explain Hypotheses and Models.',
      'To Simply Execute Email Marketing of the Dedicated Clients for Promoting Their Products or Services and Developing a Professional Relationship with Potential Leads or Customers That will Accelerate the Growth of Their Organization to Fulfill Their Marketing Goals. Finding Valid Mail Addresses for the Clients and Arranging the Data with Proper Quality Assurance.'
    ]
  },
  {
    id: 'exp-5',
    role: 'IT Specialist',
    company: 'Fresh Pack Industries',
    duration: 'Mar 2017 – Jun 2018',
    details: [
      'Installing and Configuring Computer Hardware, Software, Networks, Printers, and Scanners.',
      'Monitoring and Maintaining Computer Systems and Networks.',
      'Responding in a Timely Manner to Service Issues and Requests.',
      'Providing Technical Support Across the Company (This May be in Person or Over the Phone).',
      'Setting Up Accounts for New Users.',
      'Repairing and Replacing Equipment as Necessary.',
      'Testing New Technology.',
      'Possibly Training More Junior Staff Members.'
    ]
  },
  {
    id: 'exp-6',
    role: 'Software Engineering Intern',
    company: 'Grameenphone Ltd. (Telenor Group)',
    duration: 'Sep 2016 – Dec 2016',
    details: [
      'Planning, Preparation, and Participation in Events and Programs.',
      'Communicate with Clients.',
      'Check Reports and Submit Documents to Supervisor.'
    ]
  }
];

export const skillsList: SkillType[] = [
  { name: 'Manual Testing', level: 98, category: 'core' },
  { name: 'Test Case Design', level: 95, category: 'core' },
  { name: 'Bug Report Writing', level: 96, category: 'core' },
  { name: 'API Testing (Insomnia)', level: 92, category: 'core' },
  { name: 'Automation Testing', level: 88, category: 'automation' },
  { name: 'Cypress', level: 85, category: 'automation' },
  { name: 'Playwright', level: 83, category: 'automation' },
  { name: 'Load Testing (K6)', level: 80, category: 'automation' },
  { name: 'JavaScript / TypeScript', level: 78, category: 'automation' },
  { name: 'JIRA', level: 94, category: 'tools' },
  { name: 'ClickUp', level: 90, category: 'tools' },
  { name: 'VS Code', level: 88, category: 'tools' },
  { name: 'Chrome DevTools', level: 92, category: 'tools' }
];

export const projectsList: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'bdtickets',
    type: 'Web & Mobile',
    description: 'The largest online ticket platform in Bangladesh for buses, standard launch voyages, and event tickets. Crafted full manual coverage and dynamic automated Cypress visual testing matrices for reservations and payments.',
    tags: ['Cypress', 'Manual Testing', 'Robi Axiata Integration', 'Ticketing Flow System']
  },
  {
    id: 'proj-2',
    name: 'lunchbd',
    type: 'Web',
    description: 'Corporate catering and lunch order delivery hub. Conducted extensive multi-user functional testing and validated responsive billing algorithms and real-time food delivery schedules.',
    tags: ['API Testing', 'Insomnia', 'Manual QA', 'Responsive Verification']
  },
  {
    id: 'proj-3',
    name: 'Bluetech Solutions official',
    type: 'Web',
    description: 'Corporate portal for Bluetech Solutions. Verified complete layout responsiveness across modern device breakpoints, cross-browser support, interactive web forms, and contact database flow.',
    tags: ['UI/UX Verification', 'Accessibility Auditing', 'SEO Optimizations']
  },
  {
    id: 'proj-4',
    name: 'Trip 963',
    type: 'Web & Mobile',
    description: 'A holiday package, hotel, and air ticket booking engine. Planned and executed stress-testing strategies on flight APIs and validated payment gateways (SSLCommerz) and session timeouts.',
    tags: ['Load Testing', 'API Security', 'Mobile App QA', 'SSLCommerz']
  },
  {
    id: 'proj-5',
    name: 'Payrun',
    type: 'Web & Mobile',
    description: 'Enterprise payroll and salary management software. Validated intricate tax calculations, employee timesheet logic, bank transfer file rendering lists, and organizational hierarchy flows.',
    tags: ['Manual QA', 'Data Integrity', 'Boundary Value Testing', 'Financial Flow']
  },
  {
    id: 'proj-6',
    name: 'EasyDesk',
    type: 'Web & Mobile',
    description: 'Collaborative ticketing helpdesk SaaS platform. Wrote complex end-to-end automations in Playwright ensuring swift handling of custom routing configurations, SLAs, and chat systems.',
    tags: ['Playwright', 'Agile Sprints', 'Security Policies', 'SaaS Auditing']
  },
  {
    id: 'proj-7',
    name: 'Gain.io',
    type: 'Web & Mobile',
    description: 'Premium business marketing automation dashboard. Carried out automated API validations and stress calculations to measure data streaming speeds and web-socket stability.',
    tags: ['K6', 'WebSockets Testing', 'Insomnia APIs', 'Performance Auditing']
  },
  {
    id: 'proj-8',
    name: 'Gain Solution Ltd.',
    type: 'Web',
    description: 'Corporate agency portal. Conducted comprehensive structural manual testing, visual discrepancy logs, loading-performance analytics, and mail servers delivery checks.',
    tags: ['Manual Testing', 'Visual QA', 'Speed Auditing', 'Contact Integrations']
  },
  {
    id: 'proj-9',
    name: 'KajTaj',
    type: 'Web',
    description: 'A platform connecting local service providers and job posters. Executed role-based verification processes, client escrow budget allocations, review modules and internal messaging queues.',
    tags: ['Functional Testing', 'Secure Escrows', 'Interactive Chat', 'Manual Testing']
  }
];

export const publicationsList: PublicationItem[] = [
  {
    id: 'pub-1',
    title: 'High Length Wi-Fi Network System',
    journal: 'International Journal of Scientific & Engineering Research (IJSER)',
    url: 'https://www.ijser.org/researchpaper/High_Length_Wi_Fi_Network_System.pdf',
    year: '2018'
  },
  {
    id: 'pub-2',
    title: 'Demography of Startup Software-Based Company',
    journal: 'International Journal of Innovative Science and Research Technology (IJISRT)',
    url: 'https://ijisrt.com/demography-of-startup-softwarebased-company',
    year: '2023'
  },
  {
    id: 'pub-3',
    title: 'Mathematical Interpretation of High Length Wi-Fi Network System',
    journal: 'International Journal of Innovative Science and Research Technology (IJISRT) / Zenodo',
    url: 'https://zenodo.org/records/10389887',
    year: '2023'
  },
  {
    id: 'pub-4',
    title: 'Bridging Technology and Management: The Role of MBA in Career Growth',
    journal: 'International Journal of Innovative Science and Research Technology (IJISRT)',
    url: 'https://www.ijisrt.com/bridging-technology-and-management-the-role-of-mba-in-career-growth',
    year: '2023'
  }
];

export const honorsList: HonorItem[] = [
  {
    id: 'honor-1',
    title: 'Shahid President Ziaur Rahman Shriti Sikkha Britti Scholarship',
    awardedBy: 'Ziaur Rahman Foundation',
    details: 'Awarded to high-achieving students for exceptional academic records and community representation.'
  },
  {
    id: 'honor-2',
    title: 'Academic Excellence Award (GPA: 5.00 in SSC)',
    awardedBy: 'Prothom Alo and Robi Axiata Limited',
    details: 'Received official scholarship and public reception for outstanding outcome in the Secondary School Certificate examination.'
  },
  {
    id: 'honor-3',
    title: 'Cum Laude Graduate Honor (Academic Honor)',
    awardedBy: 'American International University-Bangladesh (AIUB)',
    details: 'Granted the prestgious Cum Laude title for graduating with sustained high academic excellence (CGPA: 3.77) during MSc in Computer Science studies.'
  }
];
