module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
      },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
  