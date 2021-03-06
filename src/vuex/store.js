import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    gmapApi: 'AIzaSyBbk5WpDkOTIfkyHbQigoB9vF4Doh6y4Yg',
    sideStatsTab: 'recent',
    chartData: {},
    chartFilterX: 'date',
    chartFilterY: 'gender',
    optionsChoice: [],
    selectedOpt: '',
    selectedCategoryEdit:''
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
    syncSelectedOpt ({commit}, data) {
      commit('SYNC_SELECTED_OPT', data)
    },
    syncSelectedEdit ({commit}, data) {
      commit('SYNC_SELECTED_EDIT', data)
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
    SYNC_SELECTED_OPT (state, data) {
      state.selectedOpt = data
    },    
    SYNC_SELECTED_EDIT (state, data) {
      state.selectedCategoryEdit = data
    },
  },



})
