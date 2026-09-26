export type UserRole = 
  | 'citizen'
  | 'student'
  | 'faculty'
  | 'university'
  | 'industry'
  | 'csr'
  | 'admin';

export type ChallengeStatus =
  | 'submitted'
  | 'ai_analyzed'
  | 'under_review'
  | 'verified'
  | 'looking_for_solution'
  | 'university_assigned'
  | 'team_formed'
  | 'in_progress'
  | 'prototype'
  | 'testing'
  | 'pilot'
  | 'implemented'
  | 'impact_measured';

export type ChallengeCategory =
  | 'Agriculture & Water'
  | 'Healthcare & Sanitation'
  | 'Rural Education & Digital Access'
  | 'Renewable Energy & Power'
  | 'Waste Management & Environment'
  | 'Rural Infrastructure & Transport'
  | 'Livelihoods & Tribal Crafts'
  | 'Disaster & Flood Management'
  | 'Women Safety & Community Well-being';

export type ChallengePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  organization?: string;
  university?: string;
  company?: string;
  department?: string;
  location?: string;
  district?: string;
  state?: string;
  skills?: string[];
  institutionId?: string;
  verified?: boolean;
  createdAt?: string;
}

export interface AIAnalysis {
  summary: string;
  category: ChallengeCategory;
  priority: ChallengePriority;
  keywords: string[];
  requiredSkills: string[];
  potentialSolutions: string[];
  similarityScore?: number;
  recommendedUniversities: Array<{ name: string; matchScore: number; reason: string }>;
  recommendedIndustryPartners: Array<{ name: string; matchScore: number; reason: string }>;
  recommendedCSROrg: Array<{ name: string; matchScore: number; reason: string }>;
  estimatedBeneficiaries: number;
  generatedAt: string;
  isAiGenerated: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  district: string;
  city?: string;
  village?: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  peopleAffected: number;
  urgency: ChallengePriority;
  priority: ChallengePriority;
  expectedOutcome: string;
  images: string[];
  videos?: string[];
  documents?: string[];
  submittedBy: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  isRealSubmission: boolean; // true for real citizen posts, false for seeded demo data
  status: ChallengeStatus;
  progress: number; // 0 to 100
  currentStage: string;
  lastUpdated: string;
  createdAt: string;
  aiAnalysis?: AIAnalysis;
  similarChallengeIds?: string[];
  
  // Associated Solution Project details
  assignedUniversity?: {
    id: string;
    name: string;
    department?: string;
  };
  assignedTeam?: {
    id: string;
    name: string;
    leaderName: string;
    membersCount?: number;
    universityName?: string;
  };
  facultyMentor?: {
    id: string;
    name: string;
    email: string;
  };
  industryPartner?: {
    id: string;
    name: string;
    supportType: string;
  };
  csrPartner?: {
    id?: string;
    name: string;
    fundingAmount?: number;
    disbursedAmount?: number;
    milestones?: any[];
  };
  
  latestUpdate?: string;
  impactMetrics?: {
    peopleBenefited: number;
    metricsSummary: string;
  };
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  feedback?: string;
  submittedEvidence?: string;
}

export interface Project {
  id: string;
  challengeId: string;
  challengeTitle: string;
  category: ChallengeCategory;
  district: string;
  studentTeamId: string;
  studentTeamName: string;
  universityName: string;
  facultyMentorName: string;
  facultyMentorEmail: string;
  industryPartnerName?: string;
  csrPartnerName?: string;
  fundingAmount?: number;
  status: ChallengeStatus;
  progress: number;
  currentStage: string;
  startDate: string;
  expectedCompletion: string;
  latestUpdate: string;
  milestones: ProjectMilestone[];
  prototypeUrl?: string;
  testResultsSummary?: string;
  createdAt: string;
}

export interface StudentTeam {
  id: string;
  name: string;
  universityName: string;
  department: string;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  members: Array<{ name: string; email: string; role: string }>;
  skills: string[];
  challengeId?: string;
  challengeTitle?: string;
  status: 'forming' | 'proposal_submitted' | 'active' | 'completed';
}

export interface Message {
  id: string;
  challengeId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientRole?: UserRole;
  text: string;
  timestamp: string;
  attachments?: string[];
  isRead?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'challenge' | 'milestone' | 'proposal' | 'csr' | 'verification' | 'system';
  link?: string;
  timestamp: string;
  isRead: boolean;
}

export interface CSRSponsorship {
  id: string;
  challengeId: string;
  challengeTitle: string;
  csrOrgName: string;
  contactPerson: string;
  contactEmail: string;
  pledgedAmount: number;
  focusArea: string;
  status: 'pledged' | 'approved' | 'disbursed';
  datePledged: string;
  expectedImpact: string;
}

export interface Subscription {
  id: string;
  organizationName: string;
  orgType: 'university' | 'industry';
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'trial' | 'active' | 'expired';
  institutionId: string;
  price: string;
  startDate: string;
  expiryDate: string;
  seats: number;
  features: string[];
}

export interface ImpactStats {
  peopleBenefited: number;
  communitiesReached: number;
  problemsSolved: number;
  solutionsImplemented: number;
  activeProjects: number;
  participatingUniversities: number;
  industryPartners: number;
  csrFundsMobilized: number;
  waterSavedLiters: number;
  greenEnergyKw: number;
}
