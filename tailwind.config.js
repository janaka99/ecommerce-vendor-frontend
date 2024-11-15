/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        secondary: "var(--secondary)",
        primary: "var(--primary)",
        mute: "var(--muted)",
        accent: "var(--accent)",
        // green: "var(--green)",
      },
      fontSize: {
        "primary-title": "36px",
        "secondary-title": "24px",
        "primary-text": "19px",
        "secondary-text": "14px",
      },
      fontFamily: {
        satoshi: ["Satoshi"],
      },
    },
  },
  plugins: [],
};
