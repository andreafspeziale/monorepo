const bjc = require('@andreafspeziale/jest-config-base');

const { testRegex, ...rest } = bjc

module.exports = {
  ...rest,
  testRegex: testRegex.spec,
  rootDir: './src',
};
