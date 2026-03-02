import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, getCookieOptions } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'E-posta ve şifre gerekli' }, { status: 400 });
        }

        const supabase = createServiceClient();
        const { data: admin, error } = await supabase
            .from('admins')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !admin) {
            return NextResponse.json({ error: 'Geçersiz kimlik bilgileri' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password_hash);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Geçersiz kimlik bilgileri' }, { status: 401 });
        }

        const token = signToken({ sub: admin.id, email: admin.email, role: 'admin' });

        const response = NextResponse.json({
            message: 'Giriş başarılı',
            admin: { id: admin.id, email: admin.email },
        });

        const cookieOpts = getCookieOptions();
        response.cookies.set('arkhe_token', token, {
            httpOnly: cookieOpts.httpOnly,
            secure: cookieOpts.secure,
            sameSite: cookieOpts.sameSite,
            maxAge: cookieOpts.maxAge,
            path: cookieOpts.path,
        });

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
