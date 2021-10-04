module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: ['<rootDir>/__jest__/setup.js'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/app.{ts,js}'
  ]
};
