'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'none';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const yOffset = direction === 'up' ? 16 : 0;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.48, // 'slow' token 480ms
          delay: delay * 0.1,
          ease: [0.16, 1, 0.3, 1], // ease-entrance
        }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
