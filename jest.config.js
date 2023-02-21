/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest"
  },
  modulePaths: ["<rootdir>"],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  roots: [
    "src",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
