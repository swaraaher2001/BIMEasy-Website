/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  FileText, 
  Layers, 
  Zap, 
  Video, 
  ShieldCheck, 
  Clock, 
  Brain, 
  Cpu, 
  BookOpen, 
  ExternalLink,
  Search,
  Star
} from "lucide-react";

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ToolsBubbleSection from './ToolsBubbleSection';
import CompanyIntro from './CompanyIntro';
import TutorialShowcase from './TutorialShowcase';
import FaqSection from './FaqSection';
import GetStarted from './pages/FreeTrial';
import Pricing from './pages/Pricing';
import DownloadPage from './pages/Download';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/AdminLayout';
import AdminSummary from './pages/AdminSummary';
import AdminDownloads from './pages/AdminDownloads';
import AdminFreeTrials from './pages/AdminFreeTrials';
import AdminPurchased from './pages/AdminPurchased';
import Support from './pages/Support';
import AdminSupportRequests from './pages/AdminSupportRequests';

export const Navbar = () => (
  <nav className="site-nav absolute top-0 z-50 w-full px-6 pt-6 sm:px-10 lg:px-[4%]">
    <div className="site-nav__inner mx-auto flex max-w-[1760px] items-center justify-between gap-5 px-1 py-2">
      <a href="https://bimeasy.in" className="flex shrink-0 items-center gap-2.5" aria-label="BIMEasy home">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="BIMEasy Logo" className="site-nav__brandmark h-12 w-12 object-contain" />
        <span className="text-[25px] font-bold tracking-tight text-[#1c4268] font-headline">BIMEasy</span>
      </a>
      <div className="hidden flex-1 items-center gap-10 pl-12 md:flex">
        <a href="https://bimeasy.in/#features" className="site-nav__link">Features</a>
        <a href="https://bimeasy.in/#tutorial" className="site-nav__link">Tutorial</a>
        <Link to="/download" className="site-nav__link">Download</Link>
        <Link to="/pricing" className="site-nav__link">Pricing</Link>
      </div>
      <Link to="/download" className="site-nav__cta">Get Started</Link>
    </div>
  </nav>
);

