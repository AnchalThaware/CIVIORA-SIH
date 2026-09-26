import { Challenge, Project, StudentTeam, User, CSRSponsorship, Subscription, ImpactStats } from '../types';

export const JHARKHAND_DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'Bokaro',
  'Hazaribagh',
  'East Singhbhum (Jamshedpur)',
  'West Singhbhum',
  'Dumka',
  'Deoghar',
  'Giridih',
  'Gumla',
  'Khunti',
  'Palamu',
  'Simdega',
  'Lohardaga',
  'Ramgarh',
  'Koderma',
  'Chatra',
  'Garhwa',
  'Godda',
  'Jamtara',
  'Latehar',
  'Pakur',
  'Sahebganj',
  'Seraikela Kharsawan'
];

export const CATEGORIES = [
  'Agriculture & Water',
  'Healthcare & Sanitation',
  'Rural Education & Digital Access',
  'Renewable Energy & Power',
  'Waste Management & Environment',
  'Rural Infrastructure & Transport',
  'Livelihoods & Tribal Crafts',
  'Disaster & Flood Management',
  'Women Safety & Community Well-being'
] as const;

export const INITIAL_IMPACT_STATS: ImpactStats = {
  peopleBenefited: 48500,
  communitiesReached: 124,
  problemsSolved: 42,
  solutionsImplemented: 28,
  activeProjects: 36,
  participatingUniversities: 18,
  industryPartners: 24,
  csrFundsMobilized: 14500000, // ₹1.45 Cr
  waterSavedLiters: 850000,
  greenEnergyKw: 420
};

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'CH-2026-001',
    title: 'Smart Solar-Powered Micro-Irrigation for Smallholder Tribal Farmers',
    description: 'Over 40 tribal farming families in Angara block suffer from severe post-monsoon water scarcity. Ground water is available at shallow borewells, but erratic electric grid supply forces farmers to rely on costly diesel pumps. An affordable automated drip irrigation system powered by solar with soil moisture telemetry is urgently needed to enable double-crop seasons.',
    category: 'Agriculture & Water',
    district: 'Ranchi',
    village: 'Hesal Village, Angara Block',
    locationName: 'Hesal, Angara, Ranchi, Jharkhand',
    latitude: 23.3640,
    longitude: 85.5340,
    peopleAffected: 520,
    urgency: 'High',
    priority: 'High',
    expectedOutcome: 'Zero-fuel automatic drip irrigation covering 60 acres with 40% water reduction and crop yield improvement.',
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80'
    ],
    submittedBy: {
      id: 'usr-cit-01',
      name: 'Rameshwar Munda',
      email: 'rameshwar.munda.demo@civiora.gov.in',
      phone: '+91 98351 44210'
    },
    isRealSubmission: false,
    status: 'in_progress',
    progress: 68,
    currentStage: 'Prototype Development & Field Telemetry Testing',
    lastUpdated: '2026-08-28',
    createdAt: '2026-08-10',
    aiAnalysis: {
      summary: 'High-impact rural irrigation deficit solvable via IoT moisture sensors coupled with low-cost DC solar pump inverters.',
      category: 'Agriculture & Water',
      priority: 'High',
      keywords: ['Solar Pumping', 'Drip Irrigation', 'Soil Moisture IoT', 'Tribal Farming', 'Jharkhand Water Table'],
      requiredSkills: ['Embedded Systems', 'IoT Sensors', 'Solar Inverter Design', 'Agronomy', 'LoRaWAN'],
      potentialSolutions: [
        'LoRa-mesh connected low-power soil capacitive probes',
        'DC brushless solar pump automation controller',
        'Mobile app with Santhali/Hindi audio advisory'
      ],
      similarityScore: 92,
      recommendedUniversities: [
        { name: 'Birla Institute of Technology (BIT) Mesra', matchScore: 94, reason: 'Leading Electrical & Agritech research facility with active rural outreach cell in Ranchi.' },
        { name: 'National Institute of Technology (NIT) Jamshedpur', matchScore: 88, reason: 'Strong IoT & Embedded systems department.' }
      ],
      recommendedIndustryPartners: [
        { name: 'Tata Steel Agri-Tech Lab', matchScore: 91, reason: 'Provides fabrication facilities and solar panel subsidies.' }
      ],
      recommendedCSROrg: [
        { name: 'Tata Trusts Jharkhand Rural Foundation', matchScore: 95, reason: 'Focuses on sustainable livelihood enhancement for indigenous communities.' }
      ],
      estimatedBeneficiaries: 520,
      generatedAt: '2026-08-10',
      isAiGenerated: true
    },
    assignedUniversity: {
      id: 'uni-01',
      name: 'Birla Institute of Technology (BIT) Mesra',
      department: 'Department of Electrical & Electronics Engineering'
    },
    assignedTeam: {
      id: 'team-01',
      name: 'AgriMesh Innovators',
      leaderName: 'Priya Sharma (Final Year B.Tech)',
      membersCount: 4
    },
    facultyMentor: {
      id: 'fac-01',
      name: 'Dr. Alok Ranjan',
      email: 'aranjan@bitmesra.ac.in'
    },
    industryPartner: {
      id: 'ind-01',
      name: 'Tata Steel Rural Tech Lab',
      supportType: 'Hardware Prototyping & Sensor Calibration'
    },
    csrPartner: {
      id: 'csr-01',
      name: 'Tata Community Initiatives Trust',
      fundingAmount: 350000
    },
    latestUpdate: 'Hardware telemetry node calibrated in lab; scheduled field test at Angara on Sep 5, 2026.',
    impactMetrics: {
      peopleBenefited: 520,
      metricsSummary: 'Expected 2.4x crop productivity boost and 60,000 liters monthly water saving.'
    }
  },
  {
    id: 'CH-2026-002',
    title: 'Low-Cost Portable Arsenic & Fluoride Water Filtration Unit',
    description: 'Groundwater in 6 hamlets of Deoghar district exhibits fluoride levels exceeding 3.5 mg/L, causing severe skeletal fluorosis among schoolchildren. Current municipal tankers reach only weekly. We need an easy-to-maintain bio-sand and activated alumina filtration system that local self-help groups can operate.',
    category: 'Healthcare & Sanitation',
    district: 'Deoghar',
    village: 'Sarwan Block Gram Panchayat',
    locationName: 'Sarwan, Deoghar, Jharkhand',
    latitude: 24.3820,
    longitude: 86.8290,
    peopleAffected: 1400,
    urgency: 'Critical',
    priority: 'Critical',
    expectedOutcome: 'Purified drinking water with fluoride < 1.0 mg/L accessible to 350 households at under ₹0.05/liter.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=800&q=80'
    ],
    submittedBy: {
      id: 'usr-cit-02',
      name: 'Sunita Devi (SHG Pradhan)',
      email: 'sarwan.shg.demo@civiora.gov.in',
      phone: '+91 94311 88902'
    },
    isRealSubmission: false,
    status: 'testing',
    progress: 82,
    currentStage: 'Pilot Community Water Station Testing',
    lastUpdated: '2026-08-27',
    createdAt: '2026-07-15',
    aiAnalysis: {
      summary: 'Chemical contamination mitigation requiring specialized chemical filtration membranes and SHG operational training.',
      category: 'Healthcare & Sanitation',
      priority: 'Critical',
      keywords: ['Fluorosis Prevention', 'Activated Alumina', 'Community Water Filtration', 'Deoghar Safe Water'],
      requiredSkills: ['Chemical Engineering', 'Water Quality Analytics', 'Membrane Technology', 'Public Health'],
      potentialSolutions: [
        'Regenerable activated alumina adsorption filter columns',
        'Gravity-fed community kiosk with colorimetric test strips',
        'Solar UV-C disinfection secondary chamber'
      ],
      recommendedUniversities: [
        { name: 'IIT (ISM) Dhanbad', matchScore: 96, reason: 'Premier Environmental Engineering & Hydrology labs.' }
      ],
      recommendedIndustryPartners: [
        { name: 'Thermax CleanTech Labs', matchScore: 89, reason: 'Specializes in water purification media.' }
      ],
      recommendedCSROrg: [
        { name: 'Coal India Environmental CSR Foundation', matchScore: 92, reason: 'Dedicated safe water fund for East India.' }
      ],
      estimatedBeneficiaries: 1400,
      generatedAt: '2026-07-15',
      isAiGenerated: true
    },
    assignedUniversity: {
      id: 'uni-02',
      name: 'IIT (ISM) Dhanbad',
      department: 'Department of Environmental Science & Engineering'
    },
    assignedTeam: {
      id: 'team-02',
      name: 'AquaPure Innovators',
      leaderName: 'Aman Verma',
      membersCount: 5
    },
    facultyMentor: {
      id: 'fac-02',
      name: 'Prof. S. K. Gupta',
      email: 'skgupta@iitism.ac.in'
    },
    industryPartner: {
      id: 'ind-02',
      name: 'Eureka Safe Water Systems',
      supportType: 'Filter media sponsorship & ISO laboratory testing'
    },
    csrPartner: {
      id: 'csr-02',
      name: 'Adani Foundation Green Livelihood',
      fundingAmount: 480000
    },
    latestUpdate: 'Water output testing confirmed Fluoride reduction from 3.8 mg/L to 0.6 mg/L across 500 liter test batch.',
    impactMetrics: {
      peopleBenefited: 1400,
      metricsSummary: 'Fluorosis incidence prevention for 420 children across 2 primary schools.'
    }
  },
  {
    id: 'CH-2026-003',
    title: 'Off-Grid Interactive Digital Learning Kiosk for Tribal Primary Schools',
    description: 'Five government primary schools in remote Dumka hilly pockets lack dependable internet and frequent power outages hamper digital literacy classes. Teachers need rugged, battery-backed Raspberry Pi interactive learning servers loaded with regional Santhali-Hindi bilingual foundational numeracy and science modules.',
    category: 'Rural Education & Digital Access',
    district: 'Dumka',
    village: 'Kathikund Block Primary Schools',
    locationName: 'Kathikund, Dumka, Jharkhand',
    latitude: 24.2680,
    longitude: 87.2510,
    peopleAffected: 850,
    urgency: 'Medium',
    priority: 'Medium',
    expectedOutcome: 'Offline digital learning stations serving 850 elementary students with zero recurring internet costs.',
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    ],
    submittedBy: {
      id: 'usr-cit-03',
      name: 'Anand Soren (Headmaster)',
      email: 'dumka.edu.demo@civiora.gov.in'
    },
    isRealSubmission: false,
    status: 'looking_for_solution',
    progress: 25,
    currentStage: 'Verified & Open for University Student Team Proposals',
    lastUpdated: '2026-08-25',
    createdAt: '2026-08-20',
    aiAnalysis: {
      summary: 'Edge computing educational platform requiring low-power hardware, offline content caching, and localized UI.',
      category: 'Rural Education & Digital Access',
      priority: 'Medium',
      keywords: ['Offline EdTech', 'Raspberry Pi', 'Santhali Bilingual Education', 'Solar Classroom'],
      requiredSkills: ['Fullstack Web Dev', 'Linux/Embedded OS', 'UI/UX for Children', 'Educational Content Curation'],
      potentialSolutions: [
        'Local WiFi-hotspot server broadcasting offline Wikipedia & interactive quizzes',
        'Low-cost e-ink tablet integration with solar charging station',
        'Gamified phonics game in Ol Chiki and Devanagari scripts'
      ],
      recommendedUniversities: [
        { name: 'Sido Kanhu Murmu University Dumka', matchScore: 95, reason: 'Strong local tribal language and pedagogy department.' },
        { name: 'SCET Engineering College', matchScore: 88, reason: 'Active computer science and innovation teams.' }
      ],
      recommendedIndustryPartners: [
        { name: 'Infosys ESG Digital Literacy Initiative', matchScore: 90, reason: 'Provides open educational software repositories.' }
      ],
      recommendedCSROrg: [
        { name: 'Wipro Earthian & Education Trust', matchScore: 93, reason: 'Funds rural government school technology infrastructure.' }
      ],
      estimatedBeneficiaries: 850,
      generatedAt: '2026-08-20',
      isAiGenerated: true
    },
    latestUpdate: 'Challenge verified by District Education Officer; student teams can now submit proposals.'
  },
  {
    id: 'CH-2026-004',
    title: 'Decentralized Biomass Waste-to-Pelletizer for Lac and Forest Residue',
    description: 'Lac cultivators and sal leaf collection communities in Khunti generate substantial organic woody biomass that is currently burnt openly, causing particulate pollution and forest fire risks. A community-scale mechanical briquetting/pelletizer unit could convert this into eco-friendly cooking fuel and generate supplementary SHG income.',
    category: 'Renewable Energy & Power',
    district: 'Khunti',
    village: 'Murhu Block Forest Cooperatives',
    locationName: 'Murhu, Khunti, Jharkhand',
    latitude: 23.0720,
    longitude: 85.2810,
    peopleAffected: 950,
    urgency: 'Medium',
    priority: 'Medium',
    expectedOutcome: 'Community production of 2 tons clean biomass pellets per week, generating ₹15,000 monthly SHG revenue.',
    images: [
      'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80'
    ],
    submittedBy: {
      id: 'usr-cit-04',
      name: 'Birsa Purty',
      email: 'birsa.khunti.demo@civiora.gov.in'
    },
    isRealSubmission: false,
    status: 'university_assigned',
    progress: 40,
    currentStage: 'Proposal Approved & Mechanical Blueprint Drafting',
    lastUpdated: '2026-08-29',
    createdAt: '2026-08-05',
    aiAnalysis: {
      summary: 'Circular bioeconomy initiative combining mechanical engineering optimization and rural cooperative logistics.',
      category: 'Renewable Energy & Power',
      priority: 'Medium',
      keywords: ['Biomass Briquetting', 'Forest Waste Recovery', 'Clean Cooking Fuel', 'Lac Byproducts'],
      requiredSkills: ['Mechanical Design', 'Thermodynamics', 'Machine Prototyping', 'Supply Chain Economics'],
      potentialSolutions: [
        'Human/Electric hybrid biomass shredder and screw press',
        'Natural starch binder formulation using local mahua extracts'
      ],
      recommendedUniversities: [
        { name: 'NIT Jamshedpur', matchScore: 92, reason: 'Excellence in Mechanical & Manufacturing Engineering.' }
      ],
      recommendedIndustryPartners: [
        { name: 'Jindal Steel & Power Eco-Division', matchScore: 86, reason: 'Interested in sourcing green biomass pellets.' }
      ],
      recommendedCSROrg: [
        { name: 'JSPL Foundation Green Energy Fund', matchScore: 89, reason: 'Supports tribal women green entrepreneurship.' }
      ],
      estimatedBeneficiaries: 950,
      generatedAt: '2026-08-05',
      isAiGenerated: true
    },
    assignedUniversity: {
      id: 'uni-03',
      name: 'National Institute of Technology (NIT) Jamshedpur',
      department: 'Department of Mechanical Engineering'
    },
    facultyMentor: {
      id: 'fac-03',
      name: 'Dr. M. K. Paswan',
      email: 'mkpaswan@nitjsr.ac.in'
    },
    latestUpdate: 'CAD simulation completed for high-compression screw feed; metal fabrication starting next week.'
  },
  {
    id: 'CH-2026-005',
    title: 'Municipal Solid Waste Segregation AI Camera System for Dhanbad Dump Yards',
    description: 'Dhanbad municipal transit yards handle 350+ tons daily with low source segregation, causing toxic coal-belt fires and health hazards for sanitation workers. An automated conveyor optical sorting system with computer vision can classify recyclable plastics, hazardous waste, and organic matter automatically.',
    category: 'Waste Management & Environment',
    district: 'Dhanbad',
    village: 'Hirapur Municipal Yard, Dhanbad',
    locationName: 'Hirapur, Dhanbad, Jharkhand',
    latitude: 23.7957,
    longitude: 86.4304,
    peopleAffected: 12000,
    urgency: 'High',
    priority: 'High',
    expectedOutcome: 'Automated 85% sorting accuracy at 5 tons/hour on primary conveyor belts with worker safety dashboards.',
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'
    ],
    submittedBy: {
      id: 'usr-cit-05',
      name: 'Rajesh K. Pandey',
      email: 'dhanbad.civic.demo@civiora.gov.in'
    },
    isRealSubmission: false,
    status: 'implemented',
    progress: 100,
    currentStage: 'Field Implemented & Measuring Long-Term Impact',
    lastUpdated: '2026-08-20',
    createdAt: '2026-05-10',
    aiAnalysis: {
      summary: 'Computer vision robotics project solving municipal waste sorting bottlenecks in dense industrial belts.',
      category: 'Waste Management & Environment',
      priority: 'High',
      keywords: ['Edge AI', 'YOLOv8 Waste Classifier', 'Conveyor Automation', 'Dhanbad Urban Cleanliness'],
      requiredSkills: ['Computer Vision', 'PyTorch / TensorRT', 'PLC Automation', 'Industrial IoT'],
      potentialSolutions: [
        'High-speed optical camera bar with pneumatic ejection valves',
        'Hazardous battery and medical waste infrared detection'
      ],
      recommendedUniversities: [
        { name: 'IIT (ISM) Dhanbad', matchScore: 98, reason: 'Direct local proximity and AI Robotics laboratory.' }
      ],
      recommendedIndustryPartners: [
        { name: 'BCCL Tech Innovation Cell', matchScore: 94, reason: 'Co-funder for Dhanbad municipal safety enhancements.' }
      ],
      recommendedCSROrg: [
        { name: 'BCCL CSR Clean Mining Trust', matchScore: 96, reason: 'Pledged full deployment grant.' }
      ],
      estimatedBeneficiaries: 12000,
      generatedAt: '2026-05-10',
      isAiGenerated: true
    },
    assignedUniversity: {
      id: 'uni-02',
      name: 'IIT (ISM) Dhanbad',
      department: 'Department of Computer Science & Robotics Lab'
    },
    assignedTeam: {
      id: 'team-05',
      name: 'VisionClean Robotics',
      leaderName: 'Sneha Roy',
      membersCount: 4
    },
    facultyMentor: {
      id: 'fac-05',
      name: 'Dr. Tarun K. Sharma',
      email: 'tarun@iitism.ac.in'
    },
    industryPartner: {
      id: 'ind-05',
      name: 'Bharat Coking Coal Limited (BCCL)',
      supportType: 'Pilot site hosting & pneumatic sorter funding'
    },
    csrPartner: {
      id: 'csr-05',
      name: 'BCCL CSR Clean Environment Fund',
      fundingAmount: 750000
    },
    latestUpdate: 'Full automated unit deployed at Hirapur Waste Yard. 18,000 tons sorted in last 60 days with 91.4% accuracy.',
    impactMetrics: {
      peopleBenefited: 12000,
      metricsSummary: 'Reduced open dumping fires by 74% and protected 68 municipal sanitation workers from needle/glass injuries.'
    }
  },
  {
    id: 'CH-2026-006',
    title: 'Cold-Chain Mobile Evaporative Cooler for Tribal Lac and Vegetable Vendors',
    description: 'Tribal women vendors travelling from rural Gumla weekly markets lose up to 35% of perishable greens and mushrooms due to afternoon heat (42°C+). A zero-electricity zeo-cooler basket utilizing clay pots and solar evaporative pads can extend shelf life from 1 day to 4 days.',
    category: 'Livelihoods & Tribal Crafts',
    district: 'Gumla',
    village: 'Bishunpur Haat Market',
    locationName: 'Bishunpur, Gumla, Jharkhand',
    latitude: 23.3850,
    longitude: 84.3720,
    peopleAffected: 620,
    urgency: 'Medium',
    priority: 'Medium',
    expectedOutcome: 'Portable evaporative cool boxes keeping contents at 18-22°C, increasing vendor daily income by ₹200+.',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    ],
    submittedBy: {
      id: 'usr-cit-06',
      name: 'Karamchand Oraon',
      email: 'gumla.haat.demo@civiora.gov.in'
    },
    isRealSubmission: false,
    status: 'looking_for_solution',
    progress: 15,
    currentStage: 'Verified by District Administration — Awaiting Student Solutions',
    lastUpdated: '2026-08-26',
    createdAt: '2026-08-22',
    aiAnalysis: {
      summary: 'Thermodynamics and low-cost product design challenge directly targeting rural micro-entrepreneur income.',
      category: 'Livelihoods & Tribal Crafts',
      priority: 'Medium',
      keywords: ['Zero Electricity Cooling', 'Evaporative Clay Cooler', 'Vegetable Preservation', 'Gumla Tribal Economy'],
      requiredSkills: ['Thermal Engineering', 'Product Design', 'Local Materials Crafting', 'Micro-economics'],
      potentialSolutions: [
        'Clay-bamboo lightweight backpack with water capillary wick',
        'Peltier-assisted mini solar cooler for high-value mushroom batches'
      ],
      recommendedUniversities: [
        { name: 'SCET Engineering College', matchScore: 90, reason: 'Active rural innovation student clubs.' },
        { name: 'Birla Institute of Technology (BIT) Mesra', matchScore: 88, reason: 'Design & Mechanical Labs.' }
      ],
      recommendedIndustryPartners: [
        { name: 'Kisan ColdTech Solutions', matchScore: 85, reason: 'Manufactures low-cost agricultural gear.' }
      ],
      recommendedCSROrg: [
        { name: 'Vikas Bharti Bishunpur Grassroots Fund', matchScore: 95, reason: 'Leading rural development NGO in Gumla.' }
      ],
      estimatedBeneficiaries: 620,
      generatedAt: '2026-08-22',
      isAiGenerated: true
    },
    latestUpdate: 'Challenge approved by Gumla District Collectorate rural development wing.'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-citizen-demo',
    name: 'Sombari Devi',
    email: 'citizen@civiora.gov.in',
    role: 'citizen',
    district: 'Ranchi',
    location: 'Ormanjhi, Ranchi, Jharkhand',
    phone: '+91 98351 00123',
    verified: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'usr-student-demo',
    name: 'Aryan Tiwari',
    email: 'student@civiora.gov.in',
    role: 'student',
    organization: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Computer Science & Engineering',
    skills: ['IoT & Embedded Systems', 'React & Python', 'Sensor Interfacing', 'Solar Inverter Design'],
    institutionId: 'UNI-BIT-2026',
    verified: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'usr-faculty-demo',
    name: 'Dr. Alok Ranjan',
    email: 'faculty@civiora.gov.in',
    role: 'faculty',
    organization: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Department of Electrical & Electronics',
    institutionId: 'UNI-BIT-2026',
    verified: true,
    createdAt: '2026-07-20'
  },
  {
    id: 'usr-uni-demo',
    name: 'BIT Mesra Innovation Deanery',
    email: 'university@civiora.gov.in',
    role: 'university',
    organization: 'Birla Institute of Technology (BIT) Mesra',
    location: 'Mesra, Ranchi, Jharkhand',
    institutionId: 'UNI-BIT-2026',
    verified: true,
    createdAt: '2026-07-01'
  },
  {
    id: 'usr-ind-demo',
    name: 'Tata Steel Agri-Tech Lab',
    email: 'industry@civiora.gov.in',
    role: 'industry',
    organization: 'Tata Steel Innovation Center Jamshedpur',
    location: 'Jamshedpur, East Singhbhum',
    institutionId: 'IND-TATA-2026',
    verified: true,
    createdAt: '2026-07-10'
  },
  {
    id: 'usr-csr-demo',
    name: 'Tata Community Initiatives Trust',
    email: 'csr@civiora.gov.in',
    role: 'csr',
    organization: 'Tata Trusts Jharkhand Rural Fund',
    location: 'Ranchi, Jharkhand',
    institutionId: 'CSR-TATA-2026',
    verified: true,
    createdAt: '2026-07-15'
  },
  {
    id: 'usr-admin-demo',
    name: 'State Nodal Operations Admin',
    email: 'admin@civiora.gov.in',
    role: 'admin',
    organization: 'Department of Higher & Technical Education, Govt of Jharkhand',
    location: 'Ranchi Secretariat, Jharkhand',
    verified: true,
    createdAt: '2026-06-01'
  }
];

