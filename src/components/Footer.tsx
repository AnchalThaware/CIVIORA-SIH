import React from 'react';
import { CivioraLogo } from './CivioraLogo';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  PlusCircle, 
  ArrowRight,
  Globe2,
  FileCheck2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenReportModal: () => void;
  onOpenDeployModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReportModal }) => {
  return (
    <footer className="bg-[#091512] text-slate-300 pt-16 pb-12 border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/30">
          
          {/* Col 1: Platform Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => onNavigate('home')}>
              <CivioraLogo variant="white" size="lg" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A digital collaborative platform crowdsourcing genuine societal challenges and matching them with universities, student innovators, industry leaders, and CSR funding for measurable grassroots impact.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>National Societal Innovation Collaboration Portal</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>Platform</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Explore Challenges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  How CIVIORA Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('impact')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Impact Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('business-model')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Business Model & Tiers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Stakeholders</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('portal-citizen')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Citizen Reporting Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal-student')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Student Innovation Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal-faculty')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Faculty Mentorship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal-university')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  University Deanery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal-industry')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Industry Technology R&D
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal-csr')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  CSR Grant Sponsoring
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal-admin')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Government Nodal Officer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Civic Helpdesk & Citizen Action */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Civic Helpdesk</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Toll-Free Civic Helpline</span>
                  <p className="text-slate-400">1800-CIVIORA (24x7 Support)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Nodal Verification Desk</span>
                  <p className="text-slate-400">nodal.desk@civiora.gov.in</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Headquarters</span>
                  <p className="text-slate-400">Ranchi, Jharkhand & State Centers</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenReportModal}
              className="w-full mt-2 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a Grassroots Challenge</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 CIVIORA Portal. Empowering Grassroots Societal Innovation.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Grassroots Impact Registry</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
