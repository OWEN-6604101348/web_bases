/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#B8926A', // ตั้งชื่อสีที่ต้องการใช้
      },
    },
  },
  plugins: [],
}

