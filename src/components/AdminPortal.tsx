import React, { useState } from 'react';
import { Challenge, User } from '../types';
import { api } from '../services/api';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Trash2, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  GraduationCap, 
  Filter,
  Eye
} from 'lucide-react';

interface AdminPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onViewDetails: (challenge: Challenge) => void;
  onRefresh: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  challenges,
  currentUser,
  onViewDetails,
  onRefresh
}) => {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState<string | null>(null);

  const pendingVerification = challenges.filter(c => c.status === 'submitted' || c.status === 'ai_analyzed');
  const verifiedChallenges = challenges.filter(c => c.status !== 'submitted' && c.status !== 'ai_analyzed');

  const handleVerify = async (challengeId: string) => {
    setVerifyingId(challengeId);
    try {
      await api.updateChallengeStatus(challengeId, {
        status: 'verified',
        progress: 25,
        currentStage: 'Verified by District Administration — Open for University Solutions',
      });
      setVerifiedSuccess(challengeId);
      setTimeout(() => setVerifiedSuccess(null), 3500);
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>State Nodal Officer & Administration Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            Jharkhand State Innovation Council
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Review and verify crowdsourced citizen reports, detect duplicates, approve challenges for university solution matching, and monitor district-level resolution velocity.
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1">
          <div>Role: <strong className="text-purple-300">State Nodal Officer</strong></div>
          <div>Pending Verification: <strong className="text-amber-400">{pendingVerification.length} Submissions</strong></div>
        </div>
      </div>

      {verifiedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Challenge {verifiedSuccess} officially verified and opened for student team matching!</span>
        </div>
      )}

      {/* SECTION 1: PENDING VERIFICATION QUEUE */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#0F2A43]">
              Pending Citizen Submissions Awaiting Government Verification ({pendingVerification.length})
            </h2>
            <p className="text-xs text-slate-500">
              Ensure problem legitimacy before public matchmaking with universities.
            </p>
          </div>
        </div>

        {pendingVerification.length > 0 ? (
          <div className="space-y-3">
            {pendingVerification.map((ch) => (
              <div key={ch.id} className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                      Needs Verification
                    </span>
                    <span className="text-xs font-bold text-slate-700">{ch.district}, Jharkhand</span>
                    <span className="text-xs text-slate-400">• By {ch.submittedBy.name}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F2A43]">{ch.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-1">{ch.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onViewDetails(ch)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                  <button
                    onClick={() => handleVerify(ch.id)}
                    disabled={verifyingId === ch.id}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{verifyingId === ch.id ? 'Verifying...' : 'Approve & Verify'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            All citizen submissions are verified and active!
          </div>
        )}
      </div>

      {/* SECTION 2: VERIFIED & ACTIVE REPOSITORY */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-lg font-bold text-[#0F2A43]">
          Active & Implemented State Challenges ({verifiedChallenges.length})
        </h2>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Challenge</th>
                <th className="p-3">District</th>
                <th className="p-3">People Affected</th>
                <th className="p-3">Status</th>
                <th className="p-3">Progress</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {verifiedChallenges.map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{ch.title}</td>
                  <td className="p-3">{ch.district}</td>
                  <td className="p-3 font-semibold text-teal-800">{ch.peopleAffected.toLocaleString('en-IN')}+</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 uppercase">
                      {ch.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{ch.progress}%</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onViewDetails(ch)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
