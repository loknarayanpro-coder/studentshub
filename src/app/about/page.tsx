import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Heart, Users, Target, BookOpen, Code, Award, Copyright } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111B2E] border border-[#26344D]">
          <span className="w-2 h-2 rounded-full bg-[#B7F34A]" />
          <span className="text-xs font-mono font-bold text-[#F5F7FA]">B.E. CSE • 3rd Year • Semester 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          About AU Student Hub
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          AU Student Hub is an independent, high-yield academic platform tailored exclusively for 3rd Year Computer Science & Engineering students under Anna University Regulation 2021.
        </p>
      </div>

      {/* Creator & Copyright Card */}
      <Card className="p-6 sm:p-8 border-[#26344D] bg-[#111B2E] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B7F34A] flex items-center justify-center text-[#0B1220] font-bold">
            <Code className="w-5 h-5 text-[#0B1220]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F5F7FA]">Creator & Copyright Notice</h2>
            <p className="text-xs text-[#94A3B8]">Design, engineering, and platform ownership</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1220] border border-[#26344D] space-y-3 text-xs text-[#94A3B8] leading-relaxed">
          <p className="text-sm font-semibold text-[#F5F7FA]">
            AU Student Hub is designed, built, and maintained by{' '}
            <span className="text-[#B7F34A] font-bold">Lok</span>.
          </p>
          <p>
            © {new Date().getFullYear()} <strong>Lok</strong>. All intellectual property rights, user interface designs, custom component architecture, and integrated academic resource compilers are copyrighted.
          </p>
          <div className="pt-2 border-t border-[#26344D] flex items-center gap-2 font-mono text-[11px] text-[#B7F34A]">
            <Copyright className="w-3.5 h-3.5" />
            <span>Copyright © {new Date().getFullYear()} Lok. All rights reserved.</span>
          </div>
        </div>
      </Card>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-[#26344D] bg-[#111B2E] text-center space-y-2">
          <BookOpen className="w-8 h-8 text-[#B7F34A] mx-auto" />
          <h3 className="text-base font-bold text-[#F5F7FA]">Curated Syllabus</h3>
          <p className="text-xs text-[#94A3B8]">Strictly mapped to Anna University Regulation 2021 for Semester 5 CSE.</p>
        </Card>

        <Card className="p-5 border-[#26344D] bg-[#111B2E] text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-[#F5F7FA]">Verified Content</h3>
          <p className="text-xs text-[#94A3B8]">High-yield faculty lecture notes and official end-semester question papers.</p>
        </Card>

        <Card className="p-5 border-[#26344D] bg-[#111B2E] text-center space-y-2">
          <Users className="w-8 h-8 text-[#5B8CFF] mx-auto" />
          <h3 className="text-base font-bold text-[#F5F7FA]">Zero Clutter</h3>
          <p className="text-xs text-[#94A3B8]">Lightning-fast in-browser PDF reader with zero spam or intrusive popups.</p>
        </Card>
      </div>

      {/* Non-Affiliation Institutional Disclosure */}
      <Card className="p-6 sm:p-8 border-[#26344D] bg-[#111B2E] space-y-4">
        <h2 className="text-xl font-bold text-[#F5F7FA]">Non-Affiliation Institutional Disclosure</h2>
        <div className="p-4 rounded-xl bg-[#0B1220] border border-[#26344D] text-xs text-[#94A3B8] leading-relaxed space-y-2">
          <p>
            <strong>AU Student Hub</strong> is an independent academic resource platform created by{' '}
            <strong className="text-[#F5F7FA]">Lok</strong> for engineering students.
          </p>
          <p>
            This platform is <strong>not officially affiliated with, sponsored by, or endorsed by Anna University</strong>{' '}
            unless expressly stated. All course codes (e.g. CS3591, CS3501, CB3491), regulation titles, and syllabus outlines are
            referenced purely for nominative academic organizational convenience under fair use educational principles.
          </p>
        </div>
      </Card>
    </div>
  );
}
