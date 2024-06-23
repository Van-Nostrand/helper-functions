/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/$1',
  },
  setupFiles: ['<rootDir>/global-mocks.js'],
  setupFilesAfterEnv: ['<rootDir>/global-mocks.js'],
}
