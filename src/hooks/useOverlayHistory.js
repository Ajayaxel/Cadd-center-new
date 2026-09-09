import { useEffect, useRef } from 'react';

/**
 * Gives an overlay (modal, bottom sheet, mobile menu) its own history entry so
 * the phone's back gesture — left-edge swipe on iOS, the Android back button,
 * the browser Back button — closes the overlay instead of leaving the site.
 *
 * Opening pushes an entry; a popstate while open closes the overlay; closing
 * from the UI (X, backdrop, Escape) steps that entry back off so the history
 * stack never grows with dead entries.
 *
 * The URL is left untouched — use this for overlays that are not addressable.
 * Course details are addressable and manage their own URLs in Features.jsx.
 */
export default function useOverlayHistory(isOpen, onClose) {
  const pushedRef = useRef(false);
  // Set while a popstate is what closed us, so the cleanup below doesn't call
  // history.back() a second time and swallow a real navigation.
  const closedByPopRef = useRef(false);
  // Kept in a ref so re-renders with a fresh onClose don't re-run the effects.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;

    if (!pushedRef.current) {
      pushedRef.current = true;
      window.history.pushState({ overlay: true }, '');
    }

    const handlePop = () => {
      pushedRef.current = false;
      closedByPopRef.current = true;
      onCloseRef.current();
    };

    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;

    if (closedByPopRef.current) {
      closedByPopRef.current = false;
      return;
    }

    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    }
  }, [isOpen]);
}
