import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  CopyPlus,
  Download,
  FileCheck,
  Hash,
  Layers,
  Search,
  ShieldCheck,
  WandSparkles,
  X,
} from 'lucide-react';
import './tools-bubbles.css';

const tools = [
  { name: 'Join Geometry', category: 'Modeling Tools', Icon: Layers, colors: ['#78B7E4', '#B9D9EF'], description: 'Rule-based bulk element joining with cut-order control.', idealUsers: 'Structural and Architectural Modelers, BIM Coordinators' },
  { name: 'Split Column', category: 'Modeling Tools', Icon: CopyPlus, colors: ['#9CC9E8', '#D3E7F5'], description: 'Split columns and walls by level, with offset controls.', idealUsers: 'Structural Engineers, Concrete/Formwork Modelers' },
  { name: 'Sequential Numbering', category: 'Modeling Tools', Icon: Hash, colors: ['#86BDE3', '#C4DFF2'], description: 'Click to number elements in Numerical, Alpha, or Roman styles.', idealUsers: 'Structural Engineers, MEP Teams, Architectural Detailers' },
  { name: 'Tagless Elements', category: 'QA & QC', Icon: Search, colors: ['#A9D0EB', '#D7E9F5'], description: 'Detect, locate, and report untagged model elements in the active view.', idealUsers: 'BIM Coordinators, Architects, Documentation Leads' },
  { name: 'Double Tags', category: 'QA & QC', Icon: CopyPlus, colors: ['#78B7E4', '#D3E7F5'], description: 'Find elements tagged more than once in the active view.', idealUsers: 'QA/QC Auditors, Drafting Managers' },
  { name: 'Empty Tags', category: 'QA & QC', Icon: FileCheck, colors: ['#9CC9E8', '#C4DFF2'], description: 'Find blank or unresolved (?) tags before PDF or DWG issue.', idealUsers: 'Project Architects, QA/QC Leads' },
  { name: 'Revision Manager', category: 'Reports & Exports', Icon: Layers, colors: ['#B9D9EF', '#E2F0F8'], description: 'Manage a cross-sheet revision matrix and navigate between sheets instantly.', idealUsers: 'Document Controllers, Project Managers' },
  { name: 'Batch Export', category: 'Reports & Exports', Icon: Download, colors: ['#86BDE3', '#D7E9F5'], description: 'Publish PDFs and DWGs simultaneously with custom token-based naming.', idealUsers: 'All Revit Users, CAD/BIM Managers, Submittal Teams' },
  { name: 'Multi Category Report', category: 'Reports & Exports', Icon: Activity, colors: ['#78B7E4', '#C4DFF2'], description: 'Create multi-category BOQ/takeoff reports with an Excel-style summary and PDF/XLSX export.', idealUsers: 'Quantity Surveyors, Estimators, BIM Managers' },
  { name: 'Schedulink', category: 'Reports & Exports', Icon: FileText, colors: ['#A9D0EB', '#E2F0F8'], description: 'Export parameters to Excel both ways, preview differences, and safely import changes into Revit.', idealUsers: 'BIM Coordinators, Data Managers, Project Engineers' },
  { name: 'Manage License', category: 'License', Icon: ShieldCheck, colors: ['#9CC9E8', '#D7E9F5'], description: 'Activate the 14-day free trial, check license status, and transfer a seat yourself.', idealUsers: 'Individual Users, IT & BIM Administrators' },
];

const bubbleSizes = [124, 100, 132, 96, 116, 104, 128, 92, 120, 108, 112];
const bubbleRadii = [1, .94, 1, .93, 1, .95, 1, .93, 1, .94, .97];
const bubbleShifts = [0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0];

function ellipseAt(rx: number, ry: number) {
  const points: [number, number][] = [];
  const lengths = [0];
  const steps = 720;
  for (let step = 0; step <= steps; step += 1) {
    const angle = -Math.PI / 2 + (step / steps) * Math.PI * 2;
    points.push([Math.cos(angle) * rx, Math.sin(angle) * ry]);
    if (step) lengths.push(lengths[step - 1] + Math.hypot(points[step][0] - points[step - 1][0], points[step][1] - points[step - 1][1]));
  }
  return (fraction: number): [number, number] => {
    const target = (((fraction % 1) + 1) % 1) * lengths[steps];
    let index = 0;
    while (index < steps && lengths[index] < target) index += 1;
    return points[index];
  };
}

