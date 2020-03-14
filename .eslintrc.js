module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react-hooks', 'import'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'no-console': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': [0],
    'react/jsx-curly-newline': 0,
    'react/jsx-fragments': [1, 'syntax'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
}
