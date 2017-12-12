<template>
  <div v-editable="blok" class="teaser">
    <h1>{{blok.headline}}</h1>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>