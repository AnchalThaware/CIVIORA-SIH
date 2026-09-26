import React, { useState, useEffect } from 'react';
import { Challenge, User, UserRole, ImpactStats } from './types';
import { api } from './services/api';
import { INITIAL_CHALLENGES, INITIAL_IMPACT_STATS } from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ChallengeExplorer } from './components/ChallengeExplorer';
import { CitizenPortal } from './components/CitizenPortal';
import { StudentPortal } from './components/StudentPortal';
import { UniversityPortal } from './components/UniversityPortal';
import { FacultyPortal } from './components/FacultyPortal';
import { IndustryPortal } from './components/IndustryPortal';
import { CSRPortal } from './components/CSRPortal';
import { AdminPortal } from './components/AdminPortal';
import { ImpactDashboard } from './components/ImpactDashboard';
import { BusinessModelPage } from './components/BusinessModelPage';

// Modals
import { ReportChallengeModal } from './components/ReportChallengeModal';
import { ChallengeDetailModal } from './components/ChallengeDetailModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Global States
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [impactStats, setImpactStats] = useState<ImpactStats>(INITIAL_IMPACT_STATS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<string>('home');
  
  // Current User / Role session (defaults to Student Innovator for instant playground test)
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'usr-student-demo',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@bitmesra.ac.in',
    role: 'student',
    university: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });

  // Modal controls
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Load initial data from backend API
  const loadChallenges = async () => {
    setIsLoading(true);
    try {
      const res = await api.getChallenges();
      if (res && res.challenges && res.challenges.length > 0) {
        setChallenges(res.challenges);
      }
      const stats = await api.getImpactStats();
      if (stats) {
        setImpactStats(stats);
      }
    } catch (err) {
      console.warn('Backend offline or fetching failed, using local seeded state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  // View challenge details
  const handleViewChallengeDetails = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setDetailModalOpen(true);
  };

  // Student "Solve Challenge" trigger
  const handleSolveChallenge = (challenge: Challenge) => {
    // Switch to student portal and open proposal workflow
    setSelectedChallenge(challenge);
    setActiveView('portal-student');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CSR "Sponsor Implementation" trigger
  const handleSponsorCSR = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setActiveView('portal-csr');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle new challenge submitted by citizen
  const handleChallengeSubmitted = (newChallenge: Challenge) => {
    setChallenges((prev) => [newChallenge, ...prev]);
    loadChallenges();
  };

  // Switch role test persona
  const handleSwitchRole = (role: UserRole) => {
    const rolePersonas: Record<UserRole, Partial<User>> = {
      citizen: { name: 'Rameshwar Munda', email: 'rameshwar.munda@sarwan.jharkhand.gov.in', role: 'citizen' },
      student: { name: 'Aarav Sharma', email: 'aarav.sharma@bitmesra.ac.in', role: 'student', university: 'BIT Mesra, Ranchi' },
      faculty: { name: 'Dr. Alok Kumar', email: 'alok.kumar@bitmesra.ac.in', role: 'faculty', university: 'BIT Mesra, Ranchi', department: 'Environmental Engineering' },
      university: { name: 'Dean Academics & R&D', email: 'dean.rnd@bitmesra.ac.in', role: 'university', university: 'Birla Institute of Technology (BIT) Mesra' },
      industry: { name: 'Tata Steel Innovation Lead', email: 'innovation@tatasteel.com', role: 'industry', company: 'Tata Steel Technologies Ltd' },
      csr: { name: 'Tata Trusts Grant Officer', email: 'csr-grants@tatatrusts.org', role: 'csr', company: 'Tata Trusts Foundation' },
      admin: { name: 'Jharkhand State Nodal Officer', email: 'nodal.innovation@jharkhand.gov.in', role: 'admin' },
    };

    const target = rolePersonas[role];
    const newUser: User = {
      id: `usr-${role}-${Date.now()}`,
      name: target.name || 'User',
      email: target.email || 'user@civiora.org',
      role,
      university: target.university,
      company: target.company,
      department: target.department,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    setCurrentUser(newUser);
    setActiveView(`portal-${role}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open auth modal
  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReportModal={() => setReportModalOpen(true)}
        onOpenAuthModal={handleOpenAuth}
        onOpenDeployModal={() => setDeployModalOpen(true)}
        onSwitchRole={handleSwitchRole}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <LandingPage
            challenges={challenges}
            impactStats={impactStats}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReportModal={() => setReportModalOpen(true)}
            onViewDetails={handleViewChallengeDetails}
            onSolveChallenge={handleSolveChallenge}
            onSponsorCSR={handleSponsorCSR}
          />
        )}

        {activeView === 'explore' && (
          <ChallengeExplorer
            challenges={challenges}
            isLoading={isLoading}
            onRefresh={loadChallenges}
            onViewDetails={handleViewChallengeDetails}
            onOpenReportModal={() => setReportModalOpen(true)}
            onSolveChallenge={handleSolveChallenge}
            onSponsorCSR={handleSponsorCSR}
          />
        )}

        {activeView === 'how-it-works' && (
          <LandingPage
            challenges={challenges}
            impactStats={impactStats}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReportModal={() => setReportModalOpen(true)}
            onViewDetails={handleViewChallengeDetails}
            onSolveChallenge={handleSolveChallenge}
            onSponsorCSR={handleSponsorCSR}
          />
        )}

        {activeView === 'impact' && (
          <ImpactDashboard
            challenges={challenges}
            impactStats={impactStats}
            onViewDetails={handleViewChallengeDetails}
          />
        )}

        {activeView === 'business-model' && (
          <BusinessModelPage
            onOpenReportModal={() => setReportModalOpen(true)}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Stakeholder Portals */}
        {activeView === 'portal-citizen' && (
          <CitizenPortal
            challenges={challenges}
            currentUser={currentUser}
            onOpenReportModal={() => setReportModalOpen(true)}
            onViewDetails={handleViewChallengeDetails}
          />
        )}

        {activeView === 'portal-student' && (
          <StudentPortal
            challenges={challenges}
            currentUser={currentUser}
            onViewDetails={handleViewChallengeDetails}
            onRefresh={loadChallenges}
          />
        )}

        {activeView === 'portal-university' && (
          <UniversityPortal
            challenges={challenges}
            currentUser={currentUser}
            onViewDetails={handleViewChallengeDetails}
          />
        )}

        {activeView === 'portal-faculty' && (
          <FacultyPortal
            challenges={challenges}
            currentUser={currentUser}
            onViewDetails={handleViewChallengeDetails}
            onRefresh={loadChallenges}
          />
        )}

        {activeView === 'portal-industry' && (
          <IndustryPortal
            challenges={challenges}
            currentUser={currentUser}
            onViewDetails={handleViewChallengeDetails}
          />
        )}

        {activeView === 'portal-csr' && (
          <CSRPortal
            challenges={challenges}
            currentUser={currentUser}
            onViewDetails={handleViewChallengeDetails}
            onRefresh={loadChallenges}
          />
        )}

        {activeView === 'portal-admin' && (
          <AdminPortal
            challenges={challenges}
            currentUser={currentUser}
            onViewDetails={handleViewChallengeDetails}
            onRefresh={loadChallenges}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReportModal={() => setReportModalOpen(true)}
        onOpenDeployModal={() => setDeployModalOpen(true)}
      />

      {/* Global Modals */}
      <ReportChallengeModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        currentUser={currentUser}
        onChallengeSubmitted={handleChallengeSubmitted}
      />

      <ChallengeDetailModal
        isOpen={detailModalOpen}
        challenge={selectedChallenge}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedChallenge(null);
        }}
        currentUser={currentUser}
        onSolveChallenge={handleSolveChallenge}
        onSponsorCSR={handleSponsorCSR}
        onStatusUpdated={loadChallenges}
      />

      <DeployGuideModal
        isOpen={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLogin={(user) => setCurrentUser(user)}
      />

    </div>
  );
}
