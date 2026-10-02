import React from 'react';
import { Card } from '@/components/ui/Card';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
      <Card className="p-6 sm:p-8 border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          At AU Student Hub, we prioritize student privacy and transparent data usage. This policy details how we
          handle profile information and platform telemetry.
        </p>

        <h3 className="text-sm font-bold text-white">1. Information We Collect</h3>
        <p>
          When you register an account, we collect your name, email address, engineering department, current semester,
          regulation, and graduation year to personalize your course dashboard.
        </p>

        <h3 className="text-sm font-bold text-white">2. Document Storage & S3 Vault</h3>
        <p>
          Files uploaded to our document vault are hosted on Amazon Web Services (AWS S3) using temporary pre-signed
          URLs. Download requests are logged anonymously to display aggregate popularity counts.
        </p>

        <h3 className="text-sm font-bold text-white">3. Third-Party Links & Advertising</h3>
        <p>
          We may partner with Google AdSense to serve non-intrusive contextual banner advertisements. We do not sell
          personal student emails or contact records to commercial lead aggregators.
        </p>
      </Card>
    </div>
  );
}
