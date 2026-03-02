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

export default async function ProjectsPage() {
    const repos: GitHubRepo[] = await getPublicRepos();
    const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

    return (
        <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>
            <style>{`
                .pr-hero { position:relative; overflow:hidden; min-height:45vh; display:flex; align-items:center; }
                .pr-bg { position:absolute; inset:0;
                    background-image: linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px);
                    background-size: 50px 50px; }
                .pr-orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
                .pr-inner { position:relative; z-index:1; max-width:1152px; margin:0 auto; padding:120px 24px 56px; width:100%; box-sizing:border-box; }
                .pr-label { font-family:'JetBrains Mono',monospace; font-size:12px; color:#6C63FF; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:14px; }
                .pr-h1 { font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:clamp(40px,6vw,72px); letter-spacing:-0.03em; line-height:1.05; margin-bottom:18px; }
                .pr-h1-w { color:#E8E8F0; }
                .pr-h1-g { background:linear-gradient(135deg,#6C63FF 0%,#A78BFA 50%,#E0D7FF 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
                .pr-desc { color:#6B6B80; font-size:17px; line-height:1.75; max-width:520px; margin-bottom:24px; }
                .pr-gh-link { font-family:'JetBrains Mono',monospace; font-size:13px; color:#6C63FF; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:color 0.3s; }
                .pr-gh-link:hover { color:#A78BFA; }

                .pr-content { max-width:1152px; margin:0 auto; padding:40px 24px 80px; box-sizing:border-box; }
                .pr-divider { height:1px; background:linear-gradient(90deg,#6C63FF,transparent); margin-bottom:32px; }
                .pr-langs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
                .pr-lang-tag { display:inline-flex; align-items:center; gap:6px; font-family:'JetBrains Mono',monospace; font-size:11px; color:#6B6B80; padding:5px 12px; border-radius:100px; border:1px solid #1E1E2E; background:rgba(17,17,24,0.8); }
                .pr-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
                .pr-card { display:flex; flex-direction:column; gap:12px; padding:20px; border-radius:16px; background:rgba(17,17,24,0.8); border:1px solid rgba(108,99,255,0.08); text-decoration:none; transition:all 0.3s; }
                .pr-card:hover { border-color:rgba(108,99,255,0.25); transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,99,255,0.1); }
                .pr-card:hover .pr-card-name { color:#A78BFA; }
                .pr-card-top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
                .pr-card-name { font-family:'JetBrains Mono',monospace; font-size:13px; color:#E8E8F0; font-weight:600; transition:color 0.3s; }
                .pr-card-ext { width:14px; height:14px; color:#3A3A50; flex-shrink:0; transition:color 0.3s; }
                .pr-card:hover .pr-card-ext { color:#6C63FF; }
                .pr-card-desc { font-size:12px; color:#6B6B80; line-height:1.6; flex:1; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
                .pr-card-topics { display:flex; flex-wrap:wrap; gap:4px; }
                .pr-topic { font-family:'JetBrains Mono',monospace; font-size:10px; color:rgba(167,139,250,0.7); padding:2px 8px; border-radius:100px; background:rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.12); }
                .pr-card-footer { display:flex; align-items:center; justify-content:space-between; padding-top:12px; border-top:1px solid #1A1A2A; }
                .pr-lang { display:flex; align-items:center; gap:5px; }
                .pr-lang-dot { width:8px; height:8px; border-radius:50%; }
                .pr-lang-txt { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6B6B80; }
                .pr-stats { display:flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:11px; color:#6B6B80; }
                .pr-stat { display:flex; align-items:center; gap:3px; }

                .pr-empty { text-align:center; padding:80px 24px; border:1px dashed #1E1E2E; border-radius:16px; }

                @media (max-width:900px) { .pr-grid { grid-template-columns:repeat(2,1fr); } }
                @media (max-width:580px) {
                    .pr-grid { grid-template-columns:1fr; }
                    .pr-inner { padding:100px 20px 40px; }
                    .pr-content { padding:32px 20px 60px; }
                }
            `}</style>

            {/* ── HERO ── */}
            <section className="pr-hero">
                <div className="pr-bg" />
                <div className="pr-orb" style={{ width: '400px', height: '400px', right: '-80px', top: '-80px', background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)' }} />
                <div className="pr-orb" style={{ width: '280px', height: '280px', left: '-60px', bottom: '-40px', background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />
                <div className="pr-inner">
                    <p className="pr-label">// github / açık kaynak</p>
                    <h1 className="pr-h1">
                        <span className="pr-h1-w">Benim </span>
                        <span className="pr-h1-g">Projelerim</span>
                    </h1>
                    <p className="pr-desc">
                        GitHub üzerindeki açık kaynak çalışmalarım ve kişisel projelerim. Otomatik olarak senkronize edilir.
                    </p>
                    <a
                        href="https://github.com/rahmicaglar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pr-gh-link"
                    >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        github.com/rahmicaglar →
                    </a>
                </div>
            </section>

            {/* ── CONTENT ── */}
            <div className="pr-content">
                <div className="pr-divider" />

                {/* Language tags */}
                {languages.length > 0 && (
                    <div className="pr-langs">
                        {languages.map((lang) => (
                            <span key={lang} className="pr-lang-tag">
                                <span className="pr-lang-dot" style={{ backgroundColor: LANG_COLORS[lang] || LANG_COLORS.default }} />
                                {lang}
                            </span>
                        ))}
                    </div>
                )}

                {/* Grid */}
                {repos.length === 0 ? (
                    <div className="pr-empty">
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#3A3A50' }}>
                            // GitHub API&apos;den repolar yüklenemedi
                        </p>
                    </div>
                ) : (
                    <div className="pr-grid">
                        {repos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pr-card"
                            >
                                <div className="pr-card-top">
                                    <span className="pr-card-name">{repo.name}</span>
                                    <svg className="pr-card-ext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>

                                <p className="pr-card-desc">{repo.description || 'Açıklama yok'}</p>

                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="pr-card-topics">
                                        {repo.topics.slice(0, 3).map((t) => (
                                            <span key={t} className="pr-topic">{t}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="pr-card-footer">
                                    {repo.language ? (
                                        <div className="pr-lang">
                                            <span className="pr-lang-dot" style={{ backgroundColor: LANG_COLORS[repo.language] || LANG_COLORS.default }} />
                                            <span className="pr-lang-txt">{repo.language}</span>
                                        </div>
                                    ) : <span />}
                                    <div className="pr-stats">
                                        <span className="pr-stat">
                                            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="pr-stat">
                                            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
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
