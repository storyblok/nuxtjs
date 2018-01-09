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
export default {
  data () {
    return {
      pages: []
    }
  },
  asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    return context.app.$storyapi.get('cdn/links', {
      version: version
    }).then((result) => {
      let pages = []
      for (let id in result.data.links) {
        if (result.data.links.hasOwnProperty(id)) {
          let link = result.data.links[id]
          pages.push({ slug: link.slug, name: link.name })
        }
      }
      return { pages: pages }
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
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
