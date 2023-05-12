# Vue London 2023 demo

This is a demo application for Vue London 2023 using edge-side rendering on CloudFlare Pages with D1 as database.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploy on CloudFlare Pages

Once you connected your GitHub/GitLab repository, make sure to add the following env variable:

```bash
NODE_VERSION=18
```
