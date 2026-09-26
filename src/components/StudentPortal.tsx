import React, { useState } from 'react';
import { Challenge, User, StudentTeam } from '../types';
import { api } from '../services/api';
import { 
  GraduationCap, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  Upload, 
  Link, 
  Github, 
  Send, 
  Users, 
  Clock, 
  ArrowRight,
  PlusCircle,
  FileCode,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StudentPortalProps {
  challenges: Challenge[];
  currentUser: User | null;
  onViewDetails: (challenge: Challenge) => void;
  onRefresh: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  challenges,
  currentUser,
  onViewDetails,
  onRefresh
}) => {
  const [selectedChallengeToSolve, setSelectedChallengeToSolve] = useState<Challenge | null>(null);
  
  // Proposal Form State
  const [teamName, setTeamName] = useState('Jal Rakshak Innovators');
  const [universityName, setUniversityName] = useState('BIT Mesra, Ranchi');
  const [leaderName, setLeaderName] = useState(currentUser?.name || 'Aarav Sharma');
  const [leaderEmail, setLeaderEmail] = useState(currentUser?.email || 'aarav.sharma@bitmesra.ac.in');
  const [members, setMembers] = useState('Pooja Kumari, Rohan Soren, Amit Verma');
  const [solutionTitle, setSolutionTitle] = useState('');
  const [solutionDescription, setSolutionDescription] = useState('');
  const [techStack, setTechStack] = useState('Activated Alumina, ESP32 Microcontroller, GSM SIM800L, Solar Inverter');
  const [githubUrl, setGithubUrl] = useState('https://github.com/civiora-innovations/jal-rakshak');
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);

  // Active Project Milestones state (for projects assigned to teams)
  const [milestoneProgress, setMilestoneProgress] = useState(68);
  const [milestoneStage, setMilestoneStage] = useState('Prototype Testing & Calibration');
  const [fieldNote, setFieldNote] = useState('');
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [progressUpdatedMsg, setProgressUpdatedMsg] = useState(false);

  // Active projects where team is assigned
  const activeProjects = challenges.filter(
    (c) => c.assignedTeam || c.status === 'in_progress' || c.status === 'prototype' || c.status === 'testing'
  );

  // Open challenges looking for solutions
  const openChallenges = challenges.filter(
    (c) => c.status === 'verified' || c.status === 'submitted' || c.status === 'looking_for_solution'
  );

  // Handle proposal submission
  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallengeToSolve) return;

    setIsSubmittingProposal(true);
    try {
      const teamData = {
        name: teamName,
        university: universityName,
        department: 'Electronics & Environmental Engineering',
        leaderName,
        leaderEmail,
        membersCount: members.split(',').length + 1,
      };

      await api.applyToChallenge(selectedChallengeToSolve.id, {
        team: teamData,
        solutionTitle: solutionTitle || `Community Solution for ${selectedChallengeToSolve.title}`,
        solutionDescription: solutionDescription || 'Developing a sustainable local hardware and IoT system.',
        techStack: techStack.split(',').map(s => s.trim()),
        githubUrl,
      });

      setProposalSuccess(true);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProposal(false);
    }
  };

  // Handle milestone progress update
  const handleUpdateProjectProgress = async (challengeId: string) => {
    setIsUpdatingProgress(true);
    try {
      await api.updateChallengeStatus(challengeId, {
        progress: milestoneProgress,
        currentStage: milestoneStage,
        latestUpdate: fieldNote || `Student Team updated milestone progress to ${milestoneProgress}% (${milestoneStage})`,
      });
      setProgressUpdatedMsg(true);
      setTimeout(() => setProgressUpdatedMsg(false), 4000);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Student Hub Header */}
      <div className="bg-[#0F2A43] text-white p-8 rounded-3xl shadow-lg border border-teal-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Student Innovation Hub & Capstone Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk'] text-white">
            Innovate for Jharkhand: Student Project Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Choose genuine societal challenges, form interdisciplinary student squads, receive industry mentorship, and earn verified capstone & NIRF credits.
          </p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl text-xs space-y-1 shrink-0">
          <div className="text-slate-400">Current Student Squad:</div>
          <div className="font-bold text-white text-sm flex items-center gap-1.5">
            <Users className="w-4 h-4 text-teal-400" />
            <span>Jal Rakshak Innovators</span>
          </div>
          <div className="text-teal-300 font-medium">BIT Mesra, Ranchi</div>
        </div>
      </div>

      {/* SECTION 1: MY ACTIVE PROJECTS & MILESTONE SUBMISSION */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#0F2A43]">
              My Active Project Milestones ({activeProjects.length})
            </h2>
            <p className="text-xs text-slate-500">
              Submit prototype deliverables, update progress percentage, and log field notes for community & mentor review.
            </p>
          </div>
        </div>

        {activeProjects.slice(0, 2).map((proj) => (
          <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Project Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-800 uppercase">
                    {proj.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-500">ID: <strong>{proj.id}</strong></span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A43]">{proj.title}</h3>
                <p className="text-xs text-slate-500">{proj.district}, Jharkhand • Assigned to: <strong>{proj.assignedTeam?.name || 'Your Team'}</strong></p>
              </div>

              <button
                onClick={() => onViewDetails(proj)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                View Full Challenge
              </button>
            </div>

            {/* Live Progress Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Update Implementation Progress (%)</span>
                    <span className="text-[#0F766E] font-extrabold text-sm">{milestoneProgress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={milestoneProgress}
                    onChange={(e) => setMilestoneProgress(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Milestone Stage</label>
                  <select
                    value={milestoneStage}
                    onChange={(e) => setMilestoneStage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs outline-none focus:border-[#0F766E] font-medium"
                  >
                    <option value="Literature Review & Sensor Selection">Phase 1: Literature Review & Sensor Selection</option>
                    <option value="Circuit Design & CAD Prototyping">Phase 2: Circuit Design & CAD Prototyping</option>
                    <option value="Prototype Testing & Calibration">Phase 3: Prototype Testing & Calibration</option>
                    <option value="Village Field Pilot & Water Sampling">Phase 4: Village Field Pilot & Water Sampling</option>
                    <option value="Final Implementation & Handover">Phase 5: Final Implementation & Handover</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Log Field Update Note for Citizens & Mentors</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Conducted ground water test in Sarwan. Fluoride level reduced by 85% in trial run."
                    value={fieldNote}
                    onChange={(e) => setFieldNote(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs outline-none focus:border-[#0F766E]"
                  ></textarea>
                </div>

                <button
                  onClick={() => handleUpdateProjectProgress(proj.id)}
                  disabled={isUpdatingProgress}
                  className="px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isUpdatingProgress ? 'Saving...' : 'Update Milestone & Notify Stakeholders'}</span>
                </button>

                {progressUpdatedMsg && (
                  <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Progress successfully saved to database!</span>
                  </div>
                )}
              </div>

              {/* Connected Stakeholders Info */}
              <div className="space-y-3 text-xs bg-white p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100">
                  Project Network & Sponsors
                </h4>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">University:</span> {proj.assignedUniversity?.name || 'BIT Mesra, Ranchi'}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Faculty Mentor:</span> {proj.facultyMentor?.name || 'Dr. Alok Kumar'}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-rose-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">CSR Sponsor:</span> {proj.csrPartner?.name || 'Tata Trusts Rural Water Mission'}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <strong>GitHub Repo:</strong> <a href={githubUrl} target="_blank" rel="noreferrer" className="text-[#0F766E] underline">civiora-innovations/jal-rakshak</a>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* SECTION 2: BROWSE OPEN CHALLENGES & SUBMIT PROPOSAL */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#0F2A43]">
              Open Challenges Seeking University Solutions ({openChallenges.length})
            </h2>
            <p className="text-xs text-slate-500">
              Apply with your team to solve these real-world problems and unlock CSR funding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openChallenges.map((ch) => (
            <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-teal-500 transition-colors">
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                    {ch.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{ch.district}</span>
                </div>

                <h3 className="font-bold text-sm text-[#0F2A43] leading-snug line-clamp-2">
                  {ch.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {ch.description}
                </p>

                {ch.aiAnalysis && (
                  <div className="p-2 rounded-lg bg-teal-50 text-[11px] text-teal-900 border border-teal-200">
                    <span className="font-bold">Required Skills:</span> {ch.aiAnalysis.requiredSkills?.slice(0, 3).join(', ')}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onViewDetails(ch)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => setSelectedChallengeToSolve(ch)}
                  className="flex-1 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow transition-colors"
                >
                  Solve Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROPOSAL APPLICATION MODAL */}
      {selectedChallengeToSolve && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
            
            <div className="bg-[#0F2A43] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Submit Innovation Proposal</h3>
                <p className="text-xs text-teal-200 truncate max-w-md">{selectedChallengeToSolve.title}</p>
              </div>
              <button onClick={() => setSelectedChallengeToSolve(null)} className="p-1 rounded text-slate-300 hover:text-white">
                ✕
              </button>
            </div>

            {proposalSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Proposal Registered Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your team has been assigned to this challenge. You can now submit milestones and access CSR funding.
                </p>
                <button
                  onClick={() => {
                    setSelectedChallengeToSolve(null);
                    setProposalSuccess(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0F2A43] text-white text-xs font-bold shadow"
                >
                  Back to Workspace
                </button>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Team Name</label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">University / College</label>
                    <input
                      type="text"
                      required
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Team Leader Name</label>
                    <input
                      type="text"
                      required
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Team Leader Email</label>
                    <input
                      type="email"
                      required
                      value={leaderEmail}
                      onChange={(e) => setLeaderEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Team Members (Comma separated)</label>
                  <input
                    type="text"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proposed Solution Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Low-Cost Automated Solar Water Filtration Unit"
                    value={solutionTitle}
                    onChange={(e) => setSolutionTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proposed Architecture & Technical Approach</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Explain the hardware/software engineering design..."
                    value={solutionDescription}
                    onChange={(e) => setSolutionDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proposed Tech Stack & Hardware Components</label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedChallengeToSolve(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingProposal}
                    className="px-6 py-2 rounded-xl bg-[#0F766E] text-white font-bold shadow"
                  >
                    {isSubmittingProposal ? 'Submitting...' : 'Register Team & Lock Challenge'}
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
