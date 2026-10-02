'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  FileCheck,
  HelpCircle,
  Code,
  GraduationCap,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Share2,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import {
  SUBJECTS,
  MOCK_RESOURCES,
  MOCK_QUESTION_PAPERS,
  MOCK_IMPORTANT_QUESTIONS,
  MOCK_QUESTION_BANK,
} from '@/lib/mock-data';
import { StudyProgressStatus } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { QuestionPaperCard } from '@/components/resources/QuestionPaperCard';
import { ImportantQuestionCard } from '@/components/resources/ImportantQuestionCard';

export default function SubjectDetailPage({
  params,
}: {
  params: Promise<{
    dept: string;
    regulation: string;
    semester: string;
    subjectCode: string;
  }>;
}) {
  const resolvedParams = use(params);
  const { subjectCode, dept, regulation, semester } = resolvedParams;

  const {
    openPdfViewer,
    setUnitProgress,
    getUnitProgress,
    getOverallSubjectProgress,
    toggleBookmark,
    isBookmarked,
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  // Find subject matching code or default to CS3591
  const subject =
    SUBJECTS.find((s) => s.code.toLowerCase() === subjectCode.toLowerCase()) ||
    SUBJECTS.find((s) => s.code === 'CS3591')!;

  if (!subject) {
    notFound();
  }

  const subjectNotes = MOCK_RESOURCES.filter(
    (r) => r.subjectCode.toLowerCase() === subject.code.toLowerCase() && r.resourceType === 'notes'
  );

  const subjectQPs = MOCK_QUESTION_PAPERS.filter(
    (qp) => qp.subjectCode.toLowerCase() === subject.code.toLowerCase()
  );

  const subjectQuestions = MOCK_IMPORTANT_QUESTIONS.filter(
    (iq) => iq.subjectCode.toLowerCase() === subject.code.toLowerCase()
  );

  const subjectQB = MOCK_QUESTION_BANK.filter(
    (qb) => qb.subjectId === subject.id || subject.code === 'CS3591'
  );

  const overallProgress = getOverallSubjectProgress(subject.id, subject.units?.length || 5);
  const isSubjectSaved = isBookmarked('resource', subject.id);

  const tabsList = [
    { id: 'overview', label: 'Overview & Units' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'notes', label: 'Notes', count: subjectNotes.length },
    { id: 'question-papers', label: 'Question Papers', count: subjectQPs.length },
    { id: 'important-questions', label: 'Important Qs', count: subjectQuestions.length },
    { id: 'question-bank', label: 'Question Bank', count: subjectQB.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#94A3B8]">
        <Link href="/academics" className="hover:text-[#F5F7FA] transition-colors">
          Academics
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]/60" />
        <span className="font-mono text-[#F5F7FA] font-bold">CSE</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]/60" />
        <span className="text-[#94A3B8]">Semester 5 (R-2021)</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]/60" />
        <span className="text-[#B7F34A] font-mono font-bold">{subject.code}</span>
      </nav>

      {/* Hero Subject Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#111B2E] border border-[#26344D] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/20">
                {subject.code}
              </span>
              <Badge variant="lime" className="text-xs">
                Regulation {subject.regulation}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Semester {subject.semester}
              </Badge>
              <Badge variant="info" className="text-xs">
                {subject.credits} Credits
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
              {subject.name}
            </h1>
          </div>

          {/* Study Progress Indicator */}
          <div className="p-4 rounded-xl bg-[#0B1220] border border-[#26344D] min-w-[200px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8] font-medium">Your Study Progress</span>
              <span className="text-[#B7F34A] font-bold font-mono">{overallProgress}%</span>
            </div>
            <div className="w-full bg-[#111B2E] h-2 rounded-full overflow-hidden border border-[#26344D]">
              <div
                className="bg-[#B7F34A] h-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-[#94A3B8] text-center">
              Mark units complete below to track progress
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-3xl leading-relaxed">
          {subject.description}
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />

      {/* ==================================================================== */}
      {/* TAB 1: OVERVIEW & UNITS BREAKDOWN WITH STUDY STATUS                  */}
      {/* ==================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Units & Syllabus Progress</h3>
            <p className="text-xs text-slate-400">
              Update your study status for each unit to keep your revision on track.
            </p>
          </div>

          <div className="space-y-4">
            {subject.units?.map((unit) => {
              const status = getUnitProgress(subject.id, unit.unitNumber);

              return (
                <Card key={unit.id} className="p-5 border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-blue-400">
                          Unit {unit.unitNumber}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">{unit.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{unit.description}</p>
                    </div>

                    {/* Progress Selector Buttons */}
                    <div className="flex items-center gap-1.5 self-start sm:self-center">
                      {(['not_started', 'studying', 'completed'] as StudyProgressStatus[]).map(
                        (st) => {
                          const isCurrent = status === st;
                          const labels = {
                            not_started: 'Not Started',
                            studying: 'Studying',
                            completed: 'Completed',
                          };
                          const colors = {
                            not_started: 'text-slate-400 hover:text-white',
                            studying: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                            completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                          };

                          return (
                            <button
                              key={st}
                              onClick={() => setUnitProgress(subject.id, unit.unitNumber, st)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                isCurrent
                                  ? colors[st]
                                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              {labels[st]}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Topics Pills */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                      Key Topics in Unit {unit.unitNumber}:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {unit.topics.map((tp) => (
                        <span
                          key={tp}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {tp}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: DETAILED SYLLABUS                                             */}
      {/* ==================================================================== */}
      {activeTab === 'syllabus' && (
        <Card className="p-6 border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">
            Official Anna University Syllabus Overview ({subject.regulation})
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {subject.syllabusOverview || subject.description}
          </p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                openPdfViewer({
                  id: `syl-${subject.code}`,
                  title: `${subject.code} Official University Syllabus`,
                  description: 'Syllabus and scheme of evaluation approved by Academic Council.',
                  subjectId: subject.id,
                  subjectCode: subject.code,
                  subjectName: subject.name,
                  departmentId: subject.departmentId,
                  semester: subject.semester,
                  regulation: subject.regulation,
                  resourceType: 'syllabus',
                  s3Key: `syllabus/${subject.code}.pdf`,
                  fileName: `${subject.code}_Syllabus.pdf`,
                  fileSize: '0.8 MB',
                  fileType: 'application/pdf',
                  isVerified: true,
                  isOfficial: true,
                  status: 'published',
                  downloadsCount: 1200,
                  viewsCount: 3400,
                  uploadedAt: '2026-01-10',
                })
              }
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Download Official Syllabus PDF
            </Button>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: NOTES FOR THIS SUBJECT                                        */}
      {/* ==================================================================== */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Lecture Notes & Handouts</h3>
            <span className="text-xs text-slate-400">{subjectNotes.length} verified notes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subjectNotes.length > 0 ? (
              subjectNotes.map((note) => <ResourceCard key={note.id} resource={note} />)
            ) : (
              <p className="col-span-full text-xs text-slate-400">
                Notes for this subject are being formatted by the academic committee.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: QUESTION PAPERS                                               */}
      {/* ==================================================================== */}
      {activeTab === 'question-papers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Previous Question Papers</h3>
            <span className="text-xs text-slate-400">{subjectQPs.length} papers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subjectQPs.length > 0 ? (
              subjectQPs.map((qp) => <QuestionPaperCard key={qp.id} qp={qp} />)
            ) : (
              <p className="col-span-full text-xs text-slate-400">
                University question papers for this subject are being archived.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: IMPORTANT QUESTIONS                                           */}
      {/* ==================================================================== */}
      {activeTab === 'important-questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Repeated & High Yield Questions</h3>
            <span className="text-xs text-slate-400">{subjectQuestions.length} questions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subjectQuestions.map((iq) => (
              <ImportantQuestionCard key={iq.id} question={iq} />
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 6: QUESTION BANK                                                 */}
      {/* ==================================================================== */}
      {activeTab === 'question-bank' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">2 Mark, 13 Mark & MCQ Bank</h3>
            <span className="text-xs text-slate-400">{subjectQB.length} entries</span>
          </div>

          <div className="space-y-3">
            {subjectQB.map((item) => (
              <Card key={item.id} className="p-4 border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="purple" className="text-[10px] uppercase">
                    {item.type.replace('_', ' ')}
                  </Badge>
                  {item.sourceExamYear && (
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.sourceExamYear}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">&ldquo;{item.question}&rdquo;</h4>
                {item.answerSummary && (
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-blue-400 font-semibold block mb-1">Answer Summary:</strong>
                    {item.answerSummary}
                  </p>
                )}
                {item.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
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
                        {i === item.correctOptionIndex && ' ✓'}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
