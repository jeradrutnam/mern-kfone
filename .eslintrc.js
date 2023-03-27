module.exports = {
  root: true,
  plugins: ['@wso2'],
  extends: [
    'turbo',
    'plugin:@wso2/internal',
    'plugin:@wso2/prettier',
    'plugin:@wso2/typescript',
  ]
};
