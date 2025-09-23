const config = {
    testEnvironment: "node",
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testMatch: [
        '**/*.test.js', 
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/*.test.+(ts|tsx|js)'
    ],
    
    transform: {
        '^.+\\.(js)$': 'babel-jest'
    },
    setupFilesAfterEnv: ['jest-localstorage-mock'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react|react-dom|react-router|@hotwired|bootstrap)'
    ]
};

module.exports = config;