import { cn } from '@/lib/cn';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'sos';
  size?: 'sm' | 'md' | 'lg';
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeading,
      iconTrailing,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-9 px-4 text-xs font-semibold gap-1.5',
      md: 'h-11 px-5 text-sm font-semibold gap-2',
      lg: 'h-[52px] px-6 text-base font-bold gap-2.5',
    };

    const variantClasses = {
      primary:
        'bg-[var(--color-brand-primary)] text-[var(--color-surface-base)] hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-pressed)] shadow-sm',
      secondary:
        'bg-transparent border border-[var(--color-border-interactive)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)] active:border-[var(--color-border-strong)]',
      ghost:
        'bg-transparent text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-wash)] active:bg-[var(--color-brand-subtle)]',
      sos: 'bg-[var(--color-alert-sos)] text-[var(--color-surface-base)] active:bg-[var(--color-alert-sos-pressed)] shadow-md',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-[12px] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px] cursor-pointer select-none',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {iconLeading && <span className="inline-flex shrink-0">{iconLeading}</span>}
        <span>{children}</span>
        {iconTrailing && <span className="inline-flex shrink-0">{iconTrailing}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
