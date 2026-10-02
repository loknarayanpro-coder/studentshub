import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Heart, Users, Target, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 text-center sm:text-left">
        <Badge variant="purple" className="text-xs">
          About Our Mission
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About AU Student Hub
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          AU Student Hub was born out of a shared frustration among Anna University engineering students:
          broken download links, disorganized WhatsApp groups, and scam internship portals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-800 text-center space-y-2">
          <BookOpen className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Curated Syllabus</h3>
          <p className="text-xs text-slate-400">Strictly mapped to Anna University Regulations 2021 & 2025.</p>
        </Card>

        <Card className="p-5 border-slate-800 text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Verified Content</h3>
          <p className="text-xs text-slate-400">Every resource reviewed by peer moderators before publication.</p>
        </Card>

        <Card className="p-5 border-slate-800 text-center space-y-2">
          <Users className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Zero Clutter</h3>
          <p className="text-xs text-slate-400">High-speed S3 document delivery without obstructive spam ads.</p>
        </Card>
      </div>

      <Card className="p-6 sm:p-8 border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Non-Affiliation Institutional Disclosure</h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            <strong>AU Student Hub</strong> is an independent academic resource ecosystem maintained by
            engineering alumni and peer student contributors.
          </p>
          <p>
            This platform is <strong>not officially affiliated with, sponsored by, or endorsed by Anna University</strong>{' '}
            unless expressly stated. All course codes (e.g. CS3591), regulation titles, and syllabus outlines are
            referenced purely for nominative academic organizational convenience under fair use educational principles.
          </p>
        </div>
      </Card>
    </div>
  );
}
