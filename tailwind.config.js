/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./assets/**/*.js"],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1a202c",
        darkText: "#f7fafc",
      },
    },
  },
  plugins: [],
};
