module.exports = {
  displayName: 'exporter',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/exporter',
  coverageReporters: ['html', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 100,
      lines: 86,
      statements: 86,
    },
  },
};
