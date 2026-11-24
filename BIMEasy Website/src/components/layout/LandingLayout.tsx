import React from 'react';
import { Link } from 'react-router-dom';

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on_surface font-sans">
      <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b-[1px] border-outline_variant/15">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-primary_container shadow-ambient flex items-center justify-center">
              <span className="text-on_primary font-display font-bold text-lg">B</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-primary">BIMEasy</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-on_surface_variant hover:text-primary transition-colors text-sm font-medium">Features</a>
            <a href="#pricing" className="text-on_surface_variant hover:text-primary transition-colors text-sm font-medium">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/freetrial" className="bg-primary text-on_primary px-5 py-2.5 rounded-md font-medium text-sm shadow-ambient hover:bg-primary_container transition-all">
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-surface_container_low py-12 mt-24 border-t-[1px] border-outline_variant/15">
        <div className="container mx-auto px-6 text-center text-on_surface_variant text-sm flex flex-col items-center">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-primary_container shadow-ambient flex items-center justify-center mb-4">
              <span className="text-on_primary font-display font-bold text-lg">B</span>
          </div>
          <p>© {new Date().getFullYear()} BIMEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default LandingLayout;
