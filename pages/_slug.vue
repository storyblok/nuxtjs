<template>
  <section>
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </section>
</template>

<script>
export default {
  data () {
    return { story: { content: {} } }
  },
  mounted () {
    this.$storyblok.init()
    this.$storyblok.on('change', () => {
      location.reload(true)
    })
    this.$storyblok.on('published', () => {
      location.reload(true)
    })
  },
  asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    return context.app.$storyapi.get('cdn/stories/home', {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');

.page {
  max-width: 960px;
  margin: 0 auto;
  font-family: 'Lato', sans-serif;
  margin-top: 120px;
}

.teaser {
  text-align: center;
}

.grid {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;

  max-width: 1200px;
  margin: 0 auto;
}

.column {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;

  width: 50%;
  
  box-shadow: 0px 1px 10px 0px #ccc;
  border: 1px solid #ddd;
  margin: 20px;
  padding: 20px;
}

body { 
  font-family: 'Lato', sans-serif; 
} 

.rebuilding { 
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
  background: green;
  padding: 10px;
  color: #fff;
} 

footer { 
  text-align: center; 
}
</style>
