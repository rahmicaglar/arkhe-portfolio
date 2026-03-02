'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Giriş başarısız');
            } else {
                router.push('/admin/dashboard');
            }
        } catch {
            setError('Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-void flex items-center justify-center bg-grid">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex w-14 h-14 rounded-full bg-accent/20 border border-accent/40 items-center justify-center mb-4">
                        <span className="text-accent text-2xl font-grotesk font-bold">α</span>
                    </div>
                    <h1 className="font-grotesk font-bold text-2xl text-text-primary">Admin Girişi</h1>
                    <p className="text-text-muted text-sm mt-1 font-mono">arkhe // yönetim paneli</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                            E-posta
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-void border border-border focus:border-accent/50 rounded-lg px-4 py-3 text-text-primary text-sm outline-none transition-colors duration-300 font-mono"
                            placeholder="admin@arkhe.dev"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                            Şifre
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-void border border-border focus:border-accent/50 rounded-lg px-4 py-3 text-text-primary text-sm outline-none transition-colors duration-300 font-mono"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm font-mono">
                            ⚠ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-accent-glow disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Giriş yapılıyor...
                            </span>
                        ) : (
                            'Giriş Yap'
                        )}
                    </button>
                </form>

                <p className="text-center mt-6 text-xs text-text-dim font-mono">
                    Bu sayfa yalnızca admin için
                </p>
            </div>
        </div>
    );
}
