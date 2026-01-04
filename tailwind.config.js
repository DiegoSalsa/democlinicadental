/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0E7490', // Cyan/Teal
                    light: '#06b6d4', // Cyan-500
                    dark: '#155e75', // Cyan-800
                },
                secondary: {
                    DEFAULT: '#F97316', // Orange
                    hover: '#ea580c', // Orange-600
                },
                background: {
                    light: '#ECFEFF', // Soft Cyan
                    teal: '#0E7490',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
