import { cn } from '@/lib/cn';
import React from 'react';

export interface StatProps {
  value: string;
  label: string;
  source?: string | null;
  year?: string | null;
  goal?: boolean;
  onDark?: boolean;
  className?: string;
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  source,
  year,
  goal = false,
  onDark = false,
  className,
}) => {
  // Build-time / runtime constraint check (Design.md §10.3 & TRD.md FR-07-03)
  const isSourced = Boolean(source && year);
  const isValid = isSourced || goal;

  if (!isValid && process.env.NODE_ENV !== 'production') {
    console.warn(`Stat rendering warning: Stat for "${label}" requires a source+year or goal={true}.`);
  }

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      {goal ? (
        <span
          className={cn(
            'text-[11px] font-bold uppercase tracking-[0.09em]',
            onDark ? 'text-[var(--color-brand-on-dark)]' : 'text-[var(--color-brand-primary)]'
          )}
        >
          Goal — Year 1 Target
        </span>
      ) : isSourced ? (
        <span
          className={cn(
            'text-[11px] font-semibold tracking-wider uppercase',
            onDark ? 'text-slate-400' : 'text-[var(--color-text-tertiary)]'
          )}
        >
          Sourced ({year})
        </span>
      ) : (
        <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
          Unverified Stat
        </span>
      )}

      <div
        className={cn(
          'font-mono font-bold text-3xl md:text-5xl tracking-tight tabular-nums',
          onDark ? 'text-[var(--color-surface-base)]' : 'text-[var(--color-text-primary)]'
        )}
      >
        {value}
      </div>

      <div
        className={cn(
          'text-sm font-medium leading-snug',
          onDark ? 'text-slate-300' : 'text-[var(--color-text-secondary)]'
        )}
      >
        {label}
      </div>

      {source && (
        <div
          className={cn(
            'text-[12px] pt-1 italic',
            onDark ? 'text-slate-400' : 'text-[var(--color-text-tertiary)]'
          )}
        >
          Source: {source} ({year})
        </div>
      )}
    </div>
  );
};
