'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  BookOpen,
  Briefcase,
  Award,
  Trash2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'career' | 'placement'>('all');

  const filtered = bookmarks.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'academic') {
      return (
        b.itemType === 'resource' ||
        b.itemType === 'question_paper' ||
        b.itemType === 'important_question'
      );
    }
    if (activeTab === 'career') {
      return b.itemType === 'opportunity';
    }
    if (activeTab === 'placement') {
      return b.itemType === 'company';
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Personal Collection
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            {bookmarks.length} Saved Items
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          My Saved Resources
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Quickly access your bookmarked faculty notes, question papers, recurring questions, and saved
          internship applications.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'all', label: 'All Saved', count: bookmarks.length },
          {
            id: 'academic',
            label: 'Academic Resources',
            count: bookmarks.filter(
              (b) =>
                b.itemType === 'resource' ||
                b.itemType === 'question_paper' ||
                b.itemType === 'important_question'
            ).length,
          },
          {
            id: 'career',
            label: 'Career & Internships',
            count: bookmarks.filter((b) => b.itemType === 'opportunity').length,
          },
          {
            id: 'placement',
            label: 'Company Guides',
            count: bookmarks.filter((b) => b.itemType === 'company').length,
          },
        ]}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as any)}
      />

      {/* List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <Card
              key={item.id}
              hoverable
              className="p-4 sm:p-5 border-slate-800 flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3 truncate">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0 mt-0.5">
                  <Bookmark className="w-5 h-5 fill-amber-400" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2 mb-1">
                    {item.badge && (
                      <Badge variant="purple" className="text-[10px] uppercase">
                        {item.badge}
                      </Badge>
                    )}
                    <span className="text-xs text-slate-400">{item.subtitle}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white truncate">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={item.link}>
                  <Button variant="secondary" size="sm" className="text-xs">
                    Open <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>

                <button
                  onClick={() =>
                    toggleBookmark({
                      type: item.itemType,
                      id: item.itemId,
                      title: item.title,
                      link: item.link,
                    })
                  }
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-16 text-center text-slate-400 border border-dashed border-slate-800 rounded-3xl space-y-3">
            <Bookmark className="w-12 h-12 mx-auto text-slate-600" />
            <h4 className="text-base font-semibold text-white">No Saved Items in this Category</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click the bookmark icon on any note, question paper, or internship card to save it here for offline revision.
            </p>
            <Link href="/notes">
              <Button variant="primary" size="sm" className="text-xs">
                Explore Notes Library
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
