'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  LayoutDashboard,
  FileText,
  Clock,
  Briefcase,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/context/AuthContext';

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const links = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Resource Manager', href: '/admin/resources', icon: FileText },
    { label: 'Moderation Queue', href: '/admin/submissions', icon: Clock, badge: '2' },
    { label: 'Opportunities', href: '/admin/opportunities', icon: Briefcase },
    { label: 'Issue Reports', href: '/admin/reports', icon: AlertTriangle, badge: '2' },
    { label: 'Platform Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#070c18] border-r border-slate-800/80 flex flex-col justify-between p-4 flex-shrink-0 min-h-screen">
      <div className="space-y-6">
        {/* Brand */}
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Control Center
            </span>
            <span className="text-sm font-extrabold text-white tracking-tight">
              AU Student Hub
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('w-4 h-4', isActive ? 'text-amber-400' : 'text-slate-500')} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile & Exit Switch */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          <span>View Public Platform</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=faces"
              alt="Admin"
              className="w-7 h-7 rounded-lg object-cover border border-amber-500/30"
            />
            <div className="text-[11px] leading-tight">
              <p className="font-bold text-white">Dr. K. Arumugam</p>
              <p className="text-[10px] text-amber-400 font-mono">SUPER ADMIN</p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Log out from console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
