'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { dataService } from '@/services/dataService';
import { Opportunity, OpportunityType, WorkMode } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { getDaysRemaining } from '@/lib/utils';

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(
    dataService.getAllOpportunities()
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [type, setType] = useState<OpportunityType>('internship');
  const [workMode, setWorkMode] = useState<WorkMode>('hybrid');
  const [location, setLocation] = useState('Chennai, Tamil Nadu');
  const [stipendOrSalary, setStipendOrSalary] = useState('₹25,000 / month');
  const [duration, setDuration] = useState('6 Months');
  const [eligibility, setEligibility] = useState('CSE, IT, ECE');
  const [skillsRequired, setSkillsRequired] = useState('React, TypeScript, Tailwind');
  const [graduationYears, setGraduationYears] = useState('2026, 2027');
  const [deadline, setDeadline] = useState('2026-11-30T23:59:59Z');
  const [applyUrl, setApplyUrl] = useState('https://careers.example.com');
  const [isVerified, setIsVerified] = useState(true);
  const [description, setDescription] = useState('');

  const filtered = opportunities.filter(
    (o) =>
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete opportunity?')) {
      dataService.deleteOpportunity(id);
      setOpportunities(dataService.getAllOpportunities());
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title,
      companyName,
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=60&h=60&fit=crop',
      description,
      type,
      workMode,
      location,
      stipendOrSalary,
      duration,
      eligibility: eligibility.split(',').map((s) => s.trim()),
      skillsRequired: skillsRequired.split(',').map((s) => s.trim()),
      graduationYears: graduationYears.split(',').map((y) => parseInt(y.trim(), 10)),
      deadline,
      applyUrl,
      isVerified,
      status: 'published',
      clicksCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    dataService.saveOpportunity(newOpp);
    setOpportunities(dataService.getAllOpportunities());
    setIsAddModalOpen(false);
    setTitle('');
    setCompanyName('');
    setDescription('');
  };

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="Internship & Job Postings" />

      <div className="px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search postings by role or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1424] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 border-amber-500/30 text-slate-950 font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Post Verified Opportunity
          </Button>
        </div>

        {/* Opportunities List */}
        <Card className="border-slate-800 bg-[#0d1424] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Role & Company</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Compensation</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Verified</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((opp) => {
                  const { days, isExpired } = getDaysRemaining(opp.deadline);
                  return (
                    <tr key={opp.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-white">{opp.title}</p>
                        <p className="text-[10px] text-slate-400">
                          {opp.companyName} • {opp.location} ({opp.workMode})
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="purple" className="text-[10px] capitalize">
                          {opp.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-400">
                        {opp.stipendOrSalary}
                      </td>
                      <td className="py-3 px-4">
                        {isExpired ? (
                          <span className="text-[10px] text-rose-400 font-bold">Expired</span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-mono">
                            {days} days left
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {opp.isVerified ? (
                          <Badge variant="success" className="text-[9px]">
                            <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[9px]">
                            Unverified
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <a
                          href={opp.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5 inline" />
                        </a>
                        <button
                          onClick={() => handleDelete(opp.id)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add Opportunity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Post New Verified Opportunity"
        description="Publishes a student opportunity directly to the career portal with verified badge."
        maxWidth="2xl"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Job / Internship Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Frontend Developer Intern"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Company Name
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Zoho Corporation"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                <option value="internship">Internship</option>
                <option value="job">Fresher Job</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as any)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-Site</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Compensation</label>
              <Input
                value={stipendOrSalary}
                onChange={(e) => setStipendOrSalary(e.target.value)}
                placeholder="₹25,000 / month"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Eligible Branches</label>
              <Input
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                placeholder="CSE, IT, ECE"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Target Batches</label>
              <Input
                value={graduationYears}
                onChange={(e) => setGraduationYears(e.target.value)}
                placeholder="2026, 2027"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Application URL</label>
            <Input
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder="https://careers.company.com/apply"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Description & Requirements
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline project scope, technologies, and interview format..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
            >
              Post Opportunity
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
