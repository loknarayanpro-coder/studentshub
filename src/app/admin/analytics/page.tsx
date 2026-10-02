'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Bookmark,
  ExternalLink,
  Search,
  Users,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: 'Total Page Views', value: '482,900', icon: Eye, change: '+22% past 30 days', color: 'text-blue-400' },
    { label: 'Total Search Queries', value: '118,400', icon: Search, change: 'Top: "CS3591 notes"', color: 'text-purple-400' },
    { label: 'PDF Document Downloads', value: '142,800', icon: Download, change: '8.4 TB S3 Egress', color: 'text-cyan-400' },
    { label: 'Active Saved Bookmarks', value: '34,200', icon: Bookmark, change: '+1,400 this week', color: 'text-amber-400' },
    { label: 'External Apply Clicks', value: '19,650', icon: ExternalLink, change: 'Zoho lead 38%', color: 'text-emerald-400' },
    { label: 'User Signups (Total)', value: '28,450', icon: Users, change: '74% CEG/MIT/Affiliated', color: 'text-indigo-400' },
  ];

  const topSearches = [
    { query: 'CS3591 Computer Networks notes', count: '14,200', category: 'Academics' },
    { query: 'Compiler Design previous QP 2024', count: '11,400', category: 'Exam Archives' },
    { query: 'Zoho Frontend Developer Internship', count: '8,900', category: 'Careers' },
    { query: 'Regulation 2021 CGPA formula', count: '7,400', category: 'Tools' },
    { query: 'Data Structures Unit 2 AVL rotations', count: '6,800', category: 'Academics' },
  ];

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="Platform Traffic & Student Analytics" />

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-400" />
              Highest Volume Search Terms
            </h3>
            <div className="space-y-2.5">
              {topSearches.map((item, idx) => (
                <div
                  key={item.query}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-slate-500 font-bold">{idx + 1}.</span>
                    <span className="text-white font-medium">&ldquo;{item.query}&rdquo;</span>
                  </div>
                  <span className="font-mono text-blue-400 font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              Career Application Click Conversions
            </h3>
            <div className="space-y-3">
              {[
                { company: 'Zoho Corporation', role: 'Frontend Intern', clicks: '4,820', rate: '78%' },
                { company: 'Freshworks', role: 'DevOps Intern', clicks: '3,410', rate: '65%' },
                { company: 'Tata Consultancy Services', role: 'Associate SDE', clicks: '5,890', rate: '88%' },
                { company: 'PayPal India', role: 'SDE Intern', clicks: '2,940', rate: '54%' },
              ].map((opp) => (
                <div key={opp.company} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white">
                      {opp.company} ({opp.role})
                    </span>
                    <span className="font-mono text-emerald-400">{opp.clicks} clicks</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: opp.rate }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
