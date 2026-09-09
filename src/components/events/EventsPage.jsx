import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  MapPin,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { EVENT_CATEGORIES, formatEventDate } from '../../data/mockEvents';
import EventCard from './EventCard';
import EventsSkeleton from './EventsSkeleton';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

export default function EventsPage({ events = [], onSelectEvent }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredEvent = useMemo(() => {
    const published = events.filter(e => e.status === 'published');
    const featured = published.find(e => e.is_featured);
    return featured || published[0] || null;
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.status === 'published')
      .filter((e) => {
        if (selectedCategory !== 'All' && e.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = e.title.toLowerCase().includes(q);
          const matchDesc = e.description.toLowerCase().includes(q);
          const matchCategory = e.category.toLowerCase().includes(q);
          const matchLoc = e.location ? e.location.toLowerCase().includes(q) : false;
          return matchTitle || matchDesc || matchCategory || matchLoc;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.event_date) - new Date(b.event_date);
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return new Date(b.event_date) - new Date(a.event_date);
      });
  }, [events, selectedCategory, searchQuery, sortBy]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-[#F5F4F1] pt-24 pb-20 w-full font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="EVENTS & CELEBRATIONS"
            title="Campus Life & Milestone Events"
            description="Explore workshops, tech competitions, student achievements, and celebrations at CADD Centre Perinthalmanna."
            align="center"
          />
        </div>

        {/* Featured Event Banner */}
        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onSelectEvent(featuredEvent)}
            className="mb-10 bg-white border border-[rgba(28,37,51,0.10)] rounded-[20px] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer group select-none"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-950">
                <img
                  src={featuredEvent.cover_image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[11px] font-bold bg-[#E94B3C] text-white shadow-xs">
                    FEATURED EVENT
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold bg-[#F5F4F1] text-[#1C2533] border border-[rgba(28,37,51,0.08)]">
                      {featuredEvent.category}
                    </span>
                    <span className="text-xs text-[#687282] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E94B3C]" />
                      {formatEventDate(featuredEvent.event_date)}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#1C2533] group-hover:text-[#E94B3C] transition-colors leading-tight">
                    {featuredEvent.title}
                  </h2>

                  <p className="text-[#687282] text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredEvent.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(28,37,51,0.08)] flex items-center justify-between">
                  <span className="text-xs text-[#687282] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9299A3]" />
                    <span className="truncate max-w-[180px]">{featuredEvent.location || 'Perinthalmanna Campus'}</span>
                  </span>

                  <Button variant="primary" size="sm">
                    View Event
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-white border border-[rgba(28,37,51,0.10)] rounded-[16px] p-4 sm:p-5 shadow-2xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9299A3]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, workshops..."
                className="w-full pl-9 pr-3 py-2 rounded-[8px] border border-[rgba(28,37,51,0.10)] bg-[#F5F4F1] text-xs sm:text-sm text-[#1C2533] placeholder:text-[#9299A3] focus:outline-none focus:border-[#E94B3C] focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-[#687282]">
                Showing <strong className="text-[#1C2533]">{filteredEvents.length}</strong> events
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#F5F4F1] border border-[rgba(28,37,51,0.10)] rounded-[8px] pl-3 pr-8 py-2 text-xs font-semibold text-[#1C2533] focus:outline-none focus:border-[#E94B3C] cursor-pointer"
                >
                  <option value="latest">Sort by: Latest First</option>
                  <option value="oldest">Sort by: Oldest First</option>
                  <option value="title">Sort by: Title (A-Z)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9299A3] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-1.5 pt-2 border-t border-[rgba(28,37,51,0.08)]">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#9299A3] uppercase tracking-wider">
              <span>Filter by Category</span>
              {(selectedCategory !== 'All' || searchQuery !== '') && (
                <button
                  onClick={handleResetFilters}
                  className="text-[#E94B3C] hover:underline flex items-center gap-1 capitalize font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {EVENT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const catCount = cat === 'All'
                  ? events.filter(e => e.status === 'published').length
                  : events.filter(e => e.status === 'published' && e.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(6);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${isActive
                        ? 'bg-[#E94B3C] text-white shadow-xs'
                        : 'bg-[#F5F4F1] text-[#687282] hover:bg-slate-200 hover:text-[#1C2533]'
                      }`}
                  >
                    <span>{cat}</span>
                    <span className={`px-1.5 py-0.2 rounded-[3px] text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#687282]'
                      }`}>
                      {catCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <EventsSkeleton count={visibleCount} />
        ) : displayedEvents.length > 0 ? (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={(selected) => onSelectEvent(selected)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="text-center pt-4">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  variant="secondary"
                  size="md"
                >
                  Load More Events ({filteredEvents.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-[rgba(28,37,51,0.10)] rounded-[16px] p-10 text-center space-y-3 max-w-md mx-auto shadow-2xs">
            <h3 className="text-lg font-bold text-[#1C2533]">No Events Found</h3>
            <p className="text-xs text-[#687282] leading-relaxed">
              We couldn't find any events matching "{searchQuery}".
            </p>
            <Button onClick={handleResetFilters} variant="secondary" size="sm">
              Clear All Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
