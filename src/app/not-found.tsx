import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh', background: '#0A0A0F',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
        }}>
            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
                .nf-glow { animation: pulse 3s ease-in-out infinite; }
                .nf-num { animation: float 4s ease-in-out infinite; }
                .nf-btn:hover { background: linear-gradient(135deg,#6C63FF,#8B85FF) !important; transform: translateY(-2px); }
                .nf-btn { transition: all 0.3s !important; }
            `}</style>

            {/* Background grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
            }} />

            {/* Glow */}
            <div className="nf-glow" style={{
                position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }} />

            {/* Content */}
            <div style={{ position: 'relative', textAlign: 'center', maxWidth: '480px' }}>
                {/* 404 number */}
                <div className="nf-num" style={{
                    fontSize: 'clamp(80px, 20vw, 140px)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 50%, rgba(108,99,255,0.2) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '8px',
                    letterSpacing: '-4px',
                    fontFamily: 'Space Grotesk, sans-serif',
                }}>
                    404
                </div>

                {/* Label */}
                <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6C63FF',
                    letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px',
                }}>
                    // sayfa bulunamadı
                </p>

                {/* Title */}
                <h1 style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700',
                    fontSize: 'clamp(24px, 4vw, 32px)', color: '#E8E8F0',
                    marginBottom: '12px', letterSpacing: '-0.5px',
                }}>
                    Burası boş
                </h1>

                {/* Desc */}
                <p style={{
                    color: '#6B6B80', fontSize: '15px', lineHeight: '1.7',
                    marginBottom: '36px', maxWidth: '360px', margin: '0 auto 36px',
                }}>
                    Aradığın sayfa mevcut değil ya da taşındı. Ana sayfaya dönebilirsin.
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/"
                        className="nf-btn"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'linear-gradient(135deg, #5A52E8, #7B74FF)',
                            color: 'white', textDecoration: 'none',
                            fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600', fontSize: '14px',
                            padding: '12px 24px', borderRadius: '100px',
                            boxShadow: '0 0 30px rgba(108,99,255,0.25)',
                        }}
                    >
                        ← Ana Sayfaya Dön
                    </Link>
                    <Link
                        href="/blog"
                        className="nf-btn"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'transparent', color: '#6B6B80',
                            textDecoration: 'none', border: '1px solid #1E1E2E',
                            fontFamily: 'Space Grotesk, sans-serif', fontWeight: '500', fontSize: '14px',
                            padding: '12px 24px', borderRadius: '100px',
                        }}
                    >
                        Blog'a Git →
                    </Link>
                </div>
            </div>
        </div>
    );
}