const Hero = () => {
  const navigate = useNavigate();
  return (
  <section className="hero-stage relative min-h-[850px] overflow-hidden px-6 pb-16 pt-[168px] sm:px-10 lg:px-[4%]">
    <div className="hero-stage__glow hero-stage__glow--one" />
    <div className="hero-stage__glow hero-stage__glow--two" />
    <div className="hero-layout relative z-10 mx-auto grid w-full max-w-[1760px] items-start gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1.12fr)_minmax(420px,1fr)]">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-copy z-10 max-w-[610px]"
      >
        <div className="hero-kicker mb-6 inline-flex items-center gap-2.5 rounded-lg px-3 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500"></span>
          <span className="text-[14px] font-bold uppercase tracking-[.11em]">BIM Automation Platform</span>
        </div>
        <h1 className="hero-title mb-12 font-headline text-6xl font-bold leading-[1.04] tracking-[-.055em] sm:text-7xl xl:text-[80px]">
          <span>BIM</span>
          <span>WORKFLOWS</span>
          <span className="hero-title-light">POWERED BY</span>
          <span className="hero-title-light">SMART <strong>AUTOMATION</strong></span>
        </h1>
        <p className="hero-description mb-8 max-w-[500px] border-l-4 pl-5 text-base leading-relaxed sm:text-lg">
          A practical Revit productivity platform that automates repetitive modeling, documentation, and quality checks so your team can focus on better design.
        </p>
        <div className="hero-actions flex flex-wrap gap-3">
          <button onClick={() => navigate('/download')} className="hero-button-primary group flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5">
            Start Your Free Trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={() => navigate('/get-started')} className="hero-button-secondary rounded-lg px-5 py-3 text-sm font-bold transition-colors">
            Buy Now
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-visual relative mx-auto flex w-full max-w-[570px] items-center justify-center"
      >
        <div className="hero-building-orbit absolute left-1/2 top-[44%] aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="hero-visual__halo absolute inset-8 rounded-full blur-3xl"></div>
        <div className="hero-visual__frame relative w-full overflow-hidden">
          <img 
            className="hero-building relative z-[1] block w-full object-contain" 
            src={`${import.meta.env.BASE_URL}bim2.png`}
            alt="Glass office building representing a BIM model"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="hero-time-saved absolute -bottom-2 right-0 z-10 flex h-[132px] w-[132px] flex-col items-center justify-center rounded-full">
          <span className="text-3xl font-bold">85%</span><span className="text-[9px]">Time Saved</span>
        </div>
      </motion.div>

      <motion.div className="hero-dashboard relative z-10 grid gap-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .25 }}>
        <div className="hero-dashboard-card hero-model-card rounded-[24px] p-6 sm:p-7">
          <div className="hero-card-label mb-3 flex items-center justify-between"><span>Modeling Tools</span><span className="hero-card-arrow">↗</span></div>
          <div className="hero-star-wrap"><Star className="hero-star" fill="currentColor" strokeWidth={0} /></div>
          <div className="hero-model-title">Automate the repetitive</div>
          <p className="hero-card-muted mb-4 text-sm">Fast, consistent Revit workflows</p>
          <div className="hero-bars" aria-hidden="true">{[36, 52, 42, 62, 76, 54, 70, 48, 38].map((height, index) => <span key={index} style={{ height: `${height}px` }} />)}</div>
        </div>
        <div className="hero-dashboard-card hero-team-card rounded-[24px] p-6 sm:p-7">
          <div className="hero-card-label mb-4 flex items-center justify-between"><span>Team Productivity</span><span className="hero-card-arrow">↗</span></div>
          <a href="#toolkit" className="hero-explore">Explore tools <span>›</span></a>
          <div className="hero-productivity">
            <span className="hero-productivity__bubble hero-productivity__bubble--nine">9%</span>
            <span className="hero-productivity__bubble hero-productivity__bubble--twentyone">21%</span>
            <span className="hero-productivity__bubble hero-productivity__bubble--main">85%</span>
          </div>
          <div className="hero-metrics"><div><strong>40+</strong><span>Hours saved</span></div><div><strong>1 click</strong><span>Batch export</span></div><div><strong>100%</strong><span>Revit native</span></div></div>
        </div>
        <div className="hero-dashboard-card hero-status-card rounded-[24px] p-6 sm:p-7">
          <div className="hero-card-label mb-3 flex items-center justify-between"><span>Workflow Status</span><span className="hero-card-arrow">↗</span></div>
          <div className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-sky-400" /><span>All systems ready</span></div>
          <p className="hero-card-muted mt-1 pl-4 text-xs">Built for your Revit workflow</p>
        </div>
      </motion.div>
    </div>
    <a href="#features" className="hero-scroll absolute bottom-5 left-10 z-10 hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[.15em] sm:flex">Scroll to explore <span aria-hidden="true">↓</span></a>
  </section>
  );
};

