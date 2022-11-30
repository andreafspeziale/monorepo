# Base Prettier Config

Prettier config to extend in any Javascript / TypeScript package or app.

## Installation

```sh
pnpm add @andreafspeziale/prettier-config-base
```

## How to use?

The package expects to be extended as follows:

> .prettierrc.js

```javascript
module.exports = {
  ...require("@andreafspeziale/prettier-config-base"),
};
```

Check the `sample-app` for usage.

## Stay in touch

- Author - [Andrea Francesco Speziale](https://twitter.com/andreafspeziale)

## License

prettier-config-base [MIT licensed](LICENSE).
