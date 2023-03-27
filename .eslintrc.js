module.exports = {
  root: true,
  plugins: ['@brionmario'],
  extends: [
    'turbo',
    'plugin:@brionmario/internal',
    'plugin:@brionmario/prettier',
    'plugin:@brionmario/typescript',
  ]
};
