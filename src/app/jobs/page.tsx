'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const CATEGORIES = [
  'All Roles',
  'Software Development',
  'Cloud & DevOps',
  'AI / Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Core Engineering',
];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Roles');
  const [selectedMode, setSelectedMode] = useState('all');

  const jobs = useMemo(() => {
    return dataService.getJobs();
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search.trim() ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.skillsRequired.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesMode = selectedMode === 'all' || job.workMode === selectedMode;
      const matchesCategory =
        selectedCategory === 'All Roles' ||
        job.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        job.description.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesMode && matchesCategory;
    });
  }, [jobs, search, selectedMode, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Early Career Opportunities
          </span>
          <Badge variant="purple" className="text-[10px]">
            Campus & Off-Campus Hiring
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Jobs for Students & Freshers
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Entry-level software engineer, technical consultant, and graduate engineering trainee
          opportunities for Anna University engineering cohorts.
        </p>
      </div>

      {/* Filter and Category Pills */}
      <Card className="p-5 border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search fresher jobs by title, company, or skills (e.g. TCS, Java, SQL)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-full sm:w-44">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site Chennai</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-800/80 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Found {filtered.length} verified fresher job postings</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((job) => (
              <OpportunityCard key={job.id} opportunity={job} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400 border border-dashed border-slate-800 rounded-3xl">
            <Briefcase className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h4 className="text-base font-semibold text-white">No Jobs Found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No active fresher job openings match this filter. Try switching back to &ldquo;All Roles&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
