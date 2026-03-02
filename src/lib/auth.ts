import { SignJWT, jwtVerify } from 'jose';
import { JwtPayload } from '@/types';

const getSecret = () => {
    const secret = process.env.JWT_SECRET || 'fallback-secret-please-set-env';
    return new TextEncoder().encode(secret);
};

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
    const secret = getSecret();
    return await new SignJWT(payload as Record<string, unknown>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
    try {
        const secret = getSecret();
        const { payload } = await jwtVerify(token, secret);
        return payload as unknown as JwtPayload;
    } catch {
        return null;
    }
}

export function getCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    };
}
