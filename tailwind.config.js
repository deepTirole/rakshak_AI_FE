/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
};
