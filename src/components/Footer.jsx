import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Navigation, 
  Award,
  Layers,
  Compass,
  Wrench,
  Cpu,
  ShieldCheck,
  BarChart3,
  Globe,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onOpenDemo }) {
  const footerRef = useRef(null);
  const newsletterCardRef = useRef(null);
  const mainFooterRef = useRef(null);
  const columnsRef = useRef(null);
  const affiliationsRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        if (newsletterCardRef.current) {
          gsap.fromTo(
            newsletterCardRef.current,
            { autoAlpha: 0, y: 35, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: newsletterCardRef.current,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }

        if (columnsRef.current) {
          const cols = columnsRef.current.children;
          gsap.fromTo(
            cols,
            { autoAlpha: 0, y: 25 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.06,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: mainFooterRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const popularCourses = [
    'Civil CADD',
    'Mechanical CADD',
    'Electrical CADD',
    'BIM & Revit',
    'MEP Training',
    'Interior Design',
    'CAD CAM & CAE',
    'STAAD.Pro',
    'Project Planning & Management'
  ];

  const affiliations = [
    { title: 'Autodesk Authorized', desc: 'Training Partner', icon: <Layers className="w-4 h-4 text-[#E94B3C]" /> },
    { title: 'Bentley Systems', desc: 'Channel Partner', icon: <Compass className="w-4 h-4 text-[#E94B3C]" /> },
    { title: 'Dassault Systèmes', desc: 'SOLIDWORKS Partner', icon: <Wrench className="w-4 h-4 text-[#E94B3C]" /> },
    { title: 'PTC Creo Network', desc: 'Authorized Workflows', icon: <Cpu className="w-4 h-4 text-[#E94B3C]" /> },
    { title: 'ISO 9001:2015', desc: 'Certified Quality', icon: <ShieldCheck className="w-4 h-4 text-[#E94B3C]" /> },
    { title: 'PMI Standards', desc: 'Project Management', icon: <BarChart3 className="w-4 h-4 text-[#E94B3C]" /> }
  ];

  return (
    <footer id="contact" ref={footerRef} className="bg-[#070D18] pt-12 pb-8 px-3 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] relative text-white">
      <div className="max-w-[1400px] mx-auto">

        {/* ========================================================= */}
        {/* 1. TOP FLOATING GRADIENT CTA CARD (MATCHING REFERENCE MODEL) */}
        {/* ========================================================= */}
        <div ref={newsletterCardRef} className="relative z-20 w-full max-w-[1400px] mx-auto -mb-16 sm:-mb-20 px-2 sm:px-4">
          <div className="bg-gradient-to-r from-[#0B1322] via-[#E94B3C]/90 to-[#0B1322] rounded-[24px] sm:rounded-[36px] border border-white/20 shadow-[0_20px_50px_rgba(233,75,60,0.25)] p-8 sm:p-12 text-center text-white relative overflow-hidden">
            
            {/* Subtle Inner Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
                Ready to transform your CAD &amp; BIM engineering career?
              </h3>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-2xl mx-auto">
                Book a free career evaluation session and discover how CADD Centre Perinthalmanna can launch your professional career across India &amp; the Middle East.
              </p>

              <div className="pt-2">
                <MagneticButton strength={0.3}>
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-[#0B1322] text-xs sm:text-sm font-extrabold px-7 py-3.5 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Book Free Career Evaluation</span>
                    <ArrowUpRight className="w-4 h-4 text-[#E94B3C]" />
                  </button>
                </MagneticButton>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN FOOTER CARD CONTAINER (MATCHING REFERENCE MODEL)  */}
        {/* ========================================================= */}
        <div 
          ref={mainFooterRef}
          className="bg-white rounded-[28px] sm:rounded-[36px] border border-slate-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.06)] pt-16 sm:pt-20 pb-6 px-6 sm:px-10 lg:px-12 text-[#1C2533] space-y-6"
        >

          {/* ======================================================= */}
          {/* HEADER ROW: BRAND LOGO + SLOGAN TAGLINE                 */}
          {/* ======================================================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <a 
              href="#"
              className="flex items-center select-none cursor-pointer focus:outline-none"
              aria-label="CADD Centre Perinthalmanna Home"
            >
              <img
                src="/logo-color.png"
                alt="CADD Centre Perinthalmanna"
                className="h-9 sm:h-11 w-auto max-w-[210px] object-contain shrink-0"
              />
            </a>

            <p className="text-xs sm:text-sm text-slate-500 font-semibold text-center sm:text-right max-w-md leading-relaxed">
              Industry-focused technical training in CAD, BIM, MEP, Interior Design &amp; Project Management.
            </p>
          </div>

          {/* ======================================================= */}
          {/* MIDDLE 4-COLUMN GRID                                    */}
          {/* ======================================================= */}
          <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-0 items-start">

            {/* Column 1: Quick Links (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-extrabold text-[#1C2533] text-sm sm:text-base tracking-tight">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-600">
                <li>
                  <a href="#" className="hover:text-[#E94B3C] transition-colors block cursor-pointer">Home</a>
                </li>
                <li><a href="#about" className="hover:text-[#E94B3C] transition-colors block">About Us</a></li>
                <li><a href="#features" className="hover:text-[#E94B3C] transition-colors block">Courses</a></li>
                <li><a href="#placement" className="hover:text-[#E94B3C] transition-colors block">Placements</a></li>
                <li><a href="#events" className="hover:text-[#E94B3C] transition-colors block">Campus Happenings &amp; Reels</a></li>
                <li><a href="#testimonials" className="hover:text-[#E94B3C] transition-colors block">Student Reviews</a></li>
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#E94B3C] transition-colors text-left cursor-pointer font-bold text-[#E94B3C] flex items-center gap-1">
                    <span>Enquiry</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Popular Courses (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-extrabold text-[#1C2533] text-sm sm:text-base tracking-tight">
                Popular Courses
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-slate-600">
                {popularCourses.map((course, idx) => (
                  <li key={idx}>
                    <a
                      href="#features"
                      className="hover:text-[#E94B3C] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C] shrink-0 group-hover:scale-125 transition-transform" />
                      <span>{course}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info with Icons (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-extrabold text-[#1C2533] text-sm sm:text-base tracking-tight">
                Contact Us
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm">
                
                {/* Email Pill */}
                <a 
                  href="mailto:perinthalmanna@caddcentre.com"
                  className="flex items-center gap-3 text-slate-600 hover:text-[#E94B3C] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/20 text-[#E94B3C] flex items-center justify-center shrink-0 group-hover:bg-[#E94B3C] group-hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold break-all">perinthalmanna@caddcentre.com</span>
                </a>

                {/* Phone Pill */}
                <div className="flex items-start gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/20 text-[#E94B3C] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5 font-semibold text-slate-700">
                    <a href="tel:+917025569638" className="block hover:text-[#E94B3C] transition-colors">+91 70255 69638</a>
                    <a href="tel:+919544369638" className="block hover:text-[#E94B3C] transition-colors">+91 95443 69638</a>
                    <a href="tel:+919037065638" className="block hover:text-[#E94B3C] transition-colors">+91 90370 65638</a>
                  </div>
                </div>

                {/* Location Pill */}
                <a
                  href="https://www.google.com/maps/dir//CADD+Centre+%7C+CAD+%7C+Interior+Design+%7C+BIM+%7C+MEP+HVAC+Primavera+Autodesk+Product+Design+Training+in+Perinthalmanna,+Malappuram,+Livehi+Arcade,+calicut+road,+above+beautymark+gold,+Perinthalmanna,+Kerala+679321/@11.4682133,76.0043726,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba7cdac0c7c3403:0x4ef801508b806928!2m2!1d76.2222835!2d10.9766876!5m1!1e1?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-600 hover:text-[#E94B3C] transition-colors group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/20 text-[#E94B3C] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#E94B3C] group-hover:text-white transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold leading-snug">
                    Livehi Arcade, Calicut Road, Above BeautyMark Gold, Perinthalmanna, Kerala 679321
                  </span>
                </a>

              </div>
            </div>

            {/* Column 4: Location Selector & Social Icons (3 Cols - Matching Reference Right) */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between space-y-5">
              
              {/* Location Pill Selector (Reference Style) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 shadow-xs cursor-pointer hover:bg-slate-100 transition-colors">
                <Globe className="w-3.5 h-3.5 text-[#E94B3C]" />
                <span>Perinthalmanna, Kerala</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>

              {/* Social Media Buttons Row (Reference Round Icons) */}
              <div className="space-y-2 text-left lg:text-right">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Follow Us</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert("LinkedIn page is coming soon!")}
                    className="w-8.5 h-8.5 rounded-full bg-[#1C2533] hover:bg-[#0077B5] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    title="LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </button>

                  <a
                    href="https://www.instagram.com/caddcentreperinthalmanna/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#1C2533] hover:bg-[#E4405F] text-white flex items-center justify-center transition-colors shadow-sm"
                    title="Instagram"
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/caddperinthalmanna/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#1C2533] hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors shadow-sm"
                    title="Facebook"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCQrSb2fliQEcoNEZohB0Rdg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8.5 h-8.5 rounded-full bg-[#1C2533] hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors shadow-sm"
                    title="YouTube"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* ======================================================= */}
          {/* AFFILIATIONS & INDUSTRY RECOGNITION ROW                 */}
          {/* ======================================================= */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#E94B3C]" />
              <span className="text-[10.5px] font-extrabold text-[#1C2533] uppercase tracking-[0.14em]">
                AFFILIATIONS &amp; INDUSTRY RECOGNITION
              </span>
            </div>

            <div ref={affiliationsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {affiliations.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-left border-l-2 border-[#E94B3C]/30 pl-2 py-0.5 hover:border-[#E94B3C] transition-all group"
                >
                  <div className="p-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs group-hover:bg-[#E94B3C]/10 transition-all shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[11.5px] font-bold text-[#1C2533] leading-snug group-hover:text-[#E94B3C] transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[10.5px] text-slate-500 leading-tight truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================= */}
          {/* BOTTOM LEGAL & COPYRIGHT ROW (MATCHING REFERENCE MODEL) */}
          {/* ======================================================= */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
            <p>© 2026 CADD Centre Perinthalmanna. All rights reserved.</p>

            <div className="flex items-center gap-5 text-slate-500 font-medium text-xs">
              <a href="#" className="hover:text-[#E94B3C] transition-colors">Terms &amp; Conditions</a>
              <a href="#" className="hover:text-[#E94B3C] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E94B3C] transition-colors">Cookies</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

