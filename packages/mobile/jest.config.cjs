module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',  // Handle .js and .jsx files
    '^.+\\.tsx?$': 'ts-jest', // Handle TypeScript files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|expo(nent)?' +
      '|@expo(nent)?' +
      '|nativewind' +
      '|react-native-safe-area-context' +
      '|@react-native/js-polyfills' +  // Ensure polyfills are also transformed
      ')/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'node',
};
