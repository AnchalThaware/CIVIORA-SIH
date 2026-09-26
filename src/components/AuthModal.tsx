import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  X, 
  UserCheck, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  LogIn, 
  UserPlus
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode: initialMode,
  onLogin
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');

  const personas: Array<{ role: UserRole; name: string; email: string; org: string; label: string; icon: any; color: string }> = [
    { role: 'citizen', name: 'Rameshwar Munda', email: 'rameshwar.munda@sarwan.jharkhand.gov.in', org: 'Sarwan Gram Panchayat, Deoghar', label: 'Citizen', icon: UserCheck, color: 'text-amber-600' },
    { role: 'student', name: 'Aarav Sharma', email: 'aarav.sharma@bitmesra.ac.in', org: 'BIT Mesra, Ranchi', label: 'Student Innovator', icon: GraduationCap, color: 'text-teal-600' },
    { role: 'faculty', name: 'Dr. Alok Kumar', email: 'alok.kumar@bitmesra.ac.in', org: 'Dept of Environmental Engineering, BIT Mesra', label: 'Faculty Mentor', icon: Users, color: 'text-indigo-600' },
    { role: 'university', name: 'Dean Academics & R&D', email: 'dean.rnd@bitmesra.ac.in', org: 'Birla Institute of Technology (BIT) Mesra', label: 'University Dean', icon: Building2, color: 'text-blue-600' },
    { role: 'industry', name: 'Tata Steel R&D Hub', email: 'innovation@tatasteel.com', org: 'Tata Steel Technologies Ltd', label: 'Industry Partner', icon: Briefcase, color: 'text-emerald-600' },
    { role: 'csr', name: 'Tata Trusts Rural Mission', email: 'csr-grants@tatatrusts.org', org: 'Tata Trusts Foundation', label: 'CSR Sponsor', icon: HeartHandshake, color: 'text-rose-600' },
    { role: 'admin', name: 'Jharkhand State Nodal Officer', email: 'nodal.innovation@jharkhand.gov.in', org: 'Department of Higher & Technical Education', label: 'Govt Nodal Officer', icon: ShieldCheck, color: 'text-purple-600' },
  ];

  const handleSelectPersona = (p: typeof personas[0]) => {
    const user: User = {
      id: `usr-${p.role}-${Date.now()}`,
      name: p.name,
      email: p.email,
      role: p.role,
      university: p.role === 'student' || p.role === 'faculty' || p.role === 'university' ? p.org : undefined,
      company: p.role === 'industry' || p.role === 'csr' ? p.org : undefined,
      department: p.role === 'faculty' ? 'Environmental Engineering' : undefined,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
    onLogin(user);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: `usr-${Date.now()}`,
      name: name || (mode === 'login' ? email.split('@')[0] : 'Innovator'),
      email: email || 'user@civiora.org',
      role: selectedRole,
      university: selectedRole === 'student' || selectedRole === 'university' ? organization : undefined,
      company: selectedRole === 'industry' || selectedRole === 'csr' ? organization : undefined,
    };
    onLogin(user);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#0F2A43] text-white p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {mode === 'login' ? 'Sign In to CIVIORA' : 'Register for CIVIORA'}
            </h3>
            <p className="text-xs text-teal-200">Societal Innovation Collaboration Portal</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Fast Test Selector */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ⚡ Quick Persona One-Click Login:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {personas.map((p) => (
              <button
                key={p.role}
                onClick={() => handleSelectPersona(p)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-teal-500 hover:bg-teal-50/50 text-left flex items-start gap-2 transition-all shadow-sm"
              >
                {React.createElement(p.icon, { className: `w-4 h-4 mt-0.5 ${p.color} shrink-0` })}
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 truncate">{p.label}</p>
                  <p className="text-[10px] text-slate-500 truncate">{p.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Regular Auth Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Or Sign In with Email Credentials:
            </span>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rameshwar Munda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. innovator@jharkhand.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Account Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
              >
                <option value="citizen">Citizen (Report & Track)</option>
                <option value="student">Student Innovator</option>
                <option value="faculty">Faculty / Mentor</option>
                <option value="university">University Dean</option>
                <option value="industry">Industry Partner</option>
                <option value="csr">CSR Organization</option>
                <option value="admin">Government Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-md transition-all"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-xs text-[#0F766E] hover:underline font-semibold"
            >
              {mode === 'login' ? "Don't have an account? Register here" : 'Already have an account? Sign In'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
