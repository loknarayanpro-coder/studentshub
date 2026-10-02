import { NextRequest, NextResponse } from 'next/server';
import {
  SUBJECTS,
  MOCK_RESOURCES,
  MOCK_QUESTION_PAPERS,
  MOCK_IMPORTANT_QUESTIONS,
  MOCK_OPPORTUNITIES,
  MOCK_COMPANIES,
} from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';

  if (!q) {
    return NextResponse.json({
      subjects: [],
      notes: [],
      questionPapers: [],
      opportunities: [],
    });
  }

  const subjects = SUBJECTS.filter(
    (s) => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  ).slice(0, 5);

  const notes = MOCK_RESOURCES.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.subjectCode.toLowerCase().includes(q) ||
      r.subjectName.toLowerCase().includes(q)
  ).slice(0, 5);

  const questionPapers = MOCK_QUESTION_PAPERS.filter(
    (qp) =>
      qp.title.toLowerCase().includes(q) ||
      qp.subjectCode.toLowerCase().includes(q) ||
      qp.subjectName.toLowerCase().includes(q)
  ).slice(0, 5);

  const opportunities = MOCK_OPPORTUNITIES.filter(
    (opp) =>
      opp.title.toLowerCase().includes(q) ||
      opp.companyName.toLowerCase().includes(q) ||
      opp.skillsRequired.some((s) => s.toLowerCase().includes(q))
  ).slice(0, 5);

  return NextResponse.json({
    subjects,
    notes,
    questionPapers,
    opportunities,
  });
}
