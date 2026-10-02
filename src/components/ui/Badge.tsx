import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'outline' | 'lime' | 'neutral' | 'apricot';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#0B1220] text-[#94A3B8] border-[#26344D]',
    neutral: 'bg-[#0B1220] text-[#94A3B8] border-[#26344D]',
    lime: 'bg-[#B7F34A]/10 text-[#B7F34A] border-[#B7F34A]/30',
    apricot: 'bg-[#B7F34A]/10 text-[#B7F34A] border-[#B7F34A]/30',
    info: 'bg-[#5B8CFF]/10 text-[#5B8CFF] border-[#5B8CFF]/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    purple: 'bg-[#5B8CFF]/10 text-[#5B8CFF] border-[#5B8CFF]/30',
    outline: 'bg-transparent text-[#94A3B8] border-[#26344D]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
