import { cn } from '@/lib/cn';
import React from 'react';

interface SectionHeadingProps {
  overline?: string;
  h2Lead?: string;
  h2Accent?: string;
  h2Trail?: string;
  title?: string;
  body?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  h2Lead,
  h2Accent,
  h2Trail,
  title,
  body,
  align = 'left',
  onDark = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 md:mb-16',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {overline && (
        <span
          className={cn(
            'inline-block mb-3 text-xs md:text-[13px] font-semibold uppercase tracking-[0.09em]',
            onDark ? 'text-[var(--color-brand-on-dark)]' : 'text-[var(--color-brand-primary)]'
          )}
        >
          {overline}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-[46px] font-extrabold leading-[1.1] tracking-[-0.03em]',
          onDark ? 'text-[var(--color-surface-base)]' : 'text-[var(--color-text-primary)]'
        )}
      >
        {title ? (
          title
        ) : (
          <>
            {h2Lead}
            {h2Accent && (
              <span className={onDark ? 'text-[var(--color-brand-on-dark)]' : 'text-[var(--color-brand-primary)]'}>
                {h2Accent}
              </span>
            )}
            {h2Trail}
          </>
        )}
      </h2>
      {body && (
        <p
          className={cn(
            'mt-4 text-base md:text-[17.5px] leading-[1.6]',
            onDark ? 'text-slate-300' : 'text-[var(--color-text-secondary)]'
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
};
