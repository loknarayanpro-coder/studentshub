'use client';

import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  Search,
  Calendar,
  Layers,
  Sparkles,
  Download,
  Eye,
  SlidersHorizontal,
  X,
  GraduationCap,
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { SUBJECTS } from '@/lib/mock-data';
import { QuestionPaperCard } from '@/components/resources/QuestionPaperCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function QuestionPapersPage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSession, setSelectedSession] = useState('all');

  // Semester 5 CSE subjects
  const sem5CseSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.departmentId === 'cse' && s.semester === 5);
  }, []);

  const allQPs = useMemo(() => {
    // Only return question papers for Sem 5 CSE
    return dataService.getQuestionPapers().filter(
      (qp) => qp.departmentId === 'cse' && qp.semester === 5
    );
  }, []);

  const filteredQPs = useMemo(() => {
    return allQPs.filter((qp) => {
      const matchesSearch =
        !search.trim() ||
        qp.title.toLowerCase().includes(search.toLowerCase()) ||
        qp.subjectCode.toLowerCase().includes(search.toLowerCase()) ||
        qp.subjectName.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        selectedSubject === 'all' || qp.subjectCode === selectedSubject;
      const matchesSession =
        selectedSession === 'all' || qp.title.includes(selectedSession);

      return matchesSearch && matchesSubject && matchesSession;
    });
  }, [allQPs, search, selectedSubject, selectedSession]);

  const resetFilters = () => {
    setSearch('');
    setSelectedSubject('all');
    setSelectedSession('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
            Anna University COE Archives
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111B2E] border border-[#26344D] text-[#94A3B8] font-mono">
            3rd Year • Semester 5 CSE (R-2021)
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Semester 5 Question Papers
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
          Official Anna University end-semester question papers covering April/May and November/December
          examination sessions for B.E. Computer Science 5th semester courses.
        </p>
      </div>

      {/* Filter and Search */}
      <Card className="p-5 border-[#26344D] bg-[#111B2E] space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by subject code (e.g. CS3591, CS3501, CB3491) or exam session..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] pl-10 pr-4 py-2.5 text-xs text-[#F5F7FA] placeholder:text-slate-500 focus:outline-none focus:border-[#B7F34A]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-[#26344D]">
          <div className="sm:col-span-6">
            <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">
              Select Semester 5 Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#B7F34A]"
            >
              <option value="all">All Sem 5 CSE Subjects ({sem5CseSubjects.length})</option>
              {sem5CseSubjects.map((sub) => (
                <option key={sub.id} value={sub.code}>
                  {sub.code} - {sub.name} ({sub.credits} Cr)
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Exam Session</label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#B7F34A]"
            >
              <option value="all">All Exam Sessions</option>
              <option value="Nov/Dec 2024">Nov/Dec 2024</option>
              <option value="Apr/May 2024">Apr/May 2024</option>
              <option value="Nov/Dec 2023">Nov/Dec 2023</option>
              <option value="Apr/May 2023">Apr/May 2023</option>
              <option value="Nov/Dec 2022">Nov/Dec 2022</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full text-xs py-2 h-[38px] text-[#F5F7FA]"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Quick Subject Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-[#26344D] scrollbar-none">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap ${
              selectedSubject === 'all'
                ? 'bg-[#B7F34A] text-[#0B1220] font-bold'
                : 'text-[#94A3B8] bg-[#0B1220] border border-[#26344D] hover:text-[#F5F7FA]'
            }`}
          >
            All Subjects
          </button>
          {sem5CseSubjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.code)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap ${
                selectedSubject === sub.code
                  ? 'bg-[#B7F34A] text-[#0B1220] font-bold'
                  : 'text-[#94A3B8] bg-[#0B1220] border border-[#26344D] hover:text-[#F5F7FA]'
              }`}
            >
              {sub.code}
            </button>
          ))}
        </div>
      </Card>

      {/* Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span>
            Found <strong className="text-[#F5F7FA]">{filteredQPs.length}</strong> official question papers
          </span>
          <span>Click card to view PDF in embedded reader</span>
        </div>

        {filteredQPs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQPs.map((qp) => (
              <QuestionPaperCard key={qp.id} qp={qp} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#111B2E] border border-[#26344D] space-y-3">
            <FileCheck className="w-10 h-10 text-[#94A3B8] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#F5F7FA]">No question papers match your filter</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              Try switching session or subject filter to find previous years&apos; question papers.
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
