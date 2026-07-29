import { cn } from '@/lib/cn';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sunken' | 'inverse' | 'media';
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  interactive = false,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-[var(--color-surface-base)] border border-[var(--color-border-default)] text-[var(--color-text-primary)]',
    sunken: 'bg-[var(--color-surface-sunken)] border-0 text-[var(--color-text-primary)]',
    inverse: 'bg-[var(--color-surface-inverse-raised)] border-0 text-[var(--color-surface-base)]',
    media: 'bg-[var(--color-surface-base)] border border-[var(--color-border-default)] overflow-hidden',
  };

  return (
    <div
      className={cn(
        'rounded-[20px] p-6 md:p-8 transition-transform duration-200 ease-out',
        variantClasses[variant],
        interactive && 'hover:-translate-y-0.5 hover:shadow-md cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
