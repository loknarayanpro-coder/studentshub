import { NextRequest, NextResponse } from 'next/server';
import { getPresignedDownloadUrl, getPresignedUploadUrl } from '@/lib/aws/s3';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const s3Key = searchParams.get('key');

  if (!s3Key) {
    return NextResponse.json({ error: 'Missing document key parameter' }, { status: 400 });
  }

  try {
    const signedUrl = await getPresignedDownloadUrl(s3Key);
    return NextResponse.json({ signedUrl, key: s3Key, expiresInSeconds: 900 });
  } catch (error) {
    console.error('API Error generating signed URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate signed document URL' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, contentType } = body;

    if (!key) {
      return NextResponse.json({ error: 'Missing upload target key' }, { status: 400 });
    }

    const { uploadUrl } = await getPresignedUploadUrl(key, contentType || 'application/pdf');
    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error('API Error generating upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
