import React, { useState } from 'react';
import { Challenge, User } from '../types';
import { 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  Send, 
  FileCheck, 
  AlertCircle, 
  Clock, 
  FileText
} from 'lucide-react';

interface FacultyPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onViewDetails: (challenge: Challenge) => void;
  onRefresh: () => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({
  challenges,
  currentUser,
  onViewDetails,
  onRefresh
}) => {
  const [feedbackNote, setFeedbackNote] = useState('');
  const [selectedProjId, setSelectedProjId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const mentoredProjects = challenges.filter(c => c.assignedTeam || c.facultyMentor);

  const handleApproveMilestone = (challengeId: string) => {
    setSelectedProjId(challengeId);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold">
            <Users className="w-4 h-4" />
            <span>Faculty Mentorship & Review Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            Welcome, Dr. Alok Kumar (Faculty Mentor)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Review student team milestone submissions, provide academic & technical guidance, and stamp official approvals for CSR milestone release.
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1">
          <div>Department: <strong className="text-white">Environmental Engineering</strong></div>
          <div>Institution: <strong className="text-teal-300">BIT Mesra, Ranchi</strong></div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Faculty approval recorded for Milestone Phase! Notification sent to Student Team and CSR Partner.</span>
        </div>
      )}

      {/* Projects Under Mentorship */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#0F2A43]">
          Active Projects Under Your Mentorship ({mentoredProjects.length})
        </h2>

        <div className="space-y-4">
          {mentoredProjects.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{p.title}</h3>
                  <p className="text-xs text-slate-500">{p.district}, Jharkhand • Team: <strong>{p.assignedTeam?.name || 'Jal Rakshak Innovators'}</strong></p>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0F766E]">{p.progress}% Complete</span>
                  <button
                    onClick={() => onViewDetails(p)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    View Problem
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-800">Current Phase Status:</div>
                  <p className="text-slate-600"><strong>Stage:</strong> {p.currentStage}</p>
                  <p className="text-slate-600"><strong>Latest Log:</strong> {p.latestUpdate || 'Field testing in progress.'}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">Faculty Academic Actions:</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveMilestone(p.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Approve Milestone</span>
                    </button>
                    <button
                      onClick={() => onViewDetails(p)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Faculty Guidance</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
