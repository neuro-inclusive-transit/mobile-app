module.exports = {
  'env': {
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:prettier/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.json',
    'extraFileExtensions': ['.svelte']
  },
  'overrides': [
    {
      'files': ['*.svelte'],
      'parser': 'svelte-eslint-parser',
      'parserOptions': {
        'parser': '@typescript-eslint/parser'
      }
    }
  ],
  'rules': {
    'no-undef': 'off',
    "svelte/valid-compile": [
      "warn",
    ],
  },
}
