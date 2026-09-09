import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import AboutUs from './components/AboutUs';
import PlacementSection from './components/PlacementSection';
import HomepageEvents from './components/events/HomepageEvents';
import Features from './components/Features';
import Integrations from './components/Integrations';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import FloatingContact from './components/FloatingContact';
import Preloader from './components/Preloader';
import { getStoredEvents } from './data/mockEvents';
import SmoothScroll from './components/motion/SmoothScroll';
import useOverlayHistory from './hooks/useOverlayHistory';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [events] = useState(() => getStoredEvents());

  // Back / swipe-back closes the enquiry modal instead of leaving the site.
  useOverlayHistory(demoOpen, () => setDemoOpen(false));

  return (
    <SmoothScroll>
      <Preloader />
      <div className="min-h-screen bg-[#080D14] text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#0284C7]/30 selection:text-[#38BDF8] overflow-x-hidden">
        {/* Main Landing Page Flow */}
        <main>
          {/* Section 1: Target Clean Energy Hero with Integrated Navigation */}
          <Hero onOpenDemo={() => setDemoOpen(true)} />

          {/* Section 2: Why Choose Us & Career Journey (StatsBanner) */}
          <StatsBanner onOpenDemo={() => setDemoOpen(true)} />

          {/* Section 3: Course Offerings */}
          <Features onOpenDemo={() => setDemoOpen(true)} />

          {/* Section 4: Placement & Career Preparation */}
          <PlacementSection onOpenDemo={() => setDemoOpen(true)} />

          {/* Section 5: Events & Campus Happenings */}
          <HomepageEvents
            events={events}
            onOpenDemo={() => setDemoOpen(true)}
          />

          {/* Section 6: About Us */}
          <AboutUs onOpenDemo={() => setDemoOpen(true)} />

          {/* Section 7: Specialized Disciplines Course Explorer (Hidden for now, preserved for future use) */}
          {/* <Integrations onOpenDemo={() => setDemoOpen(true)} /> */}

          {/* Section 8: Words of Appreciation Testimonials */}
          <Testimonials />

          {/* Section 9: Frequently Asked Questions & SEO */}
          <FaqSection onOpenDemo={() => setDemoOpen(true)} />
        </main>

        {/* Footer with Floating Overlapping Newsletter */}
        <Footer onOpenDemo={() => setDemoOpen(true)} />

        {/* Always-available call & WhatsApp buttons */}
        <FloatingContact />

        {/* Admission & Enquiry Request Modal */}
        <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
