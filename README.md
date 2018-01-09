# Nuxt.js Storyblok Project

> Nuxt.js Storyblok Project

This project loads the default set of components using axios from the Storyblok API and renders the components:

- Teaser
- Grid
- Feature

You will also be able to run `npm run dev` to access the edit mode provided via the Storyblok JavaScript Bridge.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Storyblok Setup

1. Simply register at https://app.storyblok.com/#/signup
2. Create a new space
3. Exchange "YOUR_PREVIEW_TOKEN" in `nuxt.config.js` with your preview token.

## Compose/Edit mode vs Published Mode

- Run `npm run dev` for draft version and edit mode
- Run `npm run build && npm start` for "published" version
- Run `npm run generate` to generate static pages according to Storyblok content entries.