/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pasaje-black': '#000000',
        'pasaje-white': '#FFFFFF',
        'pasaje-gray': '#808080',
        'pasaje-silver': '#C0C0C0',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.05em',
      },
    },
  },
  plugins: [],
}