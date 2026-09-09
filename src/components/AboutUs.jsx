import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  Cpu, 
  PenTool, 
  Layers, 
  ShieldCheck,
  Wrench,
  BarChart3,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Compass
} from 'lucide-react';
import CourseBottomSheet from './CourseBottomSheet';
import useOverlayHistory from '../hooks/useOverlayHistory';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { disciplinesData } from '../data/disciplinesData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs({ onOpenDemo }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Back / swipe-back closes the sheet instead of leaving the site.
  useOverlayHistory(!!selectedCourse, () => setSelectedCourse(null));
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const legacyGridRef = useRef(null);
  const disciplinesHeaderRef = useRef(null);
  const disciplinesGridRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP & TABLET ANIMATIONS
      mm.add('(min-width: 768px)', () => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        if (legacyGridRef.current) {
          const cards = legacyGridRef.current.querySelectorAll('.legacy-card');
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 25 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: legacyGridRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        if (disciplinesGridRef.current) {
          const items = disciplinesGridRef.current.querySelectorAll('.discipline-card-item');
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: disciplinesGridRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const iconMap = {
    Palette: PenTool,
    Layers: Layers,
    Shield: ShieldCheck,
    Landmark: Building2,
    BarChart3: BarChart3,
    Building: Building2,
    Box: Cpu,
    Wrench: Wrench,
    Cpu: Cpu
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-[#070D18] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Background Ambient Glow & Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E94B3C]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#3B82F6]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-10 space-y-16 sm:space-y-20">
        
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/30 text-[#E94B3C] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.18em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            ABOUT CADD CENTRE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08]">
            A Global Learning Vision. <br className="hidden sm:inline" />
            <span className="text-[#E94B3C]">Closer to Perinthalmanna.</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Empowering engineering, architecture, and design professionals with world-class CAD/BIM education, certified curriculums, and direct industry mentorship.
          </p>
        </div>

        {/* ========================================================= */}
        {/* TOP FEATURE GRID: LEGACY & PHILOSOPHY (2 EQUAL COLUMNS)   */}
        {/* ========================================================= */}
        <div ref={legacyGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Legacy & Network */}
          <div className="legacy-card bg-[#0B1322] border border-white/10 hover:border-[#E94B3C]/40 rounded-[24px] p-6 sm:p-8 shadow-2xl flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E94B3C]/10 border border-[#E94B3C]/20 flex items-center justify-center text-[#E94B3C] group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Est. 1988
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#E94B3C] transition-colors">
                CADD Centre Legacy &amp; Network
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <strong className="text-white">CADD Centre Perinthalmanna</strong> brings industry-focused technical training in CAD, engineering, architecture, and design to students and professionals. Backed by CADD Centre’s legacy since <strong className="text-[#E94B3C]">1988</strong>, we focus on practical skills and career-ready learning.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3.5">
              <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#E94B3C] text-white text-xs font-black tracking-wider shadow-md shrink-0">
                1988
              </span>
              <p className="text-xs text-slate-300 font-semibold leading-normal">
                Empowering learners with industry-relevant technical skills since 1988.
              </p>
            </div>
          </div>

          {/* Card 2: Beyond Software Training */}
          <div className="legacy-card bg-[#0B1322] border border-white/10 hover:border-[#E94B3C]/40 rounded-[24px] p-6 sm:p-8 shadow-2xl flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E94B3C]/10 border border-[#E94B3C]/20 flex items-center justify-center text-[#E94B3C] group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Career Ready
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#E94B3C] transition-colors">
                Beyond Software Training
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Our focus goes beyond simply learning software tools. We aim to help students develop the practical skills, confidence, and professional domain knowledge needed to prepare for real-world career opportunities.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2.5 text-xs font-bold text-[#E94B3C] bg-[#E94B3C]/10 px-4 py-3 rounded-xl border border-[#E94B3C]/30 shadow-inner">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#E94B3C]" />
              <span>Practical, career-oriented education &amp; hands-on projects</span>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* DISCIPLINES SECTION: BALANCED 3x3 GRID (9 CARDS PERFECT)  */}
        {/* ========================================================= */}
        <div className="space-y-8">
          
          {/* Section Header */}
          <div ref={disciplinesHeaderRef} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E94B3C] uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>SPECIALIZED DISCIPLINES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Explore Industry Training in Perinthalmanna
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
              At CADD Centre Perinthalmanna, students explore comprehensive, hands-on training tailored for key engineering and design sectors:
            </p>
          </div>

          {/* Symmetrical 3x3 Grid (9 Cards) */}
          <div ref={disciplinesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {disciplinesData.map((discipline) => {
              const IconComp = iconMap[discipline.iconName] || Building2;
              return (
                <div
                  key={discipline.id}
                  onClick={() => setSelectedCourse(discipline)}
                  className="discipline-card-item bg-[#0B1322] border border-white/10 hover:border-[#E94B3C]/60 hover:bg-[#0E172A] rounded-[20px] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E94B3C]/10 border border-[#E94B3C]/20 flex items-center justify-center text-[#E94B3C] group-hover:bg-[#E94B3C] group-hover:text-white transition-all shadow-md">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#E94B3C]/20 flex items-center justify-center text-slate-400 group-hover:text-[#E94B3C] transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E94B3C] transition-colors mb-1">
                      {discipline.cardTitle}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      Hands-on curriculum &amp; software tools
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Bar */}
          <div className="bg-[#0B1322] border border-white/10 rounded-[22px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E94B3C]/10 border border-[#E94B3C]/20 flex items-center justify-center text-[#E94B3C] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                Industry-recognized certification &amp; placement guidance
              </span>
            </div>
            <Button onClick={onOpenDemo} variant="primary" size="sm">
              View All Details
            </Button>
          </div>

        </div>

      </div>

      {/* Course Details Bottom Sheet */}
      <CourseBottomSheet
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
        badgeLabel={selectedCourse?.title}
        onOpenDemo={onOpenDemo}
      />
    </section>
  );
}


