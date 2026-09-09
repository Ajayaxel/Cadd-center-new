import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Wrench, Zap, Layers, PenTool, CheckCircle2, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Integrations({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { autoAlpha: 0, y: 35, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });

      mm.add('(max-width: 1023px)', () => {
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const disciplines = [
    {
      id: 'civil',
      tabLabel: 'Civil & Structural',
      icon: Building2,
      title: 'Civil & Structural Engineering',
      tagline: 'Plan, design, and model modern civil infrastructure.',
      description: 'Master structural analysis, 2D architectural drafting, 3D modeling, reinforcement detailing, and site-ready civil engineering documentation.',
      software: ['AutoCAD Civil', 'STAAD.Pro', 'ETABS', 'Revit Structure', 'Civil 3D'],
      image: '/images/disciplines/discipline-civil.jpg',
      cta: 'Explore Civil Courses',
      highlight: 'Structural Design & Analysis'
    },
    {
      id: 'mechanical',
      tabLabel: 'Mechanical Design',
      icon: Wrench,
      title: 'Mechanical & Product Design',
      tagline: 'Model parts, complex assemblies, and manufacturing workflows.',
      description: 'Develop end-to-end expertise in 3D parametric CAD modeling, GD&T, sheet metal, FEA simulation, tooling, and CAM machining toolpaths.',
      software: ['SolidWorks', 'Creo Parametric', 'CATIA', 'ANSYS FEA', 'AutoCAD Mechanical'],
      image: '/images/disciplines/discipline-mechanical.jpg',
      cta: 'Explore Mechanical Courses',
      highlight: 'Parametric CAD & Simulation'
    },
    {
      id: 'electrical',
      tabLabel: 'Electrical Engineering',
      icon: Zap,
      title: 'Electrical Engineering',
      tagline: 'Design systems. Understand industry workflows.',
      description: 'Learn electrical drafting, control panel schematics, single-line diagrams, power distribution, wiring schedules, and MEP coordination.',
      software: ['AutoCAD Electrical', 'EPLAN', 'Revit MEP', 'Electrical CAD', 'Single Line Diagrams'],
      image: '/images/disciplines/discipline-electrical.jpg',
      cta: 'Explore Electrical Courses',
      highlight: 'Panel Schematics & MEP'
    },
    {
      id: 'bim',
      tabLabel: 'Architecture & BIM',
      icon: Layers,
      title: 'Architecture & BIM Workflows',
      tagline: 'Build intelligent 3D building information models.',
      description: 'Master parametric building modeling, BIM Level 2 documentation, Navisworks clash detection, parametric families, and real-time architectural walkthroughs.',
      software: ['Revit Architecture', 'Navisworks', 'AutoCAD 3D', 'BIM 360', 'Dynamo'],
      image: '/images/disciplines/discipline-bim.jpg',
      cta: 'Explore BIM Courses',
      highlight: 'Parametric BIM & Clash Detection'
    },
    {
      id: 'interior',
      tabLabel: 'Interior & Design',
      icon: PenTool,
      title: 'Interior Design & 3D Visualization',
      tagline: 'Transform creative concepts into photorealistic renders.',
      description: 'Learn spatial layout planning, material selection, lighting simulation, furniture detailing, and high-impact photorealistic 3D interior rendering.',
      software: ['3ds Max', 'V-Ray', 'SketchUp', 'Photoshop', 'AutoCAD Interior'],
      image: '/images/disciplines/discipline-interior.jpg',
      cta: 'Explore Interior Courses',
      highlight: 'Photorealistic 3D Visualization'
    }
  ];

  const current = disciplines[activeTab];

  return (
    <section 
      id="disciplines" 
      ref={containerRef}
      className="py-10 sm:py-24 bg-[#F5F4F1] font-['Plus_Jakarta_Sans',sans-serif]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN ENCLOSED CONTAINER */}
        <div 
          ref={cardRef}
          className="bg-white rounded-[24px] border border-[rgba(28,37,51,0.10)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-12 space-y-8 sm:space-y-10"
        >
          
          {/* TOP SECTION HEADER */}
          <div className="text-center max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="SPECIALIZED TRAINING PROGRAMS"
              title="Explore Your Career Path. Build Industry-Ready Skills."
              description="Industry-focused training in Civil, Mechanical, Electrical, Architecture, BIM and Design — built around the tools and workflows professionals use."
              align="center"
            />
          </div>

          {/* HORIZONTAL COURSE NAVIGATOR TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 p-1.5 bg-[#F5F4F1] rounded-[16px] border border-[rgba(28,37,51,0.08)]">
            {disciplines.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeTab === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative p-3 sm:p-3.5 rounded-[12px] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-white text-[#1C2533] shadow-sm border border-[rgba(28,37,51,0.12)]'
                      : 'hover:bg-white/60 text-[#687282] hover:text-[#1C2533] border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-end mb-2">
                    <IconComp className={`w-4 h-4 transition-colors ${isActive ? 'text-[#E94B3C]' : 'text-[#9299A3] group-hover:text-[#1C2533]'}`} />
                  </div>

                  <span className="text-xs sm:text-sm font-bold tracking-tight leading-snug">
                    {item.tabLabel}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#E94B3C] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC DISCIPLINE CONTENT PANEL */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-[#F5F4F1] rounded-[20px] border border-[rgba(28,37,51,0.08)] p-6 sm:p-8 lg:p-10 shadow-2xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column (~55%): Title, Description, Software Tags, Action CTA */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-sm bg-[#E94B3C]" />
                      <span className="text-[11px] font-bold text-[#E94B3C] uppercase tracking-[0.14em]">
                        {current.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C2533] tracking-tight leading-tight">
                      {current.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[#1C2533]/80 italic leading-snug">
                      {current.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#687282] font-normal leading-relaxed">
                    {current.description}
                  </p>

                  {/* Software & Tools Tags */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold text-[#9299A3] uppercase tracking-wider block">
                      Core Tools &amp; Workflows Covered:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {current.software.map((tool, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04, duration: 0.2 }}
                          className="px-2.5 py-1 rounded-[6px] bg-white border border-[rgba(28,37,51,0.10)] text-xs font-semibold text-[#1C2533] shadow-2xs flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C]" />
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <MagneticButton strength={0.3}>
                      <Button onClick={onOpenDemo} variant="primary" size="md">
                        {current.cta}
                      </Button>
                    </MagneticButton>

                    <a
                      href="#features"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1C2533] hover:text-[#E94B3C] transition-colors py-2 px-3"
                    >
                      <span>View Full Curriculum</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Column (~45%): Contextual High-Resolution Discipline Image */}
                <div className="lg:col-span-5 h-[240px] sm:h-[300px] lg:h-[340px] rounded-[16px] overflow-hidden border border-[rgba(28,37,51,0.12)] shadow-sm relative group">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A20]/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white/90 flex items-center gap-1.5 bg-[#171A20]/60 backdrop-blur-sm px-2.5 py-1 rounded-[6px] border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Project Work &amp; Certification</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E94B3C] bg-white/90 px-2 py-0.5 rounded-[4px]">
                      {current.tabLabel.split(' ')[0]}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
