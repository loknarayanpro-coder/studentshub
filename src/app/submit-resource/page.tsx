'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { dataService } from '@/services/dataService';
import { DEPARTMENTS, SUBJECTS } from '@/lib/mock-data';
import { ResourceType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function SubmitResourcePage() {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [semester, setSemester] = useState(5);
  const [subjectCode, setSubjectCode] = useState('CS3591');
  const [resourceType, setResourceType] = useState<ResourceType>('notes');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subjectCode) return;

    setIsSubmitting(true);
    setUploadProgress(20);

    // Simulate S3 presigned upload progression
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      dataService.addSubmission({
        studentId: user?.id || 'usr-student-priya',
        studentName: user?.fullName || 'Priya Sundaram',
        studentEmail: user?.email || 'student@annauniv.edu',
        title,
        department,
        semester,
        subjectCode,
        resourceType,
        description,
        fileName: fileName || `${subjectCode}_Student_Upload.pdf`,
        fileSize: fileSize || '3.5 MB',
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Peer Peer Knowledge Sharing
          </span>
          <Badge variant="purple" className="text-[10px]">
            Quality Moderated
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contribute Academic Resource
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Share high quality lecture notes, handwritten problem solutions, or question papers.
          Submissions are reviewed by our moderator panel before appearing on public subject pages.
        </p>
      </div>

      {/* Moderation Workflow Visualizer */}
      <Card className="p-6 border-[#26344D] bg-[#111B2E]">
        <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-4 text-center sm:text-left">
          Editorial Review Workflow
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-[#B7F34A]/10 border border-[#B7F34A]/30">
            <span className="text-xs font-bold text-[#B7F34A] block">1. Student Upload</span>
            <span className="text-[11px] text-[#94A3B8]">PDF securely vaulted in document storage</span>
          </div>
          <div className="p-3 rounded-xl bg-[#B7F34A]/5 border border-[#26344D]">
            <span className="text-xs font-bold text-[#F5F7FA] block">2. Status: PENDING</span>
            <span className="text-[11px] text-[#94A3B8]">Queued for faculty review</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0B1220] border border-[#26344D]">
            <span className="text-xs font-bold text-[#F5F7FA] block">3. Moderator Review</span>
            <span className="text-[11px] text-[#94A3B8]">Checked against official syllabus</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-xs font-bold text-emerald-400 block">4. Published Live</span>
            <span className="text-[11px] text-[#94A3B8]">Credited to your student profile</span>
          </div>
        </div>
      </Card>

      {/* Form or Success State */}
      <Card className="p-6 sm:p-8 border-slate-800 shadow-2xl">
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Submission Successfully Received!</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Your resource <strong className="text-slate-200">&ldquo;{title}&rdquo;</strong> has been placed
              into the moderator review queue. You will receive a notification once verified.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSuccess(false);
                  setTitle('');
                  setDescription('');
                  setFileName('');
                  setUploadProgress(0);
                }}
              >
                Submit Another Resource
              </Button>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Resource Title <span className="text-rose-400">*</span>
              </label>
              <Input
                placeholder="e.g. Unit 4: Transport Layer TCP Tahoe vs Reno Hand-drawn Flowcharts"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.code}>
                      {d.code} - {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Resource Type
                </label>
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value as any)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="notes">Lecture Notes</option>
                  <option value="question_paper">Question Paper</option>
                  <option value="important_questions">Important Question Solution</option>
                  <option value="lab">Lab Manual / Program Code</option>
                  <option value="question_bank">Question Bank</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Subject Code & Name <span className="text-rose-400">*</span>
              </label>
              <Input
                placeholder="e.g. CS3591 Computer Networks"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Description & Content Summary
              </label>
              <textarea
                rows={3}
                placeholder="Outline what units or topics this document covers, if it is handwritten or typed, and key formulas included..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Document Upload Dropzone */}
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] uppercase tracking-wider mb-1.5">
                PDF Document File (Max 25 MB)
              </label>
              <div className="border-2 border-dashed border-[#26344D] hover:border-[#B7F34A]/60 rounded-2xl p-6 text-center bg-[#0B1220] transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-10 h-10 text-[#B7F34A] mx-auto mb-2" />
                {fileName ? (
                  <div>
                    <p className="text-xs font-bold text-[#F5F7FA]">{fileName}</p>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">{fileSize} • PDF format ready</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-[#F5F7FA]">
                      Click or drag and drop your PDF here
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">
                      Clear scans and typed PDFs preferred
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Progress Bar if submitting */}
            {isSubmitting && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#94A3B8]">
                  <span>Uploading to Secure Document Vault...</span>
                  <span className="font-mono text-[#B7F34A] font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden border border-[#26344D]">
                  <div
                    className="bg-[#B7F34A] h-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={!title.trim()}
              className="w-full text-sm font-semibold"
            >
              Submit Resource for Review
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
