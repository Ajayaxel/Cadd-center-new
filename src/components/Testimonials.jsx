import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, Sparkles } from 'lucide-react';

// Google renders a coloured initial for any reviewer without a profile photo.
const GOOGLE_AVATAR_COLORS = [
  '#1A73E8', '#D93025', '#188038', '#E37400',
  '#9334E6', '#B06000', '#1967D2', '#C5221F'
];

const avatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 997;
  }
  return GOOGLE_AVATAR_COLORS[hash % GOOGLE_AVATAR_COLORS.length];
};

// Single Modern Testimonial Card Component
function TestimonialCard({ item, isCenter = false }) {
  return (
    <div
      className={`w-full max-w-[340px] sm:max-w-[380px] lg:w-[370px] min-h-[350px] sm:min-h-[380px] rounded-[24px] p-6 sm:p-7 flex flex-col items-center justify-between text-center transition-all duration-500 select-none ${
        isCenter
          ? 'bg-gradient-to-b from-[#0E1B33] via-[#0B1322] to-[#070D18] border-2 border-[#E94B3C] shadow-[0_15px_45px_rgba(233,75,60,0.3)]'
          : 'bg-[#0B1322] border border-white/10 shadow-2xl opacity-75 hover:opacity-90 backdrop-blur-md'
      }`}
    >
      {/* Avatar with Google badge */}
      <div className="relative mb-3 shrink-0">
        <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${
          isCenter ? 'border-[#E94B3C] shadow-[0_0_20px_rgba(233,75,60,0.5)]' : 'border-white/20'
        }`}>
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name}
              width="72"
              height="72"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <span
              className="text-2xl font-bold text-white w-full h-full flex items-center justify-center"
              style={{ backgroundColor: avatarColor(item.name) }}
              aria-hidden="true"
            >
              {item.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Google G Badge */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md border border-white/20 flex items-center justify-center p-0.5" title="Verified Google Review">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
        </div>
      </div>

      {/* Student Name and Role */}
      <div>
        <div className="flex items-center justify-center gap-1.5">
          <h3 className="text-base sm:text-lg font-black text-white leading-tight">
            {item.name}
          </h3>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        </div>
        <p className="text-xs text-[#E94B3C] font-extrabold tracking-wide mt-1">
          {item.role}
        </p>
      </div>

      {/* 5 Stars Rating */}
      <div className="flex items-center gap-2 my-2.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < item.rating
                  ? 'fill-[#FBBC05] text-[#FBBC05]'
                  : 'fill-slate-600 text-slate-600'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-black text-white">{item.rating.toFixed(1)}</span>
        <span className="text-[10px] text-slate-400 font-medium">• {item.time}</span>
      </div>

      {/* Review Quote with Subtle Icon */}
      <div className="relative my-1">
        <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed max-w-xs line-clamp-5 relative z-10 italic">
          "{item.quote}"
        </p>
      </div>

      {/* Verified Footer Pill */}
      <div className="pt-2 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Verified Google Review
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 16 Authentic Google reviews for CADD Centre Perinthalmanna
  const testimonials = [
    {
      id: 1,
      name: 'sharuz vlog',
      role: 'BIM for Architecture',
      rating: 5,
      time: '3 months ago',
      avatar: '/images/reviews/sharuz-vlog.jpg',
      quote: 'I am Sarath from Koppam. I had a great and best learning experience at CADD Centre Perinthalmanna doing the BIM for Architecture course. The trainers explain complex concepts in a very simple and practical way, making it easy to understand. They focus on real-world projects which is very helpful. The institute also provides good guidance regarding placement opportunities.'
    },
    {
      id: 2,
      name: 'Shibil Shibil',
      role: 'Interior Design',
      rating: 5,
      time: '6 months ago',
      avatar: '/images/reviews/shibil-shibil.jpg',
      quote: 'I am shibil. I joined here for interior design course. I have experienced a wonderfull atmoshere for studies. The faculties are very much comfortable and they where industry experts with handfull of experience. Also CADD centre helps me to improve my skills.'
    },
    {
      id: 3,
      name: 'Haritha P Haridas',
      role: 'Revit Architecture',
      rating: 5,
      time: '6 months ago',
      avatar: '/images/reviews/haritha-p-haridas.jpg',
      quote: 'I recently completed Revit Architecture training at CADD Centre and it was a great learning experience. The classes were practical, well-structured, and focused on real-time project work. The trainer explained every concept clearly, especially modeling, detailing, and family creation, which helped me build strong confidence in Revit.'
    },
    {
      id: 4,
      name: 'Sidhan Harshad',
      role: 'Interior Designing',
      rating: 5,
      time: '5 months ago',
      avatar: '/images/reviews/sidhan-harshad.png',
      quote: 'I am Sidhan. I had a great learning experience at CADD Centre Perinthalmanna while pursuing the Interior Designing course. The classes were well-structured, covering tools like AutoCAD, 3ds Max, Sketchup, Lumion and other essential design software, which are very useful for real-world projects.'
    },
    {
      id: 5,
      name: 'Ajaykrishna PT',
      role: 'Revit MEP',
      rating: 5,
      time: '5 months ago',
      avatar: '/images/reviews/ajaykrishna-pt.jpg',
      quote: 'I completed my Revit MEP course at CADD Centre Perinthalmanna, one of the best institutes for BIM, MEP, AutoCAD, Mechanical CAD, and SolidWorks. The classes were well-structured and very easy to understand, even for beginners. The trainers are highly supportive, knowledgeable, and always ready to clear doubts.'
    },
    {
      id: 6,
      name: 'darshana K',
      role: 'Interior Designing',
      rating: 5,
      time: '4 months ago',
      avatar: '/images/reviews/darshana-k.jpg',
      quote: 'The interior designing course at CADD Centre Perinthalmanna is a good and best option for who want to build practical design skills. The course covers both theory and software training, including tools like AutoCAD, SketchUp, 3ds Max, and V-Ray, which are essential in the interior design field.'
    },
    {
      id: 7,
      name: 'Afna Vahid',
      role: 'AutoCAD · Revit · 3ds Max',
      rating: 5,
      time: '6 months ago',
      avatar: '/images/reviews/afna-vahid.png',
      quote: 'I am afna. I had a wonderful experience at CADD Center. I learning AutoCAD, Revit, and 3ds Max here. The teaching was clear and practical, which helped me understand the software easily. The staff and trainers are very supportive and friendly.'
    },
    {
      id: 8,
      name: 'Amjad Yousuf',
      role: 'Verified Google Review',
      rating: 5,
      time: '3 months ago',
      avatar: '/images/reviews/amjad-yousuf.png',
      quote: 'I got a excellent training experience at Cadd Centre Perinthalmanna. The faculties were friendly and supportive and good lab facilities. Also industry oriented teaching. It is the leading and best centre in Perinthalmanna.'
    },
    {
      id: 9,
      name: 'Shahabas Manu',
      role: 'Verified Google Review',
      rating: 5,
      time: '1 month ago',
      avatar: '/images/reviews/shahabas-manu.png',
      quote: 'My name is Shahabas. Join the top CAD school in Perinthalmanna, Kerala, which provides professional instruction and assistance with placement. Classes are simple to understand, and trainers are very helpful. BIM is a great tool for training architects. Strongly suggested.'
    },
    {
      id: 10,
      name: 'Sarania Saneesh',
      role: 'BIM for Architecture',
      rating: 5,
      time: '5 months ago',
      avatar: '/images/reviews/sarania-saneesh.jpg',
      quote: 'As a BIM for arch student of CADD Centre Perinthalmanna, I had a great learning experience. The trainers are highly supportive and explain concepts clearly with practical examples. The classes are well-structured and industry-oriented, which helped me improve my technical skills and confidence.'
    },
    {
      id: 11,
      name: 'Sreni Maneesha',
      role: 'Interior Design',
      rating: 5,
      time: '6 months ago',
      avatar: '/images/reviews/sreni-maneesha.jpg',
      quote: 'I had a great learning experience at CADD Centre. The course (interior design) was well-structured and very practical. The trainers were supportive, knowledgeable, and always ready to clear doubts. The hands-on training helped me understand real industry standards and improved my technical skills and confidence.'
    },
    {
      id: 12,
      name: 'MHD AFNAN',
      role: 'MEP Course',
      rating: 5,
      time: '6 months ago',
      avatar: '/images/reviews/mhd-afnan.jpg',
      quote: 'CADD center perinthalmanna is a top institution for MEP course. All teachers are very friendly.'
    },
    {
      id: 13,
      name: 'Prathul Prathul',
      role: 'AutoCAD',
      rating: 5,
      time: '3 months ago',
      avatar: '/images/reviews/prathul-prathul.jpg',
      quote: 'I choose Autocad course at Cadd centre Perinthalmanna. The syllabus oriented and project oriented classes help me to improve my drafting and designing skill. Cadd centre Perinthalmanna is the professional and leading centre in Malappuram district.'
    },
    {
      id: 14,
      name: 'Sneha TK',
      role: 'Interior Design',
      rating: 5,
      time: '5 months ago',
      avatar: '/images/reviews/sneha-tk.jpg',
      quote: 'Iam sneha bsc computer science graduated after iam joining at best Interior designing course such as autocad, sketchup, 3dsmax and lumion at cadd centre Perinthalmanna. The faculty experience was soo good very talented faculties and working professionals. I suggest everyone this institution and I got placed.'
    },
    {
      id: 15,
      name: 'Shana_Hasbu',
      role: 'Master BIM',
      rating: 5,
      time: '5 months ago',
      avatar: '/images/reviews/shana-hasbu.jpg',
      quote: 'Best BIM training institution in Perintalmanna with best experienced faculty. Here I have completed Master BIM such as revit architecture, revit structure, revit mep, navisworks, bim360, Dynamo, LOD, civil3d. It helped me to get a job abroad. I thank the faculties and the team members who made my placement so fast.'
    },
    {
      id: 16,
      name: 'Malikdeenar',
      role: 'AutoCAD',
      rating: 5,
      time: '3 months ago',
      avatar: '/images/reviews/malikdeenar.png',
      quote: 'Iam Malik deenar. Here I am choosing Autocad course. The classes were highly useful and professional based. Here I got best classes and better atmosphere. Cadd centre Perinthalmanna is the leading centre in Malapuram for Autocad.'
    }
  ];

  const total = testimonials.length;

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous auto-scrolling loop (3.0 seconds per step, pause on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Modular circular distance for seamless 360-degree infinite card stack wrap
  const getRelPos = (index) => {
    let diff = index - activeIdx;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 bg-[#070D18] text-white font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      
      {/* Background Subtle Grid & Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#E94B3C]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#3B82F6]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-10 flex flex-col items-center justify-center">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/30 text-[#E94B3C] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.18em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            GOOGLE REVIEWS &amp; TESTIMONIALS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08]">
            Words of Appreciation <br className="hidden sm:inline" />
            <span className="text-[#E94B3C]">from Our Students</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Verified Google reviews from engineering and architecture students trained at CADD Centre Perinthalmanna.
          </p>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP 3D FAN STACK CAROUSEL (lg:flex)                    */}
        {/* ========================================================= */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hidden lg:flex relative w-full max-w-5xl h-[420px] lg:h-[450px] items-center justify-center perspective-[1200px]"
        >
          {testimonials.map((item, idx) => {
            const rel = getRelPos(idx);
            const isCenter = rel === 0;

            let x = 0;
            let rotateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (rel === 0) {
              x = 0;
              rotateZ = 0;
              rotateY = 0;
              scale = 1.05;
              opacity = 1;
              zIndex = 30;
            } else if (rel === -1) {
              x = -270;
              rotateZ = -6;
              rotateY = 14;
              scale = 0.9;
              opacity = 0.85;
              zIndex = 20;
            } else if (rel === 1) {
              x = 270;
              rotateZ = 6;
              rotateY = -14;
              scale = 0.9;
              opacity = 0.85;
              zIndex = 20;
            } else if (rel === -2) {
              x = -500;
              rotateZ = -12;
              rotateY = 24;
              scale = 0.78;
              opacity = 0.45;
              zIndex = 10;
            } else if (rel === 2) {
              x = 500;
              rotateZ = 12;
              rotateY = -24;
              scale = 0.78;
              opacity = 0.45;
              zIndex = 10;
            } else {
              opacity = 0;
              scale = 0.6;
              zIndex = 0;
            }

            if (Math.abs(rel) > 2) return null;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x,
                  rotateZ,
                  rotateY,
                  scale,
                  opacity,
                  zIndex
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24
                }}
                onClick={() => setActiveIdx(idx)}
                className="absolute select-none transform-gpu cursor-pointer"
              >
                <TestimonialCard item={item} isCenter={isCenter} />
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET SINGLE CAROUSEL (< lg:)                   */}
        {/* ========================================================= */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex lg:hidden w-full max-w-sm sm:max-w-md justify-center items-center px-2"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[activeIdx].id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex justify-center"
            >
              <TestimonialCard item={testimonials[activeIdx]} isCenter={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PAGINATION NAVIGATION CONTROLS */}
        <div className="flex items-center justify-center gap-5 mt-10 sm:mt-12 z-40">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Review"
            className="w-10 h-10 rounded-full bg-[#0B1322] border border-white/20 text-white hover:text-[#E94B3C] hover:border-[#E94B3C] hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicator text & active dots */}
          <div className="flex items-center gap-3 bg-[#0B1322] border border-white/10 px-4 py-2 rounded-full shadow-inner">
            <span className="text-xs font-black text-white">
              {activeIdx + 1} <span className="text-slate-400 font-normal">/ {total}</span>
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIdx ? 'w-5 bg-[#E94B3C] shadow-[0_0_8px_rgba(233,75,60,0.8)]' : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Review"
            className="w-10 h-10 rounded-full bg-[#0B1322] border border-white/20 text-white hover:text-[#E94B3C] hover:border-[#E94B3C] hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

