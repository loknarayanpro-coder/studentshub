'use client';

import React, { useState } from 'react';
import { HelpCircle, Clock, Star, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { ImportantQuestion } from '@/types';
import { useApp } from '@/lib/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface ImportantQuestionCardProps {
  question: ImportantQuestion;
}

export function ImportantQuestionCard({ question }: ImportantQuestionCardProps) {
  const { toggleBookmark, isBookmarked } = useApp();
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const isSaved = isBookmarked('important_question', question.id);

  return (
    <>
      <Card hoverable className="p-4 sm:p-5 flex flex-col justify-between border-[#26344D] bg-[#111B2E]">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#B7F34A]">
                {question.subjectCode}
              </span>
              <span className="text-[11px] text-[#94A3B8] font-mono">
                Unit {question.unitNumber} • {question.marks} Marks
              </span>
            </div>

            <button
              onClick={() =>
                toggleBookmark({
                  type: 'important_question',
                  id: question.id,
                  title: question.questionText,
                  subtitle: `${question.subjectCode} • Unit ${question.unitNumber}`,
                  badge: `${question.marks} Marks`,
                  link: `/important-questions?id=${question.id}`,
                })
              }
              className={`p-1 rounded transition-colors ${
                isSaved ? 'text-[#B7F34A]' : 'text-[#94A3B8] hover:text-[#F5F7FA]'
              }`}
              title={isSaved ? 'Bookmarked' : 'Bookmark'}
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-[#B7F34A]' : ''}`} />
            </button>
          </div>

          <h4 className="text-sm font-semibold text-[#F5F7FA] leading-snug my-2">
            &ldquo;{question.questionText}&rdquo;
          </h4>

          {question.appearanceYears && question.appearanceYears.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-2">
              <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Exam appearances: {question.appearanceYears.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-[#26344D] flex items-center justify-between">
          <span className="text-[11px] text-[#94A3B8]">{question.category}</span>
          <button
            onClick={() => setIsStudyModalOpen(true)}
            className="text-xs font-semibold text-[#B7F34A] hover:underline flex items-center gap-1"
          >
            <span>Answer Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>

      {/* Breakdown Modal */}
      <Modal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        title="Question Analysis"
        description={`${question.subjectCode} • Unit ${question.unitNumber} (${question.marks} Marks)`}
        maxWidth="xl"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#26344D]">
            <p className="text-xs text-[#94A3B8] mb-1">Exam Question:</p>
            <p className="text-sm font-semibold text-[#F5F7FA] leading-relaxed">
              {question.questionText}
            </p>
          </div>

          {question.answerNotes && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-semibold text-[#F5F7FA] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B7F34A]" />
                Recommended Answer Structure:
              </h5>
              <div className="p-3 rounded-xl bg-[#0B1220] border border-[#26344D] text-xs text-[#94A3B8] leading-relaxed">
                {question.answerNotes}
              </div>
            </div>
          )}

          {question.keyPoints && question.keyPoints.length > 0 && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-semibold text-[#F5F7FA]">Key Points to Include:</h5>
              <ul className="space-y-1">
                {question.keyPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#94A3B8] p-2 rounded-lg bg-[#0B1220]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F34A] flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-3 border-t border-[#26344D] flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setIsStudyModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
