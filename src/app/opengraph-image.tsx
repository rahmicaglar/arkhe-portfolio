import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'arkhe — rahmicaglar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0A0A0F 0%, #0E0E1A 50%, #0A0A0F 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Grid lines decoration */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

                {/* Glow orb */}
                <div style={{
                    position: 'absolute', right: '-100px', top: '-100px',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }} />

                {/* Content */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {/* Label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '24px', color: 'white', fontWeight: 'bold',
                        }}>α</div>
                        <span style={{ fontSize: '18px', color: '#6C63FF', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            arkhe
                        </span>
                    </div>

                    {/* Title */}
                    <div style={{ fontSize: '72px', fontWeight: '800', color: '#E8E8F0', lineHeight: '1.05', marginBottom: '24px', letterSpacing: '-2px' }}>
                        rahmicaglar
                    </div>

                    {/* Subtitle with gradient */}
                    <div style={{
                        fontSize: '28px', marginBottom: '40px',
                        background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Full-Stack Developer
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {['Next.js', 'TypeScript', 'Supabase'].map((tag) => (
                            <div key={tag} style={{
                                padding: '8px 18px', borderRadius: '100px',
                                border: '1px solid rgba(108,99,255,0.3)',
                                background: 'rgba(108,99,255,0.08)',
                                fontSize: '16px', color: '#A78BFA',
                            }}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom right URL */}
                <div style={{
                    position: 'absolute', bottom: '60px', right: '80px',
                    fontSize: '16px', color: '#3A3A50', fontFamily: 'monospace',
                }}>
                    arkhe-portfoilo.vercel.app
                </div>
            </div>
        ),
        { ...size }
    );
}
