'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/posts');
            const { data } = await res.json();
            setPosts(data || []);
        } catch {
            console.error('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    async function handleDelete(id: string, title: string) {
        if (!confirm(`"${title}" adlı yazıyı silmek istediğine emin misin?`)) return;
        try {
            await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            await fetchPosts();
        } catch {
            alert('Silme işlemi başarısız');
        }
    }

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    }

    const published = posts.filter((p) => p.published).length;
    const drafts = posts.filter((p) => !p.published).length;

    return (
        <div className="min-h-screen bg-void">
            {/* Admin Navbar */}
            <div className="border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                            <span className="text-accent text-xs font-grotesk font-bold">α</span>
                        </div>
                        <div>
                            <span className="font-grotesk font-semibold text-text-primary text-sm">arkhe</span>
                            <span className="text-text-dim text-xs ml-2 font-mono">// admin</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/posts/new"
                            className="flex items-center gap-2 bg-accent hover:bg-accent-glow text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
                        >
                            + Yeni Yazı
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-text-muted hover:text-red-400 transition-colors font-mono"
                        >
                            Çıkış
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {[
                        { label: 'Toplam Yazı', value: posts.length, color: 'text-text-primary' },
                        { label: 'Yayındaki', value: published, color: 'text-green-400' },
                        { label: 'Taslak', value: drafts, color: 'text-yellow-400' },
                    ].map((stat) => (
                        <div key={stat.label} className="glass rounded-xl p-5">
                            <p className="text-xs font-mono text-text-muted mb-1">{stat.label}</p>
                            <p className={`font-grotesk font-bold text-3xl ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Posts table */}
                <div className="glass rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                        <h2 className="font-grotesk font-semibold text-text-primary">Blog Yazıları</h2>
                        <span className="text-xs font-mono text-text-dim">{posts.length} yazı</span>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-text-dim font-mono text-sm">// henüz yazı yok</p>
                            <Link href="/admin/posts/new" className="mt-4 inline-block text-sm text-accent hover:text-accent-glow transition-colors font-mono">
                                + İlk yazını oluştur
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {posts.map((post) => (
                                <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-elevated/50 transition-colors group">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors">
                                            {post.title}
                                        </p>
                                        <p className="text-xs font-mono text-text-dim mt-0.5">
                                            {new Date(post.created_at).toLocaleDateString('tr-TR')} · /{post.slug}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs font-mono px-2 py-0.5 rounded-full border flex-shrink-0 ${post.published
                                                ? 'border-green-500/30 bg-green-500/10 text-green-400'
                                                : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                                            }`}
                                    >
                                        {post.published ? 'Yayında' : 'Taslak'}
                                    </span>
                                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="text-xs text-text-muted hover:text-accent transition-colors font-mono px-3 py-1 border border-border hover:border-accent/30 rounded-full"
                                        >
                                            Düzenle
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            className="text-xs text-text-muted hover:text-red-400 transition-colors font-mono px-3 py-1 border border-border hover:border-red-500/30 rounded-full"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
