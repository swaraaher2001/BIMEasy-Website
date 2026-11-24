/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f6fafe',
        surface: '#f6fafe',
        surface_container_low: '#f0f4f8',
        surface_container_lowest: '#ffffff',
        surface_container_high: '#e4e9ed',
        on_background: '#171c1f',
        on_surface: '#171c1f',
        on_surface_variant: '#424752',
        primary: '#00478d',
        primary_container: '#005eb8',
        on_primary: '#ffffff',
        tertiary: '#00523d',
        tertiary_container: '#006d51',
        tertiary_fixed: '#36ffc4',
        inverse_surface: '#2c3134',
        inverse_on_surface: '#edf1f5',
        outline_variant: '#c2c6d4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0px 4px 20px rgba(23, 28, 31, 0.06)',
      },
    },
  },
  plugins: [],
}
