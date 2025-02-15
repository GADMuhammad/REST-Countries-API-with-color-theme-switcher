/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html", // If you have an HTML entry file
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JavaScript and TypeScript files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "serif"],
      },

      colors: {
        darkBlue: "hsl(209, 23%, 22%)",
        veryDarkBlueBg: "hsl(207, 26%, 17%)",
        veryDarkBlueText: "hsl(200, 15%, 8%)",
        darkGray: "hsl(0, 0%, 52%)",
        veryLightGray: "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
      },

      boxShadow: {
        one: "0px 2px 9px 0px #0000000E",
        // one: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
        // two: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      },

      keyframes: {
        opacity: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },

      animation: {
        opacity: "opacity 0.3s  forwards ease-in-out",
      },
    },
  },
  plugins: [],
};
