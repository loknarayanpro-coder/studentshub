'use client';

import React, { useState } from 'react';
import {
  Settings,
  Database,
  Cloud,
  CheckCircle2,
  Sliders,
  DollarSign,
  ShieldCheck,
  Save,
} from 'lucide-react';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function AdminSettingsPage() {
  const [signedUrlTtl, setSignedUrlTtl] = useState(900);
  const [s3Bucket, setS3Bucket] = useState('au-student-hub-documents');
  const [enableAds, setEnableAds] = useState(false);
  const [reg2021Active, setReg2021Active] = useState(true);
  const [reg2025Active, setReg2025Active] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader title="System Architecture Settings" />

      <div className="px-6 space-y-6 max-w-4xl">
        {/* Storage & S3 Configuration */}
        <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">AWS S3 & CloudFront Configuration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target S3 Bucket Name
              </label>
              <Input value={s3Bucket} onChange={(e) => setS3Bucket(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Signed URL Expiration (Seconds)
              </label>
              <Input
                type="number"
                value={signedUrlTtl}
                onChange={(e) => setSignedUrlTtl(Number(e.target.value))}
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Default: 900 seconds (15 minutes). Prevents link sharing.
              </span>
            </div>
          </div>
        </Card>

        {/* Database & RLS Status */}
        <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Supabase PostgreSQL & RLS Status</h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-white">Row Level Security (RLS) Policies</p>
              <p className="text-slate-400">14 PostgreSQL tables secured against unauthorized mutation</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </Card>

        {/* Active Regulations */}
        <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Curriculum Regulation Visibility</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-white">Regulation 2021 (CBCS)</p>
                <p className="text-[11px] text-slate-400">
                  Batches 2021-2025, 2022-2026, 2023-2027, 2024-2028
                </p>
              </div>
              <input
                type="checkbox"
                checked={reg2021Active}
                onChange={(e) => setReg2021Active(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-white">Regulation 2025 (Next-Gen AI Integrated)</p>
                <p className="text-[11px] text-slate-400">New syllabus for current 1st year batches</p>
              </div>
              <input
                type="checkbox"
                checked={reg2025Active}
                onChange={(e) => setReg2025Active(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0"
              />
            </label>
          </div>
        </Card>

        {/* Google AdSense Configuration */}
        <Card className="p-6 border-slate-800 bg-[#0d1424] space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Google AdSense Integration Mode</h3>
          </div>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-white">Enable Non-Intrusive Sponsored Slots</p>
              <p className="text-[11px] text-slate-400">
                When disabled, clean placeholder slots are rendered without tracking scripts.
              </p>
            </div>
            <input
              type="checkbox"
              checked={enableAds}
              onChange={(e) => setEnableAds(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-0"
            />
          </label>
        </Card>

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Saved Successfully!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1.5" /> Save Configuration
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
