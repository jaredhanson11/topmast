<template>
  <b-navbar id="navbar" fixed="top" variant="dark" type="dark">
    <b-navbar-brand id="navbar-image" to="/">
      <img src="@/assets/logo.png" /> {{ brandName }}
    </b-navbar-brand>
    <b-navbar-nav id="nav" class="ml-auto">
      <b-nav-item
        exact-active-class="active"
        :to="route.path"
        :key="idx"
        v-for="(route, idx) in routes"
        >{{ route.name }}</b-nav-item
      >
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { routes } from '@/router'
export default {
  name: 'TheNavbar',
  data: () => {
    return {
      routes: routes,
      brandName: 'TopMast'
    }
  }
}
</script>

<style scoped>
#navbar-image {
  height: 100%;
}
#navbar-image img {
  height: 100%;
}
#navbar {
  height: 50px;
}
</style>
