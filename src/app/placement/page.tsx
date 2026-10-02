'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Code,
  Sparkles,
  Database,
  Terminal,
  Cpu,
  Building,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';

export default function PlacementHubPage() {
  const [activeTab, setActiveTab] = useState('aptitude');

  const tabs = [
    { id: 'aptitude', label: 'Aptitude & Reasoning' },
    { id: 'coding', label: 'Coding & DSA' },
    { id: 'core', label: 'Core CS Fundamentals' },
    { id: 'interview', label: 'Technical & HR Interview' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-2xl bg-[#111B2E] border border-[#26344D]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
              Placement Acceleration
            </span>
            <Badge variant="neutral" className="text-[10px]">
              Campus Recruitment Ready
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
            Placement Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
            Master aptitude assessments, leetcode coding patterns, and foundational system design
            tested in campus hiring by Zoho, TCS, Freshworks, and tier-1 tech recruiters.
          </p>
        </div>

        <Link href="/placement/companies">
          <Button variant="primary" size="lg" className="whitespace-nowrap">
            <Building className="w-4 h-4 mr-2" />
            Company-Specific Guides →
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: APTITUDE */}
      {activeTab === 'aptitude' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B7F34A]/10 border border-[#B7F34A]/30 text-[#B7F34A] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA]">Quantitative Aptitude</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Time & Work, Pipes & Cisterns, Speed Time Distance, Profit & Loss, Percentages, and Probability.
              </p>
              <div className="pt-2 border-t border-[#26344D] space-y-2">
                {['Time & Work Formulas', 'Permutation & Combination Rules', 'Logarithms & Progressions'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-[#F5F7FA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F34A]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B7F34A]/10 border border-[#B7F34A]/30 text-[#B7F34A] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA]">Logical Reasoning</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Blood Relations, Seating Arrangements, Syllogisms, Coding-Decoding, and Direction Sense.
              </p>
              <div className="pt-2 border-t border-[#26344D] space-y-2">
                {['Circular & Linear Arrangements', 'Deductive Syllogisms', 'Data Sufficiency Patterns'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-[#F5F7FA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F34A]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B7F34A]/10 border border-[#B7F34A]/30 text-[#B7F34A] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA]">Verbal Ability</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Reading Comprehension, Sentence Correction, Para Jumbles, Synonyms, and Cloze Test.
              </p>
              <div className="pt-2 border-t border-[#26344D] space-y-2">
                {['Error Spotting Grammatical Rules', 'Vocabulary High-Frequency List', 'Contextual Sentence Ordering'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-[#F5F7FA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F34A]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: CODING */}
      {activeTab === 'coding' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { lang: 'Java (OOP & Collections)', desc: 'ArrayList, HashMap, Multithreading, Garbage Collection' },
              { lang: 'Python (Scripting & DSA)', desc: 'List comprehensions, Dictionaries, Generators, Lambdas' },
              { lang: 'C / C++ (Pointers & Memory)', desc: 'Pointers, Dynamic memory (malloc/new), STL Containers' },
              { lang: 'JavaScript & Node.js', desc: 'Event Loop, Promises, Async/Await, Closures, Prototypes' },
            ].map((c) => (
              <Card key={c.lang} className="p-5 border-[#26344D] bg-[#111B2E] space-y-2">
                <Code className="w-5 h-5 text-[#B7F34A] mb-1" />
                <h4 className="text-sm font-bold text-[#F5F7FA]">{c.lang}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-4">
            <h3 className="text-base font-bold text-[#F5F7FA]">Top 5 Campus Interview Coding Patterns</h3>
            <div className="space-y-3">
              {[
                {
                  pattern: 'Two Pointers & Sliding Window',
                  example: 'Longest Substring Without Repeating Characters, Trapping Rain Water',
                },
                {
                  pattern: 'Binary Search On Range',
                  example: 'Search in Rotated Sorted Array, Allocate Minimum Pages Problem',
                },
                {
                  pattern: 'Breadth-First & Depth-First Search on Trees/Graphs',
                  example: 'Course Schedule (Topological Sort), Lowest Common Ancestor',
                },
                {
                  pattern: 'Dynamic Programming: 0/1 Knapsack & Subsequences',
                  example: 'Longest Increasing Subsequence, Coin Change Problem',
                },
              ].map((p) => (
                <div key={p.pattern} className="p-3.5 rounded-xl bg-[#0B1220] border border-[#26344D] text-xs">
                  <span className="font-bold text-[#F5F7FA] block mb-0.5">{p.pattern}</span>
                  <span className="text-[#94A3B8]">Frequently Asked Problems: {p.example}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: CORE CS */}
      {activeTab === 'core' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-3">
            <Database className="w-6 h-6 text-[#B7F34A]" />
            <h3 className="text-base font-bold text-[#F5F7FA]">Database Management Systems (DBMS)</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              ACID Properties, Normalization (1NF, 2NF, 3NF, BCNF), Indexing (B-Trees vs Hash), SQL Joins,
              Transactions, and Deadlock resolution.
            </p>
          </Card>

          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-3">
            <Cpu className="w-6 h-6 text-[#B7F34A]" />
            <h3 className="text-base font-bold text-[#F5F7FA]">Operating Systems (OS)</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Process vs Thread, CPU Scheduling algorithms, Synchronization (Semaphores, Mutex), Memory
              Management (Paging, Virtual Memory), and Page Replacement (LRU, FIFO).
            </p>
          </Card>

          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-3">
            <Terminal className="w-6 h-6 text-[#B7F34A]" />
            <h3 className="text-base font-bold text-[#F5F7FA]">Computer Networks (CN)</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              OSI & TCP/IP layers, TCP vs UDP, 3-Way Handshake, DNS resolution, Subnetting (CIDR), HTTP/HTTPS,
              and TLS handshake mechanism.
            </p>
          </Card>

          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-3">
            <Code className="w-6 h-6 text-[#B7F34A]" />
            <h3 className="text-base font-bold text-[#F5F7FA]">Object Oriented Programming (OOP)</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              The 4 Pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism. Method overloading vs
              overriding, Abstract classes vs Interfaces, and SOLID principles.
            </p>
          </Card>
        </div>
      )}

      {/* TAB 4: INTERVIEW */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          <Card className="p-6 border-[#26344D] bg-[#111B2E] space-y-4">
            <h3 className="text-base font-bold text-[#F5F7FA]">Technical HR & Behavioral Preparation (STAR Method)</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Use the STAR framework (Situation, Task, Action, Result) to articulate engineering achievements:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#26344D]">
                <span className="font-bold text-[#B7F34A] block mb-1">Tell me about yourself.</span>
                <span className="text-[#94A3B8]">
                  Structure into Present (current branch & technical projects), Past (core achievements), and Future
                  (alignment with the company mission).
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#26344D]">
                <span className="font-bold text-[#B7F34A] block mb-1">Describe a challenging technical bug.</span>
                <span className="text-[#94A3B8]">
                  Explain the unexpected behavior, diagnostic tools used (logs, debugger), root cause identified, and
                  systemic prevention fix implemented.
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
