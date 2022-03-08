module.exports = {
    preset: 'ts-jest',
     transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    runner: 'jest-electron/runner',
    testEnvironment: 'jest-electron/environment',
    setupFiles: ['./dist/main.js'],
};