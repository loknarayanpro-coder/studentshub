'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bookmark,
  User,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const { openSearch, bookmarks } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on admin panel or admin login, skip regular student navbar
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { label: 'Syllabus', href: '/academics' },
    { label: 'Notes', href: '/notes' },
    { label: 'Question Papers', href: '/question-papers' },
    { label: 'Important Qs', href: '/important-questions' },
    { label: 'Tools', href: '/tools' },
    { label: 'Placement', href: '/placement' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#26344D] bg-[#0B1220]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo / CAMPUS Branding */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-[#F5F7FA] uppercase font-mono">
                CAMPUS
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8] hidden sm:inline border-l border-[#26344D] pl-2">
                AU Hub
              </span>
            </Link>

            {/* Scope Pill Badge: 3rd Yr Sem 5 CSE */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111B2E] border border-[#26344D] text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7F34A] animate-pulse" />
              <span className="text-[#F5F7FA] font-bold">CSE</span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-[#94A3B8]">3rd Yr Sem 5</span>
              <span className="text-[10px] text-[#B7F34A] bg-[#B7F34A]/10 px-1 rounded">R-2021</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                      isActive
                        ? 'text-[#B7F34A] bg-[#111B2E] border border-[#26344D]'
                        : 'text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#111B2E]'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions: Search + Bookmarks + Login/Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#111B2E] border border-[#26344D] hover:border-[#94A3B8]/40 text-[#94A3B8] hover:text-[#F5F7FA] text-xs transition-colors"
              title="Search notes, past papers, opportunities (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#B7F34A]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block text-[10px] font-mono bg-[#0B1220] px-1.5 py-0.5 rounded text-[#94A3B8] border border-[#26344D]">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Quick Link */}
            <Link
              href="/bookmarks"
              className={cn(
                'p-2 rounded-lg border border-[#26344D] text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#111B2E] transition-colors relative',
                pathname === '/bookmarks' && 'text-[#B7F34A] border-[#B7F34A]/40'
              )}
              title="Saved Bookmarks"
            >
              <Bookmark className="w-3.5 h-3.5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B7F34A]" />
              )}
            </Link>

            {/* Authentication / Profile Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/dashboard"
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#111B2E] border border-[#26344D] text-[#F5F7FA] hover:border-[#B7F34A]/40 transition-colors flex items-center gap-1.5',
                    pathname === '/dashboard' && 'border-[#B7F34A] text-[#B7F34A]'
                  )}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Workspace</span>
                </Link>
                <button
                  onClick={signOut}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-[#111B2E] transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#B7F34A] hover:bg-[#D0FF73] text-[#0B1220] transition-colors font-mono"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#111B2E]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#26344D] space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-[#F5F7FA] hover:bg-[#111B2E]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
