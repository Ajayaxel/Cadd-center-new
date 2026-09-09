import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Wrench, Cpu, Layers, Shield, Palette, Box, Landmark, BarChart3,
  Sparkles, CheckCircle2, ArrowRight, BookOpen, Layers3, Zap, Check, FileText
} from 'lucide-react';
import { disciplinesData } from '../data/disciplinesData';

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

export default function CurriculumWorkflowShowcase({ onOpenDemo }) {
  const [activeDisciplineId, setActiveDisciplineId] = useState('interior-design');
  const [activeView, setActiveView] = useState('tools'); // 'tools' | 'outcomes' | 'workflow'

  const activeDiscipline = disciplinesData.find((d) => d.id === activeDisciplineId) || disciplinesData[0];
  const IconComp = iconMap[activeDiscipline.iconName] || Building;

  return (
    <section id="tools" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#FF5A36] text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Curriculum Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Software Tools & Professional Workflows
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Deep-dive into the industry-standard software packages and end-to-end production pipelines taught at CADD Centre Perinthalmanna.
          </p>
        </div>

        {/* Horizontal Discipline Selector Bar */}
        <div className="flex items-center gap-2 pb-4 overflow-x-auto no-scrollbar justify-start lg:justify-center mb-10">
          {disciplinesData.map((discipline) => {
            const isSelected = discipline.id === activeDisciplineId;
            const ItemIcon = iconMap[discipline.iconName] || Building;

            return (
              <button
                key={discipline.id}
                onClick={() => setActiveDisciplineId(discipline.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-102'
                    : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-rose-400' : 'text-slate-500'}`} />
                <span>{discipline.cardTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Content Container */}
        <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Header Bar of Selected Discipline */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-[#FF5A36] flex items-center justify-center shrink-0 shadow-2xs">
                <IconComp className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100/70 text-[#FF5A36]">
                    {activeDiscipline.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">CADD Centre Perinthalmanna</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {activeDiscipline.title}
                </h3>
              </div>
            </div>

            {/* View Switcher (Tools / Outcomes / Workflow) */}
            <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs self-stretch md:self-auto justify-center">
              <button
                onClick={() => setActiveView('tools')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'tools'
                    ? 'bg-[#FF5A36] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Popular Areas & Tools
              </button>
              <button
                onClick={() => setActiveView('outcomes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'outcomes'
                    ? 'bg-[#FF5A36] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Key Learning Outcomes
              </button>
              <button
                onClick={() => setActiveView('workflow')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'workflow'
                    ? 'bg-[#FF5A36] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                End-to-End Workflow
              </button>
            </div>
          </div>

          {/* Dynamic Content Views */}
          <div className="pt-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              {/* VIEW 1: POPULAR AREAS & TOOLS COVERED */}
              {activeView === 'tools' && (
                <motion.div
                  key={`tools-${activeDiscipline.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {activeDiscipline.toolsCovered.map((cat, cIdx) => (
                      <div
                        key={cIdx}
                        className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                          <span className="w-2 h-2 rounded-full bg-[#FF5A36]" />
                          <h4 className="text-sm font-extrabold text-slate-900">{cat.category}</h4>
                        </div>
                        <ul className="space-y-2">
                          {cat.tools.map((tool, tIdx) => (
                            <li
                              key={tIdx}
                              className="flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50 hover:bg-rose-50/60 p-2.5 rounded-xl border border-slate-100 transition-colors"
                            >
                              <span>{tool}</span>
                              <span className="text-[10px] font-semibold text-rose-600 bg-white px-2 py-0.5 rounded border border-rose-100">
                                Included
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* VIEW 2: KEY LEARNING OUTCOMES */}
              {activeView === 'outcomes' && (
                <motion.div
                  key={`outcomes-${activeDiscipline.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {activeDiscipline.outcomes.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-start gap-4 hover:border-rose-300 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-600 font-extrabold text-xs flex items-center justify-center shrink-0 border border-rose-200">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* VIEW 3: END-TO-END WORKFLOW PIPELINE */}
              {activeView === 'workflow' && (
                <motion.div
                  key={`workflow-${activeDiscipline.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm text-center">
                    <h4 className="text-base font-extrabold text-slate-900 mb-2">
                      Professional Industry Workflow Pipeline
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xl mx-auto mb-8">
                      At CADD Centre Perinthalmanna, every student masters the full lifecycle sequence practiced in top architecture, engineering, and construction firms:
                    </p>

                    {/* Step-by-Step Flow Graphic */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {activeDiscipline.workflow.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-[#FF5A36] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{step}</span>
                          </div>
                          {idx < activeDiscipline.workflow.length - 1 && (
                            <div className="text-[#FF5A36] font-extrabold">
                              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>International CADD Centre Certification & Placement Support Included</span>
            </div>

            <button
              onClick={() => onOpenDemo(activeDiscipline.title)}
              className="w-full sm:w-auto bg-[#FF5A36] hover:bg-[#EA4C28] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enquire for {activeDiscipline.cardTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
