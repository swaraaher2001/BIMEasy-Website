import { motion } from 'motion/react';
import { Download, Bolt, Layers, Monitor, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';

export default function DownloadPage() {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const countryCodes = [
    { code: '+91', label: '🇮🇳 +91' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+44', label: '🇬🇧 +44' },
    { code: '+61', label: '🇦🇺 +61' },
    { code: '+49', label: '🇩🇪 +49' },
    { code: '+33', label: '🇫🇷 +33' },
    { code: '+81', label: '🇯🇵 +81' },
    { code: '+86', label: '🇨🇳 +86' },
    { code: '+82', label: '🇰🇷 +82' },
    { code: '+65', label: '🇸🇬 +65' },
    { code: '+971', label: '🇦🇪 +971' },
    { code: '+966', label: '🇸🇦 +966' },
    { code: '+55', label: '🇧🇷 +55' },
    { code: '+52', label: '🇲🇽 +52' },
    { code: '+27', label: '🇿🇦 +27' },
    { code: '+234', label: '🇳🇬 +234' },
    { code: '+254', label: '🇰🇪 +254' },
    { code: '+39', label: '🇮🇹 +39' },
    { code: '+34', label: '🇪🇸 +34' },
    { code: '+31', label: '🇳🇱 +31' },
    { code: '+46', label: '🇸🇪 +46' },
    { code: '+47', label: '🇳🇴 +47' },
    { code: '+45', label: '🇩🇰 +45' },
    { code: '+48', label: '🇵🇱 +48' },
    { code: '+90', label: '🇹🇷 +90' },
    { code: '+7', label: '🇷🇺 +7' },
    { code: '+62', label: '🇮🇩 +62' },
    { code: '+60', label: '🇲🇾 +60' },
    { code: '+66', label: '🇹🇭 +66' },
    { code: '+63', label: '🇵🇭 +63' },
    { code: '+84', label: '🇻🇳 +84' },
    { code: '+880', label: '🇧🇩 +880' },
    { code: '+92', label: '🇵🇰 +92' },
    { code: '+94', label: '🇱🇰 +94' },
    { code: '+977', label: '🇳🇵 +977' },
  ];

  const countryList = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Japan', 'China', 'South Korea', 'Singapore',
    'United Arab Emirates', 'Saudi Arabia', 'Brazil', 'Mexico',
    'South Africa', 'Nigeria', 'Kenya', 'Italy', 'Spain', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Poland', 'Turkey', 'Russia',
    'Indonesia', 'Malaysia', 'Thailand', 'Philippines', 'Vietnam',
    'Bangladesh', 'Pakistan', 'Sri Lanka', 'Nepal', 'Egypt', 'Qatar',
    'Kuwait', 'Oman', 'Bahrain', 'New Zealand', 'Ireland', 'Belgium',
    'Switzerland', 'Austria', 'Portugal', 'Czech Republic', 'Romania',
    'Hungary', 'Greece', 'Finland', 'Colombia', 'Argentina', 'Chile',
    'Peru', 'Israel', 'Taiwan', 'Hong Kong', 'Other'
  ];

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !role || !country || !agreed) {
        alert("Please fill out all required fields to download the plugin.");
        return;
    }

    setSubmitting(true);
    const fullPhone = `${countryCode} ${phone}`;

    try {
      await fetch("https://us-central1-bimeasy-website.cloudfunctions.net/saveDownloadLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: fullPhone, email, role, country, agreed })
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative overflow-hidden bg-white">
        {/* Architectural Background Pattern */}
        <div className="absolute inset-0 architectural-grid pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-16 max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1]"
            >
              Get the Precision Advantage: <br />
              <span className="text-primary italic">Download BIMEasy</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              Streamline your BIM workflow with the most advanced automation suite for Revit. Join over 15,000 BIM professionals worldwide.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_rgba(23,28,31,0.06)] border border-outline-variant/10 relative"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 px-6"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-emerald-50 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-3">Check Your Email! 📧</h2>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto mb-2">
                    We've sent a download link to
                  </p>
                  <p className="text-primary font-bold text-lg mb-6">{email}</p>
                  <div className="bg-surface-container-low rounded-xl p-6 max-w-md mx-auto text-left space-y-3 mb-8">
                    <p className="text-sm text-on-surface-variant">
                      <span className="font-bold text-on-surface">💡 Didn't receive it?</span> Check your spam or promotions folder. The email is from <span className="font-bold">bimeasy.in@gmail.com</span>
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setName(''); setPhone(''); setEmail(''); setRole(''); setCountry(''); setAgreed(false); }}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    ← Submit another request
                  </button>
                </motion.div>
              ) : (
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Jean Nouvel"
                      className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Phone Number *</label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <select
                          value={countryCode}
                          onChange={e => setCountryCode(e.target.value)}
                          className="h-full pl-3 pr-8 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface appearance-none text-sm min-w-[95px]"
                        >
                          {countryCodes.map(cc => (
                            <option key={cc.code} value={cc.code}>{cc.label}</option>
                          ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                          <ChevronRight className="rotate-90" size={14} />
                        </div>
                      </div>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="000 000 0000"
                        className="flex-1 px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="group space-y-2">
                  <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Email Id *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Role *</label>
                    <div className="relative">
                      <select required value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface appearance-none">
                        <option value="">Select your role</option>
                        <option>Architect</option>
                        <option>Structural Engineer</option>
                        <option>MEP Engineer</option>
                        <option>BIM Manager</option>
                        <option>Contractor</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                        <ChevronRight className="rotate-90" size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Country *</label>
                    <div className="relative">
                      <select 
                        required 
                        value={country} 
                        onChange={e => setCountry(e.target.value)} 
                        className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface appearance-none"
                      >
                        <option value="">Select your country</option>
                        {countryList.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                        <ChevronRight className="rotate-90" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-4 cursor-pointer group pt-4 pb-6">
                  <div className="relative mt-1">
                    <input type="checkbox" required checked={agreed} onChange={e => setAgreed(e.target.checked)} className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                      <div className="text-white scale-0 peer-checked:scale-100 transition-transform">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-on-surface-variant leading-relaxed">
                    I agree to receive technical updates and release notes from BIMEasy. I can unsubscribe at any time. *
                  </span>
                </label>

                <button 
                  onClick={handleDownload} 
                  disabled={submitting}
                  className="w-full bg-primary text-white py-5 rounded-xl font-headline font-bold text-lg tracking-wide hover:bg-[#004B8C] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Download Link...
                    </>
                  ) : (
                    <>
                      Get Download Link
                      <Download size={20} />
                    </>
                  )}
                </button>
              </form>
              )}
            </motion.div>

            {/* Sidebar Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 space-y-10"
            >


              {/* Requirements Container */}
              <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
                <h4 className="text-[0.6875rem] font-black text-on-surface-variant uppercase tracking-widest mb-8 border-b border-outline-variant/20 pb-4">
                  System Requirements
                </h4>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <Layers size={20} />
                    </div>
                    <div>
                      <p className="text-[0.625rem] font-black text-on-surface-variant uppercase tracking-tight">Revit Versions</p>
                      <p className="text-sm font-medium text-on-surface">Revit 2023, 2024, 2025, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <Monitor size={20} />
                    </div>
                    <div>
                      <p className="text-[0.625rem] font-black text-on-surface-variant uppercase tracking-tight">Operating System</p>
                      <p className="text-sm font-medium text-on-surface">Windows 10 / 11 (64-bit)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
