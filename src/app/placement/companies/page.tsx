'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Code,
  Users,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { MOCK_COMPANIES } from '@/lib/mock-data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function CompanyPrepPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState(MOCK_COMPANIES[0].id);

  const company = MOCK_COMPANIES.find((c) => c.id === selectedCompanyId) || MOCK_COMPANIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Link href="/placement" className="text-xs text-blue-400 hover:underline">
            ← Placement Hub
          </Link>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Company-Specific Playbooks
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Company Placement Guides
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          In-depth hiring pipelines, coding rounds format, recurring technical questions, and
          student-reported interview experiences for major engineering recruiters.
        </p>
      </div>

      {/* Mandatory Transparency Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-300">Community & Verification Notice:</strong> Selection
          processes and interview experiences listed here are compiled from student reports across recent
          graduating batches and public hiring drives. They reflect peer experiences and do not constitute
          official corporate hiring policies.
        </p>
      </div>

      {/* Company Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MOCK_COMPANIES.map((c) => {
          const isSelected = selectedCompanyId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCompanyId(c.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-5 h-5 rounded-md object-cover"
              />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Company Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Process & Coding Pattern */}
        <div className="lg:col-span-8 space-y-6">
          {/* Company Hero Card */}
          <Card className="p-6 border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-700 bg-slate-800"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">{company.name}</h2>
                  <p className="text-xs text-blue-400 font-medium">{company.domain}</p>
                </div>
              </div>

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700"
                >
                  Official Site <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {company.description}
            </p>
          </Card>

          {/* Hiring Pipeline Breakdown */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Recruitment Process & Rounds
            </h3>

            <div className="space-y-3">
              {company.selectionProcess.map((round) => (
                <Card key={round.round} className="p-4 border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{round.title}</span>
                    <Badge variant="purple" className="text-[10px]">
                      {round.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{round.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              Frequently Asked Coding Challenges
            </h3>

            <div className="space-y-3">
              {company.sampleQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-blue-400">{q.topic}</span>
                    <Badge
                      variant={
                        q.difficulty === 'Hard'
                          ? 'danger'
                          : q.difficulty === 'Medium'
                          ? 'warning'
                          : 'success'
                      }
                      className="text-[10px]"
                    >
                      {q.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">&ldquo;{q.question}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Tips & Student Reported Experiences */}
        <div className="lg:col-span-4 space-y-6">
          {/* Preparation Tips */}
          <Card className="p-5 border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Key Strategy Tips
            </h4>
            <div className="space-y-2">
              {company.interviewTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Student Reported Experiences */}
          <Card className="p-5 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                Student-Reported Reviews
              </h4>
              <Badge variant="outline" className="text-[10px]">
                Peer Submissions
              </Badge>
            </div>

            <div className="space-y-3">
              {company.studentExperiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{exp.role}</span>
                    <Badge variant="success" className="text-[10px]">
                      {exp.verdict}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {exp.studentBatch}
                  </span>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{exp.experienceReview}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
