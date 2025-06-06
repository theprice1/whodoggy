module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'], // ✅ add this
  };
};
// Note: This file is used to configure Babel for the React Native project.
// It includes the 'nativewind/babel' plugin to enable Tailwind CSS support in React Native.