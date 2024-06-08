/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        courier: ["Courier", "monospace"],
        poppins: ["Poppins", "sans-serif"],
        Minecraft: ["Minecraft", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
