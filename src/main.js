import Vue from 'vue'
import App from './App'
import Dashboard from './components/Dashboard'
import Votelist from './components/Votelist'
var VueRouter = require('vue-router')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App, name: 'home',
		children:[
	  	{ path: 'dashboard', name: 'dashboard', component: Dashboard	},
	  	{ path: 'votelist', name: 'votelist', component: Votelist }
	  ]
  }
]


const router = new VueRouter({
	hashbang: false,
	mode: 'history', 
  linkActiveClass: 'active-class',
  routes // short for routes: routes
})

const app = new Vue({
  router
}).$mount('#app')