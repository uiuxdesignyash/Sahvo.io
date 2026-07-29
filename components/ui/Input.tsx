import { cn } from '@/lib/cn';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  onDark?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, onDark = false, id, className, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full text-left space-y-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            'block text-xs font-semibold uppercase tracking-wider',
            onDark ? 'text-[var(--color-brand-on-dark)]' : 'text-[var(--color-text-secondary)]'
          )}
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              'w-full h-[52px] px-4 rounded-[12px] text-base transition-colors bg-[var(--color-surface-base)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
              'border border-[var(--color-border-interactive)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2',
              error && 'border-2 border-[var(--color-border-interactive)] font-medium',
              onDark && 'bg-[var(--color-surface-inverse-raised)] text-[var(--color-surface-base)] border-[var(--color-border-interactive-on-dark)] focus:ring-[var(--color-focus-ring-dark)]',
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-primary)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} className="text-xs font-medium text-[var(--color-text-primary)] flex items-center gap-1.5 mt-1">
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p id={hintId} className={cn('text-xs', onDark ? 'text-slate-400' : 'text-[var(--color-text-tertiary)]')}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
