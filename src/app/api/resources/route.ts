import { NextRequest, NextResponse } from 'next/server';
import { MOCK_RESOURCES, MOCK_QUESTION_PAPERS } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');

  let results = [...MOCK_RESOURCES, ...MOCK_QUESTION_PAPERS];

  if (type) {
    results = results.filter((r) => r.resourceType === type);
  }
  if (subject) {
    results = results.filter((r) => r.subjectCode.toLowerCase() === subject.toLowerCase());
  }

  return NextResponse.json({
    data: results,
    total: results.length,
  });
}
