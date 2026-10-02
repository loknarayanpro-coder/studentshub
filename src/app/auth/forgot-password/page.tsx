'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-white">AU Student Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reset Password</h1>
          <p className="text-xs text-slate-400">
            Enter your student email address and we&apos;ll send you a password recovery link.
          </p>
        </div>

        <Card className="p-6 sm:p-8 border-slate-800 shadow-2xl">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Recovery Email Sent</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We have dispatched a secure password reset link to <strong className="text-slate-200">{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <div className="pt-2">
                <Link href="/auth/login">
                  <Button variant="primary" size="sm" className="w-full text-xs">
                    Return to Student Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Student Email
                </label>
                <Input
                  type="email"
                  placeholder="student@annauniv.edu"
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full text-xs font-semibold"
              >
                Send Password Reset Link
              </Button>

              <div className="pt-2 text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Student Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
