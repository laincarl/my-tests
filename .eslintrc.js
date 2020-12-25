const rules = {
};
module.exports = {
  root: true,
  overrides: [
    {
      files: [
        '*.js',
        '*.jsx',
      ],
      parser: 'babel-eslint',
      extends: [
        'airbnb',        
        'prettier',
        'prettier/react',
      ],
      plugins: [
        'react',
      ],
      rules,
    },
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
      ],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        
      ],
      rules,
    },
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
