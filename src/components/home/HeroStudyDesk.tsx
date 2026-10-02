'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileCheck,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { DEPARTMENTS, SUBJECTS, MOCK_RESOURCES } from '@/lib/mock-data';

export function HeroStudyDesk() {
  const { openPdfViewer } = useApp();
  const [activeDept, setActiveDept] = useState('cse');
  const [activeSem, setActiveSem] = useState(5);
  const [activeReg, setActiveReg] = useState('2021');

  // Filter subjects for the active selection
  const currentSubjects = SUBJECTS.filter(
    (s) => s.departmentId === activeDept && s.semester === activeSem
  );

  const activeDeptObj = DEPARTMENTS.find((d) => d.id === activeDept) || DEPARTMENTS[0];

  return (
    <div className="w-full rounded-2xl bg-[#111B2E] border border-[#26344D] shadow-2xl overflow-hidden flex flex-col">
      {/* Desk Control Bar */}
      <div className="p-3 sm:p-4 bg-[#0B1220] border-b border-[#26344D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B7F34A] animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F7FA]">
            CSE 3rd Year Terminal
          </span>
          <span className="text-[10px] font-mono text-[#B7F34A] bg-[#B7F34A]/10 px-2 py-0.5 rounded">
            Regulation 2021 CBCS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#F5F7FA] px-2.5 py-1 rounded-lg bg-[#111B2E] border border-[#26344D]">
            Semester 5 (8 Subjects • 23 Credits)
          </span>
        </div>
      </div>

      {/* Live Subjects Content Area */}
      <div className="p-3 sm:p-4 space-y-2.5 max-h-[380px] overflow-y-auto">
        <div className="flex items-center justify-between text-[11px] text-[#94A3B8] px-1 pb-1">
          <span>
            Showing <strong className="text-[#F5F7FA]">{activeDeptObj.code}</strong> • Semester {activeSem} (
            {currentSubjects.length} subjects found)
          </span>
          <span className="font-mono text-[10px] text-[#B7F34A]">Live Catalog</span>
        </div>

        {currentSubjects.length > 0 ? (
          currentSubjects.map((subject) => {
            const subjectResource = MOCK_RESOURCES.find((r) => r.subjectCode === subject.code);

            return (
              <div
                key={subject.id}
                className="p-3 rounded-xl bg-[#0B1220] border border-[#26344D] hover:border-[#B7F34A]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#B7F34A] px-2 py-0.5 rounded bg-[#111B2E] border border-[#26344D]">
                      {subject.code}
                    </span>
                    <span className="text-[11px] font-semibold text-[#94A3B8]">
                      {subject.credits} Credits • {subject.units?.length || 5} Units
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#B7F34A] transition-colors leading-tight">
                    {subject.name}
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] line-clamp-1">
                    {subject.units && subject.units.length > 0
                      ? subject.units.map((u) => `U${u.unitNumber}: ${u.title}`).join(' • ')
                      : subject.description}
                  </p>
                </div>

                {/* Instant Quick-Access Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {subjectResource && (
                    <button
                      onClick={() => openPdfViewer(subjectResource)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#111B2E] hover:bg-[#1a2942] border border-[#26344D] text-[11px] font-semibold text-[#F5F7FA] hover:text-[#B7F34A] transition-colors flex items-center gap-1"
                      title="Open verified lecture notes"
                    >
                      <BookOpen className="w-3 h-3 text-[#B7F34A]" />
                      <span>Notes</span>
                    </button>
                  )}

                  <Link
                    href={`/question-papers?dept=${activeDept}&sem=${activeSem}&code=${subject.code}`}
                    className="px-2.5 py-1.5 rounded-lg bg-[#111B2E] hover:bg-[#1a2942] border border-[#26344D] text-[11px] font-semibold text-[#F5F7FA] hover:text-[#B7F34A] transition-colors flex items-center gap-1"
                    title="View Anna Univ question papers"
                  >
                    <FileCheck className="w-3 h-3 text-[#B7F34A]" />
                    <span>QPs</span>
                  </Link>

                  <Link
                    href={`/academics/${activeDept}/${activeReg}/semester-${activeSem}/${subject.code.toLowerCase()}`}
                    className="p-1.5 rounded-lg bg-[#111B2E] hover:bg-[#B7F34A] text-[#94A3B8] hover:text-[#0B1220] border border-[#26344D] transition-colors"
                    title="Open full course view"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center bg-[#0B1220]/50 rounded-xl border border-dashed border-[#26344D]">
            <p className="text-xs text-[#94A3B8]">
              No core theory subjects listed for {activeDeptObj.code} Semester {activeSem} yet.
            </p>
            <Link
              href="/academics"
              className="text-xs text-[#5B8CFF] hover:underline mt-1.5 inline-block font-semibold"
            >
              Browse complete curriculum directory →
            </Link>
          </div>
        )}
      </div>

      {/* Desk Bottom Status Bar */}
      <div className="px-4 py-2.5 bg-[#0B1220] border-t border-[#26344D] flex items-center justify-between text-[11px] text-[#94A3B8]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Offline-ready document links • Direct PDF preview
        </span>
        <Link
          href={`/academics/${activeDept}`}
          className="text-[#5B8CFF] hover:underline font-semibold flex items-center gap-1"
        >
          <span>All {activeDeptObj.code} Semesters</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
