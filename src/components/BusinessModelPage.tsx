import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface BusinessModelPageProps {
  onOpenReportModal: () => void;
  onNavigate: (view: string) => void;
}

export const BusinessModelPage: React.FC<BusinessModelPageProps> = ({
  onOpenReportModal,
  onNavigate
}) => {
  const tiers = [
    {
      name: 'Citizens & Grassroots Communities',
      price: '₹0 / Free Forever',
      period: 'No Hidden Fees',
      desc: 'Empowering villagers, panchayat leaders, and citizens to report and track local problems.',
      color: 'border-amber-400 bg-amber-50/40',
      badge: '100% Public Good',
      features: [
        'Unlimited problem reporting with photos & GPS',
        'Direct progress tracking of assigned student teams',
        'Direct message board with university squads',
        'SMS & email notifications on status updates',
        'Community verification and ground testing feedback'
      ],
      ctaText: 'Report a Problem',
      ctaAction: onOpenReportModal,
      buttonColor: 'bg-amber-600 hover:bg-amber-700 text-white'
    },
    {
      name: 'Student Innovators & Teams',
      price: '₹0 / Free Access',
      period: 'Unlimited Projects',
      desc: 'Empowering engineering & college students to build verified capstone prototypes.',
      color: 'border-teal-400 bg-teal-50/40',
      badge: 'Full Student Access',
      features: [
        'Browse 100% real societal challenge repository',
        'Submit multidisciplinary team proposals',
        'Access industry engineering mentorship',
        'Unlock milestone-linked CSR hardware grants',
        'Verified certificates of societal innovation'
      ],
      ctaText: 'Enter Student Hub',
      ctaAction: () => onNavigate('portal-student'),
      buttonColor: 'bg-[#0F766E] hover:bg-[#115E59] text-white'
    },
    {
      name: 'University Institutional Tier',
      price: '₹45,000',
      period: 'per year / campus',
      desc: 'For colleges & universities managing student squads, faculty mentors, and NAAC/NIRF metrics.',
      color: 'border-blue-400 bg-white',
      badge: 'Institutional Pro',
      features: [
        'Campus-wide student team assignment & tracking',
        'Departmental faculty mentor review workflows',
        'Auto-generated NAAC & NIRF Criterion 3 report (.CSV)',
        'Institutional innovation showcase page',
        'Direct CSR grant escrow integration'
      ],
      ctaText: 'University Deanery',
      ctaAction: () => onNavigate('portal-university'),
      buttonColor: 'bg-blue-900 hover:bg-blue-800 text-white'
    },
    {
      name: 'Corporate & CSR Foundation',
      price: '₹1,20,000',
      period: 'per year + 3% escrow fee',
      desc: 'For industry R&D teams and CSR foundations deploying milestone-linked grants.',
      color: 'border-rose-400 bg-white',
      badge: 'Enterprise ESG',
      features: [
        'Exclusive talent scouting from 50+ universities',
        'Milestone-linked CSR grant disbursement engine',
        'MCA Section 135 & Schedule VII compliance certificates',
        'Early-stage IP co-creation & field testing',
        'Real-time social return on investment (SROI) metrics'
      ],
      ctaText: 'CSR Sponsoring Hub',
      ctaAction: () => onNavigate('portal-csr'),
      buttonColor: 'bg-rose-700 hover:bg-rose-800 text-white'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Sustainable & Transparent Economics</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F2A43] font-['Cabinet_Grotesk']">
          How CIVIORA Sustains Itself
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          CIVIORA operates on a high-impact, cross-subsidized social business model. Citizens and students never pay a single rupee. Revenue is generated from institutional university subscriptions and corporate CSR innovation management.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-3xl border-2 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all ${tier.color}`}
          >
            <div className="space-y-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white mb-2">
                  {tier.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tier.desc}</p>
              </div>

              <div className="py-2 border-y border-slate-200/80">
                <p className="text-2xl font-extrabold text-[#0F2A43] font-['Cabinet_Grotesk']">{tier.price}</p>
                <p className="text-[11px] text-slate-500">{tier.period}</p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {tier.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={tier.ctaAction}
                className={`w-full py-2.5 rounded-xl font-bold text-xs shadow transition-all ${tier.buttonColor}`}
              >
                {tier.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainable Revenue Streams Breakdown */}
      <div className="bg-[#0F2A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-teal-500/30 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Financial Transparency</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Cabinet_Grotesk']">
            Four Core Pillars of Economic Sustainability
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            A self-reinforcing flywheel connecting social need with institutional resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            <h4 className="font-bold text-white text-sm">1. University Subscriptions</h4>
            <p>Annual licensing for campus-wide project governance, automated NAAC/NIRF reporting, and student innovation team management.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <HeartHandshake className="w-6 h-6 text-rose-400" />
            <h4 className="font-bold text-white text-sm">2. CSR Escrow Administration</h4>
            <p>3-5% transaction fee on corporate CSR grant disbursements for automated milestone verification and compliance audit certification.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">3. Corporate R&D & Talent</h4>
            <p>Enterprises pay for early talent discovery from 50+ colleges and prototyping rights for rural clean tech solutions.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h4 className="font-bold text-white text-sm">4. Government Gateway</h4>
            <p>State innovation council contracts for multi-district societal challenge telemetry and municipal issue resolution dashboards.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
