/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        weather: {
          sunny: '#fbbf24',
          cloudy: '#9ca3af',
          rainy: '#3b82f6',
          snowy: '#e5e7eb',
          stormy: '#6b7280',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-sunny': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'gradient-snowy': 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
        'gradient-stormy': 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
