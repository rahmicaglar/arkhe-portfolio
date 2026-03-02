import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: { default: 'arkhe — rahmicaglar', template: '%s | arkhe' },
    description: 'Full-stack developer. Building things from the ground up. Exploring the intersection of code, design, and architecture.',
    keywords: ['full-stack', 'developer', 'typescript', 'next.js', 'react', 'blog'],
    authors: [{ name: 'rahmicaglar' }],
    creator: 'rahmicaglar',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: 'arkhe',
        title: 'arkhe — rahmicaglar',
        description: 'Full-stack developer. Building things from the ground up.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'arkhe — rahmicaglar',
        description: 'Full-stack developer. Building things from the ground up.',
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="bg-void text-text-primary antialiased noise">
                {children}
            </body>
        </html>
    );
}
