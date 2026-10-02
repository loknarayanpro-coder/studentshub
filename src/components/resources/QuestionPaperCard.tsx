'use client';

import React from 'react';
import { FileCheck, Download, Star } from 'lucide-react';
import { AcademicResource } from '@/types';
import { useApp } from '@/lib/context/AppContext';
import { dataService } from '@/services/dataService';
import { Card } from '@/components/ui/Card';

interface QuestionPaperCardProps {
  qp: AcademicResource;
}

export function QuestionPaperCard({ qp }: QuestionPaperCardProps) {
  const { openPdfViewer, toggleBookmark, isBookmarked } = useApp();
  const isSaved = isBookmarked('question_paper', qp.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    dataService.incrementDownload(qp.id);
    const link = document.createElement('a');
    link.href = qp.previewUrl || '/sample-document.pdf';
    link.download = qp.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({
      type: 'question_paper',
      id: qp.id,
      title: qp.title,
      subtitle: `${qp.subjectCode} • Regulation ${qp.regulation}`,
      badge: 'QP',
      link: `/question-papers?id=${qp.id}`,
    });
  };

  return (
    <Card
      hoverable
      onClick={() => openPdfViewer(qp)}
      className="p-4 sm:p-5 flex flex-col justify-between cursor-pointer border-[#26344D] bg-[#111B2E] transition-colors"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-2.5">
            <FileCheck className="w-4 h-4 text-[#94A3B8] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#F5F7FA] hover:text-[#B7F34A] transition-colors line-clamp-1">
                {qp.subjectName}
              </h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">{qp.title}</p>
            </div>
          </div>

          <button
            onClick={handleBookmark}
            className={`p-1 rounded transition-colors ${
              isSaved ? 'text-[#B7F34A]' : 'text-[#94A3B8] hover:text-[#F5F7FA]'
            }`}
            title={isSaved ? 'Bookmarked' : 'Bookmark'}
          >
            <Star className={`w-4 h-4 ${isSaved ? 'fill-[#B7F34A]' : ''}`} />
          </button>
        </div>

        <div className="text-[11px] text-[#94A3B8] font-mono mt-3">
          {qp.subjectCode} • Reg {qp.regulation} • Semester {qp.semester} • {qp.fileSize}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-[#26344D] flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openPdfViewer(qp);
          }}
          className="text-xs font-semibold text-[#B7F34A] hover:underline"
        >
          View Question Paper
        </button>

        <button
          onClick={handleDownload}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#0B1220] transition-colors"
          title="Download PDF"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
}
