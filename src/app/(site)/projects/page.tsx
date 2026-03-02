import type { Metadata } from 'next';
import { getPublicRepos } from '@/lib/github';
import { GitHubRepo } from '@/types';

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'GitHub projelerim — açık kaynak çalışmalar ve kişisel projeler.',
};

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
    Rust: '#CE422B',
    Go: '#00ADD8',
    CSS: '#563D7C',
    HTML: '#E34F26',
    Shell: '#89E051',
    default: '#6C63FF',
};

function LanguageDot({ lang }: { lang: string | null }) {
    if (!lang) return null;
    const color = LANG_COLORS[lang] || LANG_COLORS.default;
    return (
        <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-text-muted">{lang}</span>
        </span>
    );
}

export default async function ProjectsPage() {
    const repos: GitHubRepo[] = await getPublicRepos();

    const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">// github projelerim</p>
                    <h1 className="font-grotesk font-bold text-5xl md:text-6xl text-text-primary mb-4">
                        Projeler
                    </h1>
                    <p className="text-text-muted text-xl max-w-2xl">
                        GitHub üzerindeki açık kaynak çalışmalarım. Otomatik olarak senkronize edilir.
                    </p>
                    <a
                        href="https://github.com/rahmicaglar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:text-accent-glow transition-colors font-mono"
                    >
                        → github.com/rahmicaglar
                    </a>
                </div>

                {/* Language filter info */}
                {languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-10">
                        {languages.map((lang) => (
                            <span
                                key={lang}
                                className="flex items-center gap-1.5 border border-border bg-surface px-3 py-1 rounded-full text-xs text-text-muted"
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: LANG_COLORS[lang] || LANG_COLORS.default }}
                                />
                                {lang}
                            </span>
                        ))}
                    </div>
                )}

                {/* Grid */}
                {repos.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-border rounded-xl">
                        <p className="text-text-dim font-mono text-sm">// GitHub API&apos;den repolar yüklenemedi</p>
                        <p className="text-text-dim font-mono text-xs mt-2">Rate limit aşıldı veya bağlantı hatası</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {repos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group glass rounded-xl p-5 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3"
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm8-12h2v2h-2zm0 4h2v2h-2zm4 4h2v2h-2zm-4 0h2v10h-2zm4 4h2v6h-2z" />
                                        </svg>
                                        <span className="font-mono text-sm text-text-primary group-hover:text-accent transition-colors font-medium truncate">
                                            {repo.name}
                                        </span>
                                    </div>
                                    <svg className="w-3.5 h-3.5 text-text-dim group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>

                                {/* Description */}
                                <p className="text-text-muted text-xs leading-relaxed line-clamp-2 flex-1">
                                    {repo.description || 'Açıklama yok'}
                                </p>

                                {/* Topics */}
                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {repo.topics.slice(0, 3).map((topic) => (
                                            <span key={topic} className="text-xs bg-accent/10 text-accent/70 px-2 py-0.5 rounded-full font-mono">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                    <LanguageDot lang={repo.language} />
                                    <div className="flex items-center gap-3 text-xs text-text-muted">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 2a3 3 0 013 3c0 1.31-.84 2.43-2 2.83V9c0 .55.45 1 1 1h7a1 1 0 001-1V7.83A3 3 0 0118 5a3 3 0 11-3.83 2.89L9.83 8c-.27 0-.54.07-.83.07V10h-1V7.83A3.001 3.001 0 016 2z" />
                                            </svg>
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
