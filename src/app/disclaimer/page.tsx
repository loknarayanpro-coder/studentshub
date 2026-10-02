import React from 'react';
import { Card } from '@/components/ui/Card';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">Legal Disclaimer</h1>
      <Card className="p-6 sm:p-8 border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <h2 className="text-base font-bold text-white">Independent Educational Entity</h2>
        <p>
          AU Student Hub (&ldquo;the Website&rdquo;) is an independent student resource and career preparation platform
          designed initially for engineering students in Tamil Nadu. The Website is not officially affiliated with,
          sponsored by, maintained by, or endorsed by Anna University or any affiliated autonomous bodies.
        </p>

        <h2 className="text-base font-bold text-white">Fair Use & Nominative Reference</h2>
        <p>
          Course names, subject codes (e.g. CS3591), regulation numbers (e.g. Regulation 2021, Regulation 2025),
          and syllabus topics are used solely for the nominative purpose of identifying the academic curriculum
          to which user-contributed study materials, past question papers, and discussion notes correspond.
        </p>

        <h2 className="text-base font-bold text-white">Accuracy of Examination Records</h2>
        <p>
          While we strive to ensure that question paper records, historical frequencies, and mark allocations are
          accurate, students must always verify critical exam schedules, hall tickets, and syllabus notifications
          with official circulars published on Anna University&apos;s official portal (annauniv.edu / coe1.annauniv.edu).
        </p>

        <h2 className="text-base font-bold text-white">Opportunity Postings</h2>
        <p>
          AU Student Hub aggregates internship and job openings directly from company career sites and verified recruiter
          dispatches. We never charge students for job applications and recommend students never pay fees for interviews.
        </p>
      </Card>
    </div>
  );
}
