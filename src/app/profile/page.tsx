'use client';

import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Building,
  Mail,
  Calendar,
  Layers,
  Award,
  CheckCircle2,
  Edit2,
  Save,
  Plus,
  X,
  Bookmark,
  Download,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';
import { DEPARTMENTS, REGULATIONS } from '@/lib/mock-data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function StudentProfilePage() {
  const { user, updateProfile } = useAuth();
  const { bookmarks } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || 'Priya Sundaram');
  const [college, setCollege] = useState(
    user?.college || 'College of Engineering, Guindy (CEG Campus, Anna University)'
  );
  const [department, setDepartment] = useState(user?.department || 'cse');
  const [semester, setSemester] = useState(user?.semester || 5);
  const [regulation, setRegulation] = useState(user?.regulation || '2021');
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear || 2027);
  const [skills, setSkills] = useState<string[]>(
    user?.skills || ['Java', 'Python', 'React', 'Data Structures', 'SQL', 'Git']
  );
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    updateProfile({
      fullName,
      college,
      department,
      semester,
      regulation,
      graduationYear,
      skills,
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Profile Card */}
      <Card className="p-6 sm:p-8 border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces'
              }
              alt={fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/40 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">{fullName}</h1>
                <Badge variant="success" className="text-[10px]">
                  Verified Student
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {user?.email || 'student@annauniv.edu'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-purple-400" />
                {college}
              </p>
            </div>
          </div>

          <Button
            variant={isEditing ? 'success' : 'outline'}
            size="sm"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="self-start sm:self-center text-xs"
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500">Resources Saved</span>
            <p className="text-xl font-bold text-amber-400 mt-1">{bookmarks.length || 24}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500">Downloads Made</span>
            <p className="text-xl font-bold text-blue-400 mt-1">48</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500">Applications</span>
            <p className="text-xl font-bold text-purple-400 mt-1">5</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500">Study Progress</span>
            <p className="text-xl font-bold text-emerald-400 mt-1">68%</p>
          </div>
        </div>
      </Card>

      {/* Profile Details & Academic Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Profile */}
        <Card className="p-6 border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            Academic Enrollment
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
              {isEditing ? (
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              ) : (
                <p className="text-sm font-semibold text-white bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                  {fullName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Department</label>
                {isEditing ? (
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.code}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm font-semibold text-white bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 uppercase font-mono">
                    {department}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Semester</label>
                {isEditing ? (
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm font-semibold text-white bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                    Semester {semester}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Regulation</label>
                {isEditing ? (
                  <select
                    value={regulation}
                    onChange={(e) => setRegulation(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200"
                  >
                    {REGULATIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm font-semibold text-white bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                    Regulation {regulation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Batch Graduation</label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(Number(e.target.value))}
                  />
                ) : (
                  <p className="text-sm font-semibold text-white bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 font-mono">
                    {graduationYear} Batch
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">College Campus</label>
              {isEditing ? (
                <Input value={college} onChange={(e) => setCollege(e.target.value)} />
              ) : (
                <p className="text-xs font-semibold text-slate-300 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                  {college}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Skills & Verified Readiness */}
        <Card className="p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Technical Skills & Stack
            </h3>
            <span className="text-xs text-slate-400">{skills.length} skills listed</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Skills are cross-matched with live internship criteria to deliver personalized job recommendations.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Add skill (e.g. Next.js, Docker, C++)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button variant="secondary" size="sm" onClick={addSkill} className="text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