export default function ToolsBubbleSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isIn, setIsIn] = useState(false);
  const cloudRef = useRef<HTMLDivElement | null>(null);
  const activeTool = activeIndex === null ? null : tools[activeIndex];

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return undefined;
    const layout = () => {
      const width = cloud.clientWidth;
      const height = cloud.clientHeight;
      const scale = Math.max(.5, Math.min(1, width / 1100));
      const maxBubble = Math.max(...bubbleSizes) * scale;
      const rx = width < 700
        ? Math.min(width * .38, width / 2 - maxBubble / 2 - 30)
        : Math.min(width * .42, width / 2 - maxBubble / 2 - 14);
      const ry = height / 2 - maxBubble / 2 - (width < 700 ? 22 : 34);
      const pointAt = ellipseAt(rx, ry);
      cloud.querySelectorAll<HTMLElement>('.tb-item').forEach((button, index) => {
        const [x, y] = pointAt(index / tools.length + bubbleShifts[index] / 360);
        button.style.left = `${width / 2 + x * bubbleRadii[index]}px`;
        button.style.top = `${height / 2 + y * bubbleRadii[index]}px`;
        button.style.setProperty('--size', `${Math.round(bubbleSizes[index] * scale)}px`);
      });
    };
    layout();
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(cloud);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIn(true);
        intersectionObserver.disconnect();
      }
    }, { threshold: .2 });
    intersectionObserver.observe(cloud);
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((index) => ((index ?? 0) + 1) % tools.length);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => ((index ?? 0) + tools.length - 1) % tools.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  const setByOffset = (offset: number) => setActiveIndex(((activeIndex ?? 0) + offset + tools.length) % tools.length);
  const dockSize = typeof window === 'undefined' ? 100 : (window.innerWidth < 700 ? 72 : Math.min(132, Math.max(76, window.innerWidth * .086)));

  return (
    <>
      <section className="tb" id="toolkit" aria-labelledby="tb-title">
        <div className="tb__head">
          <span className="tb__eyebrow"><i />BIMEasy toolkit</span>
          <h2 className="tb__title" id="tb-title">Tools built for Revit</h2>
          <p className="tb__sub">Explore the tools that simplify modeling, documentation, and quality checks.</p>
        </div>

        <div ref={cloudRef} className={`tb__cloud${isIn ? ' is-in' : ''}`}>
          <div className="tb__orb-wrap" aria-hidden="true"><div className="tb__orb-par"><div className="tb__orb-pop"><span className="tb-orb tb__orb" /></div></div></div>
          {tools.map(({ name, category, Icon, colors }, index) => (
            <button className="tb-item" key={name} type="button" aria-label={`${name} — ${category}. Open details`} onClick={() => setActiveIndex(index)}>
              <span className="tb-par"><span className="tb-pop" style={{ '--i': index } as CSSProperties}><span className="tb-float" style={{ '--dur': `${5 + (index % 4) * .9}s`, '--delay': `${-index * .7}s` } as CSSProperties}>
                <span className="tb-halo" style={{ '--glow': `${colors[0]}88` } as CSSProperties} /><span className="tb-sphere" style={{ '--glow': `${colors[0]}88`, '--c1': colors[0] } as CSSProperties}><Icon aria-hidden="true" /></span><span className="tb-name">{name}</span>
              </span></span></span>
            </button>
          ))}
        </div>
      </section>

      {createPortal(
        <div className={`tbm${activeTool ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="tbm-text" aria-hidden={!activeTool}>
          <div className="tbm__bg" onClick={() => setActiveIndex(null)} />
          <button className="tbm__orb" type="button" aria-label="Close details" onClick={() => setActiveIndex(null)}><span className="tb-orb" /></button>
          <button className="tbm__close" type="button" aria-label="Close details" onClick={() => setActiveIndex(null)}><X /></button>
          {activeTool && <>
            <div className="tbm__body">
              <p className="tbm__text" id="tbm-text"><b>{activeTool.name}</b> {activeTool.description}</p>
              <p className="tbm__audience"><b>Ideal users:</b> {activeTool.idealUsers}</p>
              <div className="tbm__meta"><span className="tbm__chip">{activeTool.category}</span><Link className="tbm__link" to="/pricing">Explore plans <span aria-hidden="true">↗</span></Link></div>
            </div>
            <div className="tbm__card"><img src="/bim2.png" alt={`${activeTool.name} Revit workflow preview`} /></div>
          </>}
          <div className="tbm__dock">
            {tools.map(({ name, Icon, colors }, index) => {
              let offset = index - (activeIndex ?? 0);
              if (offset > tools.length / 2) offset -= tools.length;
              if (offset < -tools.length / 2) offset += tools.length;
              const variables = {
                '--glow': `${colors[0]}88`, '--c1': colors[0],
                '--x': `${offset * dockSize * (window.innerWidth < 700 ? 1.28 : 1.6)}px`,
                '--y': `${(offset === 0 ? -.2 : .42) * dockSize}px`,
                '--s': offset === 0 ? 1 : .84,
                '--o': Math.abs(offset) <= 2 ? 1 : 0,
              } as CSSProperties;
              return <button key={name} className={`tbm__dot${offset === 0 ? ' is-active' : ''}`} type="button" aria-label={name} aria-current={offset === 0} tabIndex={activeTool && Math.abs(offset) <= 2 ? 0 : -1} onClick={() => setActiveIndex(index)} style={variables}><span className="tb-halo" /><span className="tb-sphere"><Icon aria-hidden="true" /></span></button>;
            })}
          </div>
          {activeTool && <div className="tbm__foot"><span className="tbm__count"><b>{String(activeIndex! + 1).padStart(2, '0')}</b> / {String(tools.length).padStart(2, '0')} · {activeTool.category}</span><div className="tbm__nav"><button type="button" aria-label="Previous tool" onClick={() => setByOffset(-1)}><ChevronLeft /></button><button type="button" aria-label="Next tool" onClick={() => setByOffset(1)}><ChevronRight /></button></div></div>}
        </div>,
        document.body,
      )}
    </>
  );
}
