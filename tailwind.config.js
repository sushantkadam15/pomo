/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        gilroylight: ["Gilroy-Light", "sans"],
        gilroyextrabold: ["Gilroy-ExtraBold", "sans"],
        montserratitalic: ["Montserrat-Italic", "sans"],
        montserratregular: ["Montserrat-Regular", "sans"],
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#e7626c",
          "primary-focus": "#c25b66",
          "primary-content": "#ffffff",

          secondary: "#242c55",
          "secondary-focus": "#191e39",
          "secondary-content": "#ffffff",

          accent: "#37cdbe",
          "accent-focus": "#2ba69a",
          "accent-content": "#fffffe",

          neutral: "#3b424e",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",

          "base-100": "#f4eddb",
          "base-200": "#e1ddd0",
          "base-300": "#c9c6bb",
          "base-content": "#242c55",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": "9px",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
