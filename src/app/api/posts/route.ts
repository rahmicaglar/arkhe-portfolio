import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';

function getAdminFromRequest(req: NextRequest) {
    const token = req.cookies.get('arkhe_token')?.value;
    if (!token) return null;
    return verifyToken(token);
}

// GET: List all posts (admin sees unpublished too)
export async function GET(req: NextRequest) {
    const admin = getAdminFromRequest(req);
    const supabase = createServiceClient();

    let query = supabase
        .from('posts')
        .select('id, title, slug, excerpt, published, created_at, updated_at')
        .order('created_at', { ascending: false });

    if (!admin) {
        query = query.eq('published', true);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
}

// POST: Create new post (admin only)
export async function POST(req: NextRequest) {
    const admin = getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });

    try {
        const body = await req.json();
        const { title, slug, excerpt, content, cover_image, category_id, published, tags } = body;

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Başlık, slug ve içerik zorunlu' }, { status: 400 });
        }

        const supabase = createServiceClient();

        const { data: post, error } = await supabase
            .from('posts')
            .insert({ title, slug, excerpt, content, cover_image, category_id, published: published ?? false })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });

        // Assign tags
        if (tags && tags.length > 0) {
            const tagRows = tags.map((tagId: number) => ({ post_id: post.id, tag_id: tagId }));
            await supabase.from('post_tags').insert(tagRows);
        }

        return NextResponse.json({ data: post }, { status: 201 });
    } catch (err) {
        console.error('Create post error:', err);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
