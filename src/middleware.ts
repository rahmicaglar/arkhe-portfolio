import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin routes (except login) need auth cookie.
    // jsonwebtoken uses Node.js crypto APIs not available in Edge Runtime,
    // so we only check cookie presence here. Full JWT verification is done
    // in each API route server-side.
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = request.cookies.get('arkhe_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
