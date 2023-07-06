module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'plugin:cypress/recommended',
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // Note that prettier should remain last in this list to override other potential config conflicts
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    emcaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'chai-friendly', 'prettier', 'mocha'],
  globals: {
    __dirname: true
  },
  rules: {
    semi: 0,
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ],
    quotes: ['warn', 'single'],
    camelcase: 'warn',
    'space-before-function-paren': 'off',
    'no-empty-function': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'none'
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-namespace': ['warn', { allowDeclarations: true }],
    'chai-friendly/no-unused-expressions': 'error',
    'no-unused-expressions': 'off',
    'cypress/no-unnecessary-waiting': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Object: true,
          Function: true
        }
      }
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }
    ],
    // Default rule coverage is "describe", "context" and "suite"
    'mocha/valid-suite-description': [
      'error',
      {
        // Ignore prettier and eslint on the regex pattern, else the escape character '\' will be removed
        // prettier-ignore
        pattern: '.*[^\.]$', // eslint-disable-line
        message:
          'Trailing period in suite names can break mochawesome report screenshot linking'
      }
    ],
    // Default rule coverage is "it", "specify" and "test"
    'mocha/valid-test-description': [
      'error',
      {
        // Ignore prettier and eslint on the regex pattern, else the escape character '\' will be removed
        // prettier-ignore
        pattern: '.*[^\.]$', // eslint-disable-line
        message:
          'Trailing period in test names can break mochawesome report screenshot linking'
      }
    ]
  }
}
