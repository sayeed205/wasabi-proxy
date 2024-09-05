# Wasabi S3 Reverse Proxy

This project is a reverse proxy service for Wasabi S3 storage, built with [Next.js](https://nextjs.org). It allows you to securely proxy requests to your Wasabi S3 bucket without exposing your credentials to the client.

## Features

-   Secure proxy for Wasabi S3 storage
-   Built with Next.js for optimal performance and easy deployment
-   Environment variable configuration for easy setup

## Prerequisites

-   Node.js 18.x or later
-   pnpm 9.x or later
-   A Wasabi S3 account with access key and secret key
-   warning - use readonly acces key and secret key

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/sayeed205/wasabi-proxy.git
    cd wasabi-proxy
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Copy the `.env.example` file to `.env.local` and fill in your Wasabi S3 credentials:

    ```bash
    cp .env.example .env.local
    ```

4. Edit `.env.local` and add your Wasabi S3 credentials:

    ```env
    WASABI_ACCESS_KEY_ID=your_access_key_id
    WASABI_SECRET_ACCESS_KEY=your_secret_access_key
    WASABI_ENDPOINT=s3.wasabisys.com
    WASABI_REGION=your_wasabi_region
    ```

5. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
7. http://localhost:3000/[bucket]/[path/to/file]

-   http://localhost:3000/heybro/walls/00000000.png

## Usage

[Add information about how to use the proxy service, including any API endpoints or configuration options]

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

We are not affiliated with Wasabi and are not responsible for any kind of account suspension. Use this service at your own risk.

## License

[MIT](./LICENSE)

## Contact

[Sayed Ahmed](https://github.com/sayeed205)

Project Link: [https://github.com/sayeed205/wasabi-proxy](https://github.com/sayeed205/wasabi-proxy)
