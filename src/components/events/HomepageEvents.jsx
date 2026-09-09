import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { EVENT_CATEGORIES } from '../../data/mockEvents';

// Vertical 9:16 "reel" card matching the reference screenshot layout
function EventReelCard({ evt }) {
  const href = evt.instagram_url || null;
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative block aspect-[9/16] w-full rounded-[20px] overflow-hidden border border-white/15 bg-[#121620] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#E94B3C] hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(233,75,60,0.3)] focus:outline-none select-none cursor-pointer"
    >
      {/* Background Cover Image */}
      <img
        src={evt.cover_image}
        alt={evt.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
      />

      {/* Dark Scrim Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/55 to-black/30 pointer-events-none" />

      {/* Top Left Category Pill Tag */}
      <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider bg-[#080D14]/85 backdrop-blur-md text-white border border-white/20 shadow-md">
        #{evt.category}
      </span>

      {/* Top Right Instagram Reel Icon Badge */}
      {evt.instagram_url && (
        <span className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-[#E94B3C] group-hover:scale-110 transition-all shadow-md">
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </span>
      )}

      {/* Center Play Button Overlay on Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-[#E94B3C]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm transform group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute inset-x-0 bottom-0 p-4 space-y-1.5 z-10 text-left">
        <h3 className="text-sm font-extrabold text-white tracking-tight leading-snug line-clamp-2 group-hover:text-[#FF8476] transition-colors">
          {evt.title}
        </h3>

        <p className="text-[11px] text-slate-300 font-normal leading-relaxed line-clamp-2 opacity-90">
          {evt.description}
        </p>

        {evt.instagram_url && (
          <div className="pt-2 mt-1 border-t border-white/15 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400">
              Watch on Instagram
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E94B3C] group-hover:text-white transition-colors">
              <span>Watch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default function HomepageEvents({ events = [], onOpenDemo }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef(null);

  const displayEvents = events
    .filter((e) => e.status === 'published')
    .filter((e) => selectedCategory === 'All' || e.category === selectedCategory)
    .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

  const total = displayEvents.length;

  // Create a 4x quadrupled array for a 100% seamless infinite marquee loop
  const loopedEvents = total > 0
    ? [...displayEvents, ...displayEvents, ...displayEvents, ...displayEvents]
    : [];

  // Smooth continuous auto-sliding effect with invisible infinite loop wrap
  useEffect(() => {
    if (isHovered || total === 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const scrollStep = () => {
      const singleSetWidth = container.scrollWidth / 4;
      if (singleSetWidth > 0) {
        // When scroll reaches 2x single set width, seamlessly subtract 1x single set width
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        } else {
          container.scrollLeft += 0.75; // Smooth 0.75px continuous movement
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, displayEvents, total]);

  const scrollLeftNav = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = container.scrollWidth / 4;
      if (container.scrollLeft <= singleSetWidth) {
        container.scrollLeft += singleSetWidth;
      }
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRightNav = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = container.scrollWidth / 4;
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      }
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="events"
      className="py-16 sm:py-24 bg-[#0B0E14] text-white font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden"
    >
      <div id="news" className="absolute -top-12 left-0 pointer-events-none" />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E94B3C]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================= */}
        {/* TOP SECTION HEADER (CENTER ALIGNED MATCHING REFERENCE)   */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          
          {/* Centered Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/30 text-[#E94B3C] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.18em] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E94B3C] animate-pulse" />
            <span>CAMPUS HAPPENINGS &amp; REELS</span>
          </div>

          {/* Centered Dominant Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.06]">
            More Than a Classroom.<br />
            <span className="text-[#E94B3C]">A Community That Builds Careers.</span>
          </h2>

          {/* Centered Subtitle Description */}
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Workshops, industry visits, practical setting-out, celebrations and campus life reels from CADD Centre Perinthalmanna.
          </p>

          {/* Action Row: Navigation Arrows + Admissions Button */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeftNav}
                aria-label="Previous reels"
                className="w-10 h-10 rounded-full bg-[#121620] border border-white/15 hover:bg-[#E94B3C] hover:border-[#E94B3C] text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollRightNav}
                aria-label="Next reels"
                className="w-10 h-10 rounded-full bg-[#121620] border border-white/15 hover:bg-[#E94B3C] hover:border-[#E94B3C] text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Button onClick={onOpenDemo} variant="primary" size="md">
              Enquire Admissions
            </Button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* CENTERED CATEGORY FILTER CHIPS                            */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-3 mb-10 no-scrollbar">
          {EVENT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E94B3C] text-white shadow-lg shadow-[#E94B3C]/30 scale-105'
                    : 'bg-[#121620] text-slate-300 hover:bg-white/15 hover:text-white border border-white/15'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SEAMLESS INFINITE LOOP AUTO-SLIDING REEL CARDS STRIP      */}
        {/* ========================================================= */}
        {total > 0 ? (
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth select-none"
          >
            {loopedEvents.map((evt, idx) => (
              <div
                key={`${evt.id}-loop-${idx}`}
                className="shrink-0 w-[230px] sm:w-[260px] lg:w-[280px]"
              >
                <EventReelCard evt={evt} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#121620] rounded-[20px] border border-white/10 p-8">
            <p className="text-slate-400">No events found in this category.</p>
          </div>
        )}

        {/* ========================================================= */}
        {/* REFINED BOTTOM INSTAGRAM ARCHIVE BAR                      */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#E94B3C]" />
              <span>Explore the CADD Centre Experience</span>
            </h4>
            <p className="text-xs text-slate-400">
              Workshops · Industry Visits · Competitions · Celebrations · Placement Sessions
            </p>
          </div>

          <a
            href="https://www.instagram.com/caddcentreperinthalmanna/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E94B3C] hover:text-white bg-[#E94B3C]/10 border border-[#E94B3C]/30 hover:bg-[#E94B3C] px-5 py-2.5 rounded-full transition-all cursor-pointer group"
          >
            <span>Follow @caddcentreperinthalmanna</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}


