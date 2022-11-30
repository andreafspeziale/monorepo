const jcc = require('@andreafspeziale/jest-config-base');

const { testRegex, ...rest } = jcc

module.exports = {
  ...rest,
  testRegex: testRegex.spec,
  rootDir: './src',
};
