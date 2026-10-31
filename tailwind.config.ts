import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-gold': {
          DEFAULT: '#C6A87C',
          light: '#E0CFA7',
          dark: '#A38558',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-serif)', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-noto-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'conic-gradient(from 180deg at 50% 50%, #0f172a 0deg, #1e293b 180deg, #0f172a 360deg)',
      },
      boxShadow: {
        'gold-glow':
          '0 0 15px -3px rgba(198, 168, 124, 0.3), 0 0 6px -2px rgba(198, 168, 124, 0.2)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};

export default config;
