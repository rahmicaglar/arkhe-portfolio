'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Floating particle
function Particle({ style }: { style: React.CSSProperties }) {
    return (
        <div
            className="absolute rounded-full pointer-events-none"
            style={style}
        />
    );
}

// Typing effect hook
function useTypingEffect(words: string[], speed = 80, pause = 2000) {
    const [displayed, setDisplayed] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIndex < current.length) {
            timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
        } else if (!deleting && charIndex === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
        }

        setDisplayed(current.slice(0, charIndex));
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, wordIndex, words, speed, pause]);

    return displayed;
}

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    style: {
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: i % 3 === 0
            ? 'rgba(108,99,255,0.6)'
            : i % 3 === 1
                ? 'rgba(139,133,255,0.4)'
                : 'rgba(232,232,240,0.15)',
        animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite alternate`,
        boxShadow: i % 4 === 0 ? '0 0 6px rgba(108,99,255,0.8)' : 'none',
    } as React.CSSProperties,
}));

const ROLES = [
    'Full-Stack Developer',
    'Sistem Mimarı',
    'API Tasarımcısı',
    'Backend Geliştirici',
    'TypeScript Tutkunu',
];

const STATS = [
    { value: '3+', label: 'Yıl Deneyim' },
    { value: '20+', label: 'Proje' },
    { value: '∞', label: 'Satır Kod' },
];

export default function HeroSection() {
    const typedRole = useTypingEffect(ROLES);
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animated canvas grid
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animFrame: number;
        let offset = 0;

        function resize() {
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const size = 50;
            offset = (offset + 0.2) % size;

            ctx.strokeStyle = 'rgba(108,99,255,0.06)';
            ctx.lineWidth = 1;

            for (let x = -size + offset; x < canvas.width + size; x += size) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = -size + offset; y < canvas.height + size; y += size) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            animFrame = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0A0A0F' }}>

            {/* Animated canvas grid */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Deep glow orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Primary orb */}
                <div
                    className="absolute rounded-full animate-pulse-glow"
                    style={{
                        width: '800px', height: '800px',
                        left: '50%', top: '50%',
                        transform: 'translate(-55%, -50%)',
                        background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, rgba(108,99,255,0.04) 40%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
                {/* Secondary orb — top right */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '400px', height: '400px',
                        right: '-100px', top: '-100px',
                        background: 'radial-gradient(circle, rgba(139,133,255,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                {/* Accent orb — bottom left */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: '300px', height: '300px',
                        left: '-50px', bottom: '10%',
                        background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {mounted && PARTICLES.map((p) => <Particle key={p.id} style={p.style} />)}
            </div>

            {/* Horizontal scan line */}
            <div
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4) 20%, rgba(108,99,255,0.6) 50%, rgba(108,99,255,0.4) 80%, transparent)',
                    top: '35%',
                    animation: 'scanline 8s linear infinite',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-screen py-32">

                    {/* LEFT — Text content */}
                    <div className="flex flex-col gap-6">

                        {/* Status badge */}
                        <div
                            className="inline-flex items-center gap-2.5 self-start"
                            style={{
                                background: 'rgba(108,99,255,0.08)',
                                border: '1px solid rgba(108,99,255,0.2)',
                                borderRadius: '100px',
                                padding: '6px 14px',
                            }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6B6B80', letterSpacing: '0.1em' }}>
                                AÇIK POZISYON — 2026
                            </span>
                        </div>

                        {/* Main heading */}
                        <div>
                            <p
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '13px',
                                    color: '#6C63FF',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                }}
                            >
                // merhaba, ben
                            </p>

                            <h1
                                style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 700,
                                    lineHeight: 1.05,
                                    letterSpacing: '-0.03em',
                                    marginBottom: '4px',
                                }}
                            >
                                <span
                                    style={{
                                        display: 'block',
                                        fontSize: 'clamp(52px, 8vw, 96px)',
                                        color: '#E8E8F0',
                                    }}
                                >
                                    arkhe
                                </span>
                                <span
                                    style={{
                                        display: 'block',
                                        fontSize: 'clamp(52px, 8vw, 96px)',
                                        background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 45%, #E0D7FF 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    rahmicaglar
                                </span>
                            </h1>
                        </div>

                        {/* Typing role */}
                        <div
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '18px',
                                color: '#6B6B80',
                                minHeight: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <span style={{ color: '#6C63FF' }}>&gt;</span>
                            <span style={{ color: '#A78BFA' }}>{typedRole}</span>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '2px',
                                    height: '20px',
                                    background: '#6C63FF',
                                    animation: 'blink 1s step-end infinite',
                                }}
                            />
                        </div>

                        {/* Description */}
                        <p style={{ color: '#6B6B80', fontSize: '17px', lineHeight: 1.75, maxWidth: '480px' }}>
                            Sistemlerin özünü araştırıyor, ölçeklenebilir mimariler kuruyor ve{' '}
                            <span style={{ color: '#E8E8F0', fontWeight: 500 }}>temiz, verimli kod</span>{' '}
                            yazıyorum. Her şeyin başladığı yerde — arkhe&apos;de.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                            <Link
                                href="/projects"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'linear-gradient(135deg, #6C63FF, #8B85FF)',
                                    color: 'white',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    padding: '14px 28px',
                                    borderRadius: '100px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 0 0 rgba(108,99,255,0)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(108,99,255,0.5)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 0 rgba(108,99,255,0)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Projelerimi Keşfet
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            <Link
                                href="/blog"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'transparent',
                                    color: '#6B6B80',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 500,
                                    fontSize: '15px',
                                    padding: '14px 28px',
                                    borderRadius: '100px',
                                    border: '1px solid #1E1E2E',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)';
                                    e.currentTarget.style.color = '#E8E8F0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#1E1E2E';
                                    e.currentTarget.style.color = '#6B6B80';
                                }}
                            >
                                Blog Yazıları
                            </Link>
                        </div>

                        {/* Stats */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '32px',
                                marginTop: '12px',
                                paddingTop: '24px',
                                borderTop: '1px solid #1E1E2E',
                            }}
                        >
                            {STATS.map((stat) => (
                                <div key={stat.label}>
                                    <p
                                        style={{
                                            fontFamily: 'Space Grotesk, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '28px',
                                            background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            lineHeight: 1,
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3A3A50', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Visual terminal card */}
                    <div className="hidden lg:flex justify-center items-center">
                        <div
                            style={{
                                width: '100%',
                                maxWidth: '480px',
                                borderRadius: '16px',
                                border: '1px solid rgba(108,99,255,0.15)',
                                background: 'rgba(17,17,24,0.8)',
                                backdropFilter: 'blur(20px)',
                                overflow: 'hidden',
                                boxShadow: '0 0 80px rgba(108,99,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                            }}
                        >
                            {/* Terminal top bar */}
                            <div
                                style={{
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #1E1E2E',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(10,10,15,0.5)',
                                }}
                            >
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA41' }} />
                                <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3A3A50' }}>
                                    arkhe.ts
                                </span>
                            </div>

                            {/* Code content */}
                            <div style={{ padding: '24px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: 2 }}>
                                <div><span style={{ color: '#3A3A50' }}>1 </span><span style={{ color: '#A78BFA' }}>interface</span><span style={{ color: '#E8E8F0' }}> Developer {'{'}</span></div>
                                <div><span style={{ color: '#3A3A50' }}>2 </span><span style={{ color: '#E8E8F0' }}>  name</span><span style={{ color: '#6B6B80' }}>:</span><span style={{ color: '#6C63FF' }}> &quot;rahmicaglar&quot;</span><span style={{ color: '#6B6B80' }}>;</span></div>
                                <div><span style={{ color: '#3A3A50' }}>3 </span><span style={{ color: '#E8E8F0' }}>  role</span><span style={{ color: '#6B6B80' }}>:</span><span style={{ color: '#6C63FF' }}> &quot;Full-Stack Dev&quot;</span><span style={{ color: '#6B6B80' }}>;</span></div>
                                <div><span style={{ color: '#3A3A50' }}>4 </span><span style={{ color: '#E8E8F0' }}>  stack</span><span style={{ color: '#6B6B80' }}>:</span><span style={{ color: '#A78BFA' }}> string</span><span style={{ color: '#E8E8F0' }}>[]</span><span style={{ color: '#6B6B80' }}>;</span></div>
                                <div><span style={{ color: '#3A3A50' }}>5 </span><span style={{ color: '#E8E8F0' }}>  available</span><span style={{ color: '#6B6B80' }}>:</span><span style={{ color: '#A78BFA' }}> true</span><span style={{ color: '#6B6B80' }}>;</span></div>
                                <div><span style={{ color: '#3A3A50' }}>6 </span><span style={{ color: '#E8E8F0' }}>{'}'}</span></div>
                                <div style={{ marginTop: '8px' }}><span style={{ color: '#3A3A50' }}>7 </span></div>
                                <div><span style={{ color: '#3A3A50' }}>8 </span><span style={{ color: '#A78BFA' }}>const</span><span style={{ color: '#E8E8F0' }}> me</span><span style={{ color: '#6B6B80' }}>:</span><span style={{ color: '#6C63FF' }}> Developer</span><span style={{ color: '#6B6B80' }}> =</span><span style={{ color: '#E8E8F0' }}> {'{'}</span></div>
                                <div><span style={{ color: '#3A3A50' }}>9 </span><span style={{ color: '#E8E8F0' }}>  stack</span><span style={{ color: '#6B6B80' }}>:</span><span style={{ color: '#E8E8F0' }}> [</span></div>
                                <div><span style={{ color: '#3A3A50' }}>10</span><span style={{ color: '#6C63FF' }}>    &quot;Next.js&quot;</span><span style={{ color: '#6B6B80' }}>,</span><span style={{ color: '#6C63FF' }}> &quot;TypeScript&quot;</span><span style={{ color: '#6B6B80' }}>,</span></div>
                                <div><span style={{ color: '#3A3A50' }}>11</span><span style={{ color: '#6C63FF' }}>    &quot;PostgreSQL&quot;</span><span style={{ color: '#6B6B80' }}>,</span><span style={{ color: '#6C63FF' }}> &quot;Node.js&quot;</span></div>
                                <div><span style={{ color: '#3A3A50' }}>12</span><span style={{ color: '#E8E8F0' }}>  ]</span></div>
                                <div><span style={{ color: '#3A3A50' }}>13</span><span style={{ color: '#E8E8F0' }}>{'}'}</span></div>
                                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(108,99,255,0.06)', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.1)' }}>
                                    <span style={{ color: '#28CA41' }}>✓ </span>
                                    <span style={{ color: '#6B6B80' }}>compiled successfully — ready to build</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom scroll indicator */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3A3A50', letterSpacing: '0.2em' }}>SCROLL</span>
                    <div style={{ width: '24px', height: '36px', border: '1px solid #1E1E2E', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
                        <div
                            style={{
                                width: '4px',
                                height: '8px',
                                background: 'rgba(108,99,255,0.6)',
                                borderRadius: '2px',
                                animation: 'scrollDot 2s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scanline {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(12px); opacity: 0.2; }
        }
      `}</style>
        </section>
    );
}
