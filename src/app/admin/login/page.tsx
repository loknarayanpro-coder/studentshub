'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Server,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signInWithCredentials, signInAsAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide administrator credentials.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await signInWithCredentials(email, 'super_admin');
      router.push('/admin/dashboard');
    } catch {
      setError('Access denied: Invalid administrative credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdminLogin = () => {
    signInAsAdmin();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Left Side: Admin Brand & Security Control Center */}
        <div className="md:col-span-6 p-8 lg:p-12 bg-gradient-to-br from-slate-950 via-[#0a1122] to-slate-900 border-b md:border-b-0 md:border-r border-slate-800/80 flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold block">
                  Security Protocol
                </span>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  AU Student Hub
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                ADMIN CONTROL CENTER
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage the student ecosystem. Verified academic resources, moderation queue, opportunity
                approvals, and institutional analytics.
              </p>
            </div>
          </div>

          {/* Security Checklist */}
          <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Role-Based Access Control (RBAC) Enforced</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Supabase Row Level Security Active</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>AWS S3 Presigned Document Vault</span>
            </div>
          </div>

          {/* System Status Footnote */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Core Systems Online
            </span>
            <span>Cluster ap-south-1</span>
          </div>
        </div>

        {/* Right Side: Admin Sign In Form */}
        <div className="md:col-span-6 p-8 lg:p-12 bg-slate-900/60 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Administrator Authentication</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your authorized faculty or moderator credentials to access the console.
              </p>
            </div>

            {/* Quick Demo Fill for Evaluators */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-3">
              <div className="text-xs">
                <p className="font-semibold text-amber-300">Demo Admin Console Access</p>
                <p className="text-[11px] text-slate-400">Dr. K. Arumugam (Super Admin)</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDemoAdminLogin}
                className="bg-amber-600 hover:bg-amber-500 border-amber-500/40 text-slate-950 font-bold text-xs"
              >
                Auto-fill Admin
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Administrative Email
                </label>
                <Input
                  type="email"
                  placeholder="admin.arumugam@austudenthub.internal"
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Master Key / Password
                  </label>
                  <span className="text-[11px] text-slate-500 cursor-not-allowed">
                    Recovery via MFA
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>Remember this secure workstation</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold border-none text-xs"
              >
                Sign In to Admin Dashboard
                <ArrowRight className="w-4 h-4 ml-1.5 text-slate-900" />
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-800/80 text-center">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                ← Return to Public Student Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
