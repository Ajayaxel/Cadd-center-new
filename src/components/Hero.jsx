import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, Menu, X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import useOverlayHistory from '../hooks/useOverlayHistory';

const BANNERS = [
  {
    id: 'arch-bim',
    title: 'Architectural & BIM Modeling',
    image: '/banners/architectural_bim.jpg',
    tag: 'Revit • AutoCAD • BIM',
  },
  {
    id: 'mechanical-cad',
    title: 'Mechanical & Industrial CAD/CAM',
    image: '/banners/mechanical_cad.jpg',
    tag: 'SolidWorks • CATIA • Creo',
  },
  {
    id: 'interior-design',
    title: 'Interior Design & 3D Visualization',
    image: '/banners/interior_design.jpg',
    tag: '3ds Max • V-Ray • SketchUp',
  },
  {
    id: 'civil-structural',
    title: 'Civil & Structural Infrastructure',
    image: '/banners/civil_structural.jpg',
    tag: 'Civil 3D • STAAD.Pro • ETABS',
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function Hero({ onOpenDemo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Back / swipe-back closes the menu instead of leaving the site.
  useOverlayHistory(mobileMenuOpen, () => setMobileMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    setProgress(0);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Auto-scroll effect with progress timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const intervalTime = 50; // Update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          nextSlide();
          return 0;
        }
        return prevProgress + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, nextSlide]);

  const currentBanner = BANNERS[currentIndex];

  return (
    <section 
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-none bg-[#060C16]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* ========================================================= */}
      {/* FULL-BLEED AUTO-SCROLLING BANNER IMAGE CAROUSEL           */}
      {/* ========================================================= */}
      {BANNERS.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
              index === currentIndex ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Dark Translucent Gradient Overlay for High Text Contrast */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(8, 14, 24, 0.65) 0%, rgba(10, 20, 35, 0.40) 40%, rgba(6, 12, 22, 0.85) 100%)'
            }}
          />
          
          {/* Subtle Vignette Gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 25% 75%, rgba(6, 12, 22, 0.82) 0%, transparent 65%)'
            }}
          />
        </div>
      ))}

      {/* ========================================================= */}
      {/* TOP INTEGRATED NAVIGATION BAR                             */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-40 pointer-events-auto transition-[background-color,backdrop-filter,box-shadow,padding] duration-300 ease-out ${
          scrolled
            ? 'bg-[#080D14]/92 backdrop-blur-md border-b border-white/10 shadow-lg py-3 sm:py-3.5'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex items-center justify-between">
        
          {/* Brand Logo: Official CADD Centre Perinthalmanna Red Logo */}
          <a
            href="#"
            className="flex items-center group cursor-pointer focus:outline-none shrink-0"
            aria-label="CADD Centre Perinthalmanna Home"
          >
            <img
              src="/CADD.png"
              alt="CADD Centre Perinthalmanna"
              className="h-10 sm:h-12 lg:h-[54px] w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            <a
              href="#about"
              className="text-[13.5px] font-medium text-white/90 hover:text-white transition-colors"
            >
              About Us
            </a>
            <a
              href="#features"
              className="text-[13.5px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Courses
            </a>
            <a
              href="#placement"
              className="text-[13.5px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Placements
            </a>
            <a
              href="#events"
              className="text-[13.5px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Events
            </a>
            <a
              href="#testimonials"
              className="text-[13.5px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Reviews
            </a>

            {/* Dark Translucent Contact Us Button */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="bg-[#071724]/90 hover:bg-[#071724] border border-white/25 hover:border-white/50 text-white text-[13.5px] font-medium px-4.5 py-2 rounded-[8px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenDemo}
              className="bg-[#071724]/90 border border-white/20 text-white text-[11px] font-medium px-3 py-1.5 rounded-[6px]"
            >
              Enquire
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-[6px] bg-[#071724]/90 text-white border border-white/20"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 inset-x-4 z-40 bg-[#071724]/95 backdrop-blur-lg border border-white/20 rounded-[14px] p-4 flex flex-col gap-3 md:hidden shadow-2xl">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/90 hover:text-white py-1"
          >
            About Us
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/90 hover:text-white py-1"
          >
            Courses
          </a>
          <a
            href="#placement"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/90 hover:text-white py-1"
          >
            Placements
          </a>
          <a
            href="#events"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/90 hover:text-white py-1"
          >
            Events
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/90 hover:text-white py-1"
          >
            Reviews
          </a>
        </div>
      )}

      {/* ========================================================= */}
      {/* LOWER-LEFT ORIGINAL HERO HEADLINE & CONTENT               */}
      {/* ========================================================= */}
      <div className="absolute bottom-10 sm:bottom-14 lg:bottom-16 xl:bottom-20 left-6 sm:left-10 lg:left-14 xl:left-20 z-20 max-w-2xl text-left pointer-events-auto">
        
        {/* Active Project Banner Badge & Eyebrow */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3">
          <span className="text-[11px] sm:text-[12px] font-bold text-[#E94B3C] uppercase tracking-[0.18em]">
            BEST CAD & BIM TRAINING CENTRE IN PERINTHALMANNA
          </span>
          <span className="text-white/40 text-xs">•</span>
          <span key={`banner-tag-${currentIndex}`} className="text-[10.5px] font-semibold text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 animate-[fadeIn_0.5s_ease-out]">
            {currentBanner.title}
          </span>
        </div>

        {/* Dominant Original Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-white tracking-[-0.02em] leading-[1.08] sm:leading-[1.1]">
          Learn the Skills.<br />
          Build Your Future.
        </h1>

        {/* Original Description */}
        <p className="mt-3.5 sm:mt-4 text-xs sm:text-[14px] text-white/85 font-normal leading-relaxed max-w-[500px]">
          Industry-focused CAD, BIM and engineering design training to build practical skills and prepare you for real-world career opportunities.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="mt-6 sm:mt-7 flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Primary CTA */}
          <a
            href="#features"
            className="bg-[#E94B3C] hover:bg-[#D4382A] text-white px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-[10px] text-xs sm:text-[13.5px] font-bold inline-flex items-center gap-1.5 shadow-[0_4px_16px_rgba(233,75,60,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Explore Courses</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={onOpenDemo}
            className="bg-[#071724]/80 hover:bg-[#071724] border border-white/20 hover:border-white/40 text-white px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-[10px] text-xs sm:text-[13.5px] font-semibold inline-flex items-center gap-1.5 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LOWER-RIGHT CAROUSEL CONTROLS & FLOATING NEWS CARD        */}
      {/* ========================================================= */}
      <div className="hidden sm:flex absolute bottom-10 sm:bottom-14 lg:bottom-16 xl:bottom-20 right-6 sm:right-10 lg:right-14 xl:right-20 z-20 pointer-events-auto flex-col items-end gap-3">
        
        {/* Floating Controls & Navigation Bar */}
        <div className="bg-[#071724]/85 backdrop-blur-md border border-white/20 rounded-[14px] p-2.5 shadow-2xl flex items-center gap-3">
          
          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Dots / Progress Bar Indicators */}
          <div className="flex items-center gap-2">
            {BANNERS.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`relative h-2.5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${
                  index === currentIndex
                    ? 'w-10 bg-white/30'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              >
                {index === currentIndex && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#E94B3C] rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Pause / Play Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause Auto-scroll' : 'Play Auto-scroll'}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Slide Counter */}
          <span className="text-[11px] font-bold text-white/80 tabular-nums pl-1 border-l border-white/15">
            0{currentIndex + 1} / 0{BANNERS.length}
          </span>
        </div>

        {/* Original Lower-Right Latest News Floating Card */}
        <div className="w-[220px] sm:w-[245px] bg-[#071724]/85 backdrop-blur-md border border-white/20 rounded-[12px] p-4 shadow-2xl text-left transition-transform duration-200 hover:scale-[1.03] group cursor-pointer">
          
          {/* Small Label */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
              Latest News
            </span>
          </div>

          {/* News Headline */}
          <p className="text-[11.5px] font-medium text-white/95 leading-snug line-clamp-2">
            New courses, workshops and placement opportunities at CADD Centre Perinthalmanna.
          </p>

          {/* Read More Link */}
          <a
            href="#events"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E94B3C] hover:text-[#ff6354] transition-colors mt-2.5 group-hover:underline"
          >
            <span>Read More</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Progress Bar Indicator across full screen width */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-30">
        <div
          className="h-full bg-[#E94B3C] transition-all duration-75 ease-linear shadow-[0_0_8px_#E94B3C]"
          style={{ width: `${((currentIndex + progress / 100) / BANNERS.length) * 100}%` }}
        />
      </div>

    </section>
  );
}


