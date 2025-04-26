module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'multiline-ternary': 'off',
    'react/display-name': 0,
    'array-callback-return': 0,
    'no-case-declarations': 0,
    'space-before-function-paren': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-prototype-builtins': 'off',
    'no-tabs': 0,
    'no-throw-literal': 'off',
    semi: [2, 'always'],
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    'jsx-quotes': ['error', 'prefer-single']
  }
};
