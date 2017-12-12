import Vue from 'vue'

/*
* Storyblok delivers the attribute _editable per component which contains an HTML comment.
* This HTML comment needs to be placed before your component - but since there can only be
* one root tag per component and we won't wrap everything in another div we simply parse the
* shipped html comment and add the data attributes the Storyblok JavaScript Bridge
* (https://www.storyblok.com/docs/Guides/storyblok-latest-js) would add itself - by ourself.
* Since the API only retrieves the _editable property in draft version - and we only load this
* draft version during `npm run dev` we simply do nothing if _editable is not defined.
*/
Vue.directive('editable', {
  bind: function (el, binding) {
    if (typeof binding.value._editable === 'undefined') {
      return
    }

    let options = JSON.parse(binding.value._editable.replace('<!--#storyblok#', '').replace('-->', ''))

    el.setAttribute('data-blok-c', JSON.stringify(options))
    el.setAttribute('data-blok-uid', options.id + '-' + options.uid)
    el.classList.add('storyblok__outline')
  }
})
