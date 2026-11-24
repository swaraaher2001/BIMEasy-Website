import React, { useState } from 'react';
import LandingLayout from '../components/layout/LandingLayout';
import { motion } from 'framer-motion';

const FreeTrialPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const options = {
        key: "YOUR_RAZORPAY_TEST_KEY_ID", 
        amount: "500000", 
        currency: "INR",
        name: "BIMEasy plugin",
        description: "BIMEasy Annual Subscription",
        image: "https://example.com/your_logo",
        order_id: "order_mock_12345", 
        handler: function (response: any){
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
            name: "",
            email: "",
            contact: ""
        },
        theme: {
            color: "#00478d" 
        }
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.on('payment.failed', function (response: any){
            alert("Payment Failed. Reason: " + response.error.description);
    });
    rzp1.open();
    setLoading(false);
  };

  return (
    <LandingLayout>
      <section className="py-20 bg-surface_container_lowest min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-2xl shadow-ambient border-[1px] border-outline_variant/15 p-8"
          >
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-3xl text-on_background mb-2">Upgrade to BIMEasy Pro</h1>
              <p className="text-on_surface_variant">14-Day Free Trial included. Cancel anytime.</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-4 border-b border-outline_variant/15">
                <span className="font-medium text-on_surface">Annual License</span>
                <span className="font-bold text-lg text-primary">₹5,000<span className="text-sm font-normal text-on_surface_variant">/yr</span></span>
              </div>
              <ul className="text-sm text-on_surface_variant space-y-3 pt-4">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div> Unlimited plugin access
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div> Auto update deployment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div> Priority email support
                </li>
              </ul>
            </div>
            
            <button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary_container text-on_primary py-3.5 rounded-lg font-medium shadow-ambient hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe & Secure License'}
            </button>
            <p className="text-center text-xs text-on_surface_variant mt-4">
              Secured by Razorpay. 256-bit SSL encryption.
            </p>
          </motion.div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default FreeTrialPage;
