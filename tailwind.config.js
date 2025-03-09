/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",

      background: {
        dark: "#15191C",
        light: "#F4F4F4",
        "white-transparent": "rgba(255, 255, 255, 0)",
      },

      hover: {
        dark: "#363232",
        light: "#F4F4F4",
      },

      border: {
        light: "rgba(0, 0, 0, 0.1)",
        dark: "rgba(255, 255, 255, 0.1)",
      },

      error: "#fc2c03",

      primary: {
        light: "#00C853",
      },

      text: {
        light: "#444444",
        dark: "#CECECE",
      },

      // Gray
      "gray-1": "#6B7280",
      "gray-2": {
        DEFAULT: "#9CA3AF",
        light: "#9CA3AF",
        dark: "#4B5563",
      },
      "gray-3": {
        DEFAULT: "#CBD5E1",
        light: "#CBD5E1",
        dark: "#374151",
      },
      "gray-4": {
        DEFAULT: "#E2E8F0",
        light: "#E2E8F0",
        dark: "#1F2937",
      },
      "gray-5": {
        DEFAULT: "#E9E9EB",
        light: "#F5F5F5",
        dark: "#111827",
      },
      "gray-6": {
        DEFAULT: "#F8FAFC",
        light: "#F8FAFC",
        dark: "#0A0E16",
      },

      // Purple
      "purple-1": "#8241F3",
      "purple-2": {
        DEFAULT: "#D2BBFB",
        light: "#D2BBFB",
        dark: "#4E2792",
      },
      "purple-3": {
        DEFAULT: "#F5F0FE",
        light: "#F5F0FE",
        dark: "#2D1558",
      },

      // Indigo
      "indigo-1": "#6366F1",
      "indigo-2": {
        DEFAULT: "#A5B4FC",
        light: "#A5B4FC",
        dark: "#4338CA",
      },
      "indigo-3": {
        DEFAULT: "#EEF2FF",
        light: "#EEF2FF",
        dark: "#312E81",
      },
      "indigo-4": {
        DEFAULT: "#272567",
        dark: "#272567",
      },

      // Blue
      "blue-1": {
        DEFAULT: "#42A5F5",
        light: "#42A5F5",
        dark: "#007BFF",
      },
      "blue-2": {
        DEFAULT: "#BBDFFB",
        light: "#BBDFFB",
        dark: "#286393",
      },
      "blue-3": {
        DEFAULT: "#F0F8FE",
        light: "#F0F8FE",
        dark: "#15354F",
      },

      // Teal
      "teal-1": "#14B8A6",
      "teal-2": {
        DEFAULT: "#5EEAD4",
        light: "#5EEAD4",
        dark: "#0f766E",
      },
      "teal-3": {
        DEFAULT: "#CCFBF1",
        light: "#CCFBF1",
        dark: "#134E4A",
      },

      // Green
      "green-1": "#00C853",
      "green-2": {
        DEFAULT: "#A3EBC1",
        light: "#A3EBC1",
        dark: "#007832",
      },
      "green-3": {
        DEFAULT: "#EBFBF1",
        light: "#EBFBF1",
        dark: "#003B18",
      },

      // Pink
      "pink-1": "#EC4899",
      "pink-2": {
        DEFAULT: "#F9A8D4",
        light: "#F9A8D4",
        dark: "#BE185D",
      },
      "pink-3": {
        DEFAULT: "#FCE7F3",
        light: "#FCE7F3",
        dark: "#831843",
      },

      // Red
      "red-1": "#FA0164",
      "red-2": {
        DEFAULT: "#FDA4C7",
        light: "#FDA4C7",
        dark: "#96013C",
      },
      "red-3": {
        DEFAULT: "#FFEBF3",
        light: "#FFEBF3",
        dark: "#630028",
      },

      // Orange
      "orange-1": "#F97316",
      "orange-2": {
        DEFAULT: "#FDBA74",
        light: "#FDBA74",
        dark: "#C2410C",
      },
      "orange-3": {
        DEFAULT: "#FFEDD5",
        light: "#FFEDD5",
        dark: "#7C2D12",
      },

      // Yellow
      "yellow-1": "#FACC15",
      "yellow-2": {
        DEFAULT: "#FEF08A",
        light: "#FEF08A",
        dark: "#CA8A04",
      },
      "yellow-3": {
        DEFAULT: "#FEF9C3",
        light: "#FEF9C3",
        dark: "#713F12",
      },
    },
    extend: {
      margin: {
        "-10rem": "-10rem",
      },
      height: {
        "84vh": "84vh",
      },
      backgroundImage: {
        "light-gradient":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 1) 100%)",
        "light-gradient-right":
          "linear-gradient(to right, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0.8) 100%)",
        "dark-gradient":
          "linear-gradient(to top, rgba(49, 49, 58, 0) 65%, rgba(49, 49, 58, 0.4) 100%)",
      },
      borderRadius: {
        26: "26px",
      },
      keyframes: {
        typing: {
          "0%": { width: "0%" },
          "100%": { width: "95%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#00C853" },
        },
      },
      animation: {
        typing:
          "typing 3s steps(30, end) infinite alternate, blink .75s step-end infinite",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
