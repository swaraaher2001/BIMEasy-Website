/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  CheckCircle2, 
  Check, 
  ChevronDown, 
  Compass, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  FileText,
  Clock,
  Users
} from "lucide-react";
import { useState } from "react";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-4 md:px-8 max-w-full mx-auto">
    <div className="flex items-center gap-8">
      <div className="text-xl font-black tracking-tight text-primary flex items-center gap-2">
        <Compass className="w-6 h-6 text-primary" />
        <span>BIMEasy</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a className="text-on-surface-variant hover:text-primary transition-all duration-200 font-medium" href="#">Features</a>
        <a className="text-on-surface-variant hover:text-primary transition-all duration-200 font-medium" href="#">Automation</a>
        <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#">Pricing</a>
        <a className="text-on-surface-variant hover:text-primary transition-all duration-200 font-medium" href="#">Resources</a>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-on-surface-variant font-medium hover:text-primary transition-all">Login</button>
      <button className="bg-primary text-on-primary px-5 py-2 rounded-lg font-bold text-sm transition-all duration-200 hover:opacity-80 active:scale-95 shadow-sm">Free Trial</button>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative pt-32 pb-20 px-8 blueprint-bg overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto text-center relative z-10"
    >
      <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Architectural Efficiency</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        One Complete Suite for BIM Professionals
      </h1>
      <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
        Everything you need to automate your Revit workflows in a single, powerful plan designed for architects and engineers.
      </p>
    </motion.div>
    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
      <img 
        className="w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw7G2qZh3_0el3WTrm7ZhJTFVXNifRbG7qDWDcHOb4TaW4gQgGh9D0viJa8BrBmJ6uuj4lk8we8utX5gmqNgZF4PSH_a2rGt2fW1jbPtO_05J94VmE8q5pOzXx-d3zlZSaLN6vFeh6yaQaK7p-Z1uk0RzQ7qWG3T4BQMDY8b2j8SaHpg7M_A_LtkeqhGSmKMaZ3JmmEMNHcUzR11P2i6VE8n2YL1WSBOIiWkN_UiQFgRn3GqtapKrLV7QRQE_8w8vLWGr9WZganA" 
        alt="Technical architectural blueprint"
        referrerPolicy="no-referrer"
      />
    </div>
  </header>
);

