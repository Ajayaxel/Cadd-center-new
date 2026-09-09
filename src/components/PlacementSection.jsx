import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, FileText, UserCheck, FolderCheck, Compass, Building, ArrowUpRight, X, Sparkles, ZoomIn, CheckCircle2, ChevronDown } from 'lucide-react';
import Button from './ui/Button';

// 17 Authentic Placed Student Images from assets/placestudents
import imgHanna from '../assets/placestudents/Hanna.png';
import imgHijas from '../assets/placestudents/Hijas.png';
import imgJasmin from '../assets/placestudents/Jasmin.png';
import imgJithin from '../assets/placestudents/Jithin.png';
import imgPeter from '../assets/placestudents/Peter.png';
import imgVipin from '../assets/placestudents/Vipin.png';
import imgShahla from '../assets/placestudents/Shahla.png';
import imgSalman from '../assets/placestudents/Salman.png';

import imgDilshad from '../assets/placestudents/IMG_0058.PNG';
import imgAnsar from '../assets/placestudents/IMG_0059.PNG';
import imgAnshad from '../assets/placestudents/IMG_0060.PNG';
import imgZiyad from '../assets/placestudents/IMG_0061.PNG';
import imgSreni from '../assets/placestudents/IMG_0063.JPEG';
import imgVignesh from '../assets/placestudents/IMG_0065.JPEG';
import imgSuhail from '../assets/placestudents/IMG_0069.JPEG';
import imgAshique from '../assets/placestudents/IMG_0070.PNG';
import imgShehin from '../assets/placestudents/IMG_0071.PNG';

