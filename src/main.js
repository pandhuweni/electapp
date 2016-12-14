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
	  	{
	  		name: 'dashboard',
	  		path: 'dashboard',
        component: Dashboard
	  	},
	  	{
	  		name: 'votelist',
	  		path: 'votelist',
        component: Votelist
	  	},
	  	{
	  		name: 'login',
	  		path: 'login',
	  		component: Login
	  	}
	  ]
  }
]


const router = new VueRouter({
	hashbang: false,
  linkActiveClass: 'active-class',
  routes // short for routes: routes
})

const app = new Vue({
  router
}).$mount('#app')