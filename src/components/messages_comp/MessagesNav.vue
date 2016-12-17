<template>	
	<div>
	<ul class="nav nav-pills nav-stacked navbar-fixed-top">
			<li role="presentation" class="compose-button">
				<button class="btn btn-block btn-primary hidden-sm hidden-xs">
					Compose Message
				</button> 
			</li>

		  <li role="presentation" class="compose-link">
	    	<router-link :to="{ name: 'create'}">
	    			<i class="fa fa-pencil"></i>
						<transition name="fade">
		    			<span>Compose</span>
						</transition>
	    	</router-link>
		  </li>
		  <li role="presentation">
	    	<router-link :to="{ name: 'inbox'}">
	    			<i class="fa fa-inbox"></i>
						<transition name="fade">
		    			<span>Inbox</span>
						</transition>
	    	</router-link>
		  </li>
		  <li role="presentation">
	    	<router-link :to="{ name: 'sent'}">

	    			<i class="fa fa-paper-plane"></i>
						<transition name="fade">
		    			<span>Sent</span>
						</transition>
	    	</router-link>
		  </li>
		  <li role="presentation">
	    	<router-link :to="{ name: 'draft'}">
	    			<i class="fa fa-archive"></i>
						<transition name="fade">
		    			<span>Draft</span>
						</transition>
	    	</router-link>
		  </li>

		  <li role="presentation">
	    	<router-link :to="{ name: 'trash'}">
	    			<i class="fa fa-trash"></i>
						<transition name="fade">
		    			<span>Trash</span>
						</transition>
	    	</router-link>
		  </li>
		</ul>
	</div>
	
</template>

<script>
export default {
	name: 'messagesnav',
	components: {
		
	}
}
</script>

<style scoped>
.btn{
	border-color:transparent;
}
ul.nav{
	position:relative;
	border-radius:4px ;
	background-color:rgba(0,128,128,.075);
}
a .fa{
	margin-right:8px;
	color:rgba(0,128,128,.8);
}
a{
	color:rgba(0,128,128,.8);
}
a:hover, a:focus, a:active{
	color:rgba(0,128,128,1);
}
li:hover a{
	background-color:rgba(0,128,128,.1);
}
.compose{
	padding: 2px 5px;
	margin:10px 10px;
}
.nav-pills > li > a{
	border-radius:0px;
}

.btn-primary{
	background-color: rgba(0,128,128,.8) !important;
}
.compose-button{
	padding:10px 16px;
}
@media(max-width: 992px){
	ul.nav{
	 width: 100%;
	 border-radius: 0px;
	}
	ul.nav > li{
		display: table-cell;
		width: 1%;
		float: none;
		text-align: center;
	}
	.compose-button{
		display: none !important;
	}

}
@media(min-width: 992px){
	.compose-link{
		display: none;
	}
}
@media(max-width: 767px){
	ul.nav{
		position: fixed;
		width: 100%;
		top: 48px;
		box-shadow: 0px 0px 3px 0px !important;
		z-index: 999;
		display: table-cell;
		margin-left: 0px;
		width: 100%;
	 	background-color: rgba(255,255,255,1) !important;
	}

	ul.nav > li{		
		display: table-cell;
		width: 1%;
	}
	ul.nav >li> a > span{
		display: none ;
	}
}

</style>
