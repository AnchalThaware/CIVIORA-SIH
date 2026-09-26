import mongoose, { Schema, Model } from "mongoose";

// Disable buffering so queries fail immediately or fallback cleanly if disconnected
mongoose.set("bufferCommands", false);

// ==========================================
// 1. USER SCHEMA & MODEL
// ==========================================
export interface IUser {
  id?: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'citizen' | 'student' | 'faculty' | 'university' | 'industry' | 'csr' | 'admin';
  organizationName?: string;
  universityName?: string;
  organization?: string;
  university?: string;
  company?: string;
  department?: string;
  skills?: string[];
  district?: string;
  location?: string;
  phone?: string;
  institutionId?: string;
  verified?: boolean;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
    role: {
      type: String,
      enum: ['citizen', 'student', 'faculty', 'university', 'industry', 'csr', 'admin'],
      default: 'citizen',
    },
    organizationName: { type: String, default: '' },
    universityName: { type: String, default: '' },
    organization: { type: String, default: '' },
    university: { type: String, default: '' },
    company: { type: String, default: '' },
    department: { type: String, default: '' },
    skills: { type: [String], default: [] },
    district: { type: String, default: 'Ranchi' },
    location: { type: String, default: 'Jharkhand, India' },
    phone: { type: String, default: '' },
    institutionId: { type: String },
    verified: { type: Boolean, default: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret.__v;
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

export const UserModel: Model<any> = mongoose.models.User || mongoose.model('User', UserSchema);

// ==========================================
// 2. CHALLENGE SCHEMA & MODEL
// ==========================================
export interface IChallenge {
  id?: string;
  customId?: string;
  title: string;
  description: string;
  category: string;
  district: string;
  city?: string;
  village?: string;
  location?: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  videos?: string[];
  documents?: string[];
  peopleAffected?: number;
  urgency?: string;
  priority?: string;
  expectedOutcome?: string;
  submittedBy?: {
    id?: string;
    name: string;
    email: string;
    phone?: string;
  };
  submitterEmail?: string;
  isRealSubmission?: boolean;
  isDemo?: boolean;
  status?: string;
  progress?: number;
  currentStage?: string;
  lastUpdated?: string;
  aiSummary?: string;
  aiCategory?: string;
  aiKeywords?: string[];
  requiredExpertise?: string[];
  aiTags?: string[];
  similarityMatches?: any[];
  assignedUniversity?: {
    id?: string;
    name: string;
    department?: string;
  };
  assignedStudentTeam?: {
    id?: string;
    name: string;
    leaderName?: string;
    membersCount?: number;
    universityName?: string;
  };
  assignedTeam?: {
    id?: string;
    name: string;
    leaderName?: string;
    membersCount?: number;
    universityName?: string;
  };
  facultyMentor?: {
    id?: string;
    name: string;
    email: string;
  };
  industryPartner?: {
    id?: string;
    name: string;
    supportType?: string;
  };
  csrPartner?: {
    id?: string;
    name: string;
    fundingAmount?: number;
    disbursedAmount?: number;
    milestones?: any[];
  };
  aiAnalysis?: any;
  similarChallengeIds?: string[];
  latestUpdate?: string;
  impactMetrics?: {
    peopleBenefited: number;
    metricsSummary: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const ChallengeSchema = new Schema(
  {
    customId: { type: String, unique: true, sparse: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    district: { type: String, required: true, index: true },
    city: { type: String, default: '' },
    village: { type: String, default: '' },
    location: { type: String, default: '' },
    locationName: { type: String, default: '' },
    latitude: { type: Number, default: 23.3441 },
    longitude: { type: Number, default: 85.3096 },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    documents: { type: [String], default: [] },
    peopleAffected: { type: Number, default: 500 },
    urgency: { type: String, default: 'High' },
    priority: { type: String, default: 'High' },
    expectedOutcome: { type: String, default: '' },
    submittedBy: {
      id: { type: String },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    submitterEmail: { type: String },
    isRealSubmission: { type: Boolean, default: true },
    isDemo: { type: Boolean, default: false },
    status: {
      type: String,
      default: 'submitted',
      index: true,
    },
    progress: { type: Number, default: 5, min: 0, max: 100 },
    currentStage: { type: String, default: 'Submitted by Citizen — Under Review' },
    lastUpdated: { type: String, default: () => new Date().toISOString().split('T')[0] },
    aiSummary: { type: String },
    aiCategory: { type: String },
    aiKeywords: { type: [String], default: [] },
    requiredExpertise: { type: [String], default: [] },
    aiTags: { type: [String], default: [] },
    similarityMatches: { type: Array, default: [] },
    assignedUniversity: {
      id: { type: String },
      name: { type: String },
      department: { type: String },
    },
    assignedStudentTeam: {
      id: { type: String },
      name: { type: String },
      leaderName: { type: String },
      membersCount: { type: Number },
      universityName: { type: String },
    },
    assignedTeam: {
      id: { type: String },
      name: { type: String },
      leaderName: { type: String },
      membersCount: { type: Number },
      universityName: { type: String },
    },
    facultyMentor: {
      id: { type: String },
      name: { type: String },
      email: { type: String },
    },
    industryPartner: {
      id: { type: String },
      name: { type: String },
      supportType: { type: String },
    },
    csrPartner: {
      id: { type: String },
      name: { type: String },
      fundingAmount: { type: Number },
      disbursedAmount: { type: Number },
      milestones: { type: Array, default: [] },
    },
    aiAnalysis: { type: Schema.Types.Mixed },
    similarChallengeIds: { type: [String], default: [] },
    latestUpdate: { type: String },
    impactMetrics: {
      peopleBenefited: { type: Number, default: 0 },
      metricsSummary: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const ChallengeModel: Model<any> = mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);

// ==========================================
// 3. TEAM SCHEMA & MODEL
// ==========================================
export interface ITeam {
  id?: string;
  customId?: string;
  name: string;
  universityName: string;
  universityId?: string;
  department?: string;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  members: Array<{ name: string; email: string; role: string }>;
  studentIds?: string[];
  facultyMentorId?: string;
  skills?: string[];
  challengeId?: string;
  challengeTitle?: string;
  proposalText?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TeamSchema = new Schema(
  {
    customId: { type: String, sparse: true, index: true },
    name: { type: String, required: true },
    universityName: { type: String, required: true },
    universityId: { type: String },
    department: { type: String, default: 'Engineering & Technology' },
    leaderId: { type: String, required: true },
    leaderName: { type: String, required: true },
    leaderEmail: { type: String, required: true },
    members: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, default: 'Member' },
      },
    ],
    studentIds: { type: [String], default: [] },
    facultyMentorId: { type: String },
    skills: { type: [String], default: [] },
    challengeId: { type: String, index: true },
    challengeTitle: { type: String },
    proposalText: { type: String },
    status: {
      type: String,
      default: 'forming',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const TeamModel: Model<any> = mongoose.models.Team || mongoose.model('Team', TeamSchema);

// ==========================================
// 4. MESSAGE SCHEMA & MODEL
// ==========================================
export interface IMessage {
  id?: string;
  customId?: string;
  challengeId: string;
  senderId: string;
  receiverId?: string;
  senderName: string;
  senderRole: string;
  recipientRole?: string;
  text: string;
  message?: string;
  attachments?: string[];
  read?: boolean;
  isRead?: boolean;
  timestamp?: string;
  createdAt?: Date;
}

const MessageSchema = new Schema(
  {
    customId: { type: String, sparse: true },
    challengeId: { type: String, required: true, index: true },
    senderId: { type: String, required: true },
    receiverId: { type: String },
    senderName: { type: String, default: 'Participant' },
    senderRole: { type: String, default: 'student' },
    recipientRole: { type: String },
    text: { type: String, required: true },
    message: { type: String },
    attachments: { type: [String], default: [] },
    read: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
    timestamp: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const MessageModel: Model<any> = mongoose.models.Message || mongoose.model('Message', MessageSchema);

// ==========================================
// 5. CSR SPONSORSHIP SCHEMA & MODEL
// ==========================================
export interface ICSRSponsorship {
  id?: string;
  customId?: string;
  challengeId: string;
  challengeTitle?: string;
  companyId?: string;
  csrOrgName: string;
  contactPerson?: string;
  contactEmail?: string;
  sponsorshipType?: string;
  amount?: number;
  pledgedAmount: number;
  technologySupport?: string;
  mentorship?: boolean;
  testingSupport?: boolean;
  deploymentSupport?: boolean;
  focusArea?: string;
  expectedImpact?: string;
  status?: string;
  datePledged?: string;
  createdAt?: Date;
}

const CSRSponsorshipSchema = new Schema(
  {
    customId: { type: String, sparse: true, index: true },
    challengeId: { type: String, required: true, index: true },
    challengeTitle: { type: String },
    companyId: { type: String },
    csrOrgName: { type: String, required: true },
    contactPerson: { type: String, default: 'CSR Officer' },
    contactEmail: { type: String, default: 'csr@civiora.gov.in' },
    sponsorshipType: { type: String, default: 'Grant / Funding' },
    amount: { type: Number },
    pledgedAmount: { type: Number, required: true },
    technologySupport: { type: String },
    mentorship: { type: Boolean, default: true },
    testingSupport: { type: Boolean, default: true },
    deploymentSupport: { type: Boolean, default: true },
    focusArea: { type: String, default: 'Rural Technology Innovation' },
    expectedImpact: { type: String, default: 'Field pilot and hardware fabrication' },
    status: {
      type: String,
      default: 'approved',
    },
    datePledged: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const CSRSponsorshipModel: Model<any> = mongoose.models.CSRSponsorship || mongoose.model('CSRSponsorship', CSRSponsorshipSchema);

// ==========================================
// 6. SUBSCRIPTION SCHEMA & MODEL
// ==========================================
export interface ISubscription {
  id?: string;
  customId?: string;
  organizationId?: string;
  organizationName: string;
  organizationType?: string;
  orgType?: string;
  plan?: string;
  status?: string;
  accessToken?: string;
  institutionId: string;
  price?: string;
  startDate?: string;
  expiryDate?: string;
  expiresAt?: Date;
  seats?: number;
  features?: string[];
  createdAt?: Date;
}

const SubscriptionSchema = new Schema(
  {
    customId: { type: String, sparse: true, index: true },
    organizationId: { type: String },
    organizationName: { type: String, required: true },
    organizationType: { type: String, default: 'university' },
    orgType: { type: String, default: 'university' },
    plan: { type: String, default: 'Pro' },
    status: { type: String, default: 'active' },
    accessToken: { type: String },
    institutionId: { type: String, required: true },
    price: { type: String, default: '₹45,000 / year (Demonstration)' },
    startDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    expiryDate: { type: String, default: () => new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0] },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 365 * 86400000) },
    seats: { type: Number, default: 100 },
    features: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const SubscriptionModel: Model<any> = mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);

// ==========================================
// 7. PROJECT SCHEMA & MODEL
// ==========================================
export interface IProject {
  id?: string;
  customId?: string;
  challengeId: string;
  challengeTitle?: string;
  category?: string;
  district?: string;
  universityId?: string;
  universityName?: string;
  teamId?: string;
  studentTeamId?: string;
  studentTeamName?: string;
  facultyMentorId?: string;
  facultyMentorName?: string;
  facultyMentorEmail?: string;
  industryPartnerId?: string;
  industryPartnerName?: string;
  csrPartnerName?: string;
  fundingAmount?: number;
  currentStage?: string;
  progress?: number;
  status?: string;
  milestones?: any[];
  deliverables?: string[];
  testingResults?: string;
  testResultsSummary?: string;
  prototypeUrl?: string;
  implementationStatus?: string;
  impactMetrics?: any;
  latestUpdate?: string;
  startDate?: string;
  expectedCompletion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema(
  {
    customId: { type: String, sparse: true, index: true },
    challengeId: { type: String, required: true, index: true },
    challengeTitle: { type: String },
    category: { type: String },
    district: { type: String },
    universityId: { type: String },
    universityName: { type: String },
    teamId: { type: String },
    studentTeamId: { type: String },
    studentTeamName: { type: String },
    facultyMentorId: { type: String },
    facultyMentorName: { type: String },
    facultyMentorEmail: { type: String },
    industryPartnerId: { type: String },
    industryPartnerName: { type: String },
    csrPartnerName: { type: String },
    fundingAmount: { type: Number, default: 0 },
    currentStage: { type: String, default: 'Project Initiated' },
    progress: { type: Number, default: 10 },
    status: { type: String, default: 'in_progress' },
    milestones: { type: Array, default: [] },
    deliverables: { type: [String], default: [] },
    testingResults: { type: String, default: '' },
    testResultsSummary: { type: String, default: '' },
    prototypeUrl: { type: String, default: '' },
    implementationStatus: { type: String, default: 'Active Prototyping' },
    impactMetrics: { type: Schema.Types.Mixed },
    latestUpdate: { type: String, default: 'Project initialized.' },
    startDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    expectedCompletion: { type: String, default: () => new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const ProjectModel: Model<any> = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// ==========================================
// 8. NOTIFICATION SCHEMA & MODEL
// ==========================================
export interface INotification {
  id?: string;
  customId?: string;
  userId: string;
  title: string;
  message: string;
  type?: string;
  link?: string;
  isRead?: boolean;
  read?: boolean;
  timestamp?: string;
  createdAt?: Date;
}

const NotificationSchema = new Schema(
  {
    customId: { type: String, sparse: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: 'system' },
    link: { type: String },
    isRead: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    timestamp: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret.customId || (ret._id ? ret._id.toString() : ret.id);
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const NotificationModel: Model<any> = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
