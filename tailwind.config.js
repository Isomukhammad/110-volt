/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray5: '#E0E0E0',
        gray7: '#F2F2F2',
        placeholder: '#BDBDBD',
        accent: '#7B54C9',
        accentDark: '#4D2D8E',
        error: '#E95050',
        primaryBg: '#F1F1FE',
        secondary: '#828282',
      },
      borderRadius: {
        'base': "16px",
      },
      screens: {
        'md': '768px',
        'lg': '1024px',
        '2xl': '1600px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