const PricingCard = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="relative bg-surface-container-lowest rounded-xl p-10 flex flex-col shadow-xl border-2 border-primary ring-4 ring-primary/5 max-w-lg w-full mx-auto"
  >
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
      BIMEasy tools
    </div>
    <div className="mb-8 mt-4 text-center">
      <div className="flex items-baseline gap-1 justify-center">
        <span className="text-5xl font-extrabold text-primary">$49</span>
        <span className="text-on-surface-variant text-base font-medium">/mo</span>
      </div>
      <p className="text-on-surface-variant mt-6 leading-relaxed font-medium">
        The comprehensive automation suite for power users who demand advanced control over their architectural projects.
      </p>
    </div>
    <ul className="space-y-4 mb-10 flex-grow">
      {[
        "Advanced modeling automation",
        "Comprehensive QA/QC auditing",
        "Advanced documentation management",
        "Batch exports & scheduling",
        "Custom UI layouts & scripts",
        "Priority email & community support"
      ].map((feature, i) => (
        <motion.li 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="flex items-start gap-3 text-sm font-semibold"
        >
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
    <button className="w-full py-4 px-6 rounded-lg bg-primary text-on-primary text-lg font-bold hover:opacity-90 transition-all shadow-md active:scale-[0.98]">
      Try Now
    </button>
    <p className="text-xs text-center text-on-surface-variant mt-4">Free 14-day trial. No credit card required.</p>
  </motion.div>
);

const FeaturesTable = () => (
  <section className="mt-24 max-w-7xl mx-auto px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-on-surface">Included Features</h2>
      <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
    </div>
    <div className="max-w-4xl mx-auto overflow-hidden rounded-xl shadow-sm bg-surface-container-lowest border border-outline-variant/10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low">
            <th className="p-6 text-sm font-bold uppercase tracking-wider text-on-surface-variant">Capability</th>
            <th className="p-6 text-sm font-bold uppercase tracking-wider text-primary text-center">BIMEasy tools Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {[
            { name: "Modeling Automation", status: "Advanced Suite Included" },
            { name: "QA/QC Auditor", status: "check" },
            { name: "Documentation Pro", status: "check" },
            { name: "One-Click Export", status: "badge", badge: "Full Batch Support" },
            { name: "Custom Scripting & UI", status: "check" }
          ].map((row, i) => (
            <tr key={i} className="hover:bg-surface-container-low transition-colors">
              <td className="p-6 font-medium text-on-surface">{row.name}</td>
              <td className="p-6 text-center">
                {row.status === "check" ? (
                  <Check className="w-6 h-6 text-primary mx-auto" />
                ) : row.status === "badge" ? (
                  <span className="text-xs px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-bold">
                    {row.badge}
                  </span>
                ) : (
                  <span className="font-bold text-primary">{row.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="bg-surface-container-low rounded-xl border border-transparent hover:border-primary/10 transition-all overflow-hidden">
    <button 
      onClick={onClick}
      className="w-full flex justify-between items-center p-6 cursor-pointer text-left"
    >
      <span className="font-bold text-on-surface">{question}</span>
      <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      question: "How does the billing work?",
      answer: "BIMEasy tools is a monthly subscription. You can cancel at any time through your dashboard. We also offer annual billing with a 20% discount if you choose to switch later."
    },
    {
      question: "Is there a free trial?",
      answer: "Absolutely. We offer a 14-day full-featured trial. No credit card is required to start your architectural journey with BIMEasy."
    },
    {
      question: "What versions of Revit are supported?",
      answer: "BIMEasy currently supports Autodesk Revit 2021 through the latest 2025 release. We maintain backward compatibility for up to 4 major versions."
    },
    {
      question: "Do you offer team or educational discounts?",
      answer: "Yes, we support both large teams and the next generation of architects. For teams larger than 10 or verified educational use, please contact our support for specialized pricing."
    }
  ];

  return (
    <section className="mt-24 max-w-4xl mx-auto px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-on-surface">Frequently Asked Questions</h2>
        <p className="text-on-surface-variant mt-2">Everything you need to know about the BIMEasy tools license.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i}>
            <FAQItem 
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const SyncStateHub = () => (
  <motion.div 
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/15 rounded-full py-3 px-6 flex items-center justify-between shadow-2xl z-[100] overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-[2px] bg-tertiary-fixed/30">
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "66%" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="h-full bg-tertiary" 
      />
    </div>
    <div className="flex items-center gap-3">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
      </div>
      <span className="text-xs font-bold tracking-tight text-on-surface">Live Sync: Ready</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-xs font-medium text-on-surface-variant hidden sm:inline">Revit 2024 Connected</span>
      <button className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95">
        Launch Plugin
      </button>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="mt-32 w-full border-t border-outline-variant/15 bg-surface-container-lowest py-10 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
    <div className="flex flex-col gap-4 items-center md:items-start">
      <div className="text-lg font-bold text-on-surface flex items-center gap-2">
        <img 
          className="h-8 w-auto" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwvz2Fb7HWR7qtkWSQEzaUVXTdMhiJx6ebIPxL4A2XEIpQHzj8x4JIKJRBcWhnPTPLibCl79PJrGwaS2v5u7RPO_lw40wiq2vy_jpGPConKsD4zUPV3diiaqQMPQx6BbLXarADwQPCB-HY3WlSYBgK2p2ssr6R24aGx_1kzxheZEKXGRLjUiiioOuVDdydrIU1884mRQJApkHDRKY72tQ4ci4jEgwOlkHDweyH83wfR_3C69q9wNG3rmOKM6szrFJIvXK34BYmQw" 
          alt="BIMEasy logo"
          referrerPolicy="no-referrer"
        />
        <span>BIMEasy</span>
      </div>
      <p className="text-xs text-on-surface-variant max-w-xs font-medium text-center md:text-left">
        © 2024 BIMEasy. Precision in Architectural Automation.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-8">
      {["Documentation", "Support", "Privacy Policy", "Terms of Service", "API Docs"].map((link) => (
        <a key={link} className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">
          {link}
        </a>
      ))}
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <main className="pb-24">
        <PricingCard />
        <FeaturesTable />
        <FAQ />
      </main>
      <SyncStateHub />
      <Footer />
    </div>
  );
}
