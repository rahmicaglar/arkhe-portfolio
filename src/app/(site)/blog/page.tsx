import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Full-stack geliştirme, sistem mimarisi ve teknoloji üzerine yazılar.',
};

function estimateReadTime(content: string): number {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

async function getPosts(): Promise<Post[]> {
    const { data } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, content, created_at, category_id')
        .eq('published', true)
        .order('created_at', { ascending: false });
    return (data as Post[]) || [];
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">// düşünceler</p>
                    <h1 className="font-grotesk font-bold text-5xl md:text-6xl text-text-primary mb-4">
                        Blog
                    </h1>
                    <p className="text-text-muted text-xl max-w-2xl">
                        Yazılım mimarisi, sistem tasarımı ve öğrendiklerim üzerine
                        teknik yazılar ve düşünceler.
                    </p>
                </div>

                {/* Posts */}
                {posts.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-border rounded-xl">
                        <p className="text-6xl mb-4">◉</p>
                        <p className="text-text-dim font-mono text-sm">// henüz yazı yok</p>
                        <p className="text-text-dim font-mono text-xs mt-2">Yakında...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {posts.map((post, i) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col md:flex-row md:items-center gap-4 py-8 hover:pl-2 transition-all duration-300"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-mono text-accent/50">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-xs font-mono text-text-dim">
                                            {new Date(post.created_at).toLocaleDateString('tr-TR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span className="text-xs text-text-dim">·</span>
                                        <span className="text-xs font-mono text-text-dim">
                                            {estimateReadTime(post.content)} dk okuma
                                        </span>
                                    </div>
                                    <h2 className="font-grotesk font-semibold text-xl text-text-primary group-hover:text-accent transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="text-text-muted text-sm leading-relaxed mt-1 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                                <svg
                                    className="w-5 h-5 text-text-dim group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
