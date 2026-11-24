import { ArrowRight, Check, Play } from 'lucide-react';
import './company-intro.css';

const highlights = [
  'Automate repetitive modeling and element coordination',
  'Keep sheets, views, and project documentation organized',
  'Export PDFs, DWGs, and Navisworks files in batches',
  'Catch naming issues and missing parameters earlier',
];

export default function CompanyIntro() {
  return (
    <section className="company-intro" id="company-intro" aria-labelledby="company-intro-title">
      <div className="company-intro__container">
        <div className="company-intro__content">
          <div className="company-intro__label"><span />ABOUT BIMEASY</div>
          <h2 id="company-intro-title">Powering Your BIM Workflow<br />the Smart Way</h2>
          <p className="company-intro__description">
            BIMEasy helps Revit teams automate repetitive modeling, documentation, and quality checks so they can focus on better design.
          </p>
          <ul className="company-intro__list">
            {highlights.map((item) => (
              <li key={item}><span className="company-intro__check"><Check size={11} strokeWidth={3} /></span>{item}</li>
            ))}
          </ul>
          <div className="company-intro__buttons">
            <a href="#toolkit" className="company-intro__button">Explore BIMEasy <ArrowRight size={15} /></a>
            <a href="#tutorial" className="company-intro__play" aria-label="Go to BIMEasy tutorials"><span><Play size={12} fill="currentColor" /></span></a>
          </div>
        </div>

        <div className="company-intro__visual" aria-label="BIMEasy Revit workflow illustration">
          <div className="company-intro__image company-intro__image--one"><img src="/about1.jpg" alt="BIMEasy team working on a BIM project" /></div>
          <div className="company-intro__image company-intro__image--two"><img src="/about2.jpg" alt="BIM project collaboration" /></div>
          <div className="company-intro__image company-intro__image--three"><img src="/about3.jpg" alt="Revit workflow in practice" /></div>
          <div className="company-intro__project-card"><strong>11 Tools</strong><span>Built for Revit teams</span></div>
          <div className="company-intro__award-card"><div className="company-intro__stars">BIM · REVIT · QA/QC</div><strong>40+ hrs</strong><span>Potential time saved<br />per month</span></div>
        </div>
      </div>
    </section>
  );
}
