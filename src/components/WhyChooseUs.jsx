import React from 'react';
import { 
  Workflow, 
  Wrench, 
  Target, 
  GraduationCap, 
  Milestone, 
  Rocket, 
  CheckCircle2
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

export default function WhyChooseUs({ onOpenDemo }) {
  const highlights = [
    {
      title: "Industry-Oriented Learning",
      description: "Learn the tools and workflows used across engineering, architecture, construction and design industries.",
      icon: <Workflow className="w-5 h-5 text-[#E94B3C]" />,
      badge: "Workflow"
    },
    {
      title: "Practical Training",
      description: "Develop hands-on knowledge through practical exercises, projects and application-based learning.",
      icon: <Wrench className="w-5 h-5 text-[#E94B3C]" />,
      badge: "Hands-on"
    },
    {
      title: "Career-Focused Programs",
      description: "Choose programs designed to help students build skills relevant to today's job market.",
      icon: <Target className="w-5 h-5 text-[#E94B3C]" />,
      badge: "Skills"
    },
    {
      title: "Experienced Guidance",
      description: "Learn with guidance from trainers and mentors who understand industry requirements.",
      icon: <GraduationCap className="w-5 h-5 text-[#E94B3C]" />,
      badge: "Mentorship"
    },
    {
      title: "Multiple Career Paths",
      description: "Explore opportunities across Civil, Mechanical, Electrical, MEP, BIM, Interior Design and Project Management.",
      icon: <Milestone className="w-5 h-5 text-[#E94B3C]" />,
      badge: "Opportunities"
    },
    {
      title: "Placement Support",
      description: "Get career guidance and placement assistance to help you prepare for professional opportunities.",
      icon: <Rocket className="w-5 h-5 text-[#E94B3C]" />,
      badge: "Assistance"
    }
  ];

  return (
    <section id="why-choose-us-pillars" className="py-10 sm:py-24 bg-[#F5F4F1] font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
          <SectionHeading
            eyebrow="OUR ADVANTAGE"
            title="Why Students & Professionals Choose CADD Centre"
            description="We empower learners with practical engineering knowledge, industry-aligned workflows, and dedicated career guidance to ensure long-term success."
            align="center"
          />
        </div>

        {/* 6-CARD HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[16px] p-6 sm:p-7 border border-[rgba(28,37,51,0.10)] shadow-2xs hover:border-[#E94B3C]/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-[8px] bg-[#F5F4F1] border border-[rgba(28,37,51,0.10)] flex items-center justify-center shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#687282] uppercase tracking-wider bg-[#F5F4F1] px-2.5 py-1 rounded-[4px] border border-[rgba(28,37,51,0.08)]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1C2533] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#687282] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[rgba(28,37,51,0.08)] flex items-center gap-1.5 text-xs font-semibold text-[#1C2533]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Industry Aligned</span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION CARD */}
        <div className="mt-10 sm:mt-12 bg-white rounded-[16px] p-6 sm:p-8 border border-[rgba(28,37,51,0.10)] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-[#1C2533]">
              Ready to start your design &amp; engineering journey?
            </h4>
            <p className="text-xs text-[#687282]">
              Talk with our education counselors in Perinthalmanna today.
            </p>
          </div>

          <Button onClick={onOpenDemo} variant="primary" size="md">
            Enquire Now
          </Button>
        </div>

      </div>
    </section>
  );
}
