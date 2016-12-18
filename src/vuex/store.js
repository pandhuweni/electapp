import Vue from 'vue'
var Vuex = require('vuex')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    messages: []
  },

  actions: {
    newMessage ({commit}, msg) {
      commit('NEW_MESSAGE', msg)
    }
  },

  mutations: {
    NEW_MESSAGE (state, msg) {
      state.messages = msg
    }
  },



})
