'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Contact & Takedown Desk</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Have feedback, need to report a copyright concern, or want to contribute study notes? Reach out to our
          academic moderation team.
        </p>
      </div>

      <Card className="p-6 sm:p-8 border-slate-800 shadow-2xl">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Dispatched</h3>
            <p className="text-xs text-slate-400">
              Our moderation team reviews messages within 24-48 business hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <Input placeholder="Sundar Raman" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <Input type="email" placeholder="student@annauniv.edu" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Inquiry Type
              </label>
              <select className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-200">
                <option value="general">General Feedback / Suggestion</option>
                <option value="dmca">Copyright / DMCA Takedown Request</option>
                <option value="contribute">Faculty Note Contribution</option>
                <option value="recruiter">Recruiter / Job Posting Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Message Details
              </label>
              <textarea
                rows={4}
                required
                placeholder="Please describe your query or specific URLs involved..."
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 p-3.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full text-xs font-semibold">
              Send Message to AU Student Hub
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
