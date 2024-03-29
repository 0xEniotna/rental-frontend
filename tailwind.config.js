/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {

      },
      colors: {
        brandbg1: "#5A11F2",
        brandbg2: "#241ADB",
        brandbg3: "#00ECFF",
        brandbg4: "#8700B2",
      },
    },
  },
  plugins: [],
}
