import React, { useState, useEffect } from 'react';
import { Challenge, User, Message, StudentTeam, CSRSponsorship } from '../types';
import { api } from '../services/api';
import { 
  X, 
  MapPin, 
  Users, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Layers, 
  FileText,
  AlertCircle,
  TrendingUp,
  Tag,
  Share2,
  Calendar
} from 'lucide-react';

interface ChallengeDetailModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onSolveChallenge: (challenge: Challenge) => void;
  onSponsorCSR: (challenge: Challenge) => void;
  onStatusUpdated?: () => void;
}

export const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({
  challenge,
  isOpen,
  onClose,
  currentUser,
  onSolveChallenge,
  onSponsorCSR,
  onStatusUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-insights' | 'project-status' | 'messages'>('overview');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(challenge?.images && challenge.images[0] ? challenge.images[0] : '');

  useEffect(() => {
    if (challenge) {
      setSelectedImage(challenge.images && challenge.images[0] ? challenge.images[0] : '');
      loadMessages();
    }
  }, [challenge?.id]);

  const loadMessages = async () => {
    if (!challenge) return;
    try {
      const res = await api.getMessages(challenge.id);
      setMessages(res.messages || []);
    } catch (e) {
      console.warn('Failed to load messages:', e);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !challenge) return;

    setIsSendingMessage(true);
    try {
      const payload: Partial<Message> = {
        challengeId: challenge.id,
        senderId: currentUser?.id || 'usr-anon',
        senderName: `${currentUser?.name || 'Portal User'} (${currentUser?.role ? currentUser.role.toUpperCase() : 'CITIZEN'})`,
        senderRole: currentUser?.role || 'citizen',
        text: newMessageText.trim(),
      };
      const res = await api.sendMessage(payload);
      setMessages((prev) => [...prev, res.message]);
      setNewMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Admin quick verify
  const handleVerify = async () => {
    if (!challenge) return;
    try {
      await api.updateChallengeStatus(challenge.id, {
        status: 'verified',
        progress: 20,
        currentStage: 'Verified by District Administration — Open for University Solutions',
      });
      challenge.status = 'verified';
      challenge.progress = 20;
      challenge.currentStage = 'Verified by District Administration — Open for University Solutions';
      if (onStatusUpdated) onStatusUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  const lifecycleStages = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'ai_analyzed', label: 'AI Analyzed' },
    { key: 'verified', label: 'Verified' },
    { key: 'team_formed', label: 'Team Assigned' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'prototype', label: 'Prototype' },
    { key: 'testing', label: 'Testing' },
    { key: 'implemented', label: 'Implemented' },
  ];

  if (!isOpen || !challenge) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header with Title & Metadata */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {challenge.isRealSubmission ? (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    REAL CITIZEN SUBMISSION
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    DEMO DATA
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                  {challenge.category}
                </span>

                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {challenge.priority} Priority
                </span>

                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {challenge.district}, Jharkhand
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white font-['Cabinet_Grotesk']">
                {challenge.title}
              </h2>

              <p className="text-xs text-slate-400 flex items-center gap-4">
                <span>Challenge ID: <strong className="text-blue-400">{challenge.id}</strong></span>
                <span>•</span>
                <span>Submitted by: <strong className="text-slate-200">{challenge.submittedBy.name}</strong></span>
                <span>•</span>
                <span>Affected: <strong className="text-slate-200">{challenge.peopleAffected.toLocaleString('en-IN')}+ Citizens</strong></span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Lifecycle Status Pill */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Status:</span>
              <span className="px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                {challenge.status.replace('_', ' ')}
              </span>
              <span className="text-blue-300 font-medium">• {challenge.progress}% Complete</span>
            </div>

            <div className="text-slate-400 text-[11px]">
              Stage: <strong className="text-slate-200">{challenge.currentStage}</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center space-x-2 sm:space-x-4 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Problem Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-insights')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai-insights'
                ? 'border-blue-600 text-blue-600 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Decision Support</span>
          </button>

          <button
            onClick={() => setActiveTab('project-status')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'project-status'
                ? 'border-blue-600 text-blue-600 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Project Status & Partners</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-blue-600 text-blue-600 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Citizen ↔ Student Discussions ({messages.length})</span>
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Photo Gallery */}
              {challenge.images && challenge.images.length > 0 && (
                <div className="space-y-2">
                  <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                    <img
                      src={selectedImage || challenge.images[0]}
                      alt="Ground Evidence"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {challenge.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {challenge.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(img)}
                          className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                            selectedImage === img ? 'border-[#0F766E] ring-2 ring-teal-500/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Problem Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#0F2A43] uppercase tracking-wider">
                  Detailed Societal Challenge
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  {challenge.description}
                </p>
              </div>

              {/* Expected Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                    <span>Expected Solution Outcome</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {challenge.expectedOutcome}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Location Details</span>
                  </h4>
                  <p className="text-xs text-slate-700">
                    <strong>Panchayat/Village:</strong> {challenge.village || 'Sarwan Gram Panchayat'}<br />
                    <strong>District:</strong> {challenge.district}, Jharkhand<br />
                    <strong>GPS Coordinates:</strong> {challenge.latitude?.toFixed(4)}, {challenge.longitude?.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Key Impact Stats */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-around gap-4 text-center">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">People Affected</p>
                  <p className="text-xl font-bold text-teal-300">{challenge.peopleAffected.toLocaleString('en-IN')}+</p>
                </div>
                <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Priority Rating</p>
                  <p className="text-xl font-bold text-amber-400">{challenge.priority}</p>
                </div>
                <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Lifecycle Progress</p>
                  <p className="text-xl font-bold text-emerald-400">{challenge.progress}%</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI DECISION SUPPORT */}
          {activeTab === 'ai-insights' && (
            <div className="space-y-6">
              
              {challenge.aiAnalysis ? (
                <>
                  {/* AI Summary Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0F766E]">
                      <Sparkles className="w-5 h-5 text-teal-600" />
                      <span>Gemini AI Problem Analysis & Domain Decomposition</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {challenge.aiAnalysis.summary}
                    </p>
                    <div className="text-[11px] text-slate-500 italic">
                      *AI analysis provides decision-support recommendations. Final project approval is authorized by Faculty and Government Admins.
                    </div>
                  </div>

                  {/* Skills & Solution Architectures */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-teal-600" />
                        <span>Required Multidisciplinary Skills</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {challenge.aiAnalysis.requiredSkills?.map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-slate-300 shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Potential Solution Architectures</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {challenge.aiAnalysis.potentialSolutions?.map((sol, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* University & CSR Matchmaking */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Recommended Institutional Matches
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {challenge.aiAnalysis.recommendedUniversities?.map((uni, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-xs text-blue-900">{uni.name}</span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                              {uni.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">{uni.reason}</p>
                        </div>
                      ))}

                      {challenge.aiAnalysis.recommendedCSROrg?.map((csr, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-xs text-rose-900">{csr.name}</span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
                              {csr.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">{csr.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500 italic">No AI Analysis generated for this record.</p>
              )}

            </div>
          )}

          {/* TAB 3: PROJECT STATUS & PARTNERS */}
          {activeTab === 'project-status' && (
            <div className="space-y-6">
              
              {/* Progress Overview Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-[#0F2A43]">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                    Overall Implementation Progress
                  </span>
                  <span className="text-lg font-extrabold text-[#0F766E]">{challenge.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#0F766E] to-teal-400 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-600 italic">
                  <strong>Current Stage:</strong> {challenge.currentStage}
                </p>
              </div>

              {/* Stakeholders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* University */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Assigned University</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {challenge.assignedUniversity?.name || 'Pending University Assignment'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {challenge.assignedUniversity?.department || 'Open for Dept Allocation'}
                  </p>
                </div>

                {/* Student Team */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    <span>Student Innovation Team</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {challenge.assignedTeam?.name || 'Team Formation Open'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {challenge.assignedTeam?.leaderName ? `Lead: ${challenge.assignedTeam.leaderName}` : 'Students can submit proposals'}
                  </p>
                </div>

                {/* Faculty Mentor */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Faculty Mentor</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {challenge.facultyMentor?.name || 'Mentor Allocation in Progress'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {challenge.facultyMentor?.email || 'Institutional Verification'}
                  </p>
                </div>

                {/* CSR & Industry */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase">
                    <HeartHandshake className="w-4 h-4 text-rose-600" />
                    <span>CSR & Industry Sponsorship</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {challenge.csrPartner?.name || challenge.industryPartner?.name || 'Open for Corporate Pledging'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {challenge.csrPartner?.fundingAmount ? `Pledged Grant: ₹${challenge.csrPartner.fundingAmount.toLocaleString('en-IN')}` : 'CSR tax-exempt eligible'}
                  </p>
                </div>

              </div>

              {/* Latest Field Update */}
              {challenge.latestUpdate && (
                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs space-y-1">
                  <span className="font-bold text-[#0F766E] uppercase tracking-wider">Latest Progress Log:</span>
                  <p className="text-slate-800">{challenge.latestUpdate}</p>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: CITIZEN ↔ STUDENT TEAM MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Secure project communication channel between Citizen, Student Team, and Faculty Mentor.</span>
                <span className="font-semibold text-slate-800">Challenge {challenge.id}</span>
              </div>

              {/* Message List */}
              <div className="space-y-3 max-h-72 overflow-y-auto p-2">
                {messages.length > 0 ? (
                  messages.map((m) => {
                    const isCitizen = m.senderRole === 'citizen';
                    const isStudent = m.senderRole === 'student';
                    return (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-2xl max-w-xl text-xs space-y-1 ${
                          isCitizen
                            ? 'bg-amber-50 border border-amber-200 ml-auto text-right'
                            : isStudent
                            ? 'bg-teal-50 border border-teal-200 mr-auto text-left'
                            : 'bg-indigo-50 border border-indigo-200 mx-auto text-left'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-slate-500">
                          <span className="text-[#0F2A43]">{m.senderName}</span>
                          <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed">{m.text}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    No messages in this project thread yet. Start the conversation below!
                  </div>
                )}
              </div>

              {/* Send Message Box */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  placeholder={`Reply as ${currentUser?.name || 'Citizen / Student'}...`}
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs outline-none text-slate-900"
                />
                <button
                  type="submit"
                  disabled={isSendingMessage || !newMessageText.trim()}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Modal Footer Actions (Role-Adaptive) */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            {currentUser?.role === 'admin' && challenge.status === 'submitted' && (
              <button
                onClick={handleVerify}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Verify Problem</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            
            {/* Student "Solve This Challenge" */}
            <button
              onClick={() => {
                onClose();
                onSolveChallenge(challenge);
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Solve This Challenge (Student / Team)</span>
            </button>

            {/* CSR Sponsor */}
            <button
              onClick={() => {
                onClose();
                onSponsorCSR(challenge);
              }}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4 text-blue-400" />
              <span>Sponsor Implementation (CSR)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
