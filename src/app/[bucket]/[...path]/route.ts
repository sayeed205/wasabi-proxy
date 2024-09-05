import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { formatUrl } from '@aws-sdk/util-format-url';
import { Hash } from '@smithy/hash-node';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { NextRequest } from 'next/server';

const createPresignedUrlWithoutClient = async (bucket: string, key: string) => {
    const url = parseUrl(
        `https://${bucket}.s3.${process.env.WASABI_REGION}.wasabisys.com/${key}`
    );
    const presigner = new S3RequestPresigner({
        credentials: {
            accessKeyId: process.env.WASABI_ACCESS_KEY_ID!,
            secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY!,
        },
        region: process.env.WASABI_REGION!,
        sha256: Hash.bind(null, 'sha256'),
    });

    const signedUrlObject = await presigner.presign(
        new HttpRequest({ ...url, method: 'GET' })
    );
    return formatUrl(signedUrlObject);
};

export async function GET(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname;
        const pathParts = pathname.split('/');
        const bucket = pathParts[1];
        const key = pathParts.slice(2).join('/');

        const url = await createPresignedUrlWithoutClient(bucket, key);


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
        console.error(
            'Error:',
            error instanceof Error ? error.message : 'Unknown error',
        );

        return new Response('Internal Server Error', { status: 500 });
    }
}
