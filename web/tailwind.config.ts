import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: '#5C9E65',
        'sage-light': '#EBF5EC',
        'sage-pill': '#DFF0E1',
        'sage-pill-hover': '#CEEBD1',
        'sage-dark': '#3E7048',
        'sage-muted': '#94BF9A',
        amber: '#E8A33D',
        'amber-light': '#FBF0DF',
        canvas: '#FAFAF8',
        ink: '#1A1A1A',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
} satisfies Config;
