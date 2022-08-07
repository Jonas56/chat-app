/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-t": "linear-gradient(to top, #f8f8f8, #e6e6e6)",
        "sign-in-background":
          "url('https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
      },
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
