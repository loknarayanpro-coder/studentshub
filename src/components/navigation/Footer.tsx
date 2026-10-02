import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#26344D] bg-[#0B1220] text-[#94A3B8] text-xs pb-20 xl:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-10 border-b border-[#26344D]">
          {/* Brand info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B7F34A] flex items-center justify-center text-[#0B1220] font-bold shadow-sm">
                <GraduationCap className="w-5 h-5 text-[#0B1220]" />
              </div>
              <span className="text-base font-extrabold text-[#F5F7FA] tracking-tight">CAMPUS</span>
            </Link>
            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              The modern academic and career workspace designed for engineering students. Notes, question papers, verified opportunities, and placement preparation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#B7F34A] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified syllabus & quality-reviewed student resources</span>
            </div>
          </div>

          {/* Academics */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">Academics</h4>
            <ul className="space-y-1.5">
              <li><Link href="/academics" className="hover:text-[#B7F34A] transition-colors">Syllabus (Sem 5 CSE)</Link></li>
              <li><Link href="/notes" className="hover:text-[#B7F34A] transition-colors">Lecture Notes</Link></li>
              <li><Link href="/question-papers" className="hover:text-[#B7F34A] transition-colors">Question Papers</Link></li>
              <li><Link href="/important-questions" className="hover:text-[#B7F34A] transition-colors">Important Questions</Link></li>
              <li><Link href="/question-bank" className="hover:text-[#B7F34A] transition-colors">Question Bank</Link></li>
            </ul>
          </div>

          {/* Career & Placements */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">Careers</h4>
            <ul className="space-y-1.5">
              <li><Link href="/internships" className="hover:text-[#B7F34A] transition-colors">Internships</Link></li>
              <li><Link href="/jobs" className="hover:text-[#B7F34A] transition-colors">Fresher Jobs</Link></li>
              <li><Link href="/placement" className="hover:text-[#B7F34A] transition-colors">Placement Hub</Link></li>
              <li><Link href="/placement/companies" className="hover:text-[#B7F34A] transition-colors">Company Guides</Link></li>
              <li><Link href="/submit-resource" className="hover:text-[#B7F34A] transition-colors">Contribute Resource</Link></li>
            </ul>
          </div>

          {/* Student Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">Tools</h4>
            <ul className="space-y-1.5">
              <li><Link href="/tools?tab=cgpa" className="hover:text-[#B7F34A] transition-colors">CGPA Calculator</Link></li>
              <li><Link href="/tools?tab=gpa" className="hover:text-[#B7F34A] transition-colors">GPA Calculator</Link></li>
              <li><Link href="/tools?tab=attendance" className="hover:text-[#B7F34A] transition-colors">75% Attendance Check</Link></li>
              <li><Link href="/tools?tab=countdown" className="hover:text-[#B7F34A] transition-colors">Exam Countdown</Link></li>
              <li><Link href="/tools?tab=pomodoro" className="hover:text-[#B7F34A] transition-colors">Pomodoro Timer</Link></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">Legal & Trust</h4>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-[#B7F34A] transition-colors">About AU Hub</Link></li>
              <li><Link href="/privacy" className="hover:text-[#B7F34A] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#B7F34A] transition-colors">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#B7F34A] transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="hover:text-[#B7F34A] transition-colors">Contact / Takedown</Link></li>
            </ul>
          </div>
        </div>

        {/* Anna University Independence Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#111B2E] border border-[#26344D]">
          <p className="text-[11px] text-[#94A3B8] leading-relaxed text-center sm:text-left">
            <span className="font-bold text-[#F5F7FA]">Mandatory Institutional Disclaimer:</span>{' '}
            AU Student Hub is an independent student resource and career preparation platform and is not officially affiliated with, endorsed by, or sponsored by Anna University unless expressly stated. All course codes, regulations, and syllabi designations are referenced solely for nominative academic organizational purposes under fair educational access.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8]">
          <p>
            © {new Date().getFullYear()} AU Student Hub. All rights reserved. Made by{' '}
            <span className="font-bold text-[#F5F7FA]">Lok</span>.
          </p>
          <div className="flex items-center gap-1.5 font-mono">
            <span>Engineered & Crafted with precision by</span>
            <span className="text-[#B7F34A] font-bold">Lok</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
