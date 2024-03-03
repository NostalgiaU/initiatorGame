/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontSize: {
      xs: 'var(--init-font-xs)',
      sm: 'var(--init-font-sm)',
      base: 'var(--init-font-base)',
      lg: 'var(--init-font-lg)'
    }
  },
  plugins: []
}
