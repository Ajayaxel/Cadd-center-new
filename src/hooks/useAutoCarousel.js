import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives a horizontal snap rail that advances on its own.
 *
 * Returns the props to spread onto the scrolling element, the active index for
 * dot indicators, and a `goTo` for tapping a dot. The rail pauses while the
 * viewer is touching or hovering it, and while `paused` is true (e.g. a
 * lightbox is open), so it never yanks a card out from under a finger.
 */
export default function useAutoCarousel(count, { interval = 2800, paused = false } = {}) {
  const railRef = useRef(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const animRef = useRef(null);
  const animatingRef = useRef(false);

  const goTo = useCallback((next) => {
    const rail = railRef.current;
    const card = rail?.children[next];
    if (!rail || !card) return;
    // Measure against the rail itself: it is not a positioned ancestor, so
    // card.offsetLeft would be relative to some outer element instead.
    const delta =
      card.getBoundingClientRect().left -
      rail.getBoundingClientRect().left -
      (rail.clientWidth - card.clientWidth) / 2;

    indexRef.current = next;
    setIndex(next);

    const from = rail.scrollLeft;
    const to = from + delta;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || Math.abs(delta) < 1) {
      rail.scrollLeft = to;
      return;
    }

    // Deliberately not scrollTo({behavior:'smooth'}): the page's smooth-scroll
    // library swallows native smooth scrolls on some rails, leaving the rail
    // parked while the dots advance. Tweening scrollLeft ourselves always works.
    animatingRef.current = true;
    const start = performance.now();
    const DURATION = 420;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      rail.scrollLeft = from + (to - from) * easeOutCubic(t);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animatingRef.current = false;
        animRef.current = null;
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    if (paused || interacting || count <= 1) return;
    const id = setInterval(() => {
      goTo((indexRef.current + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [paused, interacting, count, interval, goTo]);

  // Keep the dots honest when the viewer swipes the rail themselves.
  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail || animatingRef.current) return;
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    [...rail.children].forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.clientWidth / 2 - mid);
      if (d < best) {
        best = d;
        closest = i;
      }
    });
    indexRef.current = closest;
    setIndex(closest);
  };

  const railProps = {
    ref: railRef,
    onScroll: handleScroll,
    onPointerDown: () => setInteracting(true),
    onPointerUp: () => setInteracting(false),
    onPointerCancel: () => setInteracting(false),
    onMouseEnter: () => setInteracting(true),
    onMouseLeave: () => setInteracting(false)
  };

  return { railProps, index, goTo };
}
