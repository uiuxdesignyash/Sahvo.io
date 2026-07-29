import { cn } from '@/lib/cn';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1200px] px-6 md:px-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
