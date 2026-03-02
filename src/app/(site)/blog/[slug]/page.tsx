import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';
import ScrollProgressBar from '@/components/ScrollProgressBar';

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
    const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
    return (data as Post) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: post.title,
        description: post.excerpt || post.title,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    const wordCount = post.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="min-h-screen pt-28 pb-24">
            <ScrollProgressBar />
            <div className="max-w-3xl mx-auto px-6">

                {/* Back */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors font-mono mb-12"
                >
                    ← Blog&apos;a dön
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4 text-xs font-mono text-text-dim">
                        <span>
                            {new Date(post.created_at).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span>·</span>
                        <span>{readTime} dk okuma</span>
                    </div>

                    <h1 className="font-grotesk font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight mb-6">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-lg text-text-muted leading-relaxed border-l-2 border-accent/40 pl-4">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-accent/50 text-lg">◉</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                {/* Content */}
                <article className="prose-arkhe">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <p className="text-xs font-mono text-text-dim">Yazar</p>
                        <p className="text-text-primary font-grotesk font-semibold">arkhe / rahmicaglar</p>
                    </div>
                    <Link
                        href="/blog"
                        className="text-sm text-text-muted hover:text-accent transition-colors font-mono"
                    >
                        ← Diğer yazılara bak
                    </Link>
                </div>
            </div>
        </div>
    );
}
