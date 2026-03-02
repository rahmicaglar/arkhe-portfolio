import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'İletişim',
    description: 'Benimle iletişime geçin. Proje teklifleri, iş birlikleri veya sadece merhaba demek için.',
};

const CONTACT_METHODS = [
    {
        id: 'email',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'E-posta',
        value: 'rahmicaglar8@gmail.com',
        href: 'mailto:rahmicaglar8@gmail.com',
        description: 'Proje teklifleri ve iş birlikleri için',
        copyable: true,
    },
    {
        id: 'github',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
        label: 'GitHub',
        value: 'github.com/rahmicaglar',
        href: 'https://github.com/rahmicaglar',
        description: 'Açık kaynak projelerim',
        copyable: false,
    },
];

const FAQ = [
    {
        q: 'Ne tür projelerde çalışıyorsun?',
        a: 'Full-stack web uygulamaları, API tasarımı, veritabanı mimarisi ve modern frontend geliştirme. Next.js, Node.js ve PostgreSQL tercihli stack\'im.',
    },
    {
        q: 'Freelance proje alıyor musun?',
        a: 'Evet, uygun müsaitlik durumuma göre proje bazlı çalışmalar yapıyorum. Detaylar için e-posta at.',
    },
    {
        q: 'Ne kadar sürede dönüş yapıyorsun?',
        a: 'Genellikle 24-48 saat içinde dönüş yaparım.',
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">// iletişim</p>
                    <h1 className="font-grotesk font-bold text-5xl md:text-6xl text-text-primary mb-4">
                        Konuşalım.
                    </h1>
                    <p className="text-text-muted text-xl max-w-2xl leading-relaxed">
                        Bir proje fikrin mi var? İş birliği mi yapmak istiyorsun?
                        Ya da sadece merhaba mı demek istiyorsun? Seni dinliyorum.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left — Contact Methods */}
                    <div className="space-y-4">
                        <h2 className="font-grotesk font-semibold text-xl text-text-primary mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-accent" />
                            Ulaşma Yolları
                        </h2>

                        {CONTACT_METHODS.map((method) => (
                            <a
                                key={method.id}
                                href={method.href}
                                target={method.id !== 'email' ? '_blank' : undefined}
                                rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                                className="group glass rounded-xl p-5 flex items-start gap-4 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 block"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                    {method.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
                                            {method.label}
                                        </p>
                                        <svg className="w-3.5 h-3.5 text-text-dim group-hover:text-accent transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                    <p className="text-text-primary font-mono text-sm font-medium truncate group-hover:text-accent transition-colors">
                                        {method.value}
                                    </p>
                                    <p className="text-text-muted text-xs mt-1">
                                        {method.description}
                                    </p>
                                </div>
                            </a>
                        ))}

                        {/* Status */}
                        <div className="glass rounded-xl p-5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                            </div>
                            <div>
                                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-0.5">
                                    Mevcut Durum
                                </p>
                                <p className="text-green-400 text-sm font-medium">
                                    Yeni fırsatlara açık
                                </p>
                                <p className="text-text-muted text-xs mt-0.5">
                                    Proje teklifleri için uygunum
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right — FAQ */}
                    <div>
                        <h2 className="font-grotesk font-semibold text-xl text-text-primary mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-accent" />
                            Sık Sorulanlar
                        </h2>

                        <div className="space-y-4">
                            {FAQ.map((item, i) => (
                                <div key={i} className="glass rounded-xl p-5">
                                    <p className="text-sm font-grotesk font-semibold text-text-primary mb-2 flex items-start gap-2">
                                        <span className="text-accent/60 font-mono text-xs mt-0.5 flex-shrink-0">
                                            0{i + 1}
                                        </span>
                                        {item.q}
                                    </p>
                                    <p className="text-text-muted text-sm leading-relaxed pl-6">
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Direct email CTA */}
                        <div className="mt-6 glass rounded-xl p-6 border border-accent/10 bg-accent/5">
                            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-2">
                // hazır mısın?
                            </p>
                            <p className="text-text-primary font-grotesk font-semibold mb-4">
                                Hemen bir e-posta gönder
                            </p>
                            <a
                                href="mailto:rahmicaglar8@gmail.com"
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                rahmicaglar8@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
