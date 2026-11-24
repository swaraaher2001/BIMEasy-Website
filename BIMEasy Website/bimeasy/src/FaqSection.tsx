import { useState } from 'react';
import { ArrowRight, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './faq-section.css';

const questions = [
  {
    question: 'What is BIMEasy?',
    answer: 'BIMEasy is a Revit productivity toolkit that helps teams automate repetitive modeling, documentation, and quality checks.',
  },
  {
    question: 'Which Revit workflows can I automate?',
    answer: 'BIMEasy includes tools for wall splitting, element numbering, batch exports, sheet organization, model checks, and more.',
  },
  {
    question: 'Is BIMEasy designed for Revit teams?',
    answer: 'Yes. Its tools are designed around everyday Revit modeling and documentation workflows for BIM professionals.',
  },
  {
    question: 'Can I try BIMEasy before purchasing?',
    answer: 'Yes. Use the free trial option to get started and explore BIMEasy before choosing a plan.',
  },
  {
    question: 'How do I download and install BIMEasy?',
    answer: 'Visit the Download page for the current installer and setup information.',
  },
  {
    question: 'Where can I get help with setup or using a tool?',
    answer: 'Contact the BIMEasy support team with your setup or workflow question and they can help you find the right next step.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__inner">
        <div className="faq-section__aside">
          <div className="faq-section__eyebrow"><span />FAQs</div>
          <h2 id="faq-title">Frequently Asked Questions</h2>
          <div className="faq-section__contact">
            <div className="faq-section__logo"><img src="/logo.png" alt="BIMEasy" /></div>
            <h3>Talk to our team</h3>
            <p>Questions about setup, plans, or your Revit workflow? Send us a message and we’ll point you in the right direction.</p>
            <Link to="/support" className="faq-section__contact-button">Contact Support <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="faq-section__questions">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <article className={`faq-section__item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <button className="faq-section__question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span>{item.question}</span>
                  <span className="faq-section__toggle" aria-hidden="true">{isOpen ? <X size={17} /> : <Plus size={19} />}</span>
                </button>
                <div className="faq-section__answer" id={answerId} aria-hidden={!isOpen}>
                  <div className="faq-section__answer-inner"><p>{item.answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
