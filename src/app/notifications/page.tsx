'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCheck,
  BookOpen,
  Briefcase,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function NotificationsPage() {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'opportunity':
        return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Activity Stream
            </span>
            {unreadNotificationsCount > 0 && (
              <Badge variant="info" className="text-[10px]">
                {unreadNotificationsCount} unread
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Notification Center</h1>
        </div>

        {unreadNotificationsCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead} className="text-xs">
            <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Card
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-5 border-slate-800 transition-all cursor-pointer ${
                notif.isRead ? 'opacity-70 bg-slate-900/40' : 'bg-slate-900/90 border-blue-500/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex-shrink-0">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    <span className="text-[11px] text-slate-500 whitespace-nowrap">
                      {formatDate(notif.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>

                  {notif.link && (
                    <div className="pt-2">
                      <Link
                        href={notif.link}
                        className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        View Details <ChevronRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {!notif.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="py-16 text-center text-slate-400 border border-dashed border-slate-800 rounded-3xl">
            <Bell className="w-12 h-12 mx-auto text-slate-600 mb-2" />
            <h4 className="text-base font-semibold text-white">All caught up!</h4>
            <p className="text-xs text-slate-400 mt-1">No new alerts or deadlines at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
