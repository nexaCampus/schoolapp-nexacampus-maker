/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oxford: '#0A192F',
        burgundy: '#721121',
        cypress: '#1B382B',
        parchment: '#FDFBF7',
        charcoal: '#1E293B',
        'scholastic-gold': '#D97706',
        scholastic: '#B45309',
        surface: 'var(--color-surface, #faf8ff)',
        'surface-bright': 'var(--color-surface-bright, #faf8ff)',
        'surface-dim': 'var(--color-surface-dim, #d2d9f4)',
        'surface-container': 'var(--color-surface-container, #eaedff)',
        'surface-container-low': 'var(--color-surface-container-low, #f2f3ff)',
        'surface-container-lowest': 'var(--color-surface-container-lowest, #ffffff)',
        'surface-container-high': 'var(--color-surface-container-high, #e2e7ff)',
        'surface-container-highest': 'var(--color-surface-container-highest, #dae2fd)',
        primary: 'var(--color-primary, #1c2ac8)',
        'primary-container': 'var(--color-primary-container, #3b49df)',
        'on-primary': '#ffffff',
        'on-surface': 'var(--color-on-surface, #131b2e)',
        'on-surface-variant': 'var(--color-on-surface-variant, #454655)',
        outline: 'var(--color-outline, #757687)',
        'outline-variant': 'var(--color-outline-variant, #c6c5d8)',
        tertiary: 'var(--color-tertiary, #005036)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
