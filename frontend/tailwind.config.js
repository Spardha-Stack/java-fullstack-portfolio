/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#070B14',
          1: '#0B1120',
          2: '#111827',
          3: '#1E293B',
        },
        neon: {
          blue: '#3B82F6',
          cyan: '#22D3EE',
          violet: '#A855F7',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 24px rgba(168, 85, 247, 0.35)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
