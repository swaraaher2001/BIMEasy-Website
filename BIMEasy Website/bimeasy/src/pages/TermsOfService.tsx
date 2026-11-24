import { Navbar, Footer } from '../App';
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  Ban, 
  Copyright, 
  CreditCard, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  PowerOff, 
  MapPin, 
  RefreshCw, 
  Mail 
} from "lucide-react";

export default function TermsOfService() {
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
              <Link to="/privacy-policy" className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-widest hover:bg-surface-container-high transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest hover:opacity-80 transition-opacity">
                Terms of Service
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-primary mb-4">
              Terms of Service & EULA
            </h1>
            <p className="text-on-surface-variant text-lg">
              Effective Date: June 21, 2026
            </p>
          </motion.div>

          <div className="bg-white rounded-[32px] p-8 md:p-16 shadow-xl border border-outline-variant/20 space-y-20">
            
            {/* Introduction */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="text-on-surface-variant leading-relaxed">
                Please read these Terms of Service and End-User License Agreement ("Agreement") carefully before downloading, installing, or using the BIMEasy Revit plugin (the "Software").
                <br /><br />
                By downloading, installing, or using the Software, or by purchasing a subscription or registering for a free trial via our website, you ("User" or "You") are agreeing to be bound by the terms and conditions of this Agreement. If you do not agree to the terms of this Agreement, do not download, install, or use the Software.
              </p>
            </motion.section>

            {/* 1 License Grant */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">01</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">License Grant</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Subject to your compliance with the terms of this Agreement and payment of any applicable fees, BIMEasy ("Licensor", "We", "Us") grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Software strictly in accordance with the terms of this Agreement and your specific subscription or entitlement tier.
              </p>
            </motion.section>

            {/* 2 License Restrictions */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">02</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">License Restrictions</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                You agree not to, and you will not permit others to:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-error">
                    <Ban size={20} />
                    <h3 className="font-bold">Reverse Engineer</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the Software.</p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-error">
                    <Ban size={20} />
                    <h3 className="font-bold">Modify</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Make any modification, adaptation, improvement, enhancement, translation, or derivative work from the Software.</p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-error">
                    <Ban size={20} />
                    <h3 className="font-bold">Distribute</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose, or otherwise commercially exploit the Software.</p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-3 text-error">
                    <Ban size={20} />
                    <h3 className="font-bold">Circumvent</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Bypass, defeat, or tamper with any protections, including Autodesk Entitlement API checks or licensing mechanisms.</p>
                </div>
              </div>
            </motion.section>

            {/* 3 & 4 Intellectual Property & Subscription */}
            <div className="grid md:grid-cols-2 gap-12">
              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-6">
                  <span className="text-3xl font-headline font-light text-primary/40">03</span>
                  <h2 className="text-xl font-headline font-bold text-on-surface">Intellectual Property Rights</h2>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  The Software and all worldwide copyrights, trade secrets, and other intellectual property rights therein are the exclusive property of BIMEasy and its licensors. BIMEasy reserves all rights in and to the Software not expressly granted to you. You acknowledge that no title to the intellectual property in the Software is transferred to you.
                </p>
              </motion.section>

              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-6">
                  <span className="text-3xl font-headline font-light text-primary/40">04</span>
                  <h2 className="text-xl font-headline font-bold text-on-surface">Subscription and Payments</h2>
                </div>
                <ul className="text-sm text-on-surface-variant leading-relaxed space-y-3">
                  <li><strong>Billing:</strong> You agree to pay all fees associated with your plan. Payments are processed securely via our third-party gateway (Razorpay).</li>
                  <li><strong>Renewals:</strong> Subscriptions may automatically renew unless cancelled before the renewal date.</li>
                  <li><strong>Refunds:</strong> All sales are final, and we do not offer refunds once the software license has been activated, except where required by law.</li>
                </ul>
              </motion.section>
            </div>

            {/* 6 & 7 Disclaimer and Limitation of Liability */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="bg-error/10 border-l-4 border-error p-8 rounded-r-[24px]">
                <div className="flex gap-4 items-baseline mb-6">
                  <span className="text-3xl font-headline font-light text-error/40">06</span>
                  <h2 className="text-2xl font-headline font-bold text-error">Disclaimer of Warranties</h2>
                </div>
                <p className="text-on-surface-variant font-bold leading-relaxed mb-4">
                  THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND.
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BIMEASY HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH RESPECT TO THE SOFTWARE, EITHER EXPRESS, IMPLIED, OR STATUTORY. WE DO NOT WARRANT THAT THE FUNCTIONS CONTAINED IN THE SOFTWARE WILL MEET YOUR REQUIREMENTS, THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
                </p>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="bg-surface-container-low p-8 rounded-[24px]">
                <div className="flex gap-4 items-baseline mb-6">
                  <span className="text-3xl font-headline font-light text-primary/40">07</span>
                  <h2 className="text-2xl font-headline font-bold text-on-surface">Limitation of Liability</h2>
                </div>
                <p className="text-on-surface-variant font-bold leading-relaxed mb-4">
                  IN NO EVENT SHALL BIMEASY OR ITS DEVELOPERS BE LIABLE FOR ANY INCIDENTAL, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER.
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  Because BIMEasy operates within the Architecture, Engineering, and Construction (AEC) environment, you acknowledge that you are solely responsible for the accuracy, quality, and integrity of your Revit models, exports, and construction documentation. Under no circumstances shall BIMEasy be held liable for:
                </p>
                <ul className="list-disc list-inside text-sm text-on-surface-variant leading-relaxed space-y-2 mb-4 pl-2">
                  <li>Loss of profits, loss of data, business interruption, or project delays.</li>
                  <li>Design errors, construction errors, or any damage arising from the use of the Software's outputs.</li>
                  <li>Any issues caused by Revit version updates or incompatibilities.</li>
                </ul>
                <p className="text-sm text-on-surface-variant italic leading-relaxed">
                  In no event shall BIMEasy's total liability to you for all damages exceed the amount actually paid by you for the Software during the twelve (12) months preceding the claim.
                </p>
              </div>
            </motion.section>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 8 Termination */}
              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-4">
                  <span className="text-2xl font-headline font-light text-primary/40">08</span>
                  <h2 className="text-lg font-headline font-bold text-on-surface">Termination</h2>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  This Agreement is effective until terminated by you or BIMEasy. Your rights will terminate automatically without notice if you fail to comply with any terms. Upon termination, you shall cease all use of the Software and delete all copies.
                </p>
              </motion.section>

              {/* 9 Governing Law */}
              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-4">
                  <span className="text-2xl font-headline font-light text-primary/40">09</span>
                  <h2 className="text-lg font-headline font-bold text-on-surface">Governing Law</h2>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  This Agreement shall be governed by and construed in accordance with the laws of India, excluding its conflicts of law rules. Any legal action will be brought exclusively in the courts located in India.
                </p>
              </motion.section>

              {/* 10 Changes to Agreement */}
              <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex gap-4 items-baseline mb-4">
                  <span className="text-2xl font-headline font-light text-primary/40">10</span>
                  <h2 className="text-lg font-headline font-bold text-on-surface">Changes to Policy</h2>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  BIMEasy reserves the right to modify or replace this Agreement at any time. By continuing to access or use our Software after any revisions become effective, you agree to be bound by the revised terms.
                </p>
              </motion.section>
            </div>

            {/* 11 Contact Us */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex gap-4 items-baseline mb-6">
                <span className="text-3xl font-headline font-light text-primary/40">11</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Contact Us</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                If you have any questions about this Agreement, please contact us at:
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:info@bimeasy.in" className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container text-on-surface px-6 py-4 rounded-xl font-bold transition-all border border-outline-variant/30">
                  <Mail size={20} className="text-primary" />
                  info@bimeasy.in
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
