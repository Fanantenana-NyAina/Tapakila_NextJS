/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.ftcdn.net',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
        ],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
    },
}

module.exports = nextConfig