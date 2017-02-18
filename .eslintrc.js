module.exports = {
  'root': true,
  'extends': 'standard',
  'env': {
    'node': true,
    'browser': true,
    "mocha": true
  },
  'plugins': [
    'html'
  ],
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': ['error', 'never'],
    "arrow-body-style": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "strict": 0,
    "semi": ["error", "never"]
  },
  "parser": "babel-eslint"
}
