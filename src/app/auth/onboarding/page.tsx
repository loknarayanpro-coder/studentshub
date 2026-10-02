'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FileCheck,
  HelpCircle,
  Briefcase,
  Code,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { DEPARTMENTS, REGULATIONS } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const INTERESTS_LIST = [
  { id: 'Notes', label: 'Notes', icon: BookOpen, desc: 'Verified unit-wise lecture notes' },
  { id: 'Question Papers', label: 'Question Papers', icon: FileCheck, desc: 'Previous university semester exams' },
  { id: 'Important Questions', label: 'Important Questions', icon: HelpCircle, desc: 'High frequency repeated questions' },
  { id: 'Internships', label: 'Internships', icon: Briefcase, desc: 'Stipend verified student internships' },
  { id: 'Jobs', label: 'Jobs', icon: Briefcase, desc: 'Fresher engineering opportunities' },
  { id: 'Placement Preparation', label: 'Placement Preparation', icon: Award, desc: 'Company selection rounds & guides' },
  { id: 'Coding', label: 'Coding', icon: Code, desc: 'DSA, Java, Python & C++ practice' },
  { id: 'Aptitude', label: 'Aptitude', icon: Sparkles, desc: 'Quantitative, logical & verbal mock tests' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState(user?.department || 'cse');
  const [selectedSemester, setSelectedSemester] = useState(user?.semester || 5);
  const [selectedRegulation, setSelectedRegulation] = useState(user?.regulation || '2021');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Notes',
    'Question Papers',
    'Internships',
    'Placement Preparation',
  ]);
  const [isFinishing, setIsFinishing] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    updateProfile({
      department: selectedDept,
      semester: selectedSemester,
      regulation: selectedRegulation,
      interests: selectedInterests,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Top Progress Indicator */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step {step} of 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Let&apos;s personalize your Student Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Tailor your dashboard to your exact department, semester, and career goals.
          </p>
        </div>

        {/* Stepper Dots */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'w-10 bg-blue-500' : s < step ? 'w-4 bg-emerald-500' : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>

        <Card className="p-6 sm:p-8 border-slate-800 shadow-2xl">
          {/* STEP 1: Department */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-white">Step 1: Choose your Engineering Department</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select your major to load the precise syllabus and subject units.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEPARTMENTS.map((dept) => {
                  const isSelected = selectedDept === dept.id;
                  return (
                    <div
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-blue-400">{dept.code}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      </div>
                      <p className="text-sm font-semibold text-white mt-1">{dept.name}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <Button variant="primary" size="md" onClick={() => setStep(2)}>
                  Next: Choose Semester
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Semester */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-white">Step 2: Choose your Current Semester</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  We&apos;ll automatically feature your ongoing courses on your home dashboard.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
                  const isSelected = selectedSemester === sem;
                  return (
                    <div
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`p-5 rounded-2xl border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl font-extrabold block">{sem}</span>
                      <span className="text-xs font-medium text-slate-400">Semester</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="md" onClick={() => setStep(3)}>
                  Next: Choose Regulation
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Regulation */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-white">Step 3: Select your Anna University Regulation</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Grading scales and question paper patterns differ across curriculum regulations.
                </p>
              </div>

              <div className="space-y-3">
                {REGULATIONS.map((reg) => {
                  const isSelected = selectedRegulation === reg.id;
                  return (
                    <div
                      key={reg.id}
                      onClick={() => setSelectedRegulation(reg.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{reg.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{reg.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" size="md" onClick={() => setStep(4)}>
                  Next: Choose Interests
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Interests */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-white">Step 4: What are your primary interests?</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select what matters most to configure your dashboard widgets and notifications.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERESTS_LIST.map((item) => {
                  const isSelected = selectedInterests.includes(item.id);
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg border mt-0.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white">{item.label}</p>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isFinishing}
                  onClick={handleFinish}
                  className="bg-emerald-600 hover:bg-emerald-500 border-emerald-500/30"
                >
                  Generate My Student Hub
                  <Sparkles className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
