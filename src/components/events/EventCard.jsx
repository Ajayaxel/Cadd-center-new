import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { formatEventDate } from '../../data/mockEvents';

export default function EventCard({ event, onClick }) {
  if (!event) return null;

  const galleryCount = event.gallery_images ? event.gallery_images.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
      onClick={() => onClick && onClick(event)}
      className="group relative bg-white border border-[rgba(28,37,51,0.10)] rounded-[16px] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#E94B3C]/40 transition-all duration-200 flex flex-col cursor-pointer select-none font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Event Cover Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={event.cover_image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171A20]/80 via-[#171A20]/20 to-transparent opacity-80" />

        {/* Category Pill Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wide bg-white/90 backdrop-blur-md text-[#1C2533]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C]" />
            {event.category}
          </span>
        </div>

        {/* Featured Badge or Gallery Count */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
          {event.is_featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-[#E94B3C] text-white">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {galleryCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-[#171A20]/80 text-white">
              <ImageIcon className="w-3 h-3 text-[#E94B3C]" />
              {galleryCount}
            </span>
          )}
        </div>

        {/* Date overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 text-white flex items-center gap-1.5 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#E94B3C] shrink-0" />
          <span>{formatEventDate(event.event_date)}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-[#1C2533] line-clamp-2 group-hover:text-[#E94B3C] transition-colors leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-[#687282] line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-3 border-t border-[rgba(28,37,51,0.08)] flex items-center justify-between">
          <span className="text-xs font-medium text-[#687282] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#9299A3]" />
            <span className="truncate max-w-[140px]">{event.location ? event.location.split(',')[0] : 'Perinthalmanna'}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E94B3C] group-hover:translate-x-0.5 transition-transform">
            {galleryCount > 0 ? 'View Gallery' : 'View Event'}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
