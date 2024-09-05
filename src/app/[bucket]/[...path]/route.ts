import AWS from 'aws-sdk';
import { NextRequest } from 'next/server';

const credentials = new AWS.SharedIniFileCredentials({ profile: 'wasabi' });

AWS.config.credentials = credentials;
AWS.config.credentials.accessKeyId = process.env.WASABI_ACCESS_KEY_ID!;
AWS.config.credentials.secretAccessKey = process.env.WASABI_SECRET_ACCESS_KEY!;
AWS.config.region = process.env.WASABI_REGION!;

const ep = new AWS.Endpoint(process.env.WASABI_ENDPOINT || 's3.wasabisys.com');
const s3 = new AWS.S3({ endpoint: ep });

export async function GET(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname;
        const pathParts = pathname.split('/');
        const bucket = pathParts[1];
        const key = pathParts.slice(2).join('/');

        // Generate signed URL
        const url = s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: key,
            Expires: 60 * 3, // URL expires in 3 minutes
        });

        console.log('Generated URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.arrayBuffer();

        // Create and return the response
        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type':
                    response.headers.get('content-type') ||
                    'application/octet-stream',
                'Content-Length': response.headers.get('content-length') || '',
            },
        });
    } catch (error) {
        // @ts-expect-error
        console.error('Error:', error?.message || 'Unknown error');

        return new Response('Internal Server Error', { status: 500 });
    }
}
