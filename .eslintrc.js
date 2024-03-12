// module.exports = {
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     '@electron-toolkit/eslint-config-ts/recommended',
//     '@electron-toolkit/eslint-config-prettier'
//   ]
// }
module.exports = {
  root: true,
  extends: ['web'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        ignoreRestArgs: true,
        fixToUnknown: true,
      },
    ],
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['script/*.js'],
};
