# Base Jest Config

Jest config to extend in any TypeScript package or app using Jest.

## Installation

```sh
pnpm add @andreafspeziale/jest-config-base
```

## How to use?

The package expects to be extended as follows:

> jest-e2e.config.js

```javascript
const bjc = require("@andreafspeziale/jest-config-base");

const { testRegex, ...rest } = bjc;

module.exports = {
  ...rest,
  testRegex: testRegex.e2e,
  rootDir: "./src",
};
```

> jest.config.js

```javascript
const bjc = require("@andreafspeziale/jest-config-base");

const { testRegex, ...rest } = bjc;

module.exports = {
  ...rest,
  testRegex: testRegex.spec,
  rootDir: "./src",
};
```

Tests are expected to live under the `src/**` folder named:

- `*.e2e-spec.ts` for end-to-end / integration testing
- `*.spec.ts` for unit testing

The consumer package or app is expected to run the tests with some scripts in the `package.json` like:

```JSON
{
  "test": "jest",
  "test:e2e": "jest --config jest-e2e.config.js",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
}
```

Check the `sample-app` for usage.

## Stay in touch

- Author - [Andrea Francesco Speziale](https://twitter.com/andreafspeziale)

## License

jest-config-base [MIT licensed](LICENSE).
