module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        tiltCircle: 'tilt 10s ease-in-out infinite',
        loaderFadeOut: 'fadeOut 1s ease-in forwards', // Adjusted animation for fade-out
      },
      keyframes: {
        tilt: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '25%': { transform: 'translate(50%, -50%) rotate(45deg)' },
          '50%': { transform: 'translate(50%, 50%) rotate(90deg)' },
          '75%': { transform: 'translate(-50%, 50%) rotate(135deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(180deg)' },
        },
        fadeOut: {
          '0%': { top: '0', opacity: 1 }, // Keep opacity at 1 at the start
          '100%': { top: '-100%', opacity: 0 }, // Fade out the loader
        },
      },
    },
  },
  plugins: [],
}
