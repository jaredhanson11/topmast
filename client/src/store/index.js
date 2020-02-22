import Vue from 'vue'
import Vuex from 'vuex'
import sampleReleases from './sampleReleases'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    releases: sampleReleases
  },
  mutations: {
    updateReleases(state, payload) {
      state.releases = payload
    }
  },
  actions: {
    updateReleases(store, payload) {
      store.commit('updateReleases', payload)
    }
  },
  getters: {
    getReleases(state) {
      return state.releases
    }
  },
  modules: {}
})
