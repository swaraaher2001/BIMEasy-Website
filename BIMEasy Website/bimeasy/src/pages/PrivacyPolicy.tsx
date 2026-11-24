import { Navbar, Footer } from '../App';
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  CreditCard, 
  Activity, 
  Database, 
  CheckCircle2, 
  Cloud, 
  Briefcase, 
  Scale, 
  Lock, 
  Mail, 
  LifeBuoy 
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen selection:bg-primary/10 selection:text-primary bg-surface flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex gap-3 mb-6">
              <Link to="/privacy-policy" className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest hover:opacity-80 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-widest hover:bg-surface-container-high transition-colors">
                Terms of Service
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-primary mb-4">
              Privacy Policy for BIMEasy
            </h1>
            <p className="text-on-surface-variant text-lg">
              Effective Date: June 21, 2026
            </p>
          </motion.div>

          <div className="bg-white rounded-[32px] p-8 md:p-16 shadow-xl border border-outline-variant/20 space-y-20">
            
            {/* 01 Introduction */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">01</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Introduction</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Welcome to BIMEasy. We are committed to protecting your privacy and ensuring your architectural data remains secure. Our practices are strictly aligned with <strong>Autodesk compliance standards</strong>, ensuring that your workflow within Revit and our cloud services is transparent and protected.
              </p>
            </motion.section>

            {/* 02 Information We Collect */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">02</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Information We Collect</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <Briefcase size={20} />
                    <h3 className="font-bold">Autodesk User Data</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">We collect Autodesk IDs and profile metadata to facilitate seamless integration with your existing Revit environment.</p>
                </div>
                
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <CreditCard size={20} />
                    <h3 className="font-bold">Registration & Payment</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Standard billing information and contact details required for account management and transaction processing.</p>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <Activity size={20} />
                    <h3 className="font-bold">Usage & Telemetry</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Diagnostic data related to tool performance and feature engagement to improve our architectural pulse algorithms.</p>
                </div>

                <div className="bg-[#e8f3ee] p-6 rounded-2xl border-l-4 border-[#2d8a5c]">
                  <div className="flex items-center gap-3 mb-3 text-[#2d8a5c]">
                    <ShieldCheck size={20} />
                    <h3 className="font-bold">Your Proprietary Data</h3>
                  </div>
                  <p className="text-sm text-[#2d8a5c]/80 leading-relaxed font-medium">Critical Note: BIMEasy does NOT collect, store, or transmit your Revit model geometry or proprietary architectural design data.</p>
                </div>
              </div>
            </motion.section>

            {/* 03 How We Use Your Information */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">03</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">How We Use Your Information</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Verify software licenses and maintain security credentials.",
                  "Manage user accounts and personalized technical preferences.",
                  "Process subscription transactions and billing communications.",
                  "Provide high-priority technical support and architectural consulting.",
                  "Send essential updates and analyze macro-usage trends for R&D."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-on-surface-variant">
                    <CheckCircle2 className="text-primary shrink-0 w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* 04 How We Share Your Information */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">04</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">How We Share Your Information</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                We do not sell your personal information. We share data only in the following contexts:
              </p>
              <div className="space-y-8 pl-4 border-l-2 border-outline-variant/20">
                <div>
                  <div className="flex items-center gap-3 mb-2 text-on-surface">
                    <Cloud size={20} className="text-primary" />
                    <h3 className="font-bold">Service Providers</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Trusted third-party vendors who assist in operating our platform and processing payments.</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 text-on-surface">
                    <Database size={20} className="text-primary" />
                    <h3 className="font-bold">Autodesk Ecosystem</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Sharing necessary authentication tokens to maintain plugin functionality and compliance.</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 text-on-surface">
                    <Scale size={20} className="text-primary" />
                    <h3 className="font-bold">Compliance with Laws</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">When legally mandated by law enforcement or regulatory bodies.</p>
                </div>
              </div>
            </motion.section>

            {/* 05 Data Security */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">05</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Data Security</h2>
              </div>
              <div className="bg-primary text-white p-8 rounded-[24px] relative overflow-hidden shadow-xl">
                <Lock className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10" strokeWidth={1} />
                <p className="relative z-10 text-lg font-medium leading-relaxed mb-6 max-w-2xl">
                  Our infrastructure is powered by <strong>Google Firebase</strong>, utilizing industry-standard measures including AES-256 encryption at rest and TLS/SSL for data in transit.
                </p>
                <div className="relative z-10 flex items-center gap-2 text-primary-fixed-dim text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-full">
                  <ShieldCheck size={16} />
                  ISO 27001 Compliant Data Centers
                </div>
              </div>
            </motion.section>

            <div className="grid md:grid-cols-2 gap-12">
              {/* 06 Your Privacy Rights */}
              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-6">
                  <span className="text-3xl font-headline font-light text-primary/40">06</span>
                  <h2 className="text-xl font-headline font-bold text-on-surface">Your Privacy Rights</h2>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  You maintain the right to Access your data, <strong>Rectify</strong> inaccuracies, and request <strong>Deletion</strong> of your personal records from our active databases.
                </p>
              </motion.section>

              {/* 07 Changes to Policy */}
              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-6">
                  <span className="text-3xl font-headline font-light text-primary/40">07</span>
                  <h2 className="text-xl font-headline font-bold text-on-surface">Changes to Policy</h2>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  We may update this policy periodically to reflect technological shifts. We will notify users of material changes via the BIMEasy dashboard.
                </p>
              </motion.section>
            </div>

            {/* 08 Contact Us */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">08</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Contact Us</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Have questions about your architectural data security? Our precision support team is ready to help.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:privacy@bimeasytech.com" className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container text-on-surface px-6 py-4 rounded-xl font-bold transition-all border border-outline-variant/30">
                  <Mail size={20} className="text-primary" />
                  privacy@bimeasy.in
                </a>
                <a href="#" className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container text-on-surface px-6 py-4 rounded-xl font-bold transition-all border border-outline-variant/30">
                  <LifeBuoy size={20} className="text-primary" />
                  Support Portal
                </a>
              </div>
            </motion.section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
