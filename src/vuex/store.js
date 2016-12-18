import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    sideStatsTab: 'recent'
  },

  actions: {
    changeTab ({commit}, tab) {
      commit('CHANGE_TAB', tab)
    }
  },

  mutations: {
    CHANGE_TAB (state, tab) {
      state.sideStatsTab = tab
    }
  },



})
