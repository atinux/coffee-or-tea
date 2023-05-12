# Vue London 2023 demo

This is a demo application for Vue London 2023 using edge-side rendering on CloudFlare Pages with D1 as database.

Currently based on [nuxt-space-layer](https://www.npmjs.com/package/nuxt-space-layer) to make it easier to get started with CloudFlare Pages & D1.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

Copy the `.env.example` to `.env` and fill the env variables, `NUXT_SESSION_PASSWORD` is a random string of at least 32 characters.

Create a [GitHub OAuth app](https://github.com/settings/applications/new) and add the client id and secret to the `.env` file, homepage and callback url can be set to `http://localhost:3000`.

## Development Server

Start the development server on `http://localhost:3000`

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploy on CloudFlare Pages

Make sure to create a GitHub OAuth application for your production deployment.

Once you linked your GitHub/GitLab repository, add the following env variable:

```bash
NODE_VERSION=18
NUXT_SESSION_PASSWORD=your-secret-password-of-at-least-32-chars
NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-oauth-client-id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
```

Make sure to create a D1 database use the SQL console of it to add your migrations from the `server/db/migrations` folder.

Link your D1 database with the `D1_DB` variable name to your CF Pages project (Settings -> Functions -> D1 database bindings). You may have to retry the latest deployment to make sure the binding is active.

## License

MIT