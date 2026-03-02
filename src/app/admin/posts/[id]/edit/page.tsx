'use client';

import { useState, useEffect, FormEvent, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
    params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: Props) {
    const { id } = use(params);
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        published: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then((r) => r.json())
            .then(({ data }) => {
                if (data) {
                    setForm({
                        title: data.title,
                        slug: data.slug,
                        excerpt: data.excerpt || '',
                        content: data.content,
                        cover_image: data.cover_image || '',
                        published: data.published,
                    });
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    function handleChange(field: string, value: string | boolean) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) setError(data.error || 'Hata oluştu');
            else router.push('/admin/dashboard');
        } catch {
            setError('Sunucu hatası');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-void">
            <div className="border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/admin/dashboard" className="text-text-muted hover:text-accent transition-colors text-sm font-mono">
                        ← Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-xs font-mono text-text-muted">Yayında</span>
                            <div
                                onClick={() => handleChange('published', !form.published)}
                                className={`w-10 h-5 rounded-full transition-colors duration-300 relative cursor-pointer ${form.published ? 'bg-accent' : 'bg-border'
                                    }`}
                            >
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${form.published ? 'left-5' : 'left-0.5'
                                    }`} />
                            </div>
                        </label>
                        <button
                            form="edit-form"
                            type="submit"
                            disabled={saving}
                            className="bg-accent hover:bg-accent-glow disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-full transition-all"
                        >
                            {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
                {error && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm font-mono mb-6">
                        ⚠ {error}
                    </div>
                )}
                <form id="edit-form" onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-border focus:border-accent/50 py-3 text-3xl font-grotesk font-bold text-text-primary placeholder-text-dim outline-none transition-colors"
                    />
                    <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5">Slug</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => handleChange('slug', e.target.value)}
                            required
                            className="w-full bg-surface border border-border focus:border-accent/50 rounded-lg px-4 py-3 text-sm font-mono text-text-primary outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5">Özet</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                            rows={2}
                            className="w-full bg-surface border border-border focus:border-accent/50 rounded-lg px-4 py-3 text-sm text-text-primary outline-none transition-colors resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5">İçerik (Markdown)</label>
                        <textarea
                            value={form.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                            required
                            rows={20}
                            className="w-full bg-surface border border-border focus:border-accent/50 rounded-xl px-4 py-4 text-sm font-mono text-text-primary outline-none transition-colors resize-y leading-relaxed"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
