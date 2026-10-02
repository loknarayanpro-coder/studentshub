import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
            {icon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full rounded-xl bg-[#0B1220] border border-[#26344D] px-3.5 py-2 text-sm text-[#F5F7FA] placeholder:text-[#94A3B8]/60',
            'transition-colors duration-150 focus:outline-none focus:border-[#B7F34A] focus:ring-1 focus:ring-[#B7F34A]/30 disabled:opacity-50',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
