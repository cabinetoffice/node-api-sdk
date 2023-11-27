module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/test'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    coveragePathIgnorePatterns: ['/src/index.ts'],
    collectCoverageFrom: ['./src/**/*.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testMatch: ['**/test/**/*.spec.[jt]s'],
    globalSetup: './test/setup.ts',
    transform: {
        '^.+\\.ts?$': ['ts-jest', { diagnostics: false }]
    }
};
