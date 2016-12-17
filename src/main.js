import Vue from 'vue'
import App from './App'
import Dashboard from './components/Dashboard'
import Votelist from './components/Votelist'
import Login from './components/Login'
import Messages from './components/Messages'
import Inbox from './components/messages_comp/Inbox'
import Draft from './components/messages_comp/Draft'
import Sent from './components/messages_comp/Sent'
import Trash from './components/messages_comp/Trash'
import Create from './components/messages_comp/Create'
var VueRouter = require('vue-router')

Vue.use(VueRouter)


const routes = [
  { path: '/', component: App, name: 'home',
		children:[
	  	{ path: 'dashboard', name: 'dashboard', component: Dashboard	},
	  	{ path: 'votelist', name: 'votelist', component: Votelist },
	  	{ path: 'login', name: 'login', component: Login },
	  	{ path: 'messages', name: 'messages', component: Messages,
	  		children: [
	  			{ path: '/', name: 'messages_index', component: Inbox },
	  			{ path: 'inbox', name: 'inbox', component: Inbox },
	  			{ path: 'draft', name: 'draft', component: Draft },
	  			{ path: 'sent', name: 'sent', component: Sent },
	  			{ path: 'trash', name: 'trash', component: Trash },
	  			{ path: 'create', name: 'create', component: Create }
	  		]
	  	 }
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
