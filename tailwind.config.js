/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'midnight': '#0C2340',
        'coconut-cream': '#FDF8E8',
        'shadow': '#866556',
        'hemlock': '#565E42',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-5deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(5deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-5deg)' },
        },
        peek: {
          '0%, 100%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-reverse': 'float-reverse 4s ease-in-out infinite',
        'peek': 'peek 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}