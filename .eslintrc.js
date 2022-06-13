module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    "vue/no-multiple-template-root": "off" ,
    "vue/no-v-model-argument": "off",
    "vue/singleline-html-element-content-newline": "off",
  },
}
