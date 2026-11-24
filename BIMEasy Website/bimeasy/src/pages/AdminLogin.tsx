import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';

const API_BASE = "https://us-central1-bimeasy-website.cloudfunctions.net";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/adminLogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminName', data.name);
      localStorage.setItem('adminRole', data.role);
      navigate('/super-admin/summary');
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e8f0fe 30%, #f1f5f9 60%, #e8f0fe 100%)',
      }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,71,141,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,71,141,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <line x1="50" y1="0" x2="350" y2="800" stroke="#00478D" strokeWidth="1" />
          <line x1="100" y1="0" x2="400" y2="800" stroke="#00478D" strokeWidth="0.5" />
          <line x1="150" y1="0" x2="450" y2="800" stroke="#00478D" strokeWidth="0.5" />
          <rect x="200" y="200" width="120" height="120" stroke="#00478D" fill="none" strokeWidth="0.5" transform="rotate(15 260 260)" />
          <rect x="250" y="500" width="80" height="80" stroke="#00478D" fill="none" strokeWidth="0.5" transform="rotate(-10 290 540)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="BIMEasy" className="w-8 h-8 object-contain brightness-0 invert" />
        </div>

        <h1 className="text-3xl font-headline font-black text-on-surface tracking-tight mb-1">Control Panel</h1>
        <p className="text-on-surface-variant text-sm mb-10">Internal Management & Automation Gateway</p>

        {/* Login Card */}
        <form onSubmit={handleLogin} className="w-full bg-white rounded-2xl border border-outline-variant/15 p-8 shadow-xl shadow-black/5 space-y-6">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* User ID */}
          <div>
            <label className="text-[0.65rem] font-black text-on-surface-variant uppercase tracking-[0.15em] mb-2 block">
              User ID or Email
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-4 h-4" />
              <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="e.g. architect@bimeasy.com"
                className="w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[0.65rem] font-black text-on-surface-variant uppercase tracking-[0.15em]">
                Password
              </label>
              <button type="button" className="text-[0.65rem] font-black text-primary uppercase tracking-[0.15em] hover:underline">
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-4 h-4" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-11 pr-12 py-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-outline-variant/30 rounded peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-on-surface-variant">Remember this device for 30 days</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-[0.15em] hover:bg-[#003d73] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Secure Login
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-[0.6rem] font-black text-primary uppercase tracking-[0.2em]">
              BIMEasy Automation Secure Core Active
            </span>
          </div>
        </form>
      </motion.div>

      {/* Footer */}
      <div className="relative z-10 mt-12 text-center space-y-3">
        <p className="text-[0.6rem] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em]">
          Authorized Personnel Only © 2024 BIMEasy Precision
        </p>
        <div className="flex gap-6 justify-center">
          {['Network Status', 'Security Policy', 'Support'].map(link => (
            <a key={link} href="#" className="text-[0.6rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.15em] hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
