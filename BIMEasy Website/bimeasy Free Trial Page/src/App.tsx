import { motion } from "motion/react";
import { 
  Timer, 
  ShieldCheck, 
  Layers, 
  RefreshCw, 
  ChevronDown 
} from "lucide-react";

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBvIBuOYGdImTVkkb3D433kQXK_SDLWfFQz_NsyO_dgzoY0QVQQnVjavjXEfRQ2LGHxeY-hyGGZHxDBJZ4nssBRgkZcA5spce9rplkS5YBeinWcc58eDozUdId42QWJ0nBNTLFykA9ieeBfnQpa442dpTGT9JNuAqQ-pewzH5tVU8et6Chl9BJzMJ6bFFE7qX5He_P8iOiyoBcS5xaxBh0gv3hpa2xcoeJ2qmPh4gAYS-Eup36JG0JJmihOOuJKg6ciN7zgQ6v4Wg";
const TESTIMONIAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuB1gt0Nhpk8uz7ssoII8nqJRnfwiI1agRMDjzKotoZdEAYZoiflYeLDiIE-HgPo2Em-iAptJrNX3lszangJvyeSnxBsPsuJ55tcuSh0TU9S49qVluoMt0vSGvuf7XY3mGhsB9dh7GKS2v61hfB2iR8Pe9P49G25iM9kfVzttStgT-JI3wYj-kGWFpe5xon5Dc05yO-OWZ-AS5OS1RMzFDZPC_4c0oYNMX-2UJmykhXpE1cJSpxOpP78o1eRwpFuJezYMFJ3H9FsMQ";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md shadow-sm flex justify-between items-center h-16 px-6 lg:px-12">
        <div className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span className="text-primary">BIM</span>Easy
        </div>
        <div className="hidden md:flex gap-8">
          {["Features", "Pricing", "Documentation", "Community"].map((item) => (
            <a 
              key={item}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" 
              href="#"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all">
          Sign In
        </button>
      </nav>

      <main className="flex-grow pt-24 pb-32 px-6 lg:px-12 blueprint-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Sign-up Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm border border-outline-variant/15"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-on-surface mb-3 tracking-tight leading-tight">
                Engineer Your Future
              </h1>
              <p className="text-on-surface-variant text-lg">
                Start your 14-day full-access trial. No credit card required.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Full Name</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                  placeholder="John Doe" 
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Work Email</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                  placeholder="john@firm.com" 
                  type="email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Company</label>
                  <input 
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                    placeholder="Architectural Solutions" 
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Job Role</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface appearance-none cursor-pointer">
                      <option>Architect</option>
                      <option>BIM Manager</option>
                      <option>Engineer</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150">
                  Start My 14-Day Free Trial
                </button>
              </div>

              <p className="text-xs text-center text-on-surface-variant leading-relaxed">
                By signing up, you agree to our <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
              </p>
            </form>
          </motion.div>

          {/* Right Column: Why BIMEasy? */}
          <div className="space-y-12 lg:pl-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <img 
                alt="BIMEasy Logo" 
                className="h-10 w-auto" 
                src={LOGO_URL}
                referrerPolicy="no-referrer"
              />
              <div className="h-8 w-px bg-outline-variant/30"></div>
              <span className="text-sm font-bold tracking-widest text-primary uppercase">Why BIMEasy?</span>
            </motion.div>

            <div className="space-y-10">
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-1">40+ hours saved per month</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Eliminate repetitive tasks with intelligent parametric automation that scales with your projects.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-1">Automated QA/QC audits</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Instant compliance checks and model integrity reports to ensure zero-error documentation.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-1">Seamless Revit integration</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Native plugin experience that lives inside your ribbon, built for Revit 2021 through 2025.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Testimonial */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative bg-surface-container-low p-8 rounded-2xl border-l-4 border-tertiary shadow-sm"
            >
              <div className="absolute -top-4 -left-2 text-6xl text-tertiary/10 font-serif leading-none select-none">“</div>
              <p className="text-on-surface italic leading-relaxed mb-6 relative z-10 text-lg">
                "BIMEasy transformed our workflow. What used to take three days of manual data entry now happens in seconds. It’s the most vital tool in our Revit stack."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-300 border-2 border-white shadow-sm">
                  <img 
                    alt="BIM Manager Headshot" 
                    src={TESTIMONIAL_IMG}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Marcus Thorne</p>
                  <p className="text-xs text-on-surface-variant font-medium">BIM Manager, SkyLine Group</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-primary">BIM</span>Easy
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              © 2024 BIMEasy. Precision Engineering for Revit. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 md:justify-end items-start">
            {["Privacy Policy", "Terms of Service", "Support", "Contact"].map((link) => (
              <a 
                key={link}
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium" 
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Sync-State Hub (Signature Component) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50"
      >
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-full shadow-2xl flex items-center gap-4 border border-outline-variant/20">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-tertiary-fixed rounded-full animate-ping opacity-20"></div>
            <div className="w-10 h-10 bg-tertiary-fixed/20 rounded-full flex items-center justify-center text-tertiary">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">System Status</span>
              <span className="text-[10px] font-bold text-tertiary uppercase">Ready</span>
            </div>
            <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="h-full bg-tertiary-fixed"
              ></motion.div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant font-bold px-3 py-1 bg-surface-container-low rounded-full">
            v2.4.0
          </div>
        </div>
      </motion.div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
