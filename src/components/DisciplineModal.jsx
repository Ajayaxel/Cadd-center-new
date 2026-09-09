import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, ArrowRight, Sparkles, Layers, Box, Cpu, Wrench, 
  Building, Shield, Palette, Landmark, BarChart3, ChevronRight,
  Download, BookOpen, Clock, Award, Check
} from 'lucide-react';

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

export default function DisciplineModal({ discipline, isOpen, onClose, onEnquire }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'tools' | 'outcomes' | 'workflow'

  if (!isOpen || !discipline) return null;

  const IconComponent = iconMap[discipline.iconName] || Building;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 shrink-0">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
                <IconComponent className="w-7 h-7" />
              </div>
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {discipline.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Industry-Aligned Program
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {discipline.title}
                </h3>
                {discipline.tagline && (
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    {discipline.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Navigation Tabs inside header */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', label: 'Overview & Summary' },
                { id: 'tools', label: 'Popular Areas & Tools Covered' },
                { id: 'outcomes', label: 'Key Learning Outcomes' },
                { id: 'workflow', label: 'Complete Industry Workflow' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FAFBFD]">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 2-column highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Left: Tools Summary */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-3.5">
                      <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-rose-500" />
                        Software & Tools Ecosystem
                      </h4>
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        Industry Standard
                      </span>
                    </div>
                    <div className="space-y-3">
                      {discipline.toolsCovered.map((grp, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <p className="text-xs font-bold text-slate-700 mb-2">{grp.category}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {grp.tools.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200/80 text-slate-800 shadow-2xs"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Key Workflow Summary */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-rose-500" />
                          Industry Delivery Workflow
                        </h4>
                        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {discipline.workflow.length} Stages
                        </span>
                      </div>
                      <div className="space-y-2">
                        {discipline.workflow.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2.5 text-xs text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </span>
                            <span className="font-semibold">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                        <Award className="w-4 h-4" /> CADD Centre International Certificate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Learning Outcomes preview */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Key Competencies You Will Gain
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {discipline.outcomes.slice(0, 4).map((out, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <div>
                          <strong className="text-slate-800 font-bold">{out.title}: </strong>
                          <span className="text-slate-600">{out.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: POPULAR AREAS & TOOLS COVERED */}
            {activeTab === 'tools' && (
              <div className="space-y-5">
                <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-rose-600 shrink-0" />
                  <p className="text-xs text-rose-900 font-medium">
                    Hands-on practical training utilizing official software suites, real project templates, and industry standards at our Perinthalmanna center.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discipline.toolsCovered.map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <h4 className="text-base font-extrabold text-slate-900">{group.category}</h4>
                        </div>
                        <div className="space-y-2">
                          {group.tools.map((tool, tIdx) => (
                            <div
                              key={tIdx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/50 border border-slate-100 transition-colors"
                            >
                              <span className="text-xs font-bold text-slate-800">{tool}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                                Certified Module
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: KEY LEARNING OUTCOMES */}
            {activeTab === 'outcomes' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {discipline.outcomes.map((outcome, oIdx) => (
                    <div
                      key={oIdx}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-start gap-4 hover:border-rose-300 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 font-extrabold text-xs flex items-center justify-center shrink-0 border border-rose-100">
                        {oIdx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                          {outcome.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {outcome.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: COMPLETE INDUSTRY WORKFLOW */}
            {activeTab === 'workflow' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
                  <h4 className="text-base font-extrabold text-slate-900 mb-1">
                    End-to-End Professional Industry Pipeline
                  </h4>
                  <p className="text-xs text-slate-500 mb-6 max-w-lg mx-auto">
                    Students are trained to follow the complete real-world delivery sequence from initial engineering concept to fabrication and collaboration.
                  </p>

                  {/* Linear Step Flow */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {discipline.workflow.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{step}</span>
                        </div>
                        {idx < discipline.workflow.length - 1 && (
                          <div className="text-rose-400 font-black">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Workflow Value Proposition */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center">
                    <p className="text-lg font-black text-slate-900">100%</p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Real-World Project Practice</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center">
                    <p className="text-lg font-black text-rose-600">Global Standards</p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">AEC & Mechanical CAD Norms</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center">
                    <p className="text-lg font-black text-emerald-600">Career Ready</p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Portfolio & Detailing Skills</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">Ready to master {discipline.title}?</p>
              <p className="text-[11px] text-slate-500">Batches starting soon at CADD Centre Perinthalmanna.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEnquire(discipline);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#EA4C28] text-white text-xs font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Enquire For This Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
