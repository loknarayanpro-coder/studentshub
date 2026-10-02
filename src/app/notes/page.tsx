'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Layers,
  Sparkles,
  Download,
  Eye,
  SlidersHorizontal,
  X,
  FileCheck,
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { SUBJECTS } from '@/lib/mock-data';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function NotesLibraryPage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState('all');

  // Semester 5 CSE subjects only
  const sem5CseSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.departmentId === 'cse' && s.semester === 5);
  }, []);

  const allNotes = useMemo(() => {
    // Only return notes that belong to Sem 5 CSE
    return dataService.getNotes().filter(
      (n) => n.departmentId === 'cse' && n.semester === 5
    );
  }, []);

  const filteredNotes = useMemo(() => {
    return allNotes.filter((note) => {
      const matchesSearch =
        !search.trim() ||
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.subjectCode.toLowerCase().includes(search.toLowerCase()) ||
        note.subjectName.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        selectedSubject === 'all' || note.subjectCode === selectedSubject;
      const matchesUnit =
        selectedUnit === 'all' || (note.unitNumber && note.unitNumber === Number(selectedUnit));

      return matchesSearch && matchesSubject && matchesUnit;
    });
  }, [allNotes, search, selectedSubject, selectedUnit]);

  const resetFilters = () => {
    setSearch('');
    setSelectedSubject('all');
    setSelectedUnit('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
            CSE Document Vault
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111B2E] border border-[#26344D] text-[#94A3B8] font-mono">
            3rd Year • Semester 5 • Regulation 2021
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Semester 5 Notes Library
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
          High-yield handwritten faculty notes, unit-wise reference guides (Units 1–5), and toppers&apos; formula sheets
          curated exclusively for Anna University B.E. Computer Science 5th semester students.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-5 border-[#26344D] bg-[#111B2E] space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by topic, unit, or keyword (e.g. CS3591, Subnetting, Dijkstra, LR Parsing, RSA)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] pl-10 pr-4 py-2.5 text-xs text-[#F5F7FA] placeholder:text-slate-500 focus:outline-none focus:border-[#B7F34A]"
          />
        </div>

        {/* Filters */}
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
            <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Unit Filter</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#B7F34A]"
            >
              <option value="all">All Units (1 to 5)</option>
              {[1, 2, 3, 4, 5].map((u) => (
                <option key={u} value={u}>
                  Unit {u}
                </option>
              ))}
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

      {/* Notes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span>
            Showing <strong className="text-[#F5F7FA]">{filteredNotes.length}</strong> verified Sem 5 notes
          </span>
          <span>Click any card to read in full-screen reader</span>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <ResourceCard key={note.id} resource={note} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#111B2E] border border-[#26344D] space-y-3">
            <BookOpen className="w-10 h-10 text-[#94A3B8] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#F5F7FA]">No lecture notes match your filter</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              Try choosing &quot;All Units&quot; or clearing your search term to see more Semester 5 materials.
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
