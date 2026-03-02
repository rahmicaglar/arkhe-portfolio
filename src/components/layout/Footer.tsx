import Link from 'next/link';

const FOOTER_LINKS = [
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projeler' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
];

const SOCIAL_LINKS = [
    { href: 'https://github.com/rahmicaglar', label: 'GitHub' },
    { href: 'mailto:rahmicaglar8@gmail.com', label: 'Gmail' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border mt-24">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                                <span className="text-accent text-xs font-grotesk font-bold">α</span>
                            </div>
                            <span className="font-grotesk font-semibold text-text-primary tracking-wider text-sm">
                                arkhe
                            </span>
                        </div>
                        <p className="text-text-muted text-xs leading-relaxed max-w-[200px]">
                            Şeylerin kökü. Başlangıcı. Özü.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">
                            Navigasyon
                        </h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">
                            Sosyal
                        </h4>
                        <ul className="space-y-2">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-text-muted hover:text-accent transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-accent/50" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-text-muted font-mono">
                        © {year} arkhe — rahmicaglar. Tüm haklar saklıdır.
                    </p>
                    <p className="text-xs text-text-dim font-mono">
                        next.js · typescript · supabase
                    </p>
                </div>
            </div>
        </footer>
    );
}
