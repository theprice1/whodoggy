/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    // These settings are opt-in now, but become default in Tailwind v4.0
    hoverOnlyWhenSupported: true, // Improves performance and accessibility
  },
};
// Note: The `future` settings are optional and can be removed if not needed.
// They are included here to demonstrate how to use the `future` feature in Tailwind CSS.
// If you don't need these features, you can remove the `future` section entirely.
// This configuration file is set up for a React Native project using Tailwind CSS.
// Ensure you have the necessary dependencies installed:
// npm install tailwindcss react-native-tailwindcss
// or
// yarn add tailwindcss react-native-tailwindcss
// This configuration will allow you to use Tailwind CSS classes in your React Native components.
// For more information on configuring Tailwind CSS, visit: https://tailwindcss.com/docs/configuration
// For more information on using Tailwind CSS with React Native, visit:
