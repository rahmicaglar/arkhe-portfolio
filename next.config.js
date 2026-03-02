/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'opengraph.githubassets.com' },
            { protocol: 'https', hostname: 'fpsjskxgdskyfhghcnyd.supabase.co' },
        ],
    },
};

module.exports = nextConfig;
