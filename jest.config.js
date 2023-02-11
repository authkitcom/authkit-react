/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
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
