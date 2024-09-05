export default function Home() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-8 text-center'>
            <main className='max-w-2xl'>
                <h1 className='text-4xl font-bold mb-4'>
                    Wasabi S3 Reverse Proxy
                </h1>
                <p className='text-xl mb-8'>
                    This is a reverse proxy service for Wasabi S3 storage.
                </p>
                <a
                    href='https://github.com/sayeed205/wasabi-proxy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                >
                    Learn More on GitHub
                </a>
                <div className='mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded-md text-yellow-700'>
                    <p className='font-bold mb-2'>Disclaimer:</p>
                    <p>
                        We are not affiliated with Wasabi and are not
                        responsible for any kind of account suspension. Use this
                        service at your own risk.
                    </p>
                </div>
            </main>
            <footer className='mt-16 text-sm text-gray-500'>
                &copy; {new Date().getFullYear()} Wasabi Proxy
            </footer>
        </div>
    );
}
