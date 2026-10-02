'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { dataService } from '@/services/dataService';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export function ReportModal() {
  const { reportTarget, closeReportModal } = useApp();
  const [reportType, setReportType] = useState<
    'broken_link' | 'wrong_file' | 'incorrect_information' | 'copyright_concern' | 'expired_opportunity' | 'spam'
  >('broken_link');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!reportTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      dataService.addReport({
        resourceTitle: reportTarget.title,
        resourceId: reportTarget.id,
        opportunityTitle: reportTarget.type === 'opportunity' ? reportTarget.title : undefined,
        reportType,
        description,
        reporterEmail: email || undefined,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeReportModal();
        setDescription('');
      }, 1500);
    }, 600);
  };

  return (
    <Modal
      isOpen={!!reportTarget}
      onClose={closeReportModal}
      title="Report an Issue"
      description={`Submitting feedback for: "${reportTarget.title}"`}
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h4 className="text-base font-semibold text-white">Report Received</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Thank you for helping keep AU Student Hub accurate. Our moderators will review this item shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Issue Category
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="broken_link">Broken / Corrupted Download Link</option>
              <option value="wrong_file">Wrong File / Incorrect Subject Unit</option>
              <option value="incorrect_information">Inaccurate / Outdated Information</option>
              <option value="expired_opportunity">Expired Job / Closed Form</option>
              <option value="copyright_concern">Copyright or DMCA Takedown Concern</option>
              <option value="spam">Spam or Irrelevant Content</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please explain the specific issue found in this resource or posting..."
              required
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Your Email (Optional, for resolution updates)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@annauniv.edu"
              className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={closeReportModal}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              type="submit"
              isLoading={isSubmitting}
              disabled={!description.trim()}
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              Submit Report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
