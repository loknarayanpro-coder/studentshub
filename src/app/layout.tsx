import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { AppProvider } from '@/lib/context/AppContext';
import { Navbar } from '@/components/navigation/Navbar';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Footer } from '@/components/navigation/Footer';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import { PdfViewerModal } from '@/components/resources/PdfViewerModal';
import { ReportModal } from '@/components/feedback/ReportModal';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'AU Student Hub — Everything you need for your semester',
  description:
    'Independent academic workspace for Anna University engineering students. Lecture notes, question papers, important questions, internships, and placement prep.',
  keywords: [
    'Anna University notes',
    'Regulation 2021',
    'Regulation 2025',
    'engineering question papers',
    'engineering internships',
    'placement preparation',
    'CS3591 notes',
    'CGPA calculator',
  ],
  authors: [{ name: 'AU Student Hub Team' }],
  openGraph: {
    title: 'AU Student Hub — Everything you need for your semester',
    description:
      'Notes, question papers, important questions, internships and placement resources.',
    siteName: 'AU Student Hub',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans bg-[#0B1220] text-[#F5F7FA] min-h-screen flex flex-col selection:bg-[#B7F34A] selection:text-[#0B1220]">
        <AuthProvider>
          <AppProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
            <GlobalSearchModal />
            <PdfViewerModal />
            <ReportModal />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
