import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', strength = 0.25, ...props }) {
  const btnRef = useRef(null);

  useEffect(() => {
    // Only activate for fine pointer devices (desktop mouse, trackpad), never on touch/mobile
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isFinePointer || prefersReducedMotion) return;

    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

      gsap.to(btn, {
        x: Math.max(-6, Math.min(6, x)),
        y: Math.max(-6, Math.min(6, y)),
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(btn);
    };
  }, [strength]);

  return (
    <div ref={btnRef} className={`inline-block ${className}`} {...props}>
      {children}
    </div>
  );
}
