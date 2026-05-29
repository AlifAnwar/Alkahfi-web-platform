/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c1d3ff",
          300: "#a2bdff",
          400: "#7c9cff",
          500: "#5b7aff",
          600: "#4557d4",
          700: "#354aaa",
          800: "#2a3d8c",
          900: "#223070",
        },
        accent: {
          50: "#fef7ed",
          100: "#fed7ac",
          200: "#feb66a",
          300: "#fe9428",
          400: "#f58220",
          500: "#d46e1c",
          600: "#a85816",
          700: "#7c4110",
          800: "#5a300a",
          900: "#3d1f06",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#5b7aff",
          secondary: "#d46e1c",
          accent: "#d46e1c",
          neutral: "#2a2e37",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
