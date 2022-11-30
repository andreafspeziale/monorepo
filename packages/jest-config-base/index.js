module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testRegex: {
    spec: '.*\\.spec\\.ts$',
    e2e: '.*\\.e2e-spec\\.ts$'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: '../coverage',
};
