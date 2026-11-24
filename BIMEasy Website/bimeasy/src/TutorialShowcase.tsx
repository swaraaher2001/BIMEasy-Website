import { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import './tutorial-showcase.css';

const lessons = [
  {
    title: 'Getting Started with BIMEasy',
    description: 'Set up BIMEasy and build your first automated Revit workflow.',
    category: 'Setup guide',
  },
  {
    title: 'Modeling Automation',
    description: 'Learn wall splitting and element coordination for real projects.',
    category: 'Modeling workflows',
  },
  {
    title: 'QA/QC and Sheet Export',
    description: 'Review model quality and prepare consistent project deliverables.',
    category: 'Documentation',
  },
  {
    title: 'Efficient Sheet Export Workflows',
    description: 'Configure batch exports and naming conventions for project sheets.',
    category: 'Export workflow',
  },
];

export default function TutorialShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLesson = lessons[activeIndex];

  return (
    <section className="tutorial-showcase" id="tutorial" aria-labelledby="tutorial-showcase-title">
      <div className="tutorial-showcase__inner">
        <div className="tutorial-showcase__content">
          <div className="tutorial-showcase__eyebrow"><span />BIMEASY LEARNING HUB</div>
          <h2 id="tutorial-showcase-title">Learn &amp; Master BIMEasy</h2>
          <p className="tutorial-showcase__intro">Practical tutorials to help you get more from every Revit workflow.</p>

          <div className="tutorial-showcase__lessons" role="list" aria-label="BIMEasy tutorials">
            {lessons.map((lesson, index) => (
              <button
                className={`tutorial-showcase__lesson${activeIndex === index ? ' is-active' : ''}`}
                key={lesson.title}
                type="button"
                role="listitem"
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                <span className="tutorial-showcase__lesson-copy">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.description}</small>
                </span>
                <span className="tutorial-showcase__lesson-arrow"><ArrowUpRight size={18} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="tutorial-showcase__visual">
          <img src="/learn1.jpg" alt="BIMEasy learning and Revit tutorials" />
          <div className="tutorial-showcase__info-card" aria-live="polite">
            <span className="tutorial-showcase__book-icon"><BookOpen size={19} /></span>
            <small>{activeLesson.category}</small>
            <strong>{activeLesson.title}</strong>
            <p>{activeLesson.description}</p>
            <a href="#toolkit">Explore tools <ArrowRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
