import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    releases: {}
  },
  mutations: {
    updateReleases(state, payload) {
      payload.forEach(updatedRelease => {
        const releaseId = `${updatedRelease.namespace}/${updatedRelease.name}`
        const existing = state.releases[releaseId]
          ? state.releases[releaseId]
          : {}
        const release = { ...existing, ...updatedRelease }
        Vue.set(state.releases, releaseId, release)
      })
    },
    updateReleaseDetails(state, payload) {
      const releaseId = `${payload.namespace}/${payload.name}`
      const existing = state.releases[releaseId]
        ? state.releases[releaseId]
        : {}
      const release = { ...existing, ...payload }
      Vue.set(state.releases, releaseId, release)
    }
  },
  actions: {
    updateReleases(store, payload) {
      store.commit('updateReleases', payload)
    },
    updateReleaseDetails(store, payload) {
      store.commit('updateReleaseDetails', payload)
    }
  },
  getters: {
    getReleasesList(state) {
      return Object.values(state.releases)
    },
    getReleaseDetails(state) {
      return releaseId => state.releases[releaseId]
    }
  },
  modules: {}
})
