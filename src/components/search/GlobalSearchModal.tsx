'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  FileText,
  Briefcase,
  Building,
  HelpCircle,
  ArrowRight,
  X,
  FileCheck,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import {
  SUBJECTS,
  MOCK_RESOURCES,
  MOCK_QUESTION_PAPERS,
  MOCK_IMPORTANT_QUESTIONS,
  MOCK_OPPORTUNITIES,
  MOCK_COMPANIES,
} from '@/lib/mock-data';

export function GlobalSearchModal() {
  const router = useRouter();
  const { isSearchOpen, closeSearch, openPdfViewer } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const matchedSubjects = SUBJECTS.filter(
      (s) => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedNotes = MOCK_RESOURCES.filter(
      (r) =>
        r.resourceType === 'notes' &&
        (r.title.toLowerCase().includes(q) ||
          r.subjectCode.toLowerCase().includes(q) ||
          r.subjectName.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedQPs = MOCK_QUESTION_PAPERS.filter(
      (qp) =>
        qp.title.toLowerCase().includes(q) ||
        qp.subjectCode.toLowerCase().includes(q) ||
        qp.subjectName.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedQuestions = MOCK_IMPORTANT_QUESTIONS.filter(
      (iq) =>
        iq.questionText.toLowerCase().includes(q) ||
        iq.subjectCode.toLowerCase().includes(q) ||
        iq.subjectName.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedOpportunities = MOCK_OPPORTUNITIES.filter(
      (opp) =>
        opp.title.toLowerCase().includes(q) ||
        opp.companyName.toLowerCase().includes(q) ||
        opp.skillsRequired.some((s) => s.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedCompanies = MOCK_COMPANIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.domain.toLowerCase().includes(q)
    ).slice(0, 3);

    const totalCount =
      matchedSubjects.length +
      matchedNotes.length +
      matchedQPs.length +
      matchedQuestions.length +
      matchedOpportunities.length +
      matchedCompanies.length;

    return {
      subjects: matchedSubjects,
      notes: matchedNotes,
      questionPapers: matchedQPs,
      importantQuestions: matchedQuestions,
      opportunities: matchedOpportunities,
      companies: matchedCompanies,
      totalCount,
    };
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={closeSearch}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111B2E] border border-[#26344D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#26344D] bg-[#0B1220]">
          <Search className="w-5 h-5 text-[#B7F34A] mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, notes, question papers, internships..."
            autoFocus
            className="w-full bg-transparent text-sm text-[#F5F7FA] placeholder:text-[#94A3B8] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] text-[#94A3B8] bg-[#111B2E] px-2 py-0.5 rounded border border-[#26344D]">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                Quick Recommendations
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['CS3591 Computer Networks', 'CS3501 Compiler Design', 'CB3491 Cryptography', 'CCS335 Cloud Computing', 'Dijkstra Routing', 'LR Parsing'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1.5 rounded-xl bg-[#0B1220] hover:bg-[#1a2942] text-xs text-[#F5F7FA] border border-[#26344D] transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results && results.totalCount === 0 ? (
            <div className="py-12 text-center text-[#94A3B8]">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-500 mb-2" />
              <p className="text-sm font-medium text-[#F5F7FA]">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Try searching by subject code (e.g., CS3591), topic name, or company.
              </p>
            </div>
          ) : (
            results && (
              <>
                {/* Subjects */}
                {results.subjects.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#B7F34A] mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Subjects
                    </h5>
                    <div className="space-y-1.5">
                      {results.subjects.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/academics/${sub.departmentId}/${sub.regulation}/semester-${sub.semester}/${sub.code.toLowerCase()}`}
                          onClick={closeSearch}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1a2942] border border-[#26344D] text-[#F5F7FA] transition-colors group"
                        >
                          <div>
                            <span className="font-mono text-xs font-bold text-[#B7F34A] mr-2">
                              {sub.code}
                            </span>
                            <span className="text-xs font-medium text-[#F5F7FA]">{sub.name}</span>
                            <span className="text-[11px] text-[#94A3B8] ml-2">
                              (Sem {sub.semester} • {sub.credits} Credits)
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#B7F34A] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {results.notes.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#B7F34A] mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Notes Library
                    </h5>
                    <div className="space-y-1.5">
                      {results.notes.map((res) => (
                        <div
                          key={res.id}
                          onClick={() => {
                            closeSearch();
                            openPdfViewer(res);
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1a2942] border border-[#26344D] text-[#F5F7FA] transition-colors cursor-pointer group"
                        >
                          <div className="truncate mr-3">
                            <p className="text-xs font-medium text-[#F5F7FA] truncate">{res.title}</p>
                            <p className="text-[11px] text-[#94A3B8]">
                              {res.subjectCode} • {res.fileSize} • {res.downloadsCount} downloads
                            </p>
                          </div>
                          <span className="text-[11px] text-[#B7F34A] group-hover:underline whitespace-nowrap">
                            View PDF →
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question Papers */}
                {results.questionPapers.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#B7F34A] mb-2 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" /> Question Papers
                    </h5>
                    <div className="space-y-1.5">
                      {results.questionPapers.map((qp) => (
                        <div
                          key={qp.id}
                          onClick={() => {
                            closeSearch();
                            openPdfViewer(qp);
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1a2942] border border-[#26344D] text-[#F5F7FA] transition-colors cursor-pointer group"
                        >
                          <div className="truncate mr-3">
                            <p className="text-xs font-medium text-[#F5F7FA] truncate">{qp.title}</p>
                            <p className="text-[11px] text-[#94A3B8]">Regulation {qp.regulation} • {qp.fileSize}</p>
                          </div>
                          <span className="text-[11px] text-[#B7F34A] group-hover:underline whitespace-nowrap">
                            Open QP →
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internships & Jobs */}
                {results.opportunities.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#B7F34A] mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Opportunities
                    </h5>
                    <div className="space-y-1.5">
                      {results.opportunities.map((opp) => (
                        <Link
                          key={opp.id}
                          href={`/internships?id=${opp.id}`}
                          onClick={closeSearch}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1a2942] border border-[#26344D] text-[#F5F7FA] transition-colors group"
                        >
                          <div>
                            <p className="text-xs font-medium text-[#F5F7FA]">{opp.title}</p>
                            <p className="text-[11px] text-[#94A3B8]">
                              {opp.companyName} • {opp.stipendOrSalary} • {opp.workMode}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#B7F34A] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0B1220] border-t border-[#26344D] flex items-center justify-between text-[11px] text-[#94A3B8]">
          <span>Search across 400+ resources, question papers, and fresher jobs</span>
          <button
            onClick={() => {
              closeSearch();
              router.push(`/notes?q=${encodeURIComponent(query)}`);
            }}
            className="text-[#5B8CFF] hover:underline font-medium"
          >
            Explore all in Library →
          </button>
        </div>
      </div>
    </div>
  );
}
