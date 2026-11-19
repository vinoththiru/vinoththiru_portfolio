/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#5B1E35',
          deep: '#3D1427',
          light: '#742845',
        },
        ivory: {
          DEFAULT: '#F7F1EA',
          soft: '#FCF9F5',
          dark: '#EFE6DC',
        },
        gold: {
          DEFAULT: '#C9A66B',
          light: '#DFC495',
          dark: '#A6834B',
        },
        blush: {
          DEFAULT: '#EAD9DE',
          light: '#F3E8EB',
        },
        charcoal: {
          DEFAULT: '#292329',
          soft: '#3B333B',
        },
        muted: '#766A70',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        editorial: '0 10px 30px -12px rgba(61, 20, 39, 0.10)',
        'editorial-lg': '0 20px 44px -16px rgba(61, 20, 39, 0.16)',
        card: '0 2px 10px -2px rgba(41, 35, 41, 0.06)',
      },
      backgroundImage: {
        'burgundy-hero':
          'linear-gradient(135deg, #3D1427 0%, #5B1E35 58%, #47172C 100%)',
        'subtle-gold-line':
          'linear-gradient(90deg, transparent 0%, #C9A66B 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
