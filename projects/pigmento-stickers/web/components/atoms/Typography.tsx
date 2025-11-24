import React from 'react';
import { cn } from '../../lib/utils';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

interface TypographyProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  as?: any;
}

export const Typography = ({ variant = 'body', children, className, as }: TypographyProps) => {
  const Component = as || (variant.startsWith('h') ? variant : 'p');

  const styles = {
    h1: 'font-display text-5xl md:text-6xl font-bold text-surface-900 leading-tight',
    h2: 'font-display text-3xl md:text-4xl font-semibold text-surface-900',
    h3: 'font-display text-xl md:text-2xl font-medium text-surface-900',
    body: 'font-sans text-base text-surface-900/80 leading-relaxed',
    caption: 'font-sans text-sm text-surface-900/60',
  };

  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  );
};