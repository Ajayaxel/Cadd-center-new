import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  type = 'fadeUp',
  delay = 0,
  duration = 0.8,
  ease = 'power3.out',
  className = '',
  triggerHook = 'top 88%',
  ...props
}) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: richer motion
      mm.add('(min-width: 1024px)', () => {
        let fromVars = { autoAlpha: 0 };
        switch (type) {
          case 'fadeUp':
          case 'fade-up':
            fromVars = { autoAlpha: 0, y: 35 };
            break;
          case 'fadeDown':
          case 'fade-down':
            fromVars = { autoAlpha: 0, y: -35 };
            break;
          case 'fadeLeft':
          case 'fade-left':
            fromVars = { autoAlpha: 0, x: -30 };
            break;
          case 'fadeRight':
          case 'fade-right':
            fromVars = { autoAlpha: 0, x: 30 };
            break;
          case 'scale':
            fromVars = { autoAlpha: 0, scale: 0.95, y: 15 };
            break;
          default:
            fromVars = { autoAlpha: 0, y: 25 };
        }

        gsap.fromTo(el, fromVars, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            once: true,
          },
        });
      });

      // Mobile & Tablet: light subtle vertical motion only, zero horizontal x transforms
      mm.add('(max-width: 1023px)', () => {
        let fromVars = { autoAlpha: 0, y: 20 };
        if (type === 'scale') {
          fromVars = { autoAlpha: 0, scale: 0.98, y: 10 };
        }

        gsap.fromTo(el, fromVars, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: Math.min(delay, 0.2),
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        });
      });
    }, elRef);

    return () => ctx.revert();
  }, [type, delay, duration, ease, triggerHook]);

  return (
    <div ref={elRef} className={className} {...props}>
      {children}
    </div>
  );
}
