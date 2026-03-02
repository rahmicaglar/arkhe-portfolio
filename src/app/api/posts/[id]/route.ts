import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyToken } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';

function getAdminFromRequest(req: NextRequest) {
    const token = req.cookies.get('arkhe_token')?.value;
    if (!token) return null;
    return verifyToken(token);
}

interface Props {
    params: Promise<{ id: string }>;
}

// GET: Single post by id
export async function GET(_req: NextRequest, { params }: Props) {
    const { id } = await params;
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 });
    return NextResponse.json({ data });
}

// PUT: Update post (admin only)
export async function PUT(req: NextRequest, { params }: Props) {
    const admin = getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { tags, ...postData } = body;

    const supabase = createServiceClient();

    const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Update tags
    if (tags !== undefined) {
        await supabase.from('post_tags').delete().eq('post_id', id);
        if (tags.length > 0) {
            await supabase.from('post_tags').insert(tags.map((tagId: number) => ({ post_id: id, tag_id: tagId })));
        }
    }

    // Revalidate so updated post appears on site immediately
    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);
    revalidatePath('/');

    return NextResponse.json({ data });
}

// DELETE: Remove post (admin only)
export async function DELETE(req: NextRequest, { params }: Props) {
    const admin = getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const { id } = await params;
    const supabase = createServiceClient();
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Revalidate after deletion
    revalidatePath('/blog');
    revalidatePath('/');

    return NextResponse.json({ message: 'Post silindi' });
}
