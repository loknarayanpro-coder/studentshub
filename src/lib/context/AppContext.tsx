'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bookmark, NotificationItem, StudyProgressStatus, AcademicResource } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/lib/mock-data';

interface AppContextType {
  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // PDF Viewer Modal
  activePdf: AcademicResource | null;
  openPdfViewer: (resource: AcademicResource) => void;
  closePdfViewer: () => void;

  // Report Modal
  reportTarget: { title: string; id?: string; type: 'resource' | 'opportunity' } | null;
  openReportModal: (target: { title: string; id?: string; type: 'resource' | 'opportunity' }) => void;
  closeReportModal: () => void;

  // Bookmarks
  bookmarks: Bookmark[];
  toggleBookmark: (item: {
    type: 'resource' | 'question_paper' | 'important_question' | 'opportunity' | 'company';
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    link: string;
  }) => void;
  isBookmarked: (type: string, id: string) => boolean;

  // Study Progress
  studyProgress: Record<string, StudyProgressStatus>; // key: `${subjectId}-${unitNumber}`
  setUnitProgress: (subjectId: string, unitNumber: number, status: StudyProgressStatus) => void;
  getUnitProgress: (subjectId: string, unitNumber: number) => StudyProgressStatus;
  getOverallSubjectProgress: (subjectId: string, totalUnits?: number) => number;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Focus Modes
  focusMode: 'default' | 'exam' | 'career';
  setFocusMode: (mode: 'default' | 'exam' | 'career') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BOOKMARKS_STORAGE_KEY = 'au_student_hub_bookmarks';
const STUDY_PROGRESS_STORAGE_KEY = 'au_student_hub_study_progress';
const NOTIFICATIONS_STORAGE_KEY = 'au_student_hub_notifications';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activePdf, setActivePdf] = useState<AcademicResource | null>(null);
  const [reportTarget, setReportTarget] = useState<{ title: string; id?: string; type: 'resource' | 'opportunity' } | null>(null);
  const [focusMode, setFocusMode] = useState<'default' | 'exam' | 'career'>('default');

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [studyProgress, setStudyProgress] = useState<Record<string, StudyProgressStatus>>({});
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));
      else {
        // Initial sample bookmarks
        setBookmarks([
          {
            id: 'bm-1',
            userId: 'usr-student-priya',
            itemType: 'resource',
            itemId: 'res-cn-complete-notes',
            title: 'Computer Networks Complete Unit 1 to 5 Faculty Lecture Notes',
            subtitle: 'CS3591 • Semester 5',
            badge: 'Notes',
            link: '/notes',
            savedAt: new Date().toISOString(),
          },
          {
            id: 'bm-2',
            userId: 'usr-student-priya',
            itemType: 'opportunity',
            itemId: 'opp-zoho-frontend',
            title: 'Frontend Developer Intern',
            subtitle: 'Zoho Corporation • ₹25,000 / mo',
            badge: 'Internship',
            link: '/internships',
            savedAt: new Date().toISOString(),
          },
        ]);
      }

      const storedProgress = localStorage.getItem(STUDY_PROGRESS_STORAGE_KEY);
      if (storedProgress) setStudyProgress(JSON.parse(storedProgress));
      else {
        // Sample default progress for CS3591
        setStudyProgress({
          'sub-cs3591-1': 'completed',
          'sub-cs3591-2': 'completed',
          'sub-cs3591-3': 'studying',
          'sub-cs3591-4': 'not_started',
          'sub-cs3591-5': 'not_started',
        });
      }

      const storedNotifs = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
      else setNotifications(MOCK_NOTIFICATIONS);
    } catch (e) {
      console.error('Error loading app state:', e);
    }
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openPdfViewer = (resource: AcademicResource) => setActivePdf(resource);
  const closePdfViewer = () => setActivePdf(null);

  const openReportModal = (target: { title: string; id?: string; type: 'resource' | 'opportunity' }) => setReportTarget(target);
  const closeReportModal = () => setReportTarget(null);

  const toggleBookmark = (item: {
    type: 'resource' | 'question_paper' | 'important_question' | 'opportunity' | 'company';
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    link: string;
  }) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.itemType === item.type && b.itemId === item.id);
      let updated: Bookmark[];
      if (exists) {
        updated = prev.filter((b) => !(b.itemType === item.type && b.itemId === item.id));
      } else {
        const newBm: Bookmark = {
          id: `bm-${Date.now()}`,
          userId: 'usr-student-priya',
          itemType: item.type,
          itemId: item.id,
          title: item.title,
          subtitle: item.subtitle,
          badge: item.badge,
          link: item.link,
          savedAt: new Date().toISOString(),
        };
        updated = [newBm, ...prev];
      }
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isBookmarked = (type: string, id: string) => {
    return bookmarks.some((b) => b.itemType === type && b.itemId === id);
  };

  const setUnitProgress = (subjectId: string, unitNumber: number, status: StudyProgressStatus) => {
    setStudyProgress((prev) => {
      const key = `${subjectId}-${unitNumber}`;
      const updated = { ...prev, [key]: status };
      try {
        localStorage.setItem(STUDY_PROGRESS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const getUnitProgress = (subjectId: string, unitNumber: number): StudyProgressStatus => {
    const key = `${subjectId}-${unitNumber}`;
    return studyProgress[key] || 'not_started';
  };

  const getOverallSubjectProgress = (subjectId: string, totalUnits: number = 5): number => {
    let completed = 0;
    for (let u = 1; u <= totalUnits; u++) {
      const status = getUnitProgress(subjectId, u);
      if (status === 'completed') completed += 1;
      else if (status === 'studying') completed += 0.5;
    }
    return Math.round((completed / totalUnits) * 100);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      try {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, isRead: true }));
      try {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        activePdf,
        openPdfViewer,
        closePdfViewer,
        reportTarget,
        openReportModal,
        closeReportModal,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        studyProgress,
        setUnitProgress,
        getUnitProgress,
        getOverallSubjectProgress,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        focusMode,
        setFocusMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
