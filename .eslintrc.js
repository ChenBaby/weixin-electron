module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html',
    'vue'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "linebreak-style": [0],
    "strict": [0],
    "semi": ["error","never"],
    "indent": ["error", 4],
    "semi-spacing": [0, {
    "before": false,
    "after": false
    }],
    "quotes": [0],
    "quote-props": ["error", "consistent-as-needed"]
  }
}
