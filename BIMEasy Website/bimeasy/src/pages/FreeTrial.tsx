import { useState } from "react";
import { motion } from "motion/react";
import { 
  Timer, 
  ShieldCheck, 
  Layers, 
  RefreshCw, 
  ChevronDown 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from '../App';

const LOGO_URL = "/logo.png";
const TESTIMONIAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuB1gt0Nhpk8uz7ssoII8nqJRnfwiI1agRMDjzKotoZdEAYZoiflYeLDiIE-HgPo2Em-iAptJrNX3lszangJvyeSnxBsPsuJ55tcuSh0TU9S49qVluoMt0vSGvuf7XY3mGhsB9dh7GKS2v61hfB2iR8Pe9P49G25iM9kfVzttStgT-JI3wYj-kGWFpe5xon5Dc05yO-OWZ-AS5OS1RMzFDZPC_4c0oYNMX-2UJmykhXpE1cJSpxOpP78o1eRwpFuJezYMFJ3H9FsMQ";

const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
};

export default function GetStarted() {
  const [fullName, setFullName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1 (US)");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [seats, setSeats] = useState("1");
  const [years, setYears] = useState("1");
  const [coupon, setCoupon] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("Architect");
  const [country, setCountry] = useState("United States");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== confirmEmail) {
        alert("Emails do not match!");
        return;
    }
    setLoading(true);

    try {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            alert("Failed to load Razorpay SDK.");
            setLoading(false);
            return;
        }

        const res = await fetch("https://us-central1-bimeasy-website.cloudfunctions.net/createRazorpayOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: fullName,
                email: email,
                phone: phoneCode + phone,
                seats: parseInt(seats, 10),
                years: parseInt(years, 10),
                coupon: coupon,
                company,
                role,
                country
            })
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || "Failed to create order");
        }

        if (data.free) {
            alert("100% Discount Applied! Your account has been provisioned. Please check your email for the temporary password to login to the Revit Plugin.");
            setLoading(false);
            return;
        }

        const options = {
            key: "rzp_live_SdOrAV26EIAHoy",
            amount: data.amount,
            currency: data.currency,
            name: "BIMEasy",
            description: "Volume License Subscription",
            order_id: data.id,
            handler: function (response: any) {
                alert("Payment Successful! A temporary password has been generated randomly and activated for your account. Please check your email to verify!");
                // Optionally clear form or redirect to success page
            },
            prefill: {
                name: fullName,
                email: email,
                contact: phone
            },
            theme: { color: "#00478D" }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();

    } catch (err: any) {
        alert(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="flex-grow pt-32 pb-32 px-6 lg:px-12 blueprint-grid">
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
                Start your full-access subscription securely below.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleCheckout}>
              {/* 1. Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Full Name</label>
                <input 
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                  placeholder="John Doe" 
                  type="text"
                />
              </div>

              {/* 2. Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative w-1/3 sm:w-1/4">
                    <select 
                      value={phoneCode}
                      onChange={e => setPhoneCode(e.target.value)}
                      className="w-full px-3 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface appearance-none cursor-pointer"
                    >
                      <option>+91 (IN)</option>
                      <option>+1 (US)</option>
                      <option>+44 (UK)</option>
                      <option>+61 (AU)</option>
                      <option>+86 (CN)</option>
                      <option>+49 (DE)</option>
                      <option>+33 (FR)</option>
                      <option>+81 (JP)</option>
                      <option>+82 (KR)</option>
                      <option>+7 (RU)</option>
                      <option>+55 (BR)</option>
                      <option>+52 (MX)</option>
                      <option>+34 (ES)</option>
                      <option>+39 (IT)</option>
                      <option>+31 (NL)</option>
                      <option>+46 (SE)</option>
                      <option>+41 (CH)</option>
                      <option>+65 (SG)</option>
                      <option>+60 (MY)</option>
                      <option>+63 (PH)</option>
                      <option>+62 (ID)</option>
                      <option>+66 (TH)</option>
                      <option>+84 (VN)</option>
                      <option>+971 (AE)</option>
                      <option>+966 (SA)</option>
                      <option>+27 (ZA)</option>
                      <option>+234 (NG)</option>
                      <option>+254 (KE)</option>
                      <option>+20 (EG)</option>
                      <option>+48 (PL)</option>
                      <option>+90 (TR)</option>
                      <option>+64 (NZ)</option>
                      <option>+353 (IE)</option>
                      <option>+351 (PT)</option>
                      <option>+43 (AT)</option>
                      <option>+32 (BE)</option>
                      <option>+45 (DK)</option>
                      <option>+47 (NO)</option>
                      <option>+358 (FI)</option>
                      <option>+420 (CZ)</option>
                      <option>+36 (HU)</option>
                      <option>+40 (RO)</option>
                      <option>+380 (UA)</option>
                      <option>+92 (PK)</option>
                      <option>+880 (BD)</option>
                      <option>+94 (LK)</option>
                      <option>+977 (NP)</option>
                      <option>+972 (IL)</option>
                      <option>+56 (CL)</option>
                      <option>+57 (CO)</option>
                      <option>+54 (AR)</option>
                      <option>+51 (PE)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                  </div>
                  <input 
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="flex-grow px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                    placeholder="202 555 0123" 
                    type="tel"
                  />
                </div>
              </div>

              {/* 3 & 4. Email & Confirm Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Email Address</label>
                  <input 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                    placeholder="john@firm.com" 
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Confirm Email</label>
                  <input 
                    required
                    value={confirmEmail}
                    onChange={e => setConfirmEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                    placeholder="john@firm.com" 
                    type="email"
                  />
                </div>
              </div>
              <p className="text-xs text-primary font-medium -mt-4">
                Note: Both emails must match. This email ID will be used as the User ID for the plugin.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 5a. Number of Seats Required */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Number of Seats</label>
                  <div className="flex items-center gap-4">
                    <input 
                      required
                      value={seats}
                      onChange={e => setSeats(e.target.value)}
                      className="w-24 px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface text-center font-bold" 
                      type="number"
                      min="1"
                    />
                    <span className="text-sm font-medium text-on-surface-variant">licenses</span>
                  </div>
                </div>

                {/* 5b. Subscription Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Duration</label>
                  <div className="flex items-center gap-4">
                    <input 
                      required
                      value={years}
                      onChange={e => setYears(e.target.value)}
                      className="w-24 px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface text-center font-bold" 
                      type="number"
                      min="1"
                      max="10"
                    />
                    <span className="text-sm font-medium text-on-surface-variant">years</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Discount Coupon (Optional)</label>
                <input 
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                  placeholder="e.g. BIMEASY20" 
                  type="text"
                />
              </div>

              {/* 6. Company & Job Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Company Name</label>
                  <input 
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" 
                    placeholder="Architectural Solutions" 
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Job Role</label>
                  <div className="relative">
                    <select 
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface appearance-none cursor-pointer"
                    >
                      <option>Architect</option>
                      <option>BIM Manager</option>
                      <option>Engineer</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 7. Country */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Country</label>
                <div className="relative">
                  <select 
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface appearance-none cursor-pointer"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                </div>
              </div>

              {/* Terms & Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  required 
                  id="terms-agree"
                  className="mt-1 w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary cursor-pointer accent-primary"
                />
                <label htmlFor="terms-agree" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
                  I agree to the <Link className="text-primary hover:underline font-medium" to="/terms-of-service">Terms of Service</Link> and <Link className="text-primary hover:underline font-medium" to="/privacy-policy">Privacy Policy</Link>.
                </label>
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2"
                >
                  {loading && <RefreshCw className="w-5 h-5 animate-spin" />}
                  {loading ? "Initializing Secure Checkout..." : "Secure Checkout via Razorpay"}
                </button>
              </div>
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
              <p className="text-on-surface italic leading-relaxed relative z-10 text-lg">
                "BIMEasy transformed our workflow. What used to take three days of manual data entry now happens in seconds. It's the most vital tool in our Revit stack."
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .blueprint-grid {
            background-color: var(--color-surface);
            background-image: linear-gradient(rgba(0, 71, 141, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 71, 141, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
