import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Code2, ChevronDown, ChevronUp, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Navbar, Footer } from '../App';

const faqs = [
  {
    question: "Can I use BIMEasy with older versions of Revit?",
    answer: "BIMEasy supports Revit versions 2021 through 2025. For legacy support (2018-2020), please contact our Enterprise support team for specific compatibility patches."
  },
  {
    question: "How is my architectural data secured?",
    answer: "BIMEasy does not transmit or store your proprietary 3D model geometry. All account and license data is secured using AES-256 encryption via Google Firebase on ISO 27001 compliant servers."
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer: "If you cancel, you will retain access until the end of your billing cycle. Your account metadata is retained for 12 months allowing you to easily resubscribe. You can request immediate data deletion at any time."
  }
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("General Support");
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [explanation, setExplanation] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = (cat: string) => {
    setCategory(cat);
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await fetch("https://us-central1-bimeasy-website.cloudfunctions.net/saveSupportRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, explanation, category })
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setExplanation("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8eef3] flex flex-col selection:bg-primary/20">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-4">
              Contact Us
            </h1>
            <p className="text-on-surface-variant text-lg">
              Our specialist team is standing by to help with your project.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-32">
            
            {/* Email Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 flex flex-col h-full shadow-sm border border-outline-variant/10"
            >
              <Mail className="w-8 h-8 text-[#00478D] mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold font-headline text-center mb-4 text-[#1a1a1a]">Email Support</h3>
              <p className="text-center text-sm text-on-surface-variant mb-8 flex-grow leading-relaxed px-4">
                Ask questions, make suggestions, and report bugs related to BIMEasy apps for Revit
              </p>
              <button 
                onClick={() => openModal("Email Support")}
                className="w-full py-3 px-4 border border-[#00478D] text-[#00478D] font-bold text-sm rounded-md hover:bg-[#00478D]/5 transition-colors"
              >
                get in touch
              </button>
            </motion.div>

            {/* Sales Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 flex flex-col h-full shadow-sm border-2 border-[#00478D]"
            >
              <MessageSquare className="w-8 h-8 text-[#00478D] mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold font-headline text-center mb-4 text-[#1a1a1a]">Sales Support</h3>
              <p className="text-center text-sm text-on-surface-variant mb-8 flex-grow leading-relaxed px-2">
                Connect with our team to request quotes and buy licenses for BIMEasy apps and specific industry-specific operations!
              </p>
              <button 
                onClick={() => openModal("Sales Support")}
                className="w-full py-3 px-4 bg-[#00478D] text-white font-bold text-sm rounded-md hover:bg-[#003870] transition-colors"
              >
                get in touch
              </button>
            </motion.div>

            {/* Software Development */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-8 flex flex-col h-full shadow-sm border border-outline-variant/10"
            >
              <Code2 className="w-8 h-8 text-[#00478D] mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold font-headline text-center mb-4 text-[#1a1a1a]">Software Development</h3>
              <p className="text-center text-sm text-on-surface-variant mb-8 flex-grow leading-relaxed px-2">
                Automate and streamline your processes. From daily tasks to complex industry-specific operations! with Custom Software Development
              </p>
              <button 
                onClick={() => openModal("Software Development")}
                className="w-full py-3 px-4 border border-[#00478D] text-[#00478D] font-bold text-sm rounded-md hover:bg-[#00478D]/5 transition-colors"
              >
                get in touch
              </button>
            </motion.div>

          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <div className="bg-[#f9fafb] py-24 px-6 border-t border-outline-variant/10 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-12 text-on-surface">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-[#eef2f6] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="px-6 py-5 flex justify-between items-center">
                  <h4 className="font-bold text-[15px] text-[#1a1a1a]">{faq.question}</h4>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-on-surface-variant shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-on-surface-variant shrink-0" />
                  )}
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-sm text-[#4a5568] leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-[#f8fafc]">
                <h3 className="font-bold font-headline text-[#1a365d]">Contact {category}</h3>
                <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h4 className="text-2xl font-bold font-headline mb-2">Request Submitted!</h4>
                    <p className="text-on-surface-variant mb-6">Our team will get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setModalOpen(false)}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-container transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Full Name *</label>
                      <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email ID *</label>
                        <input 
                          required
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="john@firm.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Explain in Brief *</label>
                      <textarea 
                        required
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-5 py-2.5 text-sm font-bold text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {submitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
