
# Play4devs

Compartilhe sua playlist favorita para ouvir enquanto desenvolve. Veja a playlist dos seus colegas desenvolvedores ao redor do mundo.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Soluções utilizadas

- Next.js (Fullstack/Monorepo Framework)
- Typescript
- TailwindCSS
- Auth0 (AaaS)
- MongoDB Atlas (DBasS)
- Mongoose (ODM)
- Terraform (IaC)
- Digital Ocean (Cloud Provider)
- Docker

## Variáveis de ambiente (.env.local)

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

Para rodar esse projeto localmente será preciso criar um arquivo `.env.local` na raíz do projeto.

Para isso, em ambientes baseados em UNIX, use o comando `cp`:

```bash
cp .env.example .env.local
```

As variáveis de ambiente necessárias estão listadas no arquivo. São elas:

`SPOTIFY_CLIENT_ID`

`SPOTIFY_CLIENT_SECRET`

(Valores obtidos ao criar uma aplicação em [https://developer.spotify.com/](https://developer.spotify.com/))

`AUTH0_SECRET`

`AUTH0_CLIENT_ID`

`AUTH0_CLIENT_SECRET`

`AUTH0_BASE_URL` Valor padrão `${APP_URL}` (Deploy na Digital Ocean)

`AUTH0_ISSUER_BASE_URL`

`AUTH0_DOMAIN`

(Valores obtidos ao configurar o Tenant e aplicação, como indicado em [https://auth0.com/docs/quickstart/webapp/nextjs/interactive](https://auth0.com/docs/quickstart/webapp/nextjs/interactive))

`AUTH0_API_CLIENT_ID`

`AUTH0_API_CLIENT_SECRET`

(Valores obtidos ao configurar uma aplicação M2M sob o mesmo Tenant no Auth0. Isso pode ser feito seguindo o guia em [https://auth0.com/docs/manage-users/user-search/retrieve-users-with-get-users-endpoint](https://auth0.com/docs/manage-users/user-search/retrieve-users-with-get-users-endpoint))


`MONGODB_URI`

(URL de conexão para um cluster do MongoDB. Um cluster pode ser criado gratuitamente (para testes) em [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database))

## Autores

- [@AugustoBenteu](https://github.com/AugustoBenteu)
- [@CaiqueBrandani](https://github.com/CaiqueBrandani)
- [@GianlucaBorges](https://github.com/GianlucaBorges)
- [@JoaoLucasLD](https://github.com/JoaoLucasLD)
- [@joevtap](https://github.com/joevtap)

