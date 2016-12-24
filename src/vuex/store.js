import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    sideStatsTab: 'recent',
    chartData: {},
    chartFilterX: 'date',
    chartFilterY: 'gender',
    optionsChoice: [],
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
    syncOptionsChoice ({commit}, data) {
      commit('SYNC_OPTIONS_CHOICE', data)
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
    SYNC_OPTIONS_CHOICE (state, data) {
      state.optionsChoice = data
    },
  },



})
