'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Layers,
  ChevronRight,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Award,
} from 'lucide-react';
import { SUBJECTS } from '@/lib/mock-data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AcademicsHubPage() {
  const [filterType, setFilterType] = useState<'all' | 'core' | 'elective' | 'lab'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3rd Year Sem 5 CSE subjects only
  const sem5CseSubjects = SUBJECTS.filter(
    (s) => s.departmentId === 'cse' && s.semester === 5
  );

  const filteredSubjects = sem5CseSubjects.filter((s) => {
    let matchesType = true;
    if (filterType === 'core') matchesType = ['CS3591', 'CS3501', 'CB3491', 'CS3551'].includes(s.code);
    if (filterType === 'elective') matchesType = ['CCS335', 'CCS356'].includes(s.code);
    if (filterType === 'lab') matchesType = ['CS3511', 'CS3561'].includes(s.code);

    const matchesQuery =
      !searchQuery ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
            Curriculum Explorer
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111B2E] border border-[#26344D] text-[#94A3B8] font-mono">
            B.E. CSE • 3rd Year • Semester 5 (R-2021)
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Semester 5 CSE Curriculum
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
          Comprehensive curriculum roadmap for Anna University B.E. Computer Science & Engineering 5th semester
          under Regulation 2021 Choice Based Credit System (CBCS).
        </p>
      </div>

      {/* Curriculum Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 border-[#26344D] bg-[#111B2E]">
          <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Total Semester Load</span>
          <p className="text-lg font-bold text-[#F5F7FA] mt-1">23 Credits</p>
          <span className="text-[11px] text-[#94A3B8]">Prescribed under CBCS R-2021</span>
        </Card>
        <Card className="p-4 border-[#26344D] bg-[#111B2E]">
          <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Theory Courses</span>
          <p className="text-lg font-bold text-[#F5F7FA] mt-1">6 Subjects</p>
          <span className="text-[11px] text-[#94A3B8]">4 Core + 2 Professional Electives</span>
        </Card>
        <Card className="p-4 border-[#26344D] bg-[#111B2E]">
          <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Practical Labs</span>
          <p className="text-lg font-bold text-[#F5F7FA] mt-1">2 Laboratories</p>
          <span className="text-[11px] text-[#94A3B8]">Compiler Lab & Networks Lab</span>
        </Card>
        <Card className="p-4 border-[#26344D] bg-[#111B2E]">
          <span className="text-[10px] font-mono uppercase text-[#94A3B8]">AU Assessment Model</span>
          <p className="text-lg font-bold text-[#B7F34A] mt-1">40 CIA / 60 ESE</p>
          <span className="text-[11px] text-[#94A3B8]">Continuous Internal / End Sem Exam</span>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-5 border-[#26344D] bg-[#111B2E] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0B1220] border border-[#26344D] overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All 8 Courses' },
              { id: 'core', label: 'Core Theory (4)' },
              { id: 'elective', label: 'Professional Electives (2)' },
              { id: 'lab', label: 'Practical Labs (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-[#B7F34A] text-[#0B1220]'
                    : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search subject code or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] pl-9 pr-3 py-1.5 text-xs text-[#F5F7FA] placeholder:text-slate-500 focus:outline-none focus:border-[#B7F34A]"
            />
          </div>
        </div>
      </Card>

      {/* Subjects Detailed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span>
            Displaying <strong className="text-[#F5F7FA]">{filteredSubjects.length}</strong> Semester 5 CSE courses
          </span>
          <a
            href="https://cac.annauniv.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5B8CFF] hover:underline flex items-center gap-1 font-mono"
          >
            <span>CAC Official Syllabus Copy</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="space-y-4">
          {filteredSubjects.map((sub) => {
            const isLab = sub.code.endsWith('11') || sub.code.endsWith('61');
            const isElective = sub.code.startsWith('CCS');

            return (
              <Card
                key={sub.id}
                className="p-5 sm:p-6 border-[#26344D] bg-[#111B2E] space-y-4 hover:border-[#94A3B8]/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-sm font-bold text-[#B7F34A]">
                        {sub.code}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B1220] text-[#94A3B8] border border-[#26344D]">
                        {sub.credits} Credits
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B1220] text-[#94A3B8] border border-[#26344D]">
                        {isLab ? 'Practical Laboratory' : isElective ? 'Professional Elective' : 'Core Theory Course'}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-[#F5F7FA]">
                      {sub.name}
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed max-w-3xl">
                      {sub.description}
                    </p>
                  </div>

                  <Link
                    href={`/academics/cse/2021/semester-5/${sub.code.toLowerCase()}`}
                    className="shrink-0"
                  >
                    <Button variant="primary" size="sm" className="text-xs">
                      View Full Syllabus
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>

                {/* Units Preview */}
                {sub.units && sub.units.length > 0 && (
                  <div className="pt-3 border-t border-[#26344D] space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-[#94A3B8]">
                      Unit Breakdown (5 Units)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {sub.units.map((u) => (
                        <div
                          key={u.id}
                          className="p-2.5 rounded-lg bg-[#0B1220] border border-[#26344D] flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#B7F34A]">
                              Unit {u.unitNumber}
                            </span>
                            <p className="text-[11px] font-medium text-[#F5F7FA] mt-0.5 line-clamp-1">
                              {u.title}
                            </p>
                          </div>
                          <span className="text-[10px] text-[#94A3B8] mt-1">
                            {u.topics.length} Key Topics
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Resource Jump */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] text-[#94A3B8]">Jump to:</span>
                  <Link
                    href={`/notes?subject=${sub.code}`}
                    className="px-2.5 py-1 rounded bg-[#0B1220] border border-[#26344D] text-[#94A3B8] hover:text-[#B7F34A] hover:border-[#B7F34A]/40 transition-colors font-mono text-[11px]"
                  >
                    Lecture Notes ({sub.resourcesCount?.notes || 6})
                  </Link>
                  <Link
                    href={`/question-papers?subject=${sub.code}`}
                    className="px-2.5 py-1 rounded bg-[#0B1220] border border-[#26344D] text-[#94A3B8] hover:text-[#B7F34A] hover:border-[#B7F34A]/40 transition-colors font-mono text-[11px]"
                  >
                    Past QPs ({sub.resourcesCount?.questionPapers || 4})
                  </Link>
                  <Link
                    href={`/important-questions?subject=${sub.code}`}
                    className="px-2.5 py-1 rounded bg-[#0B1220] border border-[#26344D] text-[#94A3B8] hover:text-[#B7F34A] hover:border-[#B7F34A]/40 transition-colors font-mono text-[11px]"
                  >
                    Important Qs ({sub.resourcesCount?.importantQuestions || 15})
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
