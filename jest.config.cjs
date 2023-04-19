/**  @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js", // Map CSS file imports to an empty module
    "^(\\.\\.?\\/.+)\\.jsx?$": "$1"
  },
  extensionsToTreatAsEsm: [".tsx"],
  moduleDirectories: ["node_modules"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
