module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: ['@nuxtjs/eslint-config', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        endOfLine: 'auto',
        printWidth: 120,
        arrowParens: 'always',
      },
    ],
    'max-len': [
      2,
      {
        code: 120,
        ignoreStrings: true,
        ignoreUrls: true,
      },
    ],
  },
}
