/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
      colors: {
        brand: {
          blue: '#1e40af',
          lightBlue: '#3b82f6',
          dark: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
