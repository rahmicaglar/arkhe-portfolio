'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/projects', label: 'Projeler' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'İletişim' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-surface/80 backdrop-blur-xl border-b border-border/50'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                        <span className="text-accent text-xs font-grotesk font-bold">α</span>
                    </div>
                    <span className="font-grotesk font-semibold text-text-primary tracking-wider text-sm">
                        arkhe
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`text-sm font-medium transition-all duration-300 relative group ${pathname === link.href
                                    ? 'text-accent'
                                    : 'text-text-muted hover:text-text-primary'
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link
                    href="/contact"
                    className="hidden md:flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-300 border border-border hover:border-accent/40 rounded-full px-4 py-1.5"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    İletişim
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-5 h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}
                    />
                    <span
                        className={`w-5 h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`w-5 h-px bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-surface/95 backdrop-blur-xl border-t border-border px-6 py-4 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`text-sm font-medium transition-colors duration-300 ${pathname === link.href ? 'text-accent' : 'text-text-muted'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
