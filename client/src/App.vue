<template>
  <div id="app">
    <TheNavbar />
    <router-view id="body" />
    <TheFooter />
  </div>
</template>

<script>
// Load samples
import { sampleReleases } from '@/store/samples'
import store from '@/store'
store.dispatch('updateReleases', sampleReleases)

import TheNavbar from '@/components/common/TheNavbar.vue'
import TheFooter from '@/components/common/TheFooter.vue'
export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#body {
  margin-top: 50px;
}
</style>
