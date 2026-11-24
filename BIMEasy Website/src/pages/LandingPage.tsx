import React from 'react';
import LandingLayout from '../components/layout/LandingLayout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Zap, Settings2, FileOutput } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <LandingLayout>
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-10%] w-[50%] h-[500px] bg-tertiary_fixed/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-surface_container_lowest rounded-full py-1.5 px-4 shadow-ambient border border-outline_variant/15 self-start">
              <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-semibold uppercase tracking-wider">New</span>
              <span className="text-xs text-on_surface_variant font-medium">BIMEasy v2.0 is now live</span>
            </div>
            
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-[4rem] leading-tight text-on_background tracking-tight">
              Automate Revit.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary_container">Elevate Design.</span>
            </h1>
            
            <p className="text-on_surface_variant text-lg md:text-xl font-sans max-w-lg leading-relaxed">
              Stop fighting with manual tagging, numbering, and sheet exports. BIMEasy provides native, lightning-fast automation tools right inside your Revit ribbon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/freetrial" className="bg-gradient-to-r from-tertiary to-tertiary_container text-on_primary px-8 py-4 rounded-lg font-medium shadow-ambient hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                Start 14-Day Free Trial
                <Zap className="w-4 h-4 text-tertiary_fixed" />
              </Link>
              <a href="#features" className="bg-surface_container_lowest text-primary px-8 py-4 rounded-lg font-medium border-[1px] border-outline_variant/15 shadow-ambient hover:bg-surface_container_low transition-colors flex justify-center items-center">
                See How It Works
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-surface_container_lowest rounded-2xl shadow-ambient border-[1px] border-outline_variant/15 overflow-hidden flex flex-col">
              <div className="h-12 bg-surface_container_low border-b-[1px] border-outline_variant/15 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-outline_variant/50"></div>
                  <div className="w-3 h-3 rounded-full bg-outline_variant/50"></div>
                  <div className="w-3 h-3 rounded-full bg-outline_variant/50"></div>
                </div>
                <div className="ml-4 h-5 w-48 bg-surface rounded flex items-center justify-center">
                  <span className="text-[10px] text-on_surface_variant">BIMEasy Auto-Tag Engine</span>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgNzEsIDE0MSwgMC4wNSkiLz48L3N2Zz4=')]">
                <div className="flex gap-4">
                  <div className="w-32 h-10 bg-primary/10 rounded border border-primary/20 flex items-center px-3">
                    <span className="text-xs text-primary font-medium">Wall Tags</span>
                  </div>
                  <div className="w-32 h-10 bg-surface_container_high rounded flex items-center px-3">
                    <span className="text-xs text-on_surface_variant">Door Tags</span>
                  </div>
                </div>
                
                <div className="mt-auto h-16 w-full bg-inverse_surface/90 backdrop-blur-md rounded-xl p-0 overflow-hidden flex flex-col shadow-ambient">
                  <div className="h-[2px] w-full bg-surface_variant">
                    <div className="h-full w-[45%] bg-gradient-to-r from-tertiary_fixed to-tertiary animate-pulse"></div>
                  </div>
                  <div className="flex items-center px-4 flex-1">
                    <Zap className="w-4 h-4 text-tertiary_fixed mr-3" />
                    <span className="text-inverse_on_surface text-sm font-medium">Processing 428 Elements...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 bg-surface_container_lowest">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-on_background mb-4">Master Your BIM Workflow</h2>
            <p className="text-on_surface_variant">Everything you need to automate tedious document generation and data entry.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Tagging", text: "Automatically tag hundreds of elements clash-free with our Option 2 placement algorithms.", icon: Settings2 },
              { title: "Batch Exporting", text: "Easily export PDF, DWG, and NWC formats concurrently in the background.", icon: FileOutput },
              { title: "Sequential Numbering", text: "Instantly renumber parking, rooms, and doors using custom prefix/suffix rules.", icon: CheckCircle2 }
            ].map((feature, idx) => (
              <div key={idx} className="bg-surface p-8 rounded-2xl group hover:bg-surface_container_low transition-colors duration-300 shadow-ambient border-[1px] border-outline_variant/10">
                <div className="w-12 h-12 rounded-xl bg-primary_fixed text-primary_container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-on_surface">{feature.title}</h3>
                <p className="text-on_surface_variant text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};
export default LandingPage;
