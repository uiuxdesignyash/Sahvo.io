'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import Lenis from 'lenis';
import React, { useEffect } from 'react';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    let lenis: Lenis | null = null;

    try {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.14, // TRD.md SCR-01
        smoothWheel: true,
        wheelMultiplier: 1, // TRD.md SCR-05
        touchMultiplier: 1,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis failed to initialize, falling back to native scroll:', e);
    }

    return () => {
      lenis?.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
};
