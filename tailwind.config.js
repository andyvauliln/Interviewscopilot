const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      boxShadow: {
        all: '0px -25px 20px -30px rgba(0,0,0,0.45),25px 0px 20px -30px rgba(0,0,0,0.45),0px 25px 20px -30px rgba(0,0,0,0.45),-25px 0px 20px -30px rgba(0,0,0,0.45);',
        all2: '0 0 10px rgba(0,0,0,0.6);'
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
