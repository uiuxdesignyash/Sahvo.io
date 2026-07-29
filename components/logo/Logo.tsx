import Image from 'next/image';
import React from 'react';

interface LogoProps {
  className?: string;
  onDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, onDark = false }) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className || ''}`}>
      <Image
        src="/logo.png"
        alt="Sahvo Icon"
        width={32}
        height={32}
        priority
        className="h-7 md:h-8 w-auto object-contain shrink-0"
      />
      <span
        className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
          onDark ? 'text-white' : 'text-[var(--color-text-primary)]'
        }`}
      >
        sahvo
      </span>
    </div>
  );
};
