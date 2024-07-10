module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy', // <- this comes first, order matters
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.ts$': 'ts-jest'
  },
};
