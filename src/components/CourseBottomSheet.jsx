import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MapPin, Layers, GraduationCap, Briefcase, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';

// How far down the sheet has to be pulled before letting go dismisses it
// instead of springing back.
const DISMISS_DISTANCE = 130;

export default function CourseBottomSheet({ isOpen, onClose, course, onOpenDemo, badgeLabel }) {
  const sheetRef = useRef(null);
  const scrollRef = useRef(null);
  // The pull-to-dismiss gesture is the mobile bottom-sheet affordance; on
  // desktop the sheet is a centred dialog and keeps click-to-close only.
  const [isSheet, setIsSheet] = useState(false);
  // How far the sheet is currently pulled down, in px. 0 = resting.
  const [dragY, setDragY] = useState(0);
  // While a finger is down the sheet tracks it 1:1 with no transition; on
  // release the transition comes back so it springs home or slides away.
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const sync = () => setIsSheet(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // A fresh course reuses the same sheet, so reset scroll and drag offset.
  useEffect(() => {
    if (!isOpen) return;
    setDragY(0);
    setDragging(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isOpen, course?.id]);

  /**
   * Pull-to-dismiss.
   *
   * Framer Motion's own `drag` prop is deliberately not used here: it stamps
   * `touch-action: pan-x` on the sheet, which would stop the syllabus inside
   * from scrolling at all on a touch screen. This listener instead defers to
   * the scroll container and only claims the gesture once the content is at
   * the top AND the finger is clearly heading downwards — so reading scrolls,
   * and only a deliberate downward pull from the top dismisses.
   */
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!isOpen || !isSheet || !sheet) return undefined;

    let startX = 0;
    let startY = 0;
    let claimed = false;
    // Set once a touch has shown itself to be a horizontal or upward gesture,
    // so nothing later in the same touch can turn it into a pull-down.
    let released = false;
    let offset = 0;

    const handleStart = (event) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      claimed = false;
      released = false;
      offset = 0;
    };

    const handleMove = (event) => {
      if (released || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - startX;
      const delta = event.touches[0].clientY - startY;
      const scroller = scrollRef.current;
      const atTop = !scroller || scroller.scrollTop <= 0;

      if (!claimed) {
        // Wait for 10px of travel so a tap never moves the sheet, then decide
        // the gesture by its dominant axis exactly once: sideways or upward is
        // handed to the browser for the rest of the touch (the syllabus may
        // scroll; a horizontal flick does nothing), and only a downward pull
        // that starts with the content at the top claims the sheet.
        if (Math.abs(dx) < 10 && Math.abs(delta) < 10) return;
        if (!atTop || delta <= 0 || Math.abs(dx) > delta) {
          released = true;
          return;
        }
        claimed = true;
        setDragging(true);
      }

      // Stops the page (and Lenis) from scrolling underneath mid-pull.
      event.preventDefault();
      // Mild resistance so a long pull feels weighted rather than loose.
      offset = delta < 0 ? 0 : delta * 0.92;
      setDragY(offset);
    };

    const handleEnd = () => {
      if (!claimed) return;
      claimed = false;
      setDragging(false);
      if (offset > DISMISS_DISTANCE) {
        // Slide the rest of the way out, then unmount behind the animation.
        setDragY(window.innerHeight);
        onClose();
      } else {
        setDragY(0);
      }
    };

    sheet.addEventListener('touchstart', handleStart, { passive: true });
    sheet.addEventListener('touchmove', handleMove, { passive: false });
    sheet.addEventListener('touchend', handleEnd);
    sheet.addEventListener('touchcancel', handleEnd);

    return () => {
      sheet.removeEventListener('touchstart', handleStart);
      sheet.removeEventListener('touchmove', handleMove);
      sheet.removeEventListener('touchend', handleEnd);
      sheet.removeEventListener('touchcancel', handleEnd);
    };
  }, [isOpen, isSheet, course?.id, onClose]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto font-['Plus_Jakarta_Sans',sans-serif]"
        >
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal / Bottom Sheet Container. The outer element owns the
              open/close animation, the inner one owns the drag transform, so
              the two never fight over the same `transform`. */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={isSheet ? { y: 40, opacity: 0 } : { y: 30, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col z-10"
          >
          <div
            ref={sheetRef}
            style={{
              transform: dragY ? `translateY(${dragY}px)` : undefined,
              transition: dragging ? 'none' : 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="bg-white rounded-t-[28px] sm:rounded-[24px] shadow-2xl border border-[rgba(28,37,51,0.12)] overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col min-h-0 overscroll-contain"
          >

            {/* Grab handle — the visible cue that the sheet can be pulled down. */}
            <div className="sm:hidden shrink-0 pt-2.5 pb-1 bg-[#F5F4F1] flex justify-center">
              <span className="w-10 h-1 rounded-full bg-[rgba(28,37,51,0.18)]" aria-hidden="true" />
            </div>
            
            {/* Top Bar chip & Close Button. `badgeLabel` pins the chip to the canonical
                name of the record that was clicked (disciplines pass their `title`), so the
                chip, the heading below and the card can never show different names. */}
            <div className="px-6 sm:px-8 pt-5 pb-4 bg-[#F5F4F1] border-b border-[rgba(28,37,51,0.08)] flex items-center justify-between shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#E94B3C]/10 border border-[#E94B3C]/20 text-[#E94B3C] text-[11px] font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-sm bg-[#E94B3C]" />
                {badgeLabel || course.category}
              </span>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-[8px] bg-white hover:bg-slate-200 text-[#1C2533] flex items-center justify-center transition-colors cursor-pointer border border-[rgba(28,37,51,0.08)] shadow-2xs"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Sheet Content with native smooth scrolling */}
            <div 
              data-lenis-prevent="true"
              ref={scrollRef}
              className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              
              {/* Title & Description Header */}
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C2533] tracking-tight leading-tight">
                  {course.title}
                </h3>
                {(course.description || course.tagline) && (
                  <p className="text-xs sm:text-sm text-[#687282] leading-relaxed font-normal">
                    {course.description || course.tagline}
                  </p>
                )}
              </div>

              {/* Popular Areas & Tools Covered (Grouped or Badges) */}
              {(course.toolGroups || course.toolsCovered) && (course.toolGroups || course.toolsCovered).length > 0 ? (
                <div className="space-y-3 pt-1">
                  <h4 className="text-[11px] font-bold text-[#1C2533] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E94B3C]" />
                    <span>Popular Areas &amp; Tools Covered</span>
                  </h4>
                  {/* items-start keeps each card at its natural content height; min-w-0
                      stops a long chip ("Autodesk Construction Cloud") from blowing the
                      grid track out on 320px screens. A lone trailing card spans both
                      columns from sm: up so an odd count never leaves a half-width stub. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                    {(course.toolGroups || course.toolsCovered).map((group, idx, arr) => (
                      <div
                        key={idx}
                        className={`min-w-0 bg-[#F5F4F1] p-3.5 rounded-[12px] border border-[rgba(28,37,51,0.08)] space-y-2 ${
                          arr.length % 2 === 1 && idx === arr.length - 1 ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <span className="text-xs font-bold text-[#1C2533] block leading-snug break-words">{group.category}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.tools.map((tool, tIdx) => (
                            <span 
                              key={tIdx}
                              className="inline-flex items-center max-w-full px-2.5 py-1 rounded-[6px] bg-white border border-[rgba(28,37,51,0.10)] text-[11px] font-semibold text-[#1C2533] shadow-2xs leading-normal text-left break-words"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : course.popularAreas && course.popularAreas.length > 0 ? (
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-[11px] font-bold text-[#1C2533] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E94B3C]" />
                    <span>Popular Areas &amp; Tools Covered</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.popularAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-[8px] bg-[#F5F4F1] border border-[rgba(28,37,51,0.10)] text-xs font-bold text-[#1C2533] shadow-2xs flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C]" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Complete End-to-End Workflow Pipeline */}
              {course.workflow && course.workflow.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-[rgba(28,37,51,0.08)]">
                  <h4 className="text-[11px] font-bold text-[#1C2533] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E94B3C]" />
                    <span>Complete Industry Workflow</span>
                  </h4>
                  <div className="bg-[#F5F4F1] p-4 rounded-[14px] border border-[rgba(28,37,51,0.08)]">
                    <div className="flex flex-wrap items-center gap-2">
                      {course.workflow.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <div className="px-3 py-1.5 bg-white rounded-[8px] border border-[rgba(28,37,51,0.10)] text-xs font-bold text-[#1C2533] shadow-2xs flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-[#E94B3C] text-white text-[9px] font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                          {idx < course.workflow.length - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-[#E94B3C] shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Key Learning Outcomes */}
              {((course.keyModules && course.keyModules.length > 0) || (course.outcomes && course.outcomes.length > 0)) && (
                <div className="space-y-2.5 pt-3 border-t border-[rgba(28,37,51,0.08)]">
                  <h4 className="text-[11px] font-bold text-[#1C2533] uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#E94B3C]" />
                    <span>Key Learning Outcomes &amp; Workflows</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(course.keyModules || course.outcomes.map(o => typeof o === 'string' ? o : `${o.title} — ${o.description}`)).map((module, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2 bg-[#F5F4F1] p-3 rounded-[10px] border border-[rgba(28,37,51,0.08)] shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-[#1C2533] leading-snug">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Opportunities */}
              {course.careerPaths && course.careerPaths.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-[rgba(28,37,51,0.08)]">
                  <h4 className="text-[11px] font-bold text-[#1C2533] uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#E94B3C]" />
                    <span>Career Opportunities</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careerPaths.map((path, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 rounded-[6px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold"
                      >
                        {path}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Local SEO Badge */}
              {course.seoLocation && (
                <div className="p-3 rounded-[10px] bg-[#F5F4F1] border border-[rgba(28,37,51,0.08)] text-[#687282] text-xs font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E94B3C] shrink-0" />
                  <span className="leading-relaxed">{course.seoLocation}</span>
                </div>
              )}

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 sm:p-5 bg-[#F5F4F1] border-t border-[rgba(28,37,51,0.08)] flex items-center justify-between gap-4 shrink-0">
              <div>
                <p className="text-xs font-bold text-[#1C2533] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E94B3C]" />
                  <span>CADD Centre Perinthalmanna</span>
                </p>
                <p className="text-[11px] text-[#687282]">Admissions &amp; Placement Guidance Open</p>
              </div>

              <Button
                onClick={() => {
                  onClose();
                  if (onOpenDemo) onOpenDemo();
                }}
                variant="primary"
                size="md"
              >
                Enquire Now
              </Button>
            </div>

          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
