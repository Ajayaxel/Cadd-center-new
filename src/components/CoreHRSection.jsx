import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Single Portrait Card with crisp white border, squircle corners, and high-performance misty bottom dissolve
function PortraitCard({ img, alt, className = "" }) {
  return (
    <div className={`relative rounded-[22px] overflow-hidden border-[3.5px] border-white bg-slate-100 shadow-[0_12px_28px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer select-none ${className}`}>
      {/* Portrait Image */}
      <img
        src={img}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />

      {/* High-Performance Smooth Misty Bottom Dissolve (Zero Lag / GPU Friendly) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[48%] pointer-events-none bg-gradient-to-t from-white via-white/50 to-transparent"
      />
    </div>
  );
}

// 6-Card Animated Cluster (4 Visible in Fixed Layout + 2 Hidden Cycling Smoothly)
function SteppedFlowCluster({ items, isRight = false, interval = 3800, cardSize = "" }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  // Perfectly balanced slot positions with increased horizontal spacing between columns
  const getSlot = (slotIdx) => {
    const innerX = isRight ? -185 : 185;
    const offstageX = isRight ? 195 : -195;

    switch (slotIdx) {
      case 0: // Slot 0: Outer Top (Visible, Top Edge)
        return { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 10 };
      case 1: // Slot 1: Inner Top (Visible, Offset Downwards with clean spacious gap)
        return { x: innerX, y: 65, opacity: 1, scale: 1, zIndex: 15 };
      case 2: // Slot 2: Inner Bottom (Visible, Offset Upwards with clean spacious gap)
        return { x: innerX, y: 295, opacity: 1, scale: 1, zIndex: 15 };
      case 3: // Slot 3: Outer Bottom (Visible, Bottom Edge)
        return { x: 0, y: 360, opacity: 1, scale: 1, zIndex: 10 };
      case 4: // Slot 4: Just exited to edge (Hidden)
        return { x: offstageX, y: 360, opacity: 0, scale: 0.88, zIndex: 0 };
      default: // Slot 5: Waiting at top edge to enter (Hidden)
        return { x: offstageX, y: 0, opacity: 0, scale: 0.88, zIndex: 0 };
    }
  };

  return (
    <div className="relative w-[340px] xl:w-[360px] 2xl:w-[380px] h-[550px] xl:h-[575px] 2xl:h-[595px] pointer-events-auto">
      {items.map((card, i) => {
        // Calculate the current active slot (0 to 5) for this card
        const currentSlot = (i + step) % items.length;
        const style = getSlot(currentSlot);

        return (
          <motion.div
            key={card.id}
            initial={false}
            animate={{
              x: style.x,
              y: style.y,
              opacity: style.opacity,
              scale: style.scale,
              zIndex: style.zIndex,
            }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1], // Butter-smooth GPU spring easing
            }}
            className={`absolute ${isRight ? 'right-0' : 'left-0'} top-0 transform-gpu will-change-transform will-change-opacity`}
          >
            <PortraitCard
              img={card.img}
              alt={card.alt}
              className={cardSize}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function CoreHRSection({ onOpenDemo }) {
  // Left 6 Portraits: 4 visible on load in exact positions + 2 hidden in queue
  const leftCards = [
    { id: 'l-1', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80', alt: 'Outer Left Top' },
    { id: 'l-2', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80', alt: 'Inner Left Top' },
    { id: 'l-3', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80', alt: 'Inner Left Bottom' },
    { id: 'l-4', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80', alt: 'Outer Left Bottom' },
    { id: 'l-5', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80', alt: 'Hidden Left 1' },
    { id: 'l-6', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', alt: 'Hidden Left 2' }
  ];

  // Right 6 Portraits: 4 visible on load in exact positions + 2 hidden in queue
  const rightCards = [
    { id: 'r-1', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', alt: 'Outer Right Top' },
    { id: 'r-2', img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80', alt: 'Inner Right Top' },
    { id: 'r-3', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80', alt: 'Inner Right Bottom' },
    { id: 'r-4', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80', alt: 'Outer Right Bottom' },
    { id: 'r-5', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80', alt: 'Hidden Right 1' },
    { id: 'r-6', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80', alt: 'Hidden Right 2' }
  ];

  // Card dimensions perfectly matched to reference layout and scalable on wide screens
  const cardSize = "w-[136px] h-[168px] sm:w-[142px] sm:h-[175px] lg:w-[148px] lg:h-[182px] xl:w-[156px] xl:h-[192px] 2xl:w-[166px] 2xl:h-[204px]";

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] overflow-hidden min-h-[600px] lg:min-h-[660px] 2xl:min-h-[700px] flex items-center justify-center">

      {/* Top Connecting Luminous Pulse Line from Hero Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-36 pointer-events-none flex flex-col items-center z-10">
        <div className="w-[1.5px] h-full bg-gradient-to-b from-[rgba(240,82,87,0.6)] via-[rgba(240,82,87,0.25)] to-transparent" />
        <motion.div
          animate={{ y: [0, 140], opacity: [0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 w-2.5 h-2.5 rounded-full bg-[rgb(240,82,87)] shadow-[0_0_12px_rgb(240,82,87)] transform-gpu will-change-transform"
        />
      </div>

      {/* High-Performance Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] lg:w-[1100px] h-[500px] bg-gradient-to-r from-purple-100/35 via-slate-100/40 to-indigo-100/35 rounded-full blur-3xl pointer-events-none transform-gpu" />

      {/* Main Container matching the exact reference layout & proportions */}
      <div className="relative w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex flex-col lg:flex-row items-center justify-between lg:h-[560px] 2xl:h-[600px]">

        {/* ========================================================= */}
        {/* LEFT ANIMATED 6-CARD FLOW CLUSTER (4 Visible + 2 Hidden) */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-1 justify-start">
          <SteppedFlowCluster
            items={leftCards}
            isRight={false}
            interval={3800}
            cardSize={cardSize}
          />
        </div>

        {/* ========================================================= */}
        {/* CENTER CONTENT BLOCK ("Core HR solutions") */}
        {/* ========================================================= */}
        <div className="relative z-20 text-center max-w-[420px] xl:max-w-[450px] mx-auto px-4 flex flex-col items-center flex-shrink-0 my-8 lg:my-0">

          {/* Soft Squircle Icon Box with User Icon & Radar Aura Pulse */}
          <div className="relative mb-6">
            {/* Luminous Radar Pulse Rings */}
            <motion.div
              animate={{ scale: [1, 1.45, 1.8], opacity: [0.45, 0.18, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl bg-[rgb(240,82,87)]/20 pointer-events-none transform-gpu"
            />
            <motion.div
              animate={{ scale: [1, 1.25, 1.5], opacity: [0.3, 0.1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
              className="absolute inset-0 rounded-2xl bg-[rgb(240,82,87)]/20 pointer-events-none transform-gpu"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-14 h-14 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-center justify-center text-[rgb(240,82,87)]"
            >
              <svg className="w-6 h-6 fill-[rgb(240,82,87)]" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </motion.div>
          </div>

          {/* Main Headline (2 lines) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] sm:text-5xl md:text-[54px] 2xl:text-[58px] font-extrabold text-[#0F172A] tracking-tight leading-[1.08]"
          >
            Core HR<br />
            solutions
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-sm"
          >
            Streamline your people operations with automated onboarding, leave tracking, and deep team insights.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <button
              onClick={onOpenDemo}
              className="bg-[rgb(240,82,87)] hover:bg-[#E03E43] text-white text-xs sm:text-sm font-semibold px-7 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(240,82,87,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Learn more
            </button>
          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT ANIMATED 6-CARD FLOW CLUSTER (4 Visible + 2 Hidden) */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-1 justify-end">
          <SteppedFlowCluster
            items={rightCards}
            isRight={true}
            interval={3800}
            cardSize={cardSize}
          />
        </div>

        {/* ========================================================= */}
        {/* RESPONSIVE MOBILE & TABLET SATELLITE PREVIEW (< LG) */}
        {/* ========================================================= */}
        <div className="flex lg:hidden flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 max-w-lg mx-auto">
          {leftCards.slice(0, 4).map((card, idx) => (
            <PortraitCard
              key={idx}
              img={card.img}
              alt={card.alt}
              className="w-24 h-32 sm:w-28 sm:h-36"
            />
          ))}
        </div>

      </div>

    </section>
  );
}
