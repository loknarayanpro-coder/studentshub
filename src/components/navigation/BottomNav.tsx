'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, BookOpen, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { openSearch } = useApp();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const items = [
    { label: 'Home', href: '/', icon: Home, isAction: false },
    { label: 'Search', href: '#search', icon: Search, isAction: true },
    { label: 'Resources', href: '/notes', icon: BookOpen, isAction: false },
    { label: 'Jobs', href: '/internships', icon: Briefcase, isAction: false },
    { label: 'Profile', href: isAuthenticated ? '/dashboard' : '/auth/login', icon: User, isAction: false },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1220]/95 border-t border-[#26344D] backdrop-blur-md px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around h-12">
        {items.map((item) => {
          const isActive =
            !item.isAction &&
            (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={openSearch}
                className="flex flex-col items-center justify-center py-1 px-3 text-[#94A3B8] hover:text-[#F5F7FA] transition-colors"
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-3 transition-colors',
                isActive
                  ? 'text-[#B7F34A] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F5F7FA]'
              )}
            >
              <Icon className={cn('w-4 h-4 mb-0.5', isActive && 'stroke-[2.2px]')} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
