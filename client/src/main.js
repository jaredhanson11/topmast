import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap and dependencies
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PortalVue from 'portal-vue'
Vue.use(BootstrapVue)
Vue.use(PortalVue)

// Code highlighting css
import 'highlight.js/styles/github.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
