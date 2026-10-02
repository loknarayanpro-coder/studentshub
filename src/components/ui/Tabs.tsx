'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 p-1 bg-[#111B2E] border border-[#26344D] rounded-xl overflow-x-auto scrollbar-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer',
              isActive
                ? 'bg-[#B7F34A] text-[#0B1220]'
                : 'text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#1a2942]'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'text-xs px-1.5 py-0.2 rounded-full font-bold',
                  isActive ? 'bg-[#0B1220]/20 text-[#0B1220]' : 'bg-[#26344D] text-[#94A3B8]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
