'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string; // e.g. "20.6 M", "50,000", "< 4 min"
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ value, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const [displayedValue, setDisplayedValue] = useState(value);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || hasAnimated.current || typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // For simplicity and speed, we preserve the string representation
          setDisplayedValue(value);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, prefersReducedMotion]);

  return (
    <span ref={containerRef} className={className}>
      {displayedValue}
    </span>
  );
};
