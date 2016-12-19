import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    sideStatsTab: 'recent',
    sideStatsData: {},
  },

  actions: {
    changeTab ({commit}, tab) {
      commit('CHANGE_TAB', tab)
    },
    syncSideStats ({commit}, data) {
      commit('CHANGE_TAB', data)
    }
  },

  mutations: {
    CHANGE_TAB (state, tab) {
      state.sideStatsTab = tab
    },
    SYNC_SIDE_STATs (state, data) {
      state.sideStatsData = data
    },

  },



})
