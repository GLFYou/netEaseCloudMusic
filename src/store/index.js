import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0,
    idArr: [],
    showPlay: false
  },
  getters: {},
  mutations: {
    getId(state, newId) {
      state.id = newId
    },
    getIdArr(state, newIdArr) {
      state.idArr = newIdArr
    },
    changeShowPlay(state, newVal) {
      state.showPlay = newVal
    }
  },
  actions: {},
  modules: {}
})
