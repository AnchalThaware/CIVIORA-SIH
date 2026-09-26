import React, { useState, useEffect } from 'react';
import { Challenge, ChallengeCategory, ChallengePriority, ChallengeStatus } from '../types';
import { ChallengeCard } from './ChallengeCard';
import { JHARKHAND_DISTRICTS, CATEGORIES } from '../data/mockData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Sparkles, 
  SlidersHorizontal, 
  RefreshCw, 
  PlusCircle, 
  Layers, 
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ChallengeExplorerProps {
  challenges: Challenge[];
  isLoading: boolean;
  onRefresh: () => void;
  onViewDetails: (challenge: Challenge) => void;
  onOpenReportModal: () => void;
  onSolveChallenge: (challenge: Challenge) => void;
  onSponsorCSR: (challenge: Challenge) => void;
}

export const ChallengeExplorer: React.FC<ChallengeExplorerProps> = ({
  challenges,
  isLoading,
  onRefresh,
  onViewDetails,
  onOpenReportModal,
  onSolveChallenge,
  onSponsorCSR
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedRealType, setSelectedRealType] = useState<string>('All'); // 'All', 'real', 'demo'
  const [sortBy, setSortBy] = useState<string>('newest');

  // Filter & Sort logic
  const filteredChallenges = challenges.filter((c) => {
    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchDist = c.district.toLowerCase().includes(q);
      const matchVillage = c.village?.toLowerCase().includes(q);
      const matchKeywords = c.aiAnalysis?.keywords?.some(k => k.toLowerCase().includes(q));
      const matchSkills = c.aiAnalysis?.requiredSkills?.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchDist && !matchVillage && !matchKeywords && !matchSkills) {
        return false;
      }
    }

    // Category
    if (selectedCategory !== 'All' && c.category !== selectedCategory) {
      return false;
    }

    // District
    if (selectedDistrict !== 'All' && c.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }

    // Priority
    if (selectedPriority !== 'All' && c.priority !== selectedPriority && c.urgency !== selectedPriority) {
      return false;
    }

    // Status
    if (selectedStatus !== 'All' && c.status !== selectedStatus) {
      return false;
    }

    // Real vs Demo
    if (selectedRealType === 'real' && !c.isRealSubmission) {
      return false;
    }
    if (selectedRealType === 'demo' && c.isRealSubmission) {
      return false;
    }

    return true;
  });

  // Sort
  filteredChallenges.sort((a, b) => {
    if (sortBy === 'affected') {
      return b.peopleAffected - a.peopleAffected;
    }
    if (sortBy === 'priority') {
      const priorityWeight: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    if (sortBy === 'progress') {
      return b.progress - a.progress;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const realCount = challenges.filter(c => c.isRealSubmission).length;
  const demoCount = challenges.filter(c => !c.isRealSubmission).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm">
              Public Challenge Repository
            </span>
            <span className="text-xs text-slate-400">
              Permanent Records • Real-Time Progress Updates
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk']">
            Explore Verified Societal Challenges
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Browse genuine grassroots problems submitted by citizens across Jharkhand. Discover technical requirements, AI insights, assigned university teams, and CSR sponsorship opportunities.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {realCount} Real Citizen Submissions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              {demoCount} Seeded Demonstration Cases
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Main Search Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by problem title, district, village, keywords, or required skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900 transition-colors"
            />
          </div>

          <button
            onClick={onOpenReportModal}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report New Challenge</span>
          </button>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-100 text-xs">
          
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Domain</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs outline-none focus:border-blue-500"
            >
              <option value="All">All Domains</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">District (Jharkhand)</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs outline-none focus:border-blue-500"
            >
              <option value="All">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs outline-none focus:border-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="verified">Verified</option>
              <option value="looking_for_solution">Looking for Solution</option>
              <option value="in_progress">In Progress</option>
              <option value="prototype">Prototype Stage</option>
              <option value="testing">Field Testing</option>
              <option value="implemented">Implemented</option>
            </select>
          </div>

          {/* Real vs Demo Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Data Source</label>
            <select
              value={selectedRealType}
              onChange={(e) => setSelectedRealType(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs outline-none focus:border-blue-500"
            >
              <option value="All">All Submissions</option>
              <option value="real">Real Citizen Submissions</option>
              <option value="demo">Demo Data</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs outline-none focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="affected">Most People Affected</option>
              <option value="priority">Highest Priority</option>
              <option value="progress">Highest Progress %</option>
            </select>
          </div>

        </div>

      </div>

      {/* Active Filter Badges & Count */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span>Showing <strong className="text-slate-900">{filteredChallenges.length}</strong> societal challenges</span>
          {(selectedCategory !== 'All' || selectedDistrict !== 'All' || selectedPriority !== 'All' || selectedStatus !== 'All' || selectedRealType !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDistrict('All');
                setSelectedPriority('All');
                setSelectedStatus('All');
                setSelectedRealType('All');
                setSearchTerm('');
              }}
              className="text-blue-600 hover:underline font-semibold text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onViewDetails={onViewDetails}
              onSolve={onSolveChallenge}
              onSponsor={onSponsorCSR}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No challenges match your search filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your domain, district, or search keywords. You can also be the first to report a challenge from this district!
          </p>
          <button
            onClick={onOpenReportModal}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
          >
            Report a Problem Now
          </button>
        </div>
      )}

    </div>
  );
};
