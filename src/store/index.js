import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0,
    recommendListId: 0
  },
  getters: {},
  mutations: {
    getId(state, newId) {
      state.id = newId
    },
    getRecommendListId(state, newId) {
      state.recommendListId = newId
    }
  },
  actions: {},
  modules: {}
})
