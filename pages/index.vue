<template>
  <section class="container">
    <h1 class="title">
      Pages
    </h1>
    <ul class="pages">
      <li v-for="(page, index) in pages" :key="index" class="page">
        <nuxt-link :to="page.slug">{{ page.name }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      pages: []
    }
  },
  asyncData (context) {
    return axios.get('https://api.storyblok.com/v1/cdn/links?version=draft&token=' + process.env.storyblok.token)
      .then((result) => {
        let pages = []
        for (let id in result.data.links) {
          if (result.data.links.hasOwnProperty(id)) {
            let link = result.data.links[id]
            pages.push({ slug: link.slug, name: link.name })
          }
        }
        return { pages: pages }
      })
      .catch((error) => {
        context.error({ statusCode: 404, message: 'Page not found' + (context.isDev ? error : '') })
      })
  },
  head () {
    return {
      title: 'Pages'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.pages
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.page
{
  margin: 10px 0;
}
</style>
