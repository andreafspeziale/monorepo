<div align="center">
  <p>
    <a href="https://turbo.build" target="blank">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/4060187/196936123-f6e1db90-784d-4174-b774-92502b718836.png">
        <img src="https://user-images.githubusercontent.com/4060187/196936104-5797972c-ab10-4834-bd61-0d1e5f442c9c.png" height="128" alt="Turborepo Logo">
      </picture>
    </a>
    &nbsp&nbsp&nbsp
    <a href="https://nestjs.com/" target="blank">
      <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
    </a>
  </p>
  <p>
    <a href="https://turbo.build/repo" target="blank">Turborepo</a> template for <a href="https://github.com/nestjs/nest" target="blank">Nest</a>,<br>
    a progressive Node.js framework for building efficient and scalable server-side applications.
  </p>
</div>

# Monorepo

Opinionated monorepo toolkit.

`apps` will be versioned and tagged in order to eventually be built using Docker and pushed in a Docker registry.

`packages` will be versioned, tagged, built and pushed in the Github npm registry.

### Requirements

- Node.js >=18.5.0
- pnpm >=7.x
- [Docker](https://www.docker.com/)

## Apps

> /apps

Start adding new application here.

### Sample App

Sample NestJS applications which shows the base setup using the available packages.

## Packages

> /packages

Reusable code or configurations.

## Quickstart

```sh
pnpm i
pnpm build
pnpm test
```

## Notes

Same Githup and npm public registry handle/scope will result in a nightmare.

## Stay in touch

- Author - [Andrea Francesco Speziale](https://twitter.com/andreafspeziale)
- Website - [https://turbo.build/repo](https://turbo.build/repo) | [https://nestjs.com](https://nestjs.com/)
- Twitter - [@turborepo](https://twitter.com/turborepo) | [@nestframework](https://twitter.com/nestframework)

## License

monorepo [MIT licensed](LICENSE).
