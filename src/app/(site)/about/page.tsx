'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── Canvas Grid ─── */
function CanvasGrid() {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        let raf: number; let off = 0;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            off = (off + 0.15) % 50;
            ctx.strokeStyle = 'rgba(108,99,255,0.05)'; ctx.lineWidth = 1;
            for (let x = -50 + off; x < canvas.width + 50; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
            for (let y = -50 + off; y < canvas.height + 50; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
            raf = requestAnimationFrame(draw);
        };
        resize(); draw();
        window.addEventListener('resize', resize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={ref} className="ab-canvas" />;
}

/* ─── Counter ─── */
function Counter({ to, suffix = '' }: { to: number | string; suffix?: string }) {
    const [val, setVal] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!started || typeof to !== 'number') return;
        let n = 0; const step = Math.ceil(to / 40);
        const iv = setInterval(() => { n += step; if (n >= to) { setVal(to); clearInterval(iv); } else setVal(n); }, 30);
        return () => clearInterval(iv);
    }, [started, to]);
    return <div ref={ref} className="ab-counter-num">{typeof to === 'number' ? val : to}{suffix}</div>;
}

/* ─── Skill Bar ─── */
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setWidth(level), 100); }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [level]);
    return (
        <div ref={ref} className="ab-skill-item">
            <div className="ab-skill-header">
                <span className="ab-skill-name">{name}</span>
                <span className="ab-skill-pct">{level}%</span>
            </div>
            <div className="ab-skill-track">
                <div className="ab-skill-fill" style={{ width: `${width}%`, background: `linear-gradient(90deg, #6C63FF, ${color})`, boxShadow: `0 0 8px ${color}60` }} />
            </div>
        </div>
    );
}

/* ─── Data ─── */
const TIMELINE = [
    { year: '2024 — Günümüz', title: 'Full-Stack Developer', desc: 'Modern web uygulamaları, RESTful API tasarımı, veritabanı mimarisi ve sistem optimizasyonu üzerine aktif geliştirme.', tags: ['Next.js', 'TypeScript', 'Supabase'], accent: '#6C63FF' },
    { year: '2022 — 2024', title: 'Backend Geliştirici', desc: 'Node.js mikro-servisleri, PostgreSQL şema tasarımı ve production sistemlerin bakımı ile geliştirmesi.', tags: ['Node.js', 'PostgreSQL', 'Docker'], accent: '#A78BFA' },
    { year: '2020 — 2022', title: 'Yazılım Yolculuğu Başladı', desc: 'Temel algoritmalar, veri yapıları ve web teknolojilerine giriş. İlk gerçek projelerle ellerin kod yorgunluğunu tanıması.', tags: ['JavaScript', 'HTML/CSS', 'Git'], accent: '#7C6AFF' },
];
const STACK = [
    { name: 'TypeScript', level: 95, color: '#3178C6' },
    { name: 'Next.js', level: 92, color: '#E8E8F0' },
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Node.js', level: 88, color: '#68A063' },
    { name: 'PostgreSQL', level: 82, color: '#336791' },
    { name: 'Docker', level: 70, color: '#2496ED' },
];
const VALUES = [
    { icon: '⬡', title: 'Temiz Mimari', desc: 'Karmaşık problemlere zarif çözümler. Kod, okunmak için yazılır.' },
    { icon: '◈', title: 'Sistem Düşüncesi', desc: "Her component'in neden orada olduğunu bilerek tasarlamak." },
    { icon: '▲', title: 'Sürekli Öğrenme', desc: 'Teknoloji durağan değil. Ben de durağan kalmıyorum.' },
];
const TOOLS = ['VS Code', 'Supabase', 'Postman', 'Git', 'Figma', 'Linux', 'Tailwind CSS', 'Prisma'];

