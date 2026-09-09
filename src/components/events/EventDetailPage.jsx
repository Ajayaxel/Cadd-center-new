import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  Sparkles, 
  ImageIcon, 
  Maximize2, 
  Share2, 
  Check, 
  Award,
  ChevronRight
} from 'lucide-react';
import { formatEventDate } from '../../data/mockEvents';
import EventLightbox from './EventLightbox';
import EventCard from './EventCard';
import Button from '../ui/Button';

export default function EventDetailPage({ event, allEvents = [], onBack, onSelectEvent }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [event?.id]);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center font-['Plus_Jakarta_Sans',sans-serif]">
        <h2 className="text-2xl font-bold text-[#1C2533] mb-2">Event Not Found</h2>
        <p className="text-[#687282] mb-6">The requested event could not be found or has been removed.</p>
        <Button onClick={onBack} variant="primary" size="md">
          Back to Events Page
        </Button>
      </div>
    );
  }

  const galleryImages = event.gallery_images || [];

  const relatedEvents = allEvents
    .filter(e => e.id !== event.id && e.status === 'published')
    .sort((a, b) => {
      if (a.category === event.category && b.category !== event.category) return -1;
      if (a.category !== event.category && b.category === event.category) return 1;
      return new Date(b.event_date) - new Date(a.event_date);
    })
    .slice(0, 3);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F1] pt-24 pb-20 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#687282] hover:text-[#E94B3C] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Events</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-[rgba(28,37,51,0.10)] text-xs font-semibold text-[#1C2533] hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Event</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[rgba(28,37,51,0.10)] rounded-[20px] overflow-hidden shadow-2xs mb-10"
        >
          {/* Cover Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-slate-950">
            <img
              src={event.cover_image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171A20]/90 via-[#171A20]/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-[6px] text-xs font-bold bg-[#E94B3C] text-white shadow-xs">
                {event.category}
              </span>
              {event.is_featured && (
                <span className="px-3 py-1 rounded-[6px] text-xs font-bold bg-amber-400 text-[#171A20] shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Event
                </span>
              )}
            </div>

            {/* Event Title & Meta */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-2.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-[6px] border border-white/15">
                  <Calendar className="w-4 h-4 text-[#E94B3C]" />
                  <span>{formatEventDate(event.event_date)}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-[6px] border border-white/15">
                    <MapPin className="w-4 h-4 text-[#E94B3C]" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#1C2533] flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#E94B3C] rounded-sm" />
                About This Event
              </h2>
              <div className="text-[#687282] leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {/* Quick Summary Box */}
            <div className="p-4 sm:p-5 bg-[#F5F4F1] rounded-[16px] border border-[rgba(28,37,51,0.08)] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#9299A3] uppercase tracking-wider">Date</span>
                <p className="text-xs sm:text-sm font-semibold text-[#1C2533] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E94B3C]" />
                  {formatEventDate(event.event_date)}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#9299A3] uppercase tracking-wider">Location</span>
                <a
                  href="https://www.google.com/maps/dir//CADD+Centre+%7C+CAD+%7C+Interior+Design+%7C+BIM+%7C+MEP+HVAC+Primavera+Autodesk+Product+Design+Training+in+Perinthalmanna,+Malappuram,+Livehi+Arcade,+calicut+road,+above+beautymark+gold,+Perinthalmanna,+Kerala+679321/@11.4682133,76.0043726,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba7cdac0c7c3403:0x4ef801508b806928!2m2!1d76.2222835!2d10.9766876!5m1!1e1?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-[#1C2533] hover:text-[#E94B3C] flex items-center gap-1.5 truncate group cursor-pointer transition-colors"
                  title="Open location in Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#E94B3C] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{event.location || 'CADD Centre Perinthalmanna'}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#9299A3] uppercase tracking-wider">Organizer</span>
                <p className="text-xs sm:text-sm font-semibold text-[#1C2533] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E94B3C]" />
                  CADD Centre Perinthalmanna
                </p>
              </div>
            </div>

            {/* Photo Gallery */}
            {galleryImages.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-[rgba(28,37,51,0.08)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-[#1C2533] flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#E94B3C]" />
                    Photo Gallery ({galleryImages.length})
                  </h2>
                  <span className="text-xs text-[#687282] font-normal hidden sm:inline">
                    Click any image to view in high resolution Lightbox
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={img.id || idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOpenLightbox(idx)}
                      className="group relative aspect-[4/3] rounded-[12px] overflow-hidden bg-slate-100 border border-[rgba(28,37,51,0.10)] cursor-pointer shadow-2xs transition-all"
                    >
                      <img
                        src={img.image_url}
                        alt={img.caption || `Event photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#171A20]/0 group-hover:bg-[#171A20]/40 transition-colors duration-200 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-[8px] bg-white text-[#1C2533] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <Maximize2 className="w-4 h-4 text-[#E94B3C]" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-[#1C2533]">
                Related Events &amp; Activities
              </h3>
              <Button onClick={onBack} variant="link" size="sm">
                View All Events
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedEvents.map((relEvent) => (
                <EventCard
                  key={relEvent.id}
                  event={relEvent}
                  onClick={(selected) => onSelectEvent && onSelectEvent(selected)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <EventLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
