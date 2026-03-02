'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── Animated Canvas Grid (hero ile aynı) ─── */
function CanvasGrid() {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let raf: number;
        let off = 0;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            off = (off + 0.15) % 50;
            ctx.strokeStyle = 'rgba(108,99,255,0.05)';
            ctx.lineWidth = 1;
            for (let x = -50 + off; x < canvas.width + 50; x += 50) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = -50 + off; y < canvas.height + 50; y += 50) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
            raf = requestAnimationFrame(draw);
        };
        resize(); draw();
        window.addEventListener('resize', resize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─── Data ─── */
const TIMELINE = [
    {
        year: '2024 — Günümüz',
        title: 'Full-Stack Developer',
        desc: 'Modern web uygulamaları, RESTful API tasarımı, veritabanı mimarisi ve sistem optimizasyonu üzerine aktif geliştirme.',
        tags: ['Next.js', 'TypeScript', 'Supabase'],
        accent: '#6C63FF',
    },
    {
        year: '2022 — 2024',
        title: 'Backend Geliştirici',
        desc: 'Node.js mikro-servisleri, PostgreSQL şema tasarımı ve production sistemlerin bakımı ile geliştirmesi.',
        tags: ['Node.js', 'PostgreSQL', 'Docker'],
        accent: '#A78BFA',
    },
    {
        year: '2020 — 2022',
        title: 'Yazılım Yolculuğu Başladı',
        desc: 'Temel algoritmalar, veri yapıları ve web teknolojilerine giriş. İlk gerçek projelerle ellerin kod yorgunluğunu tanıması.',
        tags: ['JavaScript', 'HTML/CSS', 'Git'],
        accent: '#7C6AFF',
    },
];

const STACK = [
    { name: 'TypeScript', level: 95, color: '#3178C6' },
    { name: 'Next.js', level: 92, color: '#E8E8F0' },
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Node.js', level: 88, color: '#68A063' },
    { name: 'PostgreSQL', level: 82, color: '#336791' },
    { name: 'Docker', level: 70, color: '#2496ED' },
];

const TOOLS = [
    'VS Code', 'Supabase', 'Postman', 'Git', 'Figma', 'Linux', 'Tailwind CSS', 'Prisma',
];

const VALUES = [
    { icon: '⬡', title: 'Temiz Mimari', desc: 'Karmaşık problemlere zarif çözümler. Kod, okunmak için yazılır.' },
    { icon: '◈', title: 'Sistem Düşüncesi', desc: 'Her component\'in neden orada olduğunu bilerek tasarlamak.' },
    { icon: '▲', title: 'Sürekli Öğrenme', desc: 'Teknoloji durağan değil. Ben de durağan kalmıyorum.' },
];

/* ─── Animated number counter ─── */
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
        let start = 0;
        const step = Math.ceil(to / 40);
        const iv = setInterval(() => {
            start += step;
            if (start >= to) { setVal(to); clearInterval(iv); }
            else setVal(start);
        }, 30);
        return () => clearInterval(iv);
    }, [started, to]);

    return (
        <div ref={ref} style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '40px',
            background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1,
        }}>
            {typeof to === 'number' ? val : to}{suffix}
        </div>
    );
}