/* ─── Main Page ─── */
export default function AboutPage() {
    return (
        <div className="ab-root">
            <style>{`
        .ab-root { background: #0A0A0F; min-height: 100vh; overflow-x: hidden; }
        .ab-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

        /* ── HERO ── */
        .ab-hero { position: relative; min-height: 70vh; display: flex; align-items: center; overflow: hidden; }
        .ab-hero-orb1 { position: absolute; width: 500px; height: 500px; border-radius: 50%; left: -150px; top: -150px; background: radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%); filter: blur(60px); pointer-events: none; }
        .ab-hero-orb2 { position: absolute; width: 350px; height: 350px; border-radius: 50%; right: 0; bottom: -80px; background: radial-gradient(circle, rgba(139,133,255,0.06) 0%, transparent 70%); filter: blur(50px); pointer-events: none; }
        .ab-hero-inner { position: relative; z-index: 1; max-width: 1152px; margin: 0 auto; padding: 120px 24px 64px; width: 100%; box-sizing: border-box; }
        .ab-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .ab-hero-label { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #6C63FF; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
        .ab-hero-h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 20px; }
        .ab-hero-h1-plain { display: block; font-size: clamp(36px, 5vw, 72px); color: #E8E8F0; }
        .ab-hero-h1-grad { display: block; font-size: clamp(36px, 5vw, 72px); background: linear-gradient(135deg,#6C63FF 0%,#A78BFA 45%,#E0D7FF 100%); -webkit-background-clip: text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ab-hero-desc { color: #6B6B80; font-size: 16px; line-height: 1.75; margin-bottom: 28px; max-width: 440px; }
        .ab-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .ab-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#6C63FF,#8B85FF); color:white; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:14px; padding:12px 24px; border-radius:100px; text-decoration:none; transition:all 0.3s; white-space:nowrap; }
        .ab-btn-secondary { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#6B6B80; font-family:'Space Grotesk',sans-serif; font-weight:500; font-size:14px; padding:12px 24px; border-radius:100px; border:1px solid #1E1E2E; text-decoration:none; transition:all 0.3s; white-space:nowrap; }

        /* Identity card */
        .ab-card { background:rgba(17,17,24,0.85); backdrop-filter:blur(20px); border:1px solid rgba(108,99,255,0.15); border-radius:20px; overflow:hidden; box-shadow:0 0 60px rgba(108,99,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04); }
        .ab-card-header { padding:16px 20px; border-bottom:1px solid #1E1E2E; display:flex; align-items:center; gap:12px; background:rgba(10,10,15,0.4); }
        .ab-card-avatar { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#6C63FF,#A78BFA); display:flex; align-items:center; justify-content:center; font-size:20px; font-family:'Space Grotesk',sans-serif; font-weight:700; color:white; flex-shrink:0; }
        .ab-card-name { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:14px; color:#E8E8F0; margin:0; }
        .ab-card-handle { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6C63FF; margin:0; }
        .ab-card-status { margin-left:auto; display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .ab-card-dot { width:8px; height:8px; border-radius:50%; background:#28CA41; display:block; flex-shrink:0; }
        .ab-card-online { font-family:'JetBrains Mono',monospace; font-size:10px; color:#6B6B80; }
        .ab-card-body { padding:16px 20px; font-family:'JetBrains Mono',monospace; font-size:12px; line-height:2; }
        .ab-card-key { color:#6B6B80; }
        .ab-card-val { color:#A78BFA; }
        .ab-card-badge { margin-top:12px; padding:9px 12px; background:rgba(108,99,255,0.06); border-radius:8px; border:1px solid rgba(108,99,255,0.1); display:flex; align-items:center; gap:8px; }
        .ab-card-badge-ok { color:#28CA41; }
        .ab-card-badge-txt { color:#6B6B80; font-size:12px; }

        /* ── STATS ── */
        .ab-stats { border-top:1px solid #1E1E2E; border-bottom:1px solid #1E1E2E; padding:40px 24px; background:rgba(17,17,24,0.5); }
        .ab-stats-inner { max-width:1152px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:24px; text-align:center; }
        .ab-counter-num { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:36px; background:linear-gradient(135deg,#6C63FF,#A78BFA); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; }
        .ab-stat-label { font-family:'JetBrains Mono',monospace; font-size:10px; color:#3A3A50; letter-spacing:0.1em; text-transform:uppercase; margin-top:6px; }

        /* ── CONTENT ── */
        .ab-content { max-width:1152px; margin:0 auto; padding:64px 24px; box-sizing:border-box; }
        .ab-two-col { display:grid; grid-template-columns:1fr 1fr; gap:48px; margin-bottom:80px; align-items:start; }
        .ab-section-label { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6C63FF; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:8px; }
        .ab-section-title { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:28px; color:#E8E8F0; margin-bottom:28px; }

        /* Skill bars */
        .ab-skill-item { margin-bottom:16px; }
        .ab-skill-header { display:flex; justify-content:space-between; margin-bottom:6px; }
        .ab-skill-name { font-family:'JetBrains Mono',monospace; font-size:13px; color:#E8E8F0; }
        .ab-skill-pct { font-family:'JetBrains Mono',monospace; font-size:12px; color:#6B6B80; }
        .ab-skill-track { height:4px; background:#1E1E2E; border-radius:2px; overflow:hidden; }
        .ab-skill-fill { height:100%; border-radius:2px; transition:width 1.2s cubic-bezier(0.4,0,0.2,1); }

        /* Value cards */
        .ab-values { display:flex; flex-direction:column; gap:12px; }
        .ab-value-card { padding:16px 20px; border-radius:12px; background:rgba(17,17,24,0.7); border:1px solid rgba(108,99,255,0.1); display:flex; gap:14px; align-items:flex-start; }
        .ab-value-icon { font-size:18px; color:#6C63FF; flex-shrink:0; margin-top:2px; }
        .ab-value-title { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:14px; color:#E8E8F0; margin-bottom:4px; }
        .ab-value-desc { font-family:'Inter',sans-serif; font-size:13px; color:#6B6B80; line-height:1.6; }
        .ab-tools-card { padding:16px 20px; border-radius:12px; background:rgba(17,17,24,0.7); border:1px solid rgba(108,99,255,0.1); margin-top:12px; }
        .ab-tools-label { font-family:'JetBrains Mono',monospace; font-size:10px; color:#3A3A50; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px; }
        .ab-tools-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .ab-tool-tag { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6B6B80; padding:4px 10px; border-radius:100px; border:1px solid #1E1E2E; background:rgba(10,10,15,0.5); }

        /* ── TIMELINE ── */
        .ab-timeline { margin-bottom:64px; }
        .ab-timeline-line { position:relative; padding-left:28px; }
        .ab-timeline-vline { position:absolute; left:7px; top:0; bottom:0; width:1px; background:linear-gradient(180deg,#6C63FF,#1E1E2E); }
        .ab-tl-item { position:relative; margin-bottom:24px; }
        .ab-tl-dot { position:absolute; left:-24px; top:24px; width:14px; height:14px; border-radius:50%; border:2px solid #0A0A0F; }
        .ab-tl-card { padding:20px 22px; border-radius:16px; background:rgba(17,17,24,0.8); border:1px solid rgba(108,99,255,0.1); }
        .ab-tl-top { display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
        .ab-tl-title { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:18px; color:#E8E8F0; margin:0; }
        .ab-tl-year { font-family:'JetBrains Mono',monospace; font-size:11px; padding:3px 10px; border-radius:100px; }
        .ab-tl-desc { font-family:'Inter',sans-serif; font-size:14px; color:#6B6B80; line-height:1.7; margin-bottom:10px; }
        .ab-tl-tags { display:flex; gap:6px; flex-wrap:wrap; }
        .ab-tl-tag { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6B6B80; padding:3px 10px; border-radius:100px; background:rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.15); }

        /* ── CTA ── */
        .ab-cta { text-align:center; padding:48px 32px; border-radius:20px; background:rgba(17,17,24,0.8); border:1px solid rgba(108,99,255,0.12); position:relative; overflow:hidden; }
        .ab-cta-glow { position:absolute; inset:0; background:radial-gradient(ellipse at center,rgba(108,99,255,0.06) 0%,transparent 70%); pointer-events:none; }
        .ab-cta-label { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6C63FF; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:14px; }
        .ab-cta-title { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:28px; color:#E8E8F0; margin-bottom:10px; }
        .ab-cta-sub { color:#6B6B80; font-size:15px; margin-bottom:28px; }

        /* ── MOBILE BREAKPOINTS ── */
        @media (max-width: 768px) {
          .ab-hero-inner { padding: 100px 20px 48px; }
          .ab-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .ab-card { display: none; }  /* Hide identity card on mobile — hero is enough */
          .ab-hero-desc { font-size: 15px; max-width: 100%; }
          .ab-hero-btns { gap: 10px; }
          .ab-btn-primary, .ab-btn-secondary { font-size: 13px; padding: 11px 20px; }

          .ab-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .ab-counter-num { font-size: 28px; }

          .ab-content { padding: 48px 20px; }
          .ab-two-col { grid-template-columns: 1fr; gap: 40px; margin-bottom: 48px; }
          .ab-section-title { font-size: 24px; margin-bottom: 20px; }

          .ab-timeline-line { padding-left: 22px; }
          .ab-tl-dot { left: -18px; width: 12px; height: 12px; }
          .ab-tl-card { padding: 16px; }
          .ab-tl-title { font-size: 16px; }
          .ab-tl-top { gap: 6px; }

          .ab-cta { padding: 36px 20px; border-radius: 16px; }
          .ab-cta-title { font-size: 24px; }
        }

        @media (max-width: 480px) {
          .ab-hero-h1-plain, .ab-hero-h1-grad { font-size: 32px; }
          .ab-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .ab-counter-num { font-size: 26px; }
          .ab-stat-label { font-size: 9px; }
          .ab-tl-year { font-size: 10px; }
          .ab-section-title { font-size: 22px; }
          .ab-cta-title { font-size: 22px; }
        }
      `}</style>

            {/* ── HERO ── */}
            <section className="ab-hero">
                <CanvasGrid />
                <div className="ab-hero-orb1" />
                <div className="ab-hero-orb2" />
                <div className="ab-hero-inner">
                    <div className="ab-hero-grid">
                        {/* Left */}
                        <div>
                            <p className="ab-hero-label">// hakkımda</p>
                            <h1 className="ab-hero-h1">
                                <span className="ab-hero-h1-plain">Merhaba,</span>
                                <span className="ab-hero-h1-grad">ben arkhe.</span>
                            </h1>
                            <p className="ab-hero-desc">
                                Full-stack developer. Sistemlerin özüne inmek, ölçeklenebilir mimariler kurmak ve temiz kod yazmak benim için sadece bir iş değil — bir felsefe.
                            </p>
                            <div className="ab-hero-btns">
                                <Link href="/projects" className="ab-btn-primary">Projeleri Gör →</Link>
                                <Link href="/contact" className="ab-btn-secondary">İletişim</Link>
                            </div>
                        </div>

                        {/* Right — Identity card (hidden on mobile via CSS) */}
                        <div className="ab-card">
                            <div className="ab-card-header">
                                <div className="ab-card-avatar">α</div>
                                <div>
                                    <p className="ab-card-name">rahmicaglar</p>
                                    <p className="ab-card-handle">@arkhe</p>
                                </div>
                                <div className="ab-card-status">
                                    <span className="ab-card-dot" />
                                    <span className="ab-card-online">online</span>
                                </div>
                            </div>
                            <div className="ab-card-body">
                                {[['role', '"Full-Stack Developer"'], ['location', '"Türkiye 🇹🇷"'], ['experience', '"3+ yıl"'], ['open_to', '"remote / hybrid"'], ['focus', '"Next.js + TypeScript"']].map(([k, v]) => (
                                    <div key={k}><span className="ab-card-key">{k}: </span><span className="ab-card-val">{v}</span></div>
                                ))}
                                <div className="ab-card-badge">
                                    <span className="ab-card-badge-ok">✓</span>
                                    <span className="ab-card-badge-txt">yeni fırsatlara açık</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="ab-stats">
                <div className="ab-stats-inner">
                    {[{ to: 3, suffix: '+', label: 'Yıl Deneyim' }, { to: 20, suffix: '+', label: 'Tamamlanan Proje' }, { to: 8, suffix: '', label: 'Teknoloji' }, { to: '∞', suffix: '', label: 'Satır Kod' }].map(s => (
                        <div key={s.label}>
                            <Counter to={s.to as number} suffix={s.suffix} />
                            <p className="ab-stat-label">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CONTENT ── */}
            <div className="ab-content">

                {/* Skills + Values */}
                <div className="ab-two-col">
                    <div>
                        <p className="ab-section-label">// beceriler</p>
                        <h2 className="ab-section-title">Teknoloji Stack&#39;im</h2>
                        {STACK.map(s => <SkillBar key={s.name} {...s} />)}
                    </div>
                    <div>
                        <p className="ab-section-label">// felsefe</p>
                        <h2 className="ab-section-title">Değerlerim</h2>
                        <div className="ab-values">
                            {VALUES.map(v => (
                                <div key={v.title} className="ab-value-card">
                                    <span className="ab-value-icon">{v.icon}</span>
                                    <div>
                                        <p className="ab-value-title">{v.title}</p>
                                        <p className="ab-value-desc">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="ab-tools-card">
                                <p className="ab-tools-label">Kullandığım araçlar</p>
                                <div className="ab-tools-tags">
                                    {TOOLS.map(t => <span key={t} className="ab-tool-tag">{t}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="ab-timeline">
                    <p className="ab-section-label">// deneyim</p>
                    <h2 className="ab-section-title">Yolculuk</h2>
                    <div className="ab-timeline-line">
                        <div className="ab-timeline-vline" />
                        {TIMELINE.map((item, i) => (
                            <div key={i} className="ab-tl-item">
                                <div className="ab-tl-dot" style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}80` }} />
                                <div className="ab-tl-card">
                                    <div className="ab-tl-top">
                                        <h3 className="ab-tl-title">{item.title}</h3>
                                        <span className="ab-tl-year" style={{ color: item.accent, background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>{item.year}</span>
                                    </div>
                                    <p className="ab-tl-desc">{item.desc}</p>
                                    <div className="ab-tl-tags">
                                        {item.tags.map(t => <span key={t} className="ab-tl-tag">{t}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="ab-cta">
                    <div className="ab-cta-glow" />
                    <p className="ab-cta-label">// birlikte çalışalım</p>
                    <h2 className="ab-cta-title">Hazır mısın?</h2>
                    <p className="ab-cta-sub">Projeni hayata geçirmek için bir mesaj yeter.</p>
                    <Link href="/contact" className="ab-btn-primary" style={{ display: 'inline-flex', boxShadow: '0 0 30px rgba(108,99,255,0.3)' }}>
                        İletişime Geç
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
