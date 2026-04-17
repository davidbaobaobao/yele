import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Washi Design System ─────────────────────────────────────────
      colors: {
        // shadcn card tokens
        'card':                     '#ffffff',
        'card-foreground':          '#1c1c18',
        // Core surfaces
        'surface':                  '#fcf9f3', // Washi White
        'surface-bright':           '#fcf9f3',
        'surface-container-low':    '#f6f3ed',
        'surface-container':        '#f0eee8',
        'surface-container-high':   '#ebe8e2',
        'surface-container-highest':'#e5e2dc',
        'surface-container-lowest': '#ffffff',
        'surface-dim':              '#dcdad4',
        'secondary-container':      '#e9e2d3', // Pale Ash
        'secondary-fixed':          '#e9e2d3',
        // Typography
        'on-surface':               '#1c1c18', // Sumi Ink dark
        'primary':                  '#000000', // Sumi Ink pure
        'on-primary':               '#ffffff',
        'secondary':                '#625e53',
        'on-secondary-container':   '#686458',
        // Accent — Moss Celadon (use sparingly)
        'tertiary-fixed':           '#c5ecd2',
        'tertiary-fixed-dim':       '#aacfb6',
        'on-tertiary-fixed':        '#002112',
        'on-tertiary-container':    '#688c76',
        'on-tertiary-fixed-variant':'#2c4e3b',
        'tertiary':                 '#000000',
        // Borders
        'stone':                    '#C8C2B4',
        'outline':                  '#747878',
        'outline-variant':          '#c4c7c7',
      },
      fontFamily: {
        'headline': ['var(--font-newsreader)', 'Georgia', 'serif'],
        'body':     ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'label':    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Keep these as aliases for old code during migration
        'serif':    ['var(--font-newsreader)', 'Georgia', 'serif'],
        'sans':     ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      // 0px radius everywhere (Japanese joinery precision)
      borderRadius: {
        'DEFAULT': '0px',
        'sm': '0px',
        'md': '0px',
        'lg': '8px',   // bento cards only
        'xl': '12px',  // bento cards only
        '2xl': '0px',
        'full': '9999px',
      },
      // Tonal shadows — never pure grey
      boxShadow: {
        'sm':     '0px 4px 8px rgba(28, 28, 24, 0.04)',
        'md':     '0px 8px 20px rgba(28, 28, 24, 0.06)',
        'lg':     '0px 20px 40px rgba(28, 28, 24, 0.05)',
        'ink':    '0px 20px 40px rgba(28, 28, 24, 0.05)',
        'celadon':'0px 8px 24px rgba(197, 236, 210, 0.25)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      zIndex: {
        '0':    '0',
        '10':   '10',
        '20':   '20',
        '40':   '40',
        '100':  '100',
        '1000': '1000',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'wabi':   'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float_up: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ink_wash: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.05)' },
        },
        pulse_soft: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        vidmove: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        connector_in: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'marquee':       'marquee 40s linear infinite',
        'float_up':      'float_up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'ink_wash':      'ink_wash 6s ease-in-out infinite',
        'pulse_soft':    'pulse_soft 2s ease-in-out infinite',
        'vidmove':       'vidmove 12s ease-in-out infinite alternate',
        'connector_in':  'connector_in 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
