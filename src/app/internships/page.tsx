'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function InternshipsPage() {
  const [search, setSearch] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedPaid, setSelectedPaid] = useState('all');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedGradYear, setSelectedGradYear] = useState('all');

  const allOpportunities = useMemo(() => {
    return dataService.getInternships();
  }, []);

  const filtered = useMemo(() => {
    return allOpportunities.filter((opp) => {
      const matchesSearch =
        !search.trim() ||
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.companyName.toLowerCase().includes(search.toLowerCase()) ||
        opp.skillsRequired.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesMode = selectedMode === 'all' || opp.workMode === selectedMode;
      const matchesPaid =
        selectedPaid === 'all' ||
        (selectedPaid === 'paid' && !opp.stipendOrSalary.toLowerCase().includes('unpaid')) ||
        (selectedPaid === 'unpaid' && opp.stipendOrSalary.toLowerCase().includes('unpaid'));

      const matchesDept =
        selectedDept === 'all' ||
        opp.eligibility.some((e) => e.toLowerCase() === selectedDept.toLowerCase());

      const matchesGrad =
        selectedGradYear === 'all' ||
        opp.graduationYears.includes(Number(selectedGradYear));

      return matchesSearch && matchesMode && matchesPaid && matchesDept && matchesGrad;
    });
  }, [allOpportunities, search, selectedMode, selectedPaid, selectedDept, selectedGradYear]);

  const resetFilters = () => {
    setSearch('');
    setSelectedMode('all');
    setSelectedPaid('all');
    setSelectedDept('all');
    setSelectedGradYear('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Student Opportunities
          </span>
          <Badge variant="success" className="text-[10px]">
            <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> Verified Openings
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Find your next opportunity.
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Stipend-backed internships and apprentice roles curated for engineering students.
          Every posting is manually verified with active application links.
        </p>
      </div>

      {/* Filter and Search */}
      <Card className="p-5 border-slate-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by role, company name, or technology (e.g. React, Zoho, Cloud)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-800/80">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Work Mode</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Stipend</label>
            <select
              value={selectedPaid}
              onChange={(e) => setSelectedPaid(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Opportunities</option>
              <option value="paid">Paid Only</option>
              <option value="unpaid">Unpaid / Research</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Eligible Branch</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full rounded-xl bg-[#0B1220] border border-[#26344D] px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#B7F34A]"
            >
              <option value="cse">CSE (Computer Science)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Graduation Year</label>
            <select
              value={selectedGradYear}
              onChange={(e) => setSelectedGradYear(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Batches</option>
              <option value="2026">2026 Batch</option>
              <option value="2027">2027 Batch</option>
              <option value="2028">2028 Batch</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full text-xs py-2 h-[38px]"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Found {filtered.length} active internships</span>
          <span>Click any card for full JD & requirements</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400 border border-dashed border-slate-800 rounded-3xl">
            <Briefcase className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h4 className="text-base font-semibold text-white">No Internships Found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No verified internships currently match these filters. Try clearing your filters or checking back tomorrow.
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4 text-xs">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
