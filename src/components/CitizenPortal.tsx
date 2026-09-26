import React from 'react';
import { Challenge, User } from '../types';
import { ChallengeCard } from './ChallengeCard';
import { 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MessageSquare, 
  TrendingUp, 
  Building2, 
  GraduationCap, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface CitizenPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onOpenReportModal: () => void;
  onViewDetails: (challenge: Challenge) => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  challenges,
  currentUser,
  onOpenReportModal,
  onViewDetails,
}) => {
  // Real submissions or all submissions submitted by citizen
  const citizenSubmissions = challenges.filter(
    (c) => c.isRealSubmission || c.submittedBy.id === currentUser?.id || c.submittedBy.email === currentUser?.email
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Portal Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Citizen Reporting & Tracking Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            Welcome, {currentUser?.name || 'Citizen Innovator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track all problems you have reported in your village or municipality. See which universities, student teams, and CSR partners are currently building solutions.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 shrink-0 border border-teal-400/40"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Problem</span>
        </button>
      </div>

      {/* Citizen Live Submissions Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#0F2A43]">
              Your Reported Societal Challenges ({citizenSubmissions.length})
            </h2>
            <p className="text-xs text-slate-500">
              Permanently saved with verified live lifecycle updates.
            </p>
          </div>
        </div>

        {citizenSubmissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citizenSubmissions.map((ch) => (
              <ChallengeCard
                key={ch.id}
                challenge={ch}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No problems submitted yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Have you noticed a contaminated water source, broken solar micro-grid, or lack of medicine in your village? Report it now and get university teams working on it.
            </p>
            <button
              onClick={onOpenReportModal}
              className="px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow"
            >
              Report Your First Problem
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
