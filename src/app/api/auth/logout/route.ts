import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Çıkış yapıldı' });
    response.cookies.set('arkhe_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    });
    return response;
}
