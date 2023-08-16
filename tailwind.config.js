/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //overwrite whole basic style:
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      //add new style:
      colors: {
        pizza: "#123456",
      },
      //modify existing style(part of it):
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
