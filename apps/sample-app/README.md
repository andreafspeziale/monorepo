# Sample App

Sample application in order to showcase the setup of a NestJS application using the available packages.

## Quickstart

You should have dependencies already installed `pnpm i` from the root.

```sh
cp env/.env.development .env
docker compose up
pnpm start:dev
```

Browse `http://localhost:<PORT>/swagger` for endpoints documentation.

## Test

```sh
pnpm test
```

or

```sh
docker compose -f docker-compose.test.yml --env-file ./env/.env.test up
pnpm test:e2e
```

In order to remove everything regarding the test env:

```bash
$ docker compose -f docker-compose.test.yml --env-file ./env/.env.test down -v
```

## Postman

Once the server is running, play with the APIs using [Postman](https://www.postman.com/downloads/). All you have to do is:

- [create a workspace](https://learning.postman.com/docs/collaborating-in-postman/using-workspaces/creating-workspaces/) (e.g.Sample App)
- [import data](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman) from the `./postman` folder

Have fun!

## Stay in touch

- Author - [Andrea Francesco Speziale](https://twitter.com/andreafspeziale)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

sample-app [MIT licensed](LICENSE).
