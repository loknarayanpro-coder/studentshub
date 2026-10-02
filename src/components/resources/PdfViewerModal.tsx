'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Bookmark,
  Share2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Check,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { dataService } from '@/services/dataService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function PdfViewerModal() {
  const { activePdf, closePdfViewer, toggleBookmark, isBookmarked, openReportModal } = useApp();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!activePdf) return null;

  const isSaved = isBookmarked('resource', activePdf.id);

  const handleDownload = () => {
    dataService.incrementDownload(activePdf.id);
    // Create an anchor and download
    const link = document.createElement('a');
    link.href = activePdf.previewUrl || '/sample-document.pdf';
    link.download = activePdf.fileName || `${activePdf.subjectCode}_Document.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + `/notes?id=${activePdf.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0B1220]/90 backdrop-blur-md overflow-hidden animate-in fade-in">
      <div
        className={`relative w-full rounded-2xl bg-[#111B2E] border border-[#26344D] shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullScreen ? 'h-[98vh] max-w-[98vw]' : 'h-[92vh] max-w-5xl'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0B1220] border-b border-[#26344D] z-10">
          <div className="flex items-center gap-3 truncate max-w-lg">
            <div className="p-2 rounded-xl bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#B7F34A]">
                  {activePdf.subjectCode}
                </span>
                {activePdf.isVerified && (
                  <Badge variant="success" className="text-[10px] py-0">
                    <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> Verified
                  </Badge>
                )}
                <span className="text-[11px] text-[#94A3B8]">{activePdf.fileSize}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#F5F7FA] truncate">{activePdf.title}</h3>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-[#111B2E] rounded-xl p-1 border border-[#26344D]">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(60, prev - 15))}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#0B1220]"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-[#F5F7FA]">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((prev) => Math.min(160, prev + 15))}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#0B1220]"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() =>
                toggleBookmark({
                  type: 'resource',
                  id: activePdf.id,
                  title: activePdf.title,
                  subtitle: `${activePdf.subjectCode} • ${activePdf.fileSize}`,
                  badge: activePdf.resourceType,
                  link: `/notes?id=${activePdf.id}`,
                })
              }
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-[#B7F34A]/10 border-[#B7F34A]/30 text-[#B7F34A]'
                  : 'bg-[#111B2E] border-[#26344D] text-[#94A3B8] hover:text-[#F5F7FA]'
              }`}
              title={isSaved ? 'Saved to Bookmarks' : 'Save to Bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#B7F34A]' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#111B2E] border border-[#26344D] text-[#94A3B8] hover:text-[#F5F7FA] transition-colors"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Report */}
            <button
              onClick={() =>
                openReportModal({
                  title: activePdf.title,
                  id: activePdf.id,
                  type: 'resource',
                })
              }
              className="p-2 rounded-xl bg-[#111B2E] border border-[#26344D] text-[#94A3B8] hover:text-rose-400 transition-colors"
              title="Report an Issue"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="hidden sm:inline-flex p-2 rounded-xl bg-[#111B2E] border border-[#26344D] text-[#94A3B8] hover:text-[#F5F7FA] transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Download Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownload}
              className="text-xs font-semibold"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </Button>

            {/* Close Button */}
            <button
              onClick={closePdfViewer}
              className="p-2 rounded-xl bg-[#111B2E] border border-[#26344D] text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-rose-500/20 hover:border-rose-500/40 transition-colors ml-1"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Viewer Canvas */}
        <div className="flex-1 bg-[#0B1220] flex items-center justify-center p-2 sm:p-4 overflow-auto">
          <div
            className="w-full h-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transition-transform duration-150 origin-top"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* Embedded Native Object/Iframe for PDF */}
            <iframe
              src={`${activePdf.previewUrl || '/sample-document.pdf'}#toolbar=1&navpanes=0&view=FitH`}
              title={activePdf.title}
              className="w-full h-full min-h-[500px] border-none"
            />
          </div>
        </div>

        {/* Security and Presigned URL Info Strip */}
        <div className="px-4 py-2 bg-[#0B1220] border-t border-[#26344D] flex items-center justify-between text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7F34A] animate-pulse" />
            Secure AWS S3 Signed Document Session (Expires in 15 mins)
          </span>
          <span className="hidden sm:inline">
            Anna University Regulation {activePdf.regulation} • {activePdf.downloadsCount} total downloads
          </span>
        </div>
      </div>
    </div>
  );
}
