import { motion } from 'motion/react';
import { Download, Bolt, Layers, Monitor, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              alt="BIMEasy Logo" 
              className="h-8 w-auto" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKtAqldawsylVstKZMHXRU0WSxcjqR63ZM-fWVP-m7TmPIa1XjhVxzX2QrKC0qg6LN5tRENFWLhPVWcaVF5l3Lvn2Us4J__jBRCbJGfYP5QgfF8TQ9UWkF0ImswiKBjiw6wea6x6g8wpcSNBogs-UAX73AVAgyC6H153QtnnRLOqMpFnfl9IflA8eiqNj9FEQp8z3O3wW8vdaLFSy8k6yYNTWZQLwIn7VCKbTerP6oSr-_BPRlzjEeqKiF-fOJoDEZsvQ8KFYGWQ"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold font-headline tracking-tight text-on-surface">BIMEasy</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Resources</a>
          </div>

          <div className="hidden md:block">
            <button className="bg-primary text-on-primary text-sm font-bold px-5 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-on-surface" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-outline-variant/20 px-6 py-8 space-y-4"
          >
            <a href="#" className="block text-lg font-medium text-on-surface">Features</a>
            <a href="#" className="block text-lg font-medium text-on-surface">Pricing</a>
            <a href="#" className="block text-lg font-medium text-on-surface">Resources</a>
            <button className="w-full bg-primary text-on-primary text-sm font-bold px-5 py-3 rounded-lg">
              Get Started
            </button>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
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
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Jean Nouvel"
                      className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>

                <div className="group space-y-2">
                  <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-2">
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Role</label>
                    <div className="relative">
                      <select className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface appearance-none">
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
                    <label className="block text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Country</label>
                    <input 
                      type="text" 
                      placeholder="e.g. United Kingdom"
                      className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-4 cursor-pointer group pt-4">
                  <div className="relative mt-1">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                      <div className="text-white scale-0 peer-checked:scale-100 transition-transform">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-on-surface-variant leading-relaxed">
                    I agree to receive technical updates and release notes from BIMEasy. I can unsubscribe at any time.
                  </span>
                </label>
              </form>
            </motion.div>

            {/* Sidebar Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 space-y-10"
            >
              {/* Download Card */}
              <div className="bg-primary-container p-10 lg:p-12 rounded-3xl relative overflow-hidden group shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                    <Download className="text-primary" size={36} />
                  </div>
                  
                  <h3 className="text-2xl font-headline font-extrabold text-white mb-2">BIMEasy v1.0</h3>
                  <div className="h-1 w-12 bg-white/20 rounded-full mb-10" />

                  <button className="w-full bg-gradient-to-br from-tertiary to-tertiary-container text-white py-5 rounded-xl font-headline font-bold text-lg tracking-wide hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/20">
                    Download Now
                    <Bolt size={20} fill="currentColor" />
                  </button>
                  
                  <p className="mt-6 text-[0.625rem] text-white/60 uppercase tracking-widest font-black">
                    Installer Package (42MB)
                  </p>
                </div>
              </div>

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
      <footer className="w-full border-t border-outline-variant/10 bg-surface py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="text-2xl font-black text-on-surface font-headline mb-3 italic">BIMEasy</div>
            <p className="text-on-surface-variant text-[0.7rem] font-medium tracking-wide">
              © 2024 BIMEasy. Precision Engineering for Revit.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            <a href="#" className="text-on-surface-variant text-xs font-bold hover:text-primary transition-colors tracking-widest uppercase">Privacy Policy</a>
            <a href="#" className="text-on-surface-variant text-xs font-bold hover:text-primary transition-colors tracking-widest uppercase">Terms of Service</a>
            <a href="#" className="text-on-surface-variant text-xs font-bold hover:text-primary transition-colors tracking-widest uppercase">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
