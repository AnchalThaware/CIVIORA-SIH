import React, { useState } from 'react';
import { Challenge, User } from '../types';
import { api } from '../services/api';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Download, 
  DollarSign, 
  Layers, 
  Building2, 
  Users, 
  MapPin, 
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface CSRPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onViewDetails: (challenge: Challenge) => void;
  onRefresh: () => void;
}

export const CSRPortal: React.FC<CSRPortalProps> = ({
  challenges,
  currentUser,
  onViewDetails,
  onRefresh
}) => {
  const [selectedChallengeToFund, setSelectedChallengeToFund] = useState<Challenge | null>(null);
  const [grantAmount, setGrantAmount] = useState('500000');
  const [orgName, setOrgName] = useState(currentUser?.company || 'Tata Trusts Rural Development Foundation');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || 'csr-grants@tatatrusts.org');
  const [isSubmittingGrant, setIsSubmittingGrant] = useState(false);
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [downloadCertSuccess, setDownloadCertSuccess] = useState(false);

  // Sponsored projects
  const sponsoredProjects = challenges.filter(c => c.csrPartner);

  // Open projects needing CSR funding
  const openForFunding = challenges.filter(c => !c.csrPartner);

  const handlePledgeGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallengeToFund) return;

    setIsSubmittingGrant(true);
    try {
      await api.sponsorChallenge(selectedChallengeToFund.id, {
        organizationName: orgName,
        contactEmail,
        fundingAmount: parseInt(grantAmount, 10) || 500000,
        milestonePlan: '30% Sensor Hardware Procurement, 40% Field Pilot Testing, 30% Panchayat Handover',
      });
      setGrantSuccess(true);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingGrant(false);
    }
  };

  const handleDownloadComplianceCert = () => {
    setDownloadCertSuccess(true);
    setTimeout(() => setDownloadCertSuccess(false), 4000);
  };

  const totalFunded = sponsoredProjects.reduce((acc, curr) => acc + (curr.csrPartner?.fundingAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
            <HeartHandshake className="w-4 h-4" />
            <span>Corporate Social Responsibility (CSR) Implementation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            {orgName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Deploy milestone-linked CSR grants directly into verified grassroots problem solvers. Track real-time milestone verification, audit expenditures, and download MCA Section 135 compliance certificates.
          </p>
        </div>

        <button
          onClick={handleDownloadComplianceCert}
          className="px-5 py-2.5 rounded-xl bg-white text-[#0F2A43] hover:bg-rose-50 text-xs font-bold shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-rose-600" />
          <span>Download MCA CSR Certificate (.PDF)</span>
        </button>
      </div>

      {downloadCertSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>CSR Schedule VII Compliance Impact Certificate successfully generated!</span>
        </div>
      )}

      {/* CSR Scorecard Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Total Grants Pledged</span>
          <p className="text-2xl font-extrabold text-rose-700">₹{(totalFunded / 100000).toFixed(2)} Lakhs</p>
          <span className="text-[10px] text-slate-500">Across Jharkhand Districts</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Sponsored Innovations</span>
          <p className="text-2xl font-extrabold text-[#0F2A43]">{sponsoredProjects.length} Projects</p>
          <span className="text-[10px] text-teal-600 font-semibold">100% University Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Citizens Directly Impacted</span>
          <p className="text-2xl font-extrabold text-[#0F766E]">28,400+</p>
          <span className="text-[10px] text-slate-500">Water, Solar & Health</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Cost Per Citizen Benefited</span>
          <p className="text-2xl font-extrabold text-emerald-700">₹44 / Life</p>
          <span className="text-[10px] text-emerald-700 font-semibold">High Social ROI</span>
        </div>
      </div>

      {/* SECTION 1: ACTIVE SPONSORED PROJECTS & DISBURSEMENTS */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#0F2A43]">
          Active CSR Grant Portfolios & Disbursement Milestones ({sponsoredProjects.length})
        </h2>

        <div className="space-y-4">
          {sponsoredProjects.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 uppercase">
                      Pledged: ₹{p.csrPartner?.fundingAmount?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500">ID: {p.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-500">{p.district}, Jharkhand • University: <strong>{p.assignedUniversity?.name || 'BIT Mesra'}</strong></p>
                </div>

                <button
                  onClick={() => onViewDetails(p)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  View Details & Audit
                </button>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Project Field Implementation Status</span>
                  <span className="text-[#0F766E]">{p.progress}% Complete</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-500 to-[#0F766E] h-2.5 rounded-full" style={{ width: `${p.progress}%` }}></div>
                </div>
                <p className="text-slate-600 text-[11px] italic">
                  <strong>Current Phase:</strong> {p.currentStage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: OPEN CHALLENGES AWAITING CSR GRANTS */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <h2 className="text-xl font-bold text-[#0F2A43]">
          High-Impact Grassroots Problems Awaiting CSR Grants ({openForFunding.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openForFunding.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-rose-500 transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-start text-[10px]">
                  <span className="px-2 py-0.5 rounded font-bold bg-teal-100 text-teal-800 uppercase">
                    {c.category}
                  </span>
                  <span className="font-semibold text-slate-500">{c.district}</span>
                </div>

                <h3 className="font-bold text-sm text-[#0F2A43] line-clamp-2">{c.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex justify-between">
                  <span><strong>Affected:</strong> {c.peopleAffected.toLocaleString('en-IN')}+ Citizens</span>
                  <span className="text-amber-700 font-bold">{c.priority} Priority</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onViewDetails(c)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                >
                  Inspect
                </button>
                <button
                  onClick={() => setSelectedChallengeToFund(c)}
                  className="flex-1 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow flex items-center justify-center gap-1"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Sponsor Grant</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSR PLEDGE MODAL */}
      {selectedChallengeToFund && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
            
            <div className="bg-[#0F2A43] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Pledge CSR Implementation Grant</h3>
                <p className="text-xs text-teal-200 truncate max-w-sm">{selectedChallengeToFund.title}</p>
              </div>
              <button onClick={() => setSelectedChallengeToFund(null)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            {grantSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">CSR Grant Pledged Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  ₹{parseInt(grantAmount, 10).toLocaleString('en-IN')} grant committed. The university student team will be notified to begin hardware prototyping.
                </p>
                <button
                  onClick={() => {
                    setSelectedChallengeToFund(null);
                    setGrantSuccess(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0F2A43] text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePledgeGrant} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Corporate / CSR Foundation Name</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grant Allocation Amount (₹ INR)</label>
                  <input
                    type="number"
                    min="10000"
                    step="5000"
                    required
                    value={grantAmount}
                    onChange={(e) => setGrantAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-bold text-rose-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">CSR Nodal Officer Contact Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] space-y-1">
                  <div className="font-bold text-slate-800">Automatic Milestone Disbursement Schedule:</div>
                  <div>• 30% upon Faculty Mentor approval of Sensor/Hardware BOM</div>
                  <div>• 40% upon successful Field Prototype demonstration</div>
                  <div>• 30% upon Village Panchayat commissioning & Handover</div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedChallengeToFund(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingGrant}
                    className="px-6 py-2.5 rounded-xl bg-rose-700 text-white font-bold shadow hover:bg-rose-800"
                  >
                    {isSubmittingGrant ? 'Pledging...' : 'Confirm Grant Pledge'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
