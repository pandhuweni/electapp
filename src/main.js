import Vue from 'vue'
import App from './App'
import Dashboard from './components/Dashboard'
import Votelist from './components/Votelist'
import Login from './components/Login'
var VueRouter = require('vue-router')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App, name: 'home',
		children:[
	  	{ path: 'dashboard', name: 'dashboard', component: Dashboard	},
	  	{ path: 'votelist', name: 'votelist', component: Votelist },
	  	{ path: 'login', name: 'login', component: Login }
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