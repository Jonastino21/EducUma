module.exports = {
  content: [
    "./app/screens/LoginScreen.tsx",
    "./app/**/*.{js,ts,jsx,tsx}", // Pour inclure tous les fichiers dans le dossier app
    "./src/**/*.{js,ts,jsx,tsx}", // Si vous avez un dossier src
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
