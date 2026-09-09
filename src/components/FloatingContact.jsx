import React from 'react';
import { Phone } from 'lucide-react';

// Single point of truth for the enquiry number used by both buttons.
const PHONE = '+917025569638';
const PHONE_DISPLAY = '+91 70255 69638';
const WHATSAPP = 'https://wa.me/917025569638';
const INSTAGRAM = 'https://www.instagram.com/caddcentreperinthalmanna/?hl=en';
const INSTAGRAM_HANDLE = '@caddcentreperinthalmanna';

// lucide-react no longer ships brand marks, so the WhatsApp glyph is inlined.
function WhatsAppGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// Same outline mark the footer uses, so the brand reads consistently.
function InstagramGlyph({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Persistent call / WhatsApp / Instagram buttons stacked in the bottom-right corner.
 *
 * z-40 keeps them under the enquiry modal and course sheet (z-50) so they can
 * never sit on top of an open dialog, and the safe-area insets keep them clear
 * of the iOS home indicator.
 */
export default function FloatingContact() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 flex flex-col items-end gap-3">
        {/* Call */}
        <a
          href={`tel:${PHONE}`}
          aria-label={`Call CADD Centre Perinthalmanna on ${PHONE_DISPLAY}`}
          title={`Call ${PHONE_DISPLAY}`}
          className="pointer-events-auto w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-full bg-[#E94B3C] hover:bg-[#D4382A] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E94B3C] focus-visible:ring-offset-2"
        >
          <Phone className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
        </a>

        {/* WhatsApp */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with CADD Centre Perinthalmanna on WhatsApp at ${PHONE_DISPLAY}`}
          title={`WhatsApp ${PHONE_DISPLAY}`}
          className="pointer-events-auto w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <WhatsAppGlyph className="w-7 h-7 sm:w-[30px] sm:h-[30px]" />
        </a>

        {/* Instagram */}
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message CADD Centre Perinthalmanna on Instagram at ${INSTAGRAM_HANDLE}`}
          title={`Instagram ${INSTAGRAM_HANDLE}`}
          className="pointer-events-auto w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-full bg-[linear-gradient(45deg,#F58529_0%,#DD2A7B_45%,#8134AF_70%,#515BD4_100%)] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DD2A7B] focus-visible:ring-offset-2"
        >
          <InstagramGlyph className="w-7 h-7 sm:w-[30px] sm:h-[30px]" />
        </a>
      </div>
    </div>
  );
}
