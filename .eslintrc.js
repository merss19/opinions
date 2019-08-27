module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
  ],
  parser: 'babel-eslint',
  globals: {
    console: true,
    setTimeout: true,
    localStorage: true,
  },
  env: {
    'browser': true,
    'node': true,
  },
  rules: {
    'arrow-parens':  ['error', 'always'],
    'array-bracket-spacing': [ 'error', 'always', { singleValue: false } ],
    'arrow-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'indent': [ 'error', 2, { SwitchCase: 1, MemberExpression: 1 } ],
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'multiline-ternary': ['error', 'always-multiline'],
    'no-console': [ 'error', { allow: ['warn', 'error', 'info'] } ],
    'no-lonely-if': 'error',
    'no-magic-numbers': [ 'error', { ignore: [ 0, 1, -1, 100, 1000, 1024, 401, 200 ] } ],
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'object-curly-spacing': [ 'error', 'always', { arraysInObjects: true } ],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'quotes': [ 'error', 'single' ],
    'space-in-parens': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-extraneous-dependencies': [ 'error', { devDependencies: true, optionalDependencies: true, peerDependencies: true } ],
    'import/no-unresolved': [ 2, { ignore: ['^environment', '^utils/.*', '^components/.*', '^modules/.*', '^tools/.*', '^ui-toolkit', '^utils'] } ],
    'import/order': 'off',
		'import/no-named-as-default': 0,
    'no-bitwise': [2, { allow: ["~"] }],
    "react/button-has-type": 0,
    "linebreak-style": 0
  },
};
