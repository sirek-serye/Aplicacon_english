import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  [key: string]: any;
}

export default function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-headline font-bold uppercase tracking-wider text-sm transition-all duration-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-1 active:shadow-none";
  
  const variants = {
    primary: "bg-primary text-on-primary block-shadow-primary",
    secondary: "bg-secondary text-on-secondary block-shadow-secondary",
    tertiary: "bg-tertiary-fixed text-on-tertiary-fixed border-2 border-tertiary block-shadow-tertiary",
    outline: "bg-surface text-outline border-2 border-outline-variant hover:bg-surface-container transition-all",
  };

  return (
    <button 
      className={cn(baseStyles, className, variants[variant])}
      {...props}
    >
      {children}
    </button>
  );
}
