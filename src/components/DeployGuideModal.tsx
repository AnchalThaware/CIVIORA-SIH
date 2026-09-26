import React, { useState } from 'react';
import { 
  X, 
  Server, 
  Database, 
  Cloud, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck,
  Layers,
  Code
} from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cloudrun' | 'render' | 'mongodb' | 'env'>('cloudrun');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">CIVIORA Production Deployment Guide</h2>
              <p className="text-xs text-slate-400">Deploy Full-Stack Express + MongoDB Atlas + Gemini AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-50 px-6 pt-3 flex gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('cloudrun')}
            className={`px-4 py-2.5 rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === 'cloudrun' ? 'bg-white text-blue-600 shadow-sm border-t-2 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Google Cloud Run / AI Studio (Recommended)
          </button>

          <button
            onClick={() => setActiveTab('render')}
            className={`px-4 py-2.5 rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === 'render' ? 'bg-white text-blue-600 shadow-sm border-t-2 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Render / Vercel Full-Stack
          </button>

          <button
            onClick={() => setActiveTab('mongodb')}
            className={`px-4 py-2.5 rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === 'mongodb' ? 'bg-white text-blue-600 shadow-sm border-t-2 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MongoDB Atlas Setup
          </button>

          <button
            onClick={() => setActiveTab('env')}
            className={`px-4 py-2.5 rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === 'env' ? 'bg-white text-blue-600 shadow-sm border-t-2 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Environment Variables (.env)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800 leading-relaxed">
          
          {/* TAB 1: CLOUD RUN / AI STUDIO */}
          {activeTab === 'cloudrun' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm text-blue-900">
                  <Cloud className="w-5 h-5 text-blue-600" />
                  <span>One-Click Cloud Run Deployment (AI Studio)</span>
                </div>
                <p className="text-slate-700">
                  Because CIVIORA is configured with full-stack Node/Express scripts in <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-slate-900 font-mono">package.json</code>, you can deploy it directly from the AI Studio header.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 uppercase text-[11px]">Deployment Steps:</h4>
                <ol className="space-y-2.5 list-decimal pl-5 text-slate-700">
                  <li>
                    <strong>Click "Deploy"</strong> in the top-right menu of Google AI Studio.
                  </li>
                  <li>
                    Select your Google Cloud Project or allow AI Studio to provision a serverless Cloud Run container automatically.
                  </li>
                  <li>
                    Configure the Secrets in Settings: Add your <code className="font-mono bg-slate-100 px-1 rounded">GEMINI_API_KEY</code> and optional <code className="font-mono bg-slate-100 px-1 rounded">MONGODB_URI</code>.
                  </li>
                  <li>
                    The build script <code className="font-mono bg-slate-100 px-1 rounded">npm run build</code> will bundle the frontend with Vite and the backend server with esbuild into <code className="font-mono bg-slate-100 px-1 rounded">dist/server.cjs</code>.
                  </li>
                  <li>
                    Your live production URL is generated instantly with SSL enabled!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: RENDER / DOCKER */}
          {activeTab === 'render' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm text-blue-900">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span>Deploying on Render / VPS / Railway</span>
                </div>
                <p className="text-slate-700">
                  CIVIORA runs as a standalone Express Node.js application serving both backend APIs and Vite static assets on port 3000.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-slate-800">Build & Start Commands:</span>
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] flex justify-between items-center">
                  <span>Build Command: npm run build</span>
                  <button onClick={() => copyToClipboard('npm run build', 'build')} className="text-blue-400 hover:text-white">
                    {copiedSection === 'build' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] flex justify-between items-center">
                  <span>Start Command: npm run start</span>
                  <button onClick={() => copyToClipboard('npm run start', 'start')} className="text-blue-400 hover:text-white">
                    {copiedSection === 'start' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MONGODB ATLAS */}
          {activeTab === 'mongodb' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-900">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span>MongoDB Atlas Permanent Storage</span>
                </div>
                <p className="text-slate-700">
                  By default, CIVIORA runs an automatic resilient in-memory database fallback so the app works seamlessly even without an external database. To connect real MongoDB Atlas:
                </p>
              </div>

              <ol className="space-y-2.5 list-decimal pl-5 text-slate-700">
                <li>Create a free cluster on <a href="https://mongodb.com/atlas" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline">MongoDB Atlas</a>.</li>
                <li>Go to <strong>Database Access</strong> and create a database user (e.g. <code className="font-mono">civiora_admin</code>).</li>
                <li>Go to <strong>Network Access</strong> and allow IP address <code className="font-mono">0.0.0.0/0</code>.</li>
                <li>Click <strong>Connect → Connect your application</strong> and copy your Connection String.</li>
                <li>Set <code className="font-mono bg-slate-100 px-1 rounded">MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/civiora?retryWrites=true&w=majority</code> in your environment variables.</li>
              </ol>
            </div>
          )}

          {/* TAB 4: ENV VARIABLES */}
          {activeTab === 'env' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Set these environment variables in your hosting provider's dashboard:
              </p>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-2">
                <div># Google Gemini API Key for AI Problem Analysis</div>
                <div className="text-blue-400">GEMINI_API_KEY=your_gemini_api_key_here</div>
                <div className="pt-2"># MongoDB Atlas Connection String</div>
                <div className="text-amber-300">MONGODB_URI=mongodb+srv://admin:pass@cluster.mongodb.net/?retryWrites=true&w=majority</div>
                <div className="pt-2"># MongoDB Database Name</div>
                <div className="text-emerald-300">MONGODB_DB_NAME=CIVIORA_SIH</div>
                <div className="pt-2"># JWT Secret Key for Auth Tokens</div>
                <div className="text-blue-300">JWT_SECRET=civiora_portal_jwt_secret_token_98234</div>
                <div className="pt-2"># Server Port (Defaults to 3000)</div>
                <div>PORT=3000</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium">National Societal Innovation Collaboration Portal</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
