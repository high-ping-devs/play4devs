const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      screens: {
        'mobileS': '320px',
        'mobileM': '390px',
        'mobileL': '450px',
        'tablet': '800px',
        ...defaultTheme.screens,
      },
    extend: {
      boxShadow: {
        'boxShadow': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
      },
      colors: {
        'white': '#f5f5f5',
        'green': '#A1FF75',
        'gray': '#323232',
        'pink': '#FF80BD'
      }
    }
  },
  plugins: [],
}
