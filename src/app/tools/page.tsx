'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Calendar,
  Clock,
  Percent,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';

// Grade point map for Anna University
const GRADE_POINTS_2021: Record<string, number> = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  RA: 0,
};

const GRADE_POINTS_2025: Record<string, number> = {
  'A++': 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  F: 0,
};

export default function StudentToolsPage() {
  const [activeTab, setActiveTab] = useState('cgpa');

  // Regulation Selection for CGPA
  const [selectedRegulation, setSelectedRegulation] = useState<'2021' | '2025'>('2021');

  // CGPA State (Semester GPAs)
  const [semesters, setSemesters] = useState<{ sem: number; gpa: number; credits: number }[]>([
    { sem: 1, gpa: 8.2, credits: 21 },
    { sem: 2, gpa: 8.4, credits: 22 },
    { sem: 3, gpa: 8.6, credits: 24 },
    { sem: 4, gpa: 8.5, credits: 23 },
  ]);

  // GPA State (Semester 5 CSE Subjects - Regulation 2021)
  const [subjects, setSubjects] = useState<{ id: string; name: string; credits: number; grade: string }[]>([
    { id: '1', name: 'CS3591 Computer Networks', credits: 4, grade: 'O' },
    { id: '2', name: 'CS3501 Compiler Design', credits: 4, grade: 'A+' },
    { id: '3', name: 'CB3491 Cryptography & Cyber Security', credits: 3, grade: 'A+' },
    { id: '4', name: 'CS3551 Distributed Computing', credits: 3, grade: 'A' },
    { id: '5', name: 'CCS335 Cloud Computing (Elective I)', credits: 3, grade: 'A' },
    { id: '6', name: 'CCS356 Object Oriented Analysis & Design (Elective II)', credits: 3, grade: 'A+' },
    { id: '7', name: 'CS3511 Compiler Laboratory', credits: 1.5, grade: 'O' },
    { id: '8', name: 'CS3561 Computer Networks Laboratory', credits: 1.5, grade: 'O' },
  ]);

  // Attendance Calculator State
  const [totalClasses, setTotalClasses] = useState<number>(64);
  const [attendedClasses, setAttendedClasses] = useState<number>(53);

  // Percentage State
  const [inputCgpa, setInputCgpa] = useState<number>(8.42);

  // Pomodoro State
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState<'work' | 'break'>('work');

  // Pomodoro Timer Effect
  useEffect(() => {
    let interval: any;
    if (isPomoRunning) {
      interval = setInterval(() => {
        if (pomoSeconds === 0) {
          if (pomoMinutes === 0) {
            // Mode switch
            if (pomoMode === 'work') {
              setPomoMode('break');
              setPomoMinutes(5);
            } else {
              setPomoMode('work');
              setPomoMinutes(25);
            }
            setIsPomoRunning(false);
          } else {
            setPomoMinutes((prev) => prev - 1);
            setPomoSeconds(59);
          }
        } else {
          setPomoSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoMinutes, pomoSeconds, pomoMode]);

  // Calculate CGPA
  const totalCredits = semesters.reduce((acc, s) => acc + (Number(s.credits) || 0), 0);
  const totalWeightedGpa = semesters.reduce((acc, s) => acc + (Number(s.gpa) || 0) * (Number(s.credits) || 0), 0);
  const calculatedCgpa = totalCredits > 0 ? (totalWeightedGpa / totalCredits).toFixed(2) : '0.00';

  // Calculate GPA
  const gradeScale = selectedRegulation === '2021' ? GRADE_POINTS_2021 : GRADE_POINTS_2025;
  const currentTotalCredits = subjects.reduce((acc, sub) => acc + (Number(sub.credits) || 0), 0);
  const currentWeightedPoints = subjects.reduce((acc, sub) => {
    const pts = gradeScale[sub.grade] ?? 0;
    return acc + pts * (Number(sub.credits) || 0);
  }, 0);
  const calculatedGpa = currentTotalCredits > 0 ? (currentWeightedPoints / currentTotalCredits).toFixed(2) : '0.00';

  // Attendance Calculation
  const currentAttendancePct = totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(1) : '0.0';
  const attendanceNum = parseFloat(currentAttendancePct);
  // How many classes can safely be missed:
  // (attended / (total + x)) >= 0.75  =>  attended >= 0.75 * total + 0.75 * x  =>  x <= (attended - 0.75 * total) / 0.75
  const safeBunks = Math.floor((attendedClasses - 0.75 * totalClasses) / 0.75);
  // How many consecutive classes must be attended to reach 75%:
  // (attended + y) / (total + y) >= 0.75 => attended + y >= 0.75 * total + 0.75 * y => 0.25 * y >= 0.75 * total - attended => y = ceil((0.75 * total - attended) / 0.25)
  const classesToAttend = Math.max(0, Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25));

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      { sem: prev.length + 1, gpa: 8.0, credits: 22 },
    ]);
  };

  const removeSemester = (idx: number) => {
    setSemesters((prev) => prev.filter((_, i) => i !== idx));
  };

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { id: `${Date.now()}`, name: 'New Elective / Lab', credits: 3, grade: 'A+' },
    ]);
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Productivity Suite
          </span>
          <Badge variant="purple" className="text-[10px]">
            Regulation Aligned
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Student Engineering Toolkit
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Accurate calculators, attendance margin predictors, exam countdown, and focused study timers
          configured strictly for Anna University academic standards.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'cgpa', label: 'CGPA Calculator' },
          { id: 'gpa', label: 'GPA Calculator' },
          { id: 'attendance', label: '75% Attendance Check' },
          { id: 'percentage', label: 'Percentage Converter' },
          { id: 'pomodoro', label: 'Pomodoro Timer' },
          { id: 'countdown', label: 'Exam Countdown' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ==================================================================== */}
      {/* 1. CGPA CALCULATOR (CONFIGURABLE BY REGULATION)                       */}
      {/* ==================================================================== */}
      {activeTab === 'cgpa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Cumulative GPA Across Semesters</h3>
                  <p className="text-xs text-slate-400">Add completed semester GPAs and credit totals.</p>
                </div>

                {/* Regulation Switcher */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0B1220] border border-[#26344D]">
                  <button
                    onClick={() => setSelectedRegulation('2021')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      selectedRegulation === '2021'
                        ? 'bg-[#B7F34A] text-[#0B1220] font-bold shadow-md'
                        : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                    }`}
                  >
                    Regulation 2021
                  </button>
                  <button
                    onClick={() => setSelectedRegulation('2025')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      selectedRegulation === '2025'
                        ? 'bg-[#B7F34A] text-[#0B1220] font-bold shadow-md'
                        : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                    }`}
                  >
                    Regulation 2025
                  </button>
                </div>
              </div>

              {/* Semesters Table */}
              <div className="space-y-2.5">
                {semesters.map((s, idx) => (
                  <div
                    key={s.sem}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1220] border border-[#26344D]"
                  >
                    <span className="font-mono text-xs font-bold text-[#B7F34A] w-16">
                      Sem {s.sem}
                    </span>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400">Semester GPA (0 - 10)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          value={s.gpa}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setSemesters((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, gpa: val } : item))
                            );
                          }}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400">Semester Credits</label>
                        <input
                          type="number"
                          min="1"
                          max="35"
                          value={s.credits}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10) || 0;
                            setSemesters((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, credits: val } : item))
                            );
                          }}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    </div>

                    {semesters.length > 1 && (
                      <button
                        onClick={() => removeSemester(idx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete semester"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm" onClick={addSemester} className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Semester
                </Button>
                <span className="text-xs text-slate-400">Total Credits: {totalCredits}</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Score Summary */}
          <div className="lg:col-span-4">
            <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-6 text-center">
              <Award className="w-12 h-12 text-[#B7F34A] mx-auto" />
              <div>
                <p className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">
                  Calculated Cumulative CGPA
                </p>
                <p className="text-4xl sm:text-5xl font-black text-[#F5F7FA] mt-1">{calculatedCgpa}</p>
                <p className="text-xs text-emerald-400 font-semibold mt-1">First Class with Distinction range</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#26344D] text-xs text-[#94A3B8] space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span>Equiv. Percentage:</span>
                  <span className="font-bold text-[#F5F7FA]">{(parseFloat(calculatedCgpa) * 10).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Grading Scale:</span>
                  <span className="font-bold text-[#F5F7FA]">Regulation {selectedRegulation}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. GPA CALCULATOR                                                    */}
      {/* ==================================================================== */}
      {activeTab === 'gpa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Semester Subject Grades (GPA)</h3>
                  <p className="text-xs text-slate-400">
                    Select your expected grades for each subject in this semester.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={addSubject} className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Subject
                </Button>
              </div>

              <div className="space-y-2.5">
                {subjects.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80"
                  >
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSubjects((prev) =>
                          prev.map((s) => (s.id === sub.id ? { ...s, name: val } : s))
                        );
                      }}
                      className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-white flex-1"
                    />

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">Credits:</span>
                        <select
                          value={sub.credits}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setSubjects((prev) =>
                              prev.map((s) => (s.id === sub.id ? { ...s, credits: val } : s))
                            );
                          }}
                          className="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          {[1, 1.5, 2, 3, 4, 5].map((c) => (
                            <option key={c} value={c}>
                              {c} Cr
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#94A3B8]">Grade:</span>
                        <select
                          value={sub.grade}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSubjects((prev) =>
                              prev.map((s) => (s.id === sub.id ? { ...s, grade: val } : s))
                            );
                          }}
                          className="bg-[#0B1220] border border-[#26344D] rounded-lg px-2.5 py-1 text-xs font-bold text-[#B7F34A]"
                        >
                          {Object.keys(gradeScale).map((g) => (
                            <option key={g} value={g}>
                              {g} ({gradeScale[g]} pts)
                            </option>
                          ))}
                        </select>
                      </div>

                      {subjects.length > 1 && (
                        <button
                          onClick={() => removeSubject(sub.id)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-6 text-center">
              <Sparkles className="w-12 h-12 text-[#B7F34A] mx-auto" />
              <div>
                <p className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">
                  Semester GPA
                </p>
                <p className="text-4xl sm:text-5xl font-black text-[#F5F7FA] mt-1">{calculatedGpa}</p>
                <p className="text-xs text-[#B7F34A] font-semibold mt-1">Based on {currentTotalCredits} credits</p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. 75% ATTENDANCE SAFE MARGIN CALCULATOR                             */}
      {/* ==================================================================== */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white">Anna University 75% Attendance Safe Margin</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Under Anna University examination regulations, students require a minimum of 75% attendance
                to appear in end-semester examinations without condonation fees or lack of attendance (detention).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Total Classes Delivered
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Classes Attended
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={totalClasses}
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6 border-slate-800 space-y-5 text-center">
              <div>
                <p className="text-xs uppercase font-bold text-slate-400">Current Percentage</p>
                <p
                  className={`text-4xl sm:text-5xl font-black mt-1 ${
                    attendanceNum >= 75 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {currentAttendancePct}%
                </p>
              </div>

              {attendanceNum >= 75 ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 space-y-1">
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Safe Zone ({safeBunks} Classes Margin)</span>
                  </div>
                  <p className="text-[11px] text-emerald-400/80">
                    You can safely miss up to <strong>{safeBunks} more classes</strong> while maintaining the mandatory 75% threshold.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300 space-y-1">
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Below Mandatory 75% Threshold</span>
                  </div>
                  <p className="text-[11px] text-rose-400/80">
                    You must attend the next <strong>{classesToAttend} consecutive classes</strong> without absence to regain 75% eligibility.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. PERCENTAGE CONVERTER                                               */}
      {/* ==================================================================== */}
      {activeTab === 'percentage' && (
        <Card className="p-6 max-w-xl mx-auto border-[#26344D] bg-[#111B2E] space-y-6 text-center">
          <h3 className="text-base font-bold text-[#F5F7FA]">Anna University Official Percentage Formula</h3>
          <p className="text-xs text-[#94A3B8]">
            Formula established by Anna University Syndicate:{' '}
            <code className="text-[#B7F34A] font-mono">Percentage = CGPA × 10</code>
          </p>

          <div className="max-w-xs mx-auto">
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">Enter CGPA (0 - 10)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={inputCgpa}
              onChange={(e) => setInputCgpa(parseFloat(e.target.value) || 0)}
              className="w-full text-center bg-[#0B1220] border border-[#26344D] rounded-xl px-4 py-2.5 text-lg font-bold text-[#F5F7FA]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#26344D]">
            <span className="text-xs uppercase font-bold text-[#94A3B8]">Equivalent Percentage</span>
            <p className="text-4xl sm:text-5xl font-black text-[#B7F34A] mt-1">
              {(inputCgpa * 10).toFixed(1)}%
            </p>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* 5. POMODORO TIMER                                                    */}
      {/* ==================================================================== */}
      {activeTab === 'pomodoro' && (
        <Card className="p-8 max-w-md mx-auto border-[#26344D] bg-[#111B2E] text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 text-xs font-bold uppercase tracking-wider">
            {pomoMode === 'work' ? 'Deep Study Interval' : 'Rest Break'}
          </div>

          <div className="text-6xl sm:text-7xl font-mono font-black text-[#F5F7FA] tracking-widest">
            {String(pomoMinutes).padStart(2, '0')}:{String(pomoSeconds).padStart(2, '0')}
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant={isPomoRunning ? 'secondary' : 'primary'}
              size="lg"
              onClick={() => setIsPomoRunning(!isPomoRunning)}
              className="px-8 text-sm"
            >
              {isPomoRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-1.5" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1.5" /> Start Focus
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setIsPomoRunning(false);
                setPomoMinutes(pomoMode === 'work' ? 25 : 5);
                setPomoSeconds(0);
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setPomoMode('work');
                setPomoMinutes(25);
                setPomoSeconds(0);
                setIsPomoRunning(false);
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                pomoMode === 'work'
                  ? 'bg-[#B7F34A] text-[#0B1220] border-[#B7F34A] font-bold shadow-md'
                  : 'bg-[#0B1220] border-[#26344D] text-[#94A3B8]'
              }`}
            >
              25m Focus
            </button>
            <button
              onClick={() => {
                setPomoMode('break');
                setPomoMinutes(5);
                setPomoSeconds(0);
                setIsPomoRunning(false);
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                pomoMode === 'break'
                  ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                  : 'bg-[#0B1220] border-[#26344D] text-[#94A3B8]'
              }`}
            >
              5m Break
            </button>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* 6. EXAM COUNTDOWN                                                    */}
      {/* ==================================================================== */}
      {activeTab === 'countdown' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B7F34A]">CS3591</span>
              <Badge variant="neutral" className="text-[10px]">
                14 Days Remaining
              </Badge>
            </div>
            <h3 className="text-base font-bold text-[#F5F7FA]">Computer Networks Theory Exam</h3>
            <p className="text-xs text-slate-400">Anna University Nov/Dec 2026 Examination Schedule</p>
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">14</span>
                <span className="text-[10px] text-slate-500 block">Days</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">08</span>
                <span className="text-[10px] text-slate-500 block">Hours</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">45</span>
                <span className="text-[10px] text-slate-500 block">Mins</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">20</span>
                <span className="text-[10px] text-slate-500 block">Secs</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-400">CS3501</span>
              <Badge variant="info" className="text-[10px]">
                18 Days Remaining
              </Badge>
            </div>
            <h3 className="text-base font-bold text-white">Compiler Design Theory Exam</h3>
            <p className="text-xs text-slate-400">Anna University Nov/Dec 2026 Examination Schedule</p>
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">18</span>
                <span className="text-[10px] text-slate-500 block">Days</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">04</span>
                <span className="text-[10px] text-slate-500 block">Hours</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">12</span>
                <span className="text-[10px] text-slate-500 block">Mins</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xl font-bold text-white">15</span>
                <span className="text-[10px] text-slate-500 block">Secs</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
