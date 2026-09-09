import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, BookOpen, ShieldCheck, MapPin, User, Phone, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    qualification: 'Diploma / B.Tech / BE',
    location: '',
    discipline: 'Interior Design'
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]"
      >
        
        {/* Backdrop Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="absolute inset-0 bg-[#040810]/80 backdrop-blur-xl"
        />

        {/* Modern Dark Glass Modal Dialog */}
        <motion.div 
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#0F192C] via-[#0B1322] to-[#070D18] rounded-[28px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/15 z-10 overflow-y-auto max-h-[92vh] overscroll-contain text-white"
        >
          {/* Subtle Top Red Glow Strip */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#E94B3C] to-transparent opacity-80" />

          {/* Close Button */}
          <button 
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E94B3C]/15 border border-[#E94B3C]/40 text-[#E94B3C] text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Admissions &amp; Course Enquiry</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight font-medium">
                  Enquire at CADD Centre<span className="text-[#E94B3C]">.</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-sans leading-relaxed">
                  Connect with our counselors in Perinthalmanna for syllabus details, batch timings, and fee structure.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
                {/* 1. Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#E94B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input 
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#070D18]/90 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E94B3C] focus:ring-2 focus:ring-[#E94B3C]/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* 2. Phone & Qualification Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#E94B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#070D18]/90 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E94B3C] focus:ring-2 focus:ring-[#E94B3C]/20 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Qualification
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-[#070D18]/90 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E94B3C] focus:ring-2 focus:ring-[#E94B3C]/20 transition-all shadow-inner cursor-pointer"
                      >
                        <option value="Diploma / B.Tech / BE" className="bg-[#0B1322] text-white">Diploma / B.Tech / BE</option>
                        <option value="Plus Two / Higher Secondary" className="bg-[#0B1322] text-white">Plus Two / Higher Secondary</option>
                        <option value="Degree / Graduate" className="bg-[#0B1322] text-white">Degree / Graduate</option>
                        <option value="ITI / Technical Diploma" className="bg-[#0B1322] text-white">ITI / Technical Diploma</option>
                        <option value="Working Professional" className="bg-[#0B1322] text-white">Working Professional</option>
                        <option value="Other" className="bg-[#0B1322] text-white">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Location & Preferred Course Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#E94B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Perinthalmanna"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#070D18]/90 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E94B3C] focus:ring-2 focus:ring-[#E94B3C]/20 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Preferred Course
                    </label>
                    <select 
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#070D18]/90 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E94B3C] focus:ring-2 focus:ring-[#E94B3C]/20 transition-all shadow-inner cursor-pointer"
                    >
                      <option value="Interior Design" className="bg-[#0B1322] text-white">Interior Design</option>
                      <option value="BIM [Building Information Modelling]" className="bg-[#0B1322] text-white">BIM [Building Information Modelling]</option>
                      <option value="MEP with BIM" className="bg-[#0B1322] text-white">MEP with BIM</option>
                      <option value="Structural Design" className="bg-[#0B1322] text-white">Structural Design</option>
                      <option value="Project Planning & Management" className="bg-[#0B1322] text-white">Project Planning & Management</option>
                      <option value="Surveying & Transportation" className="bg-[#0B1322] text-white">Surveying & Transportation</option>
                      <option value="Product Design" className="bg-[#0B1322] text-white">Product Design</option>
                      <option value="Mechanical CADD" className="bg-[#0B1322] text-white">Mechanical CADD</option>
                      <option value="Electrical CADD" className="bg-[#0B1322] text-white">Electrical CADD</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button 
                    type="submit" 
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E94B3C] to-[#FF5745] hover:from-[#d83b2c] hover:to-[#e84736] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#E94B3C]/25 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <span>Submit Course Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authorized CADD Centre certification &bull; Free demo session</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4 font-sans">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-medium text-white tracking-tight">Enquiry Received!</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xs mx-auto leading-relaxed mt-2">
                  Thank you <span className="font-bold text-white">{formData.name}</span> from <span className="font-bold text-white">{formData.location || 'Perinthalmanna'}</span>. Our admission counselors will contact you on <span className="font-bold text-[#E94B3C]">{formData.phone}</span> regarding <span className="font-bold text-white">{formData.discipline}</span> shortly.
                </p>
              </div>
              <div className="pt-2">
                <button 
                  type="button"
                  onClick={handleResetAndClose} 
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

