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
        <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>
            <style>{`
                .bl-hero { position:relative; overflow:hidden; min-height:45vh; display:flex; align-items:center; }
                .bl-hero-bg { position:absolute; inset:0;
                    background-image: linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px);
                    background-size: 50px 50px; }
                .bl-hero-orb { position:absolute; width:400px; height:400px; border-radius:50%;
                    background:radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%);
                    filter:blur(60px); pointer-events:none; }
                .bl-hero-inner { position:relative; z-index:1; max-width:860px; margin:0 auto; padding:120px 24px 56px; width:100%; box-sizing:border-box; }
                .bl-label { font-family:'JetBrains Mono',monospace; font-size:12px; color:#6C63FF; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:14px; }
                .bl-h1 { font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:clamp(40px,6vw,72px); letter-spacing:-0.03em; line-height:1.05; margin-bottom:18px; }
                .bl-h1-w { color:#E8E8F0; }
                .bl-h1-g { background:linear-gradient(135deg,#6C63FF 0%,#A78BFA 50%,#E0D7FF 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
                .bl-desc { color:#6B6B80; font-size:17px; line-height:1.75; max-width:520px; margin-bottom:24px; }
                .bl-badge { display:inline-flex; align-items:center; gap:8px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#6B6B80; padding:8px 16px; border-radius:100px; border:1px solid #1E1E2E; background:rgba(17,17,24,0.7); }
                .bl-dot { width:8px; height:8px; border-radius:50%; background:#28CA41; display:inline-block; }

                .bl-content { max-width:860px; margin:0 auto; padding:48px 24px 80px; box-sizing:border-box; }
                .bl-divider { height:1px; background:linear-gradient(90deg,#6C63FF,transparent); margin-bottom:40px; }
                .bl-post { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:28px 0; border-bottom:1px solid #1A1A2A; text-decoration:none; transition:all 0.3s; group:; }
                .bl-post:last-child { border-bottom:none; }
                .bl-post:hover .bl-post-title { color:#A78BFA; }
                .bl-post:hover .bl-post-arrow { transform:translateX(6px); color:#6C63FF; }
                .bl-post:hover { padding-left:8px; }
                .bl-post-meta { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
                .bl-post-num { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(108,99,255,0.4); }
                .bl-post-date { font-family:'JetBrains Mono',monospace; font-size:11px; color:#3A3A50; }
                .bl-post-read { font-family:'JetBrains Mono',monospace; font-size:11px; color:#3A3A50; }
                .bl-post-sep { color:#3A3A50; font-size:11px; }
                .bl-post-title { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:20px; color:#E8E8F0; margin-bottom:6px; transition:color 0.3s; line-height:1.3; }
                .bl-post-excerpt { color:#6B6B80; font-size:14px; line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
                .bl-post-arrow { width:18px; height:18px; color:#3A3A50; flex-shrink:0; transition:all 0.3s; }

                .bl-empty { text-align:center; padding:80px 24px; border:1px dashed #1E1E2E; border-radius:16px; }
                .bl-empty-icon { font-size:48px; margin-bottom:16px; }
                .bl-empty-text { font-family:'JetBrains Mono',monospace; font-size:13px; color:#3A3A50; }

                @media (max-width:640px) {
                    .bl-hero-inner { padding:100px 20px 40px; }
                    .bl-content { padding:32px 20px 60px; }
                    .bl-post { flex-direction:column; align-items:flex-start; gap:8px; }
                    .bl-post-arrow { align-self:flex-end; }
                    .bl-post:hover { padding-left:4px; }
                }
            `}</style>

            {/* ── HERO ── */}
            <section className="bl-hero">
                <div className="bl-hero-bg" />
                <div className="bl-hero-orb" style={{ right: '-80px', top: '-80px' }} />
                <div className="bl-hero-orb" style={{ left: '-120px', bottom: '-60px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />
                <div className="bl-hero-inner">
                    <p className="bl-label">// düşünceler &amp; notlar</p>
                    <h1 className="bl-h1">
                        <span className="bl-h1-w">Teknik </span>
                        <span className="bl-h1-g">Yazılar</span>
                    </h1>
                    <p className="bl-desc">
                        Yazılım mimarisi, sistem tasarımı ve öğrendiklerim üzerine dürüst ve teknik notlar.
                    </p>
                    <div className="bl-badge">
                        <span className="bl-dot" />
                        {posts.length > 0 ? `${posts.length} yayınlanan yazı` : 'Yazılar yükleniyor...'}
                    </div>
                </div>
            </section>

            {/* ── POSTS ── */}
            <div className="bl-content">
                <div className="bl-divider" />

                {posts.length === 0 ? (
                    <div className="bl-empty">
                        <div className="bl-empty-icon">◉</div>
                        <p className="bl-empty-text">// henüz yazı yok — yakında...</p>
                    </div>
                ) : (
                    <div>
                        {posts.map((post, i) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="bl-post"
                                style={{ display: 'flex' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div className="bl-post-meta">
                                        <span className="bl-post-num">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="bl-post-sep">·</span>
                                        <span className="bl-post-date">
                                            {new Date(post.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                        <span className="bl-post-sep">·</span>
                                        <span className="bl-post-read">{estimateReadTime(post.content)} dk okuma</span>
                                    </div>
                                    <div className="bl-post-title">{post.title}</div>
                                    {post.excerpt && (
                                        <div className="bl-post-excerpt">{post.excerpt}</div>
                                    )}
                                </div>
                                <svg className="bl-post-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
