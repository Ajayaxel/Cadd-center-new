import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  Search,
  BookOpen,
  Layers,
  PenTool,
  ShieldCheck,
  Wrench,
  Award,
  CheckCircle2,
  Tag,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import Button from './ui/Button';

export default function FaqSection({ onOpenDemo }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'all', label: 'All FAQs (29)', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'institute', label: 'CADD Centre & Overview', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'autocad-civil', label: 'AutoCAD & Civil 3D', icon: <PenTool className="w-4 h-4" /> },
    { id: 'bim', label: 'BIM & Architecture', icon: <Layers className="w-4 h-4" /> },
    { id: 'interior-vis', label: 'Interior & 3ds Max', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'mep-mech', label: 'MEP & SolidWorks', icon: <Wrench className="w-4 h-4" /> },
    { id: 'eligibility-careers', label: 'Eligibility & Placements', icon: <Award className="w-4 h-4" /> },
  ];

  // Complete 29 SEO-Optimized FAQs for Perinthalmanna & Malappuram
  const faqData = [
    {
      id: 1,
      category: 'institute',
      question: 'What makes your CADD Centre in Perinthalmanna a leading CAD training centre?',
      answer: 'Our CADD Centre in Perinthalmanna, Malappuram provides industry-focused training in CAD, BIM, MEP, Interior Design, Structural Design, Product Design, 3D Visualization, and Project Planning & Management. Training combines software skills, practical exercises, project workflows, and career-oriented learning.'
    },
    {
      id: 2,
      category: 'institute',
      question: 'Why choose your CAD Institute in Perinthalmanna, Malappuram?',
      answer: 'Students and professionals choose our CAD training institute in Perinthalmanna to develop practical skills in industry-relevant design and engineering software. Our programs are suitable for beginners, engineering students, graduates, designers, architects, and working professionals.'
    },
    {
      id: 3,
      category: 'autocad-civil',
      question: 'What CAD courses are available in Perinthalmanna?',
      answer: 'Our CAD programs include AutoCAD, AutoCAD Architecture, AutoCAD Civil 3D, AutoCAD Mechanical, AutoCAD Electrical, and MicroStation. Course selection depends on your educational background and career specialization.'
    },
    {
      id: 4,
      category: 'autocad-civil',
      question: 'What is the best AutoCAD course in Perinthalmanna?',
      answer: 'The right AutoCAD course in Perinthalmanna depends on your career objective. General AutoCAD is suitable for technical drafting, while AutoCAD Architecture, Civil 3D, Mechanical, and Electrical are designed for specific engineering and design disciplines.'
    },
    {
      id: 5,
      category: 'bim',
      question: 'Do you offer the best BIM courses in Perinthalmanna?',
      answer: 'We offer career-focused BIM training in Perinthalmanna covering Revit Architecture, Revit Structure, Revit MEP, Navisworks, Dynamo, BIM 360, Autodesk Construction Cloud, and COBie. Programs are designed to develop practical BIM modeling and coordination skills.'
    },
    {
      id: 6,
      category: 'bim',
      question: 'Is there a BIM training institute in Malappuram for engineering students?',
      answer: 'Yes. Students looking for BIM training in Malappuram can choose programs based on their specialization, including Architecture, Civil & Structural Engineering, and MEP. Training focuses on BIM modeling, documentation, coordination, and industry workflows.'
    },
    {
      id: 7,
      category: 'mep-mech',
      question: 'Do you provide MEP courses in Perinthalmanna?',
      answer: 'Yes. Our MEP courses in Perinthalmanna cover HVAC, electrical systems, plumbing, fire protection, Revit MEP, Navisworks, BIM coordination, and related MEP workflows.'
    },
    {
      id: 8,
      category: 'interior-vis',
      question: 'What is included in the Interior Design course in Perinthalmanna?',
      answer: 'The Interior Design course in Perinthalmanna covers tools and workflows such as AutoCAD, 3ds Max, SketchUp, V-Ray, Corona Renderer, Enscape, Lumion, and Photoshop, along with 2D planning, 3D modeling, materials, lighting, rendering, and presentation.'
    },
    {
      id: 9,
      category: 'mep-mech',
      question: 'Do you offer Product Design and SolidWorks training in Malappuram?',
      answer: 'Yes. Our Product Design and SolidWorks training in Malappuram focuses on 2D drafting, 3D part modeling, assembly design, sheet metal, surface modeling, engineering drawings, and manufacturing documentation.'
    },
    {
      id: 10,
      category: 'interior-vis',
      question: 'Is 3ds Max training available in Perinthalmanna?',
      answer: 'Yes. Our 3ds Max training in Perinthalmanna focuses on 3D modeling, materials and textures, lighting, V-Ray and Corona rendering, environment creation, visualization, and professional presentation workflows.'
    },
    {
      id: 11,
      category: 'institute',
      question: 'Do you provide Project Planning & Management training?',
      answer: 'Yes. Our Project Planning & Management courses in Perinthalmanna include Primavera P6 and Microsoft Project, covering WBS, scheduling, resource management, baseline management, progress tracking, delay analysis, and project reporting.'
    },
    {
      id: 12,
      category: 'eligibility-careers',
      question: 'Who can join CAD, BIM and MEP training in Perinthalmanna?',
      answer: 'Our courses are suitable for students, fresh graduates, engineers, architects, interior designers, mechanical professionals, electrical engineers, civil professionals, and working professionals who want to develop or upgrade their technical skills.'
    },
    {
      id: 13,
      category: 'eligibility-careers',
      question: 'Do you provide practical and live project-based training?',
      answer: 'Yes. Our training emphasizes practical exercises and live project-based workflows, helping learners understand how CAD, BIM, MEP, design, and project management software are applied in real-world projects.'
    },
    {
      id: 14,
      category: 'eligibility-careers',
      question: 'Do you provide placement and career support?',
      answer: 'Career guidance and placement support are provided according to the selected program and applicable eligibility. Students receive guidance related to resume preparation, interview preparation, portfolio development, and career opportunities.'
    },
    {
      id: 15,
      category: 'institute',
      question: 'Where is the CADD & CAD Training Centre located?',
      answer: 'Our training centre is located at Livehi Arcade, Calicut Road, Above BeautyMark Gold, Perinthalmanna, Kerala 679321, making it easily accessible to students and engineering professionals from Perinthalmanna and across Malappuram.'
    },
    {
      id: 16,
      category: 'institute',
      question: 'How can I choose the right CAD or BIM course for my career?',
      answer: 'The best course depends on your qualification, engineering or design stream, current software knowledge, and career goal. Our team can help you identify a suitable course based on your professional interests and specialization.'
    },
    {
      id: 17,
      category: 'institute',
      question: 'Why should I choose a CAD, BIM or MEP course in Perinthalmanna?',
      answer: 'Choosing a specialized CAD, BIM, or MEP course in Perinthalmanna can help you develop technical software skills relevant to architecture, construction, engineering, manufacturing, and project management. A practical, industry-oriented learning approach can also help you build stronger project and portfolio skills.'
    },
    {
      id: 18,
      category: 'institute',
      question: 'Which is the best CAD and BIM training centre in Perinthalmanna?',
      answer: 'Our training centre provides industry-focused training in CAD, BIM, MEP, structural design, interior design, civil engineering, mechanical design, and project management, with practical and live project-based learning.'
    },
    {
      id: 19,
      category: 'autocad-civil',
      question: 'Is AutoCAD Civil 3D training available in Perinthalmanna?',
      answer: 'Yes. The AutoCAD Civil 3D course covers surveying, surface modeling, alignments, profiles, road and corridor design, grading, pipe networks, quantity takeoff, and civil engineering documentation.'
    },
    {
      id: 20,
      category: 'autocad-civil',
      question: 'Is MicroStation training available in Perinthalmanna?',
      answer: 'Yes. MicroStation training covers 2D engineering drafting, surveying and mapping, topographic mapping, road and highway design, site development, geometric design, and infrastructure documentation.'
    },
    {
      id: 21,
      category: 'eligibility-careers',
      question: 'Are the courses suitable for beginners?',
      answer: 'Yes. Courses are structured to help beginners, students, graduates, and working professionals develop software skills progressively from fundamentals to industry workflows.'
    },
    {
      id: 22,
      category: 'autocad-civil',
      question: 'Which course is best for civil engineering students?',
      answer: 'Depending on your career goal, suitable options include AutoCAD, Civil 3D, Revit Structure, STAAD.Pro, ETABS, SAFE, Tekla Structures, and BIM for Architecture & Engineering.'
    },
    {
      id: 23,
      category: 'bim',
      question: 'Which BIM course is best for architecture students?',
      answer: 'Revit Architecture and BIM for Architecture are suitable choices for students interested in architectural BIM modeling, documentation, coordination, and construction workflows.'
    },
    {
      id: 24,
      category: 'mep-mech',
      question: 'Which courses are suitable for mechanical engineers?',
      answer: 'Mechanical professionals can choose from AutoCAD Mechanical, SolidWorks, Creo, CATIA, and Product Design programs based on their career objectives.'
    },
    {
      id: 25,
      category: 'mep-mech',
      question: 'Which courses are available for electrical and MEP engineers?',
      answer: 'Training options include AutoCAD Electrical, Revit MEP, MEP with BIM, HVAC, Electrical Systems, Plumbing, Fire Protection, and BIM Coordination.'
    },
    {
      id: 26,
      category: 'eligibility-careers',
      question: 'Do you provide certificates after course completion?',
      answer: 'Yes. Course completion certificates are provided according to the selected training program and applicable certification requirements.'
    },
    {
      id: 27,
      category: 'eligibility-careers',
      question: 'Can working professionals join CAD and BIM courses?',
      answer: 'Yes. Training programs offer flexible batch schedules suitable for students, fresh graduates, engineers, designers, architects, and working professionals looking to upgrade their technical skills.'
    },
    {
      id: 28,
      category: 'bim',
      question: 'What are the career opportunities after completing a BIM course?',
      answer: 'Graduates can pursue high-demand roles such as BIM Modeler, BIM Coordinator, Revit Technician, BIM Engineer, and Construction Coordinator across India and the Middle East.'
    },
    {
      id: 29,
      category: 'interior-vis',
      question: 'What are the career opportunities after completing an interior design course?',
      answer: 'Students can build exciting careers as Interior Designers, 3D Architectural Visualizers, Space Planners, Residential & Commercial CAD Detailers, or start their own design practice.'
    }
  ];

  // Natural SEO keywords tag cloud
  const popularSearchTags = [
    "CADD Centre in Perinthalmanna, Malappuram",
    "CAD Training Centre in Perinthalmanna",
    "Best CAD Institute in Perinthalmanna",
    "AutoCAD Training Institute in Perinthalmanna",
    "CAD & CADD Training Centre in Malappuram",
    "Best AutoCAD Course in Perinthalmanna",
    "Best BIM Course in Perinthalmanna",
    "Best Interior Design Course in Perinthalmanna",
    "Best MEP Course in Perinthalmanna",
    "Best 3ds Max Course in Perinthalmanna",
    "Best SolidWorks Course in Perinthalmanna",
    "Best Product Design Course in Perinthalmanna",
    "Best Project Planning & Management Course in Perinthalmanna",
    "Best BIM Training Institute in Malappuram"
  ];

  // Generate Schema.org FAQPage structured data
  const jsonLdData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }, []);

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset openIdx when search or category changes
  useEffect(() => {
    setOpenIdx(0);
    setIsExpanded(false);
  }, [activeCategory, searchQuery]);

  const visibleFaqs = (isExpanded || filteredFaqs.length <= 6)
    ? filteredFaqs
    : filteredFaqs.slice(0, 6);

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#070D18] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Schema.org JSON-LD Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E94B3C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-COLUMN CLONE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Tilted Photo Frame - Top Aligned & Sticky */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start lg:sticky lg:top-28">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E94B3C]/10 border border-[#E94B3C]/30 text-[#E94B3C] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>

            {/* Tilted Photo Frame Wrapper Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[4/4.6] my-2 px-2 py-2 flex items-center justify-center self-center lg:self-start">
              
              {/* Outer Tilted Wireframe Border Frame (Top-Right Offset, -12.5deg tilt) */}
              <div 
                className="absolute top-1 right-1 sm:right-3 w-[85%] h-[85%] rounded-[26px] border-2 border-[#E94B3C]/40 sm:border-white/30 pointer-events-none transition-transform duration-500"
                style={{
                  transform: 'rotate(-12.5deg) skewX(2deg)',
                  transformOrigin: 'center center'
                }}
              />

              {/* Main Photo Card Container (Bottom-Left Offset, -10.5deg tilt) */}
              <div 
                className="relative w-[88%] h-[86%] rounded-[22px] overflow-hidden shadow-2xl border border-white/20 group cursor-pointer z-10 transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  transform: 'rotate(-10.5deg) translate(-6px, 10px)',
                  transformOrigin: 'center center'
                }}
              >
                <img
                  src="/images/faq-engineer.jpg"
                  alt="CADD Centre Perinthalmanna CAD BIM Student Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay at bottom for image text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/85 via-transparent to-transparent opacity-90" />

                {/* Overlay Badge at Bottom of Image */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0B1322]/85 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E94B3C]/20 border border-[#E94B3C]/40 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-[#E94B3C]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white">Need Expert Advice?</p>
                    <p className="text-[10px] text-gray-400 leading-tight">Our counsellors are ready to guide your career path.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtext below image */}
            <p className="text-xs text-gray-400 mt-2 text-center lg:text-left max-w-sm">
              CADD Centre Perinthalmanna offers industry-certified training in AutoCAD, BIM, Revit, MEP &amp; 3ds Max with 100% placement support.
            </p>
          </div>

          {/* RIGHT COLUMN: Header, Search, Categories & Accordion */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title: 'Ask away.' */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white font-medium leading-tight">
                Ask away<span className="text-[#E94B3C]">.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-2 font-sans">
                Everything you need to know about CAD, BIM, MEP, Interior Design, and Placement Support at CADD Centre Perinthalmanna.
              </p>
            </div>

            {/* Category Filter Pills & Search Bar Row */}
            <div className="space-y-3 pt-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AutoCAD, BIM, MEP, Interior, Placement..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#0B1322] border border-white/10 text-sm text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#E94B3C]/50 focus:border-[#E94B3C] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenIdx(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#E94B3C] text-white shadow-md shadow-[#E94B3C]/20'
                          : 'bg-[#0B1322] hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="border-t border-b border-white/10 divide-y divide-white/10 pt-2">
              {filteredFaqs.length > 0 ? (
                visibleFaqs.map((item, idx) => {
                  const isOpen = openIdx === idx;

                  return (
                    <div key={item.id} className="py-4 sm:py-5 transition-colors">
                      {/* Question Header Button with Right-aligned + / X Box */}
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                      >
                        <span className={`text-base sm:text-lg font-serif transition-colors leading-snug ${
                          isOpen ? 'text-[#E94B3C] font-semibold' : 'text-gray-200 group-hover:text-white'
                        }`}>
                          {item.question}
                        </span>

                        {/* Minimal Square Toggle Box matching reference */}
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border transition-all duration-200 ${
                          isOpen
                            ? 'bg-[#E94B3C]/10 border-[#E94B3C] text-[#E94B3C]'
                            : 'bg-white/5 border-white/10 text-gray-400 group-hover:border-white/30 group-hover:text-white'
                        }`}>
                          {isOpen ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {/* Expanded Answer Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="pt-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans space-y-3">
                              <p>{item.answer}</p>

                              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 mt-3">
                                <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                                  <span>Authorized International Certification &amp; Placements</span>
                                </div>

                                <Button onClick={onOpenDemo} variant="outline" size="sm" className="border-[#E94B3C] text-[#E94B3C] hover:bg-[#E94B3C] hover:text-white text-xs">
                                  Enquire Course
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm text-gray-400">No questions found matching "{searchQuery}".</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-3 text-xs font-bold text-[#E94B3C] hover:underline cursor-pointer"
                  >
                    Reset Search &amp; Category Filters
                  </button>
                </div>
              )}
            </div>

            {/* Show More Questions Toggle */}
            {filteredFaqs.length > 6 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B1322] hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <span>
                    {isExpanded ? (
                      'Show Fewer Questions'
                    ) : (
                      <>
                        See More Questions <span className="px-2 py-0.5 rounded-full bg-[#E94B3C]/20 text-[#E94B3C] text-[11px] font-bold ml-1.5">+{filteredFaqs.length - 6} More</span>
                      </>
                    )}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
              </div>
            )}

            {/* Popular Search Tags Cloud */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3 text-gray-400">
                <Tag className="w-3.5 h-3.5 text-[#E94B3C]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  Popular Searches in Perinthalmanna
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularSearchTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#0B1322] border border-white/5 text-[11px] font-medium text-gray-400 hover:text-white hover:border-[#E94B3C]/30 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