/* ─── Skill bar component ─── */
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setTimeout(() => setWidth(level), 100);
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [level]);

    return (
        <div ref={ref} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#E8E8F0' }}>{name}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6B6B80' }}>{level}%</span>
            </div>
            <div style={{ height: '4px', background: '#1E1E2E', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%', width: `${width}%`,
                    background: `linear-gradient(90deg, #6C63FF, ${color})`,
                    borderRadius: '2px',
                    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 0 8px ${color}60`,
                }} />
            </div>
        </div>
    );
}

/* ─── Main Page ─── */
export default function AboutPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    return (
        <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>

            {/* ── HEADER HERO BAND ── */}
            <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <CanvasGrid />

                {/* Mouse-tracked glow */}
                <div style={{
                    position: 'fixed', pointerEvents: 'none', zIndex: 0,
                    width: '500px', height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
                    left: mousePos.x - 250, top: mousePos.y - 250,
                    transition: 'left 0.15s ease, top 0.15s ease',
                    filter: 'blur(30px)',
                }} />

                {/* Orbs */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', left: '-150px', top: '-150px', background: 'radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                    <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', right: '5%', bottom: '-100px', background: 'radial-gradient(circle, rgba(139,133,255,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1152px', margin: '0 auto', padding: '128px 24px 80px', width: '100%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

                        {/* Left */}
                        <div>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6C63FF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
                // hakkımda
                            </p>
                            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                                <span style={{ display: 'block', fontSize: 'clamp(44px, 6vw, 80px)', color: '#E8E8F0' }}>Merhaba,</span>
                                <span style={{ display: 'block', fontSize: 'clamp(44px, 6vw, 80px)', background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 45%, #E0D7FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    ben arkhe.
                                </span>
                            </h1>
                            <p style={{ color: '#6B6B80', fontSize: '17px', lineHeight: 1.75, maxWidth: '440px', marginBottom: '32px' }}>
                                Full-stack developer. Sistemlerin özüne inmek, ölçeklenebilir mimariler kurmak ve temiz kod yazmak benim için sadece bir iş değil — bir felsefe.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #6C63FF, #8B85FF)', color: 'white', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px', padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 0 0 rgba(108,99,255,0)', transition: 'all 0.3s' }}>
                                    Projeleri Gör →
                                </Link>
                                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#6B6B80', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '14px', padding: '12px 24px', borderRadius: '100px', border: '1px solid #1E1E2E', textDecoration: 'none', transition: 'all 0.3s' }}>
                                    İletişim
                                </Link>
                            </div>
                        </div>

                        {/* Right — Identity card */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '100%', maxWidth: '380px', borderRadius: '20px',
                                background: 'rgba(17,17,24,0.85)', backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(108,99,255,0.15)',
                                boxShadow: '0 0 60px rgba(108,99,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
                                overflow: 'hidden',
                            }}>
                                {/* Card header */}
                                <div style={{ padding: '20px 24px', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(10,10,15,0.4)' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: 'white' }}>
                                        α
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px', color: '#E8E8F0', margin: 0 }}>rahmicaglar</p>
                                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6C63FF', margin: 0, letterSpacing: '0.05em' }}>@arkhe</p>
                                    </div>
                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41', display: 'block' }} />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#6B6B80' }}>online</span>
                                    </div>
                                </div>
                                {/* Card body */}
                                <div style={{ padding: '20px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', lineHeight: 2 }}>
                                    {[
                                        ['role', '"Full-Stack Developer"'],
                                        ['location', '"Türkiye 🇹🇷"'],
                                        ['experience', '"3+ yıl"'],
                                        ['open_to', '"remote / hybrid"'],
                                        ['focus', '"Next.js + TypeScript"'],
                                    ].map(([key, val]) => (
                                        <div key={key}>
                                            <span style={{ color: '#6B6B80' }}>{key}: </span>
                                            <span style={{ color: '#A78BFA' }}>{val}</span>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: '16px', padding: '10px 12px', background: 'rgba(108,99,255,0.06)', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#28CA41' }}>✓</span>
                                        <span style={{ color: '#6B6B80' }}>yeni fırsatlara açık</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS BAND ── */}
            <section style={{ borderTop: '1px solid #1E1E2E', borderBottom: '1px solid #1E1E2E', padding: '48px 24px', background: 'rgba(17,17,24,0.5)' }}>
                <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center' }}>
                    {[
                        { to: 3, suffix: '+', label: 'Yıl Deneyim' },
                        { to: 20, suffix: '+', label: 'Tamamlanan Proje' },
                        { to: 8, suffix: '', label: 'Teknoloji' },
                        { to: '∞', suffix: '', label: 'Satır Kod' },
                    ].map((s) => (
                        <div key={s.label}>
                            <Counter to={s.to as number} suffix={s.suffix} />
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3A3A50', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '80px 24px' }}>

                {/* ── SKILL BARS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '96px', alignItems: 'start' }}>
                    <div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6C63FF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>// beceriler</p>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '36px', color: '#E8E8F0', marginBottom: '32px' }}>
                            Teknoloji Stack&#39;im
                        </h2>
                        {STACK.map((s) => <SkillBar key={s.name} {...s} />)}
                    </div>

                    <div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6C63FF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>// felsefe</p>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '36px', color: '#E8E8F0', marginBottom: '32px' }}>
                            Değerlerim
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {VALUES.map((v) => (
                                <div key={v.title} style={{
                                    padding: '20px 24px', borderRadius: '12px',
                                    background: 'rgba(17,17,24,0.7)', backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(108,99,255,0.1)',
                                    display: 'flex', gap: '16px', alignItems: 'flex-start',
                                    transition: 'border-color 0.3s',
                                }}>
                                    <span style={{ fontSize: '20px', color: '#6C63FF', flexShrink: 0, marginTop: '2px' }}>{v.icon}</span>
                                    <div>
                                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px', color: '#E8E8F0', marginBottom: '4px' }}>{v.title}</p>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B6B80', lineHeight: 1.6 }}>{v.desc}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Tools grid */}
                            <div style={{ padding: '20px 24px', borderRadius: '12px', background: 'rgba(17,17,24,0.7)', border: '1px solid rgba(108,99,255,0.1)' }}>
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3A3A50', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                                    Kullandığım araçlar
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {TOOLS.map((t) => (
                                        <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6B6B80', padding: '4px 10px', borderRadius: '100px', border: '1px solid #1E1E2E', background: 'rgba(10,10,15,0.5)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── TIMELINE ── */}
                <div style={{ marginBottom: '80px' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6C63FF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>// deneyim</p>
                    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '36px', color: '#E8E8F0', marginBottom: '48px' }}>
                        Yolculuk
                    </h2>

                    <div style={{ position: 'relative', paddingLeft: '32px' }}>
                        {/* Vertical line */}
                        <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #6C63FF, #1E1E2E)' }} />

                        {TIMELINE.map((item, i) => (
                            <div key={i} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? '40px' : 0 }}>
                                {/* Dot */}
                                <div style={{
                                    position: 'absolute', left: '-28px', top: '24px',
                                    width: '14px', height: '14px', borderRadius: '50%',
                                    background: item.accent, boxShadow: `0 0 12px ${item.accent}80`,
                                    border: '2px solid #0A0A0F',
                                }} />
                                <div style={{
                                    padding: '24px 28px', borderRadius: '16px',
                                    background: 'rgba(17,17,24,0.8)', backdropFilter: 'blur(10px)',
                                    border: `1px solid rgba(108,99,255,0.1)`,
                                    transition: 'border-color 0.3s, transform 0.3s',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                                        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '20px', color: '#E8E8F0', margin: 0 }}>
                                            {item.title}
                                        </h3>
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: item.accent, padding: '3px 10px', borderRadius: '100px', background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>
                                            {item.year}
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B6B80', lineHeight: 1.7, marginBottom: '12px' }}>
                                        {item.desc}
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {item.tags.map((t) => (
                                            <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6B6B80', padding: '3px 10px', borderRadius: '100px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)' }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div style={{
                    textAlign: 'center', padding: '60px 40px', borderRadius: '24px',
                    background: 'rgba(17,17,24,0.8)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(108,99,255,0.12)',
                    boxShadow: '0 0 80px rgba(108,99,255,0.06)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6C63FF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>// birlikte çalışalım</p>
                    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '36px', color: '#E8E8F0', marginBottom: '12px' }}>
                        Hazır mısın?
                    </h2>
                    <p style={{ color: '#6B6B80', fontSize: '16px', marginBottom: '32px' }}>
                        Projeni hayata geçirmek için bir mesaj yeter.
                    </p>
                    <Link href="/contact" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'linear-gradient(135deg, #6C63FF, #8B85FF)', color: 'white',
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px',
                        padding: '14px 32px', borderRadius: '100px', textDecoration: 'none',
                        boxShadow: '0 0 30px rgba(108,99,255,0.3)',
                        transition: 'all 0.3s',
                    }}>
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
