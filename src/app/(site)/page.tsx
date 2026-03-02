import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';
import HeroSection from '@/components/home/HeroSection';

async function getFeaturedPosts(): Promise<Post[]> {
    const { data } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, created_at, category_id')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
    return (data as Post[]) || [];
}

const SKILLS = [
    { name: 'TypeScript', icon: '⬡' },
    { name: 'Next.js', icon: '▲' },
    { name: 'React', icon: '◉' },
    { name: 'Node.js', icon: '⬢' },
    { name: 'PostgreSQL', icon: '◈' },
    { name: 'Supabase', icon: '⚡' },
    { name: 'Docker', icon: '⬡' },
    { name: 'Git', icon: '⌥' },
];

export default async function HomePage() {
    const posts = await getFeaturedPosts();

    return (
        <div className="relative">
            {/* === HERO === */}
            <HeroSection />

            {/* === SKILLS === */}
            <section className="py-20 border-t border-border">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-xs font-mono text-text-dim uppercase tracking-widest text-center mb-10">
                        araçlar & teknolojiler
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {SKILLS.map((skill) => (
                            <div
                                key={skill.name}
                                className="group flex items-center gap-2 border border-border hover:border-accent/30 bg-surface hover:bg-elevated px-4 py-2 rounded-full transition-all duration-300 cursor-default"
                            >
                                <span className="text-accent/60 group-hover:text-accent transition-colors text-sm">{skill.icon}</span>
                                <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors font-mono">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === FEATURED POSTS === */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-2">// son yazılar</p>
                            <h2 className="font-grotesk font-bold text-3xl text-text-primary">Blog</h2>
                        </div>
                        <Link
                            href="/blog"
                            className="text-sm text-text-muted hover:text-accent transition-colors font-mono flex items-center gap-2"
                        >
                            Tümünü gör →
                        </Link>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-border rounded-xl">
                            <p className="text-text-dim font-mono text-sm">// henüz yazı yok</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post, i) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group glass rounded-xl p-6 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs font-mono text-accent/60">0{i + 1}</span>
                                        <span className="text-xs text-text-dim">
                                            {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                    <h3 className="font-grotesk font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* === CTA BANNER === */}
            <section className="py-24 border-t border-border">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full" />
                        <div className="relative glass rounded-2xl p-12 max-w-2xl mx-auto">
                            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">// iletişim</p>
                            <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-text-primary mb-4">
                                Birlikte bir şeyler inşa edelim.
                            </h2>
                            <p className="text-text-muted mb-8">
                                İş teklifleri, proje fikirleri veya sadece merhaba demek için yazabilirsin.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)]"
                            >
                                İletişime Geç
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
