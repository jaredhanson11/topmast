<template>
  <div id="releases">
    <h1>{{ $route.params.namespace }}</h1>
    <h2>{{ $route.params.release }}</h2>
  </div>
</template>

<script>
export default {
  name: 'ReleasesNamespaceRelease',
  computed: {}
}
</script>
