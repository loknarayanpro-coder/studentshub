'use client';

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Search,
  UploadCloud,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { dataService } from '@/services/dataService';
import { DEPARTMENTS, REGULATIONS, SUBJECTS } from '@/lib/mock-data';
import { AcademicResource, ResourceType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<AcademicResource[]>(dataService.getAllResources());
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Resource Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('cse');
  const [regulation, setRegulation] = useState('2021');
  const [semester, setSemester] = useState(5);
  const [subjectCode, setSubjectCode] = useState('CS3591');
  const [unitNumber, setUnitNumber] = useState<number>(1);
  const [resourceType, setResourceType] = useState<ResourceType>('notes');
  const [description, setDescription] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [isOfficial, setIsOfficial] = useState(true);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subjectCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this resource from the vault?')) {
      dataService.deleteResource(id);
      setResources(dataService.getAllResources());
    }
  };

  const handleToggleStatus = (res: AcademicResource) => {
    const updatedStatus = res.status === 'published' ? 'archived' : 'published';
    const updated = { ...res, status: updatedStatus as any };
    dataService.saveResource(updated);
    setResources(dataService.getAllResources());
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((p) => (p >= 90 ? 95 : p + 25));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      const newRes: AcademicResource = {
        id: `res-${Date.now()}`,
        title,
        description,
        subjectId: subjectCode,
        subjectCode,
        subjectName: subjectCode,
        departmentId: department,
        semester,
        regulation,
        unitNumber,
        resourceType,
        s3Key: `resources/${resourceType}/${department}/${fileName || 'resource.pdf'}`,
        fileName: fileName || `${subjectCode}_Unit${unitNumber}_Resource.pdf`,
        fileSize: '4.5 MB',
        fileType: 'application/pdf',
        isVerified,
        isOfficial,
        status: 'published',
        downloadsCount: 0,
        viewsCount: 0,
        uploadedAt: new Date().toISOString().split('T')[0],
        uploaderName: 'Dr. K. Arumugam (Admin)',
        previewUrl: '/sample-document.pdf',
      };

      dataService.saveResource(newRes);
      setResources(dataService.getAllResources());
      setIsUploading(false);
      setIsAddModalOpen(false);
      setTitle('');
      setDescription('');
    }, 1200);
  };

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="Academic Resource Management" />

      <div className="px-6 space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Filter resources by title or subject code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1424] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 border-amber-500/30 text-slate-950 font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Upload New Resource to S3
          </Button>
        </div>

        {/* Resource Table */}
        <Card className="border-slate-800 bg-[#0d1424] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Title & Unit</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Stats</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-blue-400">{res.subjectCode}</span>
                      <span className="block text-[10px] text-slate-500 uppercase">
                        {res.departmentId} • Sem {res.semester}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate">
                      <p className="font-semibold text-white truncate">{res.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {res.unitNumber ? `Unit ${res.unitNumber} • ` : ''}
                        {res.fileSize}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="purple" className="text-[10px] capitalize">
                        {res.resourceType.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={res.status === 'published' ? 'success' : 'warning'}
                        className="text-[10px]"
                      >
                        {res.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {res.downloadsCount} dl / {res.viewsCount} vw
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(res)}
                        className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                      >
                        {res.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add Resource Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Upload Academic Resource to AWS S3"
        description="Creates database record in Supabase and provisions presigned S3 document link."
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateResource} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Resource Title <span className="text-rose-400">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Complete Unit 1 to 5 Comprehensive Lecture Notes"
              required
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Regulation</label>
              <select
                value={regulation}
                onChange={(e) => setRegulation(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                {REGULATIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Sem {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Unit</label>
              <select
                value={unitNumber}
                onChange={(e) => setUnitNumber(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                {[1, 2, 3, 4, 5].map((u) => (
                  <option key={u} value={u}>
                    Unit {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Subject Code</label>
              <Input
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="CS3591"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Resource Type</label>
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as any)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-2.5 py-2 text-xs text-white"
              >
                <option value="notes">Lecture Notes</option>
                <option value="question_paper">Question Paper</option>
                <option value="important_questions">Important Question</option>
                <option value="lab">Lab Manual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select PDF File (S3 Target)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files?.[0]) setFileName(e.target.files[0].name);
              }}
              className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white"
            />
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Direct S3 Presigned Upload...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isUploading}
              disabled={!title.trim()}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
            >
              Upload & Publish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
