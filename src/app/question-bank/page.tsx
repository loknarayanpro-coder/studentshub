'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Bookmark,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';
import { MOCK_QUESTION_BANK, SUBJECTS } from '@/lib/mock-data';
import { useApp } from '@/lib/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function QuestionBankPage() {
  const { toggleBookmark, isBookmarked } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<number>(0);

  const filtered = MOCK_QUESTION_BANK.filter((item) => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesUnit = selectedUnit === 0 || item.unitNumber === selectedUnit;
    return matchesType && matchesUnit;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Rapid Revision Bank
          </span>
          <Badge variant="info" className="text-[10px]">
            Short Answers & Numerical Solutions
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Question Bank
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Comprehensive 2 Mark short questions, 13 Mark descriptive outlines, 15 Mark Part C analytical
          problems, and Multiple Choice Questions.
        </p>
      </div>

      {/* Filter Bar */}
      <Card className="p-5 border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Question Types' },
              { id: '2_mark', label: '2 Marks (Part A)' },
              { id: '13_mark', label: '13 Marks (Part B)' },
              { id: '15_mark', label: '15 Marks (Part C)' },
              { id: 'mcq', label: 'MCQs' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  selectedType === t.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Unit:</span>
            {[0, 1, 2, 3, 4, 5].map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUnit(u)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedUnit === u
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {u === 0 ? 'All' : u}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isSaved = isBookmarked('important_question', item.id);

          return (
            <Card key={item.id} className="p-5 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="purple" className="text-[10px] uppercase font-bold">
                    {item.type.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">Unit {item.unitNumber}</span>
                  {item.sourceExamYear && (
                    <span className="text-[11px] font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
                      {item.sourceExamYear}
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    toggleBookmark({
                      type: 'important_question',
                      id: item.id,
                      title: item.question,
                      subtitle: `Unit ${item.unitNumber} • ${item.type}`,
                      badge: 'QB',
                      link: '/question-bank',
                    })
                  }
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSaved ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Bookmark this question"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                </button>
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                &ldquo;{item.question}&rdquo;
              </h4>

              {item.answerSummary && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-emerald-400 block mb-1">Answer Outline:</span>
                  {item.answerSummary}
                </div>
              )}

              {item.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {item.options.map((opt, i) => (
                    <div
                      key={opt}
                      className={`p-2 rounded-lg text-xs border ${
                        i === item.correctOptionIndex
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                      {i === item.correctOptionIndex && ' (Correct Answer)'}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
