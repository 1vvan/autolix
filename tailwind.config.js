// @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        width: {
          '44': '44px',
          '69': '69px',
        },
        maxWidth: {
          '5.5xl': '69rem',
        },
        fontSize: {
          s: ['12px', 'normal'],
          m: ['14px', 'normal'],
          l: ['16px', 'normal'],
          xl: ['18px', 'normal'],
        },
        spacing: {
          '6px': '6px',
          '8px': '8px',
          '10px': '10px',
          '12px': '12px',
          '16px': '16px',
          '24px': '24px',
          '32px': '32px',
          '55px': '55px',
          '64px': '64px',
        },
        screens: {
          'md': '992px',
        },
        colors: {
          dark: {
            bg: '#030712',
            border: '#1F2937',
            gray900: '#111827',
          },
          white: '#fff',
          black: '#000',
          violet_light: '#7C3AED',
          violet400: '#A78BFA',
          violet900: '#4C1D95',
          gray200: '#E5E7EB',
          gray400: '#9CA3AF',
          gray500: '#3B454E',
          gray600: '#4B5563',
        },
        scale: {
          '101': '1.01',
          '102': '1.02',
          '103': '1.03',
          '104': '1.04',
        }
      },
    },
    plugins: [],
  }
  
  