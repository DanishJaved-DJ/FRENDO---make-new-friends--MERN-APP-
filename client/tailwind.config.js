/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        facebook: ['"Facebook Sans"', 'Arial', 'sans-serif'], // Add the custom font here
      },
      colors: {
        facebookBlue: {
          DEFAULT: '#0866ff', // Base color
          light: '#3a84ff', // Lighter shade
          dark: '#0654cc', // Darker shade
        },
        lightGreen : '#42b72a',
        blackshade : '#212934'
      },  
    },
  },
  plugins: [],
}

