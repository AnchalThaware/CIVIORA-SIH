import React, { useState } from 'react';
import { Challenge, User } from '../types';
import { 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Send, 
  Cpu, 
  Award, 
  UserCheck, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';

interface IndustryPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onViewDetails: (challenge: Challenge) => void;
}

export const IndustryPortal: React.FC<IndustryPortalProps> = ({
  challenges,
  currentUser,
  onViewDetails
}) => {
  const [mentorshipOffered, setMentorshipOffered] = useState<string | null>(null);

  const handleOfferMentorship = (id: string) => {
    setMentorshipOffered(id);
    setTimeout(() => setMentorshipOffered(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
            <Briefcase className="w-4 h-4" />
            <span>Corporate Technology & R&D Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            {currentUser?.company || 'Tata Steel / TCS Innovation Labs'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Sponsor student innovation teams with cloud credits, IoT hardware, and engineering mentorship. Scout top talent and co-develop patents for grassroots societal challenges.
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1">
          <div>Industry Status: <strong className="text-emerald-400">R&D Partner Tier</strong></div>
          <div>Active Cohorts: <strong className="text-white">Jharkhand Agritech & Clean Water</strong></div>
        </div>
      </div>

      {mentorshipOffered && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Industry Mentorship & Cloud Credits pledge submitted to Student Team!</span>
        </div>
      )}

      {/* Talent Scouting & Project Opportunities */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#0F2A43]">
              Active University Projects Open for Industry Partnership ({challenges.length})
            </h2>
            <p className="text-xs text-slate-500">Provide specialized technical advisory, hardware kits, or field testing.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500 transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-start text-[10px]">
                  <span className="px-2 py-0.5 rounded font-bold bg-teal-100 text-teal-800 uppercase">
                    {c.category}
                  </span>
                  <span className="font-semibold text-slate-500">{c.district}</span>
                </div>

                <h3 className="font-bold text-sm text-[#0F2A43] line-clamp-2">{c.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>

                {c.aiAnalysis && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-1">
                    <div className="font-bold text-slate-800">Tech Stack / Skills:</div>
                    <div className="text-slate-600">{c.aiAnalysis.requiredSkills?.slice(0, 3).join(', ')}</div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onViewDetails(c)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                >
                  View Team
                </button>
                <button
                  onClick={() => handleOfferMentorship(c.id)}
                  className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow"
                >
                  Offer Mentorship
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
