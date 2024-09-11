/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '300': '22rem',
      },
      height:{
        '600': '25rem',
      },
      colors:{
        'grey':'#ede9e9'
      },
      boxShadow:{
        '3xl': '0 2px 8px  rgb(99 99 99 / 20%)',
      }
    },
  plugins: [],
}
}