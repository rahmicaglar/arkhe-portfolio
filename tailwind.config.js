/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                void: '#0A0A0F',
                surface: '#111118',
                elevated: '#1A1A24',
                border: '#1E1E2E',
                accent: '#6C63FF',
                'accent-glow': '#8B85FF',
                'text-primary': '#E8E8F0',
                'text-muted': '#6B6B80',
                'text-dim': '#3A3A50',
            },
            fontFamily: {
                grotesk: ['Space Grotesk', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.6s ease forwards',
                'fade-in': 'fadeIn 0.8s ease forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(108, 99, 255, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(108, 99, 255, 0.6)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'grid-pattern': 'linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '50px 50px',
            },
        },
    },
    plugins: [],
};
