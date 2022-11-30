# Base ESLint Config

ESLint config to extend in any TypeScript package or app.

## Installation

```sh
pnpm add @andreafspeziale/eslint-config-base
```

## How to use?

The package expects to be extended as follows:

> .eslintrc.js

```javascript
module.exports = {
  root: true,
  extends: ["@andreafspeziale/eslint-config-base"],
};
```

Check the `sample-app` for usage.

## Stay in touch

- Author - [Andrea Francesco Speziale](https://twitter.com/andreafspeziale)

## License

eslint-config-base [MIT licensed](LICENSE).
