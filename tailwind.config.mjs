/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B0000',
          dark: '#5C0000',
          light: '#B22222',
        },
        secondary: {
          DEFAULT: '#8B4513',
          dark: '#5C2E0A',
          light: '#A0522D',
        },
      },
      fontFamily: {
        display: ['Archivo Black', 'Georgia', 'serif'],
        body: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
