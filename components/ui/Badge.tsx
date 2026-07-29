import { cn } from '@/lib/cn';
import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)] text-[13px] font-semibold tracking-wide uppercase',
        className
      )}
    >
      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </span>
  );
};
