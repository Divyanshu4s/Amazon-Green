/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          primary: '#2E7D32',
          secondary: '#4CAF50',
          light: '#E8F5E9',
          dark: '#1B5E20',
        },
        amazon: {
          orange: '#FF9900',
          darkOrange: '#E38800',
        },
        background: '#F8F9FA',
        surface: '#FFFFFF',
        text: {
          main: '#1F2937',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
