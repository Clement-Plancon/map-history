/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pax-ink": "#0f172a",
        "pax-gold": "#f3c969",
        "pax-muted": "#94a3b8"
      }
    }
  },
  plugins: []
};
