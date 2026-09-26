import React, { useState } from 'react';
import { Challenge, ImpactStats } from '../types';
import { ChallengeCard } from './ChallengeCard';
import { CivioraLogo } from './CivioraLogo';
import civicCampusBg from '../assets/images/civic_campus_bg_1790235076622.jpg';
import { 
  ArrowRight, 
  PlusCircle, 
  Compass, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Cpu, 
  Droplet, 
  SunMedium, 
  HeartPulse, 
  BookOpen, 
  Recycle, 
  TreePine,
  Search,
  MessageSquare,
  UserCheck,
  Smartphone,
  Eye,
  Activity,
  FileCheck2,
  FolderKanban
} from 'lucide-react';

interface LandingPageProps {
  challenges: Challenge[];
  impactStats: ImpactStats;
  onNavigate: (view: string) => void;
  onOpenReportModal: () => void;
  onViewDetails: (challenge: Challenge) => void;
  onSolveChallenge: (challenge: Challenge) => void;
  onSponsorCSR: (challenge: Challenge) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  challenges,
  impactStats,
  onNavigate,
  onOpenReportModal,
  onViewDetails,
  onSolveChallenge,
  onSponsorCSR
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredChallenges = challenges.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('explore');
  };

  const domains = [
    { title: 'Agriculture & Water', icon: Droplet, count: '14 Challenges', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { title: 'Healthcare & Sanitation', icon: HeartPulse, count: '9 Challenges', color: 'text-teal-700 bg-teal-50 border-teal-200' },
    { title: 'Rural Education & Digital Access', icon: BookOpen, count: '11 Challenges', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { title: 'Renewable Energy & Power', icon: SunMedium, count: '8 Challenges', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { title: 'Waste Management & Environment', icon: Recycle, count: '7 Challenges', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { title: 'Livelihoods & Tribal Crafts', icon: TreePine, count: '6 Challenges', color: 'text-slate-700 bg-slate-100 border-slate-200' },
  ];

  const workflowSteps = [
    { num: '01', title: 'Citizen Reports Problem', desc: 'Citizens upload genuine local issues with ground photos, geolocation coordinates, and community impact data.', icon: Users, color: 'text-emerald-700 bg-emerald-50' },
    { num: '02', title: 'AI Analysis & Domain Decomp', desc: 'Decision-support AI extracts key technical skills, potential architectures, and evaluates similarity against existing challenges.', icon: Cpu, color: 'text-teal-700 bg-teal-50' },
    { num: '03', title: 'District & Faculty Verification', desc: 'District Nodal Officers and academic experts verify ground authenticity and approve challenges for the public repository.', icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-50' },
    { num: '04', title: 'University & Student Teams', desc: 'Engineering & college student teams discover verified challenges, form multidisciplinary squads, and submit proposals.', icon: GraduationCap, color: 'text-slate-800 bg-slate-100' },
    { num: '05', title: 'Industry Tech & CSR Sponsorship', desc: 'Corporate tech partners offer lab prototyping and mentorship; CSR foundations provide milestone-linked grants.', icon: HeartHandshake, color: 'text-emerald-700 bg-emerald-50' },
    { num: '06', title: 'Field Deployment & Impact', desc: 'Tested prototypes are deployed to the village. Citizens track live progress and verified social impact metrics are published.', icon: TrendingUp, color: 'text-teal-700 bg-teal-50' },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION WITH CIVIC CAMPUS BACKGROUND (HOME PAGE ONLY) */}
      <section 
        className="relative pt-12 pb-24 overflow-hidden border-b border-slate-200 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.88) 45%, rgba(248, 250, 252, 0.98) 100%), url(${civicCampusBg})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          {/* Top Header Pill & Sub-Title */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-xs font-bold text-emerald-800 uppercase tracking-wider shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>National Societal Innovation Collaboration Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] font-['Cabinet_Grotesk'] text-slate-900">
              Reimagining the <br className="hidden sm:inline" />
              <span className="text-emerald-700">Digital Citizen</span> Experience
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              A next-generation civic platform connecting communities, universities, and industries to crowdsource and solve genuine societal problems through collaborative innovation.
            </p>
          </div>

          {/* 5 ICONIC PILLARS (DIRECTLY MATCHING THE REFERENCE CIVIC DESIGN) */}
          <div className="pt-2 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
              
              {/* Pillar 1: AI Assistant */}
              <div className="flex flex-col items-center text-center space-y-2.5 group">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-600/30 bg-white/90 shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:border-emerald-600 transition-all">
                  <MessageSquare className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">AI ASSISTANT</p>
                  <p className="text-[10px] text-slate-500 hidden sm:block">Smart domain matching</p>
                </div>
              </div>

              {/* Pillar 2: Personalized Experience */}
              <div className="flex flex-col items-center text-center space-y-2.5 group">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-600/30 bg-white/90 shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:border-emerald-600 transition-all">
                  <UserCheck className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">PERSONALIZED</p>
                  <p className="text-[10px] text-slate-500 hidden sm:block">Role-specific dashboards</p>
                </div>
              </div>

              {/* Pillar 3: Mobile First / Field Tagged */}
              <div className="flex flex-col items-center text-center space-y-2.5 group">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-600/30 bg-white/90 shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:border-emerald-600 transition-all">
                  <Smartphone className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">MOBILE FIRST</p>
                  <p className="text-[10px] text-slate-500 hidden sm:block">Ground GPS & photos</p>
                </div>
              </div>

              {/* Pillar 4: Secure & Trusted */}
              <div className="flex flex-col items-center text-center space-y-2.5 group">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-600/30 bg-white/90 shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:border-emerald-600 transition-all">
                  <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">SECURE & TRUSTED</p>
                  <p className="text-[10px] text-slate-500 hidden sm:block">District nodal verified</p>
                </div>
              </div>

              {/* Pillar 5: Accessible For All */}
              <div className="flex flex-col items-center text-center space-y-2.5 group col-span-2 sm:col-span-1">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-600/30 bg-white/90 shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:border-emerald-600 transition-all">
                  <Users className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">ACCESSIBLE FOR ALL</p>
                  <p className="text-[10px] text-slate-500 hidden sm:block">100% free for citizens</p>
                </div>
              </div>

            </div>
          </div>

          {/* CIVIC SEARCH & QUICK SERVICE ACTIONS (INSPIRED BY THE LAPTOP DISPLAY IN REFERENCE IMAGE) */}
          <div className="max-w-4xl mx-auto space-y-5">
            
            {/* Search Pill Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center rounded-full bg-white shadow-lg border border-slate-200/90 p-2 pl-5 transition-all focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-emerald-600">
                <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search societal challenges, districts (e.g., Ranchi, Dhanbad), categories..."
                  className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* 4 Popular Services Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={onOpenReportModal}
                className="p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Report a Challenge</p>
                <p className="text-[10px] text-slate-500">Citizen ground issue</p>
              </button>

              <button
                onClick={() => onNavigate('explore')}
                className="p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Explore Challenges</p>
                <p className="text-[10px] text-slate-500">Browse verified repository</p>
              </button>

              <button
                onClick={() => onNavigate('portal-student')}
                className="p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Student Squads</p>
                <p className="text-[10px] text-slate-500">Engineering capstones</p>
              </button>

              <button
                onClick={() => onNavigate('portal-csr')}
                className="p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">CSR Sponsoring</p>
                <p className="text-[10px] text-slate-500">Milestone grant releases</p>
              </button>
            </div>

          </div>

          {/* VISUAL ECOSYSTEM NETWORK (8-STAGE INNOVATION LIFECYCLE) */}
          <div className="pt-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg space-y-4 text-left">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  The CIVIORA Innovation Lifecycle
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Permanent Digital Trail • Milestone-Linked</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
                
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">1. Citizen</span>
                  <p className="font-bold text-slate-900 text-[11px]">Problem Input</p>
                  <span className="text-[9px] text-slate-500">Ground Photos</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-teal-700 font-bold uppercase">2. AI Engine</span>
                  <p className="font-bold text-slate-900 text-[11px]">Domain Analysis</p>
                  <span className="text-[9px] text-slate-500">Skills Match</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">3. Gov Review</span>
                  <p className="font-bold text-slate-900 text-[11px]">Verification</p>
                  <span className="text-[9px] text-slate-500">Nodal Signoff</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-700 font-bold uppercase">4. University</span>
                  <p className="font-bold text-slate-900 text-[11px]">Dept Assign</p>
                  <span className="text-[9px] text-slate-500">Dean Routing</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">5. Students</span>
                  <p className="font-bold text-slate-900 text-[11px]">Team Proposal</p>
                  <span className="text-[9px] text-slate-500">Capstone Code</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-teal-700 font-bold uppercase">6. CSR / R&D</span>
                  <p className="font-bold text-slate-900 text-[11px]">Grant Escrow</p>
                  <span className="text-[9px] text-slate-500">Hardware Fund</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-700 font-bold uppercase">7. Testing</span>
                  <p className="font-bold text-slate-900 text-[11px]">Prototype Lab</p>
                  <span className="text-[9px] text-slate-500">Field Trial</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">8. Impact</span>
                  <p className="font-bold text-emerald-900 text-[11px]">Live Solution</p>
                  <span className="text-[9px] text-emerald-700">Measured Data</span>
                </div>

              </div>

            </div>
          </div>

          {/* SLEEK DARK CIVIC VALUE BAR (DIRECTLY MATCHING THE BOTTOM BAR IN REFERENCE IMAGE) */}
          <div className="pt-2 max-w-5xl mx-auto">
            <div className="bg-[#091512] text-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-emerald-950/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Cpu className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Smarter Services</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    AI-powered search and skill guidance to help you find what you need.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <UserCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Personalized</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    A tailored experience based on your role, activity, and needs.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Eye className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Transparent City</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Real-time updates on projects, budgets, and district initiatives.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Activity className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Engaged Community</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Discover programs, faculty mentors, and collaboration opportunities.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Users className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Built for Everyone</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Accessible, inclusive, and designed for all grassroots citizens.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. REAL-TIME IMPACT COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Citizen Lives Benefited</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 font-['Cabinet_Grotesk']">
              {impactStats.peopleBenefited.toLocaleString('en-IN')}+
            </p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 w-4/5"></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Across 24 Jharkhand Districts</p>
          </div>

          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Solutions Implemented</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 font-['Cabinet_Grotesk']">
              {impactStats.problemsSolved}
            </p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 w-full"></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">100% Community Field Verified</p>
          </div>

          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Partner Institutions</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 font-['Cabinet_Grotesk']">
              {impactStats.participatingUniversities}
            </p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 w-3/4"></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">BIT Mesra, NIT, IIT ISM Dhanbad</p>
          </div>

          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">CSR Grants Mobilized</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 font-['Cabinet_Grotesk']">
              ₹{(impactStats.csrFundsMobilized / 10000000).toFixed(2)} Cr
            </p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 w-[92%]"></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Escrow Milestone Released</p>
          </div>

        </div>
      </section>

      {/* 3. PROBLEM DOMAINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-1">Focus Areas</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Cabinet_Grotesk']">
              Societal Innovation Problem Domains
            </h2>
            <p className="text-sm text-slate-500">Addressing core rural and urban sustainability bottlenecks.</p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((dom, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('explore')}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow hover:border-emerald-600 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${dom.color}`}>
                  {React.createElement(dom.icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {dom.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">{dom.count}</span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED CHALLENGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Crowdsourced Challenges
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Cabinet_Grotesk']">
              Featured Grassroots Challenges
            </h2>
            <p className="text-sm text-slate-500">
              Problems submitted by real citizens, with active student teams & university progress.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              + Report Problem
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              View All ({challenges.length})
            </button>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onViewDetails={onViewDetails}
              onSolve={onSolveChallenge}
              onSponsor={onSponsorCSR}
            />
          ))}
        </div>
      </section>

      {/* 5. HOW CIVIORA WORKS (6-Step Structured Flow) */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">Ecosystem Architecture</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Cabinet_Grotesk']">
              How CIVIORA Solves Grassroots Problems
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              A transparent, end-to-end framework transforming community distress into deployable technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow hover:border-emerald-600 transition-all space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                    {React.createElement(step.icon, { className: 'w-5 h-5' })}
                  </div>
                  <span className="text-2xl font-black text-slate-300 font-['Cabinet_Grotesk']">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. MULTI-STAKEHOLDER VALUE PROPOSITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">Stakeholder Network</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Cabinet_Grotesk']">
            Empowering Every Participant in the Ecosystem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Universities & Students */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Universities & Students</h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Real-world societal capstone and thesis problem statements.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct mentorship from industry R&D engineers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>NAAC/NIRF social innovation accreditation metrics.</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('portal-student')}
              className="pt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Explore Student Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Industry & Startups */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Industry & Startups</h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Talent discovery from 50+ engineering institutions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Co-create early IP and test hardware on real ground fields.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transparent ESG & CSR compliance reporting.</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('portal-industry')}
              className="pt-2 text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Industry Innovation Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* CSR & Government */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">CSR & Government</h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Milestone-linked funding with zero leakage.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Real-time district societal challenge heatmap analytics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Verifiable social impact metrics per rupee deployed.</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('portal-csr')}
              className="pt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>CSR Sponsoring Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. BUSINESS MODEL & SUSTAINABILITY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#091512] text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-emerald-950/80 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white uppercase tracking-wider">
              Sustainable Business Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cabinet_Grotesk']">
              How CIVIORA Sustains Itself
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              CIVIORA does not charge citizens to report problems, nor does it charge students to build solutions. 
              The platform earns institutional revenue from Universities, Industry Partners, and CSR grants seeking advanced innovation management and impact verification.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span><strong>Citizens:</strong> 100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span><strong>Students:</strong> 100% Free Access to Problems & Mentorship</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span><strong>Universities & Industry:</strong> Tiered Institutional Subscriptions</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('business-model')}
              className="mt-4 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
            >
              <span>View Full Pricing & Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#122b24] border border-emerald-900/60 p-5 rounded-2xl space-y-2 shadow-sm text-slate-300">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">University Tier</span>
              <h4 className="font-bold text-sm text-white">University Pro Plan</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">Includes student team management, AI project matching, faculty dashboards, and NIRF export reports.</p>
              <div className="text-sm font-bold text-white pt-1">₹45,000 / year</div>
            </div>

            <div className="bg-[#122b24] border border-emerald-900/60 p-5 rounded-2xl space-y-2 shadow-sm text-slate-300">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Industry & CSR Tier</span>
              <h4 className="font-bold text-sm text-white">Corporate Innovation</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">Includes talent scouting, prototype incubation, patent collaboration, and CSR disbursement tracking.</p>
              <div className="text-sm font-bold text-white pt-1">₹1,20,000 / year</div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-6 shadow-sm">
          <div className="cursor-pointer inline-block" onClick={() => onNavigate('home')}>
            <CivioraLogo variant="dark" size="xl" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Cabinet_Grotesk']">
              Join the Societal Innovation Movement
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Whether you are a citizen with a local water crisis, a student ready to build an IoT prototype, or a university seeking real capstone projects — CIVIORA is your collaborative launchpad.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={onOpenReportModal}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              Report a Problem Now
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              Explore Open Challenges
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