const Features = () => (
  <section id="features" className="py-24 bg-surface-container-low px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">Precision-Engineered Tools</h2>
        <p className="text-on-surface-variant">Modern BIM managers demand modern solutions. Our toolset integrates seamlessly into your Revit workspace.</p>
      </div>
      
      <div className="grid md:grid-cols-12 gap-6">
        {/* Modeling Automation */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest rounded-[32px] p-8 border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all h-[400px]"
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-headline font-bold mb-2">Modeling Automation</h3>
            <p className="text-on-surface-variant max-w-md">Intelligent auto-joining and wall splitting that respects your architectural constraints.</p>
            <div className="mt-auto flex gap-2">
              <span className="px-3 py-1 rounded-full bg-secondary-container text-primary text-xs font-bold">Auto-Join</span>
              <span className="px-3 py-1 rounded-full bg-secondary-container text-primary text-xs font-bold">Smart Split</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full">
            <img 
              className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-opacity" 
              src="https://picsum.photos/seed/corner/600/800" 
              alt="Architectural corner detail"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Documentation Pro */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-4 bg-primary text-white rounded-[32px] p-8 flex flex-col shadow-lg"
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
            <BookOpen className="text-tertiary-fixed w-6 h-6" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-2">Documentation Pro</h3>
          <p className="text-primary-fixed-dim text-sm leading-relaxed mb-8">Effortlessly number thousands of elements across views with smart algorithms.</p>
          <div className="bg-primary-container/30 rounded-2xl p-4 font-mono text-[10px] space-y-3 border border-white/10">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center">
                <span>Element_Door_00{i}</span>
                <Check className="text-tertiary-fixed w-3 h-3" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* One-Click Export */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-5 bg-surface-container-highest rounded-[32px] p-8 flex flex-col h-[360px] relative overflow-hidden group"
        >
          <div className="w-12 h-12 bg-on-surface/5 rounded-xl flex items-center justify-center mb-6">
            <ExternalLink className="text-on-surface w-6 h-6" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-2">One-Click Export</h3>
          <p className="text-on-surface-variant">Batch export PDFs, DWGs, and Navisworks files while you grab a coffee.</p>
          <div className="mt-auto flex justify-center pb-8">
            <div className="flex -space-x-4">
              {['PDF', 'DWG', 'NWC'].map((ext, i) => (
                <motion.div 
                  key={ext}
                  whileHover={{ y: -10 }}
                  className={`w-16 h-20 bg-white shadow-lg rounded-lg flex items-center justify-center transform ${i === 0 ? '-rotate-12' : i === 2 ? 'rotate-12' : 'z-10'}`}
                >
                  <span className={`text-[10px] font-bold ${i === 0 ? 'text-red-600' : i === 1 ? 'text-blue-600' : 'text-green-600'}`}>{ext}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* QA/QC Auditor */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-7 bg-white rounded-[32px] p-8 border border-outline-variant/10 shadow-sm flex flex-col lg:flex-row gap-8 items-center overflow-hidden"
        >
          <div className="lg:w-1/2">
            <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center mb-6">
              <Search className="text-error w-6 h-6" />
            </div>
            <h3 className="text-2xl font-headline font-bold mb-2">QA/QC Auditor</h3>
            <p className="text-on-surface-variant">A digital audit lens that scans floor plans for non-compliant naming, clashes, and missing parameters.</p>
          </div>
          <div className="lg:w-1/2 relative bg-surface-container-low rounded-2xl p-8 h-full flex items-center justify-center overflow-hidden w-full">
            <div className="absolute inset-0 opacity-10 architectural-grid"></div>
            <div className="relative w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-1 h-32 bg-primary/20"
              ></motion.div>
              <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">!</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Tutorial = () => <TutorialShowcase />;

const CTA = () => {
  const navigate = useNavigate();
  return (
  <section className="cta-section">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="cta-banner relative w-full overflow-hidden px-8 py-10 text-left shadow-xl md:px-14 md:py-14"
    >
      <div className="cta-ring-field" aria-hidden="true" />
      <div className="cta-content relative z-10">
        <h2 className="mb-4 font-headline text-3xl font-black text-white sm:text-4xl">Ready to automate your workflow?</h2>
        <p className="mb-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Join 5,000+ BIM professionals who use BIMEasy to master their Revit environment.
        </p>
        <div className="flex flex-wrap justify-start gap-3">
          <button onClick={() => navigate('/download')} className="cta-button cta-button-primary">
            Start Your Free Trial
          </button>
          <button onClick={() => navigate('/get-started')} className="cta-button cta-button-secondary">
            <Video className="h-4 w-4" />
            Buy Now
          </button>
        </div>

      </div>
    </motion.div>
  </section>
  );
};

export const Footer = () => (
  <footer className="border-t border-outline-variant/20 bg-white px-6 py-16">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="BIMEasy Logo" className="h-10 w-10 object-contain" />
          <span className="font-headline text-xl font-black tracking-tight text-primary">BIMEasy</span>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
          Revit tools for faster modeling, clearer documentation, and more dependable quality checks.
        </p>
        <p className="max-w-sm text-xs leading-relaxed text-on-surface-variant/75">
          Built to help BIM professionals spend less time on repetitive tasks and more time on better design.
        </p>
      </div>

      <div className="space-y-4">
        <h5 className="text-xs font-bold uppercase tracking-widest text-primary">Product</h5>
        <ul className="space-y-3 text-sm">
          <li><a href="#toolkit" className="text-on-surface-variant transition-colors hover:text-primary">Revit toolkit</a></li>
          <li><Link to="/download" className="text-on-surface-variant transition-colors hover:text-primary">Download</Link></li>
          <li><Link to="/pricing" className="text-on-surface-variant transition-colors hover:text-primary">Pricing</Link></li>
          <li><Link to="/download" className="text-on-surface-variant transition-colors hover:text-primary">Start a free trial</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h5 className="text-xs font-bold uppercase tracking-widest text-primary">Learn</h5>
        <ul className="space-y-3 text-sm">
          <li><a href="#tutorial" className="text-on-surface-variant transition-colors hover:text-primary">Tutorials</a></li>
          <li><a href="#faq" className="text-on-surface-variant transition-colors hover:text-primary">FAQs</a></li>
          <li><Link to="/support" className="text-on-surface-variant transition-colors hover:text-primary">Support</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h5 className="text-xs font-bold uppercase tracking-widest text-primary">Company</h5>
        <ul className="space-y-3 text-sm">
          <li><a href="#company-intro" className="text-on-surface-variant transition-colors hover:text-primary">About BIMEasy</a></li>
          <li><Link to="/privacy-policy" className="text-on-surface-variant transition-colors hover:text-primary">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service" className="text-on-surface-variant transition-colors hover:text-primary">Terms of Service</Link></li>
        </ul>
      </div>
    </div>
    <div className="mx-auto mt-12 max-w-7xl border-t border-outline-variant/20 pt-6">
      <p className="text-xs text-on-surface-variant/70">&copy; 2026 BIMEasy. All rights reserved.</p>
    </div>
  </footer>
);

const SyncHub = () => (
  <motion.div 
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    className="fixed bottom-8 left-1/2 -translate-x-1/2 w-max max-w-[90vw] z-50"
  >
    <div className="glass-panel rounded-full shadow-2xl px-6 py-3 flex items-center gap-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-surface-container-low">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-full bg-tertiary-fixed w-1/3"
        ></motion.div>
      </div>
      <div className="flex items-center gap-3">
        <Zap className="text-tertiary-fixed w-4 h-4 fill-tertiary-fixed animate-pulse" />
        <span className="text-xs font-bold tracking-tight text-on-surface">BIMEasy Sync Active</span>
      </div>
      <div className="h-4 w-px bg-outline-variant/30"></div>
      <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
        <span>V4.2.0</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
          Cloud Linked
        </span>
      </div>
    </div>
  </motion.div>
);

function HomePage() {
  return (
    <div className="home-page intro-complete min-h-screen selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <CompanyIntro />
        <ToolsBubbleSection />
        <Tutorial />
        <FaqSection />
        <CTA />
      </main>
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/support" element={<Support />} />
        <Route path="/super-admin" element={<AdminLogin />} />
        <Route path="/super-admin" element={<AdminLayout />}>
          <Route path="summary" element={<AdminSummary />} />
          <Route path="downloads" element={<AdminDownloads />} />
          <Route path="free-trials" element={<AdminFreeTrials />} />
          <Route path="purchased" element={<AdminPurchased />} />
          <Route path="support-requests" element={<AdminSupportRequests />} />
        </Route>
      </Routes>
    </Router>
  );
}

