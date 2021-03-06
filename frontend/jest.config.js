module.exports = {
  roots: ["<rootDir>/src"],

  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  setupFiles: [
    '<rootDir>/src/jest.stub.js',
  ],

  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  collectCoverage: true
};