import React, { useState } from 'react';
import { User, UserRole, NotificationItem } from '../types';
import { CivioraLogo } from './CivioraLogo';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  UserCheck, 
  PlusCircle, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  LogOut, 
  CheckCircle2, 
  FolderKanban,
  Headphones
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenReportModal: () => void;
  onOpenAuthModal: (mode?: 'login' | 'register') => void;
  onOpenDeployModal: () => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeView,
  onNavigate,
  onOpenReportModal,
  onOpenAuthModal,
  onOpenDeployModal,
  onSwitchRole,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const roles: Array<{ role: UserRole; label: string; icon: any; color: string; desc: string }> = [
    { role: 'citizen', label: 'Citizen Portal', icon: UserCheck, color: 'text-amber-600', desc: 'Report & track local challenges' },
    { role: 'student', label: 'Student Innovator', icon: GraduationCap, color: 'text-blue-600', desc: 'Discover challenges & build solutions' },
    { role: 'faculty', label: 'Faculty / Mentor', icon: Users, color: 'text-indigo-600', desc: 'Review proposals & guide projects' },
    { role: 'university', label: 'University Admin', icon: Building2, color: 'text-slate-700', desc: 'Manage teams & institutional tier' },
    { role: 'industry', label: 'Industry Partner', icon: Briefcase, color: 'text-emerald-600', desc: 'Sponsor tech, mentorship & testing' },
    { role: 'csr', label: 'CSR Organization', icon: HeartHandshake, color: 'text-rose-600', desc: 'Fund implementation & track impact' },
    { role: 'admin', label: 'Government / Admin', icon: ShieldCheck, color: 'text-purple-600', desc: 'Verify challenges & state analytics' },
  ];

  const currentRoleObj = roles.find(r => r.role === (currentUser?.role || 'citizen'));

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Challenges' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'impact', label: 'Impact Dashboard' },
    { id: 'business-model', label: 'Business Model' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Government & Portal Sub-header */}
      <div className="bg-[#091512] text-xs py-1.5 px-4 border-b border-emerald-950/80 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              National Innovation Portal
            </span>
            <span className="hidden sm:inline text-emerald-900">|</span>
            <span className="hidden sm:inline text-slate-300 font-medium">Societal Challenge Gateway</span>
            <span className="hidden md:inline text-slate-400 font-medium">• Grassroots R&D Collaboration</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toll-Free Civic Helpline: 1800-CIVIORA</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <CivioraLogo variant="dark" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Portal Direct Access */}
            {currentUser && (
              <button
                onClick={() => onNavigate(`portal-${currentUser.role}`)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeView.startsWith('portal-')
                    ? 'bg-emerald-700 text-white font-semibold shadow-sm'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50'
                }`}
              >
                <FolderKanban className="w-4 h-4 text-emerald-600" />
                <span>My Workspace</span>
              </button>
            )}
          </nav>

          {/* Right Action Elements */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Quick Role Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs text-slate-800 transition-all font-medium"
                title="Switch role instantly to test all 7 platform portals"
              >
                {currentRoleObj && React.createElement(currentRoleObj.icon, { className: `w-4 h-4 ${currentRoleObj.color}` })}
                <span className="font-semibold text-slate-800 truncate max-w-[110px]">{currentRoleObj?.label.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Test Persona</p>
                    <p className="text-xs text-slate-500">Test role-based permissions & dashboards</p>
                  </div>
                  {roles.map((r) => {
                    const isSelected = currentUser?.role === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          onSwitchRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left flex items-start gap-2.5 transition-colors ${
                          isSelected ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {React.createElement(r.icon, { className: `w-4 h-4 mt-0.5 ${r.color}` })}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold">{r.label}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight">{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Report a Challenge Prominent CTA */}
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm shadow-sm transition-all transform active:scale-95 border border-emerald-600"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a Challenge</span>
            </button>

            {/* User Account / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                        {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate(`portal-${currentUser.role}`);
                        setUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <FolderKanban className="w-4 h-4 text-emerald-600" />
                      <span>My Workspace & Projects</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('explore');
                        setUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <Compass className="w-4 h-4 text-slate-600" />
                      <span>Browse Societal Challenges</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="px-3.5 py-2 rounded-lg bg-[#091512] hover:bg-[#122b24] text-white text-xs font-semibold border border-emerald-950 transition-all shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenReportModal}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Report
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-left text-xs font-medium ${
                  activeView === link.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Role Switcher */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Switch Test Persona:</p>
            <div className="grid grid-cols-2 gap-1.5">
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    onSwitchRole(r.role);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1.5 rounded text-xs text-left flex items-center gap-1.5 ${
                    currentUser?.role === r.role ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {React.createElement(r.icon, { className: `w-3.5 h-3.5 ${r.color}` })}
                  <span className="truncate">{r.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200"
              >
                Sign Out ({currentUser.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    onOpenAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
