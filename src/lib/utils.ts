import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(deadlineString: string): { days: number; isUrgent: boolean; isExpired: boolean } {
  try {
    const deadline = new Date(deadlineString).getTime();
    const now = new Date().getTime();
    const diffTime = deadline - now;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      days,
      isUrgent: days > 0 && days <= 5,
      isExpired: days < 0,
    };
  } catch {
    return { days: 0, isUrgent: false, isExpired: false };
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
