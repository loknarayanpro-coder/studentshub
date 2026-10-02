'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  FileCheck,
  Briefcase,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Calculator,
  Compass,
  FileText,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  User,
  FolderOpen,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { QuestionPaperCard } from '@/components/resources/QuestionPaperCard';
import {
  MOCK_RESOURCES,
  MOCK_OPPORTUNITIES,
  MOCK_QUESTION_PAPERS,
  SUBJECTS,
} from '@/lib/mock-data';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { openPdfViewer, bookmarks } = useApp();
  const [activeNav, setActiveNav] = useState('overview');

  const studentName = user?.fullName || 'Student';
  const semester = user?.semester || 5;
  const regulation = user?.regulation || '2021';
  const department = user?.department || 'cse';

  // Semester subjects
  const currentSubjects = SUBJECTS.filter(
    (s) => s.departmentId === department && s.semester === semester
  );

  const matchedOpportunities = MOCK_OPPORTUNITIES.slice(0, 3);
  const recentQPs = MOCK_QUESTION_PAPERS.slice(0, 2);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Compass, href: '/dashboard' },
    { id: 'academics', label: 'Academics', icon: GraduationCap, href: '/academics' },
    { id: 'notes', label: 'Notes', icon: BookOpen, href: '/notes' },
    { id: 'question-papers', label: 'Question Papers', icon: FileCheck, href: '/question-papers' },
    { id: 'important-questions', label: 'Important Questions', icon: HelpCircle, href: '/important-questions' },
    { id: 'internships', label: 'Internships', icon: Briefcase, href: '/internships' },
    { id: 'jobs', label: 'Jobs', icon: TrendingUp, href: '/jobs' },
    { id: 'placement', label: 'Placement', icon: ShieldCheck, href: '/placement' },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, href: '/bookmarks' },
    { id: 'tools', label: 'Tools', icon: Calculator, href: '/tools' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ==================================================================== */}
        {/* COMPACT SIDEBAR                                                      */}
        {/* ==================================================================== */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="p-3 bg-[#111B2E] border border-[#26344D] rounded-2xl space-y-1">
            <div className="px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
              Student Workspace
            </div>
            <nav className="space-y-0.5">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#B7F34A]/10 text-[#F5F7FA] border border-[#B7F34A]/30'
                        : 'text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#162238]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#B7F34A]' : 'text-[#94A3B8]'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Academic Profile Summary */}
          <div className="p-4 bg-[#111B2E] border border-[#26344D] rounded-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between text-[#94A3B8]">
              <span>Regulation</span>
              <span className="font-mono text-[#F5F7FA] font-bold">R{regulation}</span>
            </div>
            <div className="flex items-center justify-between text-[#94A3B8]">
              <span>Department</span>
              <span className="font-mono text-[#F5F7FA] font-bold">{department.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between text-[#94A3B8]">
              <span>Current Sem</span>
              <span className="font-mono text-[#B7F34A] font-bold">Sem {semester}</span>
            </div>
            <div className="pt-2 border-t border-[#26344D] flex items-center justify-between text-[#94A3B8]">
              <span>Saved Items</span>
              <span className="font-mono text-[#F5F7FA] font-bold">{bookmarks.length || 0}</span>
            </div>
          </div>

          {/* Official University Services Links */}
          <div className="p-4 bg-[#111B2E] border border-[#26344D] rounded-2xl space-y-2.5">
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
              Anna Univ Portals
            </p>
            <div className="space-y-1.5 text-[11px]">
              <a
                href="https://coe1.annauniv.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#94A3B8] hover:text-[#B7F34A] transition-colors"
              >
                <span>CoE1 Student Exam Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://onlineservices.annauniv.edu/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#94A3B8] hover:text-[#B7F34A] transition-colors"
              >
                <span>SoS Student Online Services</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://cac.annauniv.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#94A3B8] hover:text-[#B7F34A] transition-colors"
              >
                <span>CAC Syllabus & Academic Calendar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://cuic.annauniv.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#94A3B8] hover:text-[#B7F34A] transition-colors"
              >
                <span>CUIC Campus Placements</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* ==================================================================== */}
        {/* MAIN WORKSPACE CONTENT                                               */}
        {/* ==================================================================== */}
        <main className="lg:col-span-9 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
              Good morning 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-mono">
              {department.toUpperCase()} • Semester {semester} • Regulation {regulation}
            </p>
          </div>

          {/* Core Dashboard 3-Card Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Continue Studying */}
            <Card className="p-5 border-[#26344D] bg-[#111B2E] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                  Continue Studying
                </span>
                <h3 className="text-base font-bold text-[#F5F7FA] mt-1">
                  Computer Networks
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Unit 3: Network Layer
                </p>

                {/* Electric Lime Progress Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#94A3B8]">Progress</span>
                    <span className="text-[#B7F34A] font-bold">80%</span>
                  </div>
                  <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden border border-[#26344D]">
                    <div className="bg-[#B7F34A] h-full w-[80%] rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#26344D]">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openPdfViewer(MOCK_RESOURCES[1])}
                  className="w-full text-xs font-semibold"
                >
                  Continue →
                </Button>
              </div>
            </Card>

            {/* 2. Recent Resources */}
            <Card className="p-5 border-[#26344D] bg-[#111B2E] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#26344D]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                    Recent Resources
                  </span>
                  <Link href="/notes" className="text-[10px] text-[#5B8CFF] hover:underline font-medium">
                    View all
                  </Link>
                </div>

                <div className="space-y-2 mt-3 text-xs">
                  <button
                    onClick={() => openPdfViewer(MOCK_RESOURCES[1])}
                    className="w-full text-left p-2 rounded-lg bg-[#0B1220] hover:bg-[#162238] border border-[#26344D] transition-colors truncate block"
                  >
                    <p className="font-semibold text-[#F5F7FA] truncate">Computer Networks — Unit 3</p>
                    <p className="text-[10px] text-[#94A3B8]">Handwritten Lecture Notes • 2.4 MB</p>
                  </button>

                  <button
                    onClick={() => openPdfViewer(MOCK_QUESTION_PAPERS[0])}
                    className="w-full text-left p-2 rounded-lg bg-[#0B1220] hover:bg-[#162238] border border-[#26344D] transition-colors truncate block"
                  >
                    <p className="font-semibold text-[#F5F7FA] truncate">Database Management — 2025 QP</p>
                    <p className="text-[10px] text-[#94A3B8]">End-Semester Examination Paper</p>
                  </button>

                  <Link
                    href="/important-questions"
                    className="w-full text-left p-2 rounded-lg bg-[#0B1220] hover:bg-[#162238] border border-[#26344D] transition-colors truncate block"
                  >
                    <p className="font-semibold text-[#F5F7FA] truncate">Operating Systems — Important Questions</p>
                    <p className="text-[10px] text-[#94A3B8]">Part-B 13-Mark & 16-Mark High Frequency</p>
                  </Link>

                  <Link
                    href="/placement"
                    className="w-full text-left p-2 rounded-lg bg-[#0B1220] hover:bg-[#162238] border border-[#26344D] transition-colors truncate block"
                  >
                    <p className="font-semibold text-[#F5F7FA] truncate">Java — Interview Questions</p>
                    <p className="text-[10px] text-[#94A3B8]">Campus Hiring Technical Round</p>
                  </Link>
                </div>
              </div>
            </Card>

            {/* 3. Upcoming Schedule */}
            <Card className="p-5 border-[#26344D] bg-[#111B2E] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#26344D]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                    Upcoming
                  </span>
                  <span className="text-[10px] font-mono text-[#B7F34A]">Oct / Nov 2026</span>
                </div>

                <div className="space-y-2.5 mt-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0B1220] border border-[#26344D] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#F5F7FA]">CN Internal</p>
                      <p className="text-[10px] text-[#94A3B8]">CS3591 Assessment 2</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#B7F34A] bg-[#B7F34A]/10 border border-[#B7F34A]/30 px-2 py-0.5 rounded">
                      23 Oct
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0B1220] border border-[#26344D] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#F5F7FA]">DBMS Exam</p>
                      <p className="text-[10px] text-[#94A3B8]">Continuous Assessment</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#F5F7FA] bg-[#111B2E] border border-[#26344D] px-2 py-0.5 rounded">
                      28 Oct
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0B1220] border border-[#26344D] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#F5F7FA]">Compiler Lab Model</p>
                      <p className="text-[10px] text-[#94A3B8]">Practical Evaluation</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#94A3B8] bg-[#111B2E] border border-[#26344D] px-2 py-0.5 rounded">
                      04 Nov
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0B1220] border border-[#26344D] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#F5F7FA]">AU End-Sem Begins</p>
                      <p className="text-[10px] text-[#94A3B8]">Theory Examination Hall</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#5B8CFF] bg-[#5B8CFF]/10 border border-[#5B8CFF]/30 px-2 py-0.5 rounded">
                      18 Nov
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#26344D] text-center">
                <Link href="/tools?tab=countdown" className="text-xs text-[#5B8CFF] hover:underline font-medium">
                  Open Full Exam Countdown →
                </Link>
              </div>
            </Card>
          </div>

          {/* Semester Subjects Section */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">
                  Semester {semester} Subjects
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Core theory and laboratory courses for Anna University Regulation {regulation}
                </p>
              </div>
              <Link href="/academics" className="text-xs text-[#5B8CFF] hover:underline font-medium">
                All Departments →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentSubjects.map((sub) => {
                const res = MOCK_RESOURCES.find((r) => r.subjectCode === sub.code);
                return (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl bg-[#111B2E] border border-[#26344D] hover:border-[#B7F34A]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-[#B7F34A]">{sub.code}</span>
                        <span className="text-[10px] text-[#94A3B8] font-mono">{sub.credits} Credits</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#F5F7FA] leading-tight">{sub.name}</h4>
                      <p className="text-[11px] text-[#94A3B8] mt-1 line-clamp-1">{sub.description}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#26344D] flex items-center justify-between">
                      {res ? (
                        <button
                          onClick={() => openPdfViewer(res)}
                          className="text-[11px] text-[#B7F34A] hover:underline font-semibold flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Unit Notes</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8]">5 Units Syllabus</span>
                      )}

                      <Link
                        href={`/academics/${department}/${regulation}/semester-${semester}/${sub.code.toLowerCase()}`}
                        className="text-[11px] text-[#5B8CFF] hover:underline font-medium"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Career & Placement Opportunities Matched */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">
                  Campus Recruitment & Verified Internships
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Verified openings aligned with Anna University CUIC schedule
                </p>
              </div>
              <Link href="/internships" className="text-xs text-[#5B8CFF] hover:underline font-medium">
                View All Opportunities →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {matchedOpportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
