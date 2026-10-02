'use client';

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Eye,
  AlertCircle,
  User,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { dataService } from '@/services/dataService';
import { useApp } from '@/lib/context/AppContext';
import { StudentSubmission } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils';

export default function AdminSubmissionsPage() {
  const { openPdfViewer } = useApp();
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(dataService.getSubmissions());
  const [rejectingItem, setRejectingItem] = useState<StudentSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (id: string) => {
    dataService.updateSubmissionStatus(id, 'approved');
    setSubmissions(dataService.getSubmissions());
  };

  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    dataService.updateSubmissionStatus(rejectingItem.id, 'rejected', rejectionReason);
    setSubmissions(dataService.getSubmissions());
    setRejectingItem(null);
    setRejectionReason('');
  };

  const handleRequestChanges = (id: string) => {
    dataService.updateSubmissionStatus(
      id,
      'changes_requested',
      'Please attach a higher resolution scan of Unit 4 flowcharts.'
    );
    setSubmissions(dataService.getSubmissions());
  };

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="Student Contributions Moderation Queue" />

      <div className="px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Review Pending Student Submissions</h2>
            <p className="text-xs text-slate-400">
              Approved materials are instantly indexed into public subject libraries under Regulation 2021.
            </p>
          </div>
          <Badge variant="warning" className="text-xs">
            {pendingCount} Pending Review
          </Badge>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <Card key={sub.id} className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs font-bold text-blue-400">
                      {sub.subjectCode}
                    </span>
                    <Badge variant="purple" className="text-[10px] uppercase">
                      {sub.resourceType}
                    </Badge>
                    <Badge
                      variant={
                        sub.status === 'approved'
                          ? 'success'
                          : sub.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                      }
                      className="text-[10px] uppercase font-bold"
                    >
                      {sub.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-white">{sub.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {sub.description || 'No detailed student description provided.'}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      {sub.studentName} ({sub.studentEmail})
                    </span>
                    <span>•</span>
                    <span>{sub.fileName} ({sub.fileSize})</span>
                    <span>•</span>
                    <span>Submitted on {formatDate(sub.submittedAt)}</span>
                  </div>

                  {sub.reviewerNotes && (
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-300 mt-2">
                      <strong>Moderator Feedback:</strong> {sub.reviewerNotes}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openPdfViewer({
                        id: sub.id,
                        title: sub.title,
                        description: sub.description || '',
                        subjectId: sub.subjectCode,
                        subjectCode: sub.subjectCode,
                        subjectName: sub.subjectCode,
                        departmentId: sub.department.toLowerCase(),
                        semester: sub.semester,
                        regulation: '2021',
                        resourceType: sub.resourceType,
                        s3Key: `submissions/${sub.fileName}`,
                        fileName: sub.fileName,
                        fileSize: sub.fileSize,
                        fileType: 'application/pdf',
                        isVerified: false,
                        isOfficial: false,
                        status: 'pending',
                        downloadsCount: 0,
                        viewsCount: 0,
                        uploadedAt: '2026-10-02',
                        uploaderName: sub.studentName,
                        previewUrl: '/sample-document.pdf',
                      })
                    }
                    className="text-xs"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview File
                  </Button>

                  {sub.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(sub.id)}
                        className="text-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve & Publish
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRejectingItem(sub)}
                        className="text-xs"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleRequestChanges(sub.id)}
                        className="text-xs"
                      >
                        Request Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reject Modal */}
      <Modal
        isOpen={!!rejectingItem}
        onClose={() => setRejectingItem(null)}
        title="Reject Resource Submission"
        description={`Provide feedback to ${rejectingItem?.studentName} regarding rejection reason.`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Rejection Reason
            </label>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Scanned document is blurry, watermarked, or copyrighted content from third-party publisher..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setRejectingItem(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
