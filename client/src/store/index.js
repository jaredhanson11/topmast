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
      const releases = payload.map(item => {
        const time = new Date(item.updated).getTime()
        return { ...item, updated: time }
      })
      state.releases = releases
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
