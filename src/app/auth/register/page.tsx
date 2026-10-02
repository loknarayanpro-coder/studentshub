'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  ArrowRight,
  Building,
  Calendar,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { DEPARTMENTS, REGULATIONS } from '@/lib/mock-data';

export default function StudentRegisterPage() {
  const router = useRouter();
  const { signUpStudent } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('cse');
  const [semester, setSemester] = useState(5);
  const [regulation, setRegulation] = useState('2021');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await signUpStudent({
        fullName,
        email,
        department,
        semester,
        regulation,
        college: college || 'Anna University Affiliated Engineering College',
      });
      // Redirect to personalized onboarding
      router.push('/auth/onboarding');
    } catch {
      setError('An error occurred during account creation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">AU Student Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Student Account</h1>
          <p className="text-xs text-slate-400">
            Sign up to unlock verified semester resources, exam question banks, and fresher jobs.
          </p>
        </div>

        <Card className="p-6 sm:p-8 border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <Input
                placeholder="Priya Sundaram"
                icon={<User className="w-4 h-4" />}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <Input
                type="email"
                placeholder="priya@student.annauniv.edu"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password <span className="text-rose-400">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-3">
                Academic Specialization (Optional)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Regulation</label>
                  <select
                    value={regulation}
                    onChange={(e) => setRegulation(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    {REGULATIONS.map((reg) => (
                      <option key={reg.id} value={reg.id}>
                        Regulation {reg.year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">College Name</label>
              <Input
                placeholder="College of Engineering Guindy / Affiliated Institute"
                icon={<Building className="w-4 h-4" />}
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full text-sm font-semibold mt-2"
            >
              Continue to Personalization
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold">
              Sign in instead
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
