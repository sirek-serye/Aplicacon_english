import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Rabbit } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  showIcon?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function ProgressBar({ progress, showIcon = false, className, variant = 'primary' }: ProgressBarProps) {
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary-fixed-dim',
  };

  return (
    <div className={cn("h-6 bg-surface-container rounded-full relative overflow-hidden border-2 border-outline-variant", className)}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("absolute top-0 left-0 h-full rounded-full border-r-2 border-outline-variant", variants[variant])}
      />
      {showIcon && (
        <motion.div 
          initial={{ left: 0 }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 -ml-4 h-full flex items-center z-10"
        >
          <Rabbit className={cn("w-5 h-5", variant === 'secondary' ? 'text-on-secondary' : 'text-on-primary')} />
        </motion.div>
      )}
    </div>
  );
}
