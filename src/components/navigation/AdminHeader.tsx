'use client';

import React from 'react';
import { Search, Bell, ShieldCheck, Server } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-[#26344D] bg-[#0B1220] px-6 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-[#F5F7FA] tracking-tight">{title}</h1>
        <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono text-[#B7F34A] border-[#B7F34A]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7F34A] animate-pulse mr-1 inline-block" />
          Production RBAC Active
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111B2E] border border-[#26344D] text-xs text-[#94A3B8]">
          <Server className="w-3.5 h-3.5 text-[#B7F34A]" />
          <span>S3 Bucket: campus-student-vault</span>
        </div>

        <button className="relative p-2 rounded-xl text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#111B2E] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B7F34A]" />
        </button>
      </div>
    </header>
  );
}
