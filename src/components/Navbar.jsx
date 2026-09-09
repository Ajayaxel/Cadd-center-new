import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar({ onOpenDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-[1440px] px-6 lg:px-8 py-4 sm:py-5 pointer-events-auto bg-transparent border-b border-[#22120F]/60 flex items-center justify-between mx-2 sm:mx-4">

        {/* Brand Logo - Official CADD Centre Perinthalmanna Logo */}
        <a
          href="#"
          className="flex items-center select-none cursor-pointer focus:outline-none shrink-0"
          aria-label="CADD Centre Perinthalmanna Home"
        >
          <img
            src="/CADD.png"
            alt="CADD Centre Perinthalmanna Logo"
            className="h-10 sm:h-11 lg:h-[48px] w-auto object-contain shrink-0 transition-transform duration-200 hover:opacity-90"
          />
        </a>

        {/* Navigation Links: Home · About Us · Courses · Placements · Events · Reviews */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-xs sm:text-sm font-medium text-[#D1D5DB]">
          <a
            href="#"
            className="hover:text-white transition-colors text-white font-semibold"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-white transition-colors"
          >
            About Us
          </a>

          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Courses
          </a>

          <a
            href="#placement"
            className="hover:text-white transition-colors"
          >
            Placements
          </a>

          <a
            href="#events"
            className="hover:text-white transition-colors"
          >
            Events
          </a>

          <a
            href="#testimonials"
            className="hover:text-white transition-colors"
          >
            Reviews
          </a>
        </nav>

        {/* Actions: Contact + Primary CTA Button */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={onOpenDemo}
            className="text-xs sm:text-sm font-medium text-[#D1D5DB] hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
          <Button onClick={onOpenDemo} variant="primary" size="sm">
            Enquire Now
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-[8px] text-slate-200 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 bg-[#140A08] border border-[#261411] rounded-2xl p-5 shadow-2xl md:hidden space-y-3 text-center pointer-events-auto text-white">
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-medium text-slate-200">Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-200">About Us</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-200">Courses</a>
          <a href="#placement" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-200">Placements</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-200">Events</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-200">Reviews</a>
          <div className="pt-2 border-t border-white/10 flex justify-center">
            <Button onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }} variant="primary" size="md" className="w-full">
              Enquire Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
