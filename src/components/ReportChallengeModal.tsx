import React, { useState } from 'react';
import { User, ChallengeCategory, ChallengePriority } from '../types';
import { JHARKHAND_DISTRICTS, CATEGORIES } from '../data/mockData';
import { api } from '../services/api';
import { 
  X, 
  Upload, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  Image as ImageIcon, 
  Compass, 
  Trash2, 
  ShieldCheck, 
  Loader2,
  FileText,
  Users
} from 'lucide-react';

interface ReportChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onChallengeSubmitted: (newChallenge: any) => void;
}

export const ReportChallengeModal: React.FC<ReportChallengeModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onChallengeSubmitted
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('Agriculture & Water');
  const [district, setDistrict] = useState('Ranchi');
  const [village, setVillage] = useState('');
  const [latitude, setLatitude] = useState<number | null>(23.3441);
  const [longitude, setLongitude] = useState<number | null>(85.3096);
  const [locationName, setLocationName] = useState('Ranchi, Jharkhand');
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const [peopleAffected, setPeopleAffected] = useState('500');
  const [urgency, setUrgency] = useState<ChallengePriority>('High');
  const [expectedOutcome, setExpectedOutcome] = useState('');

  // Submitter info
  const [citizenName, setCitizenName] = useState(currentUser?.name || '');
  const [citizenEmail, setCitizenEmail] = useState(currentUser?.email || '');
  const [citizenPhone, setCitizenPhone] = useState(currentUser?.phone || '');

  // Media
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedChallengeData, setSubmittedChallengeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle GPS location capture
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Acquiring precise GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setLocationName(`Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)} (${district})`);
        setLocationStatus('GPS Coordinates acquired successfully!');
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationStatus('Unable to retrieve GPS automatically. Using manual district coordinates.');
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Image upload handling (Data URL storage)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const readers: Promise<string>[] = [];

    Array.from(files).forEach((file: File) => {
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(readers).then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
      setIsUploading(false);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit challenge form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please provide a descriptive title and problem statement.');
      return;
    }

    if (!citizenName.trim() || !citizenEmail.trim()) {
      setError('Please provide your name and email address for verification and project updates.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        title,
        description,
        category,
        district,
        village: village.trim() || 'Local Panchayat',
        locationName: locationName || `${village ? village + ', ' : ''}${district}, Jharkhand`,
        latitude,
        longitude,
        peopleAffected: parseInt(peopleAffected, 10) || 500,
        urgency,
        expectedOutcome: expectedOutcome.trim() || 'Sustainable community problem resolution with university partner.',
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'],
        submittedBy: {
          id: currentUser?.id || `usr-cit-${Date.now()}`,
          name: citizenName,
          email: citizenEmail,
          phone: citizenPhone,
        },
      };

      const res = await api.createChallenge(payload);
      setSubmittedChallengeData(res.challenge);
      setSubmitSuccess(true);
      onChallengeSubmitted(res.challenge);
    } catch (err: any) {
      setError(err.message || 'Failed to submit problem. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Report a Societal Challenge</h2>
              <p className="text-xs text-slate-400">Citizen Crowdsourcing Portal • Permanently Saved & Verified</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submitSuccess && submittedChallengeData ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                REAL USER SUBMISSION RECORDED
              </span>
              <h3 className="text-xl font-bold text-slate-900">Problem Successfully Registered!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your problem has been permanently saved with ID <strong className="text-slate-900">{submittedChallengeData.id}</strong> and is now visible in the Public Challenge Explorer.
              </p>
            </div>

            {/* AI Analysis Preview Box */}
            {submittedChallengeData.aiAnalysis && (
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex items-center gap-1.5 font-semibold text-blue-700">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI Decision Support Insights</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>AI Summary:</strong> {submittedChallengeData.aiAnalysis.summary}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {submittedChallengeData.aiAnalysis.keywords?.map((k: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white text-blue-900 border border-blue-200 font-medium text-[10px]">
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all"
              >
                View in Challenge Explorer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {error && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Section 1: Problem Basics */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-1">
                1. Problem Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Challenge Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Severe Fluoride Contamination in Sarwan Panchayat Borewells"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Problem Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the grassroots problem clearly: What is the current situation? How long has it persisted? What happens if it remains unsolved?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900 leading-relaxed"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Domain / Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as ChallengePriority)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900 bg-white font-medium"
                  >
                    <option value="Critical">Critical (Immediate Health/Safety Risk)</option>
                    <option value="High">High (Major Community Impact)</option>
                    <option value="Medium">Medium (Sustainable Solution Needed)</option>
                    <option value="Low">Low (General Quality of Life)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated People Affected</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 750"
                    value={peopleAffected}
                    onChange={(e) => setPeopleAffected(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Solution Outcome</label>
                  <input
                    type="text"
                    placeholder="e.g. Clean drinking water accessible to 350 households"
                    value={expectedOutcome}
                    onChange={(e) => setExpectedOutcome(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Location & Geolocation */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-1">
                2. Location & Geo-Tagging
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District (Jharkhand)</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900 bg-white"
                  >
                    {JHARKHAND_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Village / City / Block</label>
                  <input
                    type="text"
                    placeholder="e.g. Hesal Village, Angara Block"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-sm outline-none text-slate-900"
                  />
                </div>
              </div>

              {/* GPS Geolocation Button */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Exact / Approximate Location Coordinates</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {locationStatus || `Coordinates: ${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                >
                  {isLocating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Compass className="w-3.5 h-3.5" />}
                  <span>Detect GPS Location</span>
                </button>
              </div>
            </div>

            {/* Section 3: Photo Upload (Permanent Storage) */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                3. Photo Evidence & Media
              </h3>

              <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
                <input
                  type="file"
                  id="challenge-images"
                  multiple
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="challenge-images"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Click to upload ground photos or drag and drop
                  </span>
                  <span className="text-xs text-slate-500">
                    PNG, JPG or WebP images showing the field condition
                  </span>
                </label>
              </div>

              {/* Uploaded Images Preview Gallery */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden h-24 border border-slate-200 shadow-sm">
                      <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 4: Citizen Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                4. Citizen Contact (For Project Updates)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Munda"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rameshwar@gmail.com"
                    value={citizenEmail}
                    onChange={(e) => setCitizenEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Kept private; used for status notifications.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98351 00000"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running AI Analysis & Saving...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Submit & Run AI Verification</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
