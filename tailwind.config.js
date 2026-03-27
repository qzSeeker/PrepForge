/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
        fontFamily: {
            sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
            mono: ["var(--font-geist-mono)", "monospace"],
        },
        colors: {
            brand: {
            50:  "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
            },
            surface: {
            0: "#09090b",
            1: "#111113",
            2: "#18181b",
            3: "#1c1c1f",
            4: "#27272a",
            5: "#3f3f46",
            }
        },
        animation: {
            "fade-in": "fadeIn 0.4s ease-out forwards",
            "slide-up": "slideUp 0.4s ease-out forwards",
        },
        keyframes: {
            fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
            },
            slideUp: {
            "0%": { opacity: "0", transform: "translateY(16px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
            },
        },
        },
    },
    plugins: [],
};