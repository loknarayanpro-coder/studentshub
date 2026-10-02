'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  FileText,
  Download,
  Briefcase,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { dataService } from '@/services/dataService';

export default function AdminDashboardPage() {
  const submissions = dataService.getSubmissions().filter((s) => s.status === 'pending');
  const reports = dataService.getReports().filter((r) => r.status === 'open');

  const metrics = [
    { label: 'Total Students', value: '28,450', change: '+14% this month', icon: Users, color: 'text-blue-400' },
    { label: 'Active Today', value: '4,120', change: '840 concurrent', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Total Resources', value: '412', change: '+18 this week', icon: FileText, color: 'text-purple-400' },
    { label: 'Total Downloads', value: '142,800', change: 'AWS S3 bandwidth', icon: Download, color: 'text-cyan-400' },
    { label: 'Active Internships', value: '28', change: 'All verified', icon: Briefcase, color: 'text-emerald-400' },
    { label: 'Fresher Jobs', value: '45', change: '12 added this week', icon: Briefcase, color: 'text-amber-400' },
    { label: 'Pending Reviews', value: String(submissions.length), change: 'Requires moderation', icon: Clock, color: 'text-amber-400' },
    { label: 'Open Reports', value: String(reports.length), change: 'Community flags', icon: AlertTriangle, color: 'text-rose-400' },
  ];

  const monthlyGrowth = [
    { month: 'May', students: 12400, downloads: 42000 },
    { month: 'Jun', students: 15800, downloads: 61000 },
    { month: 'Jul', students: 19200, downloads: 83000 },
    { month: 'Aug', students: 23100, downloads: 104000 },
    { month: 'Sep', students: 26500, downloads: 128000 },
    { month: 'Oct', students: 28450, downloads: 142800 },
  ];

  const popularSubjects = [
    { code: 'CS3591', name: 'Computer Networks', downloads: '24,200', views: '68,400', progress: 95 },
    { code: 'CS3501', name: 'Compiler Design', downloads: '18,400', views: '49,200', progress: 78 },
    { code: 'CS3301', name: 'Data Structures', downloads: '32,100', views: '84,000', progress: 100 },
    { code: 'CS3491', name: 'Artificial Intelligence & ML', downloads: '16,900', views: '44,100', progress: 68 },
    { code: 'IT3501', name: 'Full Stack Web Dev', downloads: '14,800', views: '38,200', progress: 60 },
  ];

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="Platform Executive Overview" />

      <div className="px-6 space-y-6">
        {/* Top 8 Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className="p-4 border-slate-800 bg-[#0d1424]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {m.label}
                  </span>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <p className="text-2xl font-black text-white mt-1.5">{m.value}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{m.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts & Graphs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Growth Chart (8 cols) */}
          <Card className="lg:col-span-8 p-6 border-slate-800 bg-[#0d1424] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Student Enrollment & Downloads Trajectory</h3>
                <p className="text-xs text-slate-400">Past 6 months cumulative metrics</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Students
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Downloads
                </span>
              </div>
            </div>

            {/* Custom SVG/CSS Bar Distribution */}
            <div className="h-56 flex items-end justify-between gap-4 pt-4 px-2 border-b border-slate-800">
              {monthlyGrowth.map((item) => {
                const maxVal = 150000;
                const studentHeight = (item.students / 35000) * 100;
                const downloadHeight = (item.downloads / maxVal) * 100;

                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      <div
                        className="w-1/2 max-w-[24px] bg-blue-600 rounded-t-lg transition-all duration-300 hover:brightness-125"
                        style={{ height: `${studentHeight}%` }}
                        title={`${item.students.toLocaleString()} students`}
                      />
                      <div
                        className="w-1/2 max-w-[24px] bg-cyan-400/80 rounded-t-lg transition-all duration-300 hover:brightness-125"
                        style={{ height: `${downloadHeight}%` }}
                        title={`${item.downloads.toLocaleString()} downloads`}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Popular Subjects Breakdown (4 cols) */}
          <Card className="lg:col-span-4 p-6 border-slate-800 bg-[#0d1424] space-y-4">
            <h3 className="text-sm font-bold text-white">Most Demanded Subjects</h3>

            <div className="space-y-3">
              {popularSubjects.map((sub) => (
                <div key={sub.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-400 font-bold">{sub.code}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{sub.downloads} dl</span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">{sub.name}</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full"
                      style={{ width: `${sub.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Row: Pending Moderation Submissions & Open Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Moderation Queue Preview */}
          <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Pending Student Contributions</h3>
                <p className="text-xs text-slate-400">Items awaiting editorial approval</p>
              </div>
              <Link href="/admin/submissions">
                <Button variant="outline" size="sm" className="text-xs">
                  Review Queue ({submissions.length}) →
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="truncate">
                    <p className="font-semibold text-white truncate">{sub.title}</p>
                    <p className="text-[11px] text-slate-400">
                      By {sub.studentName} • {sub.subjectCode} ({sub.department})
                    </p>
                  </div>
                  <Link href="/admin/submissions">
                    <Button variant="secondary" size="sm" className="text-xs">
                      Inspect
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Issue Reports Preview */}
          <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Active Community Issue Reports</h3>
                <p className="text-xs text-slate-400">Broken links & flagged files</p>
              </div>
              <Link href="/admin/reports">
                <Button variant="outline" size="sm" className="text-xs">
                  Manage Reports ({reports.length}) →
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="truncate">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Badge variant="danger" className="text-[9px] uppercase">
                        {rep.reportType.replace('_', ' ')}
                      </Badge>
                      <span className="font-semibold text-white truncate">{rep.resourceTitle}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{rep.description}</p>
                  </div>
                  <Link href="/admin/reports">
                    <Button variant="secondary" size="sm" className="text-xs">
                      Resolve
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
