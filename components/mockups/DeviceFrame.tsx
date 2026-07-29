'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, className }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[320px] md:max-w-[340px] aspect-[9/18] rounded-[44px] p-3 bg-slate-900 border-[4px] border-slate-800 shadow-[0_12px_32px_rgba(11,18,32,0.18)] select-none',
        !prefersReducedMotion && 'animate-[float_6s_ease-in-out_infinite]',
        className
      )}
    >
      {/* Speaker / Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
        <div className="w-8 h-1 bg-slate-800 rounded-full" />
      </div>

      {/* Internal Screen Container */}
      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[var(--color-surface-base)] flex flex-col pt-6">
        {children}
      </div>

      {/* Custom float animation keyframes style */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};
