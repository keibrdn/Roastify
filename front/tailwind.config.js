/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': {'max': '500px'},
      'tablet': {'max': '640px'},
      'laptop': {'max': '1024px'},
      'desktop': {'max': '1280px'},
    },
    extend: {
      fontFamily: {
        'ibm': ['IBM Plex Mono', 'monospace'],
        'rubik': ['Rubik Mono One', 'sans-serif'],
      },
      dropShadow: {
        'block': '5px 5px rgba(0, 0, 0, 1)',
      },
      colors: {
        green: '#BFD1B5',
        coral: '#CC8262',
      },
    },
  },
  plugins: [],
}

