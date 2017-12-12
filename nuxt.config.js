const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'mynuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    storyblok: {
      token: 'gZUNkw3Q4pQSyzf7jTICAAtt'
    }
  },
  generate: {
    routes: function () {
      return axios.get('https://api.storyblok.com/v1/cdn/links?version=published&token=' + process.env.storyblok.token)
      .then((result) => { 
        let pages = []
        for (let link in result.data.links) {
          if (result.data.links.hasOwnProperty(link)) {
            pages.push('/' + result.data.links[link].slug)
          }
        }
        return pages
      })
      .catch((error) => {
        return error
      })
    }
  },
  plugins: ['~/plugins/components.js', '~/plugins/storyblok_bridge.js']
}
