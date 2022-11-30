# Base Typescript Config

TSConfigs to extend in any TypeScript package or app, tuned to a particular runtime environment. (Node.js 18 + NestJS)

## Installation

```sh
pnpm add @andreafspeziale/ts-config-base
```

## How to use?

TSConfigs expect to be extended as follows:

> tsconfig.json

```JSON
{
  "extends": "@andreafspeziale/ts-config-base/node18-strictest.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

> tsconfig.build.json

```JSON
{
  "extends": "./tsconfig.json",
  "exclude": ["test", "**/*spec.ts"]
}
```

Check the `sample-app` for usage.

## Stay in touch

- Author - [Andrea Francesco Speziale](https://twitter.com/andreafspeziale)

## License

ts-config-base [MIT licensed](LICENSE).
