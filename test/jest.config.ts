module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Adjust if your tsconfig file is named differently or located elsewhere
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Adjust if your tsconfig file is named differently or located elsewhere
    },
  },
  
    transform: {},
  
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(your-module-name|another-module-name)/)'],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
};