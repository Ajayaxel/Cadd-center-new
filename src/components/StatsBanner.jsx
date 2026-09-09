import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';

export default function StatsBanner({ onOpenDemo }) {
  const features = [
    {
      num: "01",
      title: "Industry Learning",
      desc: "Tools, workflows and standards used across engineering & design."
    },
    {
      num: "02",
      title: "Practical Training",
      desc: "Hands-on knowledge through real-world exercises & live projects."
    },
    {
      num: "03",
      title: "Career Programs",
      desc: "Skills aligned with today’s engineering & construction opportunities."
    },
    {
      num: "04",
      title: "Placement Support",
      desc: "Experienced mentors & guidance for your next career step."
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      className="relative py-16 sm:py-24 bg-[#070D18] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Background Subtle Ambient Red Glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#E94B3C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Main Layout Grid matching Image 1 Model */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN (~60%): Main Typography, Description, 4 Features & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            
            {/* Main Title matching Image 1 */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
                Industry Skills,<br />
                <span className="text-[#E94B3C] font-semibold">Practical Training &amp;</span><br />
                Career Confidence.
              </h2>

              <p className="mt-5 text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-xl">
                At CADD Centre Perinthalmanna, we focus on more than software training. Our programs combine live project-based learning, practical industry workflows, and career-focused guidance to help you develop skills that are relevant to real-world work.
              </p>
            </div>

            {/* 4 Horizontal Feature Columns matching Image 1 */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {features.map((item) => (
                <div key={item.num} className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#E94B3C]">
                    {item.num}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-snug font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Dual Action CTA Buttons matching Image 1 */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenDemo}
                className="bg-[#E94B3C] hover:bg-[#d83b2c] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="bg-white/5 hover:bg-white/10 border border-white/15 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Enquire Now
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN (~40%): Rounded Mentorship Image with Bottom Glass Badge */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-[32px] overflow-hidden border border-white/15 shadow-2xl group cursor-pointer">
              
              {/* Mentorship Image */}
              <img
                src="/images/why-choose-us.jpg"
                alt="CADD Centre Perinthalmanna Mentorship & Training"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay for bottom text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/20 to-transparent opacity-90" />

              {/* Floating Dark Glassmorphic Badge at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-5 sm:p-6 rounded-[24px] bg-[#0B1322]/85 backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E94B3C]">
                    OUR APPROACH
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                  From Learning Software to Building a Career
                </h3>

                <p className="text-xs text-gray-300 font-normal leading-relaxed mt-1.5">
                  Develop practical skills through industry-focused training, hands-on projects and career guidance designed for engineering and design professionals.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

