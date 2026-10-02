import React from 'react';
import { Card } from '@/components/ui/Card';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms of Use</h1>
      <Card className="p-6 sm:p-8 border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <h3 className="text-sm font-bold text-white">1. Permitted Educational Use</h3>
        <p>
          AU Student Hub provides access to study notes, question papers, and placement resources strictly for
          individual non-commercial academic study and career advancement.
        </p>

        <h3 className="text-sm font-bold text-white">2. User Contributions & Copyright Compliance</h3>
        <p>
          Users submitting materials represent that they possess rights to distribute the content or that the material
          constitutes original student summaries or publicly released past university question papers. Commercial textbook
          piracy is strictly prohibited and subject to immediate takedown.
        </p>

        <h3 className="text-sm font-bold text-white">3. Role-Based Account Integrity</h3>
        <p>
          Students must not attempt unauthorized elevation to moderator or admin accounts. Administrative actions
          are monitored via cryptographic session audit logs.
        </p>
      </Card>
    </div>
  );
}
