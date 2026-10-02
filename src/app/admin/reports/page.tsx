'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Eye,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { dataService } from '@/services/dataService';
import { IssueReport } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<IssueReport[]>(dataService.getReports());

  const handleUpdateStatus = (
    id: string,
    status: 'open' | 'investigating' | 'resolved' | 'rejected'
  ) => {
    dataService.updateReportStatus(id, status);
    setReports(dataService.getReports());
  };

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="Community Issue Reports" />

      <div className="px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Community Quality Control</h2>
            <p className="text-xs text-slate-400">
              Student-flagged broken download links, outdated PDFs, and copyright takedown inquiries.
            </p>
          </div>
          <Badge variant="danger" className="text-xs">
            {reports.filter((r) => r.status === 'open').length} Open Reports
          </Badge>
        </div>

        <div className="space-y-4">
          {reports.map((rep) => (
            <Card key={rep.id} className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="danger" className="text-[10px] uppercase font-bold">
                      {rep.reportType.replace('_', ' ')}
                    </Badge>
                    <Badge
                      variant={
                        rep.status === 'resolved'
                          ? 'success'
                          : rep.status === 'investigating'
                          ? 'warning'
                          : 'outline'
                      }
                      className="text-[10px] uppercase font-bold"
                    >
                      {rep.status}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-white">{rep.resourceTitle}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800 max-w-2xl">
                    &ldquo;{rep.description}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                    <span>Reported by: {rep.reporterEmail || 'Anonymous Student'}</span>
                    <span>•</span>
                    <span>Filed on: {formatDate(rep.createdAt)}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  {rep.status !== 'resolved' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateStatus(rep.id, 'resolved')}
                      className="text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Resolved
                    </Button>
                  )}

                  {rep.status !== 'investigating' && rep.status !== 'resolved' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleUpdateStatus(rep.id, 'investigating')}
                      className="text-xs"
                    >
                      <Clock className="w-3.5 h-3.5 mr-1" /> Investigating
                    </Button>
                  )}

                  {rep.status !== 'rejected' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdateStatus(rep.id, 'rejected')}
                      className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    >
                      Dismiss Report
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