export const INITIAL_CSR_SPONSORSHIPS: CSRSponsorship[] = [
  {
    id: 'CSR-SP-001',
    challengeId: 'CH-2026-001',
    challengeTitle: 'Smart Solar-Powered Micro-Irrigation for Smallholder Tribal Farmers',
    csrOrgName: 'Tata Community Initiatives Trust',
    contactPerson: 'Manoj Sen (CSR Director)',
    contactEmail: 'csr@civiora.gov.in',
    pledgedAmount: 350000,
    focusArea: 'Sustainable Tribal Livelihoods & Water Security',
    status: 'approved',
    datePledged: '2026-08-14',
    expectedImpact: '60 acres irrigated with solar pump kits for 40 tribal families.'
  },
  {
    id: 'CSR-SP-002',
    challengeId: 'CH-2026-002',
    challengeTitle: 'Low-Cost Portable Arsenic & Fluoride Water Filtration Unit',
    csrOrgName: 'Coal India Environmental CSR Foundation',
    contactPerson: 'S. K. Mukherjee',
    contactEmail: 'csr.coalindia@civiora.gov.in',
    pledgedAmount: 480000,
    focusArea: 'Public Health & Clean Drinking Water',
    status: 'approved',
    datePledged: '2026-07-28',
    expectedImpact: 'Safe water access for 1,400 residents in fluoride-affected villages.'
  },
  {
    id: 'CSR-SP-003',
    challengeId: 'CH-2026-005',
    challengeTitle: 'Municipal Solid Waste Segregation AI Camera System for Dhanbad Dump Yards',
    csrOrgName: 'BCCL CSR Clean Environment Fund',
    contactPerson: 'Anita Rao',
    contactEmail: 'bccl.csr@civiora.gov.in',
    pledgedAmount: 750000,
    focusArea: 'Urban Sanitation & Occupational Health',
    status: 'disbursed',
    datePledged: '2026-06-05',
    expectedImpact: '12,000 citizens benefited; 74% reduction in yard fires.'
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'SUB-UNI-001',
    organizationName: 'Birla Institute of Technology (BIT) Mesra',
    orgType: 'university',
    plan: 'Pro',
    status: 'active',
    institutionId: 'UNI-BIT-2026',
    price: '₹45,000 / year (Demonstration)',
    startDate: '2026-07-01',
    expiryDate: '2027-06-30',
    seats: 250,
    features: [
      'Unlimited Student Team Creation',
      'Advanced AI Problem Matching',
      'Faculty Mentorship Dashboard',
      'Direct Industry & CSR Matchmaking',
      'Institutional Impact Certificate Exports'
    ]
  },
  {
    id: 'SUB-IND-001',
    organizationName: 'Tata Steel Innovation Center Jamshedpur',
    orgType: 'industry',
    plan: 'Enterprise',
    status: 'active',
    institutionId: 'IND-TATA-2026',
    price: '₹1,20,000 / year (Demonstration)',
    startDate: '2026-07-10',
    expiryDate: '2027-07-09',
    seats: 50,
    features: [
      'Early Talent Discovery from 50+ Colleges',
      'Joint Patent & Prototype Mentorship',
      'Direct CSR Pledging Integration',
      'ESG Compliance Social Impact Reports'
    ]
  }
];
