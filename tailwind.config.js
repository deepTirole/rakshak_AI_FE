/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        gunmetal: {
          950: '#080d12',
          900: '#0d151c',
          800: '#17232b',
          700: '#263640',
        },
        'neon-green': '#b6f36b',
        'desert-sand': '#d8cfb8',
        'danger-red': '#a94338',
        slate: {
          night: '#0f172a',
          steel: '#1e293b',
        },
        olive: {
          700: '#3f4f3a',
          800: '#2e3b2b',
        },
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        },
      },
      fontFamily: {
        stencil: ['"Black Ops One"', 'Impact', 'sans-serif'],
        'mono-tech': ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
