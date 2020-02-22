import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

class Route {
  constructor(path, name, component) {
    this.path = path
    this.name = name
    this.component = component
    this.inNavbar = name ? true : false
  }
}

export const routes = [
  new Route('/', 'Home', Home),
  new Route('/releases', 'Releases', () => import('@/views/Releases.vue')),
  new Route('/releases/:namespace', '', () =>
    import('@/views/ReleasesNamespace.vue')
  ),
  new Route('/releases/:namespace/:release', '', () =>
    import('@/views/ReleasesNamespaceRelease.vue')
  )
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
