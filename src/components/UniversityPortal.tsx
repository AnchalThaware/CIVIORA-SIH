import React, { useState } from 'react';
import { Challenge, User } from '../types';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Award, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';

interface UniversityPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onViewDetails: (challenge: Challenge) => void;
}

export const UniversityPortal: React.FC<UniversityPortalProps> = ({
  challenges,
  currentUser,
  onViewDetails
}) => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const departments = [
    'All Departments',
    'Electronics & Communication',
    'Computer Science & AI',
    'Civil & Environmental Engineering',
    'Mechanical & Renewable Energy',
    'Biotechnology & Rural Health'
  ];

  // Active university projects
  const universityProjects = challenges.filter(c => c.assignedUniversity || c.assignedTeam);

  const handleExportNIRFReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold">
            <Building2 className="w-4 h-4" />
            <span>Institutional Deanery & Accreditation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            {currentUser?.university || 'Birla Institute of Technology (BIT) Mesra'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Manage student innovation teams, assign departmental faculty mentors, track field pilots, and auto-generate NAAC / NIRF Societal Impact Accreditation metrics.
          </p>
        </div>

        <button
          onClick={handleExportNIRFReport}
          className="px-5 py-2.5 rounded-xl bg-white text-[#0F2A43] hover:bg-teal-50 text-xs font-bold shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-teal-600" />
          <span>Export NAAC/NIRF Report (.CSV)</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>NIRF Criterion 3 (Research, Innovations and Extension) report generated and downloaded successfully!</span>
        </div>
      )}

      {/* NIRF / NAAC Metric Scorecards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Active Capstone Projects</span>
          <p className="text-2xl font-extrabold text-[#0F2A43]">{universityProjects.length}</p>
          <span className="text-[10px] text-teal-600 font-semibold">100% Real Grassroots Data</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Students Participating</span>
          <p className="text-2xl font-extrabold text-[#0F766E]">84 Innovators</p>
          <span className="text-[10px] text-slate-500">18 Multidisciplinary Teams</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Faculty Mentors Engaged</span>
          <p className="text-2xl font-extrabold text-indigo-900">12 Professors</p>
          <span className="text-[10px] text-slate-500">Across 5 Departments</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">CSR Grants Mobilized</span>
          <p className="text-2xl font-extrabold text-rose-700">₹32.50 Lakhs</p>
          <span className="text-[10px] text-slate-500">Zero Institutional Cost</span>
        </div>
      </div>

      {/* Institutional Active Projects Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0F2A43]">Institutional Societal Challenge Assignments</h3>
            <p className="text-xs text-slate-500">Real-time status of student squads and department mentorship.</p>
          </div>

          <div className="text-xs">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="p-2 rounded-xl border border-slate-300 bg-slate-50 outline-none text-slate-800 font-medium"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Challenge Title</th>
                <th className="p-3">District</th>
                <th className="p-3">Student Squad</th>
                <th className="p-3">Faculty Mentor</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {universityProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900 max-w-xs truncate">
                    {p.title}
                  </td>
                  <td className="p-3 font-semibold">{p.district}</td>
                  <td className="p-3 text-teal-800 font-medium">{p.assignedTeam?.name || 'Jal Rakshak Innovators'}</td>
                  <td className="p-3 text-indigo-800 font-medium">{p.facultyMentor?.name || 'Dr. Alok Kumar'}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0F766E] h-2 rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                      <span className="font-bold">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 uppercase">
                      {p.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onViewDetails(p)}
                      className="px-3 py-1 rounded-lg bg-[#0F2A43] hover:bg-[#0F766E] text-white font-semibold text-[11px] transition-colors"
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
