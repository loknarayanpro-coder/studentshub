'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  FileCheck,
  Briefcase,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background ambient lighting with Apricot warmth */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-[#F2C14E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[#F2C14E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Dashboard Canvas */}
      <div className="relative rounded-3xl bg-[#25313D]/95 border border-[#334155] shadow-2xl p-6 backdrop-blur-xl space-y-4">
        {/* Top Header of simulated Hub */}
        <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-[#F2C14E]" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-[#A3B1C2]">AU Student Hub • v2.6 Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#F2C14E] bg-[#F2C14E]/15 border border-[#F2C14E]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2C14E] animate-pulse" />
              Live Semester 5
            </span>
          </div>
        </div>

        {/* Top Metric Cards Row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-[#1F2933] border border-[#334155]">
            <p className="text-[10px] uppercase font-bold text-[#A3B1C2]">Cumulative CGPA</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-extrabold text-[#FBF6E3]">8.42</span>
              <span className="text-[10px] text-[#F2C14E] font-bold">+0.28</span>
            </div>
            <p className="text-[10px] text-[#A3B1C2] mt-0.5">Top 10% in CSE</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#1F2933] border border-[#334155]">
            <p className="text-[10px] uppercase font-bold text-[#A3B1C2]">Syllabus Progress</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-extrabold text-[#F2C14E]">68%</span>
              <span className="text-[10px] text-[#A3B1C2]">Unit 1-3</span>
            </div>
            <div className="w-full bg-[#334155] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#F2C14E] h-full w-[68%]" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#1F2933] border border-[#334155]">
            <p className="text-[10px] uppercase font-bold text-[#A3B1C2]">Next Exam</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-extrabold text-[#F2C14E]">14d</span>
              <span className="text-[10px] text-[#A3B1C2]">Nov/Dec</span>
            </div>
            <p className="text-[10px] text-[#A3B1C2] truncate">CS3591 Networks</p>
          </div>
        </div>

        {/* Middle: Active Subject Notes Card */}
        <div className="p-4 rounded-2xl bg-[#1F2933] border border-[#334155] flex items-center justify-between gap-3 group">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#F2C14E]/15 text-[#F2C14E] border border-[#F2C14E]/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-[#F2C14E]">CS3591</span>
                <span className="text-[10px] px-1.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Verified Notes
                </span>
              </div>
              <p className="text-xs font-bold text-[#FBF6E3] mt-0.5">
                Computer Networks: Complete Unit 1 to 5
              </p>
              <p className="text-[11px] text-[#A3B1C2]">5.8 MB • 3,842 Anna Univ downloads</p>
            </div>
          </div>
          <span className="text-xs text-[#F2C14E] font-bold group-hover:translate-x-1 transition-transform">
            Continue →
          </span>
        </div>

        {/* Bottom Row: Verified Internship Match & Placement Prep */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Internship Card */}
          <div className="p-3.5 rounded-2xl bg-[#1F2933] border border-[#334155] space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="apricot" className="text-[10px]">
                <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> Verified Match
              </Badge>
              <span className="text-[10px] text-[#F2C14E] font-semibold">18d left</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#FBF6E3]">Frontend Developer Intern</p>
              <p className="text-[11px] text-[#A3B1C2]">Zoho Corporation • ₹25k/mo</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#A3B1C2]">
              <span className="px-1.5 py-0.5 rounded bg-[#25313D] border border-[#334155]">React</span>
              <span className="px-1.5 py-0.5 rounded bg-[#25313D] border border-[#334155]">TypeScript</span>
              <span className="px-1.5 py-0.5 rounded bg-[#25313D] border border-[#334155]">CSE/IT</span>
            </div>
          </div>

          {/* Placement Daily Challenge */}
          <div className="p-3.5 rounded-2xl bg-[#1F2933] border border-[#334155] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#F2C14E] uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3" /> Core CS Daily
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">Solved</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#FBF6E3]">TCP 3-Way Handshake vs UDP</p>
              <p className="text-[11px] text-[#A3B1C2]">Zoho & TCS Technical Round Pattern</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Score: 100/100 (High-yield Q)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Pill: Question Paper Archive badge */}
      <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-[#1F2933] border border-[#334155] shadow-xl backdrop-blur-md animate-subtle-float">
        <div className="p-2 rounded-xl bg-[#F2C14E]/15 text-[#F2C14E] border border-[#F2C14E]/30">
          <FileCheck className="w-4 h-4" />
        </div>
        <div className="text-left text-xs">
          <p className="font-bold text-[#FBF6E3]">100% Verified QPs</p>
          <p className="text-[10px] text-[#A3B1C2]">Regulation 2021 & 2025</p>
        </div>
      </div>

      {/* Floating Pill: Verified Opportunities */}
      <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-[#1F2933] border border-[#334155] shadow-xl backdrop-blur-md">
        <div className="p-2 rounded-xl bg-[#F2C14E]/15 text-[#F2C14E] border border-[#F2C14E]/30">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left text-xs">
          <p className="font-bold text-[#FBF6E3]">Smart Match Engine</p>
          <p className="text-[10px] text-[#A3B1C2]">Personalized to your semester</p>
        </div>
      </div>
    </div>
  );
}
