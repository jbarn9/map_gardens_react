/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "color-scheme": "light",
          primary: "oklch(64% 0.2 131.684)",
          "primary-content": "oklch(98% 0.031 120.757)",
          secondary: "oklch(65% 0.241 354.308)",
          "secondary-content": "oklch(94% 0.028 342.258)",
          accent: "oklch(85% 0.138 181.071)",
          "accent-content": "oklch(27% 0.046 192.524)",
          neutral: "oklch(52% 0.154 150.069)",
          "neutral-content": "oklch(98% 0.003 247.858)",
          "base-100": "oklch(100% 0 0)",
          "base-200": "oklch(98% 0 0)",
          "base-300": "oklch(95% 0 0)",
          "base-content": "oklch(21% 0.006 285.885)",
          info: "oklch(68% 0.169 237.323)",
          "info-content": "oklch(29% 0.066 243.157)",
          success: "oklch(76% 0.177 163.223)",
          "success-content": "oklch(26% 0.051 172.552)",
          warning: "oklch(85% 0.199 91.936)",
          "warning-content": "oklch(41% 0.112 45.904)",
          error: "oklch(58% 0.253 17.585)",
          "error-content": "oklch(96% 0.015 12.422)",
        },
      },
    ],
  },
};
