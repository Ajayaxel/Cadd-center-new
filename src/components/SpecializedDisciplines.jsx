import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, Wrench, Cpu, Layers, Shield, Palette, Box, Landmark, BarChart3, 
  Globe, Award, ArrowRight, BookOpen, Sparkles, CheckCircle2, ChevronRight, ChevronDown
} from 'lucide-react';
import { disciplinesData } from '../data/disciplinesData';
import DisciplineModal from './DisciplineModal';

// Mapping icon names to Lucide icons
const iconMap = {
  Building: Building,
  Wrench: Wrench,
  Cpu: Cpu,
  Layers: Layers,
  Shield: Shield,
  Palette: Palette,
  Box: Box,
  Landmark: Landmark,
  BarChart3: BarChart3
};

export default function SpecializedDisciplines({ onOpenDemo, onSelectDiscipline }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const handleCardClick = (discipline) => {
    setSelectedDiscipline(discipline);
    setModalOpen(true);
  };

  const handleEnquireFromModal = (discipline) => {
    if (onSelectDiscipline) {
      onSelectDiscipline(discipline.title);
    }
    if (onOpenDemo) {
      onOpenDemo(discipline.title);
    }
  };

  const filteredDisciplines = disciplinesData.filter((d) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'civil' && ['surveying-transportation', 'bim', 'structural-design', 'interior-design'].includes(d.id)) return true;
    if (activeFilter === 'mech' && ['mechanical-cadd', 'product-design'].includes(d.id)) return true;
    if (activeFilter === 'elec' && ['electrical-cadd', 'mep'].includes(d.id)) return true;
    if (activeFilter === 'mgmt' && ['ppm'].includes(d.id)) return true;
    return true;
  });

  return (
    <section id="disciplines" className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-rose-100/30 via-orange-100/20 to-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Grid Layout matching user screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Legacy & Beyond Software Training Cards     */}
          {/* ========================================================= */}
          {/* ========================================================= */}
          {/* LEFT COLUMN: Legacy & Beyond Software Training Cards     */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 flex flex-col sm:gap-6 justify-between">
            
            {/* Top Card: CADD Centre Legacy & Network (Always visible on mobile) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col justify-between cursor-pointer sm:cursor-default"
              onClick={() => setIsAboutExpanded((prev) => !prev)}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  {/* Globe Icon in light red/coral rounded box */}
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 text-[#FF5A36] flex items-center justify-center shadow-xs">
                    <Globe className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Mobile Expand / Collapse Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAboutExpanded((prev) => !prev);
                    }}
                    className="sm:hidden w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-[#FF5A36] flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer hover:bg-[#FF5A36] hover:text-white"
                    aria-label={isAboutExpanded ? "Show fewer cards" : "Expand Beyond Software Training card"}
                    aria-expanded={isAboutExpanded}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-out ${
                        isAboutExpanded ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  CADD Centre Legacy & Network
                </h3>

                {/* Card Body */}
                <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed">
                  <strong className="text-slate-800 font-semibold">CADD Centre Perinthalmanna</strong> brings industry-focused technical training in CAD, engineering, architecture, and design to students and professionals. Backed by CADD Centre's legacy since <strong className="text-slate-800 font-bold">1988</strong>, we focus on practical skills and career-ready learning.
                </p>
              </div>

              {/* Bottom 1988 Badge */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-[#FF5A36] font-extrabold text-xs shrink-0">
                  1988
                </div>
                <p className="text-xs text-slate-500 font-medium leading-tight">
                  Empowering learners with industry-relevant technical skills since 1988.
                </p>
              </div>
            </motion.div>

            {/* Bottom Card: Beyond Software Training (Expandable on mobile, always visible on sm+) */}
            <div
              className={`transition-all duration-300 ease-in-out sm:contents ${
                isAboutExpanded
                  ? 'grid grid-rows-[1fr] opacity-100 mt-4 sm:mt-0'
                  : 'grid grid-rows-[0fr] opacity-0 pointer-events-none sm:pointer-events-auto sm:opacity-100 sm:mt-0'
              }`}
            >
              <div className="overflow-hidden sm:overflow-visible sm:contents">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Ribbon / Medal Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 text-[#FF5A36] flex items-center justify-center mb-5 shadow-xs">
                      <Award className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      Beyond Software Training
                    </h3>

                    {/* Card Body */}
                    <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed">
                      Our focus goes beyond simply learning software tools. We aim to help students develop the practical skills, confidence, and professional domain knowledge needed to prepare for real-world career opportunities.
                    </p>
                  </div>

                  {/* Quick highlights list */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] font-bold text-slate-600">
                    <span className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> 100% Practical Labs
                    </span>
                    <span className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 flex items-center gap-1 text-indigo-700">
                      <CheckCircle2 className="w-3 h-3 text-indigo-500" /> Real Project Portfolios
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>


          {/* ========================================================= */}
          {/* RIGHT COLUMN: Specialized Disciplines 3x3 Grid           */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            
            {/* Top Header */}
            <div>
              {/* Overline with Book Icon */}
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-[#FF5A36]" />
                <span className="text-xs font-extrabold text-[#FF5A36] uppercase tracking-wider">
                  SPECIALIZED DISCIPLINES
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore Industry Training in Perinthalmanna
              </h2>

              {/* Subheading */}
              <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed max-w-2xl">
                At CADD Centre Perinthalmanna, students explore comprehensive, hands-on training tailored for key engineering and design sectors:
              </p>

              {/* Quick Filter Tabs */}
              <div className="flex items-center gap-2 mt-4 pb-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All 9 Disciplines' },
                  { id: 'civil', label: 'Civil, BIM & Interior' },
                  { id: 'mech', label: 'Mechanical & Product' },
                  { id: 'elec', label: 'Electrical & MEP' },
                  { id: 'mgmt', label: 'Project Management' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3x3 DISCIPLINE CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 mt-6">
              {filteredDisciplines.map((discipline, idx) => {
                const IconComp = iconMap[discipline.iconName] || Building;

                return (
                  <motion.div
                    key={discipline.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    onClick={() => handleCardClick(discipline)}
                    className="group relative bg-[#FAFAFA] hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[120px] sm:min-h-[125px]"
                  >
                    {/* Top Row: Icon Squircle (Left) & Category Badge (Right) */}
                    <div className="flex items-center justify-between mb-3">
                      {/* Icon Squircle */}
                      <div className="w-10 h-10 rounded-xl bg-rose-50/90 border border-rose-200/80 text-[#FF5A36] group-hover:bg-rose-500 group-hover:text-white transition-colors flex items-center justify-center shadow-2xs">
                        <IconComp className="w-5 h-5 stroke-[2]" />
                      </div>

                      {/* Uppercase Category Badge */}
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-slate-900">
                        {discipline.badge}
                      </span>
                    </div>

                    {/* Bottom Row: Discipline Card Title */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug">
                        {discipline.cardTitle}
                      </h4>
                    </div>

                    {/* Hover indicator arrow */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-rose-500" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Footer Notice inside Right Box */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Click any card to inspect software tools, curriculum & industry workflow.
              </span>
              <button
                onClick={() => onOpenDemo && onOpenDemo('General Enquiry')}
                className="text-xs font-bold text-[#FF5A36] hover:text-[#EA4C28] flex items-center gap-1 transition-colors"
              >
                <span>Request Course Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Modal for Discipline Deep-Dive */}
      <DisciplineModal
        discipline={selectedDiscipline}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEnquire={handleEnquireFromModal}
      />
    </section>
  );
}
