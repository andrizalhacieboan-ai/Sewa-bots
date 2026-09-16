import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        orange: '#FF6B00',
        'light-orange': '#FF8A00',
        white: '#FFFFFF',
        purple: '#8B5CF6',
        'dark-purple': '#1A1028',
        gray: '#A1A1AA',
        'dark-gray': '#18181B',
        border: '#27272A',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(80px)' },
          '50%': { opacity: '0.7', filter: 'blur(100px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
