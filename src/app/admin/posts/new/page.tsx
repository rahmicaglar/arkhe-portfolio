'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

export default function NewPostPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        published: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(false);

    function handleChange(field: string, value: string | boolean) {
        setForm((prev) => {
            const updated = { ...prev, [field]: value };
            if (field === 'title' && typeof value === 'string') {
                updated.slug = generateSlug(value);
            }
            return updated;
        });
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, tags: [] }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Hata oluştu');
            } else {
                router.push('/admin/dashboard');
            }
        } catch {
            setError('Sunucu bağlantı hatası');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-void">
            {/* Admin Navbar */}
            <div className="border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/dashboard" className="text-text-muted hover:text-accent transition-colors text-sm font-mono">
                            ← Dashboard
                        </Link>
                        <span className="text-border">|</span>
                        <span className="text-sm font-grotesk text-text-primary">Yeni Yazı</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setPreview(!preview)}
                            className="text-sm text-text-muted hover:text-accent transition-colors font-mono border border-border hover:border-accent/30 px-3 py-1.5 rounded-full"
                        >
                            {preview ? 'Düzenle' : 'Önizle'}
                        </button>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-xs font-mono text-text-muted">Yayınla</span>
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
                            form="post-form"
                            type="submit"
                            disabled={loading}
                            className="bg-accent hover:bg-accent-glow disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-300"
                        >
                            {loading ? 'Kaydediliyor...' : form.published ? 'Yayınla' : 'Taslak Kaydet'}
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

                <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            required
                            placeholder="Yazı başlığı..."
                            className="w-full bg-transparent border-b border-border focus:border-accent/50 py-3 text-3xl font-grotesk font-bold text-text-primary placeholder-text-dim outline-none transition-colors duration-300"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5">Slug</label>
                        <div className="flex items-center gap-2">
                            <span className="text-text-dim font-mono text-sm">/blog/</span>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                required
                                className="flex-1 bg-surface border border-border focus:border-accent/50 rounded-lg px-3 py-2 text-sm font-mono text-text-primary outline-none transition-colors"
                                placeholder="yazi-slug"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5">Özet</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                            rows={2}
                            className="w-full bg-surface border border-border focus:border-accent/50 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-dim outline-none transition-colors resize-none"
                            placeholder="Yazının kısa özeti (SEO ve liste sayfası için)"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-mono text-text-muted">İçerik (Markdown)</label>
                            <span className="text-xs font-mono text-text-dim">
                                {form.content.split(/\s+/).filter(Boolean).length} kelime
                            </span>
                        </div>
                        <textarea
                            value={form.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                            required
                            rows={20}
                            className="w-full bg-surface border border-border focus:border-accent/50 rounded-xl px-4 py-4 text-sm font-mono text-text-primary placeholder-text-dim outline-none transition-colors resize-y leading-relaxed"
                            placeholder="# Başlık&#10;&#10;Yazınızı buraya yazın. Markdown desteklenmektedir.&#10;&#10;```typescript&#10;const hello = 'world';&#10;```"
                        />
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-xs font-mono text-text-muted mb-1.5">Kapak Görseli URL (opsiyonel)</label>
                        <input
                            type="url"
                            value={form.cover_image}
                            onChange={(e) => handleChange('cover_image', e.target.value)}
                            className="w-full bg-surface border border-border focus:border-accent/50 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-dim outline-none transition-colors"
                            placeholder="https://..."
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
