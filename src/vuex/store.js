import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    sideStatsTab: 'recent',
    chartData: {},
    chartFilterX: 'date',
    chartFilterY: 'gender',
  },

  actions: {
    changeTab ({commit}, tab) {
      commit('CHANGE_TAB', tab)
    },
    syncChartData ({commit}, data) {
      commit('SYNC_CHART', data)
    },
    syncChartFilterX ({commit}, data) {
      commit('SYNC_CHART_FILTER_X', data)
    },
    syncChartFilterY ({commit}, data) {
      commit('SYNC_CHART_FILTER_Y', data)
    },
  },

  mutations: {
    CHANGE_TAB (state, tab) {
      state.sideStatsTab = tab
    },
    SYNC_CHART (state, data) {
      state.chartData = data
    },
    SYNC_CHART_FILTER_X (state, data) {
      state.chartFilterX = data
    },
    SYNC_CHART_FILTER_Y (state, data) {
      state.chartFilterY = data
    },
  },



})
