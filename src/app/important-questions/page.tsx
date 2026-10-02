'use client';

import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  Flame,
  Star,
  Compass,
  Target,
  ShieldCheck,
  Filter,
  X,
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { SUBJECTS } from '@/lib/mock-data';
import { ImportantQuestionCard } from '@/components/resources/ImportantQuestionCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ImportantQuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedMarks, setSelectedMarks] = useState<string>('all');

  // Semester 5 CSE subjects
  const sem5CseSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.departmentId === 'cse' && s.semester === 5);
  }, []);

  const allQuestions = useMemo(() => {
    // Only return questions for Sem 5 CSE subjects
    return dataService.getImportantQuestions().filter(
      (q) => sem5CseSubjects.some((sub) => sub.code === q.subjectCode)
    );
  }, [sem5CseSubjects]);

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchesCategory =
        selectedCategory === 'all' || q.category === selectedCategory;
      const matchesSubject =
        selectedSubject === 'all' || q.subjectCode === selectedSubject;
      const matchesMarks =
        selectedMarks === 'all' || q.marks === Number(selectedMarks);
      const matchesSearch =
        !search.trim() ||
        q.questionText.toLowerCase().includes(search.toLowerCase()) ||
        q.subjectCode.toLowerCase().includes(search.toLowerCase()) ||
        q.subjectName.toLowerCase().includes(search.toLowerCase()) ||
        q.unitTitle?.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSubject && matchesMarks && matchesSearch;
    });
  }, [allQuestions, selectedCategory, selectedSubject, selectedMarks, search]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedSubject('all');
    setSelectedMarks('all');
  };

  const categoryPills = [
    { id: 'all', label: 'All Questions' },
    { id: 'Frequently Asked', label: '🔥 Frequently Asked' },
    { id: 'Important', label: '⭐ Important' },
    { id: 'Exam Focus', label: '🎯 Exam Focus' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
            Verified Exam Intelligence
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111B2E] border border-[#26344D] text-[#94A3B8] font-mono">
            3rd Year • Semester 5 CSE (R-2021)
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Semester 5 Important Questions
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
          High-frequency 2-mark, 13-mark, and 15-mark Part C questions compiled directly from Anna University
          Nov/Dec and Apr/May question papers with verified scoring points.
        </p>
      </div>

      {/* Categories & Filter Bar */}
      <Card className="p-5 border-[#26344D] bg-[#111B2E] space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by topic or question (e.g. OSI, Dijkstra, Subnetting, LR Parsing, RSA, NIST)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] pl-10 pr-4 py-2.5 text-xs text-[#F5F7FA] placeholder:text-slate-500 focus:outline-none focus:border-[#B7F34A]"
          />
        </div>

        {/* Dropdowns */}
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
            <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Mark Scheme</label>
            <select
              value={selectedMarks}
              onChange={(e) => setSelectedMarks(e.target.value)}
              className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#B7F34A]"
            >
              <option value="all">All Marks (2, 13, 15)</option>
              <option value="15">15 Mark (Part C Case Study)</option>
              <option value="13">13 Mark (Part B Descriptive)</option>
              <option value="2">2 Mark (Part A Conceptual)</option>
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

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-[#26344D] scrollbar-none">
          {categoryPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedCategory(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === pill.id
                  ? 'bg-[#B7F34A] text-[#0B1220] font-bold'
                  : 'bg-[#0B1220] border border-[#26344D] text-[#94A3B8] hover:text-[#F5F7FA]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span>
            Found <strong className="text-[#F5F7FA]">{filtered.length}</strong> repeating questions with answer outlines
          </span>
          <span>Click any question to view key scoring points and answer structure</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((iq) => (
              <ImportantQuestionCard key={iq.id} question={iq} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#111B2E] border border-[#26344D] space-y-3">
            <HelpCircle className="w-10 h-10 text-[#94A3B8] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#F5F7FA]">No repeating questions match your criteria</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              Try switching mark scheme or subject to see all questions for Semester 5 CSE.
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
