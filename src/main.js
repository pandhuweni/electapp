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
import Read from './components/messages_comp/Read'
import VotesTable from './components/votelist_comp/VotesTable'
import CreateVote from './components/votelist_comp/CreateVote'
import store from './vuex/store'
import VoteRead from './components/votelist_comp/VoteRead'
import EditVote from './components/votelist_comp/EditVote'
import Analyze from './components/votelist_comp/Analyze'
var VueRouter = require('vue-router')
var Vuex = require('vuex')

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/', component: App, name: 'home',
		children:[
	  	{ path: '/', name: 'index', component: Dashboard	},	  	
	  	{ path: 'dashboard', name: 'dashboard', component: Dashboard	},
	  	{ path: 'votelist', name: 'votelist', component: Votelist,
        children: [
          { path: '/', name: 'votelist_index', component:VotesTable },
          { path: 'create', name: 'votelist_create', component:CreateVote },
          { path: 'read/:id', name: 'votelist_read', component:VoteRead },
          { path: 'analyze/:id', name: 'vote_analyze', component:Analyze },
          { path: 'edit/:id', name: 'votelist_edit', component:EditVote },
          { path:"*", redirect:'votelist_index'}
        ]
      },
	  	{ path: 'login', name: 'login', component: Login },
	  	{ path: 'messages', name: 'messages', component: Messages,
	  		children: [
	  			{ path: '/', name: 'messages_index', component: Inbox },
	  			{ path: 'inbox', name: 'inbox', component: Inbox },
	  			{ path: 'draft', name: 'draft', component: Draft },
	  			{ path: 'sent', name: 'sent', component: Sent },
	  			{ path: 'trash', name: 'trash', component: Trash },
	  			{ path: 'create', name: 'create', component: Create },
	  			{ path: 'read/:id', name: 'read', component: Read },
	  	 		{ path: '*', redirect: 'inbox' }
	  		]
	  	 },
	  	 { path: "*", redirect: 'index'}
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
  router,
  store: store
}).$mount('#app')
