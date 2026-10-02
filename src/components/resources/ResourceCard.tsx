'use client';

import React from 'react';
import { FileText, Download, Star, Eye } from 'lucide-react';
import { AcademicResource } from '@/types';
import { useApp } from '@/lib/context/AppContext';
import { dataService } from '@/services/dataService';
import { Card } from '@/components/ui/Card';

interface ResourceCardProps {
  resource: AcademicResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { openPdfViewer, toggleBookmark, isBookmarked } = useApp();
  const isSaved = isBookmarked('resource', resource.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    dataService.incrementDownload(resource.id);
    const link = document.createElement('a');
    link.href = resource.previewUrl || '/sample-document.pdf';
    link.download = resource.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({
      type: 'resource',
      id: resource.id,
      title: resource.title,
      subtitle: `${resource.subjectCode} • ${resource.fileSize}`,
      badge: resource.resourceType,
      link: `/notes?id=${resource.id}`,
    });
  };

  return (
    <Card
      hoverable
      onClick={() => openPdfViewer(resource)}
      className="p-4 sm:p-5 flex flex-col justify-between cursor-pointer border-[#26344D] bg-[#111B2E] transition-colors"
    >
      <div>
        {/* Header with small icon and subject code */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-[#94A3B8] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#F5F7FA] hover:text-[#B7F34A] transition-colors line-clamp-1">
                {resource.subjectName}
              </h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                {resource.unitNumber ? `Unit ${resource.unitNumber} Notes` : resource.title}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleBookmark}
            className={`p-1 rounded transition-colors ${
              isSaved
                ? 'text-[#B7F34A]'
                : 'text-[#94A3B8] hover:text-[#F5F7FA]'
            }`}
            title={isSaved ? 'Bookmarked' : 'Bookmark'}
          >
            <Star className={`w-4 h-4 ${isSaved ? 'fill-[#B7F34A]' : ''}`} />
          </button>
        </div>

        {/* Minimal metadata: Dept • Semester • PDF format */}
        <div className="text-[11px] text-[#94A3B8] font-mono mt-3">
          {resource.subjectCode} • Semester {resource.semester} • PDF • {resource.fileSize}
        </div>
      </div>

      {/* Footer: Lime for important action */}
      <div className="pt-3 mt-3 border-t border-[#26344D] flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openPdfViewer(resource);
          }}
          className="text-xs font-semibold text-[#B7F34A] hover:underline flex items-center gap-1"
        >
          <span>View Document</span>
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
