import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';

export default function EventLightbox({ images = [], currentIndex = 0, isOpen = false, onClose, onNavigate }) {
  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard Navigation: Escape to close, ArrowLeft / ArrowRight to switch images
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll when open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || {};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 select-none">
        {/* Close button top right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter Badge top left */}
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200 backdrop-blur-md border border-white/10">
            Photo {currentIndex + 1} of {images.length}
          </span>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {/* Image Container with Motion animation */}
        <div className="relative max-w-5xl max-h-[82vh] w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.img
            key={currentIndex}
            src={currentImage.image_url}
            alt={currentImage.caption || `Gallery photo ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
          />

          {/* Caption */}
          {currentImage.caption && (
            <motion.p
              key={`cap-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-xs sm:text-sm text-slate-300 font-medium max-w-xl px-4"
            >
              {currentImage.caption}
            </motion.p>
          )}
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {/* Bottom thumbnail strip for fast selection */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 z-50 flex justify-center px-4">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-md max-w-md overflow-x-auto no-scrollbar border border-white/10">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => onNavigate(idx)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
                    idx === currentIndex
                      ? 'ring-2 ring-[rgb(240,82,87)] scale-105 opacity-100'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
