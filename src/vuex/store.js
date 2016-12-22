import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    sideStatsTab: 'recent',
    chartData: {},
  },

  actions: {
    changeTab ({commit}, tab) {
      commit('CHANGE_TAB', tab)
    },
    syncChartData ({commit}, data) {
      commit('SYNC_CHART', data)
    }
  },

  mutations: {
    CHANGE_TAB (state, tab) {
      state.sideStatsTab = tab
    },
    SYNC_CHART (state, data) {
      state.chartData = data
    },

  },



})
