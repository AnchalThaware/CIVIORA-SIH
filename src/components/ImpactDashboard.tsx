import React, { useState } from 'react';
import { Challenge, ImpactStats } from '../types';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  Droplet, 
  SunMedium, 
  HeartPulse, 
  BookOpen, 
  Recycle, 
  TreePine,
  Download,
  Calendar,
  Layers
} from 'lucide-react';

interface ImpactDashboardProps {
  challenges: Challenge[];
  impactStats: ImpactStats;
  onViewDetails: (challenge: Challenge) => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  challenges,
  impactStats,
  onViewDetails
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Compute category statistics
  const categoryCounts: Record<string, number> = {};
  const districtCounts: Record<string, number> = {};

  challenges.forEach(c => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    districtCounts[c.district] = (districtCounts[c.district] || 0) + 1;
  });

  const totalPeopleAffected = challenges.reduce((acc, c) => acc + c.peopleAffected, 0);
  const solvedChallenges = challenges.filter(c => c.status === 'implemented' || c.status === 'impact_measured');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>Jharkhand State Societal Impact Observatory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            Statewide Real-Time Impact Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Live telemetry tracking crowdsourced problems, university solution adoption velocity, CSR capital mobilization, and verified lives positively impacted.
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1">
          <div>Observation Scope: <strong className="text-teal-300">24 Districts</strong></div>
          <div>Audit Verification: <strong className="text-white">Active Real-Time</strong></div>
        </div>
      </div>

      {/* Top Impact KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase">Citizens Directly Impacted</span>
          <p className="text-3xl font-extrabold text-[#0F2A43] font-['Cabinet_Grotesk']">
            {impactStats.peopleBenefited.toLocaleString('en-IN')}+
          </p>
          <span className="text-[11px] text-teal-600 font-semibold">↑ 18% month-over-month</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase">Field Solutions Deployed</span>
          <p className="text-3xl font-extrabold text-[#0F766E] font-['Cabinet_Grotesk']">
            {impactStats.problemsSolved}
          </p>
          <span className="text-[11px] text-slate-500">Across 14 Panchayats</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase">Partner Universities</span>
          <p className="text-3xl font-extrabold text-blue-900 font-['Cabinet_Grotesk']">
            {impactStats.participatingUniversities}
          </p>
          <span className="text-[11px] text-slate-500">BIT Mesra, NIT, IIT ISM</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase">CSR Funds Deployed</span>
          <p className="text-3xl font-extrabold text-rose-700 font-['Cabinet_Grotesk']">
            ₹{(impactStats.csrFundsMobilized / 10000000).toFixed(2)} Cr
          </p>
          <span className="text-[11px] text-slate-500">Zero Intermediary Loss</span>
        </div>

      </div>

      {/* Domain Breakdown & District Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Domain Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#0F2A43]">Challenges by Problem Domain</h3>
          
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / challenges.length) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{cat}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#0F766E] h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District Velocity & Hotspots */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#0F2A43]">Active District Hotspots</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(districtCounts).slice(0, 8).map(([dist, count]) => (
              <div key={dist} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800">{dist}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-800">
                  {count} Problems
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Verified Completed Solutions Showcase */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#0F2A43]">Completed & Impact-Measured Field Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.filter(c => c.progress > 50).slice(0, 4).map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded uppercase">
                  {c.category} • {c.district}
                </span>
                <h4 className="font-bold text-sm text-slate-900">{c.title}</h4>
                <p className="text-xs text-slate-500">Affected: <strong>{c.peopleAffected.toLocaleString('en-IN')}+ Citizens</strong></p>
              </div>

              <button
                onClick={() => onViewDetails(c)}
                className="px-4 py-2 rounded-xl bg-[#0F2A43] hover:bg-[#0F766E] text-white text-xs font-bold shrink-0 transition-colors"
              >
                Inspect Impact
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
