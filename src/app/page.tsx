'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  FileCheck,
  HelpCircle,
  Briefcase,
  Award,
  Calculator,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  GraduationCap,
  Calendar,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { QuestionPaperCard } from '@/components/resources/QuestionPaperCard';
import { ImportantQuestionCard } from '@/components/resources/ImportantQuestionCard';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import {
  SUBJECTS,
  MOCK_RESOURCES,
  MOCK_QUESTION_PAPERS,
  MOCK_IMPORTANT_QUESTIONS,
  MOCK_OPPORTUNITIES,
} from '@/lib/mock-data';

export default function HomePage() {
  const { openSearch } = useApp();
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'core' | 'elective' | 'lab'>('all');

  // Semester 5 CSE subjects only (Regulation 2021)
  const sem5CseSubjects = SUBJECTS.filter(
    (s) => s.departmentId === 'cse' && s.semester === 5
  );

  const filteredSubjects = sem5CseSubjects.filter((s) => {
    if (subjectFilter === 'all') return true;
    if (subjectFilter === 'core') return ['CS3591', 'CS3501', 'CB3491', 'CS3551'].includes(s.code);
    if (subjectFilter === 'elective') return ['CCS335', 'CCS356'].includes(s.code);
    if (subjectFilter === 'lab') return ['CS3511', 'CS3561'].includes(s.code);
    return true;
  });

  // Resources specifically for Semester 5 CSE
  const sem5Notes = MOCK_RESOURCES.filter(
    (r) => r.departmentId === 'cse' && r.semester === 5 && r.resourceType === 'notes'
  ).slice(0, 3);

  const sem5QPs = MOCK_QUESTION_PAPERS.filter(
    (qp) => qp.departmentId === 'cse' && qp.semester === 5
  ).slice(0, 3);

  const sem5Questions = MOCK_IMPORTANT_QUESTIONS.filter(
    (q) => sem5CseSubjects.some((sub) => sub.code === q.subjectCode)
  ).slice(0, 3);

  const featuredOpportunities = MOCK_OPPORTUNITIES.slice(0, 3);

  const categories = [
    { label: 'Syllabus & Units', href: '/academics', icon: BookOpen, desc: 'Regulation 2021 breakdown' },
    { label: 'Lecture Notes', href: '/notes', icon: Layers, desc: 'Units 1–5 faculty material' },
    { label: 'Question Papers', href: '/question-papers', icon: FileCheck, desc: 'Nov/Dec & Apr/May archives' },
    { label: 'Important Qs', href: '/important-questions', icon: HelpCircle, desc: 'Repeating 2 & 16-marks' },
    { label: 'CGPA & Tools', href: '/tools', icon: Calculator, desc: 'Sem 5 GPA & 75% attendance' },
    { label: 'Placement Prep', href: '/placement', icon: Award, desc: 'Core CS, DSA & Aptitude' },
    { label: 'Internships', href: '/internships', icon: Briefcase, desc: '2026/2027 student stipends' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* ==================================================================== */}
      {/* 1. FOCUSED HERO SECTION — 3RD YEAR SEM 5 CSE                         */}
      {/* ==================================================================== */}
      <section className="max-w-3xl mx-auto text-center space-y-5 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111B2E] border border-[#26344D]">
          <span className="w-2 h-2 rounded-full bg-[#B7F34A] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#F5F7FA]">B.E. CSE • 3RD YEAR • SEMESTER 5</span>
          <span className="text-[10px] font-mono text-[#B7F34A] bg-[#B7F34A]/10 px-1.5 py-0.5 rounded">R-2021</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F7FA] tracking-tight leading-tight">
          Everything for <br className="hidden sm:block" />
          <span className="text-[#B7F34A]">Semester 5 CSE.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
          Dedicated academic workspace for Anna University Computer Science students. All 8 subjects, laboratory manuals, end-sem question papers, repeating 16-mark solutions, and internship prep.
        </p>

        {/* Search trigger */}
        <div className="pt-2 max-w-lg mx-auto">
          <div
            onClick={openSearch}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#111B2E] border border-[#26344D] hover:border-[#94A3B8]/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 text-[#94A3B8]">
              <Search className="w-4 h-4 text-[#B7F34A]" />
              <span className="text-xs sm:text-sm text-slate-400 group-hover:text-[#F5F7FA] transition-colors">
                Search CS3591, Compiler Design, Subnetting, RSA...
              </span>
            </div>
            <kbd className="hidden sm:inline-block text-[11px] font-mono text-[#94A3B8] bg-[#0B1220] px-2 py-0.5 rounded border border-[#26344D]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto text-left">
          <div className="p-3 rounded-xl bg-[#111B2E] border border-[#26344D]">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Curriculum</span>
            <p className="text-xs font-bold text-[#F5F7FA] mt-0.5">23 Total Credits</p>
          </div>
          <div className="p-3 rounded-xl bg-[#111B2E] border border-[#26344D]">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Courses</span>
            <p className="text-xs font-bold text-[#F5F7FA] mt-0.5">6 Theory + 2 Labs</p>
          </div>
          <div className="p-3 rounded-xl bg-[#111B2E] border border-[#26344D]">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Semester Session</span>
            <p className="text-xs font-bold text-[#F5F7FA] mt-0.5">July – Nov 2026</p>
          </div>
          <div className="p-3 rounded-xl bg-[#111B2E] border border-[#26344D]">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8]">Next Exam</span>
            <p className="text-xs font-bold text-[#B7F34A] mt-0.5">Nov/Dec 2026 COE</p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. RESOURCE CATEGORIES                                               */}
      {/* ==================================================================== */}
      <section className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.label} href={cat.href}>
                <Card
                  hoverable
                  className="p-3 sm:p-3.5 h-full flex flex-col justify-between border-[#26344D] bg-[#111B2E]"
                >
                  <Icon className="w-4 h-4 text-[#B7F34A] mb-2" />
                  <div>
                    <h3 className="text-xs font-semibold text-[#F5F7FA] leading-tight">
                      {cat.label}
                    </h3>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5 line-clamp-1">
                      {cat.desc}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. SEMESTER 5 CSE SUBJECTS SUITE                                     */}
      {/* ==================================================================== */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#111B2E] border border-[#26344D] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#F5F7FA]">
                Semester 5 Subjects
              </h2>
              <span className="text-[11px] font-mono text-[#B7F34A] bg-[#B7F34A]/10 px-2 py-0.5 rounded-full border border-[#B7F34A]/20">
                8 Courses • 23 Credits
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Anna University Regulation 2021 curriculum for 3rd Year B.E. Computer Science & Engineering.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0B1220] border border-[#26344D] overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All 8 Courses' },
              { id: 'core', label: 'Core Theory (4)' },
              { id: 'elective', label: 'Electives (2)' },
              { id: 'lab', label: 'Laboratories (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubjectFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  subjectFilter === tab.id
                    ? 'bg-[#B7F34A] text-[#0B1220]'
                    : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredSubjects.map((sub) => {
            const isLab = sub.code.endsWith('11') || sub.code.endsWith('61');
            const isElective = sub.code.startsWith('CCS');

            return (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-[#0B1220] border border-[#26344D] flex flex-col justify-between space-y-3 hover:border-[#94A3B8]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="font-bold text-[#B7F34A]">{sub.code}</span>
                    <span className="text-[#94A3B8] px-1.5 py-0.5 rounded bg-[#111B2E] border border-[#26344D]">
                      {sub.credits} Credits
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F5F7FA] leading-snug group-hover:text-[#B7F34A] transition-colors">
                    {sub.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111B2E] text-[#94A3B8]">
                      {isLab ? 'Practical Lab' : isElective ? 'Professional Elective' : 'Core Theory'}
                    </span>
                    {sub.units && sub.units.length > 0 && (
                      <span className="text-[10px] font-mono text-slate-400">
                        • 5 Units
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#26344D] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] font-mono">
                    <span>{sub.resourcesCount?.notes || 6} Notes</span>
                    <span>•</span>
                    <span>{sub.resourcesCount?.questionPapers || 4} QPs</span>
                  </div>
                  <Link
                    href={`/academics/cse/2021/semester-5/${sub.code.toLowerCase()}`}
                    className="text-xs font-semibold text-[#B7F34A] hover:underline flex items-center gap-1"
                  >
                    <span>Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. SEMESTER 5 LECTURE NOTES                                          */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#F5F7FA]">Semester 5 Notes</h2>
              <span className="text-[11px] font-mono text-[#B7F34A] bg-[#B7F34A]/10 px-2 py-0.5 rounded-full">
                Units 1–5
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">Verified faculty lecture notes and toppers&apos; reference guides</p>
          </div>
          <Link href="/notes" className="text-xs font-semibold text-[#B7F34A] hover:underline">
            View All Notes →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sem5Notes.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. SEMESTER 5 QUESTION PAPERS                                        */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#F5F7FA]">Question Paper Archives</h2>
              <span className="text-[11px] font-mono text-[#94A3B8] bg-[#111B2E] border border-[#26344D] px-2 py-0.5 rounded-full">
                Nov/Dec & Apr/May
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">Official Anna University examination archives for 5th semester CSE</p>
          </div>
          <Link href="/question-papers" className="text-xs font-semibold text-[#B7F34A] hover:underline">
            View All Papers →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sem5QPs.map((qp) => (
            <QuestionPaperCard key={qp.id} qp={qp} />
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. REPEATING IMPORTANT QUESTIONS                                     */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#F5F7FA]">Repeating Exam Questions</h2>
              <span className="text-[11px] font-mono text-[#B7F34A] bg-[#B7F34A]/10 px-2 py-0.5 rounded-full">
                High Recurrence
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">Verified 2-mark & 13/15-mark questions derived from past Anna University exams</p>
          </div>
          <Link href="/important-questions" className="text-xs font-semibold text-[#B7F34A] hover:underline">
            View All Questions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sem5Questions.map((iq) => (
            <ImportantQuestionCard key={iq.id} question={iq} />
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. 3RD YEAR INTERNSHIPS & PLACEMENT RADAR                            */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#F5F7FA]">3rd Year Internship Pipeline</h2>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                Summer 2026/2027
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">Verified tech internships for CSE students with active stipend</p>
          </div>
          <Link href="/internships" className="text-xs font-semibold text-[#B7F34A] hover:underline">
            Explore Opportunities →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. OFFICIAL PORTAL NOTICE & DISCLAIMER                               */}
      {/* ==================================================================== */}
      <section className="pt-2">
        <div className="p-4 rounded-xl bg-[#111B2E] border border-[#26344D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <div>
            <strong className="text-[#F5F7FA]">Notice:</strong> AU Student Hub is an independent student academic resource platform tailored for 3rd Year B.E. Computer Science students under Anna University Regulation 2021.
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://aucoe.annauniv.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5B8CFF] hover:underline flex items-center gap-1 font-mono"
            >
              <span>AU COE Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://cac.annauniv.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5B8CFF] hover:underline flex items-center gap-1 font-mono"
            >
              <span>CAC Regulations</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
