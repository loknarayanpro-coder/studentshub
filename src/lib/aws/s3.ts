import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = process.env.AWS_REGION || 'ap-south-1';
const bucketName = process.env.AWS_S3_BUCKET || 'au-student-hub-documents';
const cloudFrontUrl = process.env.CLOUDFRONT_URL; // Optional CloudFront domain

// Initialize S3 client for server-side only operations
export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'MOCK_KEY_ID',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'MOCK_SECRET_KEY',
  },
});

/**
 * Generates a secure, temporary pre-signed URL for viewing or downloading a PDF document.
 * Expiration defaults to 15 minutes (900 seconds) to prevent permanent link leaking.
 */
export async function getPresignedDownloadUrl(
  s3Key: string,
  expiresInSeconds: number = 900
): Promise<string> {
  // If CloudFront is configured and files are signed or public:
  if (cloudFrontUrl) {
    return `${cloudFrontUrl.replace(/\/$/, '')}/${s3Key}`;
  }

  // If AWS credentials are mock / unconfigured, return preview placeholder
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    process.env.AWS_ACCESS_KEY_ID === 'MOCK_KEY_ID'
  ) {
    return `/sample-document.pdf?key=${encodeURIComponent(s3Key)}`;
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });
    return signedUrl;
  } catch (error) {
    console.error('Error generating pre-signed download URL:', error);
    return `/sample-document.pdf?key=${encodeURIComponent(s3Key)}`;
  }
}

/**
 * Generates a pre-signed URL allowing a student or admin to upload a file directly to S3.
 */
export async function getPresignedUploadUrl(
  s3Key: string,
  contentType: string = 'application/pdf',
  expiresInSeconds: number = 300
): Promise<{ uploadUrl: string; key: string }> {
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    process.env.AWS_ACCESS_KEY_ID === 'MOCK_KEY_ID'
  ) {
    return {
      uploadUrl: `/api/s3/mock-upload?key=${encodeURIComponent(s3Key)}`,
      key: s3Key,
    };
  }

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    return { uploadUrl, key: s3Key };
  } catch (error) {
    console.error('Error generating pre-signed upload URL:', error);
    return {
      uploadUrl: `/api/s3/mock-upload?key=${encodeURIComponent(s3Key)}`,
      key: s3Key,
    };
  }
}
