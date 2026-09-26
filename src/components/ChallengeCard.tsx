import React from 'react';
import { Challenge, ChallengeStatus } from '../types';
import { 
  MapPin, 
  Users, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Tag
} from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  onViewDetails: (challenge: Challenge) => void;
  onSolve?: (challenge: Challenge) => void;
  onSponsor?: (challenge: Challenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onViewDetails,
  onSolve,
  onSponsor
}) => {
  // Format status badge colors & labels
  const getStatusBadge = (status: ChallengeStatus) => {
    switch (status) {
      case 'submitted':
        return { label: 'Submitted', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'ai_analyzed':
        return { label: 'AI Analyzed', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'verified':
        return { label: 'Verified & Open', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'looking_for_solution':
        return { label: 'Looking for Solution', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'university_assigned':
        return { label: 'University Assigned', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      case 'team_formed':
        return { label: 'Team Formed', color: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'in_progress':
        return { label: 'In Progress', color: 'bg-blue-600 text-white border-blue-600 font-bold' };
      case 'prototype':
        return { label: 'Prototype Stage', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
      case 'testing':
        return { label: 'Field Testing', color: 'bg-orange-50 text-orange-800 border-orange-200' };
      case 'pilot':
        return { label: 'Pilot Deployment', color: 'bg-amber-600 text-white border-amber-600 font-bold' };
      case 'implemented':
        return { label: 'Implemented', color: 'bg-emerald-600 text-white border-emerald-600 font-bold' };
      case 'impact_measured':
        return { label: 'Impact Measured', color: 'bg-slate-900 text-white border-slate-900 font-bold' };
      default:
        return { label: status.replace('_', ' ').toUpperCase(), color: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const statusInfo = getStatusBadge(challenge.status);
  const isInProgressOrActive = ['university_assigned', 'team_formed', 'in_progress', 'prototype', 'testing', 'pilot', 'implemented', 'impact_measured'].includes(challenge.status);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Media / Header area */}
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={challenge.images && challenge.images[0] ? challenge.images[0] : 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
            alt={challenge.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            {/* Real user vs demo indicator */}
            {challenge.isRealSubmission ? (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                CITIZEN REPORT
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700">
                DEMO DATA
              </span>
            )}

            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border shadow-sm ${getPriorityBadge(challenge.priority)}`}>
              {challenge.priority} Priority
            </span>
          </div>

          {/* Bottom info on Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{challenge.district}, Jharkhand</span>
            </div>
            <span className={`px-2 py-0.5 rounded-md text-xs font-semibold shadow-sm border ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3.5">
          
          {/* Category & Affected People */}
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              {challenge.category}
            </span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              {challenge.peopleAffected.toLocaleString('en-IN')}+ Affected
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(challenge)}
            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {challenge.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>

          {/* AI Decision Support Tags */}
          {challenge.aiAnalysis && challenge.aiAnalysis.keywords && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {challenge.aiAnalysis.keywords.slice(0, 3).map((kw, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* IN PROGRESS / ACTIVE PROJECT TRANSPARENCY BLOCK */}
          {isInProgressOrActive && (
            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
              
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 mb-1">
                  <span className="flex items-center gap-1 text-slate-800">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    Project Progress
                  </span>
                  <span className="text-blue-600 font-bold">{challenge.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-700" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stakeholders Working on this problem */}
              <div className="space-y-1.5 text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                {challenge.assignedUniversity && (
                  <div className="flex items-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="truncate">
                      <strong className="text-slate-800">University:</strong> {challenge.assignedUniversity.name}
                    </span>
                  </div>
                )}

                {challenge.assignedTeam && (
                  <div className="flex items-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="truncate">
                      <strong className="text-slate-800">Student Team:</strong> {challenge.assignedTeam.name}
                    </span>
                  </div>
                )}

                {challenge.industryPartner && (
                  <div className="flex items-start gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-700 mt-0.5 shrink-0" />
                    <span className="truncate">
                      <strong className="text-slate-800">Industry:</strong> {challenge.industryPartner.name}
                    </span>
                  </div>
                )}

                {challenge.csrPartner && (
                  <div className="flex items-start gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="truncate">
                      <strong className="text-slate-800">CSR Sponsor:</strong> {challenge.csrPartner.name}
                    </span>
                  </div>
                )}

                {challenge.currentStage && (
                  <div className="pt-0.5 text-[10px] text-slate-500 italic truncate">
                    <strong>Stage:</strong> {challenge.currentStage}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{challenge.lastUpdated ? `Updated ${challenge.lastUpdated}` : 'Recently Submitted'}</span>
        </div>

        <button
          onClick={() => onViewDetails(challenge)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>View Challenge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
