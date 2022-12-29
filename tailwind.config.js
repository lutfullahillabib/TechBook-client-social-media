/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },

  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "blue",

        },
      },
    ],
  },

  plugins: [require("daisyui")],
}