// Placed Students Data with rich metadata & authentic CADD placement records
export const placedStudentsList = [
  {
    id: 'placed-hanna',
    name: 'Hanna',
    role: 'Designer',
    company: 'Design & Architecture',
    category: 'Architecture',
    img: imgHanna,
    alt: 'Hanna - Placed as Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-hijas',
    name: 'Hijas',
    role: 'BIM Modeler',
    company: 'BIM Consultancy',
    category: 'BIM',
    img: imgHijas,
    alt: 'Hijas - Placed as BIM Modeler from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-jasmin',
    name: 'Jasmin',
    role: 'CAD Draftman',
    company: 'Engineering Consultancy',
    category: 'Civil',
    img: imgJasmin,
    alt: 'Jasmin - Placed as CAD Draftman from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-jithin',
    name: 'Jithin',
    role: 'Site Engineer',
    company: 'Infrastructure & Construction',
    category: 'Civil',
    img: imgJithin,
    alt: 'Jithin - Placed as Site Engineer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-peter',
    name: 'Peter',
    role: 'Site Engineer',
    company: 'Construction & Civil',
    category: 'Civil',
    img: imgPeter,
    alt: 'Peter - Placed as Site Engineer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-vipin',
    name: 'Vipin',
    role: 'Designer',
    company: 'Design Studio',
    category: 'Architecture',
    img: imgVipin,
    alt: 'Vipin - Placed as Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-shahla',
    name: 'Shahla',
    role: 'CAD Designer',
    company: 'Architectural Consultancy',
    category: 'Architecture',
    img: imgShahla,
    alt: 'Shahla - Placed as CAD Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-salman',
    name: 'Salman',
    role: 'Designer',
    company: 'Engineering Studio',
    category: 'Mechanical',
    img: imgSalman,
    alt: 'Salman - Placed as Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-dilshad',
    name: 'Dilshad',
    role: 'MEP Designer',
    company: 'Focus MEP Solutions',
    category: 'MEP',
    img: imgDilshad,
    alt: 'Dilshad - Placed as MEP Designer at Focus MEP Solutions from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-ansar',
    name: 'Ansar',
    role: 'Draughtsman',
    company: 'Engineering Consultancy',
    category: 'Civil',
    img: imgAnsar,
    alt: 'Ansar - Placed as Draughtsman from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-anshad',
    name: 'Anshad',
    role: 'Product Designer',
    company: 'Product Design Studio',
    category: 'Mechanical',
    img: imgAnshad,
    alt: 'Anshad - Placed as Product Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-ziyad',
    name: 'Ziyad',
    role: 'Draughtsman',
    company: 'Architectural Drafting',
    category: 'Architecture',
    img: imgZiyad,
    alt: 'Ziyad - Placed as Draughtsman from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-sreni',
    name: 'Sreni',
    role: '3D Designer',
    company: '3D Visualization Firm',
    category: 'Interior',
    img: imgSreni,
    alt: 'Sreni - Placed as 3D Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-vignesh',
    name: 'Vignesh',
    role: 'Product Designer',
    company: 'Industrial Design Firm',
    category: 'Mechanical',
    img: imgVignesh,
    alt: 'Vignesh - Placed as Product Designer from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-suhail',
    name: 'Suhail',
    role: 'Designer',
    company: 'SeoskoServ Private Limited',
    category: 'Civil',
    img: imgSuhail,
    alt: 'Suhail - Placed as Designer at SeoskoServ Private Limited from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-ashique',
    name: 'Ashique',
    role: 'Designer',
    company: 'SeoskoServ Private Limited',
    category: 'Civil',
    img: imgAshique,
    alt: 'Ashique - Placed as Designer at SeoskoServ Private Limited from CADD Centre Perinthalmanna',
  },
  {
    id: 'placed-shehin',
    name: 'Shehin',
    role: 'Interior Designer',
    company: 'Ajiro Solutions',
    category: 'Interior',
    img: imgShehin,
    alt: 'Shehin - Placed as Interior Designer at Ajiro Solutions from CADD Centre Perinthalmanna',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Placements' },
  { id: 'BIM', label: 'BIM & Architectural' },
  { id: 'Civil', label: 'Civil & Site' },
  { id: 'Mechanical', label: 'Mechanical & Product' },
  { id: 'MEP', label: 'MEP & Interior' },
];

// Smooth Count Up Number Animation Component triggered when scrolled into view
function AnimatedCounter({ end, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Smooth ease-out cubic curve
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
}

export default function PlacementSection({ onOpenDemo }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);

  const filteredStudents = activeCategory === 'all'
    ? placedStudentsList
    : placedStudentsList.filter((s) => s.category === activeCategory || (activeCategory === 'MEP' && (s.category === 'MEP' || s.category === 'Interior')));

  const displayedStudents = (showAllCards || activeCategory !== 'all')
    ? filteredStudents
    : filteredStudents.slice(0, 8);

  // Placement Pillars
  const placementPillars = [
    {
      icon: FileText,
      title: "Resume & Portfolio Guidance",
      desc: "Industry-standard CAD portfolio structuring & technical project documentation."
    },
    {
      icon: UserCheck,
      title: "Interview Preparation",
      desc: "Technical mock interviews, drafting speed assessments, and professional communication."
    },
    {
      icon: FolderCheck,
      title: "Industry-Oriented Projects",
      desc: "Live project workflows matching real engineering and architectural deliverables."
    },
    {
      icon: Compass,
      title: "Career Counselling",
      desc: "One-on-one mentorship identifying optimal discipline paths across Civil, BIM, Mechanical & MEP."
    }
  ];

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedStudent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="placement" className="relative py-16 sm:py-24 bg-[#070D18] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Background Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-10">
        
        {/* ========================================================= */}
        {/* TOP HERO HEADER & KEY STATS BANNER (SCROLL ANIMATED)      */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          {/* Eyebrow Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/30 text-[#E94B3C] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.18em] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C] animate-pulse" />
            PLACEMENT CELL 2026
          </motion.div>

          {/* Dominant Large Headline (Centered Typography) */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-[1.02] max-w-4xl mx-auto"
          >
            ENGINEERING <br />
            <span className="text-[#E94B3C]">100+ SUCCESS</span> STORIES.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Practical training is only the beginning. Our dedicated placement cell helps students prepare for technical interviews, portfolio presentations, and professional engineering opportunities across India &amp; the Middle East.
          </motion.p>

          {/* 4-Column Stat Summary Grid (Scroll Animated Entrance & Count Up) */}
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 w-full bg-[#0B1322] border border-white/10 rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10"
          >
            
            {/* Stat 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col pt-2 lg:pt-0 lg:pl-0"
            >
              <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#3B82F6] tracking-tight">
                <AnimatedCounter end={100} suffix="+" duration={1800} />
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                CAREERS LAUNCHED
              </span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col pt-4 lg:pt-0 lg:pl-8"
            >
              <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#E94B3C] tracking-tight">
                <AnimatedCounter end={100} suffix="+" duration={1800} />
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                PARTNER NETWORK
              </span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col pt-4 lg:pt-0 lg:pl-8"
            >
              <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#10B981] tracking-tight">
                <AnimatedCounter end={100} suffix="%" duration={1800} />
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                PLACEMENT ASSISTANCE
              </span>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex flex-col pt-4 lg:pt-0 lg:pl-8"
            >
              <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#06B6D4] tracking-tight">
                TOP
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                INDUSTRY PACKAGES
              </span>
            </motion.div>

          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* VERIFIED GRADUATES SECTION (REFERENCE LAYOUT)             */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-20">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              VERIFIED GRADUATES
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
              Meet our engineering &amp; design training graduates placed directly into CAD drafting, BIM modeling, MEP engineering, and interior design zones.
            </p>
          </div>

          {/* Category Filter Pills (Left) & Right-Aligned View All Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id !== 'all') setShowAllCards(true);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#E94B3C] text-white shadow-lg scale-105'
                      : 'bg-[#0B1322] border border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right Side View All Text Button */}
            <button
              type="button"
              onClick={() => setShowAllCards((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E94B3C] hover:text-white bg-[#E94B3C]/10 border border-[#E94B3C]/30 hover:bg-[#E94B3C] px-4 py-2 rounded-full transition-all cursor-pointer shrink-0 group shadow-md"
            >
              <span>{showAllCards ? 'Show Less' : `View All (${placedStudentsList.length})`}</span>
              <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${showAllCards ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
            </button>

          </div>

          {/* DUAL-DIRECTIONAL AUTO-SLIDING PLACEMENT CARDS */}
          {/* Top Row: Auto-slides Right (->) | Bottom Row: Auto-slides Left (<-) */}
          <style>{`
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            @keyframes marqueeLeft {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-right {
              display: flex;
              width: max-content;
              animation: marqueeRight 35s linear infinite;
            }
            .animate-marquee-left {
              display: flex;
              width: max-content;
              animation: marqueeLeft 0s linear infinite; /* set via inline or class */
            }
            .animate-marquee-right:hover,
            .animate-marquee-left:hover {
              animation-play-state: paused;
            }
          `}</style>

          {(() => {
            // Helper to split displayed students into 2 balanced rows
            const mid = Math.ceil(displayedStudents.length / 2);
            const rawTop = displayedStudents.slice(0, mid);
            const rawBottom = displayedStudents.slice(mid);

            const prepareRow = (items) => {
              if (!items || items.length === 0) return [];
              let list = [...items];
              while (list.length < 8) {
                list = [...list, ...items];
              }
              return [...list, ...list]; // Duplicate for seamless 50% wrap
            };

            const topRowList = prepareRow(rawTop.length > 0 ? rawTop : displayedStudents);
            const bottomRowList = prepareRow(rawBottom.length > 0 ? rawBottom : rawTop);

            const renderCard = (student, keyId) => (
              <div
                key={keyId}
                onClick={() => setSelectedStudent(student)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedStudent(student)}
                className="w-[270px] sm:w-[300px] shrink-0 group relative bg-[#0B1322] border border-white/10 hover:border-[#E94B3C]/50 rounded-[22px] p-3.5 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl cursor-pointer flex flex-col justify-between select-none"
              >
                {/* Top Poster Image Frame */}
                <div className="relative w-full aspect-[4/5] bg-white rounded-[16px] overflow-hidden mb-3.5 shadow-inner">
                  {/* Top Bar inside image frame */}
                  <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
                    <span className="bg-[#070D18]/85 backdrop-blur-md text-white text-[9.5px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                      CADD CENTRE
                    </span>
                    <span className="bg-[#E94B3C] text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                      PLACED
                    </span>
                  </div>

                  {/* Student Authentic Poster Image */}
                  <img
                    src={student.img}
                    alt={student.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Subtle Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="text-[11px] font-bold text-white bg-[#E94B3C] px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" /> View Full Poster
                    </span>
                  </div>
                </div>

                {/* Bottom Dark Card Details */}
                <div className="px-1 pb-1 text-left flex-1 flex flex-col justify-between">
                  <div>
                    {/* Student Name + LinkedIn Icon */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#E94B3C] transition-colors truncate">
                        {student.name}
                      </h3>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:bg-[#0077B5] group-hover:text-white transition-colors shrink-0">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Company Name in Brand Red Highlight */}
                    <p className="text-[11.5px] font-bold text-[#E94B3C] uppercase tracking-wider mt-1 truncate">
                      {student.company}
                    </p>

                    {/* Role / Designation */}
                    <p className="text-xs text-slate-300 font-medium mt-0.5 truncate">
                      {student.role}
                    </p>
                  </div>

                  {/* Verification Status Pill */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Placed Graduate
                    </span>
                    <span className="font-semibold text-slate-400">
                      CADD Alumni
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <div className="space-y-6 sm:space-y-8 overflow-hidden py-2">
                
                {/* ROW 1: TOP ROW (SLIDING RIGHT ->) */}
                <div className="relative w-full overflow-hidden">
                  {/* Left/Right Edge Fade Overlays */}
                  <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#070D18] to-transparent z-10 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#070D18] to-transparent z-10 pointer-events-none" />

                  <div 
                    className="animate-marquee-right flex gap-5 sm:gap-6 py-2"
                    style={{ animationDuration: '32s' }}
                  >
                    {topRowList.map((student, idx) => renderCard(student, `top-${student.id}-${idx}`))}
                  </div>
                </div>

                {/* ROW 2: BOTTOM ROW (SLIDING LEFT <-) */}
                <div className="relative w-full overflow-hidden">
                  {/* Left/Right Edge Fade Overlays */}
                  <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#070D18] to-transparent z-10 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#070D18] to-transparent z-10 pointer-events-none" />

                  <div 
                    className="animate-marquee-left flex gap-5 sm:gap-6 py-2"
                    style={{ animationDuration: '32s', animationName: 'marqueeLeft' }}
                  >
                    {bottomRowList.map((student, idx) => renderCard(student, `bottom-${student.id}-${idx}`))}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* Bottom View All Button if currently truncated */}
          {!showAllCards && activeCategory === 'all' && filteredStudents.length > 8 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCards(true)}
                className="bg-[#0B1322] hover:bg-[#E94B3C] border border-[#E94B3C]/50 hover:border-[#E94B3C] text-white px-8 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>View All {placedStudentsList.length} Verified Graduates</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* PLACEMENT PILLARS & ASSISTANCE SUPPORT SERVICES           */}
        {/* ========================================================= */}
        <div className="mt-20 sm:mt-24 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dedicated Placement Cell Support
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              End-to-end career assistance to transform classroom learning into industry engineering roles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {placementPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0B1322] border border-white/10 rounded-[18px] p-5 text-left hover:border-[#E94B3C]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E94B3C]/10 border border-[#E94B3C]/20 text-[#E94B3C] flex items-center justify-center mb-3">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Banner */}
          <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-[#0B1322] via-[#0E1B33] to-[#0B1322] border border-white/15 rounded-[22px] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Ready to start your CAD &amp; BIM engineering career?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Enquire today for course syllabus, fee structures, and placement assistance details.
              </p>
            </div>
            <Button onClick={onOpenDemo} variant="primary" size="md">
              Enquire Placement Assistance
            </Button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* FULL-RES STUDENT POSTER LIGHTBOX MODAL                     */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0D1627] rounded-2xl overflow-hidden max-w-sm sm:max-w-md w-full shadow-2xl border border-white/20 text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Close poster view"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Poster Image */}
              <div className="relative w-full aspect-[4/5] bg-white">
                <img
                  src={selectedStudent.img}
                  alt={selectedStudent.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Footer info bar */}
              <div className="p-4 bg-[#080E1A] border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedStudent.name}</h4>
                  <p className="text-xs text-[#E94B3C] font-semibold">{selectedStudent.role} &bull; {selectedStudent.company}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudent(null);
                    onOpenDemo?.();
                  }}
                  className="text-xs font-bold text-white bg-[#E94B3C] hover:bg-[#D4382A] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Join Course <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}


